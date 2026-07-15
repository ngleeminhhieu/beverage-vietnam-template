# PAGES INVENTORY — Kiểm kê từng trang (duyệt thực tế bằng Chrome)

> Ghi lại **nội dung thật + khối hiển thị + component** của từng loại trang, để khi remake biết chính xác phải dựng lại cái gì.
> URL dưới đây dùng domain local mới `http://beverage-vietnam.local/` (xem [SETUP-LOG](SETUP-LOG.md); trước đây là `http://localhost/beverage-vietnam/`).
> Chi tiết engine: [HOME-AND-MODULES](HOME-AND-MODULES.md) · [ZOO-PRODUCTS](ZOO-PRODUCTS.md) · [TEMPLATE-SJTIME](TEMPLATE-SJTIME.md).

---

## Khung chung (mọi trang)

- **Header:** logo Rita (trái) · nav đỏ **HOME · ABOUT US · PRODUCTS · NEWS · CONTACT** · ô search (phải, nút xanh). Nav do YT mega-menu render; PRODUCTS có dropdown 12 danh mục.
- **Breadcrumb:** `Home / <Trang>` ngay dưới header (trang trong).
- **Footer (mọi trang):**
  - Khối **Get Newsletter** (ô email + nút Subscribe xanh) — module `mod_pwebcontact` 194 + text 195.
  - Heading lớn **RITA FOOD AND DRINK CO.,LTD** + 3 cột: 📞 `084 274 3784788` · ✉️ `marketing@rita.com.vn` · 📍 `No. 8, Thong Nhat Boulevard, Song Than 2 Industrial Park, Di An Ward, HCMC, Vietnam.`
  - Tagline **"Good health & Good taste."** + đoạn intro + social (Facebook, Twitter, LinkedIn, Pinterest, YouTube).
  - Thanh copyright: *"Copyright © 2026 Rita Food and Drink Co.,Ltd. All Rights Reserved Development by RITA Suppliers Beverage"*.
- Nút **Top** (back-to-top) cố định góc phải.

---

## 1. HOME — `/` (menu 101 → article 46 RỖNG; nội dung = module)

