import gsap from "gsap";

function initSequenceAnim() {
  const container = document.querySelector<HTMLElement>(".main-about");
  const title =
    container && container.querySelector<HTMLElement>(".main-about__title");
  const animContainer =
    container &&
    container.querySelector<HTMLCanvasElement>(".main-about__anim");
  const imgList =
    animContainer && animContainer.querySelectorAll<HTMLElement>("img");
  const infoItems =
    container &&
    container.querySelectorAll<HTMLElement>(".main-about-info[data-item]");

  if (container && title && animContainer && imgList && infoItems) {
    const mm = gsap.matchMedia();

    const breakPoint = 1;
    mm.add(
      {
        isDesktop: `(min-width: ${breakPoint}px)`,
        isMobile: `(max-width: ${breakPoint - 1}px)`,
      },
      (context) => {
        if (context.conditions) {
          let { isDesktop, isMobile } = context.conditions;

          if (isDesktop) {
            const mainTL = gsap.timeline();

            const step_1 = gsap.timeline({
              scrollTrigger: {
                trigger: container,
                start: "top bottom",
                end: "bottom bottom",
                scrub: true,
                // markers: true,
              },
            });

            step_1.from(
              title,
              {
                opacity: 0,
                translateY: "100%",
                duration: 8,
                ease: "none",
              },
              "step-1",
            );

            // step-1
            step_1.from(
              animContainer,
              {
                translateY: "200%",
                duration: 8,
                ease: "none",
              },
              "step-1",
            );

            mainTL.add(step_1);

            const imgTL = gsap.timeline({
              scrollTrigger: {
                trigger: container,
                start: "bottom bottom",
                end: `${(imgList.length + 1) * 1}% bottom`,
                scrub: true,
                pin: true,
                // markers: true,
              },
            });

            for (let i = 0; i < imgList.length; i++) {
              if (imgList[i - 1]) {
                imgTL.to(imgList[i - 1], {
                  display: "none",
                });
              }

              imgTL.to(imgList[i], {
                display: "block",
              });
            }

            mainTL.add(imgTL);

            imgTL.to(
              title,
              {
                opacity: 0,
                translateY: "-100%",
                duration: 50,
                ease: "none",
              },
              0,
            );

            if (infoItems.length >= 3) {
              const sub = gsap.timeline();

              sub.from(infoItems[0], {
                opacity: 0,
                translateY: "100%",
                duration: 50,
                ease: "none",
              });
              sub.to(infoItems[0], {
                opacity: 0,
                translateY: "-100%",
                delay: 30,
                duration: 50,
                ease: "none",
              });

              sub.from(infoItems[1], {
                opacity: 0,
                translateY: "100%",
                duration: 50,
                ease: "none",
              });
              sub.to(infoItems[1], {
                opacity: 0,
                translateY: "-100%",
                delay: 30,
                duration: 50,
                ease: "none",
              });

              sub.from(infoItems[2], {
                opacity: 0,
                translateY: "100%",
                duration: 50,
                ease: "none",
              });
              sub.to(infoItems[2], {
                opacity: 0,
                translateY: "-100%",
                delay: 30,
                duration: 50,
                ease: "none",
              });

              imgTL.add(sub, 20);
            }

            imgTL.to(animContainer, {
              translateY: "-10%",
              duration: 100,
            });

            return;
          } else if (isMobile) {
            // mobAnim(container, model, title, infoItems);
          }
        }

        return () => {};
      },
    );
  }
}

initSequenceAnim();
