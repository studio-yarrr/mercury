import Swiper from "swiper";

export function initAboutValueSlider() {
  const container = document.querySelector<HTMLElement>(".about-value__slider");
  const prevBtn = document.querySelector<HTMLElement>(
    ".about-value .default-btn[data-prev]",
  );
  const nextBtn = document.querySelector<HTMLElement>(
    ".about-value .default-btn[data-next]",
  );

  if (container) {
    new Swiper(container, {
      speed: 600,
      navigation: {
        prevEl: prevBtn,
        nextEl: nextBtn,
      },
      breakpoints: {
        834: {
          slidesPerView: 2,
        },
      },
    });
  }
}
