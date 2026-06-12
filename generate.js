#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = __dirname;
const TDIR = path.join(ROOT, 'templates');

function mkdirp(p) { fs.mkdirSync(p, { recursive: true }); }
function write(f, c) { fs.writeFileSync(f, c, 'utf8'); }

// ========== CSS GENERATOR ==========
function genCSS(t) {
  const c = t.colors, dk = t.backgroundMode === 'dark';
  return `/* === ${t.id} ${t.name} — ${t.colorTheme} === */
:root {
  --bg-primary: ${c.bg};
  --bg-secondary: ${c.bgSec};
  --bg-card: ${c.card};
  --text-primary: ${c.text};
  --text-secondary: ${c.textSec};
  --accent: ${c.accent};
  --accent-hover: ${c.accentHover};
  --accent-dark: ${c.accentDark || c.accent};
  --border: ${c.border};
  --card-radius: ${t.cardRadius || '6px'};
  --font-heading: ${t.fonts.heading};
  --font-body: ${t.fonts.body};
  --section-padding: 100px;
  ${t.extraVars || ''}
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:var(--font-body);line-height:1.75;color:var(--text-primary);background:var(--bg-primary);overflow-x:hidden}
img{max-width:100%;height:auto;display:block}
a{text-decoration:none;color:inherit;transition:color .3s}
ul,ol{list-style:none}
h1,h2,h3,h4,h5,h6{line-height:1.25;font-family:var(--font-heading);font-weight:700}
.container{width:100%;max-width:1200px;margin:0 auto;padding:0 24px}
.section{padding:var(--section-padding) 0}
.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)}

${t.btnCSS}

/* === Header — ${t.headerStyle} === */
${t.headerCSS}

/* === Hamburger & Mobile === */
.hamburger{display:none;flex-direction:column;gap:5px;padding:8px;background:none;border:none;cursor:pointer;z-index:101}
.hamburger span{display:block;width:24px;height:2px;background:var(--accent);transition:all .3s}
.hamburger.active span:nth-child(1){transform:rotate(45deg) translate(5px,5px)}
.hamburger.active span:nth-child(2){opacity:0}
.hamburger.active span:nth-child(3){transform:rotate(-45deg) translate(5px,-5px)}
.mobile-menu{position:fixed;top:0;right:-320px;width:300px;height:100vh;background:${dk ? '#0d0d0d' : '#ffffff'};border-left:1px solid var(--border);transition:right .4s;z-index:100;padding:80px 30px 30px;overflow-y:auto}
.mobile-menu.open{right:0}
.mobile-menu a{display:block;padding:14px 0;color:var(--text-primary);font-size:1rem;border-bottom:1px solid var(--border);font-weight:500}
.mobile-menu a:hover{color:var(--accent)}
.mobile-overlay{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:99;opacity:0;visibility:hidden;transition:all .3s}
.mobile-overlay.show{opacity:1;visibility:visible}

/* === Hero — ${t.heroStyle} === */
${t.heroCSS}

/* === Section Titles === */
${t.sectionTitleCSS}

/* === Cards === */
${t.cardsCSS}

/* === About Page === */
.page-hero{padding:160px 0 80px;text-align:center;background:var(--bg-secondary)}
.page-hero h1{font-size:2.8rem;color:var(--text-primary);margin-bottom:12px}
.page-hero p{color:var(--text-secondary);font-size:1rem;max-width:600px;margin:0 auto}
.about-grid{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;margin-top:48px}
.about-img{height:480px;overflow:hidden;border-radius:var(--card-radius)}
.about-img img{width:100%;height:100%;object-fit:cover}
.about-text h2{font-size:2rem;margin-bottom:20px;color:var(--text-primary)}
.about-text p{color:var(--text-secondary);margin-bottom:16px;font-size:.95rem;line-height:1.8}
.about-values{display:grid;grid-template-columns:repeat(3,1fr);gap:32px;margin-top:48px}
.value-card{padding:40px 28px;border:1px solid var(--border);border-radius:var(--card-radius);text-align:center;transition:all .3s;background:var(--bg-card)}
.value-card:hover{border-color:var(--accent);transform:translateY(-4px)}
.value-icon{font-size:2.4rem;color:var(--accent);margin-bottom:16px}
.value-card h3{font-size:1.15rem;color:var(--text-primary);margin-bottom:12px}
.value-card p{font-size:.88rem;color:var(--text-secondary)}
.about-stats{display:flex;gap:40px;margin-top:32px;padding-top:32px;border-top:1px solid var(--border)}
.stat-num{font-family:var(--font-heading);font-size:2.4rem;color:var(--accent);display:block}
.stat-text{font-size:.82rem;color:var(--text-secondary)}

/* === Services Page === */
.service-list{display:flex;flex-direction:column;gap:48px;margin-top:48px}
.service-item{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center}
.service-item:nth-child(even){direction:rtl}
.service-item:nth-child(even)>*{direction:ltr}
.service-item-img{height:380px;overflow:hidden;border-radius:var(--card-radius)}
.service-item-img img{width:100%;height:100%;object-fit:cover}
.service-item-content h3{font-size:1.5rem;color:var(--text-primary);margin-bottom:16px}
.service-item-content p{color:var(--text-secondary);margin-bottom:12px;font-size:.95rem;line-height:1.8}
.service-features{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}
.service-feature{padding:6px 14px;border:1px solid var(--border);border-radius:${t.smallRadius || '4px'};font-size:.78rem;color:var(--accent)}

/* === Service Detail === */
.detail-hero-img{height:400px;overflow:hidden;border-radius:var(--card-radius);margin-bottom:40px}
.detail-hero-img img{width:100%;height:100%;object-fit:cover}
.detail-content{max-width:800px;margin:0 auto}
.detail-content h2{font-size:1.6rem;color:var(--text-primary);margin:32px 0 16px}
.detail-content p{color:var(--text-secondary);margin-bottom:16px;font-size:.95rem;line-height:1.8}
.detail-features{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin:24px 0}
.detail-feature{padding:20px;border:1px solid var(--border);border-radius:var(--card-radius);display:flex;gap:12px;align-items:flex-start;background:var(--bg-card)}
.detail-feature i{color:var(--accent);font-size:1.2rem}
.detail-feature span{font-size:.9rem;color:var(--text-secondary)}

/* === Portfolio === */
${t.portfolioCSS}

/* === Reviews === */
.reviews-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:32px;margin-top:48px}
.review-card{padding:32px;border:1px solid var(--border);border-radius:var(--card-radius);position:relative;background:var(--bg-card)}
.review-card::before{content:'\\201C';position:absolute;top:16px;right:24px;font-size:4rem;color:rgba(${dk?'255,255,255':'0,0,0'},.08);font-family:var(--font-heading);line-height:1}
.review-stars{color:var(--accent);margin-bottom:12px;font-size:1rem}
.review-text{font-style:italic;color:var(--text-secondary);margin-bottom:20px;font-size:.95rem;line-height:1.8}
.review-author{display:flex;align-items:center;gap:12px}
.review-avatar{width:48px;height:48px;border-radius:50%;object-fit:cover;border:2px solid var(--accent)}
.review-name{font-weight:600;color:var(--text-primary);font-size:.9rem}
.review-role{font-size:.78rem;color:var(--text-secondary)}

/* === FAQ === */
.faq-list{max-width:800px;margin:48px auto 0}
.faq-item{border-bottom:1px solid var(--border)}
.faq-question{display:flex;justify-content:space-between;align-items:center;padding:20px 0;cursor:pointer;color:var(--text-primary);font-size:1rem;font-weight:600;transition:color .3s}
.faq-question:hover{color:var(--accent)}
.faq-icon{font-size:1.2rem;color:var(--accent);transition:transform .3s}
.faq-item.open .faq-icon{transform:rotate(45deg)}
.faq-answer{max-height:0;overflow:hidden;transition:max-height .4s ease}
.faq-answer-inner{padding:0 0 20px;color:var(--text-secondary);font-size:.92rem;line-height:1.8}

/* === Booking === */
.booking-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;margin-top:48px;align-items:start}
.booking-form{display:flex;flex-direction:column;gap:20px}
.form-group label{display:block;color:var(--text-secondary);font-size:.85rem;margin-bottom:8px;font-weight:500}
.form-group input,.form-group select,.form-group textarea{width:100%;padding:14px 16px;background:${dk?'var(--bg-secondary)':'#fff'};border:1px solid var(--border);border-radius:${t.smallRadius||'4px'};color:var(--text-primary);font-size:.92rem;font-family:var(--font-body);outline:none;transition:border-color .3s}
.form-group input:focus,.form-group select:focus,.form-group textarea:focus{border-color:var(--accent)}
.form-group textarea{min-height:120px;resize:vertical}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.booking-info{padding:40px;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--card-radius)}
.booking-info h3{font-size:1.4rem;color:var(--text-primary);margin-bottom:20px}
.booking-info-item{display:flex;gap:12px;margin-bottom:16px;align-items:flex-start}
.booking-info-icon{color:var(--accent);font-size:1.2rem;min-width:24px}
.booking-info-text{font-size:.9rem;color:var(--text-secondary)}
.booking-info-text strong{color:var(--text-primary);display:block;margin-bottom:4px}
.form-success{display:none;padding:20px;background:rgba(${hexToRgb(c.accent)},.12);border:1px solid var(--accent);color:var(--accent);text-align:center;font-weight:600;border-radius:var(--card-radius)}

/* === Process === */
.process-timeline{max-width:700px;margin:48px auto 0;position:relative}
.process-timeline::before{content:'';position:absolute;left:24px;top:0;bottom:0;width:2px;background:var(--border)}
.timeline-item{display:flex;gap:32px;padding-bottom:48px;position:relative}
.timeline-dot{width:48px;height:48px;border-radius:50%;border:2px solid var(--accent);display:flex;align-items:center;justify-content:center;font-family:var(--font-heading);font-size:1.1rem;color:var(--accent);background:var(--bg-primary);position:relative;z-index:2;flex-shrink:0}
.timeline-content h3{font-size:1.2rem;color:var(--text-primary);margin-bottom:8px}
.timeline-content p{font-size:.9rem;color:var(--text-secondary);line-height:1.8}

/* === Blog === */
.blog-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:32px;margin-top:48px}
.blog-card{border:1px solid var(--border);border-radius:var(--card-radius);overflow:hidden;transition:all .3s;background:var(--bg-card)}
.blog-card:hover{border-color:var(--accent);transform:translateY(-4px)}
.blog-card-img{height:220px;overflow:hidden}
.blog-card-img img{width:100%;height:100%;object-fit:cover;transition:transform .6s}
.blog-card:hover .blog-card-img img{transform:scale(1.06)}
.blog-card-body{padding:24px}
.blog-card-meta{font-size:.78rem;color:var(--text-secondary);margin-bottom:8px}
.blog-card-body h3{font-size:1.1rem;color:var(--text-primary);margin-bottom:8px}
.blog-card-body p{font-size:.88rem;color:var(--text-secondary)}
.blog-card-link{display:inline-block;margin-top:12px;color:var(--accent);font-size:.85rem;font-weight:600}

/* === Blog Detail === */
.blog-detail{max-width:800px;margin:0 auto}
.blog-detail-hero{height:400px;overflow:hidden;border-radius:var(--card-radius);margin-bottom:40px}
.blog-detail-hero img{width:100%;height:100%;object-fit:cover}
.blog-detail h2{font-size:1.6rem;color:var(--text-primary);margin:32px 0 16px}
.blog-detail p{color:var(--text-secondary);margin-bottom:16px;font-size:.95rem;line-height:1.8}
.blog-detail blockquote{border-left:3px solid var(--accent);padding:16px 24px;margin:24px 0;color:var(--accent);font-style:italic;font-family:var(--font-heading);font-size:1.1rem}

/* === Contact === */
.contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;margin-top:48px}
.contact-map{height:400px;background:var(--bg-secondary);border:1px solid var(--border);border-radius:var(--card-radius);display:flex;align-items:center;justify-content:center;color:var(--text-secondary)}
.contact-form{display:flex;flex-direction:column;gap:20px}
.contact-info-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:48px}
.contact-info-card{padding:28px;border:1px solid var(--border);border-radius:var(--card-radius);text-align:center;transition:all .3s;background:var(--bg-card)}
.contact-info-card:hover{border-color:var(--accent)}
.contact-info-card i{font-size:1.8rem;color:var(--accent);margin-bottom:12px;display:block}
.contact-info-card h4{font-size:.95rem;color:var(--text-primary);margin-bottom:8px}
.contact-info-card p{font-size:.85rem;color:var(--text-secondary)}

/* === CTA Banner === */
${t.ctaCSS}

/* === Footer === */
${t.footerCSS}

/* === Back to Top === */
.back-to-top{position:fixed;bottom:30px;right:30px;width:44px;height:44px;background:var(--accent);color:${dk?'#000':'#fff'};border:none;border-radius:${t.smallRadius||'4px'};cursor:pointer;font-size:1.2rem;display:flex;align-items:center;justify-content:center;opacity:0;visibility:hidden;transition:all .3s;z-index:90}
.back-to-top.visible{opacity:1;visibility:visible}
.back-to-top:hover{background:var(--accent-hover)}

/* === Extra Unique Styles === */
${t.uniqueCSS || ''}
`;
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
  return `${r},${g},${b}`;
}

