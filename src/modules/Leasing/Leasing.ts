import gsap from "gsap";

export function initLeasingSteps() {
  const container = document.querySelector<HTMLElement>(".leasing-steps");
  const items =
    container && container.querySelectorAll<HTMLElement>(".leasing-steps-item");

  if (container && items) {
    const TL = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: `top 20%`,
        end: `${items.length * 200}% bottom`,
        pin: true,
        pinSpacing: true,
        scrub: true,
      },
    });

    const itemsTL = gsap.timeline();

    items.forEach((item, index) => {
      if (index === 0) {
        itemsTL.from(item, {
          opacity: 1,
          color: "rgba(255,255,255,1)",
          "--progress": 1,
          duration: 4,
        });
      } else {
        item.style.setProperty("z-index", (100 - index).toString());

        itemsTL.from(
          item,
          {
            top: "150%",
            duration: 4,
            onComplete: () => {
              item.style.setProperty("z-index", "1");
            },
            onUpdate: () => {
              item.style.setProperty("z-index", (100 - index).toString());
            },
          },
          "-=4",
        );
        if (index !== items.length - 1) {
          itemsTL.from(item, {
            opacity: 1,
            color: "rgba(255,255,255,1)",
            "--progress": 1,
            duration: 4,
          });
        }
      }
    });
    TL.add(itemsTL, "sin");
    TL.to(
      container,
      {
        "--progress": 1,
      },
      "sin",
    );
  }
}
