# SITEMAP — RITA Beverage

Cấu trúc điều hướng lấy từ bảng `odgal_menu` (Main Menu, đã publish). Site 1 cấp menu chính
với PRODUCTS là menu cha đổ ra 12 danh mục sản phẩm.

## Menu chính (Main Menu)

```
🏠 HOME                       → Bài viết (com_content, id=46)   [Trang chủ mặc định]
ℹ️  ABOUT US                   → Bài viết (com_content, id=47)
🧃 PRODUCTS                    → ZOO frontpage (com_zoo)
     ├─ Fruit Juice           → ZOO category  (products/fruit-drink)
     ├─ Bird's Nest           → ZOO category  (products/bird-s-nest)
     ├─ Aloe Vera Juice       → ZOO category  (products/aloe-vera-juice)
     ├─ Coconut Water         → ZOO category  (products/coconut-products)
     ├─ Soft Drink            → ZOO category  (products/soft-drink)
     ├─ Energy Drink          → ZOO category  (products/energy-drink-series)
     ├─ Coffee Drink          → ZOO category  (products/coffee-drink-series)
     ├─ Milk Series           → ZOO category  (products/milk-series)
     ├─ Non-Alcohol Beverage  → ZOO category  (products/non-alcohol-beverage)
     ├─ Chia and Basil seed   → ZOO category  (products/chia-and-basil-seed)
     ├─ Carbonate Drink       → ZOO category  (products/carbonated-drink)
     └─ Tea-Honey and Fruit   → ZOO category  (products/tea-honey-and-fruit)
📰 NEWS                       → Blog category (com_content, category id=8)
✉️  CONTACT                    → Bài viết (com_content, id=51)
🏷️  Tags                       → com_tags (danh sách tag)
```

## Các loại trang & thành phần render

| Trang | URL (SEF) | Component | Ghi chú |
|-------|-----------|-----------|---------|
| Trang chủ | `/` hoặc `/home` | com_content | Bài viết id 46 + slider/module trang chủ |
| Giới thiệu | `/about-us` | com_content | Bài viết id 47 |
| Sản phẩm (tổng) | `/products` | **com_zoo** frontpage | Trang giới thiệu toàn bộ dòng sản phẩm |
| Danh mục sản phẩm | `/products/<slug>` | **com_zoo** category | 12 danh mục (bảng phía trên) |
| Chi tiết sản phẩm | `/products/<slug>/<item>` | **com_zoo** item | 710 sản phẩm |
| Tin tức | `/news` | com_content (blog) | Category id 8 |
| Chi tiết tin | `/news/<article>` | com_content article | |
| Liên hệ | `/contact` | com_content | Bài viết id 51 + form liên hệ |
| Tags | `/tags` | com_tags | |

## Cách tự lấy lại sitemap từ DB

```sql
SELECT CONCAT(REPEAT('  ', level-1), title) AS menu, link, published
FROM odgal_menu
WHERE menutype='mainmenu' AND client_id=0 AND published=1
ORDER BY lft;
```

> Website còn sinh XML sitemap tự động qua extension **JMap** (thường ở `/index.php?option=com_jmap&view=sitemap&format=xml`).
