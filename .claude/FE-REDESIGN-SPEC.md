# FE-REDESIGN-SPEC — Spec dựng TEMPLATE TĨNH RITA (Phase 1)

> **Phạm vi (QUAN TRỌNG):** file này chỉ phục vụ **PHASE 1 — dựng frontend TĨNH thuần HTML/CSS/JS**, nằm **độc lập trong thư mục `frontend/`**, **CHƯA đụng Joomla**. Mục tiêu: tái hiện đúng thiết kế Figma dưới dạng các trang `.html` xem/preview được ngay.
> **Phase 2 (để sau, không làm bây giờ):** adapt bộ static này thành `templates/rita_new/` + nối dữ liệu ZOO/com_content trong Joomla.
> Bóc từ 9 file trong `.claude/FIGMA-PDFs/` (thiết kế desktop Figma, khung rộng **1512px**).
> **Trạng thái:** ✅ Đã phân tích + kiểm chứng bố cục cả 9 trang (đọc ảnh 2 lượt). Sẵn sàng dựng static.

**Nguồn (9 artboard):** Home · About us · Product · Product category · Product detail · Detail (bài viết) · Blog · Certificates & awards · Contact.

---

## 0. GLOBAL — Dùng chung mọi trang

### 0.1 Header (thanh điều hướng) — nền trắng, dính top
- **Logo:** "Rita" (wordmark chữ đỏ, script) + tagline *"Good Taste - Good Health"*.
- **Menu:** `HOME` · `ABOUT US` · `PRODUCTS ▾` (dropdown) · `BLOG` · `CONTACT`.
- **Phải:** icon **Search** (kính lúp) + nút **CATALOGUE** (pill đỏ, icon tải xuống trong vòng tròn).
- ⚠️ *Lưu ý:* trong file Figma, mục **ABOUT US luôn hiển thị active (đỏ)** ở MỌI trang → gần như chắc chắn là "artifact" của bản thiết kế. Khi code: **active theo trang hiện tại**.

### 0.2 Footer (2 phần)
- **Phần trên (nền trắng, 4 cột):**
  - **Cột 1:** Logo Rita + đoạn: *"We bring you the fresh, healthy, nutritional juice drink by applying creativity and innovation to natures bounty, since we are in the tropical region of Vietnam."* + social: **TikTok · Facebook · YouTube · LinkedIn · Zalo**.
  - **Cột 2 — HEADQUARTER ADDRESS:** No. 08, Thong Nhat Boulevard, Song Than 2 Industrial Park, Di An Ward, Ho Chi Minh City, Vietnam · **TAX CODE:** 3700574950 · **FAX:** (+84) 274 3784 799
  - **Cột 3 — SALES INQUIRY:** (+84) 274 3784 788 · **OFFICE:** (+84) 274 3784 688 · **EMAIL:** marketing@rita.com.vn
  - **Cột 4 — QUICK LINKS:** About Us / Products / Blog / Contact
- **Thanh dưới (nền đỏ):** "© All Rights Reserved 2026. RITA BEVERAGE COMPANY" (trái) · "Privacy Policy" (+ "Terms of Service" ở trang Home) (phải).
- **Nút nổi cố định (góc phải màn hình, mọi trang):** gọi điện (tròn đỏ) · Messenger (tròn đỏ) · scroll-to-top (tròn trắng viền đỏ).

### 0.3 Design tokens — 🎨 BẢNG MÀU CHÍNH THỨC (chốt từ Figma)
| Biến | HEX | Dùng cho |
|------|-----|----------|
| `--red` (primary) | **#D92B2B** | Heading, nút, active, viền nổi bật, thanh footer, pin map |
| `--text` (đen) | **#333333** | Chữ heading / body chính |
| `--subtext` (xám) | **#5B5B5B** | Mô tả phụ, caption, placeholder |
| `--blue-soft` (xanh dương nhẹ) | **#F3F4FD** | Nền section (Categories, stats, Lead Form, card CEO...) |
| `--green` (xanh lá) | **#547F26** | Badge OEM, dấu "%" ở stat, Việt Nam trên map |
| `--white` | #FFFFFF | Nền chính, card, input |
| `--border` | **rgba(51,51,51,.2)** = `#333333` @20% (hex `#33333333`) | Viền card / input |

