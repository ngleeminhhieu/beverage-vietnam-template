export default function CountUpModule() {
   const nodes = document.querySelectorAll("[data-count]");
   if (!nodes.length) return;

   const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");
   const format = (n) => String(n);

   const animate = (el) => {
      const target = Number(el.dataset.count) || 0;
      const duration = Number(el.dataset.countDur) || 1400;

      if (reduceMq.matches) {
         el.textContent = format(target);
         return;
      }

      const start = performance.now();
      const easeOut = (t) => 1 - Math.pow(1 - t, 3);

      const tick = (now) => {
         const t = Math.min((now - start) / duration, 1);
         el.textContent = format(Math.round(target * easeOut(t)));
         if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
   };

   const io = new IntersectionObserver(
      (entries, obs) => {
         entries.forEach((entry) => {
            if (entry.isIntersecting) {
               animate(entry.target);
               obs.unobserve(entry.target);
            }
         });
      },
      { threshold: 0.35 }
   );

   nodes.forEach((el) => {
      const chars = String(Number(el.dataset.count) || 0).length;
      el.style.display = "inline-block";
      el.style.minWidth = chars + "ch";
      el.style.textAlign = "right";
      el.textContent = "0";
      io.observe(el);
   });
}
