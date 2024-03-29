import Swiper from "swiper";

export function initProductHeadSwiper() {
  const mainContainer = document.querySelector<HTMLElement>(
    ".product-head-swiper__main",
  );
  const navContainer = document.querySelector<HTMLElement>(
    ".product-head-swiper__nav",
  );

  if (mainContainer && navContainer) {
    const navSwiper = new Swiper(navContainer, {
      direction: "vertical",
      slidesPerView: "auto",
      spaceBetween: 10,
      freeMode: true,
    });
    const mainSwiper = new Swiper(mainContainer, {
      thumbs: {
        swiper: navSwiper,
      },
    });
  }
}
