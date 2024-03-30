import gsap from "gsap";

export function initLeasingSteps() {
  const container = document.querySelector<HTMLElement>(".leasing-steps");
  const items =
    container && container.querySelectorAll<HTMLElement>(".leasing-steps-item");

  if (container && items) {
    const TL = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: `500px 80%`,
        end: `bottom 80%`,
        scrub: true,
        pin: true,
      },
    });

    items.forEach((item, index) => {
      if (index === 0) {
        TL.to(item, {
          opacity: 0.15,
          color: "rgba(255,255,255,0)",
          duration: 4,
        });
      } else {
        TL.from(
          item,
          {
            marginTop: "4rem",
            duration: 4,
          },
          "-=4",
        );

        if (index !== items.length - 1) {
          TL.to(item, {
            opacity: 0.15,
            color: "rgba(255,255,255,0)",
            duration: 4,
          });
        }
      }
    });
  }
}