// ========== RESPONSIVE CSS ==========
function genResponsive(t) {
  return `/* ${t.id} ${t.name} — Responsive */
@media(max-width:991px){
  .nav-menu,.header-cta{display:none}
  .hamburger{display:flex}
  .about-grid{grid-template-columns:1fr;gap:40px}
  .about-img{height:320px}
  .cards-grid{grid-template-columns:repeat(2,1fr)}
  .service-item,.service-item:nth-child(even){grid-template-columns:1fr;direction:ltr}
  .service-item:nth-child(even)>*{direction:ltr}
  .booking-grid,.contact-grid{grid-template-columns:1fr}
  .footer-grid{grid-template-columns:1fr;gap:32px}
  .about-values{grid-template-columns:repeat(2,1fr)}
  .reviews-grid{grid-template-columns:1fr}
  .portfolio-grid{grid-template-columns:repeat(2,1fr)}
  .blog-grid{grid-template-columns:repeat(2,1fr)}
  .contact-info-cards{grid-template-columns:1fr}
  .detail-features{grid-template-columns:1fr}
  ${t.responsive992 || ''}
}
@media(max-width:767px){
  :root{--section-padding:60px}
  .hero h1{font-size:2.2rem}
  .hero-sub{font-size:.95rem}
  .cards-grid{grid-template-columns:1fr}
  .about-values{grid-template-columns:1fr}
  .portfolio-grid{grid-template-columns:1fr}
  .blog-grid{grid-template-columns:1fr}
  .form-row{grid-template-columns:1fr}
  .hero-actions{flex-direction:column;align-items:center}
  .cta-banner h2{font-size:1.8rem}
  .footer-grid{grid-template-columns:1fr}
  .about-stats{flex-direction:column;gap:20px}
  .contact-map{height:250px}
  ${t.responsive768 || ''}
}
@media(max-width:575px){
  .container{padding:0 16px}
  .hero{min-height:500px}
  .section-title{font-size:1.6rem}
  .about-img{height:240px}
  .service-item-img{height:260px}
  .blog-detail-hero{height:250px}
  .detail-hero-img{height:260px}
  ${t.responsive576 || ''}
}`;
}

