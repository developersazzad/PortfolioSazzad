
(function(){
  "use strict";
  /* reveal on scroll */
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target);}});},{threshold:.14});
  document.querySelectorAll('.rv').forEach(function(el){io.observe(el);});

  /* scroll parallax */
  var plx=[].slice.call(document.querySelectorAll('[data-plx]'));
  function onScroll(){var y=window.scrollY;plx.forEach(function(el){var s=parseFloat(el.getAttribute('data-plx'));el.style.translate='0 '+(-y*s)+'px';});}
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();

  /* pointer tilt (3D) */
  document.querySelectorAll('.tilt').forEach(function(el){
    el.addEventListener('pointermove',function(ev){
      var r=el.getBoundingClientRect(),x=(ev.clientX-r.left)/r.width-.5,y=(ev.clientY-r.top)/r.height-.5;
      el.style.transform='rotateX('+(-y*7)+'deg) rotateY('+(x*9)+'deg)';
    });
    el.addEventListener('pointerleave',function(){el.style.transform='';});
  });

  /* admin laptop tabs */
  var tabs=document.getElementById('admintabs'),scr=document.getElementById('adminscreen');
  if(tabs&&scr){
    var imgs=scr.querySelectorAll('img');
    tabs.addEventListener('click',function(ev){
      var b=ev.target.closest('button');if(!b)return;
      tabs.querySelectorAll('button').forEach(function(x){x.classList.toggle('on',x===b);});
      imgs.forEach(function(im,i){im.classList.toggle('on',i===+b.getAttribute('data-img'));});
    });
  }

  /* counters */
  var cio=new IntersectionObserver(function(es){es.forEach(function(e){
    if(!e.isIntersecting)return;cio.unobserve(e.target);
    var el=e.target,end=+el.getAttribute('data-count'),t0=null;
    function step(t){if(!t0)t0=t;var p=Math.min((t-t0)/1200,1);el.textContent=Math.round(end*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(step);}
    requestAnimationFrame(step);
  });},{threshold:.6});
  document.querySelectorAll('[data-count]').forEach(function(el){cio.observe(el);});

  /* nav active state */
  var secs=[].slice.call(document.querySelectorAll('main section'));
  var links=[].slice.call(document.querySelectorAll('.nav .links a'));
  var nio=new IntersectionObserver(function(es){es.forEach(function(e){
    if(e.isIntersecting){links.forEach(function(a){a.classList.toggle('act',a.getAttribute('href')==='#'+e.target.id);});}
  });},{rootMargin:'-40% 0px -55% 0px'});
  secs.forEach(function(s){nio.observe(s);});

  /* mobile menu */
  var navEl=document.querySelector('.nav'),burger=document.getElementById('burger');
  if(burger){
    burger.addEventListener('click',function(e){
      e.stopPropagation();
      var open=navEl.classList.toggle('open');
      burger.setAttribute('aria-expanded',open?'true':'false');
    });
    document.querySelector('.nav .links').addEventListener('click',function(){navEl.classList.remove('open');burger.setAttribute('aria-expanded','false');});
    document.addEventListener('click',function(e){if(!navEl.contains(e.target))navEl.classList.remove('open');});
  }
})();
