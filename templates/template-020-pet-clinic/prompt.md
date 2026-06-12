# Pet Clinic — template-020 設計 Prompt

## 1. 專案概述
建立一個適合寵物醫院、動物診所與寵物照護中心的白綠溫暖專業網站模板。模板 ID：template-020，名稱：Pet Clinic，共 12 個 HTML 頁面。

## 2. 設計風格
- 類型：淺色底 Split Trust 專業信任型
- 氛圍：溫暖、親切、圓潤、信賴感
- 特色：爪印裝飾元素、綠色強調、圓角卡片、溫暖白綠配色
- 與 T014 醫療模板差異：T020 使用綠色+爪印+Nunito 圓體+溫暖感（vs T014 的藍紫色+嚴肅專業感）

## 3. 配色系統
- 主色（白底）：#ffffff
- 強調色（溫暖綠）：#16a34a
- 次要色（暖黃）：#f59e0b
- 背景色：#f0fdf4
- 文字色：#1e293b
- 緊急紅：#dc2626
- 漸層：primary → primary-dark (linear-gradient 135deg)

## 4. 字型設定
- 標題字型：Nunito（400/600/700/800）— 圓潤活潑
- 中文字型：Noto Sans TC（300/400/500/700）
- Google Fonts CDN：`https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Noto+Sans+TC:wght@300;400;500;700&display=swap`

## 5. 技術棧
- Bootstrap 5.3.3 CDN
- Bootstrap Icons 1.11.3 CDN
- Google Fonts CDN
- 純前端靜態 HTML/CSS/JS
- 不使用 React/Vue/npm
- 支援 file:// 環境瀏覽

## 6. Header 設計
- 白底固定頂部導航
- CSS 爪印 Logo（5 個圓形元素組成）
- 綠色強調色連結
- 右側電話號碼+預約按鈕
- 滾動時加陰影效果
- 桌機：完整導航選單
- 手機：漢堡選單按鈕

## 7. Navigation 模式
- 桌機：top-navigation（首頁/關於我們/服務項目/獸醫團隊/寵物知識/聯絡我們）
- 手機：right-drawer 右側滑入漢堡選單（額外含：常見問題/線上預約）
- 遮罩層 + 點擊關閉

## 8. Hero 區塊（Split Trust）
- 左側文字+右側寵物/獸醫溫馨圖片的 Split Layout
- 背景色 #f0fdf4
- 圓角圖片（20px radius）+ 陰影
- 標籤徽章+大標題+副標題+雙按鈕（實心綠+外框綠）
- 裝飾性圓形背景元素

## 9. 卡片系統
- 白底圓角 20px 卡片
- 綠色左 3px 線（card-pet）或綠色頂 3px 線（service-card）
- 陰影 + hover 浮起 6px
- 爪印浮水印裝飾（::after 🐾 emoji）
- 服務卡片含圓形爪印圖標區

## 10. 緊急區塊
- 紅底白字 24hr 急診橫幅
- ⚠ 圖標裝飾
- 緊急電話按鈕（白底紅字 hover）

## 11. CTA 區塊
- 綠色漸層背景
- 爪印裝飾（::before/::after）
- 白底綠字 CTA 按鈕
- hover 浮起+陰影

## 12. 12 頁結構
1. **index.html** — 首頁：Split Hero > 服務卡片 > 獸醫團隊 > 康復案例 > 緊急橫幅 > CTA
2. **about.html** — 關於：歷史+理念+設備認證+團隊照片
3. **services.html** — 服務：6 大服務項目+選擇原因
4. **service-detail.html** — 詳情：單一服務說明+流程+注意事項+側邊欄
5. **portfolio.html** — 環境：9 張環境設備照片 grid+設備介紹
6. **reviews.html** — 評價：滿意度數據+飼主證言+獸醫團隊
7. **faq.html** — FAQ：10 題 accordion
8. **booking.html** — 預約：表單（飼主/寵物/症狀/醫師/時段）+預約須知
9. **process.html** — 流程：初診→檢查→治療→回診四步驟
10. **blog.html** — 知識：6 篇照護文章列表
11. **blog-detail.html** — 文章：完整文章內容
12. **contact.html** — 聯絡：資訊卡片+地圖+交通+表單+緊急橫幅

## 13. Footer 設計
- 深色背景（#1e293b）三欄佈局
- 左欄：品牌介紹+地址+電話+email
- 中欄：快速導覽連結
- 右欄：服務時間+急診資訊
- 底部版權聲明

## 14. RWD 斷點
- 992px：桌機→平板（隱藏 desktop nav，顯示漢堡選單，Hero 改縱排）
- 768px：平板→手機（字型縮小，Footer 單欄）
- 576px：小手機（極簡佈局，按鈕全寬）

## 15. JS 互動功能
- 漢堡選單（右側滑入+遮罩）
- FAQ accordion
- 表單假送出 alert
- 平滑滾動
- 回到頂部按鈕
- Header 滾動加陰影
- Intersection Observer fade-in 動畫
- 活躍導航高亮

## 16. SEO 與 Schema
- 每頁完整 meta tags（title/description/canonical/og）
- VeterinaryCare JSON-LD Schema
- 繁體中文豐富內容

## 17. 圖片策略
- 使用 Unsplash 寵物/貓狗/獸醫主題圖片（25+ 張）
- 圖片僅為設計示意，正式交付前需替換為授權圖片
- 使用 w= 參數控制尺寸 + fit=crop

## 18. 檔案結構
```
template-020-pet-clinic/
├── assets/
│   ├── css/style.css (700+ 行)
│   ├── css/responsive.css
│   ├── js/main.js (80+ 行)
│   └── img/image-sources.md
├── index.html / about.html / services.html / ... (12 頁)
├── template.json / tags.json
├── prompt.md / README.md
```
