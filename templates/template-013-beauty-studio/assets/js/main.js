/* ============================================
   T013 Beauty Studio — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded',()=>{

  /* ---------- Header scroll effect ---------- */
  const header=document.querySelector('.site-header');
  window.addEventListener('scroll',()=>{
    header.classList.toggle('scrolled',window.scrollY>50);
  });

  /* ---------- Hamburger menu ---------- */
  const hamburger=document.querySelector('.hamburger');
  const mobileMenu=document.querySelector('.mobile-menu');
  const overlay=document.querySelector('.mobile-overlay');

  function toggleMenu(){
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow=mobileMenu.classList.contains('active')?'hidden':'';
  }

  if(hamburger){
    hamburger.addEventListener('click',toggleMenu);
    overlay.addEventListener('click',toggleMenu);
    mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',toggleMenu));
  }

  /* ---------- FAQ Accordion ---------- */
  document.querySelectorAll('.faq-question').forEach(q=>{
    q.addEventListener('click',()=>{
      const item=q.parentElement;
      const wasActive=item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('active'));
      if(!wasActive) item.classList.add('active');
    });
  });

  /* ---------- Booking form fake submit ---------- */
  const bookingForm=document.querySelector('#bookingForm');
  if(bookingForm){
    bookingForm.addEventListener('submit',e=>{
      e.preventDefault();
      const success=document.querySelector('.form-success');
      if(success){
        bookingForm.style.display='none';
        success.style.display='block';
      }else{
        alert('預約已成功送出！我們會盡快與您聯繫確認。');
        bookingForm.reset();
      }
    });
  }

  /* ---------- Contact form fake submit ---------- */
  const contactForm=document.querySelector('#contactForm');
  if(contactForm){
    contactForm.addEventListener('submit',e=>{
      e.preventDefault();
      const success=document.querySelector('.form-success');
      if(success){
        contactForm.style.display='none';
        success.style.display='block';
      }else{
        alert('訊息已成功送出！我們會盡快回覆您。');
        contactForm.reset();
      }
    });
  }

  /* ---------- Smooth scroll for anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const id=a.getAttribute('href');
      if(id==='#') return;
      const target=document.querySelector(id);
      if(target){
        e.preventDefault();
        const top=target.getBoundingClientRect().top+window.scrollY-80;
        window.scrollTo({top,behavior:'smooth'});
      }
    });
  });

  /* ---------- Back to top ---------- */
  const backToTop=document.querySelector('.back-to-top');
  if(backToTop){
    window.addEventListener('scroll',()=>{
      backToTop.classList.toggle('visible',window.scrollY>500);
    });
    backToTop.addEventListener('click',()=>{
      window.scrollTo({top:0,behavior:'smooth'});
    });
  }

  /* ---------- Fade-up scroll animation ---------- */
  const fadeEls=document.querySelectorAll('.fade-up');
  if(fadeEls.length){
    const io=new IntersectionObserver((entries)=>{
      entries.forEach(en=>{
        if(en.isIntersecting){
          en.target.classList.add('visible');
          io.unobserve(en.target);
        }
      });
    },{threshold:0.15});
    fadeEls.forEach(el=>io.observe(el));
  }

  /* ---------- Active nav link ---------- */
  const currentPage=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav-menu a, .mobile-menu a').forEach(a=>{
    const href=a.getAttribute('href');
    if(href===currentPage) a.classList.add('active');
  });

});
