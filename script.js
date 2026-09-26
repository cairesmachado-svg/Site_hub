const root=document.documentElement;
const header=document.querySelector('.site-header');
const progress=document.querySelector('.scroll-progress');
const glow=document.querySelector('.cursor-glow');
const menuToggle=document.getElementById('menuToggle');
const mobileMenu=document.getElementById('mobileMenu');
const themeToggle=document.getElementById('themeToggle');
const portraitStage=document.getElementById('portraitStage');

const savedTheme=localStorage.getItem('icm-theme');
if(savedTheme) root.dataset.theme=savedTheme;

themeToggle?.addEventListener('click',()=>{
  const next=root.dataset.theme==='dark'?'light':'dark';
  root.dataset.theme=next;
  localStorage.setItem('icm-theme',next);
});

menuToggle?.addEventListener('click',()=>{
  const open=mobileMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded',String(open));
  mobileMenu.setAttribute('aria-hidden',String(!open));
});
mobileMenu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  mobileMenu.classList.remove('open');
  menuToggle.setAttribute('aria-expanded','false');
  mobileMenu.setAttribute('aria-hidden','true');
}));

const onScroll=()=>{
  const y=window.scrollY;
  header?.classList.toggle('scrolled',y>24);
  const h=document.documentElement.scrollHeight-window.innerHeight;
  progress.style.width=(h>0?(y/h)*100:0)+'%';
};
window.addEventListener('scroll',onScroll,{passive:true}); onScroll();

if(matchMedia('(pointer:fine)').matches){
  document.addEventListener('mousemove',e=>{
    glow.style.left=e.clientX+'px';
    glow.style.top=e.clientY+'px';
    glow.style.opacity='1';
  });
  portraitStage?.addEventListener('mousemove',e=>{
    const r=portraitStage.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    portraitStage.style.transform=`perspective(900px) rotateY(${x*5}deg) rotateX(${-y*5}deg)`;
  });
  portraitStage?.addEventListener('mouseleave',()=>portraitStage.style.transform='');
}

const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

document.querySelectorAll('.spotlight-card').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const r=card.getBoundingClientRect();
    card.style.setProperty('--mx',(e.clientX-r.left)+'px');
    card.style.setProperty('--my',(e.clientY-r.top)+'px');
  });
});

const explainer=document.getElementById('mapExplainer');
const nodes=document.querySelectorAll('.map-node');
nodes.forEach(node=>{
  node.addEventListener('mouseenter',()=>{
    nodes.forEach(n=>n.classList.remove('active'));
    node.classList.add('active');
    const title=node.dataset.title||'';
    const text=node.dataset.text||'';
    if(explainer){
      explainer.querySelector('strong').textContent=title;
      explainer.querySelector('p').textContent=text;
    }
  });
});
