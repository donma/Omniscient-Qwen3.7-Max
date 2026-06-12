# T006 AI SaaS — 完整 Prompt 文件

## 1. 專案概述

建立一套名為 **NeuralFlow AI** 的 AI SaaS 科技產品網站模板。此模板採用深色科技漸層配色，以 Bento Grid 作為核心版型語言，展現現代 AI 產品的科技感與專業度。

## 2. 設計規格

- **產業定位**：AI SaaS 科技產品
- **配色方案**：
  - 背景色：`#0f0f1a`（深夜黑紫）
  - 科技紫：`#7c3aed`（主色調）
  - 科技青：`#06b6d4`（輔助色）
  - 卡片背景：`#1e1e2e`
  - 文字色：`#f1f5f9`（主文字）、`#94a3b8`（次要文字）
- **字型配置**：
  - 標題：Space Grotesk（700 weight）
  - 內文：Noto Sans TC（300/400/500/700）
  - 程式碼：JetBrains Mono
- **核心版型**：Bento Grid — 使用 CSS Grid 實現不規則大小的區塊排列
- **卡片設計**：圓角 16px + 漸層邊框（mask 技巧）+ hover 光暈效果

## 3. Header 設計

- 半透明毛玻璃效果（`backdrop-filter: blur(20px)`）
- 底部漸層邊線（紫→青）
- 左側 Logo（圖標 + 品牌名 + 副標題）
- 中間導覽選單（繁體中文）
- 右側 CTA 按鈕（漸層背景）
- 滾動時背景加深（`scrolled` class）
- 行動裝置：漢堡選單 + 右側滑入面板

## 4. Hero 首屏（Bento Grid）

使用 4 欄 Bento Grid 配置：
- **大區塊（2x2）**：主標題 + 副標題 + CTA 按鈕
- **數據卡片（2 個）**：模型準確率、企業客戶數
- **產品截圖**：展示 AI 儀表板介面
- **功能卡片（2 個）**：即時處理、企業級安全

## 5. Section 節奏

1. **Bento Hero** — 首屏展示
2. **功能 Grid** — 6 格 Bento 展示核心 AI 功能
3. **數據亮點** — 4 個數據指標（處理量、延遲、可用性、覆蓋）
4. **客戶 Logo** — 信任標誌
5. **定價方案** — 3 方案卡片（Starter/Professional/Enterprise）
6. **CTA** — 行動呼籲區

## 6. 頁面清單（12 頁）

| 頁面 | 檔案 | 說明 |
|------|------|------|
| 首頁 | index.html | Bento Grid 展示 AI 產品 |
| 關於我們 | about.html | 公司故事、願景、團隊 |
| 產品功能 | services.html | 6 大 AI 解決方案 |
| 方案詳情 | service-detail.html | NLP 方案深度介紹 |
| 成功案例 | portfolio.html | 6 個產業案例 |
| 客戶評價 | reviews.html | 6 則客戶評價 |
| 常見問題 | faq.html | 10 個技術 FAQ |
| 預約 Demo | booking.html | 預約表單 + 優勢說明 |
| 導入流程 | process.html | 6 步驟時間軸 |
| 技術文章 | blog.html | 6 篇技術文章 |
| 文章詳情 | blog-detail.html | Transformer 深度解析 |
| 聯絡我們 | contact.html | 聯絡表單 + 資訊卡 + 地圖 |

## 7. 繁體中文選單

首頁 / 產品功能 / 解決方案 / 定價方案 / 技術文件 / 聯絡我們

## 8. 互動功能

- 漢堡選單：滑入面板 + 遮罩層
- FAQ Accordion：點擊展開/收合
- 表單假送出：`data-form` 屬性 + Toast 通知
- 平滑滾動：錨點連結
- 回到頂部：固定按鈕 + 滾動顯示
- Scroll Reveal：IntersectionObserver 進場動畫
- Counter 動畫：數字從 0 到目標值

## 9. RWD 斷點

- 桌機：> 1024px（完整 3-4 欄 Grid）
- 平板：≤ 1024px（2 欄 Grid，隱藏桌面選單）
- 手機：≤ 768px（單欄 Grid）
- 小手機：≤ 480px（壓縮間距）

## 10. 技術依賴

- Bootstrap 5.3.3（Grid 系統 + 重置）
- Bootstrap Icons 1.11.3（圖標庫）
- Google Fonts：Space Grotesk + Noto Sans TC + JetBrains Mono
- 自訂 CSS + JavaScript（無 jQuery 依賴）

## 11. SEO 規格

- 每頁獨立 `<title>` 和 `meta description`
- Open Graph tags（og:title, og:description, og:image, og:type）
- Canonical URL
- Schema.org JSON-LD（Organization, FAQPage, BlogPosting）
- 語意化 HTML 結構
- 所有圖片含 `alt` 屬性

## 12. 圖片策略

使用 Unsplash CDN 圖片，搜尋方向：
- AI technology, dashboard UI
- Abstract gradient dark
- Data visualization
- Tech startup office
- Code programming
- Team meeting modern
- Abstract blue purple

## 13. 卡片設計規範

- 背景：`#1e1e2e`
- 圓角：16px
- 邊框：1px solid `rgba(255,255,255,0.06)`
- Hover 漸層邊框：使用 CSS mask 技巧
- Hover 光暈：`box-shadow: 0 0 40px rgba(124,58,237,0.15)`
- Hover 位移：`translateY(-4px)`

## 14. 漸層應用

- 主漸層：`linear-gradient(135deg, #7c3aed, #06b6d4)`
- 卡片背景：`linear-gradient(135deg, rgba(124,58,237,0.15), rgba(6,182,212,0.08))`
- 漸層文字：`-webkit-background-clip: text`
- 漸層邊框：CSS mask composite 技巧

## 15. 動畫效果

- `fadeInUp`：從下方淡入
- `float`：上下浮動
- `pulse-glow`：脈衝光暈
- Scroll Reveal：滾動觸發進場
- Counter：數字遞增動畫

## 16. Footer 設計

- 4 欄 Grid：品牌 + 3 個導覽欄
- 底部版權 + 社群圖標
- 背景色：`#131325`
- 頂部邊線分隔

## 17. 品牌識別

- 品牌名：NeuralFlow AI
- Logo 圖標：Bootstrap Icons 的 `bi-cpu`
- 副標題：AI Platform
- Slogan：用 AI 重新定義企業智慧營運

## 18. 與其他模板差異

- **唯一深色科技風格**：區別於其他 23 套模板
- **Bento Grid 核心語言**：不規則大小區塊，展現資訊密度
- **漸層邊框技巧**：CSS mask 實現 hover 漸層邊框
- **程式碼字型**：JetBrains Mono 用於程式碼區塊
- **科技感配色**：紫 + 青漸層，深色背景
