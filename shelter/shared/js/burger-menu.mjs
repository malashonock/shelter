export const burgerToggle = document.querySelector("#header .burger-toggle");
export const burgerMenu = document.querySelector("#burger-menu");

const menuLinks = burgerMenu.querySelectorAll(".menu__link");

const contentWrapper = burgerToggle.parentElement;
const sectionWrapper = contentWrapper.parentElement;

const headerContent = document.querySelector("#header > :not(.burger-toggle)");

const overlay = document.querySelector(".overlay");

const toggleBurgerMenu = (state) => {
  sectionWrapper.classList.toggle("position-relative", state);
  contentWrapper.classList.toggle(
    "position-relative",
    state === undefined ? undefined : !state
  );
  overlay.classList.toggle("overlay--active", state);
  headerContent.classList.toggle("transparent", state);
  burgerToggle.classList.toggle("burger-toggle--open", state);
  burgerMenu.classList.toggle("burger-menu--open", state);
};

const openBurgerMenu = () => {
  toggleBurgerMenu(true);
};

const closeBurgerMenu = () => {
  toggleBurgerMenu(false);
};

burgerToggle.addEventListener("click", (event) => {
  toggleBurgerMenu();
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