**Quy ước khác:**
- **Nút:** dạng **pill** (bo tròn hết). Primary: đỏ `#D92B2B` chữ trắng + icon tròn. Secondary: viền đỏ chữ đỏ nền trắng. Text-link ("SEE MORE"/"VIEW PRODUCT"): gạch chân.
- **Card:** trắng, viền `rgba(51,51,51,.2)` bo 8–12px; state nổi bật = viền đỏ + badge.
- **Typography (chốt):**
  - **Heading / title:** `gg sans Flex` — đậm, thường IN HOA, giãn chữ.
  - **Body / paragraph:** `Montserrat` — cho mô tả, table, form, footer.
  - CSS: `--font-heading: "gg sans Flex", sans-serif;` · `--font-body: "Montserrat", sans-serif;`
  - ⚠️ `Montserrat` có trên Google Fonts (dễ nhúng). `gg sans Flex` **không** có → cần bạn gửi **file font** (`.woff2`/`.ttf`) để self-host; chưa có thì dùng tạm font gần giống.
- **Pagination:** nút tròn; trang hiện tại đỏ đặc chữ trắng, còn lại trắng viền đỏ.

### 0.4 Thư viện component tái sử dụng (build 1 lần, dùng nhiều nơi)
1. **Header** (0.1) · **Footer** (0.2) · **Nút nổi** (0.2).
2. **Page Banner** — banner full-bleed ~600px, ảnh phủ overlay tối, tiêu đề trắng IN HOA + **breadcrumb** (🏠 › ...). Dùng ở: About, Product, Category, Blog, Certificates, Contact.
3. **Section Heading** — tiêu đề đỏ IN HOA + mô tả xám (căn giữa hoặc trái).
4. **Product Card** — ảnh lon nền trắng + tên IN HOA; badge góc (OEM xanh); state hover = viền đỏ + tên đỏ.
5. **Blog/News Card** — ảnh trên + tiêu đề IN HOA (cắt ~2 dòng "…"); card đầu tiên tiêu đề đỏ.
6. **Pagination** — nút tròn `1 2 3 4 … 22`.
7. **Lead Form "LET'S BUILD YOUR BEVERAGE WITH US"** — xuất hiện ở **6 trang** (Home, Product, Category, Product detail, Certificates, Contact) → build **1 lần, dùng lại**. Chi tiết ở [§ Lead Form](#lead-form-dùng-chung).
8. **"WHY CHOOSE US"** (6 ô: Free sample, OEM & ODM, Small MOQ, Free label design, Stable quality, Fast delivery) — Home (nền lavender) + About (nền trắng).
9. **"INTERNATIONAL EXHIBITIONS"** = 2 phần: **(a)** dải logo `[full-bleed]` **chạy loop vô tận** (infinite marquee, tự cuộn, **hover → dừng**, logo cắt 2 mép); **(b)** bên dưới **1 ảnh world map `[contained]` + nhiều pin đỏ** (US, EU, Trung Đông, VN highlight xanh, Úc). — Home + Certificates.
10. **Certificate badges** (USDA Organic, Halal, GMP, HACCP, ISO 22000, BRCGS, FSSC 22000) — Home, About, Certificates.
11. **Gallery + Lightbox (hover-zoom)** — ảnh gallery/chứng chỉ: bình thường hiện ảnh; **hover → lớp phủ đen mờ + icon zoom**; click → **mở lightbox**. Dùng ở: Certificates (gallery booth + grid chứng chỉ), Home (Certificates grid), About (Certificates + "Our Activities").

<a name="lead-form-dùng-chung"></a>
#### Lead Form dùng chung — "LET'S BUILD YOUR BEVERAGE WITH US"
- `[bg-full]` nền lavender `#F3F4FD`, nội dung contained. Heading đỏ IN HOA.
- **Trường (đều bắt buộc *):** Full name · Email · Phone /WhatsApp · Product Interest *(dropdown)* · Country *(dropdown)* · Service Request *(radio: OEM / ODM / Private Label (Your Brand))* · Message *(textarea)*.
- **Bố cục field:** hàng 1 = 3 cột (name/email/phone) · hàng 2 = 2 cột (product/country) · hàng radio · textarea full · nút **SUBMIT** (pill đỏ + icon mũi tên).
- Placeholder: "Enter your full name / email / phone", "Select your product / country", "Tell us more about your idea or needs".

---

## 📐 Chú thích cột "W" (bề rộng) trong §1–§9
- **`full-bleed`** — nội dung **tràn sát mép trình duyệt** (banner, slider có card cắt ở mép, dải marquee, khối award nền màu).
- **`contained`** — nội dung **bó trong container** (~1280–1320px, căn giữa).
- **`bg-full`** — **nền màu** (thường lavender `#F3F4FD`) trải hết chiều ngang, **nội dung bên trong vẫn contained**.

> ⚠️ **Cùng tên "OUR CATEGORIES" nhưng KHÁC nhau:** Home = **slider full-bleed** (card cắt mép); Products = **grid 4 item/hàng contained**. → 2 component tách riêng.
> 📌 Header = `bg-full` (thanh trắng full, nội dung contained). Footer = `bg-full` (4 cột contained) + thanh copyright đỏ `full-bleed`.

---

## 1. HOME  `Home.pdf`
**Tổng quan:** Landing dài, product-photography, đỏ-trên-trắng. Hero → New Releases → Our Categories → Video → Intro → Bento số liệu → Why Choose Us → Exhibitions → Certificates → Blog → Lead Form.

| # | Section | W | Bố cục + nội dung |
|---|---------|---|-------------------|
| S1 | Header | bg-full | (global) |
| S2 | **Hero Slider** | ~full (lề 10px) | Slider ảnh **gần tràn viền — cách mép trái/phải đúng 10px (kẻ/lề trắng 2 bên), KHÔNG sát mép hẳn** (lon Orange Cream Prebiotic Soda trên đá); 3 dots dưới. |
| S3 | **New Releases** | contained | Heading `NEW RELEASES` + *"Explore our latest beverage innovations..."*; **grid 4 cột × 2 hàng (8 sp)**; card 1 badge OEM + viền đỏ; `SEE MORE` giữa. |
| S4 | **Our Categories** | **bg-full + slider full-bleed** | Nền lavender trải full; heading `OUR CATEGORIES` (contained); **slider ngang card ảnh dọc, CẮT cả 2 mép, TỰ TRƯỢT loop vô tận (auto-slide), HOVER → dừng để xem** (**nhiều hơn 6 card**; hiển thị 1 lúc ~6: Kombucha, Energy Ginseng, Iced coffee, Horchata, Beer...); chevron ⌄ dưới. ⚠️ KHÁC Products (kia là grid tĩnh 4/hàng). |
| S5 | **Factory Video** | contained | Video drone nhà máy, **bo góc + có lề** (nút play/pause). |
| S6 | **Company Intro** | contained | 2 đoạn (*"Located in the tropical heart of Vietnam..."* + *"We provide comprehensive OEM, ODM, Private Label..."*) + nút `OUR STORY`, `CONTACT US`; căn giữa. |
| S7 | **Global Beverage Powerhouse** | contained | **Bento mosaic**: 50+ Production lines · 1200+ Containers/month · 200+ Countries; ô CTA đỏ `CONTACT US`; ảnh dây chuyền/container/kệ siêu thị + hàng cert. |
| S8 | **Why Choose Us** | bg-full | Nền lavender; **grid 3 cột × 2 hàng (6 ô)**: Free sample · OEM & ODM · Small MOQ · Free label design · Stable quality · Fast delivery. |
| S9 | **International Exhibitions** | logo: full-bleed · map: contained | **(a)** dải logo **chạy loop vô tận (marquee), hover → dừng** — full-bleed (logo cắt cả 2 mép); **(b)** dưới: **1 ảnh world map + nhiều pin đỏ** (contained, có lề 2 bên). → Component #9. |
| S10 | **Certificates** | contained | **Grid 4 cột** ảnh chứng chỉ SGS (HACCP, ISO 22000, FSSC 22000, GMP); **hover ảnh → lightbox** (#11); `SEE MORE`. |
| S11 | **Blog** | contained | Header **2-cột** (title `BLOG` trái / mô tả phải); **grid 3 card** bài mới; `SEE MORE` giữa. |
| S12 | **Lead Form** | bg-full | (dùng chung) nền lavender. |
| — | Footer | bg-full | (global) + thanh đỏ full-bleed. |

## 2. ABOUT US  `About us.pdf`
**Tổng quan:** CEO → sứ mệnh → timeline mốc son → why choose us → quy trình sản xuất → chứng nhận → gallery hoạt động.

| # | Section | W | Bố cục + nội dung |
|---|---------|---|-------------------|
| S1 | Header | bg-full | (global) |
| S2 | **Page Banner** | full-bleed | Ảnh drone nhà máy (mái solar); title `ABOUT US` + breadcrumb. |
| S3 | **CEO Message** | contained | **2-cột**: ảnh CEO trái / card lavender phải (**MR LIN HONG WEI** — *CEO OF RITA BEVERAGE* + 2 đoạn quote). |
| S4 | **Mission / CTA** | contained | `THE LEADING IN BEVERAGE MANUFACTURING` + *"FROM VIET NAM, OFFERING TROPICAL BEVERAGES AND PRIVATE LABEL, OEM."*; nút `OUR PRODUCTS →`, `CONTACT US`; căn giữa. |
| S5 | **Factory Photo** | full-bleed | Ảnh nhà máy full-bleed (dải chuyển tiếp, không chữ). |
| S6 | **Our Key Milestones** | **bg-full + slider** | Nền lavender; **timeline ngang (dot đỏ) dạng slider/carousel**, card năm cắt mép phải: 2004 Open Rita · 2005 Supermarkets · 2006 More products · 2008 Scale up · 2010… |
| S7 | **Why Choose Us** | contained | **Grid 3 cột × 2 hàng (6 ô)** (giống Home, **nền trắng**) + phụ đề *"The Leading Premium Beverage Manufacturer and Supplier Vietnam"*. |
| S8 | **Production Process** | full-bleed | **Ảnh lớn full-bleed** + card bước "**01 RAW MATERIAL INSPECTION**" overlay + **stepper dot ngang** (nhiều bước). |
| S9 | **Certificates** | contained | **Hàng 6 badge** (HACCP, ISO/ISO 22000, Halal, USDA Organic, GMP, BRC) + FSSC 22000 dưới. |
| S10 | **Our Activities** | contained | **Gallery masonry 3 cột** (team building 2025, CSR, China trip 北京, thu hoạch dừa...); **hover → lightbox** (#11). |
| — | Footer | bg-full | (global) |

## 3. PRODUCT (trang sản phẩm)  `Product.pdf`
**Tổng quan:** Banner → Our Categories (grid 8) → New Releases (grid 12) → Lead Form.

| # | Section | W | Bố cục + nội dung |
|---|---------|---|-------------------|
| S1 | **Page Banner** | full-bleed | Title `PRODUCTS` + breadcrumb; nền ảnh lon nghiêng (xanh rêu ~#0B4F3A). |
| S2 | **Our Categories** | contained | **GRID CỐ ĐỊNH 4 cột × 2 hàng (8 tile ảnh)** — KHÔNG slider (Gold Fusion, Bird's nest, Aloe vera, Coco matcha, Kombucha, Energy Ginseng, Iced coffee, Horchata); `SEE MORE`. ⚠️ KHÁC Home (kia là slider). |
| S3 | **New Releases** | contained | **Grid 4 cột × 3 hàng (12 card)**; card 1 badge OEM + viền đỏ; **pagination `1 2 3 4 … 22`** (12 sp/trang). |
| S4 | **Lead Form** | bg-full | (dùng chung). |
| — | Footer | bg-full | (global) |

## 4. PRODUCT CATEGORY (danh mục)  `Product catgory.pdf`
**Tổng quan:** Banner promo → grid sp → mô tả SEO → Lead Form.

| # | Section | W | Bố cục + nội dung |
|---|---------|---|-------------------|
| S1 | Header | bg-full | (global) |
| S2 | **Category Hero/Promo** | full-bleed | Banner tối (gradient mận/đỏ) quảng bá vị mới `PURPLE Compound Juice` + ribbon vàng `NEW FLAVOR`; **title `FRUIT JUICE`** + breadcrumb (🏠 › PRODUCTS › FRUIT JUICE) overlay. |
| S3 | **Product Grid** | contained | **Grid 4 cột** (Peach/Soursop/Pineapple/Orange/Mixed/Mangosteen/Mango/Red Grape 325ml, Purple Compound 490ml, NFC Guava/Pineapple/Mango); card 1 badge OEM + viền đỏ. |
| S4 | **Pagination** | contained | `1 2 3 4 … 22`. |
| S5 | **Category Description (SEO)** | contained | 5 đoạn giới thiệu RITA (2004, nhà máy 42.000 m², 500 nhân viên, HACCP/Halal/ISO/GMP, xuất 200+ quốc gia) + banner + nút `READ MORE`. |
| S6 | **Lead Form** | bg-full | (dùng chung). |
| — | Footer | bg-full | (global) |

## 5. PRODUCT DETAIL (chi tiết sản phẩm)  `Product detail.pdf`
**Tổng quan:** Hero 2-cột (ảnh + info) → mô tả SEO → sản phẩm liên quan → Lead Form.

| # | Section | W | Bố cục + nội dung |
|---|---------|---|-------------------|
| S1 | Header | bg-full | (global) |
| S2 | **Breadcrumb** | contained | 🏠 › PRODUCTS › FRUIT JUICE › *tên sản phẩm*. |
| S3 | **Product Hero** | contained | **2-cột split (ảnh lon TRÁI ~45% / info PHẢI ~55%)**: tên sp + bảng **INFORMATION** (Brand: RITA or OEM/ODM · Volume 325 ml · Packaging Aluminum can · Sample Free · Shelf life 24 months · Payment L/C,T/T · Port HCM · Delivery 20-25 days · Supply 600×20ft/month · MOQ Flexible) + **FLAVOR** (8 icon vị) + **CERTIFICATES** (7 badge) + nút `PRODUCT INQUIRIES` (pill lavender) & `CONTACT US` (pill đỏ). |
| S4 | **Description (SEO)** | contained | Bài dài về sản phẩm/OEM + nút `READ MORE` (clamp), căn giữa. |
| S5 | **Related Products** | contained | Heading `RELATED PRODUCTS`; **grid 4 card** (Purple Compound, NFC Guava/Pineapple/Mango); card 1 badge OEM. |
| S6 | **Lead Form** | bg-full | (dùng chung). |
| — | Footer | bg-full | (global) |

## 6. DETAIL — chi tiết bài viết/tin tức  `Detail.pdf`
**Tổng quan:** Bài viết, layout 2 cột (bài ~70% + sidebar ~30%); cuối trang FAQ accordion + Related News (mở rộng full).

| # | Section | W | Bố cục + nội dung |
|---|---------|---|-------------------|
| S1 | Header | bg-full | (global) |
| S2 | **Breadcrumb + Title (H1)** | contained | Full-width single-col (trước khi vào 2-cột): 🏠 › BLOG › *tiêu đề*; H1 (vd *"Bird Nest Fungus with Pear 315ml — A Rising Trend..."*). |
| S3 | **Thân bài (bắt đầu 2-cột)** | contained | **2-cột: bài ~70% + sidebar ~30%.** Bài: hero image + đoạn intro + **"Key Takeaways"** (bullet). Sidebar: **"LATEST NEWS"** 3–4 card (ảnh + tiêu đề đỏ), kết thúc sớm. |
| S4 | **Thân bài tiếp** | contained | Single-col **vẫn bó theo cột bài** (KHÔNG nới rộng dù sidebar đã hết): nhiều H2/H3 (Market Overview, Why SEA, Production, Competitive, Practical, Future Outlook) + ảnh + link nội bộ. |
| S5 | **FAQs (Accordion)** | contained | Heading `FAQs`; 5 câu mở/đóng (item mở nền lavender chữ đỏ); vẫn **theo cột bài**. |
| S6 | **Related News** | contained | Heading `RELATED NEWS`; **grid 3 card, MỞ RỘNG ra full container** (chiếm lại vùng sidebar). |
| — | Footer | bg-full | (global) |

## 7. BLOG (danh sách tin tức)  `Blog.pdf`
**Tổng quan:** Banner → Featured (carousel) → Latest News (grid 3×3) → Pagination.

| # | Section | W | Bố cục + nội dung |
|---|---------|---|-------------------|
| S1 | **Page Banner** | full-bleed | Title `BLOG` + breadcrumb; ảnh Nước Yến phủ đỏ đậm. |
| S2 | **Featured Insights (intro)** | contained | Heading đỏ + mô tả *"Explore our featured article..."*, căn giữa. |
| S3 | **Featured Carousel** | full-bleed | **Slider**: card lớn giữa + 2 card ló/cắt 2 bên; ảnh full + tiêu đề trắng + nút `SEE MORE` (vd THAIFEX 2026...). |
| S4 | **Latest News (intro)** | contained | Heading `LATEST NEWS` trái / mô tả *"Browse our newest articles..."* phải. |
| S5 | **Post Grid** | contained | **Grid 3 cột × 3 hàng (9 bài)**; card ảnh trên + tiêu đề (cắt "…"); card 1 tiêu đề đỏ. |
| S6 | **Pagination** | contained | `1 2 3 4 … 22`. |
| — | Footer | bg-full | (global) |

## 8. CERTIFICATES & AWARDS  `Certificates & awards.pdf`
**Tổng quan:** Banner → grid chứng chỉ → (stats + gallery) → exhibitions+map → Awards showcase (6 khối) → Lead Form.

| # | Section | W | Bố cục + nội dung |
|---|---------|---|-------------------|
| S1 | Header | bg-full | (global) |
| S2 | **Page Banner** | full-bleed | Title `OUR CERTIFICATES & AWARDS` + breadcrumb; ảnh booth hội chợ. |
| S3 | **Certificates Grid** | contained | **Grid 4 cột × 2 hàng (8 card)**: USDA Organic/USA · Halal · GMP · HACCP · ISO 22000 · BRCGS · FSSC 22000 · ISO 22000:2005; card 1 viền đỏ; **hover → lightbox** (#11); `SEE MORE`. |
| S4 | **Proven & Recognized Worldwide** *(STATS + GALLERY = 1 section)* | trên: contained · gallery: full-bleed · progress: contained | **Trên `[contained]`:** heading `PROVEN AND RECOGNIZED WORLDWIDE` + subtitle + **4 stats** (8+ Certificates · 20+ Export markets · 50+ Award-winning products · 100% OEM/ODM flexible).<br>**Gallery `[full-bleed]`** ảnh booth (cắt mép phải): bố cục **grid 4 (2×2) │ 1 ảnh lớn │ grid 4 (2×2)** — carousel; **hover ảnh → lightbox**.<br>**Thanh progress đỏ `[contained]`** (căn lề trái với stats). |
| S5 | **International Exhibitions** | logo: full-bleed · map: contained | **(a)** dải logo **chạy loop vô tận (marquee), hover → dừng** — full-bleed (Vietfood & Beverage, Africa's Big 7, anuga, FHC China, Gulfood, PLMA, CAEXPO, SIAL Middle East...); **(b)** dưới: **1 ảnh world map + nhiều pin đỏ**. → Component #9. |
| S6 | **Awards & Recognition (intro)** | contained | Heading `AWARDS & RECOGNITION` + *"Award-winning and selected products from the world's leading beverage exhibitions."* |
| S7 | **Award Showcase ×6** | full-bleed (mỗi khối cao ~100vh) | ⭐ **Hiệu ứng scroll STICKY-STACK:** mỗi khối `position:sticky; top:0`, cao ~1 màn hình. Cuộn **xuống** → khối sau **trượt lên ĐÈ CHỒNG** lên khối trước (khối trước bị ghim rồi bị che dần); qua khối thứ 6 (cuối) → cuộn tiếp **bình thường**. Cuộn **lên** → các khối lần lượt **trượt xuống trả lại** từng cái cho tới khối đầu. *(Dựng bằng CSS `position:sticky` + `min-height:100vh` cho từng khối, DOM sau đè DOM trước; có thể thêm JS cho scale/mờ nhẹ khối bị đè.)*<br>Mỗi khối full-bleed, **nền màu theo sản phẩm**, layout trong = **3-cột (info trái │ lon giữa │ mô tả phải)**: flag+city (🇫🇷 PARIS / 🇹🇭 BANGKOK) · event (SIAL PARIS 2026 / THAIFEX ANUGA 2026) · tên sp + specs (Volume/Packaging/MOQ) + `VIEW PRODUCT` · mô tả giải. **SIAL** có seal tròn; **Thaifex** không. |
| S8 | **Lead Form** | bg-full | (dùng chung). |
| — | Footer | bg-full | (global) |

## 9. CONTACT  `Contact.pdf`
**Tổng quan:** Banner → Let's Connect (info 5 cột) → Map → Lead Form.

| # | Section | W | Bố cục + nội dung |
|---|---------|---|-------------------|
| S1 | **Page Banner** | full-bleed | Title `CONTACT` + breadcrumb; ảnh lon "bibi pop" Prebiotic Soda. |
| S2 | **Let's Connect** | contained | Heading đỏ + *"Whether you're looking for OEM/ODM..."*; **5 cột info**: EMAIL marketing@rita.com.vn · OFFICE (+84) 274 3784 688 · SALES (+84) 274 3784 788 · FAX (+84) 274 3784 799 · TAX 3700574950. |
| S3 | **Map** | contained | Google Maps nhúng (**có lề, KHÔNG tràn mép**), pin *"Rita Food and Drink Co.,Ltd"* (KCN Sóng Thần 2). |
| S4 | **Lead Form** | bg-full | (dùng chung). |
| — | Footer | bg-full | (global) |