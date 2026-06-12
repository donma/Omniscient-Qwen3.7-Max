/* T001 Luxury Bar — Main JS */
(function(){
  // Header scroll
  var header = document.querySelector('.site-header');
  window.addEventListener('scroll', function(){ header.classList.toggle('scrolled', window.scrollY > 60); });

  // Hamburger
  var hamburger = document.querySelector('.hamburger');
  var mobileMenu = document.querySelector('.mobile-menu');
  var overlay = document.querySelector('.mobile-overlay');
  function toggleMenu(){
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    overlay.classList.toggle('show');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  }
  hamburger.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', toggleMenu);
  mobileMenu.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ if(mobileMenu.classList.contains('open')) toggleMenu(); }); });

  // FAQ Accordion
  document.querySelectorAll('.faq-question').forEach(function(q){
    q.addEventListener('click', function(){
      var item = q.parentElement;
      var answer = item.querySelector('.faq-answer');
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function(i){
        i.classList.remove('open');
        i.querySelector('.faq-answer').style.maxHeight = null;
      });
      if(!isOpen){ item.classList.add('open'); answer.style.maxHeight = answer.scrollHeight + 'px'; }
    });
  });

  // Form fake submit
  document.querySelectorAll('.booking-form, .contact-form').forEach(function(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var success = form.parentElement.querySelector('.form-success') || form.querySelector('.form-success');
      if(success){ success.style.display = 'block'; success.textContent = '表單已成功送出！（此為展示用，不會實際送出資料）'; form.reset(); setTimeout(function(){ success.style.display='none'; }, 5000); }
    });
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var target = document.querySelector(a.getAttribute('href'));
      if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth'}); }
    });
  });

  // Back to top
  var btt = document.querySelector('.back-to-top');
  if(btt){
    window.addEventListener('scroll', function(){ btt.classList.toggle('visible', window.scrollY > 400); });
    btt.addEventListener('click', function(){ window.scrollTo({top:0,behavior:'smooth'}); });
  }
})();
