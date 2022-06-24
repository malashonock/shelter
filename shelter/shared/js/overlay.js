function Overlay() {
  this.element = document.querySelector(".overlay");
  const body = document.querySelector("body");

  this.show = () => {
    this.element.classList.add("overlay--active");
    body.classList.add("vscroll-disabled");
  };

  this.hide = () => {
    this.element.classList.remove("overlay--active");
    body.classList.remove("vscroll-disabled");
  };
}

export const overlay = new Overlay();
