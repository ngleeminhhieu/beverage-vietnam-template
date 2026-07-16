export default function HeaderModule() {
    const main = document.querySelector(".main")
    const header = document.querySelector(".hd");
    const mobile = document.querySelector(".mobile");
    const mobileOverlay = document.querySelector(".mobile-overlay");
    function HandleHeader() {
        if (header && mobile && mobileOverlay) {
            if (window.scrollY > 0) {
                main.classList.add("hd-sticky");
                header.classList.add("sticky");
                mobile.classList.add("sticky");
                mobileOverlay.classList.add("sticky");
            } else {
                header.classList.remove("sticky");
                mobile.classList.remove("sticky");
                mobileOverlay.classList.remove("sticky");
                main.classList.remove("hd-sticky");
            }
        }
    }
    window.addEventListener("scroll", function () {
        HandleHeader();
    });
    HandleHeader();

    // search

    // 1. Tìm wrapper tổng chứa toàn bộ cụm search
    const hdSrch = document.querySelector(".hd-srch");

    // Nếu không tồn tại cụm search trên trang này thì dừng luôn, tránh báo lỗi
    if (!hdSrch) return;

    // 2. Tìm các phần tử con
    const hdSrchform = document.querySelector(".foundJS");
    // Đảm bảo foundJS tồn tại thì mới tìm input bên trong nó
    const hdSrchIp = hdSrchform ? hdSrchform.querySelector("input") : null;

    document.addEventListener("click", (e) => {
        // Kiểm tra xem click vào Nút Đóng hoặc Overlay không
        const isClickOverlay = e.target.closest(".foundOver");
        const isClickClose = e.target.closest(".foundClose"); // Đề phòng bạn có nút đóng riêng

        // Kiểm tra click vào vùng Search (Thêm cả .foundbox-wr theo cấu trúc ảnh bạn gửi)
        const isClickSearchArea = e.target.closest(".hd-srch") || e.target.closest(".foundbox-wr") || e.target.closest(".found-wr");

        // LOGIC: Nếu click Overlay/Đóng, HOẶC click ra hẳn bên ngoài -> ĐÓNG
        if (isClickOverlay || isClickClose || !isClickSearchArea) {
            if (hdSrchform) hdSrchform.classList.remove("open");
            $("body").css("overflow", "");
        }
        // LOGIC: Click vào biểu tượng search / vùng search -> MỞ
        else {
            if (hdSrchform) hdSrchform.classList.add("open");
            $("body").css("overflow", "hidden");

            // Delay 100ms chờ animation mở form xong mới focus vào ô input
            setTimeout(() => {
                if (hdSrchIp) hdSrchIp.focus();
            }, 100);
        }
    });



    
    // 
    const filter = document.querySelector(".hd-filter")
    const filterOpen = document.querySelector(".hd-filter-open")
    if (filterOpen && filter) {
        document.addEventListener("click", (e) => {
            if (e.target.matches(".hd-filter, .hd-filter *") || e.target.matches(".hd-filter-open, .hd-filter-open *")) {
                filter.classList.add("open");
                setTimeout(() => {
                    hdSrchIp.focus();
                }, 100)
            } else {
                filter.classList.remove("open");
            }
        })
    }


    const hdCate = document.querySelector(".hdCateJS")
    if (hdCate) {
        const hdCateOpen = hdCate.querySelector(".hd-cate-open")
        const hdCateBody = hdCate.querySelector(".hd-cate-body")
        document.addEventListener("click", (e) => {
            if (hdCateOpen.contains(e.target) || hdCateBody.contains(e.target)) {
                if (hdCateBody.className.includes("open") && !hdCateBody.contains(e.target)) {
                    hdCateBody.classList.remove("open");
                } else {
                    hdCateBody.classList.add("open");
                }
            } else {
                hdCateBody.classList.remove("open");
            }
        })
    }



    const cart = document.querySelector(".cartJS")
    const cartBtn = document.querySelector(".cartBtnJS")
    const cartFixBtn = document.querySelector(".fixedNavCartJS")
    if (cart && cartBtn && cartFixBtn) {
        const cartClose = cart.querySelector(".cartCloseJS")
        const cartBox = cart.querySelector(".cartBoxJS")
        document.addEventListener("click", (e) => {
            if (cartFixBtn.contains(e.target) || cartBtn.contains(e.target) || cartBox.contains(e.target) && !cartClose.contains(e.target)) {
                cart.classList.add("open")
            } else {
                cart.classList.remove("open")
            }
        })
    }



    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            $("body").removeClass("no-scroll")
            $("body").css("overflow", "hidden auto")
            const popup = document.querySelector('.popup.active');
            if (popup) popup.classList.remove('active');
            const menu = document.querySelector('.mobile.open');
            const bg = document.querySelector(".hamburger")
            const menuOver = document.querySelector(".mobile-overlay.open")
            if (menu) {
                menu.classList.remove('open');
                menuOver.classList.remove('open');
                bg.classList.remove("active")
            }
            const cart = document.querySelector('.cartJS.open');
            if (cart) cart.classList.remove('open');
            const found = document.querySelector(".foundJS.open")
            if (found) found.classList.remove('open');


        }
    });


    const headerDiv = document.querySelector(".hd");

    if (headerDiv) {
        let prevScrollpos = window.scrollY;
        function hideHeader() {
            let currentScrollPos = window.scrollY;
            if (window.scrollY > headerDiv.clientHeight) {
                headerDiv.classList.add("hd-custom");
                if (prevScrollpos > currentScrollPos || currentScrollPos < headerDiv.headerBottom) {
                    headerDiv.classList.remove("hide-hd");
                } else {
                    headerDiv.classList.add("hide-hd");
                }
                prevScrollpos = currentScrollPos;
            } else {
                headerDiv.classList.remove("hd-custom");
            }
        }

        hideHeader();
        window.addEventListener("scroll", hideHeader);
    }

}