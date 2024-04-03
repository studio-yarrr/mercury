export function textInputHandler(target: HTMLElement) {
  const btn = target.closest<HTMLElement>(".text-input__btn");

  if (btn) {
    const input =
      btn.parentElement?.querySelector<HTMLInputElement>(".text-input__field");
    if (input) {
      if (btn.hasAttribute("data-clear")) {
        input.value = "";
      } else if (btn.hasAttribute("data-password")) {
        input.type === "password"
          ? (input.type = "text")
          : (input.type = "password");
      }
    }
  }
}
