# Pet Clinic — template-020 使用說明

## 模板簡介
Pet Clinic 是一套專為寵物醫院、動物診所與寵物照護中心設計的白綠溫暖專業網站模板。採用 Split Trust 專業信任型佈局，搭配爪印裝飾元素與 Nunito 圓潤字體，營造溫暖親切的就醫氛圍。

## 技術規格
- **前端框架**：Bootstrap 5.3.3 (CDN)
- **圖標庫**：Bootstrap Icons 1.11.3 (CDN)
- **字型**：Nunito + Noto Sans TC (Google Fonts CDN)
- **類型**：純前端靜態網站，支援 file:// 環境瀏覽
- **RWD**：三斷點響應式 (992px / 768px / 576px)

## 頁面列表 (12 頁)
| 頁面 | 檔案 | 說明 |
|------|------|------|
| 首頁 | index.html | Split Hero + 服務 + 團隊 + 案例 + 急診 + CTA |
| 關於我們 | about.html | 歷史、理念、設備認證、團隊 |
| 服務項目 | services.html | 6 大服務項目說明 |
| 服務詳情 | service-detail.html | 單一服務詳細內容 |
| 環境設備 | portfolio.html | 醫院環境照片 Grid |
| 飼主評價 | reviews.html | 滿意度數據 + 飼主證言 + 團隊 |
| 常見問題 | faq.html | 10 題 FAQ Accordion |
| 線上預約 | booking.html | 預約表單 |
| 就醫流程 | process.html | 四步驟流程說明 |
| 寵物知識 | blog.html | 6 篇照護文章 |
| 文章詳情 | blog-detail.html | 完整文章內容 |
| 聯絡我們 | contact.html | 地圖 + 交通 + 表單 + 急診 |

## 檔案結構
```
template-020-pet-clinic/
├── assets/
│   ├── css/
│   │   ├── style.css          # 主樣式 (700+ 行)
│   │   └── responsive.css     # RWD 響應式樣式
│   ├── js/
│   │   └── main.js            # 互動功能 (80+ 行)
│   └── img/
│       └── image-sources.md   # Unsplash 圖片來源
├── index.html                 # 首頁
├── about.html                 # 關於我們
├── services.html              # 服務項目
├── service-detail.html        # 服務詳情
├── portfolio.html             # 環境設備
├── reviews.html               # 飼主評價
├── faq.html                   # 常見問題
├── booking.html               # 線上預約
├── process.html               # 就醫流程
├── blog.html                  # 寵物知識
├── blog-detail.html           # 文章詳情
├── contact.html               # 聯絡我們
├── template.json              # 模板元數據
├── tags.json                  # 標籤資料
├── prompt.md                  # 設計 Prompt (18 章)
└── README.md                  # 本檔案
```

## 快速開始
1. 直接以瀏覽器開啟 `index.html` 即可瀏覽（支援 file:// 協定）
2. 圖片使用 Unsplash CDN 連結，需要網路連線

## 客製化指南
- **修改配色**：編輯 `assets/css/style.css` 中 `:root` CSS 變數
- **修改內容**：直接編輯各 HTML 檔案中的文字內容
- **替換圖片**：替換 HTML 中的 Unsplash 圖片連結為自有圖片
- **修改 JS**：編輯 `assets/js/main.js` 中的互動功能

## 配色方案
| 用途 | 色碼 |
|------|------|
| 主色（白底） | #ffffff |
| 強調色（溫暖綠） | #16a34a |
| 次要色（暖黃） | #f59e0b |
| 背景色 | #f0fdf4 |
| 文字色 | #1e293b |
| 緊急紅 | #dc2626 |

## 注意事項
- 圖片僅作為設計示意，正式交付前請替換為客戶自有或授權圖片
- 表單功能為假送出（alert 提示），需接入後端服務才能實際運作
- 地圖區塊為佔位符，正式環境可嵌入 Google Maps iframe
