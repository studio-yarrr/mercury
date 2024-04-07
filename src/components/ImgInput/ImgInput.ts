export class ImgInput {
  container: HTMLElement;
  input: HTMLInputElement | null;
  img: HTMLElement | null;

  constructor(container: HTMLElement) {
    this.container = container;
    this.input = this.container.querySelector<HTMLInputElement>("[data-input]");
    this.img = this.container.querySelector<HTMLElement>("[data-img]");

    if (this.input) {
      this.input.addEventListener("change", (e) =>
        this.inputHandler.call(this, e.currentTarget as HTMLInputElement),
      );
    }
  }

  inputHandler(target: HTMLInputElement) {
    if (target.files && target.files.length > 0) {
      const img = document.createElement("img");
      var reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          img.setAttribute("src", e.target.result as string);

          if (this.img) {
            this.img.innerHTML = "";
            this.img.appendChild(img);
          }
        }
      };
      reader.readAsDataURL(target.files[0]);
    } else {
      this.img && (this.img.innerHTML = "");
    }
  }
}
