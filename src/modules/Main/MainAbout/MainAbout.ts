import gsap from "gsap";

class Canvas {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  activeIndex: number = 0;
  imgList: HTMLImageElement[];
  container: HTMLElement;

  constructor(
    container: HTMLElement,
    canvas: HTMLCanvasElement,
    imgList: NodeListOf<HTMLImageElement>,
  ) {
    this.container = container;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.imgList = [...imgList].map((el) => {
      const img = new Image();
      img.src = el.src;
      el.remove();
      return img;
    });

    window.addEventListener("resize", () => this.resize());
    this.resize();

    requestAnimationFrame(this.loop.bind(this));
  }

  resize() {
    const w = this.container.offsetWidth;
    const h = this.container.offsetHeight;
    this.canvas.height = h;
    this.canvas.width = w;
    this.canvas.style.height = `${h}px`;
    this.canvas.style.width = `${w}px`;
  }

  loop() {
    this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const ratio =
      this.imgList[this.activeIndex].naturalWidth /
      this.imgList[this.activeIndex].naturalHeight;
    const height = this.canvas.width / ratio;

    this.ctx?.drawImage(
      this.imgList[this.activeIndex],
      0,
      0,
      this.canvas.width,
      height,
    );

    requestAnimationFrame(this.loop.bind(this));
  }
}

function initSequenceAnim() {
  const container = document.querySelector<HTMLElement>(".main-about");
  const title =
    container && container.querySelector<HTMLElement>(".main-about__title");
  const animContainer =
    container &&
    container.querySelector<HTMLCanvasElement>(".main-about__anim");
  const imgList =
    animContainer && animContainer.querySelectorAll<HTMLImageElement>("img");
  const infoItems =
    container &&
    container.querySelectorAll<HTMLElement>(".main-about-info[data-item]");
  const canvas =
    container &&
    container.querySelector<HTMLCanvasElement>("#main-about-canvas");

  if (container && title && animContainer && imgList && infoItems && canvas) {
    const anim = new Canvas(animContainer, canvas, imgList);
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
                onUpdate: (self) => {
                  anim.activeIndex = Math.round(
                    self.progress * 100 * ((anim.imgList.length - 1) / 100),
                  );
                },
              },
            });

            // for (let i = 0; i < imgList.length; i++) {
            // if (imgList[i - 1]) {
            //   imgTL.to(imgList[i - 1], {
            //     display: "none",
            //   });
            // }
            // imgTL.to(imgList[i], {
            //   display: "block",
            // });
            // imgTL.to(anim, ["activeIndex"]: imgList.length - 1);
            // }

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

// function initSequenceAnim() {
//   const container = document.querySelector<HTMLElement>(".main-about");
//   const title =
//     container && container.querySelector<HTMLElement>(".main-about__title");
//   const canvas =
//     container &&
//     container.querySelector<HTMLCanvasElement>("#main-about-canvas");
//   const infoItems =
//     container &&
//     container.querySelectorAll<HTMLElement>(".main-about-info[data-item]");
//   const imgList =
//     container &&
//     container.querySelectorAll<HTMLImageElement>(".main-about__anim img");

//   if (container && title && canvas && infoItems && imgList) {
//     new Canvas(canvas, imgList);
//   }
// }

// initSequenceAnim();
