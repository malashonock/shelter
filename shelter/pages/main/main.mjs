import * as burgerMenu from "../../shared/js/burger-menu.mjs";
import { pets } from "../../shared/js/load-pets.mjs";
import { shuffle } from "../../shared/js/array-extensions.mjs";
import { Slider } from "../../shared/js/slider.mjs";
import { PetCard } from "../../shared/js/pet-card.mjs";

const slider = new Slider({
  sourceItems: pets,
  itemsPerPageRow: 3,
  itemDOMGenerator: PetCard,
});
