import Swiper from "swiper";

export function initAboutHistory() {
  const container = document.querySelector<HTMLElement>(
    ".about-history-slider",
  );

  if (container) {
    new Swiper(container, {
      speed: 800,
      allowTouchMove: false,
      navigation: {
        prevEl: "[data-prev]",
        nextEl: "[data-next]",
      },
      pagination: {
        el: ".about-history-slider__progress",
        type: "progressbar",
        progressbarFillClass: "grad-bg",
      },
    });
  }
}
