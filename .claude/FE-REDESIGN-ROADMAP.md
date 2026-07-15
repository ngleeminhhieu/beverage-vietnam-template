# LỘ TRÌNH: Adapt template tĩnh FE → Joomla (thay giao diện RITA)

> Tài liệu này là **kế hoạch + checklist tiến độ**. Mỗi phase có mục tiêu, việc làm, và cách test.
> Tick `[x]` khi xong. Nguyên tắc xuyên suốt: **không đụng `sj_time` đang chạy** — làm template mới `rita_new` song song, chỉ đổi Default khi đã ưng.

---

## 0. Mục tiêu & phạm vi

- **Input:** một bộ template tĩnh FE (HTML/CSS/JS) do bạn cung cấp.
- **Output:** một Joomla template `templates/rita_new/` render đúng giao diện mới nhưng chạy bằng **dữ liệu thật** của site (710 sản phẩm ZOO, 141 bài viết, menu…).
- **Kết quả cuối:** đặt `rita_new` làm Default → toàn site đổi giao diện, backend/dữ liệu giữ nguyên.

## Có làm được không? → CÓ. Mức độ từng phần:

| Phần | Độ khó | Ghi chú |
|------|--------|---------|
| Khung (header/menu/footer), Home, About, Contact | 🟢 Dễ | Ghép nhanh, ít rủi ro |
| News (list + detail) | 🟢 Dễ | Override com_content chuẩn |
| Slider / banner / module | 🟡 Vừa | Map khối tĩnh → module position |
| **Sản phẩm (ZOO): list + detail** | 🔴 Khó | ZOO có renderer riêng, phải map field. Phase riêng. |
| Đa ngôn ngữ, SEF, responsive QA | 🟡 Vừa | Cuối dự án |

---

## PHASE 0 — Chuẩn bị & phân tích  ⬜
- [ ] Nhận template tĩnh, đặt tại `_design/` (thư mục tạm, không ảnh hưởng site).
- [ ] Liệt kê các trang có trong bản tĩnh (home, product list, product detail, news, contact…).
- [ ] Xác định khung dùng chung: header, menu, footer, sidebar.
- [ ] Xác định các khối lặp: product card, news card, breadcrumb, pagination.
- [ ] Ghi chú framework CSS (Bootstrap/Tailwind/thuần) + thư viện JS.
- **Test:** mở bản tĩnh bằng trình duyệt, xác nhận chạy đủ trang.

## PHASE 1 — Dựng skeleton template `rita_new`  ⬜
- [ ] Tạo `templates/rita_new/` với: `templateDetails.xml`, `index.php`, `component.php`, `error.php`, `index.html`, `template_thumbnail.png`.
- [ ] Copy `css/ js/ images/ fonts/` từ bản tĩnh vào template, sửa đường dẫn.
- [ ] `index.php`: dán khung HTML chung, chèn placeholder Joomla:
  - `<jdoc:include type="head" />` trong `<head>`
  - `<jdoc:include type="component" />` ở vùng nội dung chính
  - `<jdoc:include type="message" />` cho thông báo
- [ ] `templateDetails.xml`: khai báo các **module position** (vd `mainmenu, slider, maincontent, footer…`).
- [ ] Cài/nhận diện template trong Admin (Extensions → Templates → Styles).
- **Test:** gán `rita_new` cho **1 menu thử nghiệm** (không đổi Default) → trang mở ra đúng khung + CSS.

## PHASE 2 — Module positions & module động  ⬜
- [ ] Map khối tĩnh → position: menu → `mainmenu`, slider → `slider`, footer → `footer`…
- [ ] Override `html/mod_menu/` để menu ra đúng markup bản tĩnh.
- [ ] Gán các module hiện có (hoặc tạo mới) vào position của `rita_new`.
- [ ] Slider trang chủ: dùng Smart Slider 3 sẵn có, hoặc chuyển sang slider của bản tĩnh.
- **Test:** menu điều hướng đúng, click chuyển trang OK, footer hiển thị.

