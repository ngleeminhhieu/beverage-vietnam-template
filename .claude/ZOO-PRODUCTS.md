# ZOO PRODUCTS — Cấu trúc & render sản phẩm (com_zoo)

> **Đây là phần khó & quan trọng nhất khi remake** (Phase 5 của roadmap).
> Toàn bộ 710 sản phẩm / 12 danh mục do **ZOO CCK (com_zoo, YOOtheme)** quản lý — KHÔNG phải com_content, KHÔNG phải K2.
> Dữ liệu xác minh 2 chiều: (1) đọc file config/template trên đĩa, (2) duyệt trực tiếp bằng Chrome.

---

## 1. Tổng quan cách sản phẩm được dựng

| Thành phần | Giá trị |
|-----------|---------|
| Application (ZOO app) | **`product`** (group `product`, app id **1**, admin name "RITA Products") |
| Thư mục config gốc | `media\zoo\applications\product\` |
| Item type | **1 type duy nhất: `Product`** (`types\product.config`) |
| Template đang chạy | **`default`** (xác nhận trong params app: `"template":"default"`). `uikit`/`uikit3` là template stock của YOOtheme, KHÔNG dùng. |
| Thư mục template | `media\zoo\applications\product\templates\default\` |
| Override trong Joomla template? | **KHÔNG.** `templates\sj_time\html\com_zoo\` **không tồn tại**; `components\com_zoo\templates` **không tồn tại**. ZOO không dùng cơ chế `/html/` override của Joomla — mọi markup sản phẩm nằm trong `media\zoo\...`. |

> ⚠️ **Hệ quả cho remake:** không thể override ZOO bằng cách bỏ file vào `templates\rita_new\html\com_zoo\`. Phải hoặc (a) sửa/clone template ZOO tại `media\zoo\applications\product\templates\`, hoặc (b) tạo template ZOO mới `rita_new` trong đó rồi gán trong ZOO admin. Đây là điểm khác biệt lớn so với com_content.

---

## 2. Item type `Product` — TẤT CẢ các field

Định nghĩa tại `media\zoo\applications\product\types\product.config`. Mỗi field ("element") có UUID. Đây là các ô cần map sang product card / product detail của giao diện mới:

| Field (label) | UUID | Kiểu (element type) | Giá trị mặc định / options |
|---|---|---|---|
| Sale product | `93d9e977-…-2be51b04ef7e` | checkbox | `yes` (badge "Sale") |
| Hot product | `270a1069-…-6fc5d2c12c0e` | checkbox | `yes` (badge "Hot") |
| New product | `8d5de619-…-963d553b795c` | checkbox | `yes` (badge "New") |
| Supply ability | `736c0e4b-…-13c560b7a467` | text | `600 Twenty-Foot Container/Month.` |
| Sample | `c0e23b7b-…-166521313ca9` | text | `Free Sample - Free Design` |
| Delivery time | `3eef3efe-…-e7972e3f08b4` | text | `20 -25 day after Order` |
| Minimum order quantity | `fa1c85d7-…-124d353c5720` | text | `200 Carton/Oder` |
| Related Products | `d94ccdd2-…-40948ae8fae9` | relateditemspro | trỏ app 1 / type `product` |
| **inquiry** ⭐ | `1c69d78d-…-1254b1a88811` | **joomlamodule** | **mặc định `122`** ← nút **Ask price** |
| Shelf life | `524014ce-…-069f2e97e69b` | select | `18-months` / `24-months` / `12-months` |
| Payment term | `415d112c-…-78e042f0583c` | text | `L/C,T/T` |
| Port | `b16b77b0-…-c0d8c1577484` | text | `Cat Lai Port, Ho Chi Minh City, Vietnam.` |
| **FOB price** | `32f42788-…-ac3b24ee552f` | text | `Live chat or call us` (B2B: KHÔNG hiện giá) |
| Image Product | `f2e8c5fc-…-8596dbd1da78` | imagepro | dir `images/uploads`, resize crop 600×600, lightbox |
| Volume | `ca899a4f-…-4d61cae52d91` | select | 30 options: `180-ml` … `2-l` |
| Packaging | `47ee5505-…-ecdd24cf834c` | checkbox | `tin-can`, `aluminum-can`, `pet-bottle`, `pet-can`, `glass-bottle`, `pp-bottle`, `pp-cup`, `bag`, `paper-box` |
| Certification | `62158038-…-4885500d7ac0` | text | `ISO, HACCP, KOSHER, HALAL, USDA, ORGANIC …` |
| Description | `83ba7366-…-3e7a94f0e773` | textarea (jplugins on) | mặc định `{loadposition viewdescription}`; **thực tế chứa 1 bài SEO dài** (heading + đoạn văn + ảnh) |
| Social Buttons | `1f368292-…-01e1d599d245` | socialbuttons | google/twitter/facebook |

Ngoài ra là các **core element** của ZOO (identifier là chữ, không phải UUID): `_itemname`, `_itemcategory`, `_itemprimarycategory`, `_itemauthor`, `_itemcreated`, `_itemmodified`, `_itempublish_up/_down`, `_itemhits`, `_itemtag`, `_itemstate`, `_itemaccess`, `_itemlink`, `_itemprevnext`, `_itemprint`, `_itemedit`, `_itemfrontpage`, `_itemcommentslink`, `_itemsearchable`, `_staticcontent`.

> Lưu ý: `positions.config` khối `feed` tham chiếu 3 UUID không còn tồn tại (field đã xoá) → bỏ qua khi remake.

---

## 3. Template `default` — file nào render cái gì

Thư mục `media\zoo\applications\product\templates\default\`. ZOO tách **"field nào vào position nào"** (`positions.config`) khỏi **"position bố trí ra sao"** (các file `.php`).

### 3a. Trang CHI TIẾT sản phẩm (product detail)
- Entry: `templates\default\item.php` → render `item.full`.
- Layout: `templates\default\renderer\item\full.php`.
- Map field→position: `renderer\item\positions.config`, khối `"product.product.full"`.

Bố cục `full.php` (khớp 100% với screenshot đã duyệt):
1. **`pos-media`** — ảnh sản phẩm (Image Product, 600×600 lightbox). **Nút Ask price nằm lồng ngay trong khối media** (position `inquiry`).
2. **`pos-title`** — `_itemname` (tên sản phẩm).
3. **Bảng thông số** `<table>`, mỗi field 1 hàng (label đậm bên trái, giá trị bên phải) theo THỨ TỰ:
   `Sample → Volume → Packaging → Shelf life → Payment (term) → FOB price → Delivery time → Minimum order quantity → Port → Supply ability`.
   *(hàng `Certification` bị comment out trong code)*.
4. **`pos-description`** — field Description (bài SEO dài).
5. **`pos-specification`** → thực chất map `_itemprevnext` (link prev/next) dưới tiêu đề `<h3>Specifications</h3>`.
6. **`pos-bottom`** → `_itemtag` (tags).
7. **`pos-related`** → field relateditemspro (khối "YOU MAY ALSO LIKE").
8. Một khối related THỨ HAI hardcode: render trực tiếp Joomla module position **`Related-Products`** qua `JModuleHelper`.

### 3b. Trang DANH MỤC / LIST sản phẩm
- Wrapper: `templates\default\category.php` (render tiêu đề + mô tả + ảnh danh mục → partial `categories` + `items`).
- Mỗi item trong list: `templates\default\_item.php` → render `item.teaser`.
- Layout teaser: `renderer\item\teaser.php` — xuất các position **media, title, description, specification, links**.
- Map teaser: `positions.config` khối `"product.product.teaser"` (định nghĩa cả badge new/hot/sale + volume/packaging/shelf_life, NHƯNG `teaser.php` hiện chỉ xuất media/title/description/specification/links → badge/volume KHÔNG hiện trừ khi thêm vào teaser khi remake).
- Frontpage (trang `/products`): `templates\default\frontpage.php` → lưới 12 danh mục.
- Tag view: `tag.php`. Related sub-teaser: khối `"product.product.related"`.

### 3c. CSS/assets của ZOO template
`templates\default\assets\css\zoo.css` và `assets\css\submission.css`. (Đây là CSS cần thay/ghi đè khi đổi giao diện sản phẩm.)

---

## 4. ⭐ "Ask price" đến từ đâu (rất quan trọng)

Nút **"Ask price"** KHÔNG phải text cứng trong file ZOO nào. Nó là **toggler của một Joomla module** được ZOO nhúng qua field `inquiry` (kiểu `joomlamodule`).

Chuỗi render:
1. `full.php` render position `inquiry`.
2. `positions.config` map `inquiry` → element `1c69d78d-…` (field inquiry).
3. `product.config` định nghĩa field đó `type: joomlamodule`, `default: "122"`.
4. `media\zoo\elements\joomlamodule\joomlamodule.php` gọi `JModuleHelper::renderModule()` với module id = giá trị field (mặc định **122**).

**Module id 122** (bảng `#__modules`):
- Type: **`mod_pwebcontact`** = *Perfect AJAX Popup Contact Form*.
- Title: "inquiry for zoo", position `contacts`, published, ẩn title.
- Params: `layout_type: modal`, `style_toggler: pink`, `show_toggler: 1`, **`toggler_name: "Ask price"`**, `toggler_icon: gallery`.
- **Người nhận: `email_to: marketing@rita.com.vn`**. Form gồm Name + Email + Message, submit AJAX → gửi mail cho RITA (không có giá công khai — đúng mô hình B2B, củng cố bởi field FOB price = "Live chat or call us").

