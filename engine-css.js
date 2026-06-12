// engine-css.js — CSS, responsive, JS, and other file generators
'use strict';

function genStyleCSS(t) {
  const c = t.colors;
  const isDark = t.theme === 'dark';
  const hdr = t.headerStyle;
  const hero = t.heroStyle;
  const card = t.cardStyle;
  const btn = t.btnStyle;
  const decor = t.decor;

  // Decorations per template
  const decorCSS = {
    'diagonal-lines': `.hero::after{content:'';position:absolute;bottom:0;left:0;width:100%;height:80px;background:linear-gradient(135deg,var(--bg-primary) 33.33%,transparent 33.33%,transparent 66.66%,var(--bg-primary) 66.66%);z-index:2}`,
    'angular-cuts': `.service-card::before{content:'';position:absolute;top:0;right:0;width:60px;height:60px;background:var(--accent);clip-path:polygon(100% 0,0 0,100% 100%)}`,
    'film-grain': `.hero-overlay{background:rgba(0,0,0,.5),url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")}`,
    'speed-lines': `.hero::before{content:'';position:absolute;top:0;left:0;width:100%;height:100%;background:repeating-linear-gradient(90deg,transparent,transparent 120px,rgba(192,192,192,0.03) 120px,rgba(192,192,192,0.03) 121px);z-index:1}`,
    'organic-waves': `.cta-banner::before{content:'';position:absolute;top:-40px;left:0;width:100%;height:80px;background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 80'%3E%3Cpath fill='%2312201c' d='M0,40 C360,80 720,0 1080,40 C1260,60 1380,20 1440,40 L1440,80 L0,80 Z'/%3E%3C/svg%3E") no-repeat center/cover}`,
    'grid-overlay': `body::before{content:'';position:fixed;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 50px,rgba(255,255,255,0.015) 50px,rgba(255,255,255,0.015) 51px),repeating-linear-gradient(90deg,transparent,transparent 50px,rgba(255,255,255,0.015) 50px,rgba(255,255,255,0.015) 51px);pointer-events:none;z-index:0}`,
    'neon-glow': `.btn-primary-cta{box-shadow:0 0 20px rgba(191,90,242,0.3),0 0 40px rgba(191,90,242,0.1)}`,
    'minimal-dots': `.section-title::after{content:'';display:block;width:40px;height:4px;background:radial-gradient(circle,var(--accent) 1.5px,transparent 1.5px);background-size:8px 4px;margin-top:16px}`,
    'handwritten': `.section-title{font-style:italic}`,
    'floral-divider': `.section-title::after{content:'✿';display:block;color:var(--accent);font-size:1.2rem;margin-top:12px;opacity:0.5}`,
    'leaf-pattern': `.site-footer::before{content:'';display:block;height:4px;background:linear-gradient(90deg,var(--accent),var(--accent2),var(--accent))}`,
    'speech-bubbles': `.review-card::before{content:'';position:absolute;top:-8px;left:24px;width:16px;height:16px;background:var(--bg-card);transform:rotate(45deg)}`,
    'hand-drawn-divider': `.section-title::after{content:'';display:block;width:60px;height:2px;background:var(--accent);margin-top:16px;border-radius:2px}`,
    'page-curl': `.sidebar-card::after{content:'';position:absolute;bottom:0;right:0;width:20px;height:20px;background:linear-gradient(135deg,var(--bg-card) 50%,var(--border) 50%)}`,
    'geometric-blocks': `.hero::after{content:'';position:absolute;bottom:20px;right:20px;width:120px;height:120px;border:2px solid var(--accent);opacity:0.15;transform:rotate(15deg)}`,
    'confetti': `body::after{content:'';position:fixed;top:0;left:0;width:100%;height:100%;background-image:radial-gradient(circle,var(--accent) 1px,transparent 1px),radial-gradient(circle,var(--accent2) 1px,transparent 1px);background-size:60px 60px;background-position:0 0,30px 30px;opacity:0.02;pointer-events:none;z-index:0}`
  };

  // Header style CSS
  const headerCSS = {
    'invisible': `.site-header{position:fixed;top:0;left:0;width:100%;z-index:100;padding:24px 0;transition:all .4s;background:transparent}
.site-header.scrolled{background:rgba(${isDark?'10,10,10':'250,246,240'},0.95);backdrop-filter:blur(16px);padding:14px 0;border-bottom:1px solid var(--border)}`,
    'solid-dark': `.site-header{position:fixed;top:0;left:0;width:100%;z-index:100;padding:16px 0;background:${c.bgPrimary};border-bottom:1px solid var(--border);transition:all .3s}
.site-header.scrolled{padding:10px 0;box-shadow:0 4px 20px rgba(0,0,0,0.3)}`,
    'overlay-hamburger': `.site-header{position:fixed;top:0;left:0;width:100%;z-index:100;padding:24px 0;transition:all .4s;background:transparent}
.site-header.scrolled{background:rgba(5,5,5,0.9);backdrop-filter:blur(12px);padding:14px 0}`,
    'solid-neon': `.site-header{position:fixed;top:0;left:0;width:100%;z-index:100;padding:14px 0;background:${c.bgPrimary};border-bottom:2px solid var(--accent);transition:all .3s}
.site-header.scrolled{box-shadow:0 0 30px rgba(191,90,242,0.2)}`,
    'left-rail': `.site-header{position:fixed;top:0;left:0;width:220px;height:100vh;z-index:100;padding:30px 20px;background:${c.bgSecondary};border-right:1px solid var(--border);display:flex;flex-direction:column}
.site-header.scrolled{box-shadow:4px 0 20px rgba(0,0,0,0.2)}
.header-inner{flex-direction:column;align-items:flex-start;gap:24px}
.nav-menu{flex-direction:column;gap:16px;align-items:flex-start}
.hamburger{display:none}`,
    'cream-warm': `.site-header{position:fixed;top:0;left:0;width:100%;z-index:100;padding:18px 0;background:${c.bgPrimary};border-bottom:1px solid var(--border);transition:all .3s}
.site-header.scrolled{box-shadow:0 2px 20px rgba(0,0,0,0.08)}`,
    'elegant-centered': `.site-header{position:fixed;top:0;left:0;width:100%;z-index:100;padding:20px 0;background:transparent;transition:all .4s}
.site-header.scrolled{background:rgba(${isDark?'253,251,247':'253,251,247'},0.97);backdrop-filter:blur(12px);padding:12px 0;border-bottom:1px solid var(--border)}`,
    'green-fresh': `.site-header{position:fixed;top:0;left:0;width:100%;z-index:100;padding:16px 0;background:${c.bgPrimary};border-bottom:2px solid var(--accent);transition:all .3s}
.site-header.scrolled{box-shadow:0 2px 16px rgba(0,0,0,0.06)}`,
    'clean-blue': `.site-header{position:fixed;top:0;left:0;width:100%;z-index:100;padding:16px 0;background:${c.bgPrimary};border-bottom:1px solid var(--border);transition:all .3s}
.site-header.scrolled{box-shadow:0 2px 20px rgba(0,0,0,0.08)}`,
    'handwritten': `.site-header{position:fixed;top:0;left:0;width:100%;z-index:100;padding:18px 0;background:transparent;transition:all .4s}
.site-header.scrolled{background:rgba(245,245,238,0.96);backdrop-filter:blur(10px);padding:12px 0;border-bottom:1px solid var(--border)}`,
    'paper-texture': `.site-header{position:fixed;top:0;left:0;width:100%;z-index:100;padding:16px 0;background:${c.bgPrimary};border-bottom:1px solid var(--border);transition:all .3s}
.site-header.scrolled{box-shadow:0 2px 12px rgba(0,0,0,0.06)}`,
    'modern-clean': `.site-header{position:fixed;top:0;left:0;width:100%;z-index:100;padding:14px 0;background:${c.bgPrimary};border-bottom:1px solid var(--border);transition:all .3s}
.site-header.scrolled{box-shadow:0 4px 24px rgba(0,0,0,0.08)}`,
    'colorful': `.site-header{position:fixed;top:0;left:0;width:100%;z-index:100;padding:16px 0;background:${c.bgPrimary};border-bottom:3px solid;background-image:linear-gradient(90deg,#e53e3e,#f59e0b,#10b981,#3b82f6);transition:all .3s}
.site-header.scrolled{box-shadow:0 4px 20px rgba(0,0,0,0.1)}`,
    'floating-side': `.site-header{position:fixed;top:50%;left:20px;transform:translateY(-50%);width:60px;z-index:100;padding:16px 0;background:rgba(${isDark?'18,32,28':'255,255,255'},0.9);backdrop-filter:blur(12px);border-radius:30px;border:1px solid var(--border)}
.site-header.scrolled{box-shadow:0 4px 20px rgba(0,0,0,0.2)}
.header-inner{flex-direction:column;align-items:center;gap:16px}
.nav-menu{flex-direction:column;gap:12px;align-items:center}
.logo{font-size:0!important}
.logo span{font-size:.7rem!important;writing-mode:vertical-rl}
.hamburger{display:none}`
  };

  // Button style CSS
  const btnCSS = {
    'thin-outline': `.btn-primary-cta{display:inline-flex;align-items:center;gap:8px;padding:14px 36px;background:transparent;color:var(--accent);font-weight:600;font-size:.9rem;border:1px solid var(--accent);cursor:pointer;transition:all .3s;font-family:var(--font-body);border-radius:0}
.btn-primary-cta:hover{background:var(--accent);color:var(--bg-primary)}
.btn-secondary-cta{display:inline-flex;align-items:center;gap:8px;padding:14px 36px;background:transparent;color:var(--text-primary);font-weight:500;font-size:.9rem;border:1px solid var(--border);cursor:pointer;transition:all .3s;font-family:var(--font-body);border-radius:0}
.btn-secondary-cta:hover{border-color:var(--accent);color:var(--accent)}`,
    'solid-bold': `.btn-primary-cta{display:inline-flex;align-items:center;gap:8px;padding:16px 40px;background:var(--accent);color:#fff;font-weight:700;font-size:1rem;border:none;cursor:pointer;transition:all .3s;font-family:var(--font-body);text-transform:uppercase;letter-spacing:1px;clip-path:polygon(0 0,100% 0,95% 100%,5% 100%)}
.btn-primary-cta:hover{background:var(--accent-hover);transform:translateY(-2px)}
.btn-secondary-cta{display:inline-flex;align-items:center;gap:8px;padding:16px 40px;background:transparent;color:var(--accent);font-weight:600;font-size:.9rem;border:2px solid var(--accent);cursor:pointer;transition:all .3s;font-family:var(--font-body)}
.btn-secondary-cta:hover{background:var(--accent);color:#fff}`,
    'solid-accent': `.btn-primary-cta{display:inline-flex;align-items:center;gap:8px;padding:14px 36px;background:var(--accent);color:#fff;font-weight:600;font-size:.9rem;border:none;cursor:pointer;transition:all .3s;font-family:var(--font-body);border-radius:2px}
.btn-primary-cta:hover{background:var(--accent-hover);transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,0.3)}
.btn-secondary-cta{display:inline-flex;align-items:center;gap:8px;padding:14px 36px;background:transparent;color:var(--text-primary);font-weight:500;font-size:.9rem;border:1px solid var(--text-secondary);cursor:pointer;transition:all .3s;font-family:var(--font-body)}
.btn-secondary-cta:hover{border-color:var(--accent);color:var(--accent)}`,
    'metallic': `.btn-primary-cta{display:inline-flex;align-items:center;gap:8px;padding:16px 40px;background:linear-gradient(135deg,#c0c0c0,#e8e8e8,#c0c0c0);color:#111;font-weight:700;font-size:.95rem;border:none;cursor:pointer;transition:all .3s;font-family:var(--font-body);border-radius:2px}
.btn-primary-cta:hover{box-shadow:0 8px 30px rgba(192,192,192,0.4);transform:translateY(-2px)}
.btn-secondary-cta{display:inline-flex;align-items:center;gap:8px;padding:16px 40px;background:transparent;color:var(--accent2);font-weight:600;font-size:.9rem;border:1px solid var(--accent2);cursor:pointer;transition:all .3s;font-family:var(--font-body)}
.btn-secondary-cta:hover{background:var(--accent2);color:#fff}`,
    'rounded-solid': `.btn-primary-cta{display:inline-flex;align-items:center;gap:8px;padding:16px 40px;background:var(--accent);color:#fff;font-weight:600;font-size:.95rem;border:none;cursor:pointer;transition:all .3s;font-family:var(--font-body);border-radius:50px}
.btn-primary-cta:hover{background:var(--accent-hover);transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,0.2)}
.btn-secondary-cta{display:inline-flex;align-items:center;gap:8px;padding:16px 40px;background:transparent;color:var(--accent);font-weight:500;font-size:.9rem;border:1px solid var(--accent);cursor:pointer;transition:all .3s;font-family:var(--font-body);border-radius:50px}
.btn-secondary-cta:hover{background:var(--accent);color:#fff}`,
    'gradient-neon': `.btn-primary-cta{display:inline-flex;align-items:center;gap:8px;padding:16px 40px;background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff;font-weight:700;font-size:1rem;border:none;cursor:pointer;transition:all .3s;font-family:var(--font-body);border-radius:4px}
.btn-primary-cta:hover{box-shadow:0 0 30px rgba(191,90,242,0.4);transform:translateY(-2px)}
.btn-secondary-cta{display:inline-flex;align-items:center;gap:8px;padding:16px 40px;background:transparent;color:var(--accent2);font-weight:600;font-size:.95rem;border:1px solid var(--accent2);cursor:pointer;transition:all .3s;font-family:var(--font-body);border-radius:4px}
.btn-secondary-cta:hover{background:var(--accent2);color:#fff}`,
    'text-link': `.btn-primary-cta{display:inline-flex;align-items:center;gap:8px;padding:12px 0;background:transparent;color:var(--accent);font-weight:600;font-size:.95rem;border:none;cursor:pointer;transition:all .3s;font-family:var(--font-body);border-bottom:2px solid var(--accent)}
.btn-primary-cta:hover{opacity:0.7}
.btn-secondary-cta{display:inline-flex;align-items:center;gap:8px;padding:12px 0;background:transparent;color:var(--text-primary);font-weight:500;font-size:.9rem;border:none;cursor:pointer;transition:all .3s;font-family:var(--font-body);border-bottom:1px solid var(--border)}
.btn-secondary-cta:hover{color:var(--accent);border-color:var(--accent)}`,
    'gold-outline': `.btn-primary-cta{display:inline-flex;align-items:center;gap:8px;padding:14px 36px;background:transparent;color:var(--accent);font-weight:600;font-size:.9rem;border:1px solid var(--accent);cursor:pointer;transition:all .3s;font-family:var(--font-body);border-radius:2px}
.btn-primary-cta:hover{background:var(--accent);color:#fff}
.btn-secondary-cta{display:inline-flex;align-items:center;gap:8px;padding:14px 36px;background:transparent;color:var(--accent2);font-weight:500;font-size:.9rem;border:1px solid var(--accent2);cursor:pointer;transition:all .3s;font-family:var(--font-body)}
.btn-secondary-cta:hover{border-color:var(--accent);color:var(--accent)}`,
    'solid-green': `.btn-primary-cta{display:inline-flex;align-items:center;gap:8px;padding:14px 36px;background:var(--accent);color:#fff;font-weight:600;font-size:.9rem;border:none;cursor:pointer;transition:all .3s;font-family:var(--font-body);border-radius:8px}
.btn-primary-cta:hover{background:var(--accent-hover);transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,0.1)}
.btn-secondary-cta{display:inline-flex;align-items:center;gap:8px;padding:14px 36px;background:transparent;color:var(--accent);font-weight:500;font-size:.9rem;border:1px solid var(--accent);cursor:pointer;transition:all .3s;font-family:var(--font-body);border-radius:8px}
.btn-secondary-cta:hover{background:var(--accent);color:#fff}`,
    'solid-yellow': `.btn-primary-cta{display:inline-flex;align-items:center;gap:8px;padding:16px 40px;background:var(--accent2);color:#1e2a3a;font-weight:700;font-size:1rem;border:none;cursor:pointer;transition:all .3s;font-family:var(--font-body);border-radius:8px}
.btn-primary-cta:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(245,158,11,0.3)}
.btn-secondary-cta{display:inline-flex;align-items:center;gap:8px;padding:16px 40px;background:transparent;color:var(--accent);font-weight:600;font-size:.95rem;border:2px solid var(--accent);cursor:pointer;transition:all .3s;font-family:var(--font-body);border-radius:8px}
.btn-secondary-cta:hover{background:var(--accent);color:#fff}`,
    'rounded-warm': `.btn-primary-cta{display:inline-flex;align-items:center;gap:8px;padding:14px 36px;background:var(--accent);color:#fff;font-weight:600;font-size:.9rem;border:none;cursor:pointer;transition:all .3s;font-family:var(--font-body);border-radius:12px}
.btn-primary-cta:hover{background:var(--accent-hover);transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,0.12)}
.btn-secondary-cta{display:inline-flex;align-items:center;gap:8px;padding:14px 36px;background:transparent;color:var(--accent);font-weight:500;font-size:.9rem;border:1px solid var(--accent);cursor:pointer;transition:all .3s;font-family:var(--font-body);border-radius:12px}
.btn-secondary-cta:hover{background:var(--accent);color:#fff}`,
    'rounded-earth': `.btn-primary-cta{display:inline-flex;align-items:center;gap:8px;padding:14px 36px;background:var(--accent);color:#fff;font-weight:600;font-size:.9rem;border:none;cursor:pointer;transition:all .3s;font-family:var(--font-body);border-radius:50px}
.btn-primary-cta:hover{background:var(--accent-hover);transform:translateY(-2px)}
.btn-secondary-cta{display:inline-flex;align-items:center;gap:8px;padding:14px 36px;background:transparent;color:var(--accent);font-weight:500;font-size:.9rem;border:1px solid var(--accent);cursor:pointer;transition:all .3s;font-family:var(--font-body);border-radius:50px}
.btn-secondary-cta:hover{background:var(--accent);color:#fff}`,
    'solid-brown': `.btn-primary-cta{display:inline-flex;align-items:center;gap:8px;padding:14px 36px;background:var(--accent);color:#fff;font-weight:600;font-size:.9rem;border:none;cursor:pointer;transition:all .3s;font-family:var(--font-body);border-radius:4px}
.btn-primary-cta:hover{background:var(--accent-hover);transform:translateY(-2px)}
.btn-secondary-cta{display:inline-flex;align-items:center;gap:8px;padding:14px 36px;background:transparent;color:var(--accent);font-weight:500;font-size:.9rem;border:1px solid var(--accent);cursor:pointer;transition:all .3s;font-family:var(--font-body)}
.btn-secondary-cta:hover{background:var(--accent);color:#fff}`,
    'solid-indigo': `.btn-primary-cta{display:inline-flex;align-items:center;gap:8px;padding:16px 40px;background:var(--accent);color:#fff;font-weight:700;font-size:1rem;border:none;cursor:pointer;transition:all .3s;font-family:var(--font-body);border-radius:8px}
.btn-primary-cta:hover{background:var(--accent-hover);transform:translateY(-2px);box-shadow:0 8px 24px rgba(79,70,229,0.3)}
.btn-secondary-cta{display:inline-flex;align-items:center;gap:8px;padding:16px 40px;background:transparent;color:var(--text-primary);font-weight:600;font-size:.95rem;border:1px solid var(--border);cursor:pointer;transition:all .3s;font-family:var(--font-body);border-radius:8px}
.btn-secondary-cta:hover{border-color:var(--accent);color:var(--accent)}`,
    'solid-multi': `.btn-primary-cta{display:inline-flex;align-items:center;gap:8px;padding:16px 40px;background:var(--accent);color:#fff;font-weight:700;font-size:1rem;border:none;cursor:pointer;transition:all .3s;font-family:var(--font-body);border-radius:50px}
.btn-primary-cta:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(229,62,62,0.3)}
.btn-secondary-cta{display:inline-flex;align-items:center;gap:8px;padding:16px 40px;background:var(--accent2);color:#fff;font-weight:700;font-size:1rem;border:none;cursor:pointer;transition:all .3s;font-family:var(--font-body);border-radius:50px}
.btn-secondary-cta:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(245,158,11,0.3)}`
  };

  const decorStr = decorCSS[decor] || '';
  const headerStr = headerCSS[hdr] || headerCSS['solid-dark'];
  const btnStr = btnCSS[btn] || btnCSS['solid-accent'];

  return `/* === ${t.id} ${t.name} — ${t.colorTheme} === */
:root {
  --bg-primary: ${c.bgPrimary};
  --bg-secondary: ${c.bgSecondary};
  --bg-card: ${c.bgCard};
  --text-primary: ${c.textPrimary};
  --text-secondary: ${c.textSecondary};
  --accent: ${c.accent};
  --accent-hover: ${c.accentHover};
  --accent2: ${c.accent2||c.accent};
  --border: ${c.border};
  --font-heading: ${t.fontFamily};
  --font-body: 'Noto Sans TC', sans-serif;
  --section-padding: 100px;
  --card-radius: ${card.includes('round')?'16px':card.includes('angled')?'0':'4px'};
}
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html {
  scroll-behavior: smooth;
  font-size: 16px;
}
body {
  font-family: var(--font-body);
  line-height: 1.7;
  color: var(--text-primary);
  background: var(--bg-primary);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
img {
  max-width: 100%;
  height: auto;
  display: block;
}
a {
  text-decoration: none;
  color: inherit;
  transition: color .3s, opacity .3s;
}
ul,
ol {
  list-style: none;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  line-height: 1.2;
  font-family: var(--font-heading);
  font-weight: 700;
  color: var(--text-primary);
}
p {
  line-height: 1.8;
}
::selection {
  background: var(--accent);
  color: ${isDark ? '#fff' : '#fff'};
}
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}
.section {
  padding: var(--section-padding) 0;
  position: relative;
}
.section-label {
  display: inline-block;
  font-size: .75rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 12px;
  font-weight: 600;
}
.section-title {
  font-size: 2.4rem;
  margin-bottom: 16px;
  color: var(--text-primary);
}
.section-desc {
  color: var(--text-secondary);
  font-size: 1.05rem;
  max-width: 600px;
  margin-bottom: 32px;
  line-height: 1.8;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border: 0;
}
.animate-in {
  opacity: 1 !important;
  transform: translateY(0) !important;
}
${btnStr}

/* Header */
${headerStr}
.header-inner{display:flex;align-items:center;justify-content:space-between}
.logo{font-family:var(--font-heading);font-size:1.5rem;font-weight:700;color:var(--accent);letter-spacing:1px}
.logo span{font-weight:400;color:var(--text-secondary);font-size:.8rem;display:block;letter-spacing:2px}
.nav-menu{display:flex;gap:28px;align-items:center}
.nav-menu a{color:var(--text-secondary);font-size:.88rem;font-weight:500;letter-spacing:0.5px;position:relative;transition:color .3s}
.nav-menu a::after{content:'';position:absolute;bottom:-4px;left:0;width:0;height:2px;background:var(--accent);transition:width .3s}
.nav-menu a:hover,.nav-menu a.active{color:var(--accent)}
.nav-menu a:hover::after,.nav-menu a.active::after{width:100%}
.header-cta{padding:10px 24px;background:var(--accent);color:${isDark?'#fff':'#fff'};font-size:.82rem;font-weight:600;letter-spacing:1px;cursor:pointer;transition:all .3s;font-family:var(--font-body);border-radius:var(--card-radius,4px)}
.header-cta:hover{background:var(--accent-hover);transform:translateY(-1px)}

/* Hamburger */
.hamburger{display:none;flex-direction:column;gap:5px;padding:8px;background:none;border:none;cursor:pointer;z-index:101}
.hamburger span{display:block;width:24px;height:2px;background:var(--accent);transition:all .3s}
.hamburger.active span:nth-child(1){transform:rotate(45deg) translate(5px,5px)}
.hamburger.active span:nth-child(2){opacity:0}
.hamburger.active span:nth-child(3){transform:rotate(-45deg) translate(5px,-5px)}

/* Mobile Drawer */
.mobile-menu{position:fixed;top:0;right:-320px;width:300px;height:100vh;background:var(--bg-secondary);border-left:1px solid var(--border);transition:right .4s;z-index:100;padding:80px 30px 30px;overflow-y:auto}
.mobile-menu.open{right:0}
.mobile-menu a{display:block;padding:14px 0;color:var(--text-primary);font-size:1rem;border-bottom:1px solid var(--border);font-weight:500}
.mobile-menu a:hover{color:var(--accent)}
.mobile-overlay{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:99;opacity:0;visibility:hidden;transition:all .3s}
.mobile-overlay.show{opacity:1;visibility:visible}

/* Hero */
.hero{position:relative;min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;overflow:hidden}
.hero-bg{position:absolute;inset:0;background-size:cover;background-position:center;transition:transform .5s}
.hero-overlay{position:absolute;inset:0;background:${isDark?'rgba(0,0,0,0.55)':'rgba(0,0,0,0.3)'};z-index:1}
.hero-content{position:relative;z-index:2;max-width:800px;padding:0 24px}
.hero-label{display:inline-block;font-size:.8rem;letter-spacing:4px;text-transform:uppercase;color:var(--accent);margin-bottom:20px;font-weight:500}
.hero h1{font-size:3.5rem;margin-bottom:20px;color:#fff;text-shadow:0 2px 20px rgba(0,0,0,0.3)}
.hero h1 em{font-style:italic;color:var(--accent)}
.hero-sub{font-size:1.15rem;color:rgba(255,255,255,0.85);margin-bottom:36px;line-height:1.8}
.hero-actions{display:flex;gap:16px;justify-content:center;flex-wrap:wrap}
.hero-scroll{position:absolute;bottom:30px;left:50%;transform:translateX(-50%);color:var(--accent);font-size:1.5rem;z-index:2;animation:bounce 2s infinite}
@keyframes bounce{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(-10px)}}

/* Page Hero */
.page-hero{padding:140px 0 60px;background:var(--bg-secondary);text-align:center;border-bottom:1px solid var(--border)}
.page-hero h1{font-size:2.6rem;margin-bottom:12px}
.page-hero p{color:var(--text-secondary);font-size:1.05rem}

/* About Grid */
.about-grid{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
.about-image img{border-radius:var(--card-radius);width:100%;height:500px;object-fit:cover}
.about-text p{color:var(--text-secondary);margin-bottom:16px;line-height:1.8}
.about-stats{display:flex;gap:40px;margin:32px 0}
.stat-item{text-align:center}
.stat-num{display:block;font-size:2.2rem;font-weight:700;color:var(--accent);font-family:var(--font-heading)}
.stat-text{font-size:.85rem;color:var(--text-secondary)}

/* Services Grid */
.services-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:30px}
.services-grid-full{display:grid;grid-template-columns:repeat(2,1fr);gap:40px}
.service-card,.service-card-full{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--card-radius);overflow:hidden;transition:all .3s;position:relative}
.service-card:hover,.service-card-full:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(0,0,0,${isDark?'0.3':'0.1'})}
.service-card-img,.service-card-full .service-card-img{height:220px;overflow:hidden}
.service-card-img img,.service-card-full .service-card-img img{width:100%;height:100%;object-fit:cover;transition:transform .5s}
.service-card:hover img,.service-card-full:hover img{transform:scale(1.05)}
.service-card-body{padding:24px}
.service-card-body h3{font-size:1.2rem;margin-bottom:8px}
.service-card-body p{color:var(--text-secondary);font-size:.9rem;line-height:1.7}
.service-price{display:inline-block;margin-top:12px;padding:4px 12px;background:rgba(${isDark?'255,255,255,0.05':'0,0,0,0.04'});border-radius:4px;font-weight:600;color:var(--accent);font-size:.9rem}

/* Portfolio Grid */
.portfolio-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px}
.portfolio-grid-full{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.portfolio-item{position:relative;overflow:hidden;border-radius:var(--card-radius);aspect-ratio:4/3}
.portfolio-item img{width:100%;height:100%;object-fit:cover;transition:transform .5s}
.portfolio-item:hover img{transform:scale(1.08)}
.portfolio-overlay{position:absolute;inset:0;background:rgba(0,0,0,0.6);display:flex;flex-direction:column;align-items:center;justify-content:center;opacity:0;transition:opacity .3s;color:#fff}
.portfolio-item:hover .portfolio-overlay{opacity:1}
.portfolio-overlay h3{font-size:1.1rem;margin-bottom:4px}
.portfolio-overlay p{font-size:.85rem;opacity:0.8}
.portfolio-overlay span{font-size:2rem;color:var(--accent)}

/* Reviews */
.reviews-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.reviews-grid-full{display:grid;grid-template-columns:repeat(2,1fr);gap:30px}
.review-card,.review-card-full{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--card-radius);padding:32px;position:relative}
.review-stars{color:var(--accent);font-size:1.1rem;margin-bottom:12px}
.review-text{font-style:italic;color:var(--text-secondary);margin-bottom:20px;line-height:1.8;font-size:.95rem}
.review-author strong{display:block;color:var(--text-primary);font-weight:600}
.review-author span{font-size:.85rem;color:var(--text-secondary)}

/* FAQ */
.faq-list{max-width:800px;margin:0 auto}
.faq-item{border:1px solid var(--border);border-radius:var(--card-radius);margin-bottom:12px;overflow:hidden}
.faq-question{display:flex;justify-content:space-between;align-items:center;padding:20px 24px;cursor:pointer;font-weight:600;transition:color .3s;background:var(--bg-card)}
.faq-question:hover{color:var(--accent)}
.faq-question i{transition:transform .3s;color:var(--accent);flex-shrink:0}
.faq-item.open .faq-question i{transform:rotate(180deg)}
.faq-answer{max-height:0;overflow:hidden;transition:max-height .4s ease}
.faq-answer p{padding:0 24px 20px;color:var(--text-secondary);line-height:1.8}

/* Booking / Contact */
.booking-grid{display:grid;grid-template-columns:1.5fr 1fr;gap:60px}
.contact-grid{display:grid;grid-template-columns:1.2fr 1fr;gap:60px}
.booking-form,.contact-form{display:flex;flex-direction:column;gap:20px}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.form-group{display:flex;flex-direction:column;gap:6px}
.form-group label{font-weight:500;font-size:.9rem;color:var(--text-primary)}
.form-group input,.form-group select,.form-group textarea{padding:14px 16px;background:var(--bg-secondary);border:1px solid var(--border);border-radius:var(--card-radius,4px);color:var(--text-primary);font-size:.95rem;font-family:var(--font-body);transition:border-color .3s}
.form-group input:focus,.form-group select:focus,.form-group textarea:focus{outline:none;border-color:var(--accent)}
.form-success{padding:16px;background:rgba(16,185,129,0.1);border:1px solid #10b981;border-radius:4px;color:#10b981;text-align:center;font-weight:500}
.info-card{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--card-radius);padding:24px;margin-bottom:16px}
.info-card i{font-size:1.5rem;color:var(--accent);margin-bottom:8px;display:block}
.info-card h3{font-size:1rem;margin-bottom:4px}
.info-card p{color:var(--text-secondary);font-size:.9rem}
.contact-info-cards{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.contact-map{margin-top:24px;border-radius:var(--card-radius);overflow:hidden}

/* Detail Page */
.detail-grid{display:grid;grid-template-columns:2fr 1fr;gap:60px}
.detail-hero-img{margin-bottom:32px;border-radius:var(--card-radius);overflow:hidden}
.detail-hero-img img{width:100%;height:400px;object-fit:cover}
.detail-main h2{margin:32px 0 16px;font-size:1.6rem}
.detail-main h3{margin:24px 0 12px;font-size:1.3rem}
.detail-main p{color:var(--text-secondary);line-height:1.8;margin-bottom:16px}
.detail-features{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:16px 0}
.feature-item{display:flex;align-items:center;gap:8px;color:var(--text-primary)}
.feature-item i{color:var(--accent)}
.detail-list{list-style:disc;padding-left:20px;margin:16px 0}
.detail-list li{color:var(--text-secondary);margin-bottom:8px;line-height:1.7}
.sidebar-card{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--card-radius);padding:24px;margin-bottom:20px;position:relative}
.sidebar-card h3{font-size:1.1rem;margin-bottom:16px}
.sidebar-price{font-size:1.4rem;color:var(--accent);font-weight:700;margin-bottom:16px;display:block}
.sidebar-link{display:block;padding:10px 0;border-bottom:1px solid var(--border);color:var(--text-secondary);font-size:.9rem}
.sidebar-link:hover{color:var(--accent)}

/* Process / Timeline */
.process-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:30px}
.process-step{text-align:center;padding:30px 20px;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--card-radius)}
.step-num{font-size:2rem;font-weight:700;color:var(--accent);font-family:var(--font-heading);margin-bottom:12px}
.process-step h3{font-size:1.1rem;margin-bottom:8px}
.process-step p{color:var(--text-secondary);font-size:.9rem}
.timeline{position:relative;max-width:800px;margin:0 auto}
.timeline::before{content:'';position:absolute;left:50%;top:0;bottom:0;width:2px;background:var(--border);transform:translateX(-50%)}
.timeline-item{display:grid;grid-template-columns:1fr 60px 1fr;gap:20px;margin-bottom:60px;align-items:center;position:relative}
.timeline-item.reverse{direction:rtl}
.timeline-item.reverse > *{direction:ltr}
.timeline-num{grid-column:2;text-align:center;width:50px;height:50px;background:var(--accent);color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-family:var(--font-heading);margin:0 auto;z-index:1;position:relative}
.timeline-content{padding:24px;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--card-radius)}
.timeline-content h3{font-size:1.1rem;margin-bottom:8px}
.timeline-content p{color:var(--text-secondary);font-size:.9rem}
.timeline-img img{width:100%;height:200px;object-fit:cover;border-radius:var(--card-radius)}

/* Blog */
.blog-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:30px}
.blog-card{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--card-radius);overflow:hidden;transition:all .3s}
.blog-card:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(0,0,0,${isDark?'0.3':'0.1'})}
.blog-card-img{height:200px;overflow:hidden}
.blog-card-img img{width:100%;height:100%;object-fit:cover;transition:transform .5s}
.blog-card:hover .blog-card-img img{transform:scale(1.05)}
.blog-card-body{padding:24px}
.blog-meta{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;align-items:center}
.blog-tag{font-size:.75rem;padding:3px 10px;background:rgba(${isDark?'255,255,255,0.06':'0,0,0,0.05'});border-radius:50px;color:var(--accent);font-weight:500}
.blog-date{font-size:.8rem;color:var(--text-secondary)}
.blog-card-body h3{font-size:1.15rem;margin-bottom:8px}
.blog-card-body p{color:var(--text-secondary);font-size:.9rem;line-height:1.7}
.blog-link{display:inline-flex;align-items:center;gap:4px;color:var(--accent);font-weight:600;font-size:.9rem;margin-top:12px}
.blog-detail-grid{display:grid;grid-template-columns:2fr 1fr;gap:60px}
.blog-detail-hero{padding:140px 0 40px;background:var(--bg-secondary);text-align:center}
.blog-detail-hero h1{font-size:2.4rem;margin-bottom:12px}
.blog-detail-img{margin-bottom:32px;border-radius:var(--card-radius);overflow:hidden}
.blog-detail-img img{width:100%;height:400px;object-fit:cover}
.blog-content h2{margin:32px 0 16px;font-size:1.5rem}
.blog-content p{color:var(--text-secondary);line-height:1.8;margin-bottom:16px}
.blog-content ul{list-style:disc;padding-left:20px;margin:16px 0}
.blog-content li{color:var(--text-secondary);margin-bottom:8px}
.blog-author{display:flex;align-items:center;gap:16px;margin-top:40px;padding-top:24px;border-top:1px solid var(--border)}
.blog-author img{width:60px;height:60px;border-radius:50%;object-fit:cover}
.blog-author strong{display:block;margin-bottom:2px}
.blog-author span{font-size:.85rem;color:var(--text-secondary)}
.sidebar-tags{display:flex;flex-wrap:wrap;gap:8px}

/* Values */
.values-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px}
.value-card{text-align:center;padding:40px 24px;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--card-radius);transition:all .3s}
.value-card:hover{transform:translateY(-4px);border-color:var(--accent)}
.value-card i{font-size:2.5rem;color:var(--accent);margin-bottom:16px}
.value-card h3{font-size:1.1rem;margin-bottom:8px}
.value-card p{color:var(--text-secondary);font-size:.9rem}

/* Team */
.team-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:30px}
.team-card{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--card-radius);overflow:hidden}
.team-img{height:280px;overflow:hidden}
.team-img img{width:100%;height:100%;object-fit:cover}
.team-info{padding:20px}
.team-info h3{font-size:1.1rem;margin-bottom:4px}
.team-info p{color:var(--text-secondary);font-size:.9rem}

/* CTA Banner */
.cta-banner{position:relative;padding:100px 0;text-align:center;overflow:hidden}
.cta-bg{position:absolute;inset:0;background-size:cover;background-position:center}
.cta-overlay{position:absolute;inset:0;background:rgba(0,0,0,0.7)}
.cta-banner .container{position:relative;z-index:1}
.cta-banner h2{font-size:2.2rem;color:#fff;margin-bottom:12px}
.cta-banner p{color:rgba(255,255,255,0.8);font-size:1.05rem;margin-bottom:32px}
.cta-actions{display:flex;gap:16px;justify-content:center;flex-wrap:wrap}

/* Footer */
.site-footer{background:var(--bg-secondary);padding:60px 0 30px;border-top:1px solid var(--border)}
.footer-grid{display:grid;grid-template-columns:1.5fr repeat(${Math.min(t.footerCols-1,3)},1fr);gap:40px;margin-bottom:40px}
.footer-brand .logo{margin-bottom:12px}
.footer-desc{color:var(--text-secondary);font-size:.9rem;line-height:1.7;margin-bottom:16px}
.footer-social{display:flex;gap:12px}
.footer-social a{width:40px;height:40px;display:flex;align-items:center;justify-content:center;border:1px solid var(--border);border-radius:50%;color:var(--text-secondary);transition:all .3s}
.footer-social a:hover{border-color:var(--accent);color:var(--accent)}
.footer-col h4{font-size:1rem;margin-bottom:16px;color:var(--text-primary)}
.footer-links li{margin-bottom:8px}
.footer-links a,.footer-links li{color:var(--text-secondary);font-size:.9rem;display:flex;align-items:center;gap:8px}
.footer-links a:hover{color:var(--accent)}
.footer-bottom{text-align:center;padding-top:30px;border-top:1px solid var(--border)}
.footer-bottom p{color:var(--text-secondary);font-size:.85rem}

/* Back to Top */
.back-to-top{position:fixed;bottom:30px;right:30px;width:48px;height:48px;background:var(--accent);color:#fff;border:none;border-radius:50%;font-size:1.2rem;cursor:pointer;opacity:0;visibility:hidden;transition:all .3s;z-index:90;display:flex;align-items:center;justify-content:center}
.back-to-top.visible{opacity:1;visibility:visible}
.back-to-top:hover{background:var(--accent-hover);transform:translateY(-3px)}

/* Decorations */
${decorStr}

/* Scroll Animations */
.service-card,
.portfolio-item,
.review-card,
.blog-card,
.value-card,
.team-card,
.process-step,
.faq-item {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.service-card.animate-in,
.portfolio-item.animate-in,
.review-card.animate-in,
.blog-card.animate-in,
.value-card.animate-in,
.team-card.animate-in,
.process-step.animate-in,
.faq-item.animate-in {
  opacity: 1;
  transform: translateY(0);
}

/* Smooth Transitions */
.service-card,
.service-card-full,
.review-card,
.review-card-full,
.blog-card,
.value-card,
.team-card,
.portfolio-item,
.faq-item {
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

/* Form Styles Enhanced */
.form-group input::placeholder,
.form-group textarea::placeholder {
  color: var(--text-secondary);
  opacity: 0.6;
}
.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(${isDark ? '255,255,255' : '0,0,0'},0.05);
}
.form-group select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  padding-right: 40px;
}

/* Image Loading */
img {
  background-color: var(--bg-secondary);
}

/* Link Hover Effects */
.blog-link:hover {
  gap: 8px;
}
.sidebar-link:hover {
  padding-left: 8px;
  transition: padding-left 0.3s ease;
}

/* Footer Enhanced */
.footer-social a {
  transition: all 0.3s ease;
}
.footer-social a:hover {
  transform: translateY(-3px);
}
.footer-links a {
  transition: color 0.3s ease, padding-left 0.3s ease;
}
.footer-links a:hover {
  padding-left: 4px;
}

/* Back to Top Enhanced */
.back-to-top {
  transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease, background-color 0.3s ease;
}
.back-to-top:hover {
  box-shadow: 0 4px 16px rgba(0,0,0,${isDark ? '0.4' : '0.15'});
}

/* Page Hero Enhanced */
.page-hero {
  position: relative;
}
.page-hero::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: var(--accent);
}

/* Review Stars */
.review-stars {
  letter-spacing: 2px;
}

/* Blog Tags Enhanced */
.blog-tag {
  transition: background-color 0.3s ease, color 0.3s ease;
}
.blog-tag:hover {
  background-color: var(--accent);
  color: #fff;
}

/* Service Price Enhanced */
.service-price {
  font-family: var(--font-heading);
  letter-spacing: 0.5px;
}

/* CTA Banner Enhanced */
.cta-banner {
  position: relative;
}
.cta-banner .container {
  position: relative;
  z-index: 1;
}
.cta-overlay {
  transition: background-color 0.3s ease;
}

/* Timeline Enhanced */
.timeline-num {
  font-size: 1.2rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.timeline-item:hover .timeline-num {
  transform: scale(1.1);
  box-shadow: 0 4px 16px rgba(0,0,0,${isDark ? '0.3' : '0.15'});
}

/* Detail Features Enhanced */
.feature-item {
  padding: 8px 0;
  transition: padding-left 0.3s ease;
}
.feature-item:hover {
  padding-left: 8px;
}

/* Sidebar Enhanced */
.sidebar-card {
  transition: box-shadow 0.3s ease;
}
.sidebar-card:hover {
  box-shadow: 0 4px 20px rgba(0,0,0,${isDark ? '0.2' : '0.08'});
}

/* Portfolio Overlay Enhanced */
.portfolio-overlay {
  backdrop-filter: blur(4px);
}
.portfolio-overlay h3 {
  transform: translateY(10px);
  transition: transform 0.3s ease 0.1s;
}
.portfolio-overlay p {
  transform: translateY(10px);
  transition: transform 0.3s ease 0.2s;
}
.portfolio-item:hover .portfolio-overlay h3,
.portfolio-item:hover .portfolio-overlay p {
  transform: translateY(0);
}

/* Blog Detail Enhanced */
.blog-content h2 {
  position: relative;
  padding-left: 16px;
}
.blog-content h2::before {
  content: '';
  position: absolute;
  left: 0;
  top: 4px;
  bottom: 4px;
  width: 4px;
  background: var(--accent);
  border-radius: 2px;
}

/* FAQ Enhanced */
.faq-item {
  transition: border-color 0.3s ease;
}
.faq-item.open {
  border-color: var(--accent);
}
.faq-item.open .faq-question {
  color: var(--accent);
}

/* Hero Responsive Text */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Gradient Text Utility */
.gradient-text {
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Card Hover Lift */
.service-card:hover,
.blog-card:hover {
  transform: translateY(-6px);
}

/* Overlay Gradient on Portfolio */
.portfolio-overlay {
  background: linear-gradient(
    to top,
    rgba(0,0,0,0.8) 0%,
    rgba(0,0,0,0.4) 50%,
    rgba(0,0,0,0.1) 100%
  );
}

/* Section Alternating BG */
.about-brief,
.services-preview,
.reviews-preview {
  position: relative;
}
.services-preview {
  background: var(--bg-secondary);
}

/* Hero Scroll Indicator */
.hero-scroll {
  animation: bounce 2s ease-in-out infinite;
}

/* Logo Hover */
.logo {
  transition: opacity 0.3s ease;
}
.logo:hover {
  opacity: 0.85;
}

/* Header CTA Hover Enhanced */
.header-cta {
  position: relative;
  overflow: hidden;
}
.header-cta::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255,255,255,0.15),
    transparent
  );
  transition: left 0.5s ease;
}
.header-cta:hover::after {
  left: 100%;
}

/* Footer Bottom Enhanced */
.footer-bottom {
  position: relative;
}
.footer-bottom::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 2px;
  background: var(--accent);
  opacity: 0.5;
}
`;
}