## PHASE 3 — Trang nội dung đơn giản (Home / About / Contact)  ⬜
- [ ] Home: ghép layout tĩnh với bài viết id 46 + các module trang chủ.
- [ ] About (id 47), Contact (id 51): override `html/com_content/article/` theo markup mới.
- [ ] Form liên hệ: nối lại (com_content contact hoặc form của bản tĩnh).
- **Test:** 3 trang khớp bản tĩnh, nội dung là dữ liệu thật.

## PHASE 4 — News (blog com_content)  ⬜
- [ ] Override `html/com_content/category/blog*` cho trang danh sách tin (category id 8).
- [ ] Override `html/com_content/article/` cho trang chi tiết tin.
- [ ] Ghép news card + pagination theo bản tĩnh.
- **Test:** `/news` ra danh sách tin đúng style, mở 1 bài chi tiết OK.

## PHASE 5 — Sản phẩm (ZOO) 🔴 phần trọng tâm  ⬜
- [ ] Mổ cấu trúc ZOO: app, item types, các **field** (ảnh, mô tả, thông số, giá…).
- [ ] Map field ZOO ↔ các ô trong product card / product detail của bản tĩnh.
- [ ] Override danh sách sản phẩm: `html/com_zoo/category` + `frontpage` (12 danh mục).
- [ ] Override chi tiết sản phẩm: `html/com_zoo/item` (710 sp).
- [ ] Xử lý ảnh sản phẩm (đường dẫn media/ZOO), lọc/filter theo danh mục nếu bản tĩnh có.
- **Test:** `/products` + 1 danh mục + 1 sản phẩm chi tiết khớp bản tĩnh, dữ liệu thật.

## PHASE 6 — Hoàn thiện (đa ngôn ngữ · SEF · responsive)  ⬜
- [ ] Chuyển text cứng trong template → language string (en-GB, vi-VN, ar-AA) nếu cần.
- [ ] Kiểm tra SEF URL không vỡ (RewriteBase đã set cho local).
- [ ] QA responsive (mobile/tablet), kiểm tra JCH Optimize không làm vỡ CSS/JS mới.
- [ ] Dọn asset thừa, gộp CSS/JS.
- **Test:** duyệt toàn site trên nhiều kích thước màn hình.

## PHASE 7 — Go-live  ⬜
- [ ] Đặt `rita_new` làm **Default** (Templates → Styles).
- [ ] Regression test toàn bộ menu trong [SITEMAP](SITEMAP.md).
- [ ] Cập nhật [SETUP-LOG.md](SETUP-LOG.md): template mặc định đã đổi.
- [ ] (Khi deploy production) đóng gói template + override, hoàn nguyên cấu hình server thật (xem SETUP-LOG).

---

## Rủi ro & cách kiểm soát

| Rủi ro | Xử lý |
|--------|-------|
| Phá giao diện đang chạy | Làm `rita_new` song song, chỉ đổi Default ở Phase 7 |
| ZOO render khác dự đoán | Dành Phase 5 riêng, mổ cấu trúc trước khi code |
| JCH Optimize gộp nhầm CSS/JS mới | Tắt JCH khi dev, bật lại + test ở Phase 6 |
| Mất dữ liệu | DB đã có, thao tác chỉ trên file template + override (không sửa dữ liệu) |
| Deploy lên production | Theo mục hoàn nguyên trong [SETUP-LOG.md](SETUP-LOG.md) |

## Cách test nhanh mỗi phase
- Frontend: http://localhost/beverage-vietnam/ (gán `rita_new` theo menu để thử từng trang)
- Admin: http://localhost/beverage-vietnam/administrator/ — `ritaweb` / `Rita@2026`
- Xoá cache khi giao diện không cập nhật: System → Clear Cache (hoặc xoá `cache/`).

## Cần bạn cung cấp trước khi bắt đầu Phase 1
1. Bộ template tĩnh (copy vào `_design/`).
2. Bản tĩnh có đủ **product list + product detail** chưa?
3. Chiến lược: thay **toàn bộ** hay **từng trang** (khuyến nghị từng trang, an toàn hơn).
