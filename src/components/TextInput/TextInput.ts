export function textInputHandler(target: HTMLElement) {
  const btn = target.closest(".text-input__btn");

  if (btn) {
    const input =
      btn.parentElement?.querySelector<HTMLInputElement>(".text-input__field");
    input && (input.value = "");
  }
}
