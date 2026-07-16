export default function AwardsModule() {
   const items = document.querySelectorAll(".awards-item");
   if (!items.length) return;

   const desktopMq = window.matchMedia("(min-width: 1025px)");
   const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");

   if (!desktopMq.matches || reduceMq.matches) {
      items.forEach((el) => el.classList.add("is-active"));
      return;
   }

   const io = new IntersectionObserver(
      (entries) => {
         entries.forEach((entry) => {
            entry.target.classList.toggle("is-active", entry.isIntersecting);
         });
      },
      { threshold: 0.55 }
   );

   items.forEach((el) => io.observe(el));
}
