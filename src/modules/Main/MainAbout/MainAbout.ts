import gsap from "gsap";
import AnimateImages from "@its2easy/animate-images";

function initSequenceAnim() {
  const container = document.querySelector<HTMLElement>(".main-about");
  const title =
    container && container.querySelector<HTMLElement>(".main-about__title");
  const animContainer =
    container &&
    container.querySelector<HTMLCanvasElement>(".main-about__anim");
  const infoItems =
    container &&
    container.querySelectorAll<HTMLElement>(".main-about-info[data-item]");
  const canvas =
    animContainer && animContainer.querySelector<HTMLCanvasElement>("canvas");

  if (container && title && animContainer && infoItems && canvas) {
    const imgList: string[] = [];

    [...new Array(401)].map((el, i) => {
      const num = i.toString().padStart(3, "0");
      imgList.push(`./img/anim/3600_0${num}.webp`);
    });

    let aboutAnim = new AnimateImages(canvas, {
      images: imgList,
      preload: "partial",
      fillMode: "contain",
      preloadNumber: 100,
      fps: 60,
      poster: imgList[0],
    });

    (window as any).aboutAnim = aboutAnim;

    const mm = gsap.matchMedia();

    const breakPoint = 835;
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
                duration: 50,
                ease: "none",
              },
              "step-1",
            );

            // step-1
            step_1.from(
              animContainer,
              {
                translateY: "150%",
                duration: 50,
                ease: "none",
              },
              "step-1",
            );

            mainTL.add(step_1);

            const imgTL = gsap.timeline({
              scrollTrigger: {
                trigger: container,
                start: "bottom bottom",
                end: `${imgList.length * 2}% bottom`,
                scrub: true,
                pin: true,
                onUpdate: (self) => {
                  const frame = Math.round(
                    (imgList.length / 100) * (self.progress * 100),
                  );
                  aboutAnim.setFrame(frame);
                },
              },
            });

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
                duration: 100,
                ease: "none",
              });
              sub.to(infoItems[0], {
                opacity: 0,
                translateY: "-100%",
                delay: 30,
                duration: 100,
                ease: "none",
              });

              sub.from(infoItems[1], {
                opacity: 0,
                translateY: "100%",
                duration: 100,
                ease: "none",
              });
              sub.to(infoItems[1], {
                opacity: 0,
                translateY: "-100%",
                delay: 30,
                duration: 100,
                ease: "none",
              });

              sub.from(infoItems[2], {
                opacity: 0,
                translateY: "100%",
                duration: 100,
                ease: "none",
              });
              sub.to(infoItems[2], {
                opacity: 0,
                translateY: "-100%",
                delay: 30,
                duration: 100,
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
                duration: 100,
                ease: "none",
              },
              "step-1",
            );

            // step-1
            step_1.from(
              animContainer,
              {
                translateY: "100%",
                duration: 100,
                ease: "none",
              },
              "step-1",
            );

            mainTL.add(step_1);

            const imgTL = gsap.timeline({
              scrollTrigger: {
                trigger: container,
                start: "bottom bottom",
                end: `${imgList.length * 2}% bottom`,
                scrub: true,
                pin: true,
                onUpdate: (self) => {
                  const frame = Math.round(
                    (imgList.length / 100) * (self.progress * 100),
                  );
                  aboutAnim.setFrame(frame);
                },
              },
            });

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
                duration: 100,
                ease: "none",
              });
              sub.to(infoItems[0], {
                opacity: 0,
                translateY: "-100%",
                delay: 30,
                duration: 100,
                ease: "none",
              });

              sub.from(infoItems[1], {
                opacity: 0,
                translateY: "100%",
                duration: 100,
                ease: "none",
              });
              sub.to(infoItems[1], {
                opacity: 0,
                translateY: "-100%",
                delay: 30,
                duration: 100,
                ease: "none",
              });

              sub.from(infoItems[2], {
                opacity: 0,
                translateY: "100%",
                duration: 100,
                ease: "none",
              });
              sub.to(infoItems[2], {
                opacity: 0,
                translateY: "-100%",
                delay: 30,
                duration: 100,
                ease: "none",
              });

              imgTL.add(sub, 20);
            }

            imgTL.to(animContainer, {
              translateY: "-10%",
              duration: 100,
              ease: "none",
            });

            return;
          }
        }

        return () => {};
      },
    );
  }
}

initSequenceAnim();
