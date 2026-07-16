export default function SideNewsModule() {
   const side = document.querySelector(".article__side");
   if (!side) return;
   const fab = side.querySelector(".article__side-fab");
   const overlay = side.querySelector(".article__side-overlay");
   const closeBtn = side.querySelector(".article__side-close");
   if (!fab) return;

   const close = () => {
      side.classList.remove("is-open");
      fab.setAttribute("aria-expanded", "false");
      document.body.classList.remove("no-scroll");
   };
   const open = () => {
      document.dispatchEvent(new CustomEvent("panel:open", { detail: "side-news" }));
      side.classList.add("is-open");
      fab.setAttribute("aria-expanded", "true");
      document.body.classList.add("no-scroll");
   };

   fab.addEventListener("click", open);
   if (overlay) overlay.addEventListener("click", close);
   if (closeBtn) closeBtn.addEventListener("click", close);

   side.querySelectorAll(".side-news a").forEach((a) => a.addEventListener("click", close));
   document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
   });

   document.addEventListener("panel:open", (e) => {
      if (e.detail !== "side-news") close();
   });
}
