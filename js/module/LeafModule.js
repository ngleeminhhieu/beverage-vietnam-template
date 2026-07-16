export default function LeafModule() {
    function LeafCall() {
        const cvsx = document.querySelectorAll(".leaf")
        if (!cvsx) return;

        cvsx.forEach(cvs => {
            const ctx = cvs.getContext("2d");
            const speed = parseFloat(cvs.dataset.speed || 1);
            const qty = parseInt(cvs.dataset.quality || 50, 10);
            const sizeMul = parseFloat(cvs.dataset.size || 1);

            // CẢI THIỆN: Chỉ lấy ảnh thuộc về box-leaf chứa canvas này
            const parentBox = cvs.closest('.box-leaf');
            const domImgs = parentBox 
                ? [...parentBox.querySelectorAll(".box-leaf-imgs img")] 
                : [...document.querySelectorAll(".box-leaf-imgs img")];

            const waitFor = (img) => {
                if (img.complete && img.naturalWidth) return Promise.resolve();
                if ("decode" in img) return img.decode().catch(() => { });
                return new Promise((res, rej) => {
                    img.addEventListener("load", res, { once: true });
                    img.addEventListener("error", rej, { once: true });
                }).catch(() => { });
            };
            Promise.all(domImgs.map(waitFor)).then(start).catch(start);

            function start() {
                const imgs = domImgs.filter((i) => i.naturalWidth > 0);
                if (!imgs.length) return console.warn("Không có ảnh hợp lệ.");

                let W, H;
                const DPR = Math.min(2, window.devicePixelRatio || 1);
                const resize = () => {
                    W = cvs.clientWidth;
                    H = cvs.clientHeight;
                    cvs.width = W * DPR;
                    cvs.height = H * DPR;
                    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
                };
                resize();
                addEventListener("resize", resize);

                const leaves = Array.from({ length: qty }, () => ({
                    // SỬA: Random đều tất cả các ảnh tìm được
                    img: imgs[Math.floor(Math.random() * imgs.length)],
                    x: Math.random() * W,
                    y: Math.random() * H,
                    vy: (0.5 + Math.random()) * speed,
                    vx: (Math.random() - 0.5) * 0.5 * speed,
                    s: (0.4 + Math.random() * 0.6) * sizeMul,
                    r: Math.random() * 6.283,
                    rv: (Math.random() - 0.5) * 0.02,
                    skewAmp: 0.2 + Math.random() * 0.3,
                    skewPhase: Math.random() * 6.283
                }));

                let rafId = 0,
                    lastTS = 0,
                    visible = false;
                function frame(ts) {
                    rafId = 0;
                    const t = ts || performance.now();
                    ctx.clearRect(0, 0, W, H);
                    for (const f of leaves) {
                        if (!f.img?.naturalWidth) continue;
                        f.x += f.vx;
                        f.y += f.vy;
                        f.r += f.rv;
                        if (f.y > H + 40) {
                            f.y = -40;
                            f.x = Math.random() * W;
                        }
                        const iw = f.img.naturalWidth,
                            ih = f.img.naturalHeight;
                        const skewX = Math.sin(t / 500 + f.skewPhase) * f.skewAmp;
                        ctx.save();
                        ctx.translate(f.x, f.y);
                        ctx.rotate(f.r);
                        ctx.transform(1, skewX, 0, 1, 0, 0);
                        ctx.drawImage(
                            f.img,
                            (-iw * f.s) / 2,
                            (-ih * f.s) / 2,
                            iw * f.s,
                            ih * f.s
                        );
                        ctx.restore();
                    }
                    if (visible) rafId = requestAnimationFrame(frame);
                    lastTS = t;
                }
                const play = () => {
                    if (!rafId) {
                        visible = true;
                        rafId = requestAnimationFrame(frame);
                    }
                };
                const stop = () => {
                    visible = false;
                    if (rafId) {
                        cancelAnimationFrame(rafId);
                        rafId = 0;
                    }
                };

                const io = new IntersectionObserver(
                    ([e]) => {
                        e && (e.isIntersecting ? play() : stop());
                    },
                    { threshold: 0.1 }
                );
                io.observe(cvs);

                document.addEventListener("visibilitychange", () =>
                    document.hidden ? stop() : (io.takeRecords(), play())
                );
            }
        });
    }
    LeafCall();

    document.addEventListener("sectionCallLoaded", (e) => {
        LeafCall();
    })
}