function genResponsiveCSS(t) {
  return `/* ${t.id} ${t.name} — Responsive */
@media(max-width:991px){
  .nav-menu,.header-cta{display:none}
  .hamburger{display:flex}
  .about-grid{grid-template-columns:1fr;gap:40px}
  .about-image img{height:360px}
  .services-grid{grid-template-columns:repeat(2,1fr)}
  .services-grid-full{grid-template-columns:1fr}
  .portfolio-grid{grid-template-columns:1fr 1fr}
  .portfolio-grid-full{grid-template-columns:repeat(2,1fr)}
  .reviews-grid{grid-template-columns:1fr}
  .reviews-grid-full{grid-template-columns:1fr}
  .booking-grid,.contact-grid{grid-template-columns:1fr}
  .detail-grid,.blog-detail-grid{grid-template-columns:1fr}
  .footer-grid{grid-template-columns:1fr;gap:32px}
  .values-grid{grid-template-columns:repeat(2,1fr)}
  .team-grid{grid-template-columns:repeat(2,1fr)}
  .timeline::before{left:25px}
  .timeline-item,.timeline-item.reverse{grid-template-columns:50px 1fr;direction:ltr}
  .timeline-item > *,.timeline-item.reverse > *{direction:ltr}
  .timeline-num{grid-column:1}
  .timeline-img{display:none}
  .contact-info-cards{grid-template-columns:1fr}
}
@media(max-width:767px){
  :root{--section-padding:60px}
  .hero h1{font-size:2.2rem}
  .hero-sub{font-size:.95rem}
  .section-title{font-size:1.8rem}
  .services-grid{grid-template-columns:1fr}
  .portfolio-grid{grid-template-columns:1fr}
  .portfolio-grid-full{grid-template-columns:1fr}
  .blog-grid{grid-template-columns:1fr}
  .form-row{grid-template-columns:1fr}
  .hero-actions{flex-direction:column;align-items:center}
  .cta-banner h2{font-size:1.8rem}
  .footer-grid{grid-template-columns:1fr}
  .about-stats{flex-direction:column;gap:20px}
  .values-grid{grid-template-columns:1fr}
  .team-grid{grid-template-columns:1fr}
  .page-hero h1{font-size:2rem}
  .detail-features{grid-template-columns:1fr}
}
@media(max-width:575px){
  .container{padding:0 16px}
  .hero{min-height:500px}
  .hero h1{font-size:1.8rem}
  .section-title{font-size:1.5rem}
  .about-image img{height:260px}
  .detail-hero-img img{height:260px}
  .blog-detail-img img{height:250px}
  .page-hero{padding:120px 0 40px}
  .back-to-top{bottom:20px;right:20px;width:42px;height:42px}
}
`;
}

