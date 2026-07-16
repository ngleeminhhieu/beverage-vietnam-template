export default function gallery() {

    document.querySelectorAll('.gallery-block').forEach((block, index) => {
        block.querySelectorAll('a').forEach(link => {
            link.setAttribute('data-fancybox', `gallery-${index}`);
        });
    });

    if (typeof Fancybox !== "undefined") {
        Fancybox.bind("[data-fancybox]", {
            Thumbs: { showOnStart: false }
        });
    }
}