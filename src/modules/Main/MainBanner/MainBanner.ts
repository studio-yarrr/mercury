import Swiper from "swiper";

export function initMainBannerSlider() {
  const container = document.querySelector<HTMLElement>(
    ".main-banner-slider .swiper",
  );
  const progress =
    container &&
    container.querySelector<HTMLElement>(".main-banner-slider__progress");
  const prevBtn =
    container &&
    container.querySelector<HTMLElement>(".main-banner-slider__btn[data-prev]");
  const nextBtn =
    container &&
    container.querySelector<HTMLElement>(".main-banner-slider__btn[data-next]");

  if (container && progress && prevBtn && nextBtn) {
    new Swiper(container, {
      speed: 800,
      navigation: {
        prevEl: prevBtn,
        nextEl: nextBtn,
      },
      scrollbar: {
        el: progress,
      },
    });
  }
}
