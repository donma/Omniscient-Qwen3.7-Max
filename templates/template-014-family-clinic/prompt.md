# Template-014 Family Clinic — 生成提示詞

## 設計方向
建立一個適合家庭診所與醫療機構的「白藍信任型」專業網站，整體風格乾淨、明亮、專業感強，以白色為底搭配信任藍 (#2563eb) 作為主色調。

## 核心規格
- **配色**: 白底 #ffffff + 信任藍 #2563eb + 淺藍 #0ea5e9 + 背景 #f0f7ff + 文字 #1e293b
- **字型**: Source Sans 3 + Noto Sans TC（繁體中文）
- **框架**: Bootstrap 5.3.3 CDN + Bootstrap Icons 1.11.3 CDN
- **Hero**: Split Trust — 左側文字+CTA，右側診所/醫師大圖，底部波浪分隔
- **Header**: 白底實色，左側藍色十字圖標+診所名稱，右側選單+電話+預約按鈕

## 頁面結構（12 頁）
1. **index.html** — 首頁：Split Trust Hero > 科別介紹 > 醫師團隊 > 設備環境 > 就醫須知 > 預約 CTA
2. **about.html** — 診所簡介：創立歷史、醫療理念、認證資質
3. **services.html** — 科別介紹：六科別卡片（家庭醫學/兒科/內科/牙科/皮膚科/婦科）
4. **service-detail.html** — 科別詳情：單一科別詳細說明
5. **portfolio.html** — 設備環境：醫療設備與環境照片
6. **reviews.html** — 病患評價：患者證言+滿意度數據
7. **faq.html** — 就醫 FAQ：手風琴式常見問題
8. **booking.html** — 線上預約：表單（科別/醫師/時段）
9. **process.html** — 就醫流程：四步驟流程圖
10. **blog.html** — 健康知識：衛教文章列表
11. **blog-detail.html** — 文章詳情
12. **contact.html** — 聯絡我們：地圖+交通+聯絡資訊

## 設計細節
- 卡片：白底+圓角 16px+藍色頂部 3px 線+柔和陰影+hover 浮起
- 科別卡片：十字醫療圖標+藍色 top border
- 醫師卡片：圓形頭像+姓名+專長+經歷
- CTA 按鈕：實心藍+白色文字 / 外框藍
- Footer：四欄+藍頂線
- 整體乾淨專業、信任感強

## 圖片需求
25+ 張 Unsplash 圖片，主題涵蓋醫療、診所、醫師、牙科、健康檢查等。
