export default function CollapseModule() {
    const clBlock = document.querySelectorAll(".collapse-block");
    if (clBlock) {
        clBlock.forEach((item) => {
            const clBody = item.querySelectorAll('.collapse-body');
            const clItems = item.querySelectorAll('.collapse-item')
            if (clBody) {
                $(clBody[0]).slideDown();
                if (clBody[0]) {
                    clBody[0].closest('.collapse-item').classList.add("active");
                }
            }
            if (clItems) {
                clItems.forEach(item => {
                    if (item.classList.contains('active')) {
                        const body = item.querySelector(".collapse-body")
                        $(body).slideDown();
                    }
                })
            }
            const head = item.querySelectorAll('.collapse-head');
            head.forEach(item => {
                item.addEventListener('click', () => {
                    clBody.forEach(item => {
                        $(item).slideUp();
                    })
                    clItems.forEach(item => {
                        $(item).removeClass("active");
                    })
                    const body = item.parentElement.querySelector(".collapse-body")
                    if (body) {
                        if (body.style.display == "none" || body.style.display == "") {
                            $(body).slideDown();
                            $(item.parentElement).addClass("active");
                        } else {
                            $(body).slideUp();
                            $(item.parentElement).removeClass("active");
                        }
                    }
                })
            })
        });
    }
    $(document).ready(function () {
        // Bắt sự kiện click vào nút collapse
        $(".cls-head").click(function (event) {
            event.stopPropagation();
            const collapseItem = $(this).closest(".cls-item");
            const content = collapseItem.find(".cls-body");
            
            if (content.css("display") === "none") {
                content.slideDown();
                collapseItem.addClass("active");
            } else {
                content.slideUp();
                collapseItem.removeClass("active");
            }
        });
    });

    const clBlockf = document.querySelectorAll(".cl-block");
    if (clBlockf) {
        clBlockf.forEach((item) => {
            const clBody = item.querySelectorAll('.cl-body');
            const clItems = item.querySelectorAll('.cl-item')
            
            if (clItems) {
                clItems.forEach(item => {
                    if (item.classList.contains('active')) {
                        const body = item.querySelector(".cl-body")
                        $(body).slideDown();
                    }
                })
            }
            const head = item.querySelectorAll('.cl-head');
            head.forEach(item => {
                item.addEventListener('click', () => {
                    clBody.forEach(item => {
                        $(item).slideUp();
                    })
                    clItems.forEach(item => {
                        $(item).removeClass("active");
                    })
                    const body = item.parentElement.querySelector(".cl-body")
                    if (body) {
                        if (body.style.display == "none" || body.style.display == "") {
                            $(body).slideDown();
                            $(item.parentElement).addClass("active");
                        } else {
                            $(body).slideUp();
                            $(item.parentElement).removeClass("active");
                        }
                    }
                })
            })
        });
    }
}