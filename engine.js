// engine.js — Template generation engine
'use strict';
const fs = require('fs');
const path = require('path');

// === Helpers ===
function imgUrl(photoId, w=800) { return `https://images.unsplash.com/${photoId}?w=${w}&q=80`; }
function esc(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

function pageHead(t, title, desc, schema) {
  const ogTitle = `${title} — ${t.name}`;
  const schemaObj = {"@context":"https://schema.org","@type":t.schemaType||"LocalBusiness","name":t.name,"description":t.industry,"address":{"@type":"PostalAddress","addressLocality":"台北市"},"url":""};
  return `<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${ogTitle}</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="">
<meta property="og:title" content="${ogTitle}">
<meta property="og:description" content="${t.heroSub.substring(0,60)}">
<meta property="og:image" content="assets/img/preview.jpg">
<meta property="og:type" content="website">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=${t.fontImport}&family=Noto+Sans+TC:wght@300;400;500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/style.css">
<link rel="stylesheet" href="assets/css/responsive.css">
<script type="application/ld+json">${JSON.stringify(schemaObj)}</script>
</head>
<body>`;
}

function headerHTML(t) {
  const navItems = t.nav.map((n,i) => `<a href="${t.navLinks[i]}.html"${i===0?' class="active"':''}>${n}</a>`).join('\n');
  const navItemsAll = [...t.nav.map((n,i) => `<a href="${t.navLinks[i]}.html">${n}</a>`), '<a href="contact.html">聯絡我們</a>', '<a href="faq.html">常見問題</a>'].join('\n');
  return `<header class="site-header">
<div class="container">
<div class="header-inner">
<a href="index.html" class="logo">${t.name}<span>${t.industry}</span></a>
<nav class="nav-menu">
${navItems}
</nav>
<a href="booking.html" class="header-cta">${t.headerCta}</a>
<button class="hamburger" aria-label="開啟選單"><span></span><span></span><span></span></button>
</div>
</div>
</header>
<div class="mobile-overlay"></div>
<div class="mobile-menu">
${navItemsAll}
</div>`;
}

function footerHTML(t) {
  const cols = t.footerCols || 3;
  let footerCols = `<div class="footer-brand">
<div class="logo">${t.name}<span>${t.industry}</span></div>
<p class="footer-desc">${t.heroSub}</p>
<div class="footer-social">
<a href="#" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
<a href="#" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
<a href="#" aria-label="Line"><i class="bi bi-line"></i></a>
</div>
</div>`;
  if (cols >= 3) {
    footerCols += `\n<div class="footer-col">
<h4>聯絡我們</h4>
<ul class="footer-links">
<li><i class="bi bi-geo-alt"></i> 台北市大安區忠孝東路四段</li>
<li><i class="bi bi-telephone"></i> 02-2700-8888</li>
<li><i class="bi bi-envelope"></i> info@${t.slug}.com</li>
<li><i class="bi bi-clock"></i> 週一至週日 10:00-21:00</li>
</ul>
</div>`;
  }
  footerCols += `\n<div class="footer-col">
<h4>快速連結</h4>
<ul class="footer-links">
${t.nav.map((n,i) => `<li><a href="${t.navLinks[i]}.html">${n}</a></li>`).join('\n')}
<li><a href="faq.html">常見問題</a></li>
</ul>
</div>`;
  if (cols >= 4) {
    footerCols += `\n<div class="footer-col">
<h4>相關資訊</h4>
<ul class="footer-links">
<li><a href="about.html">關於我們</a></li>
<li><a href="blog.html">最新消息</a></li>
<li><a href="contact.html">聯絡我們</a></li>
<li><a href="booking.html">線上預約</a></li>
</ul>
</div>`;
  }
  return `<footer class="site-footer">
<div class="container">
<div class="footer-grid">
${footerCols}
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

function pageHero(t, title, subtitle) {
  return `<section class="page-hero">
<div class="container">
<span class="section-label">${t.industry}</span>
<h1>${title}</h1>
<p>${subtitle||''}</p>
</div>
</section>`;
}

// === Index Page ===
function genIndex(t) {
  const svcs = t.services.slice(0,3);
  const stats = t.statNums.map((n,i) => `<div class="stat-item"><span class="stat-num">${n}</span><span class="stat-text">${t.statTexts[i]}</span></div>`).join('\n');
  const svcCards = svcs.map((s,i) => `<div class="service-card">
<div class="service-card-img"><img src="${imgUrl(t.imgs[i+3])}" alt="${s.name}"></div>
<div class="service-card-body">
<h3>${s.name}</h3>
<p>${s.desc}</p>
${s.price?`<span class="service-price">${s.price}</span>`:''}
</div>
</div>`).join('\n');
  const reviewCards = t.reviews.slice(0,3).map(r => `<div class="review-card">
<p class="review-text">"${r.text}"</p>
<div class="review-author"><strong>${r.name}</strong><span>${r.title}</span></div>
</div>`).join('\n');
  return `${pageHead(t,`${t.name} — ${t.industry}`,t.heroSub)}
${headerHTML(t)}

<!-- Hero -->
<section class="hero">
<div class="hero-bg" style="background-image:url('${imgUrl(t.imgs[0],1600)}')"></div>
<div class="hero-overlay"></div>
<div class="hero-content">
<span class="hero-label">${t.heroLabel}</span>
<h1>${t.heroTitle}</h1>
<p class="hero-sub">${t.heroSub}</p>
<div class="hero-actions">
<a href="${t.ctaLink}" class="btn-primary-cta"><i class="bi bi-arrow-right"></i> ${t.ctaText}</a>
<a href="${t.cta2Link}" class="btn-secondary-cta"><i class="bi bi-play-circle"></i> ${t.cta2Text}</a>
</div>
</div>
<a href="#about" class="hero-scroll"><i class="bi bi-chevron-down"></i></a>
</section>

<!-- About -->
<section class="section about-brief" id="about">
<div class="container">
<div class="about-grid">
<div class="about-image">
<img src="${imgUrl(t.imgs[1])}" alt="${t.name} ${t.industry}">
</div>
<div class="about-text">
<span class="section-label">About Us</span>
<h2 class="section-title">關於 ${t.name}</h2>
<p>${t.name} 深耕${t.industry}領域，以專業與熱情為每一位客戶打造獨一無二的體驗。我們相信品質與細節是成就卓越的關鍵。</p>
<p>從創立至今，我們持續精進服務品質，用最真誠的態度回應每一位客戶的期待。</p>
<div class="about-stats">
${stats}
</div>
<a href="about.html" class="btn-secondary-cta">了解更多 <i class="bi bi-arrow-right"></i></a>
</div>
</div>
</div>
</section>

<!-- Services -->
<section class="section services-preview" id="services">
<div class="container">
<div style="text-align:center;margin-bottom:48px">
<span class="section-label">Our Services</span>
<h2 class="section-title">精選服務</h2>
<p class="section-desc" style="max-width:600px;margin:0 auto">我們提供最專業的${t.industry}服務，滿足您的各種需求。</p>
</div>
<div class="services-grid">
${svcCards}
</div>
<div style="text-align:center;margin-top:48px">
<a href="services.html" class="btn-secondary-cta">查看所有服務 <i class="bi bi-arrow-right"></i></a>
</div>
</div>
</section>

<!-- Portfolio Preview -->
<section class="section portfolio-preview">
<div class="container">
<span class="section-label">Gallery</span>
<h2 class="section-title">精選展示</h2>
<p class="section-desc">探索我們的${t.industry}精選作品與環境展示。</p>
<div class="portfolio-grid">
${t.imgs.slice(5,9).map((img,i) => `<div class="portfolio-item">
<img src="${imgUrl(img,600)}" alt="${t.name} 作品 ${i+1}">
<div class="portfolio-overlay"><span>View</span></div>
</div>`).join('\n')}
</div>
</div>
</section>

<!-- Reviews -->
<section class="section reviews-preview">
<div class="container">
<div style="text-align:center;margin-bottom:48px">
<span class="section-label">Testimonials</span>
<h2 class="section-title">客戶好評</h2>
</div>
<div class="reviews-grid">
${reviewCards}
</div>
<div style="text-align:center;margin-top:48px">
<a href="reviews.html" class="btn-secondary-cta">更多評價 <i class="bi bi-arrow-right"></i></a>
</div>
</div>
</section>

<!-- CTA -->
<section class="cta-banner">
<div class="cta-bg" style="background-image:url('${imgUrl(t.imgs[2],1600)}')"></div>
<div class="cta-overlay"></div>
<div class="container">
<h2>準備好了嗎？</h2>
<p>立即體驗 ${t.name} 的專業服務，讓我們為您創造最美好的體驗。</p>
<div class="cta-actions">
<a href="booking.html" class="btn-primary-cta"><i class="bi bi-calendar-check"></i> ${t.ctaText}</a>
<a href="contact.html" class="btn-secondary-cta"><i class="bi bi-telephone"></i> 聯絡我們</a>
</div>
</div>
</section>

${footerHTML(t)}`;
}

// === About Page ===
function genAbout(t) {
  const steps = t.process.map((p,i) => `<div class="process-step">
<div class="step-num">${String(i+1).padStart(2,'0')}</div>
<h3>${p.title}</h3>
<p>${p.desc}</p>
</div>`).join('\n');
  return `${pageHead(t,'品牌故事',`了解 ${t.name} 的創立理念與品牌故事`)}
${headerHTML(t)}
${pageHero(t,'品牌故事','了解我們的創立理念、核心價值與發展歷程')}

<section class="section">
<div class="container">
<div class="about-grid">
<div class="about-image">
<img src="${imgUrl(t.imgs[10])}" alt="${t.name} 品牌故事">
</div>
<div class="about-text">
<span class="section-label">Our Story</span>
<h2 class="section-title">品牌由來</h2>
<p>${t.name} 創立於多年之前，源於創辦人對${t.industry}的熱愛與對品質的堅持。我們深信，唯有用心與專業，才能為客戶帶來最優質的體驗。</p>
<p>從最初的構想到如今的規模，每一步都凝聚了團隊的心血與堅持。我們不斷學習、創新，致力於成為${t.industry}領域的標竿。</p>
<p>我們的團隊由一群充滿熱情的專業人士組成，每一位成員都在各自的領域中擁有豐富的經驗。正是這份專業與熱忱，讓我們能夠為每位客戶提供最貼心的服務。</p>
</div>
</div>
</div>
</section>

<section class="section values-section">
<div class="container">
<div style="text-align:center;margin-bottom:48px">
<span class="section-label">Core Values</span>
<h2 class="section-title">核心價值</h2>
</div>
<div class="values-grid">
<div class="value-card">
<i class="bi bi-award"></i>
<h3>品質至上</h3>
<p>每一個細節都經過精心打磨，確保最高品質的產出。</p>
</div>
<div class="value-card">
<i class="bi bi-heart"></i>
<h3>用心服務</h3>
<p>以真誠的態度對待每一位客戶，提供超越期待的體驗。</p>
</div>
<div class="value-card">
<i class="bi bi-lightbulb"></i>
<h3>持續創新</h3>
<p>不斷學習新知，引入最新技術與理念，保持領先地位。</p>
</div>
<div class="value-card">
<i class="bi bi-people"></i>
<h3>團隊合作</h3>
<p>匯聚專業人才，發揮團隊力量，共同達成卓越目標。</p>
</div>
</div>
</div>
</section>

<section class="section process-section">
<div class="container">
<div style="text-align:center;margin-bottom:48px">
<span class="section-label">Our Process</span>
<h2 class="section-title">服務流程</h2>
</div>
<div class="process-grid">
${steps}
</div>
</div>
</section>

<section class="section team-section">
<div class="container">
<span class="section-label">Our Team</span>
<h2 class="section-title">專業團隊</h2>
<p class="section-desc">我們的團隊由經驗豐富的專業人士組成。</p>
<div class="team-grid">
${[0,1,2].map(i => `<div class="team-card">
<div class="team-img"><img src="${imgUrl(t.imgs[11+i],400)}" alt="團隊成員 ${i+1}"></div>
<div class="team-info">
<h3>${['首席顧問','資深專員','創意總監'][i]}</h3>
<p>${['擁有超過15年產業經驗，曾服務於多家知名企業。','專注於客戶體驗優化，擅長解決複雜問題。','負責創新方案設計，持續推出突破性服務。'][i]}</p>
</div>
</div>`).join('\n')}
</div>
</div>
</section>

${footerHTML(t)}`;
}

// === Services Page ===
function genServices(t) {
  const cards = t.services.map((s,i) => `<div class="service-card-full">
<div class="service-card-img"><img src="${imgUrl(t.imgs[i],800)}" alt="${s.name}"></div>
<div class="service-card-body">
<h3>${s.name}</h3>
<p>${s.desc}</p>
${s.price?`<div class="service-price">${s.price}</div>`:''}
<a href="service-detail.html" class="btn-secondary-cta">了解更多 <i class="bi bi-arrow-right"></i></a>
</div>
</div>`).join('\n');
  return `${pageHead(t,'服務項目',`${t.name} 完整服務項目與價格一覽`)}
${headerHTML(t)}
${pageHero(t,'服務項目','了解我們提供的完整服務內容與方案價格')}

<section class="section">
<div class="container">
<div style="text-align:center;margin-bottom:48px">
<span class="section-label">Services</span>
<h2 class="section-title">我們的服務</h2>
<p class="section-desc" style="max-width:600px;margin:0 auto">從基礎到進階，我們提供全方位的${t.industry}服務方案。</p>
</div>
<div class="services-grid-full">
${cards}
</div>
</div>
</section>

<section class="cta-banner">
<div class="cta-bg" style="background-image:url('${imgUrl(t.imgs[7],1600)}')"></div>
<div class="cta-overlay"></div>
<div class="container">
<h2>找到適合您的方案了嗎？</h2>
<p>如有任何疑問，歡迎聯絡我們進行免費諮詢。</p>
<a href="booking.html" class="btn-primary-cta"><i class="bi bi-calendar-check"></i> ${t.ctaText}</a>
</div>
</section>

${footerHTML(t)}`;
}

// === Service Detail Page ===
function genServiceDetail(t) {
  const s = t.services[0];
  const features = ['專業團隊全程服務','客製化方案規劃','免費初步諮詢','完善的售後服務','彈性的付款方式','滿意保證'];
  return `${pageHead(t,`${s.name} 詳情`,`${t.name} — ${s.name}完整介紹`)}
${headerHTML(t)}
${pageHero(t,s.name,s.desc)}

<section class="section">
<div class="container">
<div class="detail-grid">
<div class="detail-main">
<div class="detail-hero-img"><img src="${imgUrl(t.imgs[3],1200)}" alt="${s.name}"></div>
<h2>服務介紹</h2>
<p>${s.desc}</p>
<p>我們的${s.name}服務涵蓋了從前期規劃到後期執行的完整流程。每一步都由經驗豐富的專業人員負責，確保服務品質達到最高標準。</p>
<p>我們深知每位客戶的需求不盡相同，因此提供高度客製化的服務方案。無論您的預算或目標為何，我們都能為您量身打造最適合的解決方案。</p>
<h3>服務特色</h3>
<div class="detail-features">
${features.map(f => `<div class="feature-item"><i class="bi bi-check-circle"></i><span>${f}</span></div>`).join('\n')}
</div>
<h3>服務內容</h3>
<ul class="detail-list">
<li>專業需求分析與評估</li>
<li>客製化方案設計與規劃</li>
<li>專業團隊執行與監控</li>
<li>定期進度回報與溝通</li>
<li>完善的售後追蹤服務</li>
</ul>
</div>
<div class="detail-sidebar">
<div class="sidebar-card">
<h3>方案價格</h3>
<p class="sidebar-price">${s.price||'洽談報價'}</p>
<a href="booking.html" class="btn-primary-cta" style="width:100%;justify-content:center">立即預約</a>
</div>
<div class="sidebar-card">
<h3>其他服務</h3>
${t.services.slice(1,5).map(sv => `<a href="service-detail.html" class="sidebar-link">${sv.name}</a>`).join('\n')}
</div>
</div>
</div>
</div>
</section>

${footerHTML(t)}`;
}

// === Portfolio Page ===
function genPortfolio(t) {
  const items = t.imgs.slice(0,12).map((img,i) => `<div class="portfolio-item">
<img src="${imgUrl(img,600)}" alt="${t.name} 作品 ${i+1}">
<div class="portfolio-overlay">
<h3>${t.industry}作品 ${i+1}</h3>
<p>${t.name} 精選${t.industry}案例展示</p>
</div>
</div>`).join('\n');
  return `${pageHead(t,'作品集/展示',`${t.name} 精選${t.industry}作品與環境展示`)}
${headerHTML(t)}
${pageHero(t,'作品集','探索我們的精選作品與環境展示')}

<section class="section">
<div class="container">
<div class="portfolio-grid-full">
${items}
</div>
</div>
</section>

${footerHTML(t)}`;
}

// === Reviews Page ===
function genReviews(t) {
  const allReviews = [...t.reviews];
  while (allReviews.length < 6) {
    const r = t.reviews[allReviews.length % t.reviews.length];
    allReviews.push({...r, name: r.name + '（更多好評）'});
  }
  const cards = allReviews.slice(0,6).map(r => `<div class="review-card-full">
<div class="review-stars">${'★'.repeat(5)}</div>
<p class="review-text">"${r.text}"</p>
<div class="review-author">
<strong>${r.name}</strong>
<span>${r.title}</span>
</div>
</div>`).join('\n');
  return `${pageHead(t,'客戶評價',`${t.name} 的客戶好評與推薦`)}
${headerHTML(t)}
${pageHero(t,'客戶評價','聽聽我們的客戶怎麼說')}

<section class="section">
<div class="container">
<div style="text-align:center;margin-bottom:48px">
<span class="section-label">Testimonials</span>
<h2 class="section-title">真實好評</h2>
<p class="section-desc" style="max-width:600px;margin:0 auto">每一則評價都來自真實客戶，我們以此為榮並持續精進。</p>
</div>
<div class="reviews-grid-full">
${cards}
</div>
</div>
</section>

${footerHTML(t)}`;
}

// === FAQ Page ===
function genFaq(t) {
  const faqItems = t.faqs.map((f,i) => `<div class="faq-item">
<div class="faq-question"><span>Q${i+1}：${f.q}</span><i class="bi bi-chevron-down"></i></div>
<div class="faq-answer"><p>${f.a}</p></div>
</div>`).join('\n');
  return `${pageHead(t,'常見問題',`${t.name} 常見問題完整問答`)}
${headerHTML(t)}
${pageHero(t,'常見問題','關於我們的常見問題整理')}

<section class="section">
<div class="container">
<div style="text-align:center;margin-bottom:48px">
<span class="section-label">FAQ</span>
<h2 class="section-title">FAQ 常見問答</h2>
<p class="section-desc" style="margin:0 auto">如果您有其他疑問，歡迎透過<a href="contact.html" style="color:var(--accent)">聯絡我們</a>頁面留言。</p>
</div>
<div class="faq-list">
${faqItems}
</div>
</div>
</section>

${footerHTML(t)}`;
}

// === Booking Page ===
function genBooking(t) {
  return `${pageHead(t,'預約/訂購',`${t.name} 線上預約表單`)}
${headerHTML(t)}
${pageHero(t,t.bookingTitle||'線上預約','填寫以下表單，我們將盡速與您聯繫確認')}

<section class="section">
<div class="container">
<div class="booking-grid">
<div class="booking-form-wrap">
<form class="booking-form">
<div class="form-row">
<div class="form-group">
<label>姓名 *</label>
<input type="text" name="name" required placeholder="請輸入您的姓名">
</div>
<div class="form-group">
<label>電話 *</label>
<input type="tel" name="phone" required placeholder="請輸入聯絡電話">
</div>
</div>
<div class="form-row">
<div class="form-group">
<label>Email *</label>
<input type="email" name="email" required placeholder="請輸入電子郵件">
</div>
<div class="form-group">
<label>預約日期</label>
<input type="date" name="date">
</div>
</div>
<div class="form-group">
<label>服務項目</label>
<select name="service">
<option value="">請選擇服務項目</option>
${t.services.map(s => `<option value="${s.name}">${s.name}${s.price?' — '+s.price:''}</option>`).join('\n')}
</select>
</div>
<div class="form-group">
<label>備註說明</label>
<textarea name="message" rows="4" placeholder="請描述您的需求或其他備註"></textarea>
</div>
<div class="form-group">
<label><input type="checkbox" name="agree" required> 我同意<a href="#">隱私權政策</a>與<a href="#">服務條款</a></label>
</div>
<button type="submit" class="btn-primary-cta" style="width:100%;justify-content:center">送出預約</button>
<div class="form-success" style="display:none"></div>
</form>
</div>
<div class="booking-info">
<div class="info-card">
<i class="bi bi-clock"></i>
<h3>回覆時間</h3>
<p>我們將在 24 小時內回覆您的預約請求。</p>
</div>
<div class="info-card">
<i class="bi bi-telephone"></i>
<h3>電話預約</h3>
<p>致電 02-2700-8888 由專人為您服務。</p>
</div>
<div class="info-card">
<i class="bi bi-shield-check"></i>
<h3>資訊安全</h3>
<p>您的個人資訊受到嚴格保護，絕不外洩。</p>
</div>
</div>
</div>
</div>
</section>

${footerHTML(t)}`;
}

// === Process Page ===
function genProcess(t) {
  const steps = t.process.map((p,i) => `<div class="timeline-item${i%2===0?'':' reverse'}">
<div class="timeline-num">${String(i+1).padStart(2,'0')}</div>
<div class="timeline-content">
<h3>${p.title}</h3>
<p>${p.desc}</p>
</div>
<div class="timeline-img"><img src="${imgUrl(t.imgs[i+8]||t.imgs[i],400)}" alt="${p.title}"></div>
</div>`).join('\n');
  return `${pageHead(t,'服務流程',`${t.name} 服務流程說明`)}
${headerHTML(t)}
${pageHero(t,'服務流程','了解我們的專業服務流程')}

<section class="section">
<div class="container">
<div style="text-align:center;margin-bottom:60px">
<span class="section-label">Process</span>
<h2 class="section-title">我們的服務流程</h2>
<p class="section-desc" style="max-width:600px;margin:0 auto">從諮詢到完成，每個步驟都經過精心設計。</p>
</div>
<div class="timeline">
${steps}
</div>
</div>
</section>

${footerHTML(t)}`;
}

// === Blog Page ===
function genBlog(t) {
  const posts = t.blogs.map((b,i) => `<div class="blog-card">
<div class="blog-card-img"><img src="${imgUrl(t.imgs[i+12]||t.imgs[i],600)}" alt="${b.title}"></div>
<div class="blog-card-body">
<div class="blog-meta">
${b.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
<span class="blog-date">2026.${String(i+1).padStart(2,'0')}.${String(10+i*3).padStart(2,'0')}</span>
</div>
<h3>${b.title}</h3>
<p>${b.summary}</p>
<a href="blog-detail.html" class="blog-link">閱讀更多 <i class="bi bi-arrow-right"></i></a>
</div>
</div>`).join('\n');
  return `${pageHead(t,'部落格/專欄',`${t.name} 的最新${t.industry}知識與資訊`)}
${headerHTML(t)}
${pageHero(t,'部落格','探索最新的${t.industry}知識與趨勢')}

<section class="section">
<div class="container">
<div class="blog-grid">
${posts}
</div>
</div>
</section>

${footerHTML(t)}`;
}

// === Blog Detail Page ===
function genBlogDetail(t) {
  const b = t.blogs[0];
  return `${pageHead(t,b.title,`${b.title} — ${t.name}`)}
${headerHTML(t)}

<section class="blog-detail-hero">
<div class="container">
<div class="blog-meta">
${b.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
<span class="blog-date">2026.01.15</span>
</div>
<h1>${b.title}</h1>
<p class="blog-sub">${b.summary}</p>
</div>
</section>

<section class="section">
<div class="container">
<div class="blog-detail-grid">
<article class="blog-content">
<div class="blog-detail-img"><img src="${imgUrl(t.imgs[12]||t.imgs[0],1200)}" alt="${b.title}"></div>
<p>${b.summary}</p>
<p>在${t.industry}領域中，持續學習與關注最新趨勢是至關重要的。本文將從多個角度深入探討這個主題，為讀者提供全面的見解與實用的資訊。</p>
<h2>核心重點</h2>
<p>首先，我們需要理解${t.industry}的基本脈絡。無論是新進從業者還是資深專家，掌握核心知識都是不可或缺的基礎。</p>
<p>其次，實踐是驗證理論的最佳方式。我們鼓勵讀者在閱讀後，將所學應用到實際工作或生活中，從實踐中獲得更深刻的體會。</p>
<h2>深度分析</h2>
<p>從產業趨勢來看，${t.industry}正在經歷快速的變革。新技術的引入、消費者需求的變化、以及市場環境的演變，都在推動著這個產業向前發展。</p>
<p>作為${t.industry}的從業者，我們需要保持開放的心態，擁抱變化，同時不忘初心，堅持為客戶提供最高品質的服務。</p>
<h2>實踐建議</h2>
<ul>
<li>持續關注產業新聞與趨勢報告</li>
<li>定期參加專業培訓與研討會</li>
<li>建立同業交流網絡，分享經驗</li>
<li>定期回顧與優化自己的工作方法</li>
</ul>
<p>希望本文能為您帶來啟發。如果您有任何問題或想法，歡迎在下方留言或與我們聯繫。</p>
<div class="blog-author">
<img src="${imgUrl(t.imgs[14]||t.imgs[1],100)}" alt="作者">
<div>
<strong>${t.name} 編輯部</strong>
<span>專注於${t.industry}知識分享與趨勢報導</span>
</div>
</div>
</article>
<aside class="blog-sidebar">
<div class="sidebar-card">
<h3>相關文章</h3>
${t.blogs.slice(1,5).map(bl => `<a href="blog-detail.html" class="sidebar-link">${bl.title}</a>`).join('\n')}
</div>
<div class="sidebar-card">
<h3>標籤</h3>
<div class="sidebar-tags">
${[...new Set(t.blogs.flatMap(b=>b.tags))].map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
</div>
</div>
</aside>
</div>
</div>
</section>

${footerHTML(t)}`;
}

// === Contact Page ===
function genContact(t) {
  return `${pageHead(t,'聯絡我們',`${t.name} 聯絡方式與地圖資訊`)}
${headerHTML(t)}
${pageHero(t,'聯絡我們','歡迎透過以下方式與我們聯繫')}

<section class="section">
<div class="container">
<div class="contact-grid">
<div class="contact-form-wrap">
<h2>留言給我們</h2>
<form class="contact-form">
<div class="form-row">
<div class="form-group">
<label>姓名 *</label>
<input type="text" name="name" required placeholder="請輸入您的姓名">
</div>
<div class="form-group">
<label>電話</label>
<input type="tel" name="phone" placeholder="請輸入聯絡電話">
</div>
</div>
<div class="form-group">
<label>Email *</label>
<input type="email" name="email" required placeholder="請輸入電子郵件">
</div>
<div class="form-group">
<label>主旨</label>
<input type="text" name="subject" placeholder="請輸入訊息主旨">
</div>
<div class="form-group">
<label>訊息內容 *</label>
<textarea name="message" rows="5" required placeholder="請輸入您的訊息"></textarea>
</div>
<button type="submit" class="btn-primary-cta">送出訊息</button>
<div class="form-success" style="display:none"></div>
</form>
</div>
<div class="contact-info">
<div class="contact-info-cards">
<div class="info-card">
<i class="bi bi-geo-alt-fill"></i>
<h3>地址</h3>
<p>台北市大安區忠孝東路四段 100 號</p>
</div>
<div class="info-card">
<i class="bi bi-telephone-fill"></i>
<h3>電話</h3>
<p>02-2700-8888</p>
</div>
<div class="info-card">
<i class="bi bi-envelope-fill"></i>
<h3>Email</h3>
<p>info@${t.slug}.com</p>
</div>
<div class="info-card">
<i class="bi bi-clock-fill"></i>
<h3>營業時間</h3>
<p>週一至週日 10:00-21:00</p>
</div>
</div>
<div class="contact-map">
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.017!2d121.5497!3d25.0330!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDAyJzAwLjgiTiAxMjHCsDMyJzU4LjkiRQ!5e0!3m2!1szh-TW!2stw!4v1600000000000" width="100%" height="300" style="border:0;border-radius:var(--card-radius,4px)" allowfullscreen loading="lazy"></iframe>
</div>
</div>
</div>
</div>
</section>

${footerHTML(t)}`;
}

module.exports = {
  genIndex, genAbout, genServices, genServiceDetail, genPortfolio,
  genReviews, genFaq, genBooking, genProcess, genBlog, genBlogDetail, genContact,
  imgUrl
};
