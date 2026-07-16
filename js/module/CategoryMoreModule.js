

export default function CategoryMoreModule() {
    document.querySelectorAll("[data-cate-more]").forEach((root) => {
        const btn = root.querySelector("[data-cate-toggle]");
        if (!btn) return;
        btn.addEventListener("click", () => {
            root.classList.add("is-expanded");
            const wrap = btn.closest(".grid-more__foot");
            if (wrap) wrap.style.display = "none";
        });
    });
}
