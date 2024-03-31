import VenoBox from "venobox/dist/venobox";
import { formValidateInit } from "./fv";
import {
  initDefaultSwipers,
  initDropdownItems,
  initMenuItems,
  initSelectInputs,
  scrollUpHandler,
} from "./utils";
import {
  Navigation,
  Pagination,
  Scrollbar,
  Thumbs,
  FreeMode,
} from "swiper/modules";
import Swiper from "swiper";
import { textInputHandler } from "@components/TextInput/TextInput";
import { initMeaderMenu } from "@modules/Header/Header";
import { initMainBannerSlider } from "@modules/Main/MainBanner/MainBanner";
import { initMainAbout } from "@modules/Main/MainAbout/MainAbout";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { initSpinner } from "@components/Spinner/Spinner";
import { initMainCategoryAnim } from "@modules/Main/MainCategory/MainCategory";
import { initProductHeadSwiper } from "@modules/Product/ProductHead/ProductHead";
import { initLeasingSteps } from "@modules/Leasing/Leasing";
import { initAboutHistory } from "@modules/About/AboutHistory/AboutHistory";
import { initAboutValueSlider } from "@modules/About/AboutValue/AboutValue";

Swiper.use([Navigation, Pagination, Scrollbar, Thumbs, FreeMode]);
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  initSpinner();

  formValidateInit(".fv");
  initDropdownItems();
  initSelectInputs();
  initMenuItems();
  initDefaultSwipers();

  initMeaderMenu();
  initMainBannerSlider();

  initMainAbout();
  initMainCategoryAnim();

  initProductHeadSwiper();
  initLeasingSteps();
  initAboutHistory();
  initAboutValueSlider();

  initFadeAnim();

  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;

    textInputHandler(target);
    scrollUpHandler(target);
    categoryFilterHandler(target);
  });

  let resizeID = 0;
  window.addEventListener("resize", () => {
    clearTimeout(resizeID);
    resizeID = setTimeout(() => {
      ScrollTrigger.refresh();
      ScrollTrigger.update();
    }, 200);
  });

  let dropID = 0;
  document.addEventListener("dropdown", () => {
    clearTimeout(dropID);
    dropID = setTimeout(() => {
      ScrollTrigger.refresh();
      ScrollTrigger.update();
    }, 600);
  });
});

const vboxOptions = {
  overlayColor: "rgba(22, 22, 22, 0.45)",
  bgcolor: null,
  spinner: "grid",
  onContentLoadedEvent: new Event("vBoxContentLoaded", { bubbles: true }),
  onContentLoaded: (): void => {
    console.log(this);
    // document.dispatchEvent(this.)
  },
  onPreOpen: (): void => {
    vBox.isOpen = true;
  },
  onPreClose: (): void => {
    vBox.isOpen = false;
  },
};

const vBox = new VenoBox(vboxOptions);

(window as any).vBox = vBox;
(window as any).openVBox = openVBox;

function openVBox(src: string, vbtype?: string) {
  const link = document.createElement("a");
  link.href = src;
  link.dataset.vbtype = vbtype ? vbtype : "ajax";
  (link as any).settings = vBox.settings;

  vBox.close();
  setTimeout(() => {
    vBox.open(link);
  }, 500);
}

function initFadeAnim() {
  const items = document.querySelectorAll<HTMLElement>("[data-fade-anim]");

  if (items.length > 0) {
    ScrollTrigger.batch(items, {
      once: true,
      start: "-100% bottom",
      onEnter: (batch) => {
        gsap.to(batch, {
          duration: 0.8,
          opacity: 1,
          translateY: 0,
          stagger: { each: 0.2, grid: [1, 2] },
          overwrite: true,
        });
      },
    });
  }
}

function categoryFilterHandler(target: HTMLElement) {
  if (target.closest("[data-toggle-filter]")) {
    document.body.classList.toggle("_open-filter");
    return;
  }

  if (target.closest("[data-close-filter]")) {
    document.body.classList.remove("_open-filter");
    return;
  }

  if (target.closest("[data-open-filter]")) {
    document.body.classList.add("_open-filter");
    return;
  }
}
