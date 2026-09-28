/* Igor Caires Machado · site script
   1. Mobile navigation
   2. Live repository status on project pages (progressive enhancement) */

(function(){
  // 1. Mobile navigation ----------------------------------------------------
  const toggle=document.querySelector('.nav-toggle');
  const nav=document.getElementById('site-nav');
  if(toggle&&nav){
    const setOpen=open=>{
      nav.classList.toggle('is-open',open);
      toggle.setAttribute('aria-expanded',String(open));
      toggle.textContent=open?'Close':'Menu';
    };
    toggle.addEventListener('click',()=>setOpen(!nav.classList.contains('is-open')));
    nav.addEventListener('click',e=>{if(e.target.closest('a'))setOpen(false)});
    document.addEventListener('keydown',e=>{
      if(e.key==='Escape'&&nav.classList.contains('is-open')){setOpen(false);toggle.focus()}
    });
  }

  // 2. Generate and download current CV as a real PDF --------------------------
  document.querySelectorAll('[data-generate-cv]').forEach(btn=>{
    btn.addEventListener('click',async()=>{
      const cv=document.getElementById('cv');
      if(!cv)return;
      if(typeof window.html2pdf!=='function'){
        window.print();
        return;
      }
      const original=btn.textContent;
      document.body.classList.add('pdf-exporting');
      document.querySelectorAll('[data-generate-cv]').forEach(b=>{b.disabled=true});
      btn.textContent='Generating PDF…';
      try{
        const clone=cv.cloneNode(true);
        clone.id='cv-pdf-export';
        clone.querySelectorAll('button,.cv-card-actions').forEach(el=>el.remove());
        const shell=document.createElement('div');
        shell.className='pdf-export-shell';
        const identity=document.createElement('div');
        identity.className='pdf-export-identity';
        identity.innerHTML='<strong>Igor Caires Machado</strong><span>Curriculum Vitae</span>';
        shell.append(identity,clone);
        document.body.appendChild(shell);
        await window.html2pdf().set({
          margin:[10,10,12,10],
          filename:'Igor_Caires_Machado_CV.pdf',
          image:{type:'jpeg',quality:0.98},
          html2canvas:{scale:2,useCORS:true,backgroundColor:'#ffffff',windowWidth:1100},
          jsPDF:{unit:'mm',format:'a4',orientation:'portrait'},
          pagebreak:{mode:['css','legacy'],avoid:['li','.cv-secondary > div']}
        }).from(shell).save();
        shell.remove();
      }catch(err){
        console.error('PDF generation failed',err);
        window.print();
      }finally{
        document.body.classList.remove('pdf-exporting');
        document.querySelectorAll('[data-generate-cv]').forEach(b=>{b.disabled=false});
        btn.textContent=original;
      }
    });
  });

  // 3. Repository status --------------------------------------------------------
  const repo=document.body.dataset.repo;
  if(!repo)return;
  const fmt=new Intl.DateTimeFormat('en-GB',{day:'2-digit',month:'short',year:'numeric'});
  const set=(sel,val)=>document.querySelectorAll(sel).forEach(el=>{el.textContent=val});
  Promise.all([
    fetch('https://api.github.com/repos/'+repo),
    fetch('https://api.github.com/repos/'+repo+'/commits?per_page=1')
  ]).then(async([r,c])=>{
    if(r.ok){
      const d=await r.json();
      set('[data-repo-branch]',d.default_branch||'main');
      set('[data-repo-state]',d.archived?'archived':'active');
    }
    if(c.ok){
      const d=await c.json();
      if(d[0])set('[data-repo-last]',fmt.format(new Date(d[0].commit.committer.date)));
    }
  }).catch(()=>{/* keep the static values written in the page */});
})();
