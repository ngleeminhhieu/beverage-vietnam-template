# SETUP LOG — Dựng RITA Beverage trên localhost

**Ngày dựng:** 2026-07-13
**Môi trường:** XAMPP trên Windows 10 · Apache 2.4.54 (port 80) · MariaDB 10.4.27 (port 3306) · PHP 7.4.33

---

## 🔑 THÔNG TIN ĐĂNG NHẬP (quan trọng)

### Website
| | |
|--|--|
| **Frontend** | http://beverage-vietnam.local/  *(mới — chạy ở gốc domain, xem mục Virtual Host bên dưới)* |
| **Admin (backend)** | http://beverage-vietnam.local/administrator/ |
| **Username** | `ritaweb` |
| **Password** | `Rita@2026` |
| Email tài khoản | marketing@rita.com.vn |

> URL cũ `http://localhost/beverage-vietnam/` (chạy trong thư mục con) **không còn dùng** sau khi chuyển sang vhost — vì `.htaccess` `RewriteBase` đã đổi về `/` và nhiều asset hardcode đường dẫn gốc (`/images/...`) bị gãy ở thư mục con.

> ⚠️ Mật khẩu gốc trên server thật đã bị mã hoá bcrypt (không đọc được), nên khi dựng
> local mình đã **reset mật khẩu** của user `ritaweb` thành `Rita@2026`.

### Database
| | |
|--|--|
| Tên DB | `u487708776_be` |
| User (khớp config) | `u487708776_be` / mật khẩu `Ok8miD26LW` |
| Root (XAMPP) | `root` / *không mật khẩu* |
| phpMyAdmin | http://localhost/phpmyadmin/ |
| Prefix bảng | `odgal_` |

---

## 📋 CÁC BƯỚC ĐÃ THỰC HIỆN

1. **Nhận diện dự án:** Joomla 3.10.12 (site "RITA Beverage"). Đọc `configuration.php` lấy thông tin DB.
2. **Tạo database & user MySQL:**
   ```sql
   CREATE DATABASE u487708776_be CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   CREATE USER 'u487708776_be'@'localhost' IDENTIFIED BY 'Ok8miD26LW';
   GRANT ALL PRIVILEGES ON u487708776_be.* TO 'u487708776_be'@'localhost';
   ```
3. **Import dump** `beverage-vietnam-sql.sql` (86MB) → 129 bảng, 710 sản phẩm, 141 bài viết. Không lỗi.
   (Dump từ MariaDB 11.8 nhưng không có collation `uca1400`, tương thích MariaDB 10.4.)
4. **Reset mật khẩu admin** `ritaweb` → `Rita@2026` (bcrypt), đảm bảo `block=0`, `requireReset=0`.
5. **Kiểm tra & sửa lỗi** đến khi frontend + admin trả về HTTP 200 và đăng nhập được (xem bên dưới).

---

## ✏️ CÁC FILE ĐÃ SỬA (để chạy local)

### `configuration.php`  *(bản gốc lưu tại `configuration.php.bak`)*
| Thuộc tính | Gốc (server thật) | Sửa thành (local) | Lý do |
|-----------|-------------------|-------------------|-------|
| `force_ssl` | `'1'` | `'0'` | Localhost không có HTTPS, tránh redirect vòng lặp |
| `log_path` | `/home/u487708776/.../logs` | `C:/xampp/htdocs/beverage-vietnam/logs` | Đường dẫn Windows |
| `tmp_path` | `/home/u487708776/.../tmp` | `C:/xampp/htdocs/beverage-vietnam/tmp` | Đường dẫn Windows |
| `cache_path` | `/home/u487708776/.../cache` | `C:/xampp/htdocs/beverage-vietnam/cache` | Đường dẫn Windows |

### `.htaccess`
| Sửa | Lý do |
|-----|-------|
| `RewriteBase /` (ban đầu `/beverage-vietnam/` cho thư mục con, **đã đổi về `/`** cho vhost gốc) | `/` đúng cho cả vhost local lẫn production. Giá trị `/beverage-vietnam/` là hack local, sẽ gây lỗi (404 trang SEF) trên vhost & prod. |
| Redirect ép domain `https://beverage-vietnam.com/` **vẫn BẬT**, thêm 2 dòng ngoại lệ bỏ qua host `beverage-vietnam.local` + `localhost` | Giữ hành vi prod (ép HTTPS/canonical) nhưng không đá host local sang site thật |

> ✅ **Về `.htaccess` khi nén source lên prod:** file đã **prod-ready** — `RewriteBase /` đúng chuẩn root install; redirect ép HTTPS đang bật; 2 dòng ngoại lệ `.local`/`localhost` **vô hại trên prod** (host prod là `beverage-vietnam.com`, không bao giờ khớp). ⇒ Không cần chỉnh gì trong `.htaccess` trước khi go-live.

