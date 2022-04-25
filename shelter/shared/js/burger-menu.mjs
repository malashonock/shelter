import { overlay } from "../../shared/js/overlay.js";

export const burgerToggleHeader = document.querySelector(
  "#header .burger-toggle"
);

export const burgerMenu = document.querySelector("#burger-menu");

export const burgerToggleBurgerMenu =
  burgerMenu.querySelector(".burger-toggle");

const menuLinks = burgerMenu.querySelectorAll(".menu__link");

const mainHeader = document.querySelector("#header");

const openBurgerMenu = () => {
  mainHeader.classList.add("transparent");
  overlay.show();
  burgerMenu.classList.add("burger-menu--open");
  setTimeout(() => {
    burgerToggleBurgerMenu.classList.add("burger-toggle--open");
  }, 120);
};

const closeBurgerMenu = () => {
  overlay.hide();
  mainHeader.classList.remove("transparent");
  burgerToggleBurgerMenu.classList.remove("burger-toggle--open");
  setTimeout(() => {
    burgerMenu.classList.remove("burger-menu--open");
  }, 120);
};

burgerToggleHeader.addEventListener("click", (event) => {
  openBurgerMenu();
});

burgerMenu.addEventListener("click", (event) => {
  if (
    event.target.matches(".burger-toggle") ||
    event.target.matches(".menu__link")
  ) {
    closeBurgerMenu();
  }
});

overlay.element.addEventListener("click", (event) => {
  closeBurgerMenu();
});

document.addEventListener("keyup", (event) => {
  if (event.code === "Escape") {
    closeBurgerMenu();
  }
});