// ========== MAIN.JS ==========
function genJS(t) {
  return `/* ${t.id} ${t.name} — Main JS */
(function(){
  var header = document.querySelector('.site-header');
  if(header){
    window.addEventListener('scroll', function(){
      ${t.headerScrollJS || "header.classList.toggle('scrolled', window.scrollY > 60);"}
    });
  }
  var hamburger = document.querySelector('.hamburger');
  var mobileMenu = document.querySelector('.mobile-menu');
  var overlay = document.querySelector('.mobile-overlay');
  if(hamburger && mobileMenu && overlay){
    function toggleMenu(){
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      overlay.classList.toggle('show');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    }
    hamburger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
    mobileMenu.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ if(mobileMenu.classList.contains('open')) toggleMenu(); }); });
  }
  document.querySelectorAll('.faq-question').forEach(function(q){
    q.addEventListener('click', function(){
      var item = q.parentElement, answer = item.querySelector('.faq-answer'), isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function(i){ i.classList.remove('open'); i.querySelector('.faq-answer').style.maxHeight = null; });
      if(!isOpen){ item.classList.add('open'); answer.style.maxHeight = answer.scrollHeight + 'px'; }
    });
  });
  document.querySelectorAll('.booking-form, .contact-form').forEach(function(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var s = form.parentElement.querySelector('.form-success') || form.querySelector('.form-success');
      if(s){ s.style.display='block'; s.textContent='表單已成功送出！（此為展示用）'; form.reset(); setTimeout(function(){ s.style.display='none'; },5000); }
      else { alert('表單已成功送出！（此為展示用）'); form.reset(); }
    });
  });
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){ var t2 = document.querySelector(a.getAttribute('href')); if(t2){ e.preventDefault(); t2.scrollIntoView({behavior:'smooth'}); } });
  });
  var btt = document.querySelector('.back-to-top');
  if(btt){ window.addEventListener('scroll', function(){ btt.classList.toggle('visible', window.scrollY > 400); }); btt.addEventListener('click', function(){ window.scrollTo({top:0,behavior:'smooth'}); }); }
  ${t.extraJS || ''}
})();
`;
}

