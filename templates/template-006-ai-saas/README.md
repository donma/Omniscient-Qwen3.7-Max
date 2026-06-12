# T006 AI SaaS — NeuralFlow AI 使用說明

## 模板簡介

T006 是一套深色科技風格的 AI SaaS 網站模板，以 **Bento Grid** 作為核心版型語言，適合 AI 產品、SaaS 平台與科技新創公司使用。

## 設計特色

- **深色科技漸層配色**：`#0f0f1a` 背景 + `#7c3aed` 科技紫 + `#06b6d4` 科技青
- **Bento Grid 佈局**：CSS Grid 實現不規則大小的資訊區塊
- **半透明毛玻璃 Header**：`backdrop-filter: blur` + 漸層底邊
- **漸層邊框卡片**：CSS mask 技巧實現 hover 漸層邊框效果
- **豐富動畫**：Scroll Reveal、Counter 數字動畫、光暈效果

## 檔案結構

```
template-006-ai-saas/
├── assets/
│   ├── css/
│   │   ├── style.css        # 主樣式表（748 行）
│   │   └── responsive.css   # RWD 響應式（126 行）
│   ├── js/
│   │   └── main.js          # 互動功能（148 行）
│   └── img/
│       └── image-sources.md # 圖片來源紀錄
├── index.html               # 首頁（Bento Grid Hero）
├── about.html               # 關於我們
├── services.html            # 產品功能
├── service-detail.html      # 方案詳情
├── portfolio.html           # 成功案例
├── reviews.html             # 客戶評價
├── faq.html                 # 常見問題
├── booking.html             # 預約 Demo
├── process.html             # 導入流程
├── blog.html                # 技術文章
├── blog-detail.html         # 文章詳情
├── contact.html             # 聯絡我們
├── template.json            # 模板 Metadata
├── tags.json                # 標籤分類
├── prompt.md                # 完整 Prompt 文件
└── README.md                # 本說明檔
```

## 技術依賴（CDN）

- Bootstrap 5.3.3
- Bootstrap Icons 1.11.3
- Google Fonts：Space Grotesk + Noto Sans TC + JetBrains Mono

## 使用方式

1. 直接以瀏覽器開啟 `index.html` 即可預覽
2. 所有頁面使用相同的 Header/Footer 結構
3. 圖片透過 Unsplash CDN 載入，無需額外下載

## 自訂指南

### 修改配色
編輯 `assets/css/style.css` 頂部的 CSS 變數：

```css
:root {
  --bg-primary: #0f0f1a;
  --purple: #7c3aed;
  --cyan: #06b6d4;
  --bg-card: #1e1e2e;
}
```

### 修改內容
直接編輯對應的 HTML 檔案即可。每頁都有完整的繁體中文內容。

### 新增頁面
複製任一 HTML 頁面作為模板，保留 Header/Footer 結構，替換中間內容區域。

## 瀏覽器相容性

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 授權

本模板為專案內部使用，圖片來源為 Unsplash（免費授權）。
