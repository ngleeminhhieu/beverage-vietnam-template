# TEMPLATE sj_time — Cấu trúc giao diện hiện tại (để remake theo)

> Template site đang chạy. Tham chiếu khi dựng `rita_new`.
> ⚠️ **ĐÍNH CHÍNH quan trọng:** sj_time **KHÔNG phải T3 Framework (JoomlArt)** như CLAUDE.md/PROJECT-OVERVIEW mô tả trước đây. Nó là **YT Framework v3 (YTFramework của YouTech/SmartAddons)**.

---

## 1. Framework: YT Framework v3 (không phải T3)

- Manifest: `templateDetails.xml` → `<group>yt_framework</group>`. `index.php` kiểm tra hằng `YT_FRAMEWORK`.
- **Engine nằm NGOÀI template**, trong system plugin **`plugins\system\yt\`** — nơi định nghĩa `YtFrameworkTemplate`, `YtFrameworkRenderXML`, và render các "feature position" `@logo` / `@mainmenu` / `@copyright` / `@search`.
- Template chỉ chứa: subclass mỏng + **layout XML** + includes + overrides + assets. Không có `tpls/` block, không có themler T3.
- (Thư mục `t3-assets/` ở root là tàn dư, không phải cơ chế của template này. Cơ chế thật là `yt-assets/`.)

---

## 2. Khung layout (data-driven từ XML)

Khung HTML **sinh động** từ layout XML, không viết cứng:

- `index.php` — document gốc: `<head>` (`<jdoc:include type="head"/>` + meta + canonical **hardcode `http://beverage-vietnam.com/`** ~ dòng 44-48 + favicon + `includes\head.php`), rồi `<body id="bd">` bọc `#yt_wrapper`. Thân trang là **vòng lặp** qua `$yt_render->arr_TB` (mảng "block" parse từ layout XML). Mỗi block → `<tag id class="block"><div class="container"><div class="row"> …positions… `.
- `includes\frame_inc.php` — "controller": khởi tạo `YtTemplate` + `YtRenderXML`, nạp CSS/JS, parse layout.
- `includes\block-content.php` — cột nội dung: `<aside id="content_left">`, `<div id="content_main">`, `<aside id="content_right">`.
- `includes\head.php` — Google fonts (`ytfont()`), body-bg boxed/framed.
- `includes\lib\template.php` — `YtTemplate` (custom chính: `getCopyright()`, footer "Development by RITA Suppliers Beverage").

### Layout đang dùng: `layouts\layout1.xml` (`type="mlr"`, chọn bởi param `templateLayout=layout1`)
Thứ tự block → tag/id → positions:

| # | block | tag | id | positions bên trong |
|---|-------|-----|-----|---------------------|
| 1 | header | `<header>` | `yt_header` | breadcrumb, top2 |
| 2 | spotlight1 | `<section>` | `yt_spotlight1` | **@logo**, banner |
| 3 | menu | `<nav>` | `yt_menuwrap` | logofix, **@mainmenu**, search |
| 4 | minh | `<section>` | `minh` | **bannermain** ← hero/nội dung chính đổi theo trang |
| 5 | breadcrumb | `<section>` | `yt_breadcrumb` | pagedesign |
| 6 | content | `<section>` | `content` | left, message, maintop1 (col-lg-8), maintop2 (col-lg-4), maintop3, **component**, mainbottom1, right |
| 7 | spotlight2 | `<section>` | `yt_spotlight2` | bottom1 |
| 8 | spotlight3 | `<section>` | `yt_spotlight3` | bottom2 (col-md-5), bottom3 (col-md-7) |
| 9 | footer | `<footer>` | `yt_footer` | **@copyright** |

- `layouts\variations.xml` (`type="m"`) — layout thay thế (1 cột, thêm top1 + grid mid1–mid16). Param `overrideLayouts` mặc định `494:variations` → **Itemid 494 dùng variations**, còn lại dùng layout1.
- `component.php` (view print/mailto — chú ý hardlink `templates/protostar/css/template.css`), `error.php` (stub).

---

## 3. Module positions

**Khai báo trong `templateDetails.xml`** (hiện trong module manager):
`breadcrumb, top1, top2, banner, search, maintop1, maintop2, maintop3, mainbottom1, left, right, stickyBar, stickyPanel, footer, bottom1, bottom2, bottom3, syndicate, debug`

**Position dùng bởi layout XML nhưng KHÔNG khai báo** (vẫn chạy vì YT position tự do): `logofix, bannermain, pagedesign, mid1–mid16`.