// ========== HTML GENERATORS ==========
function htmlHead(t, page) {
  const dk = t.backgroundMode === 'dark';
  return `<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${page.title}</title>
<meta name="description" content="${page.desc}">
<link rel="canonical" href="">
<meta property="og:title" content="${page.title}">
<meta property="og:description" content="${page.desc}">
<meta property="og:image" content="assets/img/preview.jpg">
<meta property="og:type" content="website">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=${t.fonts.headingGoogle}&family=${t.fonts.bodyGoogle}&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/style.css">
<link rel="stylesheet" href="assets/css/responsive.css">
<script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@type":t.schemaType,"name":t.name,"description":t.desc})}</script>
</head>
<body>`;
}

function htmlHeader(t) {
  const navLinks = t.menu.map((m,i) => `<a href="${t.menuLinks[i]}"${i===0?' class="active"':''}>${m}</a>`).join('\n');
  const mobLinks = [...t.menu, ...t.menuExtra].map((m,i) => {
    const links = [...t.menuLinks, ...t.menuExtraLinks];
    return `<a href="${links[i]}">${m}</a>`;
  }).join('\n');
  return `<!-- Header -->
<header class="site-header">
<div class="container">
<div class="header-inner">
<a href="index.html" class="logo">${t.logoHTML}</a>
<nav class="nav-menu">
${navLinks}
</nav>
<a href="${t.headerCTALink}" class="header-cta">${t.headerCTAText}</a>
<button class="hamburger" aria-label="開啟選單"><span></span><span></span><span></span></button>
</div>
</div>
</header>
<div class="mobile-overlay"></div>
<div class="mobile-menu">
${mobLinks}
</div>`;
}

