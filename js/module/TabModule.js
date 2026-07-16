export default function TabModule() {
    let tab = document.querySelectorAll(".tabJS");
    if (tab) {
        tab.forEach((t) => {
            let tBtn = t.querySelectorAll(".tabBtn");
            let tPanel = t.querySelectorAll(".tabPanel");
            let tBox = t.querySelectorAll(".tabBox");

            // for tab
            if (tBtn.length !== 0 && tPanel.length === tBtn.length) {
                tBtn[0].classList.add("active");
                // tBox[0].classList.add("active");
                tPanel[0].classList.add('open');
                $(tPanel[0]).slideDown();
                $(tBox[0]).slideDown();

                for (let i = 0; i < tBtn.length; i++) {
                    tBtn[i].addEventListener("click", showPanel);

                    function showPanel(e) {
                        e.preventDefault();
                        for (let a = 0; a < tBtn.length; a++) {
                            tBtn[a].classList.remove("active");
                            // tBox[a].classList.remove("active");
                            tPanel[a].classList.remove('open');
                            $(tPanel[a]).slideUp(400);
                            $(tBox[a]).slideUp(400);
                        }
                        tBtn[i].classList.add("active");
                        // tBox[i].classList.add("active");
                        tPanel[i].classList.add('open');
                        $(tPanel[i]).slideDown(400);
                        $(tBox[i]).slideDown(400);
                    }
                }
            }
        });
    }
    // =========
    let notab = document.querySelectorAll(".notabJS");
    if (notab) {
        notab.forEach((t) => {
            let tBtn = t.querySelectorAll(".notabBtn");
            let tPanel = t.querySelectorAll(".notabPanel");
            // remove swiper active

            // for tab
            if (tBtn.length !== 0 && tPanel.length === tBtn.length) {
                tBtn[0].classList.add("active");
                tPanel[0].classList.add('open');

                for (let i = 0; i < tBtn.length; i++) {
                    tBtn[i].addEventListener("click", showPanel);

                    function showPanel(e) {
                        e.preventDefault();
                        for (let a = 0; a < tBtn.length; a++) {
                            tBtn[a].classList.remove("active");
                            tPanel[a].classList.remove('open');
                        }
                        tBtn[i].classList.add("active");
                        tPanel[i].classList.add('open');

                    }
                }
            }
        });
    }
    // ===========
    const selectCerti = document.querySelector('.selectNor .re-select-main');
    const panels = document.querySelectorAll('.ab-certi__panel');

    if (selectCerti) {
        $(selectCerti).select2();

        const firstPanel = panels[0];
        if (firstPanel) {
            firstPanel.classList.add('open');
        }

        $(selectCerti).on('select2:select', function (e) {
            const selectedOption = e.params.data.element;
            const selectedValue = selectedOption.getAttribute('data-sl');


            panels.forEach(panel => {
                const panelValue = panel.getAttribute('data-sl-id');

                if (selectedValue === panelValue) {
                    panel.classList.add('open');
                } else {
                    panel.classList.remove('open');
                }
            });
        });
    }
    // ============
    const wrapper = document.querySelector('.guide-pro__box');
    if (!wrapper) return;
    const controls = wrapper.querySelectorAll('.guide-pro__ctrl');
    const contents = wrapper.querySelectorAll('.guide-prod__content');
    const updateTabs = (activeIndex) => {
        controls.forEach((ctrl, i) => {
            // Xử lý class cho các nút điều khiển
            ctrl.classList.remove('active', 'activated');
            if (i < activeIndex) {
                ctrl.classList.add('activated');
            } else if (i === activeIndex) {
                ctrl.classList.add('active');
            }

            // Xử lý hiển thị nội dung
            if (contents[i]) {
                contents[i].style.display = (i === activeIndex) ? 'block' : 'none';
            }
        });
    };
    updateTabs(0);
    controls.forEach((ctrl, index) => {
        ctrl.addEventListener('click', () => {
            updateTabs(index);
        });
    });
}
