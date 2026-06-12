const { generate } = require('./generate');

// Helper: generate image list
function imgs(arr) { return arr.map(([url, usage]) => ({ url: url.split('?')[0].replace('https://images.unsplash.com/',''), usage })); }
// Helper: generate Unsplash URLs
function unsplash(id, w) { return `https://images.unsplash.com/${id}?w=${w||800}&q=80`; }

// Helper: build card grid HTML
function cardGrid(t, items, cols) {
  return `<div class="cards-grid" style="display:grid;grid-template-columns:repeat(${cols||3},1fr);gap:32px;margin-top:48px">
${items.map(item => `<div class="card-item">
${item.img ? `<div class="card-img"><img src="${item.img}" alt="${item.title}"></div>` : ''}
<div class="card-body"><h3>${item.title}</h3><p>${item.desc}</p>${item.extra||''}</div>
</div>`).join('\n')}
</div>`;
}

// Helper: build review cards
function reviewCards(items) {
  return items.map(r => `<div class="review-card">
<div class="review-stars">${'★'.repeat(r.stars||5)}</div>
<p class="review-text">${r.text}</p>
<div class="review-author"><img class="review-avatar" src="${r.avatar}" alt="${r.name}">
<div><div class="review-name">${r.name}</div><div class="review-role">${r.role}</div></div>
</div></div>`).join('\n');
}

// Helper: FAQ accordion
function faqList(items) {
  return `<div class="faq-list">${items.map(f => `<div class="faq-item">
<div class="faq-question"><span>${f.q}</span><i class="bi bi-plus-lg faq-icon"></i></div>
<div class="faq-answer"><div class="faq-answer-inner">${f.a}</div></div>
</div>`).join('\n')}</div>`;
}

// Helper: timeline
function timeline(items) {
  return `<div class="process-timeline">${items.map((t,i) => `<div class="timeline-item">
<div class="timeline-dot">${i+1}</div>
<div class="timeline-content"><h3>${t.title}</h3><p>${t.desc}</p></div>
</div>`).join('\n')}</div>`;
}

// Helper: blog grid
function blogGrid(items) {
  return `<div class="blog-grid">${items.map(b => `<div class="blog-card">
<div class="blog-card-img"><img src="${b.img}" alt="${b.title}"></div>
<div class="blog-card-body"><div class="blog-card-meta">${b.date} · ${b.tag}</div>
<h3>${b.title}</h3><p>${b.excerpt}</p>
<a href="blog-detail.html" class="blog-card-link">閱讀更多 →</a></div>
</div>`).join('\n')}</div>`;
}