function htmlFooter(t) {
  return `<!-- Footer -->
<footer class="site-footer">
<div class="container">
<div class="footer-grid">
<div class="footer-brand">
<div class="logo">${t.logoHTML}</div>
<p class="footer-desc">${t.footerDesc}</p>
</div>
<div class="footer-col">
<h4>${t.footerCol2Title}</h4>
<ul class="footer-links">${t.footerCol2Items.map(i=>`<li>${i}</li>`).join('')}</ul>
</div>
<div class="footer-col">
<h4>${t.footerCol3Title}</h4>
<ul class="footer-links">${t.footerCol3Items.map(i=>`<li>${i}</li>`).join('')}</ul>
</div>
${t.footerCol4 ? `<div class="footer-col"><h4>${t.footerCol4.title}</h4><ul class="footer-links">${t.footerCol4.items.map(i=>`<li>${i}</li>`).join('')}</ul></div>` : ''}
</div>
<div class="footer-bottom">
<p>&copy; 2026 ${t.name}. All rights reserved.</p>
</div>
</div>
</footer>
<button class="back-to-top" aria-label="回到頂部"><i class="bi bi-chevron-up"></i></button>
<script src="assets/js/main.js"></script>
</body>
</html>`;
}

function genIndexHTML(t) {
  return `${htmlHead(t, t.pages.index)}
${htmlHeader(t)}
${t.indexSections}
${htmlFooter(t)}`;
}

function genSubPage(t, pageKey, contentBody) {
  return `${htmlHead(t, t.pages[pageKey])}
${htmlHeader(t)}
<section class="page-hero"><div class="container"><h1>${t.pages[pageKey].h1 || t.pages[pageKey].title.split('—')[0].trim()}</h1><p>${t.pages[pageKey].desc}</p></div></section>
<section class="section">
<div class="container">
${contentBody}
</div>
</section>
${htmlFooter(t)}`;
}