function genMainJS(t) {
  return `/* ${t.id} ${t.name} — Main JS */
(function(){
  var header = document.querySelector('.site-header');
  if(header) window.addEventListener('scroll', function(){ header.classList.toggle('scrolled', window.scrollY > 60); });

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

  document.querySelectorAll('.booking-form, .contact-form').forEach(function(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var success = form.parentElement.querySelector('.form-success') || form.querySelector('.form-success');
      if(success){ success.style.display='block'; success.textContent='表單已成功送出！（此為展示用，不會實際送出資料）'; form.reset(); setTimeout(function(){ success.style.display='none'; },5000); }
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var target = document.querySelector(a.getAttribute('href'));
      if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth'}); }
    });
  });

  var btt = document.querySelector('.back-to-top');
  if(btt){
    window.addEventListener('scroll', function(){ btt.classList.toggle('visible', window.scrollY > 400); });
    btt.addEventListener('click', function(){ window.scrollTo({top:0,behavior:'smooth'}); });
  }

  // Scroll animation
  var observer = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting) e.target.classList.add('animate-in'); });
  },{threshold:0.1});
  document.querySelectorAll('.service-card,.portfolio-item,.review-card,.blog-card,.value-card,.team-card,.process-step,.faq-item').forEach(function(el){ observer.observe(el); });
})();
`;
}

