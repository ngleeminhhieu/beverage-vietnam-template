# HOME & MODULES — Trang chủ được dựng bằng gì + toàn bộ module

> Xác minh bằng truy vấn DB (`odgal_modules`, `odgal_menu`, `odgal_content` id 46) + duyệt Chrome.
> Kết luận cốt lõi: **Trang chủ KHÔNG nằm trong bài viết** — bài viết Home (id 46) **rỗng** — mà ghép từ **module** (SP Page Builder + Smart Slider + custom).

---

## 1. Bài viết Home id 46 = RỖNG

`odgal_content` id 46 ("Home"): `introtext` và `fulltext` đều **length 0**. Bài viết chỉ tồn tại để menu HOME có đích trỏ tới. **Nội dung thật của trang chủ = module `bannermain`.**

Các trang SP Page Builder độc lập (`odgal_sppagebuilder`) chỉ có 4 dòng và **tất cả đã bị trash (`published=-2`)** → nội dung page builder đang chạy **nằm trong params của các module `mod_sppagebuilder`**, không phải bảng sppagebuilder.

---

## 2. `bannermain` = vùng hero/nội-dung-chính thay đổi theo từng trang

Đây là chìa khoá: cùng position `bannermain` nhưng **mỗi menu item nạp module khác nhau**:

| Module id | Title | Type | Hiện ở trang (menuid) |
|---|---|---|---|
| 170 | Home Banner | mod_smartslider3 (slider **3** "Banner page home") | **HOME (101)** — hero slider |
| 174 | Page home | **mod_sppagebuilder** | **HOME (101)** — nội dung chính section 01–07 |
| 182 | Page about | mod_sppagebuilder | ABOUT (163) |
| 188 | Blogs banner | mod_sppagebuilder | NEWS (220) |
| 190 | Maps Rita | mod_sppagebuilder | CONTACT (217) |
| 192 | Page Contact | mod_sppagebuilder | CONTACT (217) |