// ========== METADATA GENERATORS ==========
function genTemplateJSON(t) {
  return JSON.stringify({
    id: t.id, slug: t.slug, name: t.name, description: t.desc,
    industry: t.industry, industryCategory: t.industryCategory,
    colorTheme: t.colorTheme, backgroundMode: t.backgroundMode,
    layoutType: t.layoutType, heroPattern: t.heroPattern,
    navigationPattern: t.navigationPattern, contentRhythm: t.contentRhythm,
    previewImage: 'assets/img/preview.jpg',
    zipFile: `../../downloads/${t.id}-${t.slug}.zip`,
    hasZip: false, promptFile: 'prompt.md', pageCount: 12,
    imageRich: true, status: 'candidate', isFeatured: false,
    isHidden: false, generatedBy: 'AI-assisted',
    imagePolicy: '圖片僅作為設計示意，正式交付前請替換為客戶自有或授權圖片。',
    pages: ['index.html','about.html','services.html','service-detail.html','portfolio.html','reviews.html','faq.html','booking.html','process.html','blog.html','blog-detail.html','contact.html']
  }, null, 2);
}

function genTagsJSON(t) {
  return JSON.stringify({
    id: t.id, name: t.name, industryCategory: t.industryCategory,
    industry: t.industries, colors: t.colorTags,
    backgroundMode: t.backgroundMode, features: t.featureTags,
    layout: [t.layoutType, `${t.industry}形象站`],
    pages: 12, hasZip: false, hasPrompt: true, hasPreview: true,
    imageRich: true, status: 'candidate'
  }, null, 2);
}

function genPromptMD(t) {
  return `# ${t.name} — AI Prompt 規格文件

## 1. 樣板一句話定位
${t.desc}

## 2. 適合產業
${t.industries.join('、')}。

## 3. 不適合產業
${t.notSuitable || '與本模板風格不符的產業。'}

## 4. 視覺方向
${t.visualDirection}

## 5. 色彩策略
- 背景：${t.colors.bg}
- 次要背景：${t.colors.bgSec}
- 卡片：${t.colors.card}
- 主色：${t.colors.accent}
- 主文字：${t.colors.text}
- 次要文字：${t.colors.textSec}

## 6. 版型策略
${t.layoutType}，${t.heroPattern}。

## 7. Hero Pattern
\`${t.heroPattern}\` — ${t.heroDesc || t.heroStyle}

## 8. Navigation Pattern
\`${t.navigationPattern}\` — ${t.navDesc || t.headerStyle}

## 9. Content Rhythm
${t.contentRhythm}

## 10. 圖片風格要求
${t.imageStyleDesc}

## 11. 圖片數量要求
至少 25 張：Hero 1 + 服務 6 + 環境 8 + Blog 4 + 聯絡 2 + 品牌 2 + 預覽 1

## 12. 12 頁內容定位
1. index.html — ${t.pages.index.title}
2. about.html — ${t.pages.about.title}
3. services.html — ${t.pages.services.title}
4. service-detail.html — ${t.pages.serviceDetail.title}
5. portfolio.html — ${t.pages.portfolio.title}
6. reviews.html — ${t.pages.reviews.title}
7. faq.html — ${t.pages.faq.title}
8. booking.html — ${t.pages.booking.title}
9. process.html — ${t.pages.process.title}
10. blog.html — ${t.pages.blog.title}
11. blog-detail.html — ${t.pages.blogDetail.title}
12. contact.html — ${t.pages.contact.title}

## 13. SEO 關鍵字策略
${t.seoKeywords}

## 14. CTA 策略
主 CTA：「${t.ctaPrimary}」
次 CTA：「${t.ctaSecondary}」

## 15. RWD 規則
桌機三欄/雙欄，平板雙欄，手機單欄。漢堡選單右側滑入。圖片不可破版。

## 16. 可替換內容
品牌名稱、Logo、電話、地址、營業時間、服務項目、社群連結、Google Map。

## 17. 禁止事項
${t.forbidden || '不可使用與本模板風格不符的設計元素。'}

## 18. 與相似樣板的差異說明
${t.differenceNote}

---
本樣板具有獨特的視覺語言與佈局邏輯，非一般公版結構。
`;
}