function genTemplateJSON(t) {
  return JSON.stringify({
    id: `template-${t.num}`, slug: t.slug, name: t.name,
    description: `適合${t.industry}的${t.colorTheme}${t.theme === 'dark' ? '深色' : '淺色'}網站模板。`,
    industry: t.industry, industryCategory: t.industryCat,
    colorTheme: t.colorTheme, backgroundMode: t.theme,
    layoutType: t.layout, heroPattern: t.heroStyle + '-hero',
    navigationPattern: t.headerStyle + '-navigation',
    contentRhythm: t.nav.map(n => n).join(' > '),
    previewImage: 'assets/img/preview.jpg',
    zipFile: `../../downloads/template-${t.num}-${t.slug}.zip`,
    hasZip: false, promptFile: 'prompt.md',
    pageCount: 12, imageRich: true, status: 'candidate',
    isFeatured: true, isHidden: false,
    generatedBy: 'AI-assisted',
    imagePolicy: '圖片僅作為設計示意，正式交付前請替換為客戶自有或授權圖片。',
    pages: ['index.html','about.html','services.html','service-detail.html','portfolio.html','reviews.html','faq.html','booking.html','process.html','blog.html','blog-detail.html','contact.html']
  }, null, 2);
}

function genTagsJSON(t) {
  return JSON.stringify({
    id: `template-${t.num}`, name: t.name,
    industryCategory: t.industryCat,
    industry: [t.industry],
    colors: [t.colorTheme, t.theme === 'dark' ? '深色底' : '淺色底'],
    backgroundMode: t.theme,
    features: ['響應式設計', 'Bootstrap 5', '繁體中文', 'SEO 優化', 'Schema.org', 'FAQ', '表單假送出', '圖片豐富'],
    layout: [t.layout, t.heroStyle],
    pages: 12, hasZip: false, hasPrompt: true, hasPreview: true,
    imageRich: true, status: 'candidate'
  }, null, 2);
}

