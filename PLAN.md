# 全職設計視角 — 24 套模板手工施工計劃

## Context

使用者要求根據 `全職設計視角_24_套輕量化ai施工文件.md` 完整施工 24 套網站樣板（每套 12 頁 = 288 頁 HTML）。**使用者明確禁止使用腳本/generator 批次產生**，因為重複率會太高無法交付。每套模板必須手工設計、獨立打造，確保版型重複度 < 20%。

### 已完成檔案
- `index.html` — 主展示站（含篩選、搜尋、Grid/List 切換）
- `template-detail.html` — 樣板詳情頁
- `assets/css/gallery.css` — 展示站樣式
- `assets/js/gallery.js` — 展示站邏輯（含 tags 容錯、3 筆 fallback）
- `data/templates.json` — 24 筆模板 metadata

### 待建檔案
- `assets/js/data.js` — 從 templates.json 轉為 JS 常數
- `data/layout-assignment.json` — 24 套差異化矩陣
- 24 套模板資料夾（每套 12 頁 + CSS + JS + metadata）
- 根目錄 `README.md` + `final.report.md`

---

## 施工策略：逐套手工實作

### Task 0：前置準備
- 建立 `assets/js/data.js`（24 筆 TEMPLATES_DATA）
- 建立 `data/layout-assignment.json`（24 套差異化規劃）
- 建立 `downloads/.gitkeep`

### Task 1-4：Batch 1 — 4 套代表作
施工文件要求先做 4 套代表作確認品質基準：

| Task | 模板 | 類型 | 核心設計 |
|------|------|------|----------|
| T1 | T001 Luxury Bar | 深色/餐飲/大圖沉浸式 | 黑金低光源、Playfair Display、Art Deco |
| T2 | T006 AI SaaS | 深色/科技/Bento Grid | 紫青漸層、Space Grotesk、Bento 佈局 |
| T3 | T013 Beauty Studio | 淺色/美業/Split Layout | 奶茶色、左右分割、大圓角 |
| T4 | T019 Home Decor | 淺色/生活/Magazine | 暖白棕、Cormorant Garamond、雜誌節奏 |

每套包含：
- 12 個 HTML 頁面（手工撰寫，各有豐富內容）
- `assets/css/style.css`（獨立配色+字型+佈局）
- `assets/css/responsive.css`（RWD 三斷點）
- `assets/js/main.js`（漢堡選單+FAQ+表單假送出）
- `template.json` / `tags.json` / `prompt.md` / `README.md`
- `assets/img/image-sources.md`
- 25+ 張 Unsplash 圖片

### Task 5-8：Batch 2（T002, T007, T014, T020）
| Task | 模板 | 差異化重點 |
|------|------|-----------|
| T5 | T002 Cyber Security | Dashboard 數據面板、Rajdhani 字型、科技藍 |
| T6 | T007 Jazz Club | 居中 Logo 導航、影音背景、復古金色、Noto Serif TC |
| T7 | T014 Family Clinic | Split Trust 醫療版、白藍信任、Source Sans 3 |
| T8 | T020 Pet Clinic | Split Trust 寵物版、白綠溫暖、Nunito 字型、爪印裝飾 |

### Task 9-12：Batch 3（T003, T008, T015, T021）
| Task | 模板 | 差異化重點 |
|------|------|-----------|
| T9 | T003 Fashion Boutique | 極簡黑白灰、Bodoni Moda、Lookbook、極細線 |
| T10 | T008 Premium Car | Product Catalog、黑銀速度感、Rajdhani、橫向滑動卡片 |
| T11 | T015 Brunch Cafe | Magazine 雜誌感、奶油色、Playfair italic、不對稱排列 |
| T12 | T021 Local Farm | Storytelling 長卷軸、綠色大地、Libre Baskerville、全寬交替圖文 |

### Task 13-16：Batch 4（T004, T009, T016, T022）
| Task | 模板 | 差異化重點 |
|------|------|-----------|
| T13 | T004 Fitness Coach | Split Trust 運動版、深色高對比、Oswald、斜角裁切 |
| T14 | T009 Night Spa | Fullscreen Visual 沉浸、深綠黑、浮動側邊導航、Cormorant |
| T15 | T016 Flower Wedding | Masonry 瀑布流、米白浪漫、Cormorant italic、lightbox |
| T16 | T022 Bookstore | Knowledge Hub 知識中心、暖棕紙感、Libre Caslon Text、書封卡片 |

