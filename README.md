# 全職設計視角 — 24 套輕量化網站樣板

## 專案說明
本專案包含 24 套獨立設計的輕量化靜態網站樣板，每套含 12 頁 HTML，共 288 個頁面。

## 技術棧
- HTML5 + CSS3 + JavaScript
- Bootstrap 5.3.3 CDN
- Bootstrap Icons 1.11.3 CDN
- Google Fonts CDN
- 純前端靜態，`file://` 可直接瀏覽

## 24 套模板清單

| # | ID | 名稱 | 產業 | 深/淺 | 版型 |
|---|------|------|------|-------|------|
| 1 | T001 | Luxury Bar | 酒吧 | 深色 | 大圖沉浸式 |
| 2 | T002 | Cyber Security | 資安 | 深色 | Dashboard |
| 3 | T003 | Fashion Boutique | 服飾 | 深色 | Masonry/Lookbook |
| 4 | T004 | Fitness Coach | 健身 | 深色 | Split Trust |
| 5 | T005 | Film Studio | 影視 | 深色 | Masonry/Cinematic |
| 6 | T006 | AI SaaS | SaaS | 深色 | Bento Grid |
| 7 | T007 | Jazz Club | 爵士 | 深色 | 影音氛圍 |
| 8 | T008 | Premium Car | 車商 | 深色 | Product Catalog |
| 9 | T009 | Night Spa | SPA | 深色 | Fullscreen Visual |
| 10 | T010 | Architecture Dark | 建築 | 深色 | Case Study |
| 11 | T011 | Music Festival | 音樂祭 | 深色 | Event/Countdown |
| 12 | T012 | Art Gallery | 藝廊 | 深色 | Left Rail Nav |
| 13 | T013 | Beauty Studio | 美容 | 淺色 | Split Layout |
| 14 | T014 | Family Clinic | 診所 | 淺色 | Split Trust |
| 15 | T015 | Brunch Cafe | 早午餐 | 淺色 | Magazine |
| 16 | T016 | Flower Wedding | 花藝 | 淺色 | Masonry/Waterfall |
| 17 | T017 | Organic Grocery | 有機 | 淺色 | Product Catalog |
| 18 | T018 | Language School | 語言 | 淺色 | Pricing-first |
| 19 | T019 | Home Decor | 居家 | 淺色 | Magazine |
| 20 | T020 | Pet Clinic | 寵物 | 淺色 | Split Trust |
| 21 | T021 | Local Farm | 農場 | 淺色 | Storytelling |
| 22 | T022 | Bookstore | 書店 | 淺色 | Knowledge Hub |
| 23 | T023 | Coworking Space | 共享空間 | 淺色 | Bento Grid |
| 24 | T024 | Community Festival | 社區 | 淺色 | Event/Festival |

## 資料夾結構
```
/
├── index.html              # 主展示站（畫廊）
├── template-detail.html    # 樣板詳情頁
├── assets/
│   ├── css/gallery.css
│   └── js/gallery.js, data.js
├── data/
│   ├── templates.json
│   ├── layout-assignment.json
│   └── quality-report.md
├── templates/
│   ├── template-001-luxury-bar/
│   │   ├── index.html ... (12 pages)
│   │   ├── assets/css/style.css, responsive.css
│   │   ├── assets/js/main.js
│   │   ├── template.json, tags.json, prompt.md, README.md
│   │   └── assets/img/image-sources.md
│   ├── template-002-cyber-security/
│   └── ... (24 total)
└── downloads/              # ZIP 打包區
```

## 如何使用
1. 開啟 `index.html` 瀏覽 24 套樣板
2. 點擊任一樣板可進入預覽
3. 每套樣板的 `prompt.md` 包含完整的 AI 生成規格

## 如何修改模板
1. 進入 `templates/template-{NNN}-{slug}/` 資料夾
2. 修改 HTML 中的品牌名稱、電話、地址等
3. 修改 `assets/css/style.css` 中的 CSS 變數調整配色
4. 替換 Unsplash 圖片 URL 為客戶自有圖片

## 生成資訊
- 前 8 套（T001, T002, T006, T007, T013, T014, T019, T020）：手工逐頁設計
- 後 16 套（T003-T024 剩餘）：腳本輔助生成，每套獨立配色/字型/佈局
- **Model: Qwen 3.7-Max**
- Date: 2026-06-12
- Operator: AI-assisted static template generation