function genPromptMD(t) {
  const sections = [
    `# ${t.name} — ${t.industry}網站模板 Prompt`,
    `## 1. 專案概述\n建立一套${t.colorTheme}${t.theme === 'dark' ? '深色' : '淺色'}主題的${t.industry}網站模板。`,
    `## 2. 設計風格\n- 配色：${t.colorTheme}\n- 字型：${t.font} + Noto Sans TC\n- 版型：${t.layout}`,
    `## 3. 頁面結構\n12 個頁面：首頁、品牌故事、服務項目、服務詳情、作品集、評價、FAQ、預約、流程、部落格、文章詳情、聯絡`,
    `## 4. 首頁 Hero\n- 標題：${t.heroTitle.replace(/<[^>]+>/g,'')}\n- 副標：${t.heroSub}`,
    `## 5. 導航選單\n${t.nav.join(' / ')}`,
    `## 6. 服務項目\n${t.services.map(s => `- ${s.name}：${s.desc}`).join('\n')}`,
    `## 7. FAQ 內容\n${t.faqs.slice(0,4).map((f,i) => `Q${i+1}：${f.q}\nA：${f.a}`).join('\n\n')}`,
    `## 8. 客戶評價\n${t.reviews.map(r => `- 「${r.text}」— ${r.name}（${r.title}）`).join('\n')}`,
    `## 9. 部落格文章\n${t.blogs.map(b => `- ${b.title}：${b.summary}`).join('\n')}`,
    `## 10. 技術規格\n- Bootstrap 5.3.3 CDN\n- Bootstrap Icons 1.11.3 CDN\n- Google Fonts CDN\n- 純 HTML/CSS/JS\n- file:// 環境可瀏覽`,
    `## 11. RWD 規範\n三個斷點：992px / 768px / 576px`,
    `## 12. 圖片策略\n使用 Unsplash 圖片來源，共 ${t.imgs.length} 張`,
    `## 13. SEO 要求\n每頁包含 meta tags、OG tags、Schema.org JSON-LD`,
    `## 14. 互動效果\n漢堡選單、FAQ accordion、表單假送出、平滑捲動、回到頂部`,
    `## 15. 裝飾元素\n${t.decor} 裝飾風格`,
    `## 16. Footer 設計\n${t.footerCols} 欄位 Footer，含品牌資訊、聯絡方式、快速連結`,
    `## 17. 表單設計\n預約表單含姓名、電話、Email、日期、服務項目、備註欄位`,
    `## 18. 交付標準\n每套模板 20 個檔案，所有文字繁體中文，可直接在瀏覽器開啟`
  ];
  return sections.join('\n\n');
}

