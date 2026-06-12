# CyberShield Cyber Security — 18 章節 Prompt 描述

## 1. 專案概述
本模板為資安公司（Cyber Security）設計的深色底 Dashboard / Data 信任型網站，適合資安公司、IT 顧問與科技企業使用。以深藍黑科技網格為配色主題，強調數據面板與威脅指標視覺化。

## 2. 基本資訊
- **ID**: template-002
- **名稱**: Cyber Security（CyberShield 盾禦科技）
- **類型**: 深色底 Dashboard / Data 信任型
- **頁面數**: 12 個 HTML 頁面
- **技術棧**: Bootstrap 5.3.3 CDN + Bootstrap Icons 1.11.3 CDN + Google Fonts CDN
- **環境**: 純前端靜態，file:// 可直接瀏覽

## 3. 配色系統
- **主色**: #0a1628（深藍黑）
- **強調色**: #00d4ff（科技藍）
- **次要色**: #7c3aed（紫色）
- **文字色**: #e2e8f0（淺灰白）
- **次要文字**: #94a3b8
- **靜音文字**: #64748b
- **成功色**: #22c55e
- **危險色**: #ef4444
- **警告色**: #f59e0b

## 4. 字型規範
- **標題字型**: Rajdhani（Google Fonts，400/500/600/700）
- **內文字型**: Noto Sans TC（Google Fonts，300/400/500/700）
- **字型載入**: 透過 Google Fonts CDN

## 5. Header 設計
- **樣式**: solid-dark-with-accent-border — 深色實底 + 底部 3px 科技藍邊線
- **固定定位**: 固定在頁面頂部
- **滾動效果**: 滾動後加入 backdrop-filter blur 效果
- **Logo**: 盾牌圖標 + CYBERSHIELD + 副標題「盾禦科技」
- **桌機導覽**: 首頁 / 關於我們 / 解決方案(mega menu 下拉) / 案例研究 / 資安新知 / 聯絡我們
- **Mega Menu**: 桌機版 hover 展開，包含 6 項解決方案（圖標 + 標題 + 描述）
- **CTA 按鈕**: 「預約諮詢」實心科技藍按鈕

## 6. Navigation 設計
- **桌機版**: top-navigation-mega-menu — 水平導覽列 + 解決方案 mega menu 下拉
- **手機版**: 漢堡選單 + 右側滑入面板 + 遮罩
- **手機版額外項目**: 常見問題 / 預約諮詢

## 7. Hero 區域
- **樣式**: dashboard-trust-hero — 左側文字區 + 右側儀表板視覺化
- **背景**: 網格線 pattern（CSS linear-gradient 模擬）
- **左側**: 大標題（強調色+次要色）+ 描述文字 + 雙按鈕（實心藍+外框紫）
- **右側**: CSS 繪製的簡易儀表板（圓形進度條、數字指標卡片、狀態指示燈）
- **裝飾**: 右上科技藍光暈

## 8. 頁面佈局
1. **index.html** — Hero > 威脅統計(4 數字+進度條) > 六大解決方案卡片(含狀態條) > 案例研究(2 列) > 合作夥伴 Logo > CTA
2. **about.html** — Page Header > 公司歷史時間線 > 核心團隊(4 人卡片) > 核心價值(3 項) > 認證資質
3. **services.html** — Page Header > 六大解決方案詳細卡片(含狀態條) > CTA
4. **service-detail.html** — Page Header > 服務說明+特色列表 > 方法論(3 卡片) > 成果指標(3 數字) > CTA
5. **portfolio.html** — Page Header > 6 個案例卡片(含圖片+metrics 數據) > CTA
6. **reviews.html** — Page Header > 滿意度數據(4 大數字) > 6 張客戶證言卡片 > CTA
7. **faq.html** — Page Header > 9 個 FAQ accordion > CTA
8. **booking.html** — Page Header > 諮詢表單(公司/聯絡人/需求/預算) + 流程說明 > Footer
9. **process.html** — Page Header > 5 步驟流程(時間線) > 品質保證(3 項) > CTA
10. **blog.html** — Page Header > 6 篇文章卡片(圖片+meta+摘要) > Footer
11. **blog-detail.html** — Article header + cover + 完整文章內容 > Footer
12. **contact.html** — Page Header > 聯絡表單+聯絡資訊+地圖佔位 > 全球辦事處(3 個) > Footer

## 9. 卡片設計規範
- **背景**: 深藍底 (bg-card rgba)
- **邊框**: 左側 3px 科技藍邊線（偶數卡片用紫色）
- **Hover**: 向上浮起 6px + 光暈陰影
- **裝飾**: 漸層光暈背景（hover 顯示）

## 10. 統計數字設計
- **大數字**: Rajdhani 字型，3rem，含後綴（+/% /min）
- **動畫**: 從 0 滾動到目標值（Intersection Observer + requestAnimationFrame）
- **底部進度條**: 漸層填充（科技藍→紫色），進入視窗時動畫

## 11. CTA 按鈕設計
- **主按鈕**: 實心科技藍底 + 深色文字 + hover 光暈
- **次按鈕**: 透明底 + 紫色外框 + hover 填滿紫色
- **圖標**: Bootstrap Icons

## 12. Footer 設計
- **四欄佈局**: 品牌介紹+社群 / 解決方案 / 關於我們 / 支援服務
- **合規認證標誌區**: ISO 27001 / SOC 2 / PCI DSS / GDPR / NIST CSF
- **底部**: 版權聲明

## 13. SEO 結構
- 每個 HTML 都有: title, meta description, canonical, OG tags
- Schema.org: Organization（所有頁面）/ Service（service-detail）/ Article（blog-detail）
- lang="zh-Hant"

## 14. RWD 斷點
- 992px: 隱藏桌機導覽、顯示漢堡選單、grid 欄數調整
- 768px: 單欄佈局、按鈕全寬、字型縮小
- 576px: 極簡佈局、padding 縮減

## 15. JavaScript 功能
- 漢堡選單（右側滑入+遮罩+body overflow 鎖定）
- Mega menu（桌機 hover 展開）
- FAQ accordion（展開/收合動畫）
- 表單假送出（data-form-fake → alert）
- 平滑滾動（anchor links）
- 回到頂部按鈕
- 數字滾動動畫（Intersection Observer + ease-out cubic）
- 進度條填充動畫

## 16. 圖片策略
- 來源: Unsplash（科技/數據/伺服器/安全相關主題）
- 每張圖片都不重複
- 25+ 張圖片涵蓋各頁面

## 17. 配色與情感
- 深藍黑科技網格營造高科技、專業、可信的氛圍
- 科技藍強調數據與創新
- 紫色作為次要色彩增加層次感
- 網格背景 pattern 增添數位感

## 18. 使用注意事項
- 所有圖片僅作為設計示意，正式交付前請替換為客戶自有或授權圖片
- 表單為假送出（alert 提示），實際使用需串接後端 API
- file:// 環境可直接瀏覽，無需 server
- 使用 CDN 載入 Bootstrap 與字型，需要網路連線
