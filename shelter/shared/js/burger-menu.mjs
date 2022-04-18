export const burgerToggleHeader = document.querySelector(
  "#header .burger-toggle"
);

export const burgerMenu = document.querySelector("#burger-menu");

export const burgerToggleBurgerMenu =
  burgerMenu.querySelector(".burger-toggle");

const menuLinks = burgerMenu.querySelectorAll(".menu__link");

const mainHeader = document.querySelector("#header");
const overlay = document.querySelector(".overlay");

const openBurgerMenu = () => {
  mainHeader.classList.add("transparent");
  overlay.classList.add("overlay--active");
  burgerMenu.classList.add("burger-menu--open");
  setTimeout(() => {
    burgerToggleBurgerMenu.classList.add("burger-toggle--open");
  }, 120);
};

const closeBurgerMenu = () => {
  overlay.classList.remove("overlay--active");
  mainHeader.classList.remove("transparent");
  burgerToggleBurgerMenu.classList.remove("burger-toggle--open");
  setTimeout(() => {
    burgerMenu.classList.remove("burger-menu--open");
  }, 120);
};

burgerToggleHeader.addEventListener("click", (event) => {
  openBurgerMenu();
});

burgerToggleBurgerMenu.addEventListener("click", (event) => {
  closeBurgerMenu();
});

menuLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    closeBurgerMenu();
  });
});

overlay.addEventListener("click", (event) => {
  closeBurgerMenu();
});

document.addEventListener("keyup", (event) => {
  if (event.code === "Escape") {
    closeBurgerMenu();
  }
});
