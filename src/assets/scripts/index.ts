import VenoBox from "venobox/dist/venobox";
import { formValidateInit } from "./fv";
import {
  counterHandler,
  initDefaultSwipers,
  initDropdownItems,
  initMenuItems,
  initSelectInputs,
  scrollUpHandler,
  vCloseHandler,
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
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { initSpinner } from "@components/Spinner/Spinner";
import { initMainCategoryAnim } from "@modules/Main/MainCategory/MainCategory";
import { initProductHeadSwiper } from "@modules/Product/ProductHead/ProductHead";
import { initLeasingSteps } from "@modules/Leasing/Leasing";
import { initAboutHistory } from "@modules/About/AboutHistory/AboutHistory";
import { initAboutValueSlider } from "@modules/About/AboutValue/AboutValue";
import { Sidebar, SidebarController } from "@modules/Sidebar/Sidebar";

Swiper.use([Navigation, Pagination, Scrollbar, Thumbs, FreeMode]);
gsap.registerPlugin(ScrollTrigger);

const VBOX_OPTIONS = {
  selector: "[data-vopen]",
  overlayColor: "rgba(0, 0, 0, 0.75)",
  bgcolor: null,
  spinner: "grid",
  onContentLoadedEvent: new Event("vBoxContentLoaded", { bubbles: true }),
  onContentLoaded: (): void => {
    document.dispatchEvent(VBOX_OPTIONS.onContentLoadedEvent);
  },
};

const vBox = new VenoBox(VBOX_OPTIONS);

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

document.addEventListener("DOMContentLoaded", () => {
  const sidebarController = new SidebarController();

  document.querySelectorAll<HTMLElement>("[data-sidebar]").forEach((el) => {
    const key = el.getAttribute("data-sidebar");
    if (key) {
      new Sidebar(sidebarController, el, key);
    }
  });

  initSpinner();

  formValidateInit(".fv");
  initDropdownItems();
  initSelectInputs();
  initMenuItems();
  initDefaultSwipers();

  initMeaderMenu();
  initMainBannerSlider();

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
    vCloseHandler(target);
    counterHandler(target);

    sidebarController.clickHandler(target);
  });

  document.addEventListener("vBoxContentLoaded", () => {
    formValidateInit(".popup .fv");
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