// ======================= T003 FASHION BOUTIQUE =======================
function genT003() {
  const t = {
    id: 'template-003', slug: 'fashion-boutique', name: 'Fashion Boutique', nameZH: '精品服飾',
    desc: '適合精品服飾、設計師品牌與時尚零售的 Lookbook 型網站。',
    industry: '精品服飾', industryCategory: '零售商品', colorTheme: '黑白灰精品',
    backgroundMode: 'dark', layoutType: 'Masonry / Portfolio 作品牆',
    heroPattern: 'lookbook-fullscreen-hero', navigationPattern: 'minimal-top-navigation',
    contentRhythm: 'editorial-lookbook-gallery', schemaType: 'ClothingStore',
    colors: { bg:'#0a0a0a', bgSec:'#111', card:'#181818', accent:'#fff', accentHover:'#ccc', accentDark:'#666', text:'#f0f0f0', textSec:'#888', border:'#2a2a2a' },
    fonts: { heading:"'Bodoni Moda',serif", body:"'Noto Sans TC',sans-serif", headingGoogle:'Bodoni-Moda:ital,wght@0,400;0,700;1,400', bodyGoogle:'Noto+Sans+TC:wght@300;400;500;700' },
    cardRadius: '0', smallRadius: '0',
    btnCSS: `.btn-primary{display:inline-flex;align-items:center;gap:8px;padding:14px 40px;background:transparent;color:#fff;font-weight:400;font-size:.85rem;letter-spacing:3px;border:1px solid #fff;cursor:pointer;transition:all .3s;text-transform:uppercase}
.btn-primary:hover{background:#fff;color:#0a0a0a}
.btn-text{color:#fff;font-size:.82rem;letter-spacing:3px;text-transform:uppercase;border-bottom:1px solid #fff;padding-bottom:4px;transition:all .3s}
.btn-text:hover{color:#888;border-color:#888}`,
    headerStyle: 'invisible-header-minimal-links',
    headerCSS: `.site-header{position:fixed;top:0;left:0;width:100%;z-index:100;padding:24px 0;transition:all .4s}
.site-header.scrolled{background:rgba(10,10,10,.95);padding:16px 0}
.header-inner{display:flex;align-items:center;justify-content:space-between}
.logo{font-family:var(--font-heading);font-size:1.4rem;font-weight:400;color:#fff;letter-spacing:6px;text-transform:uppercase}
.logo span{display:none}
.nav-menu{display:flex;gap:36px}
.nav-menu a{color:#888;font-size:.78rem;font-weight:300;letter-spacing:3px;text-transform:uppercase;transition:color .3s}
.nav-menu a:hover,.nav-menu a.active{color:#fff}
.header-cta{color:#888;font-size:.78rem;letter-spacing:2px;text-transform:uppercase;transition:color .3s}
.header-cta:hover{color:#fff}`,
    heroStyle: 'fullscreen-lookbook',
    heroCSS: `.hero{position:relative;height:100vh;min-height:700px;display:flex;align-items:flex-end;overflow:hidden}
.hero-bg{position:absolute;inset:0;background:url('https://images.unsplash.com/photo-1509631179647-0177331695ae?w=1920&q=80') center/cover no-repeat}
.hero-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.8) 0%,transparent 50%)}
.hero-content{position:relative;z-index:2;padding:0 0 80px 60px;max-width:700px}
.hero-label{display:block;color:#888;font-size:.72rem;letter-spacing:6px;text-transform:uppercase;margin-bottom:20px}
.hero h1{font-size:clamp(3rem,8vw,5.5rem);color:#fff;font-weight:400;line-height:1;margin-bottom:20px;font-style:italic}
.hero-sub{font-size:.95rem;color:#888;margin-bottom:32px;font-weight:300;letter-spacing:1px;max-width:400px}
.hero-actions{display:flex;gap:24px}
.hero-scroll{display:none}`,
    sectionTitleCSS: `.section-label{display:block;color:#666;font-size:.7rem;letter-spacing:6px;text-transform:uppercase;margin-bottom:16px}
.section-title{font-size:clamp(1.8rem,4vw,2.6rem);color:#fff;font-weight:400;margin-bottom:16px;font-style:italic}
.section-desc{color:#888;max-width:500px;font-size:.9rem;font-weight:300}`,
    cardsCSS: `.cards-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px}
.card-item{position:relative;overflow:hidden;aspect-ratio:3/4}
.card-img{height:100%;overflow:hidden}
.card-img img{width:100%;height:100%;object-fit:cover;filter:grayscale(100%);transition:all .6s}
.card-item:hover .card-img img{filter:grayscale(0%);transform:scale(1.05)}
.card-body{position:absolute;bottom:0;left:0;right:0;padding:24px;background:linear-gradient(to top,rgba(0,0,0,.7),transparent);z-index:2}
.card-body h3{color:#fff;font-size:1rem;font-weight:400;letter-spacing:2px;text-transform:uppercase}
.card-body p{color:#aaa;font-size:.8rem;font-weight:300;margin-top:4px}`,
    portfolioCSS: `.portfolio-grid{display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:280px;gap:2px;margin-top:48px}
.portfolio-item{overflow:hidden;position:relative}
.portfolio-item:nth-child(1){grid-column:span 2;grid-row:span 2}
.portfolio-item:nth-child(4){grid-column:span 2}
.portfolio-item img{width:100%;height:100%;object-fit:cover;filter:grayscale(80%);transition:all .6s}
.portfolio-item:hover img{filter:grayscale(0%);transform:scale(1.03)}
.portfolio-overlay{position:absolute;bottom:0;left:0;right:0;padding:20px;background:linear-gradient(to top,rgba(0,0,0,.6),transparent);opacity:0;transition:opacity .3s}
.portfolio-item:hover .portfolio-overlay{opacity:1}
.portfolio-overlay h3{color:#fff;font-size:.9rem;font-weight:400;letter-spacing:2px;text-transform:uppercase}`,
    ctaCSS: `.cta-banner{padding:120px 0;text-align:center;position:relative}
.cta-banner::before{content:'';position:absolute;top:0;left:50%;transform:translateX(-50%);width:1px;height:60px;background:#333}
.cta-banner h2{font-size:2rem;color:#fff;font-weight:400;font-style:italic;margin-bottom:16px}
.cta-banner p{color:#888;margin-bottom:32px;font-weight:300}`,
    footerCSS: `.site-footer{background:#050505;border-top:1px solid #1a1a1a;padding:60px 0 30px}
.footer-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px}
.footer-brand .logo{margin-bottom:16px}
.footer-desc{font-size:.85rem;color:#666;margin-top:12px;font-weight:300}
.footer-col h4{font-size:.72rem;color:#666;margin-bottom:16px;letter-spacing:4px;text-transform:uppercase}
.footer-links li{margin-bottom:10px}
.footer-links a,.footer-links li{color:#888;font-size:.85rem;font-weight:300}
.footer-links a:hover{color:#fff}
.footer-bottom{margin-top:48px;padding-top:24px;border-top:1px solid #1a1a1a;text-align:center}
.footer-bottom p{font-size:.75rem;color:#555}`,
    menu: ['首頁','品牌故事','商品分類','Lookbook','時尚專欄','聯絡我們'],
    menuLinks: ['index.html','about.html','services.html','portfolio.html','blog.html','contact.html'],
    menuExtra: ['常見問題','預約到店'],
    menuExtraLinks: ['faq.html','booking.html'],
    logoHTML: 'FASHION BOUTIQUE',
    headerCTAText: '預約到店', headerCTALink: 'booking.html',
    footerDesc: '極簡黑白灰時尚精品，以設計語言詮釋當代風格。',
    footerCol2Title: '品牌資訊', footerCol2Items: ['週一至週日 11:00-21:00','台北市大安區','02-2700-1234'],
    footerCol3Title: '快速連結', footerCol3Items: ['<a href="about.html">品牌故事</a>','<a href="services.html">商品分類</a>','<a href="portfolio.html">Lookbook</a>','<a href="contact.html">聯絡我們</a>'],
    pages: {
      index: { title:'Fashion Boutique — 極簡時尚 Lookbook', desc:'黑白灰精品服飾，以 Lookbook 大圖展示最新系列。', h1:'Lookbook' },
      about: { title:'品牌故事 — 設計理念', desc:'探索品牌設計哲學與創辦人故事。', h1:'品牌故事' },
      services: { title:'商品分類 — 女裝/男裝/配飾', desc:'瀏覽完整商品分類。', h1:'商品分類' },
      serviceDetail: { title:'絲絨西裝外套 — 單品詳情', desc:'精選絲絨材質，極簡剪裁。', h1:'絲絨西裝外套' },
      portfolio: { title:'Lookbook — 2026 春夏系列', desc:'全螢幕 Masonry 作品展示。', h1:'Lookbook' },
      reviews: { title:'顧客評價 — 時尚部落客推薦', desc:'來自時尚部落客的真實推薦。', h1:'顧客評價' },
      faq: { title:'常見問題 — 尺寸/退換/配送', desc:'購物相關常見問題解答。', h1:'常見問題' },
      booking: { title:'預約到店 — 試穿預約', desc:'預約門市試穿體驗。', h1:'預約到店' },
      process: { title:'購物流程 — 選購到配送', desc:'完整的購物體驗流程。', h1:'購物流程' },
      blog: { title:'時尚專欄 — 穿搭靈感', desc:'最新穿搭趨勢與靈感分享。', h1:'時尚專欄' },
      blogDetail: { title:'2026 春夏趨勢解析 — 文章詳情', desc:'深入解析本季時尚趨勢。', h1:'2026 春夏趨勢解析' },
      contact: { title:'聯絡我們 — 門市資訊', desc:'門市位置與聯絡方式。', h1:'聯絡我們' }
    },
    indexSections: `<!-- Hero -->
<section class="hero"><div class="hero-bg"></div><div class="hero-overlay"></div>
<div class="hero-content"><span class="hero-label">Spring / Summer 2026</span>
<h1>The Art of<br>Simplicity</h1>
<p class="hero-sub">以極簡語言，重新定義當代時尚。每一件作品，都是對純粹的追求。</p>
<div class="hero-actions"><a href="portfolio.html" class="btn-primary">View Lookbook</a><a href="services.html" class="btn-text">Explore Collection</a></div>
</div></section>
<!-- New Arrivals -->
<section class="section"><div class="container" style="text-align:center">
<span class="section-label">New Arrivals</span><h2 class="section-title">本季新品</h2>
<p class="section-desc" style="margin:0 auto">精選六件本季必備單品，從經典到前衛。</p></div>
${cardGrid(null, [
  {img:'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80',title:'Silk Blouse',desc:'真絲襯衫 · NT$4,800'},
  {img:'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80',title:'Tailored Coat',desc:'訂製大衣 · NT$12,800'},
  {img:'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&q=80',title:'Minimal Dress',desc:'極簡連身裙 · NT$6,200'},
  {img:'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=600&q=80',title:'Leather Bag',desc:'皮革手提包 · NT$8,500'},
  {img:'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&q=80',title:'Sneakers',desc:'設計師球鞋 · NT$5,600'},
  {img:'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80',title:'Cashmere Scarf',desc:'喀什米爾圍巾 · NT$3,200'}
])}
<div style="text-align:center;margin-top:48px"><a href="services.html" class="btn-text">View All Collection →</a></div>
</section>
<!-- Manifesto -->
<section class="section" style="background:#111"><div class="container" style="max-width:700px;text-align:center">
<span class="section-label">Manifesto</span>
<h2 class="section-title" style="font-size:2rem;font-style:italic;line-height:1.4">"Fashion is not about clothes — it's about a look, an attitude, a way of life."</h2>
<p style="color:#666;margin-top:24px;font-weight:300;letter-spacing:2px">— Creative Director, 2026</p>
</div></section>`,
    images: imgs([['photo-1509631179647-0177331695ae','Hero'],['photo-1539109136881-3be0616acf4b','新品1'],['photo-1594938298603-c8148c4dae35','新品2'],['photo-1551488831-00ddcb6c6bd3','新品3'],['photo-1485462537746-965f33f7f6a7','新品4'],['photo-1460353581641-37baddab0fa2','新品5'],['photo-1515886657613-9f3515b0c78f','新品6'],['photo-1558618666-fcd25c85f82e','環境1'],['photo-1441986300917-64674bd600d8','環境2'],['photo-1445205170230-053b83016050','環境3'],['photo-1490481651871-ab68de25d43d','環境4'],['photo-1483985988355-763728e1935b','環境5'],['photo-1469334031218-e382a71b716b','環境6'],['photo-1479064555552-3ef4979f8908','環境7'],['photo-1558171813-4c088753af8f','環境8'],['photo-1529139574466-a303027c1d8b','Blog1'],['photo-1496747611176-843222e1e57c','Blog2'],['photo-1515372039744-b8f02a3ae446','Blog3'],['photo-1487222477894-8943e31ef7b2','Blog4'],['photo-1494790108377-be9c29b29330','肖像1'],['photo-1507003211169-0a1dd7228f2d','肖像2'],['photo-1438761681033-6461ffad8d80','肖像3'],['photo-1472099645785-5658abf4ff4e','肖像4'],['photo-1441984904996-e0b6ba687e04','關於'],['photo-1558171813-4c088753af8f','預覽']]),
    industries: ['精品服飾','設計師品牌','時尚零售'],
    colorTags: ['深色底','黑白灰','精品感'],
    featureTags: ['Lookbook','Masonry','極簡設計','灰度特效','預約 CTA','強 SEO'],
    visualDirection: '極簡黑白灰，大量留白，極細線條，灰度圖片 hover 變彩色，Bodoni Moda 斜體標題。',
    heroDesc: '全螢幕 Lookbook 大圖，底部漸層遮罩，左對齊白色細字標題',
    navDesc: '極簡頂部導航，無漢堡圖標（桌機），全字母大寫細字',
    imageStyleDesc: '時尚攝影、模特兒、服飾特寫、黑白風格。灰度處理 hover 變彩色。',
    seoKeywords: '主：精品服飾、時尚零售、Lookbook\n長尾：極簡時尚品牌、設計師服飾店',
    ctaPrimary: 'View Lookbook', ctaSecondary: 'Explore Collection',
    differenceNote: '極簡時尚 Lookbook，黑白灰+極細線+灰度圖片。與 T005 電影 Masonry 差異：T003 fashion editorial 灰度效果、T005 cinematic portfolio 全螢幕選單。',
    notSuitable: '休閒服飾、運動品牌、兒童服飾。',
    forbidden: '不可使用彩色背景。不可使用圓角卡片。不可使用粗體標題。',
    aboutContent: `<div class="about-grid"><div class="about-img"><img src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80" alt="品牌故事"></div>
<div class="about-text"><h2>以極簡，詮釋當代</h2>
<p>Fashion Boutique 創立於 2019 年，由旅法設計師陳雨晴創辦。品牌核心理念是「Less is More」，以純粹的線條與極簡配色，打造超越季節的經典單品。</p>
<p>每一件作品都經過精心設計，從布料選擇到剪裁細節，都追求極致的品質與美感。我們相信，真正的時尚不在追逐潮流，而在創造永恆。</p>
<div class="about-stats"><div><span class="stat-num">200+</span><span class="stat-text">精選單品</span></div><div><span class="stat-num">7</span><span class="stat-text">年設計經驗</span></div><div><span class="stat-num">15K</span><span class="stat-text">忠實客戶</span></div></div>
</div></div>
<div class="about-values">${['極簡美學|bi-brush|以減法設計呈現純粹美感','永續時尚|bi-recycle|選用環保面料與永續製程','匠心工藝|bi-gem|每件作品都經過精密裁製'].map(v=>{const[a,b,c]=v.split('|');return`<div class="value-card"><div class="value-icon"><i class="bi ${b}"></i></div><h3>${a}</h3><p>${c}</p></div>`}).join('')}</div>`,
    servicesContent: `<p class="section-desc">從經典基本款到前衛設計，完整的時尚系列。</p>
${cardGrid(null,[{img:'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80',title:'女裝系列',desc:'連身裙 · 襯衫 · 外套 · 褲裝'},{img:'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80',title:'男裝系列',desc:'西裝 · 襯衫 · 大衣 · 休閒褲'},{img:'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=600&q=80',title:'配飾系列',desc:'手提包 · 圍巾 · 腰帶 · 墨鏡'},{img:'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&q=80',title:'鞋履系列',desc:'高跟鞋 · 靴子 · 球鞋 · 涼鞋'},{img:'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80',title:'限定系列',desc:'聯名合作 · 限量款式 · 藝術家系列'},{img:'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&q=80',title:'基本款',desc:'T恤 · 牛仔褲 · 內衣 · 基礎單品'}])}`,
    serviceDetailContent: `<div class="detail-hero-img"><img src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1200&q=80" alt="絲絨西裝外套"></div>
<div class="detail-content"><h2>設計理念</h2><p>這款絲絨西裝外套採用頂級義大利絲絨面料，結合當代極簡剪裁，呈現低調奢華的質感。無襯裡設計讓穿著更加輕盈自在，適合各種正式與半正式場合。</p>
<h2>材質與工藝</h2><p>面料採用 92% 絲絨與 8% 彈性纖維，手感柔軟且具有優異的垂墜感。由經驗豐富的裁縫師手工製作，每一針每一線都追求完美。</p>
<div class="detail-features">${['頂級義大利絲絨','無襯裡輕量設計','手工縫製鈕扣','隱形內袋','可乾洗保養','附贈防塵袋'].map(f=>`<div class="detail-feature"><i class="bi bi-check-circle"></i><span>${f}</span></div>`).join('')}</div>
<p style="margin-top:32px;color:var(--accent);font-family:var(--font-heading);font-size:1.8rem">NT$ 12,800</p></div>`,
    portfolioContent: `<p class="section-desc">2026 春夏系列 Lookbook，以極簡美學呈現每件作品的獨特魅力。</p>
<div class="portfolio-grid">${['photo-1483985988355-763728e1935b','photo-1469334031218-e382a71b716b','photo-1490481651871-ab68de25d43d','photo-1479064555552-3ef4979f8908','photo-1558618666-fcd25c83af8f','photo-1487222477894-8943e31ef7b2','photo-1515372039744-b8f02a3ae446','photo-1496747611176-843222e1e57c'].map((p,i)=>`<div class="portfolio-item"><img src="https://images.unsplash.com/${p}?w=800&q=80" alt="Look ${i+1}"><div class="portfolio-overlay"><h3>Look ${String(i+1).padStart(2,'0')}</h3></div></div>`).join('')}</div>`,
    reviewsContent: `<div class="reviews-grid">${reviewCards([
      {text:'極簡設計令人驚艷，每件單品都能融入日常穿搭。品質非常好！',name:'林小雯',role:'時尚部落客',avatar:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',stars:5},
      {text:'布料觸感極佳，剪裁合身。是少數能兼顧設計感與舒適度的品牌。',name:'張雅琪',role:'雜誌編輯',avatar:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',stars:5},
      {text:'限定系列的聯名款太美了！收藏價值極高，每次都期待新品發布。',name:'王志明',role:'造型師',avatar:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',stars:5},
      {text:'門市服務非常專業，店員的穿搭建議總是很到位。購物體驗極佳。',name:'陳美玲',role:'企業主管',avatar:'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=100&q=80',stars:4}
    ])}</div>`,
    faqContent: faqList([
      {q:'請問尺寸如何選擇？',a:'建議參考各商品頁面的尺寸表。如有疑問，歡迎預約到店試穿，我們的造型顧問會為您提供專業建議。'},
      {q:'退換貨政策是什麼？',a:'商品購買後 14 天內可退換貨，需保持商品完整標籤與包裝。定製品與貼身衣物不接受退換。'},
      {q:'配送方式與時間？',a:'台灣本島訂單 NT$2,000 以上免運費，一般配送 2-3 個工作天。也提供門市取貨服務。'},
      {q:'可以預約到店試穿嗎？',a:'當然可以！請透過「預約到店」頁面預約，我們會為您安排專屬造型顧問。'},
      {q:'商品如何保養？',a:'每件商品都附有保養標籤。絲質與羊毛建議乾洗，棉質可冷水手洗。避免陽光直曬。'},
      {q:'有會員優惠嗎？',a:'首次消費可享 95 折優惠。VIP 會員享有新品優先購買權、生日禮遇與專屬折扣。'},
      {q:'可以客製化訂製嗎？',a:'部分款式提供客製化服務，包括面料選擇與尺寸調整。詳情請洽門市。'},
      {q:'有實體門市嗎？',a:'目前在大安區有一家旗艦門市，歡迎預約參觀。'}
    ]),
    bookingContent: `<div class="booking-grid"><div><h3 style="font-size:1.4rem;margin-bottom:24px">預約試穿</h3>
<form class="booking-form"><div class="form-row"><div class="form-group"><label>姓名</label><input type="text" placeholder="您的姓名" required></div><div class="form-group"><label>電話</label><input type="tel" placeholder="09xx-xxx-xxx" required></div></div>
<div class="form-group"><label>Email</label><input type="email" placeholder="your@email.com"></div>
<div class="form-row"><div class="form-group"><label>預約日期</label><input type="date" required></div><div class="form-group"><label>預約時段</label><select><option>11:00-13:00</option><option>13:00-15:00</option><option>15:00-17:00</option><option>17:00-19:00</option></select></div></div>
<div class="form-group"><label>感興趣的系列</label><select><option>女裝系列</option><option>男裝系列</option><option>配飾系列</option><option>限定系列</option></select></div>
<div class="form-group"><label>備註</label><textarea placeholder="請告知我們您的需求或特殊尺寸..."></textarea></div>
<button type="submit" class="btn-primary">確認預約</button><div class="form-success"></div></form></div>
<div class="booking-info"><h3>門市資訊</h3>
${['bi-geo-alt|地址|台北市大安區敦化南路一段 100 號','bi-clock|營業時間|週一至週日 11:00-21:00','bi-telephone|電話|02-2700-1234','bi-train-front|交通|捷運忠孝敦化站 3 號出口步行 5 分鐘'].map(i=>{const[a,b,c]=i.split('|');return`<div class="booking-info-item"><div class="booking-info-icon"><i class="bi ${a}"></i></div><div class="booking-info-text"><strong>${b}</strong>${c}</div></div>`}).join('')}
</div></div>`,
    processContent: timeline([
      {title:'線上瀏覽',desc:'在網站上瀏覽您喜歡的商品，加入心愿清單。'},
      {title:'預約到店',desc:'選擇方便的時段預約門市試穿，造型顧問將為您服務。'},
      {title:'專屬搭配',desc:'造型顧問根據您的風格與需求，提供個人化穿搭建議。'},
      {title:'選購結帳',desc:'確認選購後，提供多元付款方式。VIP 可享額外折扣。'},
      {title:'精美包裝',desc:'每件商品都以精美包裝呈現，也提供禮品包裝服務。'}
    ]),
    blogContent: blogGrid([
      {img:'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80',title:'2026 春夏趨勢：極簡回歸',date:'2026-06-01',tag:'趨勢',excerpt:'本季時尚趨勢回归極簡，純粹的線條與中性色調成為主流。'},
      {img:'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80',title:'如何打造膠囊衣櫥',date:'2026-05-20',tag:'穿搭',excerpt:'用 30 件單品打造無限穿搭組合，膠囊衣櫥的完整指南。'},
      {img:'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80',title:'面料知識：認識絲絨',date:'2026-05-10',tag:'知識',excerpt:'深入了解絲絨面料的歷史、特性與保養方式。'},
      {img:'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&q=80',title:'設計師專訪：陳雨晴',date:'2026-04-28',tag:'專訪',excerpt:'創辦人分享品牌的設計哲學與未來願景。'},
      {img:'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80',title:'永續時尚的實踐',date:'2026-04-15',tag:'永續',excerpt:'我們如何在設計中實踐環保理念。'},
      {img:'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&q=80',title:'鞋履搭配指南',date:'2026-04-01',tag:'穿搭',excerpt:'不同場合的鞋履搭配建議。'}
    ]),
    blogDetailContent: `<div class="blog-detail"><div class="blog-detail-hero"><img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1200&q=80" alt="趨勢解析"></div>
<h2>極簡的回歸</h2><p>2026 年春夏，時尚界迎了一場寧靜的革命。在過去幾年極繁主義的喧囂之後，設計師們紛紛回歸極簡主義，但這次帶來了更成熟、更深邃的詮釋。</p>
<p>這一季的極簡不再是冷冽的黑白灰，而是融合了暖調中性色、有機面料和精密剪裁的溫暖極簡主義。</p>
<blockquote>Less is more, but less must be warm.</blockquote>
<h2>關鍵趨勢</h2><p>本季的五大關鍵趨勢包括：寬鬆剪裁、自然面料、中性色調、功能設計和永續理念。每一個趨勢都反映了消費者對品質與價值觀的轉變。</p>
<p>我們品牌在本季推出的系列完美詮釋了這些趨勢，每件單品都經過精心設計，確保既美觀又實穿。</p></div>`,
    contactContent: `<div class="contact-grid"><div class="contact-map"><div style="text-align:center"><i class="bi bi-geo-alt" style="font-size:3rem;color:var(--accent);display:block;margin-bottom:16px"></i><p>Google Maps 嵌入區域<br>台北市大安區敦化南路一段 100 號</p></div></div>
<div><form class="contact-form"><div class="form-group"><label>姓名</label><input type="text" placeholder="您的姓名" required></div><div class="form-group"><label>Email</label><input type="email" placeholder="your@email.com" required></div><div class="form-group"><label>主題</label><select><option>一般諮詢</option><option>商品詢問</option><option>合作提案</option><option>其他</option></select></div><div class="form-group"><label>訊息</label><textarea placeholder="請輸入您的訊息..." required></textarea></div><button type="submit" class="btn-primary">送出訊息</button><div class="form-success"></div></form></div></div>
<div class="contact-info-cards">${['bi-geo-alt|門市地址|台北市大安區敦化南路一段 100 號','bi-telephone|聯絡電話|02-2700-1234','bi-envelope|Email|info@fashionboutique.tw'].map(i=>{const[a,b,c]=i.split('|');return`<div class="contact-info-card"><i class="bi ${a}"></i><h4>${b}</h4><p>${c}</p></div>`}).join('')}</div>`,
    responsive992: '.portfolio-grid{grid-template-columns:repeat(2,1fr)}',
    responsive768: '.portfolio-grid{grid-template-columns:1fr}',
    responsive576: '',
    uniqueCSS: '',
    extraJS: '',
    headerScrollJS: "header.classList.toggle('scrolled', window.scrollY > 60);"
  };
  generate(t);
}

module.exports = { genT003 };