→ **Tóm tắt:** *"Ask price" = nút mở popup form `mod_pwebcontact` (module 122), gửi inquiry về marketing@rita.com.vn.*

Hai module `mod_pwebcontact` anh em cùng engine:
- id **184** "Email for us" — toggler "Send Email" (dùng ở khối "07 Get In Touch" trang chủ).
- id **194** "Subscribe" — position `subscribe` (dùng ở khối Newsletter).

---

## 5. Danh sách 12 danh mục (ZOO category)

Từ SITEMAP + duyệt trang `/products`:

`Fruit Juice`, `Bird's Nest`, `Aloe Vera Juice`, `Coconut Products`, `Soft Drink`, `Energy Drink series`, `Coffee Drink series`, `Milk Series`, `Non-Alcohol Beverage`, `Chia and Basil seed`, `Carbonate/Carbonated Drink`, `Tea-Honey and Fruit`.

URL: `/products/<slug>` (vd `/products/coconut-products`). Chi tiết: `/products/<slug>/<item-slug>`.

---

## 6. Checklist khi remake phần Products

- [ ] Quyết định: giữ ZOO hay đổi engine. **Khuyến nghị giữ ZOO** (710 item + ảnh đã có), chỉ thay template ZOO.
- [ ] Clone `media\zoo\applications\product\templates\default\` → `…\rita_new\`, gán template mới trong ZOO admin (không phá `default`).
- [ ] Product card (teaser): map ảnh + tên + (thêm) badge Hot/New/Sale + volume/packaging.
- [ ] Product detail: giữ đúng khối **ảnh + Ask price + bảng thông số + Description(SEO) + related**.
- [ ] Giữ nguyên module 122 (Ask price) & cơ chế `joomlamodule`, chỉ restyle nút cho khớp giao diện mới.
- [ ] Thay `zoo.css` bằng CSS mới.

### File cần đọc/sửa khi remake
- `media\zoo\applications\product\types\product.config` — định nghĩa field
- `…\templates\default\renderer\item\full.php` — layout chi tiết
- `…\templates\default\renderer\item\positions.config` — map field→position
- `…\templates\default\renderer\item\teaser.php` + `_item.php` + `category.php` + `frontpage.php` — list/frontpage
- `…\templates\default\assets\css\zoo.css` — style
- Module **id 122** (`mod_pwebcontact`) — sửa trong Joomla admin, không nằm trên đĩa
