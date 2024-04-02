export class SidebarController {
  sidebarList: Map<string, Sidebar> = new Map();

  clickHandler(target: HTMLElement) {
    const closestOpen = target.closest("[data-open-sidebar]");
    const closestClose = target.closest("[data-close-sidebar]");
    if (closestOpen) {
      const key = closestOpen.getAttribute("data-open-sidebar");
      key && this.open(key);
    }
    if (closestClose) {
      this.close();
    }
  }

  open(key: string) {
    const sidebar = this.sidebarList.get(key);
    sidebar && (document.body.classList.add("vbox-open"), sidebar.open());
  }

  close() {
    document.body.classList.remove("vbox-open");
    this.sidebarList.forEach((el) => el.close());
  }
}

export class Sidebar {
  container: HTMLElement;
  key: string;

  constructor(
    controller: SidebarController,
    container: HTMLElement,
    key: string,
  ) {
    this.container = container;
    this.key = key;
    controller.sidebarList.set(this.key, this);
  }

  open() {
    this.container.classList.add("_open");
  }

  close() {
    this.container.classList.remove("_open");
  }
}
