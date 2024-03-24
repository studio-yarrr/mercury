export function initMeaderMenu() {
  const header = document.querySelector<HTMLElement>(".header");
  const btn = document.querySelector<HTMLButtonElement>(".header__btn");

  if (header && btn) {
    btn.addEventListener("click", () => {
      header.classList.toggle("_open-menu");
    });
  }
}
