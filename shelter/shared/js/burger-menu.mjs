export const burgerToggleHeader = document.querySelector(
  "#header .burger-toggle"
);

export const burgerMenu = document.querySelector("#burger-menu");

export const burgerToggleBurgerMenu =
  burgerMenu.querySelector(".burger-toggle");

export const menuLinks = burgerMenu.querySelectorAll(".menu__link");

const mainHeader = document.querySelector("#header");

const openBurgerMenu = () => {
  mainHeader.classList.add("transparent");
  burgerMenu.classList.add("burger-menu--open");
};

const closeBurgerMenu = () => {
  mainHeader.classList.remove("transparent");
  burgerMenu.classList.remove("burger-menu--open");
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
