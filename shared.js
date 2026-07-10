(function(){
  // Page veil fade-in
  document.body.classList.remove('leaving');

  // Nav scroll
  const nav=document.getElementById('nav');
  if(nav) window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>40));

  // Mobile menu
  const ham=document.getElementById('ham');
  const mob=document.getElementById('mob');
  const mc=document.getElementById('mob-close');
  if(ham&&mob){
    ham.addEventListener('click',()=>mob.classList.add('open'));
    if(mc) mc.addEventListener('click',()=>mob.classList.remove('open'));
    mob.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mob.classList.remove('open')));
  }

  // Page transitions (internal links only)
  document.querySelectorAll('a[href]').forEach(a=>{
    const h=a.getAttribute('href');
    if(!h||h.startsWith('#')||h.startsWith('mailto')||h.startsWith('tel')||h.startsWith('http')||a.target==='_blank') return;
    a.addEventListener('click',e=>{
      e.preventDefault();
      document.body.classList.add('leaving');
      setTimeout(()=>window.location.href=h,300);
    });
  });

  // Scroll reveal
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);}});
  },{threshold:.08,rootMargin:'0px 0px -36px 0px'});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

  // Contact form AJAX
  const form=document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit',async e=>{
      e.preventDefault();
      const btn=form.querySelector('.form-submit');
      btn.textContent='Sending…';btn.disabled=true;
      try{
        const res=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});
        if(res.ok){form.style.display='none';document.getElementById('form-success').style.display='block';}
        else{btn.textContent='Something went wrong — try emailing directly';btn.disabled=false;}
      }catch{btn.textContent='Something went wrong — try emailing directly';btn.disabled=false;}
    });
  }
})();
