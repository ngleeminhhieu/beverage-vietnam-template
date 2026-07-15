# FE-CODE-CONVENTIONS.md — Quy ước code FrontEnd mới (RITA)

> Chốt trong quá trình build trang **Home** (bản FE tĩnh mới, sẽ adapt vào Joomla `rita_new`).
> Đọc file này trước khi code UI để giữ nhất quán. Cập nhật khi có quy ước mới.

---

## 0. Phạm vi file được sửa
Chỉ làm trong: `frontend/index.html`, `frontend/css/style.css`, `frontend/js/main.js`, `frontend/js/module/*.js`.
- `index.html` = trang chủ. CSS gộp hết vào `style.css` (không tách file riêng).
- JS chia module trong `js/module/`, nạp lazy theo selector trong `main.js`.
- CSS không dùng sẽ dọn **sau cùng** — cứ code trước, đừng bận tâm dọn giữa chừng.

## 1. Cỡ chữ = utility class `.t-XX` (KHÔNG nhét font-size vào class tên-riêng)
Đặt `font-size` bằng class chuyên dụng gắn thẳng lên element; class tên-riêng của element (vd `.product-item__name`) chỉ lo layout/màu/clamp dòng, **không** set `font-size`.

| Class | Giá trị | Ghi chú |
|-------|---------|---------|
| `.t-12` … `.t-20` | 1.2 → 2rem cố định | text nhỏ/body (rem đã tự co theo root fluid) |
| `.t-24` | `clamp(1.7rem … 2.4rem)` | **h3**, responsive scale-down |
| `.t-32` `.t-40` `.t-48` | clamp tương ứng | tiêu đề lớn, scale-down |

- Bộ `.title-XX` cũ (24…200) của template vẫn còn nhưng **ưu tiên `.t-XX`** cho phần mới.
- rem là **fluid** (html font-size co theo vw, ~10px ở desktop rộng, nhỏ dần) → dùng `clamp()` cho cỡ ≥24.

## 2. Tiêu đề: semantic tag + `.t-XX`
- **Tiêu đề LỚN của section** → `<h2 class="title t-48 …">` (48px). `.title` lo font GG Sans Flex + đậm + đỏ.
- **h3 = tên sản phẩm / bài viết / tên card thông tin** (vd FREE SAMPLE) → `<h3 class="… t-24">` (24px).
  - **Ngoại lệ:** tên sản phẩm quá dài → ép `t-16` (16px) thay vì t-24.
- Blog/article name → `<h3 … t-24>`.

## 2b. Cấu trúc heading / SEO outline
- **1 `<h1>` duy nhất/trang**, đặt làm **con trực tiếp của `<main>`** (KHÔNG lồng trong `<section>`) → làm tiêu đề cả trang, tool outline không báo *"Untitled BODY"*.
- Mỗi **section nội dung** = `<section>` + có `<h2>` (title section). Section không heading sẽ bị tool báo *"Untitled SECTION"*.
- **Hero banner = `<div class="home-hero">`** (KHÔNG `<section>`) vì chỉ là banner/slider, không cần heading riêng → tránh untitled. CSS target theo class nên đổi tag vô hại.
- Heading ẩn (SEO/screen-reader nhưng không hiện): dùng class **`.screen-reader-text`** (visually-hidden chuẩn). Dùng cho h1 hero-page & h2 các section không có tiêu đề nhìn thấy (vd section video/intro).

## 2c. Component tái sử dụng cho trang con (inner pages)
- **`.page-banner`** = banner đầu trang (ảnh nền + tiêu đề + breadcrumb), dùng chung cho products/about/blog/contact… Là `<div>` chứa `<h1 class="page-banner__title t-48">` (48px trắng) → h1 cấp trang.
  - Concept giống trang chủ: `margin: 0 1rem` (cách 2 bên 10px) + `border-radius: var(--radius)` + `overflow:hidden`.
  - Nội dung (title + breadcrumb) canh **đáy**, `padding-bottom: 3.2rem` (32px).
  - Overlay `::after` = gradient **tối dần xuống đáy** (`rgba(0,0,0,0) 35% → 0.65 100%`) để chữ trắng dễ đọc.
  - Ảnh nền theo page: `banner-products.png`, `banner-abus.png`, `banner-news.png`, `banner-contact.png`, `banner-cef-award.png`, `banner-category.png`.
