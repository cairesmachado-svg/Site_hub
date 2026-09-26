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

  // 2. Repository status --------------------------------------------------------
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