### Task 17-20：Batch 5（T005, T010, T017, T023）
| Task | 模板 | 差異化重點 |
|------|------|-----------|
| T17 | T005 Film Studio | 全螢幕覆蓋式漢堡選單、Masonry 不規則、Bebas Neue、電影寬銀幕 |
| T18 | T010 Architecture Dark | Case Study Index 案例索引、黑灰建築、Archivo、編號列表 |
| T19 | T017 Organic Grocery | Product Catalog 商品目錄、淺綠自然、Merriweather、產地標籤 |
| T20 | T023 Coworking Space | Bento Grid 白灰版、Space Grotesk、科技靛強調、幾何色塊 |

### Task 21-24：Batch 6（T011, T012, T018, T024）
| Task | 模板 | 差異化重點 |
|------|------|-----------|
| T21 | T011 Music Festival | 倒數計時器、黑紫霓虹、Anton、活動型 |
| T22 | T012 Art Gallery | 左側永久導覽列、深灰藝廊、DM Serif Display、極簡留白 |
| T23 | T018 Language School | Pricing-first 定價導向、藍黃活潑、Poppins、定價卡片 |
| T24 | T024 Community Festival | 繽紛手繪風、彩色選單項、Baloo 2、節慶色塊 |

### Task 25：收尾
- 同步 `data/templates.json` → `assets/js/data.js`
- 建立根目錄 `README.md`（含模型標註）
- 建立 `final.report.md`
- 建立 `data/quality-report.md`

---

## 差異化核心規則

### 每套獨立設計的維度（8 維差異化矩陣）
1. **Hero 結構** — 24 套各不相同
2. **Header/Navigation** — 7 種 pattern + 子變體（透明/毛玻璃/實色/漸層、滾動行為）
3. **Section 排列節奏** — 每套唯一
4. **卡片/區塊樣式** — 邊框/陰影/圓角/hover 效果各異
5. **圖片呈現** — 比例(1:1/3:4/16:9/21:9)、裁切、裝飾各異
6. **CTA 策略** — 位置/樣式/文案各異
7. **Footer 結構** — 2-4 欄各異
8. **內頁 Layout** — 隨版型語言一致但結構各異

### 同版型模板差異化對策（高風險）

**Split Trust × 3（T004 深色/高對比/斜角 vs T014 白藍/醫療/圓角 vs T020 白綠/寵物/爪印）**
**Magazine × 2（T015 奶油色/不對稱/手寫 vs T019 暖白/對稱/極細線）**
**Masonry × 2（T005 黑色/不規則/覆蓋選單 vs T016 米白/瀑布流/優雅選單）**
**Product Catalog × 2（T008 黑銀/橫向滑動 vs T017 淺綠/標籤雲）**
**Bento Grid × 2（T006 深色/漸層光暈 vs T023 白灰/浮起陰影）**
**Event × 2（T011 黑紫/霓虹倒數 vs T024 暖白/繽紛手繪）**

### 18 套 top-navigation-mobile-drawer 子變體
- Header 背景：透明/實色/毛玻璃/漸層
- 滾動行為：固定/縮小/隱藏再現/背景變化
- Logo 位置：左/中
- 選單項數量：5-8 項
- 是否包含 CTA 按鈕
- 漢堡選單動畫：經典三線/圓形展開/箭頭變形/滑入面板

---

## CSS 策略

### 每套獨立
- `:root` CSS 變數（配色/字型/間距）
- Hero 佈局、卡片樣式、按鈕樣式、Footer
- 動畫/過渡效果

### 可共用的極小基礎（~30 行 reset 寫入每套 style.css 頂部）
- Box-sizing reset、img max-width、container class
- RWD 斷點統一：576/768/992/1200/1400px

---

## 驗證方式

每完成 4 套（Batch）後驗收：
1. 12 頁 HTML 全部可開啟且有豐富內容
2. 子頁與首頁風格一致
3. RWD 三斷點正常（桌機/平板/手機）
4. 漢堡選單可操作、中文、文字可見
5. 圖片全部可顯示、無 403/404
6. metadata 檔案齊全（template.json/tags.json/prompt.md/README.md/image-sources.md）
7. 與前面已完成批次交叉比重複度

最終驗證：
- 開啟 `index.html` 看到 24 套樣板
- 篩選/搜尋/Grid-List 切換正常
- 每套可預覽、可看 Prompt、ZIP 顯示待打包
- `templates.json` 與 `data.js` 筆數一致（24 筆）