- **`.breadcrumb`** = component riêng, base màu trung tính (dark). Item cuối = trang hiện tại → style bằng **`:last-child`** (KHÔNG dùng class `breadcrumb__current`). Separator = `<i class="fa-solid fa-angle-right">`. Khi đặt trong `.page-banner` thì scope `.page-banner .breadcrumb` đè **icon home + mũi tên trắng opacity .4**, chữ current trắng.
- **Show-more list** (vd OUR CATEGORIES grid trang products): hiện 8 (`.cate-item:nth-child(n+9){display:none}`), container `[data-cate-more]` + nút `[data-cate-toggle]`; click → thêm class `.is-expanded` (module `CategoryMoreModule.js`), KHÔNG AJAX. Grid PC 4 / Tablet 3 / MB 2.
- **`.product-list__grid`** = grid sản phẩm tĩnh PC 4 / Tablet 3 / MB 2 (dùng `.product-item`), cho trang listing có **phân trang** (KHÁC home NEW RELEASES vốn là slider).
- **`.pagination`** (tái sử dụng) = vòng tròn viền đỏ (`.pagination__item > a`), trang hiện tại `.pagination__item--active` tô đỏ, dấu `...` = `.pagination__item--dots > span` (không link).

## 3. Màu chữ (xem [[fe-text-color-system]])
- Body mặc định: **Montserrat #5b5b5b** (`body{color:var(--color-des)}`) → mô tả khỏi khai màu.
- Title (GG Sans Flex): **đỏ chủ đạo** `--color-pri #D92B2B` hoặc **#333** (`--color-text`).
- Dùng token trong `:root`, không hardcode hex rời.

## 4. Component tái sử dụng → class chung, không gắn tên 1 section
Card dùng nhiều nơi đặt tên chung: `.product-item`, `.cate-item`… (KHÔNG `.home-release__card`). Ảnh theo prefix: `product-`, `cate-`, `exhi-`.

## 5. Menu / nav
- **Active** = `<li class="current-menu-item">` **và** anchor `<a class="menu-link active">`. CSS active = **đậm (700) + đỏ** `--color-pri` (rule `.menu-link.active`, specificity đủ cao để đè `current-menu-item` weight 400).
- **Submenu (dropdown)**: item con font-size **14px**. Cấu trúc `<li class="menu-item dropdown"><a>…</a><ul class="menu-list">…</ul></li>` (giống PRODUCTS). ABOUT US = dropdown: OUR STORY / OUR CERTIFICATES & AWARDS. Xem [[menu-structure-plan]].
- **Caret dropdown**: `<i class="fa-solid fa-chevron-down">` do JS template tự chèn. Style: `margin-left:0.8rem; font-size:0.85em; margin-bottom:0` (center với text nhờ `<a>` flex align-items:center).
- Header button thu gọn ở `max-width:1200px`: icon `.txt-icon` 2.4→3.2rem, ẩn `.txt-inner`.

## 6. Slider = Swiper 8 (⚠ bundle THIẾU Grid module CSS)
- Bundle `swiper-bundle.min.js` trên trang **không kèm CSS của Grid module** → khi dùng `grid:{rows,fill}` phải **tự bù CSS**: `.swiper-grid-column > .swiper-wrapper { flex-wrap:wrap !important; flex-direction:column !important }` (đè `.swiper-wrapper.row{flex-wrap:nowrap}`) + **set chiều cao `.swiper` bằng JS** = `2×card + gap` (đo card cao nhất, cập nhật khi resize → responsive).
- Grid mode: dùng **`rewind`** (KHÔNG dùng `loop` — loop không tương thích grid).
- Full-bleed slider (vd Categories): **`centeredSlides:true`** để cân giữa, không lệch trái.
- `slidesPerView:'auto'` cho card cứng kích thước; init/destroy theo `matchMedia` khi PC=grid tĩnh / mobile=slider.
- Trong markup: `.swiper-wrapper` thêm class **`row`**, `.swiper-slide` thêm **`col`** (giảm giật layout trước khi JS nạp).

## 7. Responsive
- Tiêu chí: **kéo browser to/nhỏ không được vỡ**. Font cỡ lớn dùng clamp; chiều cao slider grid tính lại theo resize.
- Breakpoint hay dùng: **1200** (ra tablet, hamburger), **768**, **600** (mobile slider), **500**.
- rem fluid + `clamp()` là cơ chế co giãn chính.

## 8. JS vặt
- Smooth scroll: dùng `smoothScrollTo` rAF trong `BtnToTopModule` (thư viện SmoothScroll làm hỏng native smooth). Link neo `#id` trượt có trừ chiều cao header sticky (79px).
- Fancybox: nhớ gọi `Fancybox.bind(...)`.
