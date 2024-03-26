import gsap from "gsap";

export function initMainProdAnim() {
  const about = document.querySelector(".main-about");
  const container = document.querySelector<HTMLElement>(".main-products");

  if (container) {
    const TL = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "1000 bottom",
        scrub: true,
        // markers: true,
      },
    });

    TL.to(
      container,
      {
        marginTop: "-50rem",
        duration: 6,
      },
      "sin",
    );

    if (about) {
      TL.to(
        about,
        {
          duration: 3,
          opacity: 0,
        },
        "sin",
      );
    }
  }
}
