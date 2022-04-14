import { pets } from "../../../shared/js/load-pets.mjs";
import { PetCard } from "../../../shared/js/pet-card.mjs";
import { shuffle } from "../../../shared/js/array-extensions.mjs";
import { InfiniteSlider } from "../../../shared/js/infinite-slider.mjs";

export let slider;

const breakpointDesktop = window.matchMedia("(min-width: 1280px)");
const breakpointTablet = window.matchMedia(
  "(min-width: 768px) and (max-width: 1279px)"
);
const breakpointMobile = window.matchMedia("(max-width: 767px)");

const breakpoints = [
  {
    mediaQueryList: breakpointDesktop,
    itemsPerPageRow: 3,
  },
  {
    mediaQueryList: breakpointTablet,
    itemsPerPageRow: 2,
  },
  {
    mediaQueryList: breakpointMobile,
    itemsPerPageRow: 1,
  },
];

function getBreakPointChangedHandler(mediaQueryList, itemsPerPageRow) {
  return function () {
    if (mediaQueryList.matches) {
      slider = new InfiniteSlider({
        sourceItems: pets,
        itemsPerPageRow,
        itemDOMGenerator: PetCard,
      });
    }
  };
}

for (const breakpoint of breakpoints) {
  const breakpointChangedHandler = getBreakPointChangedHandler(
    breakpoint.mediaQueryList,
    breakpoint.itemsPerPageRow
  );

  breakpointChangedHandler();

  breakpoint.mediaQueryList.addEventListener("change", (event) =>
    breakpointChangedHandler()
  );
}
