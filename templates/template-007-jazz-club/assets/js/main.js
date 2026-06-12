/* T007 Jazz Club — Main JS */
(function(){
  /* === Header scroll effect === */
  var header = document.querySelector('.site-header');
  window.addEventListener('scroll', function(){
    header.classList.toggle('scrolled', window.scrollY > 60);
  });

  /* === Centered Logo Navigation — Mobile hamburger (right slide) === */
  var hamburger = document.querySelector('.hamburger');
  var mobileMenu = document.querySelector('.mobile-menu');
  var overlay = document.querySelector('.mobile-overlay');
  function toggleMenu(){
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    overlay.classList.toggle('show');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  }
  if(hamburger){
    hamburger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
    mobileMenu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        if(mobileMenu.classList.contains('open')) toggleMenu();
      });
    });
  }

  /* === FAQ Accordion === */
  document.querySelectorAll('.faq-question').forEach(function(q){
    q.addEventListener('click', function(){
      var item = q.parentElement;
      var answer = item.querySelector('.faq-answer');
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function(i){
        i.classList.remove('open');
        i.querySelector('.faq-answer').style.maxHeight = null;
      });
      if(!isOpen){
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* === Form fake submit === */
  document.querySelectorAll('.booking-form, .contact-form').forEach(function(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var success = form.parentElement.querySelector('.form-success') || form.querySelector('.form-success');
      if(success){
        success.style.display = 'block';
        success.textContent = '表單已成功送出！（此為展示用，不會實際送出資料）';
        form.reset();
        setTimeout(function(){ success.style.display = 'none'; }, 5000);
      }
    });
  });

  /* === Smooth scroll for anchor links === */
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var target = document.querySelector(a.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* === Back to top button === */
  var btt = document.querySelector('.back-to-top');
  if(btt){
    window.addEventListener('scroll', function(){
      btt.classList.toggle('visible', window.scrollY > 400);
    });
    btt.addEventListener('click', function(){
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* === Hero floating glow particles animation === */
  var particleContainer = document.querySelector('.hero-particles');
  if(particleContainer){
    function createParticle(){
      var p = document.createElement('div');
      p.className = 'particle dynamic';
      var size = Math.random() * 4 + 2;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = Math.random() * 100 + '%';
      p.style.top = Math.random() * 100 + '%';
      p.style.position = 'absolute';
      p.style.borderRadius = '50%';
      p.style.background = 'var(--color-accent)';
      p.style.opacity = '0';
      p.style.transition = 'opacity 2s ease';
      p.style.pointerEvents = 'none';
      particleContainer.appendChild(p);
      requestAnimationFrame(function(){
        p.style.opacity = (Math.random() * 0.5 + 0.1).toString();
      });
      setTimeout(function(){
        p.style.opacity = '0';
        setTimeout(function(){ if(p.parentNode) p.parentNode.removeChild(p); }, 2000);
      }, 3000 + Math.random() * 2000);
    }
    setInterval(createParticle, 800);
  }

  /* === Scroll reveal animation === */
  var revealEls = document.querySelectorAll('.section, .vintage-card, .artist-card, .drink-card, .blog-card, .review-card');
  var observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(function(el){
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
})();
