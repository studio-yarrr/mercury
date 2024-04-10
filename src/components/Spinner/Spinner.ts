export function initSpinner() {
  const container = document.querySelector<HTMLElement>(".spinner");
  const valueText = container && container.querySelector(".spinner__value");

  if (container && valueText) {
    container.addEventListener("animationend", () => {
      container.remove();
    });

    const imgList = document.querySelectorAll<HTMLImageElement>(".page img");
    const event = new Event("loaded", { bubbles: true });
    let loaded = 0;

    const pers = Math.floor(imgList.length / 2);

    for (let i = 0; i < pers; i++) {
      const src = imgList[i].getAttribute("src");

      if (src) {
        const clone = new Image();

        clone.onload = () => {
          loaded += 1;
          valueText.textContent = Math.round((100 / pers) * loaded) + "%";

          if (loaded >= pers) {
            container.classList.add("_loaded");
            document.dispatchEvent(event);
            document.body.classList.add("_loaded");
          }
        };

        clone.onerror = () => {
          loaded += 1;
          valueText.textContent = Math.round((100 / pers) * loaded) + "%";

          if (loaded >= pers) {
            container.classList.add("_loaded");
            document.dispatchEvent(event);
            document.body.classList.add("_loaded");
          }
        };

        clone.src = src;
      }
    }
  }
}