Cuộn từ trên xuống, các section:
1. **Hero Slider** (Smart Slider "Banner page home", mod 170): banner hội chợ (Vietfood&Beverage 06–08 AUG 2026 Hall A1 Booth Y22; Fine Food Australia MCEC Melbourne 31 AUG–03 SEPT 2026 Booth R37; matcha latte…). Có mũi tên trái/phải.
2. **01 — RITA Beverage** — "The leading in beverage manufacturing from Viet Nam" + ảnh dây chuyền nhà máy, hộp 06 boxes juice, ảnh công ty; đoạn intro OEM/ODM liệt kê dòng sản phẩm; heading lớn "RITA FOOD AND DRINK CO.,LTD" + SĐT.
3. **Dàn sản phẩm** "Fresh fruit juice from Viet Nam — recommendation" (ảnh line-up bird's nest, juice, coconut, basil seed…).
4. **Bộ đếm động** (đếm lên): **3** Production Lines · **98** Containers per month · **39** Countries we export (icon vàng).
5. **02 — Why choose us** — bullet lợi thế (fruit harvesting, R&D team, European design team, free sample & design label, promotion…) + ảnh nhà máy/văn phòng.
6. **03 — Watch our Videos** — "Rita Food and Drink Co.,Ltd are a leading name…" + video nhà máy (nút play).
7. **04 — Hot Products** — carousel 3 sản phẩm nổi bật (Café, Tropical Fruit, Energy Drink) + "We are proud to bring… highest quality and greatest taste."
8. **05 — Certificate** — carousel giấy chứng nhận SGS (HACCP, HALAL, FSSC 22000, GMP, ISO 22000…) + đoạn text ISO, KOSHER, HALAL, ORGANIC (USDA, EU), FSSC 22000, FDA, BSCI… "over 50 nations".
9. **06 — Logo hội chợ** — Africa's Big 7, Anuga, Gulfood, FHC China, CAEXPO, SIAL Middle East, THAIFEX, Vietfood & Beverage.
10. **07 — Get In Touch** — nền cây dừa, "Warmly welcome to visit us…" + form (Name, Email, Message, nút **SEND EMAIL**) — mod_pwebcontact 184.
11. Footer chung (như trên).

> **Nguồn:** hầu hết section 01–07 là **SP Page Builder** (module 174), xen kẽ Smart Slider. Khi remake có thể tái tạo tĩnh hoặc giữ mod_sppagebuilder.

---

## 2. ABOUT US — `/about-us` (com_content article 47)

- Banner "RITA IS THE PORTER OF NATURE" + ảnh lon/coconut water.
- **RITA FOOD AND DRINK CO.,LTD** + intro + danh sách dòng sản phẩm OEM/ODM (Fruit Juice, Energy Drink, Coconut Water, SoftDrink, Aloe Vera, Chia/Basil, Milk, Tea, Coffee — mỗi dòng liệt kê vị).
- **ADDRESS / PHONE / EMAIL** (No. 8 Thong Nhat Blvd, Song Than 2 IP, Di An, Binh Duong · 084 274 3784 788 · marketing@rita.com.vn).
- **History RITA BEVERAGE** — timeline: 2004 Open RITA → 2005 Supermarkets VN → 2006 Pet/Glass line → 2008 Expand exports (UK, Nepal) → 2010 Round the world → 2013 PP bottle → 2015 Prize SIAL Shanghai → 2016 New factory → 2018 Aseptic → 2019 PP Cup + mở rộng 50,000 m².
- **CERTIFICATE** (ISO, FDA, HALAL, ORGANIC, KOSHER, HACCP) + đoạn mô tả.
- **CATEGORY PRODUCTS** — grid các dòng (Tropical Fruit Juice, Chia & Basil, Coconut Water, Milk Series, Coffee, Energy, Aloe Vera, Softdrink) + "View More".
- **Team Building** block.
- Nội dung là 1 article com_content dài (SP Page Builder module 182 "Page about" ở `bannermain`).

---

## 3. PRODUCTS (frontpage) — `/products` (com_zoo view=frontpage, menu 121)

- Tiêu đề **CATEGORIES**.
- Lưới **12 danh mục** (4 cột), mỗi card = ảnh + tên overlay: Tea-Honey and Fruit · Aloe Vera Juice · Carbonated Drinks · Coconut Products · Coffee Drinks Series · Chia and Basil seed · Energy Drinks Series · Fruit Juice · (… 4 danh mục còn lại).
- Render bởi `frontpage.php` của template ZOO `default`.

---

## 4. DANH MỤC SP — `/products/<slug>` (com_zoo view=category)

Ví dụ `/products/coconut-products` ("Coconut Products"):
- Tiêu đề danh mục + phụ đề (vd "RITA'S COCONUT WATER").
- **Lưới sản phẩm** (4 cột): mỗi card = ảnh lon/chai + **tên sản phẩm** bên dưới (vd "Coconut water with Matcha Flavor 325ml sleek can", "Natural Coconut Water Pistachio Drink 500ml", "Rita Natural Coconut Water 2L PP Bottle"…). Không hiện giá.
- Render `category.php` → mỗi item `teaser.php`. (Badge Hot/New/Sale & volume có định nghĩa nhưng teaser chưa xuất — xem [ZOO-PRODUCTS](ZOO-PRODUCTS.md).)

---

## 5. CHI TIẾT SP — `/products/<slug>/<item>` (com_zoo view=item) ⭐

Ví dụ "Coconut Water With Matcha Flavor 325ml Sleek Can":
- **Cột trái:** ảnh sản phẩm lớn (600×600, lightbox) → ngay dưới là **nút "Ask price"** (hồng) → nút social (X/Post).
- **Cột phải:** tên sản phẩm (h1) + **bảng thông số** (label : value):
  Sample: Free Sample - Free Design · Volume: 325 ml · Packaging: Aluminum Can · Shelf life: 24 months · Payment: L/C,T/T · **FOB price: Live chat or call us** · Delivery time: 20-25 day after Order · Minimum order quantity: 200 Carton/Oder · Port: Cat Lai Port, Ho Chi Minh City, Vietnam. · Supply ability: 600 Twenty-Foot Container/Month.
- **Dưới cùng:** bài **SEO dài** (field Description) — heading + đoạn văn + ảnh marketing (vd "The Rising Trend of Matcha Coconut Water in Global Beverage Markets…"). Sau đó tags + related ("YOU MAY ALSO LIKE").
- ⭐ **"Ask price"** = popup form `mod_pwebcontact` (module 122) → gửi inquiry về `marketing@rita.com.vn`. KHÔNG hiện giá (mô hình B2B). Chi tiết: [ZOO-PRODUCTS](ZOO-PRODUCTS.md).

---

## 6. NEWS (list) — `/news` (com_content blog, category id 8, menu 220)

- Banner xanh "Natural from Vietnam and Pure".
- **Danh sách bài:** mỗi bài = thumbnail (trái) + tiêu đề + `Published: <ngày>` + `Last Updated: <ngày>` + lượt xem + **rating sao**, kèm đoạn tóm tắt. Rồi 1 loạt tiêu đề (không thumbnail).
- **Phân trang:** "Page 1 of 27" (1…10, End) → ~27 trang tin.
- Bài mẫu: "Rita Food & Drink Organizes Comprehensive Firefighting Training Course…", "Aloe Vera Drink with Chia Seed Grape Flavor PET Bottle Market Insights…", "Coconut Milk Coffee Drink Trends…".

---

## 7. NEWS (detail) — `/news/<article>` (com_content article)

- Banner xanh (như list).
- Tiêu đề bài + dòng meta: 👤 author (Marketing) · 📅 Published · 📅 Last Updated · Hits.
- **Rating:** "Please Rate [Vote 5 ▾] [Rate]".
- Thân bài + **tags** (chip xanh) cuối bài.

---

## 8. CONTACT — `/contact` (com_content article 51, menu 217)

- Tiêu đề **"Send Us Your Feedback"** + "Contact with us".
- **Form:** Name · Email · Subject · Message · nút **SUBMIT** (xanh). (Trang cũng có module "Maps Rita" + "Page Contact" SP Page Builder — bản đồ Google.)
- Footer chung (Newsletter + info công ty).

---

## 9. TAGS — `/tags` (com_tags, menu 222)

Trang liệt kê tag (chưa chụp chi tiết; là view com_tags mặc định).

---

## Bảng tổng: trang → component → khi remake cần

| Trang | Component | Khối cần dựng lại |
|-------|-----------|-------------------|
| Home | com_content(rỗng)+modules | slider hero + 7 section (SPPB) + footer |
| About | com_content 47 (+SPPB 182) | article dài (intro/history/cert/category/team) |
| Products (frontpage) | com_zoo frontpage | lưới 12 category card |
| Category | com_zoo category | lưới product card (ảnh+tên) |
| **Product detail** | com_zoo item | ảnh + **Ask price** + bảng thông số + SEO desc + related |
| News list | com_content blog cat 8 | list card (thumb+title+meta+rating) + pagination |
| News detail | com_content article | title+meta+rating+body+tags |
| Contact | com_content 51 (+SPPB) | form + map |
| Tags | com_tags | tag list |