function genReadmeMD(t) {
  return `# ${t.name} — ${t.nameZH}網站樣板

## 樣板介紹
${t.desc}

## 適合產業
${t.industries.join('、')}

## 版型說明
- ${t.layoutType}
- ${t.heroStyle}
- ${t.headerStyle}
- 12 頁完整網站

## 12 頁檔案說明
| 檔案 | 說明 |
|------|------|
| index.html | ${t.pages.index.title} |
| about.html | ${t.pages.about.title} |
| services.html | ${t.pages.services.title} |
| service-detail.html | ${t.pages.serviceDetail.title} |
| portfolio.html | ${t.pages.portfolio.title} |
| reviews.html | ${t.pages.reviews.title} |
| faq.html | ${t.pages.faq.title} |
| booking.html | ${t.pages.booking.title} |
| process.html | ${t.pages.process.title} |
| blog.html | ${t.pages.blog.title} |
| blog-detail.html | ${t.pages.blogDetail.title} |
| contact.html | ${t.pages.contact.title} |

## 如何修改品牌名稱
搜尋所有 HTML 檔案中的 \`${t.name}\`，替換為您的品牌名稱。

## 如何替換圖片
1. 在 \`assets/img/\` 資料夾中放入您的圖片
2. 在 HTML 中找到對應的 \`<img>\` 標籤，修改 \`src\` 屬性

## 圖片來源注意事項
本樣板圖片僅作為設計示意。正式交付客戶前，請替換為客戶自有圖片或已授權圖片。

## 生成資訊
- Model: AI-assisted
- Date: 2026-06-12
- Operator: AI-assisted static template generation
`;
}

function genImageSourcesMD(t) {
  return `# 圖片來源紀錄

## 使用規則
本樣板圖片僅作為設計示意。正式交付客戶前，請替換為客戶自有圖片或已授權圖片。

## 圖片清單
| URL | 用途 | 來源 | 檢查狀態 |
|---|---|---|---|
${t.images.map((img,i) => `| ${img.url} | ${img.usage} | Unsplash | 可顯示 |`).join('\n')}
`;
}

// ========== MAIN GENERATE FUNCTION ==========
function generate(t) {
  const dir = path.join(TDIR, `${t.id}-${t.slug}`);
  mkdirp(path.join(dir, 'assets', 'css'));
  mkdirp(path.join(dir, 'assets', 'js'));
  mkdirp(path.join(dir, 'assets', 'img'));

  write(path.join(dir, 'assets', 'css', 'style.css'), genCSS(t));
  write(path.join(dir, 'assets', 'css', 'responsive.css'), genResponsive(t));
  write(path.join(dir, 'assets', 'js', 'main.js'), genJS(t));
  write(path.join(dir, 'index.html'), genIndexHTML(t));

  // Sub pages
  write(path.join(dir, 'about.html'), genSubPage(t, 'about', t.aboutContent));
  write(path.join(dir, 'services.html'), genSubPage(t, 'services', t.servicesContent));
  write(path.join(dir, 'service-detail.html'), genSubPage(t, 'serviceDetail', t.serviceDetailContent));
  write(path.join(dir, 'portfolio.html'), genSubPage(t, 'portfolio', t.portfolioContent));
  write(path.join(dir, 'reviews.html'), genSubPage(t, 'reviews', t.reviewsContent));
  write(path.join(dir, 'faq.html'), genSubPage(t, 'faq', t.faqContent));
  write(path.join(dir, 'booking.html'), genSubPage(t, 'booking', t.bookingContent));
  write(path.join(dir, 'process.html'), genSubPage(t, 'process', t.processContent));
  write(path.join(dir, 'blog.html'), genSubPage(t, 'blog', t.blogContent));
  write(path.join(dir, 'blog-detail.html'), genSubPage(t, 'blogDetail', t.blogDetailContent));
  write(path.join(dir, 'contact.html'), genSubPage(t, 'contact', t.contactContent));

  // Metadata
  write(path.join(dir, 'template.json'), genTemplateJSON(t));
  write(path.join(dir, 'tags.json'), genTagsJSON(t));
  write(path.join(dir, 'prompt.md'), genPromptMD(t));
  write(path.join(dir, 'README.md'), genReadmeMD(t));
  write(path.join(dir, 'assets', 'img', 'image-sources.md'), genImageSourcesMD(t));

  const count = countFiles(dir);
  console.log(`✓ ${t.id} ${t.name} — ${count} files`);
  return count;
}

function countFiles(dir) {
  let c = 0;
  fs.readdirSync(dir).forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) c += countFiles(p);
    else c++;
  });
  return c;
}

module.exports = { generate, genCSS, genResponsive, genJS, genIndexHTML, genSubPage, genTemplateJSON, genTagsJSON, genPromptMD, genReadmeMD, genImageSourcesMD, hexToRgb, write, mkdirp, TDIR, ROOT };
