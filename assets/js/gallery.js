/* ========================================
   全職設計視角 — Gallery JS
   ======================================== */

(function() {
  'use strict';

  // ---- Fallback Data (3 demo entries) ----
  var FALLBACK_DATA = [
    {
      id: "template-001", slug: "luxury-bar", name: "Luxury Bar",
      description: "適合酒吧、餐酒館與夜間活動品牌的黑金沉浸式網站。",
      industry: "酒吧", industryCategory: "餐飲甜點", colorTheme: "黑金低光源",
      backgroundMode: "dark", layoutType: "大圖沉浸式 Hero",
      heroPattern: "fullscreen-atmosphere-hero",
      navigationPattern: "top-navigation-mobile-drawer",
      contentRhythm: "visual-story-menu-event-booking",
      previewImage: "assets/img/previews/template-001.jpg",
      demoUrl: "templates/template-001-luxury-bar/index.html",
      zipUrl: "downloads/template-001-luxury-bar.zip",
      hasZip: false, promptUrl: "templates/template-001-luxury-bar/prompt.md",
      pageCount: 12, imageRich: true, status: "candidate",
      isFeatured: false, isHidden: false,
      generatedBy: "請填入實際模型名稱",
      tags: ["餐飲甜點","酒吧","深色底","黑金色","大圖沉浸式 Hero","訂位 CTA","圖片豐富","強 SEO"]
    },
    {
      id: "template-006", slug: "ai-saas", name: "AI SaaS",
      description: "適合 AI 產品、SaaS 平台與科技新創的深色 Bento Grid 網站。",
      industry: "AI SaaS", industryCategory: "科技商務", colorTheme: "深色科技漸層",
      backgroundMode: "dark", layoutType: "Bento Grid 現代資訊版",
      heroPattern: "bento-feature-hero",
      navigationPattern: "top-navigation-mobile-drawer",
      contentRhythm: "feature-grid-pricing-cta",
      previewImage: "assets/img/previews/template-006.jpg",
      demoUrl: "templates/template-006-ai-saas/index.html",
      zipUrl: "downloads/template-006-ai-saas.zip",
      hasZip: false, promptUrl: "templates/template-006-ai-saas/prompt.md",
      pageCount: 12, imageRich: true, status: "candidate",
      isFeatured: false, isHidden: false,
      generatedBy: "請填入實際模型名稱",
      tags: ["科技商務","AI","SaaS","深色底","Bento Grid","科技漸層","圖片豐富","強 SEO"]
    },
    {
      id: "template-013", slug: "beauty-studio", name: "Beauty Studio",
      description: "適合美容院、美妝品牌與美業工作者的奶茶色信任型網站。",
      industry: "美容工作室", industryCategory: "美妝美業", colorTheme: "奶茶色柔和",
      backgroundMode: "light", layoutType: "左右分割 Split Layout",
      heroPattern: "split-layout-hero",
      navigationPattern: "top-navigation-mobile-drawer",
      contentRhythm: "trust-service-booking",
      previewImage: "assets/img/previews/template-013.jpg",
      demoUrl: "templates/template-013-beauty-studio/index.html",
      zipUrl: "downloads/template-013-beauty-studio.zip",
      hasZip: false, promptUrl: "templates/template-013-beauty-studio/prompt.md",
      pageCount: 12, imageRich: true, status: "candidate",
      isFeatured: false, isHidden: false,
      generatedBy: "請填入實際模型名稱",
      tags: ["美妝美業","美容院","淺色底","奶茶色","Split Layout","預約 CTA","圖片豐富","強 SEO"]
    }
  ];

  // ---- Tags helper (容錯) ----
  function getTemplateTags(template) {
    if (Array.isArray(template.tags)) return template.tags;
    if (template.tags && typeof template.tags === 'object') {
      return Object.values(template.tags).flat().filter(Boolean);
    }
    return [];
  }
  window.getTemplateTags = getTemplateTags;

  // ---- Load data ----
  function getData() {
    if (typeof TEMPLATES_DATA !== 'undefined' && Array.isArray(TEMPLATES_DATA) && TEMPLATES_DATA.length > 0) {
      return TEMPLATES_DATA;
    }
    return FALLBACK_DATA;
  }

  // ---- Render Cards ----
  function renderCards(templates, container, viewMode) {
    container.innerHTML = '';
    if (templates.length === 0) return;

    templates.forEach(function(tpl) {
      var tags = getTemplateTags(tpl);
      var bgLabel = tpl.backgroundMode === 'dark' ? '深色底' : '淺色底';
      var badgeClass = tpl.backgroundMode === 'dark' ? 'badge-dark' : 'badge-light';
      var displayTags = tags.slice(0, 4);

      var card = document.createElement('div');
      card.className = 'template-card';
      card.innerHTML =
        '<div class="template-card-image">' +
          '<img src="' + tpl.previewImage + '" alt="' + tpl.name + ' 預覽圖" loading="lazy" onerror="this.style.display=\'none\'">' +
          '<div class="card-badges">' +
            '<span class="card-badge ' + badgeClass + '">' + bgLabel + '</span>' +
            '<span class="card-badge badge-industry">' + tpl.industryCategory + '</span>' +
            '<span class="card-badge badge-pages">' + tpl.pageCount + ' Pages</span>' +
          '</div>' +
        '</div>' +
        '<div class="template-card-body">' +
          '<div class="card-number">' + tpl.id.toUpperCase() + '</div>' +
          '<h3 class="card-name">' + tpl.name + '</h3>' +
          '<p class="card-layout">' + tpl.layoutType + '</p>' +
          '<div class="card-tags">' +
            displayTags.map(function(tag) { return '<span class="card-tag">' + tag + '</span>'; }).join('') +
          '</div>' +
          '<div class="card-actions">' +
            '<a href="' + tpl.demoUrl + '" target="_blank" class="card-btn card-btn-primary"><i class="bi bi-eye"></i> 預覽網站</a>' +
            '<a href="template-detail.html?id=' + tpl.id + '" class="card-btn card-btn-outline"><i class="bi bi-info-circle"></i> 查看詳情</a>' +
            '<a href="' + tpl.promptUrl + '" target="_blank" class="card-btn card-btn-outline"><i class="bi bi-file-text"></i> Prompt</a>' +
            '<button class="card-btn card-btn-disabled" disabled><i class="bi bi-file-zip"></i> ZIP 待打包</button>' +
          '</div>' +
        '</div>';
      container.appendChild(card);
    });
  }

  // ---- Filter Logic ----
  function getActiveFilters() {
    var filters = { industryCategory: [], backgroundMode: [], layoutType: [], search: '' };
    var searchInput = document.getElementById('searchInput');
    if (searchInput) filters.search = searchInput.value.trim().toLowerCase();

    document.querySelectorAll('.filter-options input[type="checkbox"]:checked').forEach(function(cb) {
      var name = cb.name;
      var val = cb.value;
      if (val === '全部') return;
      if (filters[name] !== undefined) filters[name].push(val);
    });
    return filters;
  }

  function applyFilters(templates) {
    var filters = getActiveFilters();
    return templates.filter(function(tpl) {
      var tags = getTemplateTags(tpl);
      // Industry filter
      if (filters.industryCategory.length > 0) {
        if (filters.industryCategory.indexOf(tpl.industryCategory) === -1) return false;
      }
      // Background filter
      if (filters.backgroundMode.length > 0) {
        if (filters.backgroundMode.indexOf(tpl.backgroundMode) === -1) return false;
      }
      // Layout filter
      if (filters.layoutType.length > 0) {
        if (filters.layoutType.indexOf(tpl.layoutType) === -1) return false;
      }
      // Search
      if (filters.search) {
        var haystack = (tpl.name + ' ' + tpl.description + ' ' + tpl.industryCategory + ' ' + tpl.industry + ' ' + tags.join(' ')).toLowerCase();
        if (haystack.indexOf(filters.search) === -1) return false;
      }
      return true;
    });
  }

  // ---- Init Gallery ----
  function initGallery() {
    var allData = getData();
    var container = document.getElementById('templatesGrid');
    var emptyState = document.getElementById('emptyState');
    var resultCount = document.getElementById('resultCount');
    if (!container) return;

    var currentView = 'grid';

    function update() {
      var filtered = applyFilters(allData);
      if (filtered.length === 0) {
        container.innerHTML = '';
        emptyState.classList.remove('d-none');
      } else {
        emptyState.classList.add('d-none');
        renderCards(filtered, container, currentView);
      }
      if (resultCount) resultCount.textContent = '顯示 ' + filtered.length + ' 套樣板';
    }

    update();

    // Filter checkboxes
    document.querySelectorAll('.filter-options input[type="checkbox"]').forEach(function(cb) {
      cb.addEventListener('change', function() {
        // Handle "全部" checkbox
        if (this.value === '全部') {
          var siblings = document.querySelectorAll('input[name="' + this.name + '"]');
          siblings.forEach(function(s) { if (s.value !== '全部') s.checked = false; });
        } else {
          var allCb = document.querySelector('input[name="' + this.name + '"][value="全部"]');
          if (allCb) allCb.checked = false;
        }
        update();
      });
    });

    // Search
    var searchInput = document.getElementById('searchInput');
    if (searchInput) {
      var debounceTimer;
      searchInput.addEventListener('input', function() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(update, 300);
      });
    }

    // Hot tags
    document.querySelectorAll('.hot-tag').forEach(function(btn) {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.hot-tag').forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var tag = btn.dataset.tag;
        // Reset all filters
        document.querySelectorAll('.filter-options input[type="checkbox"]').forEach(function(cb) {
          cb.checked = cb.value === '全部';
        });
        if (tag !== 'all') {
          // Try to match industry, background, or tags
          allData.forEach(function(tpl) {
            var tplTags = getTemplateTags(tpl);
            if (tpl.industryCategory === tag || tplTags.indexOf(tag) !== -1) {
              // set appropriate filter
            }
          });
          // Simple approach: filter by search
          if (searchInput) searchInput.value = tag;
        } else {
          if (searchInput) searchInput.value = '';
        }
        update();
      });
    });

    // View toggle
    document.querySelectorAll('.view-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.view-btn').forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        currentView = btn.dataset.view;
        container.classList.toggle('list-view', currentView === 'list');
      });
    });

    // Reset
    var resetBtn = document.getElementById('filterReset');
    if (resetBtn) {
      resetBtn.addEventListener('click', function() {
        document.querySelectorAll('.filter-options input[type="checkbox"]').forEach(function(cb) {
          cb.checked = cb.value === '全部';
        });
        if (searchInput) searchInput.value = '';
        document.querySelectorAll('.hot-tag').forEach(function(b) { b.classList.remove('active'); });
        var allTag = document.querySelector('.hot-tag[data-tag="all"]');
        if (allTag) allTag.classList.add('active');
        update();
      });
    }

    var emptyReset = document.getElementById('emptyReset');
    if (emptyReset) {
      emptyReset.addEventListener('click', function() {
        document.querySelectorAll('.filter-options input[type="checkbox"]').forEach(function(cb) {
          cb.checked = cb.value === '全部';
        });
        if (searchInput) searchInput.value = '';
        update();
      });
    }
  }

  // ---- Mobile Menu ----
  function initMobileMenu() {
    var hamburger = document.getElementById('hamburgerBtn');
    var drawer = document.getElementById('mobileDrawer');
    if (!hamburger || !drawer) return;
    hamburger.addEventListener('click', function() {
      drawer.classList.toggle('open');
      hamburger.classList.toggle('active');
    });
    // Close on link click
    drawer.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() {
        drawer.classList.remove('open');
        hamburger.classList.remove('active');
      });
    });
  }

  // ---- Back to Top ----
  function initBackToTop() {
    var btn = document.getElementById('backToTop');
    if (!btn) return;
    window.addEventListener('scroll', function() {
      btn.classList.toggle('visible', window.scrollY > 400);
    });
    btn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Header Scroll Effect ----
  function initHeaderScroll() {
    var header = document.getElementById('galleryHeader');
    if (!header) return;
    window.addEventListener('scroll', function() {
      header.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  // ---- Boot ----
  document.addEventListener('DOMContentLoaded', function() {
    initGallery();
    initMobileMenu();
    initBackToTop();
    initHeaderScroll();
  });

})();
