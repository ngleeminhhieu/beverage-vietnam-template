# PROJECT OVERVIEW — RITA Beverage

## 1. Đây là gì?

Website chính thức của **RITA Food & Drink Co.** (domain thật: `beverage-vietnam.com`) — một
nhà máy sản xuất & xuất khẩu đồ uống của Việt Nam theo hình thức **OEM/ODM**: nước ép trái cây,
nước dừa, nha đam, nước tăng lực, cà phê lon, yến, hạt chia/é...

Website hướng tới khách hàng B2B quốc tế (giới thiệu nhà máy + catalog sản phẩm để tìm nhà nhập khẩu/đại lý).

- **Tên site:** RITA Beverage
- **Ngôn ngữ mặc định:** English (en-GB). Có cài thêm Vietnamese (vi-VN) và Arabic (ar-AA).
- **Email liên hệ:** ritamarketing2016@gmail.com

## 2. Công nghệ (Tech stack)

| Thành phần | Giá trị |
|------------|---------|
| CMS | **Joomla! 3.10.12** |
| Ngôn ngữ | PHP (chạy tốt trên PHP 7.4 — bản XAMPP hiện tại) |
| Database | MySQL / MariaDB, prefix bảng `odgal_`, ~129 bảng |
| Template site | **sj_time** (SmartAddons, **YT Framework v3** — engine ở `plugins/system/yt/` + `yt-assets/`. *Không phải T3;* `t3-assets/` chỉ là tàn dư) → [TEMPLATE-SJTIME](TEMPLATE-SJTIME.md) |
| Template admin | isis (mặc định Joomla) |
| Server thật | Hosting Hostinger (`/home/u487708776/...`), bắt buộc HTTPS |

## 3. Các thành phần / extension chính

Catalog sản phẩm KHÔNG dùng bài viết Joomla thường mà dùng **ZOO CCK**:

| Extension | Vai trò |
|-----------|---------|
| **com_zoo** (YOOtheme ZOO) | CCK quản lý toàn bộ **danh mục & sản phẩm** (710 item, 12 category). Đây là trái tim của phần Products. |
| **com_zoolanders** | Bổ trợ cho ZOO |
| **com_content** | Bài viết thường: Home, About Us, News, Contact (141 bài published) |
| **SP Page Builder** (com_sppagebuilder) | Trình dựng trang kéo-thả |
| **Smart Slider 3** (com_smartslider3) + Nextend2 | Slider ảnh trang chủ |
| **Widgetkit** | Widget (gallery, slideshow...) của YOOtheme |
| **JCH Optimize Pro** (com_jchoptimize) | Tối ưu tốc độ (gộp/nén CSS-JS) |
| **JMap** (com_jmap) | Sinh sitemap |
| **com_api** | REST API endpoint tuỳ biến (xem các file `api-*.php` ở thư mục gốc) |
| **RSFirewall!** (com_rsfirewall) | Bảo mật/tường lửa — **ĐÃ TẮT plugin khi chạy local** (xem SETUP-LOG) |

> Ở thư mục gốc còn có các file `api-*.php` và log `api-*-debug.log` — là script tích hợp
> tự viết để tạo/tải ảnh sản phẩm ZOO qua API (com_api). Không cần cho việc chạy local.

## 4. Cấu trúc thư mục (chuẩn Joomla)

```
beverage-vietnam/
├── administrator/     # Trang quản trị (backend)
├── components/        # com_zoo, com_content, com_sppagebuilder... (frontend logic)
├── modules/           # Module hiển thị (menu, slider, banner...)
├── plugins/           # Plugin hệ thống (rsfirewall, jch, sef...)
├── templates/         # sj_time (giao diện site), isis (giao diện admin)
├── libraries/         # Lõi Joomla + thư viện
├── media/ images/     # Ảnh, tài nguyên upload
├── language/          # Gói ngôn ngữ en-GB, vi-VN, ar-AA
├── cache/ tmp/ logs/  # Cache, file tạm, log
├── configuration.php  # ⚙️ Cấu hình chính (DB, path, SSL...)
├── .htaccess          # Rewrite SEF + redirect
└── beverage-vietnam-sql.sql  # 📦 Dump database (86MB) đã import
```

## 5. Dữ liệu chính trong DB

| Bảng | Nội dung | Số lượng |
|------|----------|----------|
| `odgal_zoo_item` | Sản phẩm (ZOO) | 710 |
| `odgal_zoo_category` | Danh mục sản phẩm (ZOO) | 12 |
| `odgal_content` | Bài viết (news/about/contact) | 141 published |
| `odgal_menu` | Menu điều hướng | 18 mục (Main Menu) |
| `odgal_users` | Người dùng | 1 (super admin `ritaweb`) |

## 6. Điểm cần lưu ý khi phát triển local

- `sef_rewrite = 1` → URL thân thiện, phụ thuộc mod_rewrite + `RewriteBase /beverage-vietnam/` trong `.htaccess`.
- `force_ssl` đã chuyển về `0` để chạy http trên localhost.
- Đường dẫn `log_path`, `tmp_path`, `cache_path` đã trỏ về ổ đĩa local.
- Email dùng SMTP Gmail (thông tin trong `configuration.php`) — gửi mail có thể lỗi/chậm trên local, không ảnh hưởng đăng nhập.