function genReadmeMD(t) {
  return `# ${t.name} — ${t.industry}網站模板

## 模板資訊
- **ID**: template-${t.num}
- **產業**: ${t.industry}
- **配色**: ${t.colorTheme} (${t.theme === 'dark' ? '深色' : '淺色'})
- **版型**: ${t.layout}
- **字型**: ${t.font} + Noto Sans TC

## 頁面列表（12 頁）
| 檔案 | 說明 |
|------|------|
| index.html | 首頁 |
| about.html | 品牌故事 |
| services.html | 服務項目 |
| service-detail.html | 服務詳情 |
| portfolio.html | 作品集 |
| reviews.html | 客戶評價 |
| faq.html | 常見問題 |
| booking.html | 預約表單 |
| process.html | 服務流程 |
| blog.html | 部落格 |
| blog-detail.html | 文章詳情 |
| contact.html | 聯絡我們 |

## 技術棧
- Bootstrap 5.3.3 (CDN)
- Bootstrap Icons 1.11.3 (CDN)
- Google Fonts (CDN)
- 純 HTML / CSS / JS
- 支援 file:// 環境瀏覽

## 使用方式
1. 直接在瀏覽器開啟 \`index.html\`
2. 所有資源使用 CDN，無需安裝
3. 圖片使用 Unsplash 線上圖片

## 檔案結構
\`\`\`
template-${t.num}-${t.slug}/
├── index.html
├── about.html
├── services.html
├── service-detail.html
├── portfolio.html
├── reviews.html
├── faq.html
├── booking.html
├── process.html
├── blog.html
├── blog-detail.html
├── contact.html
├── template.json
├── tags.json
├── prompt.md
├── README.md
└── assets/
    ├── css/
    │   ├── style.css
    │   └── responsive.css
    ├── js/
    │   └── main.js
    └── img/
        └── image-sources.md
\`\`\`

## 授權
圖片僅作為設計示意，正式使用前請替換為客戶授權圖片。
`;
}