Position thực tế được nạp module → xem chi tiết ai-ở-đâu trong [HOME-AND-MODULES.md](HOME-AND-MODULES.md). Feature position `@logo/@mainmenu/@copyright/@search` do plugin YT render, không gán module.

---

## 4. Template overrides — cây `templates\sj_time\html\`

- `html\modules.php` — chrome module `modChrome_ytmod` (bọc `.module > h3.modtitle + .modcontent`, parse Font Awesome + badge từ `moduleclass_sfx`) và `modChrome_special`. **Đây là markup bọc module cần tái tạo.**
- `html\pagination.php`
- **`html\com_content\`** (bài viết Joomla — About/News/Contact): `archive\`, `article\default.php`, `categories\`, `category\blog.php` + `blog_item.php` + `default_articles.php`, `featured\`.
- **`html\com_k2\templates\`** — ⚠️ **DORMANT**: K2 KHÔNG được dùng trên site thật (không module mod_k2 nào publish). Đây là theme demo SmartAddons kèm sẵn (`listing-style\` + `sj-theme\`, mỗi bộ 10 file: category/category_item/item/latest/tag/user…). Có thể bỏ qua khi remake.
- `html\com_tags\`, `html\com_users\` (login/profile/registration).
- `html\layouts\joomla\content\` (JLayout: intro_image, tags, info_block/…).
- **Module overrides:** `mod_menu\default.php`, `mod_breadcrumbs\`, `mod_custom\`, `mod_languages\`, `mod_login\`, `mod_acymailing\`, + loạt SmartAddons `mod_sj_*` (slider/mega_news/moduletabs/accordion/contact_ajax…) và `mod_k2_*` — **các mod_sj_/mod_k2 này cũng dormant** (không dùng trên site RITA hiện tại, vì home dùng SP Page Builder + Smart Slider).

> Khi remake: chỉ cần bận tâm override **com_content** (About/News/Contact) và markup module chung. ZOO override nằm ở `media\zoo\...` (xem [ZOO-PRODUCTS](ZOO-PRODUCTS.md)), KHÔNG ở đây.

---

## 5. Assets

- **CSS** (`css\`): các biến thể màu ~170KB (`template-red.css` là bản chỉnh gần nhất → **theme đang chạy = red**, khớp param `themecolor=red`); `responsive.css`, `component.css`, `your_css.css` (file customization), `css\system\`, `css\ie\`. Lưu ý `frame_inc.php` nạp `css/template.css` nhưng **không có file đó** — plugin remap `themecolor` → `template-{color}.css`.
- **LESS nguồn** (`less\`): `template.less, layout.less, menus.less, modules.less, k2.less, responsive.less` + `less\color\` + `less\responsive\` (480/767/768-979/980-1199/1200) + `less\system\`. → **Rebuild từ LESS, không sửa CSS 170KB.**
- **Bootstrap 3** (`asset\bootstrap\`): grid `col-md-*`, `hidden-*` khắp layout là **Bootstrap 3**.
- **Fonts:** Font Awesome (`asset\fonts\awesome\`); Google Fonts nạp runtime bởi `ytfont()` (mặc định body Arial, heading/menu "Open Sans").
- **JS** (`js\`): `yt-script.js, keepmenu.js, ytsticky.js, scrollReveal.js, scrollup.js, jquery.prettyPhoto.js`; jQuery từ core Joomla.
- **Mega-menu engine:** `menusys\` (`ytmenu.php` + `class\` common/dropline/mega/mobile).

---

## 6. Ý nghĩa cho remake `rita_new`

- Layout data-driven bởi plugin `yt` là **không cần thiết**. Template mới có thể **bỏ hẳn engine YT**, viết cứng các vùng (header / spotlight1 / nav / minh / content / spotlight2 / spotlight3 / footer) bằng `<jdoc:include type="modules" name="…">` thuần, **tái dùng tên position** ở mục 3.
- Nav chính: dựng bằng override `mod_menu` hoặc menu module mới (vì site hiện dùng YT mega-menu — sẽ mất khi bỏ YT, nên phải thay bằng mod_menu + CSS).
- Style: Bootstrap 3 + LESS. Có thể thay bằng framework mới của bản thiết kế.
- **Không đụng** `sj_time`; làm `rita_new` song song, đổi Default ở cuối (xem [FE-REDESIGN-ROADMAP](FE-REDESIGN-ROADMAP.md)).