### Database (bảng `odgal_extensions`)
| Sửa | Lý do |
|-----|-------|
| Tắt plugin **System - RSFirewall! Active Scanner** (`extension_id=10120`, `enabled=0`) | Plugin chặn mọi request local với lỗi **"403 – Malware detected"**. Tắt để chạy local. |

---

## 🌐 VIRTUAL HOST — chạy site ở gốc domain (`beverage-vietnam.local`)

**Lý do:** nhiều asset của site hardcode đường dẫn gốc (logo footer, module custom, canonical…) kiểu `/images/logo.png`. Ở thư mục con `/beverage-vietnam/` chúng trỏ sai (`http://localhost/images/...`) → gãy ảnh. Bản prod chạy ở gốc domain nên các path đó vốn đúng → giải pháp: giả lập vhost để local cũng chạy ở gốc.

**Các file đã tạo/sửa (KHÔNG nằm trong source dự án — an toàn khi nén up prod):**

1. `C:\xampp\apache\conf\extra\httpd-vhosts.conf` — thêm 2 vhost:
   - `localhost` → `C:/xampp/htdocs` (giữ default để phpMyAdmin & project khác còn chạy).
   - `beverage-vietnam.local` → `C:/xampp/htdocs/beverage-vietnam`.
   - (Đã validate `httpd.exe -t` → *Syntax OK*.)
2. `.htaccess` (trong dự án): `RewriteBase /` (xem trên).

**2 BƯỚC CÒN LẠI cần quyền Admin (người dùng tự chạy):**

1. Thêm dòng vào `C:\Windows\System32\drivers\etc\hosts` (mở PowerShell **as Administrator**):
   ```powershell
   Add-Content -Path "$env:windir\System32\drivers\etc\hosts" -Value "`n127.0.0.1`tbeverage-vietnam.local"
   ```
2. **Khởi động lại Apache** (XAMPP Control Panel → Stop → Start Apache).

Sau đó mở `http://beverage-vietnam.local/`. Nếu asset còn lỗi do cache JCH: xoá `cache/` + `administrator/cache/` hoặc *System → Clear Cache*.

**Khôi phục (bỏ vhost, quay lại thư mục con):** xoá 2 khối vhost trong `httpd-vhosts.conf`, xoá dòng hosts, đổi `.htaccess` về `RewriteBase /beverage-vietnam/`, restart Apache.

---

## ✅ KẾT QUẢ KIỂM TRA (verify)

- Frontend `http://localhost/beverage-vietnam/` → **HTTP 200**, title *"Manufacturers beverage | Good health - Good taste - RITA Beverage"*.
- Admin `http://localhost/beverage-vietnam/administrator/` → **HTTP 200**, trang đăng nhập hiện.
- Đăng nhập `ritaweb` / `Rita@2026` → thành công (vào được Control Panel, có nút Logout).

---

## 🔁 KHÔI PHỤC VỀ CẤU HÌNH SERVER THẬT (nếu deploy lại)

Khi đưa code lên lại hosting production, cần hoàn nguyên:
1. `configuration.php`: đặt lại `force_ssl='1'` và các `*_path` về `/home/u487708776/...` (hoặc copy lại từ `.bak`).
2. `.htaccess`: **giữ nguyên** — đã prod-ready (`RewriteBase /` + redirect ép HTTPS đang bật, kèm ngoại lệ local vô hại). KHÔNG đổi lại `/beverage-vietnam/`.
3. Bật lại plugin **RSFirewall!** (`enabled=1`) trong Extensions.
4. Đổi lại mật khẩu admin về mật khẩu thật.

> 📦 **Nén source up prod — file nào an toàn?** Cấu hình vhost (`httpd-vhosts.conf`) và file `hosts` **nằm ngoài thư mục dự án** → không bị nén vào, không ảnh hưởng prod. Trong dự án chỉ có `.htaccess` + `configuration.php` là mang trạng thái local; xử lý theo 4 bước trên trước khi go-live (đừng zip-and-upload thẳng).

---

## 🛠️ GHI CHÚ VẬN HÀNH LOCAL

- Muốn **xoá cache** nếu giao diện lỗi: xoá nội dung thư mục `cache/` và `administrator/cache/`, hoặc trong admin: *System → Clear Cache*.
- File `configuration.php.bak` là bản cấu hình gốc của server thật — đừng xoá.
- Nếu cần tắt gửi email trên local: đặt `mailonline='0'` trong `configuration.php`.
