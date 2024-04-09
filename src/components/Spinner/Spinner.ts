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

    imgList.forEach((img) => {
      const src = img.getAttribute("src");

      if (src) {
        img.removeAttribute("src");
        const clone = new Image();

        clone.addEventListener("load", () => {
          img.setAttribute("src", clone.src);

          loaded += 1;
          valueText.textContent =
            Math.round((100 / imgList.length) * loaded) + "%";

          if (loaded >= imgList.length) {
            container.classList.add("_loaded");
            document.dispatchEvent(event);
            document.body.classList.add("_loaded");
          }
        });

        clone.addEventListener("error", () => {
          img.setAttribute("src", clone.src);

          loaded += 1;
          valueText.textContent =
            Math.round((100 / imgList.length) * loaded) + "%";

          if (loaded >= imgList.length) {
            container.classList.add("_loaded");
            document.dispatchEvent(event);
            document.body.classList.add("_loaded");
          }
        });

        clone.src = src;
      }
    });
  }
}