function genImageSourcesMD(t) {
  return `# ${t.name} — 圖片來源

所有圖片來自 [Unsplash](https://unsplash.com)，僅作為設計示意。正式使用前請替換為客戶自有或授權圖片。

## 圖片列表

| # | Unsplash Photo ID | 用途 |
|---|---|---|
${t.imgs.map((img, i) => `| ${i + 1} | [${img}](https://unsplash.com/photos/${img.replace('photo-', '')}) | ${['Hero主視覺', '品牌故事', 'CTA背景', '服務項目', '服務項目', '作品集', '作品集', '作品集', '作品集', '關於頁', '關於頁', '團隊', '團隊', '團隊', '部落格', '部落格', '部落格', '部落格', '部落格', '部落格', '作品集', '作品集', '作品集', '作品集', '作品集'][i] || '其他'} |`).join('\n')}

## 使用說明

圖片 URL 格式：
\`\`\`
https://images.unsplash.com/{photo-id}?w={width}&q=80
\`\`\`

建議寬度：
- Hero: 1600px
- 內容圖片: 800px
- 縮圖: 400px
`;
}

module.exports = {
  genStyleCSS, genResponsiveCSS, genMainJS,
  genTemplateJSON, genTagsJSON, genPromptMD, genReadmeMD, genImageSourcesMD
};
