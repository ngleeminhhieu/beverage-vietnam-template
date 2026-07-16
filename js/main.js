import MobileModule from "./module/MobileModule.js";
import BtnToTopModule from "./module/BtnToTopModule.js";
import HeaderModule from "./module/HeaderModule.js";
import AnimatedModule from "./module/AnimatedModule.js";
import ComponentModule from "./module/ComponentModule.js";
import lazyLoadingModule from "./module/LazyLoadModule.js";
import AosModule from "./module/AosModule.js";

const loadLibraries = async (urls) => {
   for (const url of urls) {
      await new Promise((resolve, reject) => {
         let script = document.querySelector(`script[src="${url}"]`);
         if (script) {
            if (script.dataset.loaded || !script.dataset.loading) return resolve();
            script.addEventListener("load", resolve);
            script.addEventListener("error", reject);
            return;
         }
         script = document.createElement("script");
         script.src = url;
         script.dataset.loading = "true";
         script.onload = () => {
            script.dataset.loaded = true;
            delete script.dataset.loading;
            resolve();
         };
         script.onerror = reject;
         document.head.appendChild(script);
      });
   }
};

window.addEventListener("DOMContentLoaded", () => {

   MobileModule();
   BtnToTopModule();
   HeaderModule();
   AnimatedModule();
   ComponentModule();
   lazyLoadingModule();
   AosModule();

   const lazyModules = [

      {
         selector: ".popup",
         libraries: [],
         initModule: () => import("./module/PopupModule.js"),
      },
      {
         selector: "[data-cate-more]",
         libraries: [],
         initModule: () => import("./module/CategoryMoreModule.js"),
      },
      {
         selector: "[data-count]",
         libraries: [],
         initModule: () => import("./module/CountUpModule.js"),
      },
      {
         selector: ".tabJS, .notabJS",
         libraries: [],
         initModule: () => import("./module/TabModule.js"),
      },
      {
         selector: ".collapse-block, .cls-block, .faq__list, .collapse-item",
         libraries: [],
         initModule: () => import("./module/CollapseModule.js"),
      },
      {
         selector: ".article__side-fab",
         libraries: [],
         initModule: () => import("./module/SideNewsModule.js"),
      },
      {
         selector: ".swiper, .splide",
         libraries: [
            "./assets/library/splide/splide.min.js",
            "./assets/library/splide/splide-extension-auto-scroll.min.js",
            "./assets/library/swiper/swiper-bundle.min.js",
         ],
         initModule: () => import("./module/SwiperModule.js"),
      },
      {
         selector: ".re-select-main",
         libraries: ["./assets/library/select2/select2.min.js"],
         initModule: () => import("./module/Select2Module.js"),
      },
      {
         selector: "[data-fancybox]",
         libraries: ["./assets/library/fancybox/fancybox.umd.js"],
         initModule: () => import("./module/GalleryModule.js"),
      },
      {
         selector: "[data-spl]",
         libraries: ["./assets/library/splitting/splitting.min.js"],
         initModule: () => import("./module/TextAniModule.js"),
      },
      {
         selector: "body",
         libraries: [
            "./assets/library/smoothscroll/SmoothScroll.min.js",
         ],
         initModule: () => import("./module/SmoothScrollModule.js"),
      },
      {
         selector: ".leaf",
         libraries: [],
         initModule: () => import("./module/LeafModule.js"),
      },
      {
         selector: ".foundJS",
         libraries: [],
         initModule: () => import("./module/SearchModule.js"),
      },
      {
         selector: ".awards-item",
         libraries: [],
         initModule: () => import("./module/AwardsModule.js"),
      },
   ];

   const scanDOMAndLoad = () => {
      lazyModules.forEach((moduleTask) => {
         if (!moduleTask.loaded && document.querySelector(moduleTask.selector)) {
            moduleTask.loaded = true;
            loadLibraries(moduleTask.libraries)
               .then(() => moduleTask.initModule())
               .then((module) => {
                  if (typeof module.default === "function") {
                     module.default();
                  }
               })
               .catch((err) => console.error(`Lỗi khi tải module:`, err));
         }
      });
   };

   scanDOMAndLoad();

   window.reInitLazyModules = scanDOMAndLoad;
});
