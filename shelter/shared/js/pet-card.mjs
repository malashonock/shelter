export function PetCard(pet) {
  const card = document.createElement("div");
  card.classList.add("card", "card--interactive");
  card.dataset.name = pet.name;

  const image = document.createElement("img");
  image.classList.add("card__img");
  image.src = pet.img;
  image.alt = pet.name;

  const title = document.createElement("h4");
  title.classList.add("card__title");
  title.innerText = pet.name;

  const button = document.createElement("button");
  button.classList.add("button", "button--secondary");
  button.innerText = "Learn more";

  card.append(...[image, title, button]);
  return card;
}
