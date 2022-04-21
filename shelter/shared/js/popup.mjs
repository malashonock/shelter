import { overlay } from "../../shared/js/overlay.js";

export class Popup {
  pet = {};

  constructor(props) {
    Object.assign(this.pet, props);
    this.popupElement = this.renderDOM();
  }

  renderDOM() {
    overlay.show();
    overlay.element.addEventListener("click", (event) => this.destroy());

    document.addEventListener("keyup", (event) => {
      if (event.code === "Escape") this.destroy();
    });

    const root = document.querySelector("body");

    const popupElement = document.createElement("div");
    popupElement.classList.add("popup");
    root.append(popupElement);

    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("picture");
    popupElement.append(imageWrapper);

    const image = document.createElement("img");
    image.src = this.pet.img;
    image.alt = this.pet.name;
    imageWrapper.append(image);

    const textBlock = document.createElement("div");
    textBlock.classList.add("text-block");
    popupElement.append(textBlock);

    const title = document.createElement("h3");
    title.classList.add("text-block__title", "h3");
    title.innerText = this.pet.name;
    textBlock.append(title);

    const subtitle = document.createElement("h4");
    subtitle.classList.add("text-block__subtitle", "h4");
    subtitle.innerText = `${this.pet.type} - ${this.pet.breed}`;
    textBlock.append(subtitle);

    const description = document.createElement("p");
    description.classList.add("text-block__text", "h5");
    description.innerText = this.pet.description;
    textBlock.append(description);

    const details = document.createElement("ul");
    details.classList.add("text-block__list", "list");
    textBlock.append(details);

    const age = document.createElement("li");
    age.classList.add("list__item", "h5");
    age.innerHTML = `<b>Age:</b> ${this.pet.age}`;
    details.append(age);

    const inoculations = document.createElement("li");
    inoculations.classList.add("list__item", "h5");
    inoculations.innerHTML = `<b>Inoculations:</b> ${this.pet.inoculations.join(
      ", "
    )}`;
    details.append(inoculations);

    const diseases = document.createElement("li");
    diseases.classList.add("list__item", "h5");
    diseases.innerHTML = `<b>Diseases:</b> ${this.pet.diseases.join(", ")}`;
    details.append(diseases);

    const parasites = document.createElement("li");
    parasites.classList.add("list__item", "h5");
    parasites.innerHTML = `<b>Parasites:</b> ${this.pet.parasites.join(", ")}`;
    details.append(parasites);

    const closeBtn = document.createElement("button");
    closeBtn.classList.add("button", "button--secondary", "button--close");
    closeBtn.addEventListener("click", (event) => this.destroy());
    popupElement.append(closeBtn);

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    svg.setAttribute("width", "12");
    svg.setAttribute("height", "12");
    svg.setAttribute("viewbox", "0 0 12 12");
    svg.setAttribute("fill", "none");

    path.setAttribute("fill-rule", "evenodd");
    path.setAttribute("clip-rule", "evenodd");
    path.setAttribute(
      "d",
      "M7.42618 6.00003L11.7046 1.72158C12.0985 1.32775 12.0985 0.689213 11.7046 0.295433C11.3108 -0.0984027 10.6723 -0.0984027 10.2785 0.295433L5.99998 4.57394L1.72148 0.295377C1.32765 -0.098459 0.68917 -0.098459 0.295334 0.295377C-0.0984448 0.689213 -0.0984448 1.32775 0.295334 1.72153L4.57383 5.99997L0.295334 10.2785C-0.0984448 10.6723 -0.0984448 11.3108 0.295334 11.7046C0.68917 12.0985 1.32765 12.0985 1.72148 11.7046L5.99998 7.42612L10.2785 11.7046C10.6723 12.0985 11.3108 12.0985 11.7046 11.7046C12.0985 11.3108 12.0985 10.6723 11.7046 10.2785L7.42618 6.00003Z"
    );
    path.setAttribute("fill", "#292929");
    svg.append(path);
    closeBtn.append(svg);

    return popupElement;
  }

  destroy() {
    this.popupElement.remove();
    overlay.hide();
  }
}