→ **Home = module 170 (Smart Slider hero) + module 174 (SP Page Builder body).** Module 174 chứa JSON SP Page Builder (heading "RITA FOOD AND DRINK CO.,LTD", font Oswald, màu #ce2323, các row/column/addon = 7 section đã thấy).

Module bổ sung nạp thêm trên Home (qua `{loadmodule}`/page builder):
- 179 "view poster" — mod_smartslider3 (slider 9 "Menu-page-product")
- 181 "Page home view 01 bottom" — mod_smartslider3 (slider 11 "About RITA")
- 171 "Cer" — mod_smartslider3 (slider 5 "Dynamic Carousel Post Slider") — dùng ở home + ~30 trang khác
- 184 "Email for us" — mod_pwebcontact (form "Get In Touch")

---

## 3. Chrome chung (mọi trang, menuid=0)

| Module id | Title | Type | Position | Vai trò |
|---|---|---|---|---|
| 191 | Logo fix | mod_custom | `logofix` | logo sticky (`/images/Design/logorita2019yellow_copy.png`) |
| 148 | Menu Tools | mod_menu | `top2` | menu phụ trên cùng (menutype `menu-tools`) |
| 145 | Search | **mod_zoofilter** | `search` | ô tìm kiếm sản phẩm ZOO |
| 156 | banner | mod_custom | `minicart` | banner nhỏ |
| 180 | Text Rita bottom | mod_custom | `bottom1` | footer: `{loadposition Subscribe}` + heading "RITA FOOD AND DRINK CO.,LTD" + SĐT/email/địa chỉ |
| 189 | google map rita | mod_custom | (loadposition) | bản đồ Google |

**Footer / Subscribe (position `subscribe` + `bottom1`):**
| id | Title | Type | Ghi chú |
|---|---|---|---|
| 194 | Subscribe | mod_pwebcontact | form "Get Newsletter" (toggler) |
| 195 | Subscribe Text | mod_custom | chữ "Get Newsletter" |

**Position khác:** `breadcrumb` → 17 Breadcrumbs (mod_breadcrumbs); `contacts` → **122 "inquiry for zoo"** (mod_pwebcontact = nút Ask price, xem [ZOO-PRODUCTS](ZOO-PRODUCTS.md)); `viewdescription` → 187 "View working us" (mod_custom, trang danh mục SP); `Related-Products` → 197 (mod_zooitem); `bottom1` (trang products) → 144 Tags Cloud (mod_zootag).

Tổng: **25 module publish** (client_id=0).

---

## 4. Menu chính do YT Mega-Menu render (KHÔNG phải mod_menu)

⚠️ **Quan trọng cho remake:** thanh nav chính (HOME/ABOUT/PRODUCTS/NEWS/CONTACT) **không phải** một module `mod_menu`. Nó do **YT mega-menu của template** dựng, điều khiển bằng template param `"menutype":"mainmenu"` + `"menustyle":"mega"`. (mod_menu duy nhất là "Menu Tools" ở `top2`.)

Menu items (menutype `mainmenu`, published, theo lft):

**Cấp 1 (6 mục):**
1. HOME (101) → com_content article **46**
2. ABOUT US (163) → com_content article **47**
3. PRODUCTS (121) → com_zoo view=**frontpage** (có 12 con)
4. NEWS (220) → com_content category **blog id 8**
5. CONTACT (217) → com_content article **51**
6. Tags (222) → com_tags view=tags

**Con của PRODUCTS (12, đều com_zoo view=category):** Fruit Juice (187), Bird's Nest (180), Aloe Vera Juice (181), Coconut Water (184), Soft Drink (182), Energy Drink (183), Coffee Drink (185), Milk Series (188), Non-Alcohol Beverage (189), Chia and Basil seed (192), Carbonate Drink (193), Tea-Honey and Fruit (223).

---

## 5. ✅ Chốt: engine nào dựng phần nào (không còn nhầm lẫn)

| Vùng | Engine thật |
|------|-------------|
| Sản phẩm (list + detail) | **com_zoo (ZOO)** — 710 item |
| Home / About / Contact (đích menu) | **com_content** (nhưng article Home rỗng) |
| Nội dung hiển thị của Home/About/News-banner/Contact | **mod_sppagebuilder** (JSON trong params module) |
| Hero/slider | **Smart Slider 3** (mod_smartslider3) |
| News (list + detail) | **com_content** blog category id 8 |
| Search | **mod_zoofilter** (ZOO), Tags = com_tags / mod_zootag |
| Ask price / Newsletter / Contact form | **mod_pwebcontact** (id 122 / 194 / 184) |
| **K2 (com_k2)** | **KHÔNG dùng** — không có module mod_k2 nào publish. Các override `sj_time/html/com_k2/` là scaffolding demo dormant của SmartAddons. |

---

## 6. Cheat-sheet dựng lại Trang chủ (trên → dưới)

1. **Header (mọi trang):** logo (param `overrideLogoImage=images/logorita2019-2.png` + module 191 `logofix`) · YT mega-menu từ `mainmenu` · menu phụ `top2` (148) · ô search ZOO (145).
2. **Hero:** Smart Slider 3 "Banner page home" (module 170, `bannermain`).
3. **Thân trang chủ:** SP Page Builder module 174 "Page home" (section 01 RITA Beverage → 07 Get In Touch). *(Có thể tái tạo tĩnh hoặc giữ mod_sppagebuilder.)*
4. **Slider/khối phụ:** Smart Slider 9 (179), 11 "About RITA" (181), 5 "Dynamic Carousel Post Slider" (171), form liên hệ 184.
5. **Footer (mọi trang):** Subscribe (194 + 195) ở `subscribe`; "Text Rita bottom" (180) ở `bottom1` (heading công ty + SĐT `084 274 3784788` + `marketing@rita.com.vn` + địa chỉ Song Than 2, Di An + social + copyright "Development by RITA Suppliers Beverage").
