import { pets } from "../../../shared/js/load-pets.mjs";
import { PetCard } from "../../../shared/js/pet-card.mjs";
import { shuffle } from "../../../shared/js/array-extensions.mjs";
import { PaginatedSlider } from "../../../shared/js/paginated-slider.mjs";
import { Popup } from "../../../shared/js/popup.mjs";

export let slider;

const breakpointDesktop = window.matchMedia("(min-width: 1280px)");
const breakpointTablet = window.matchMedia(
  "(min-width: 768px) and (max-width: 1279px)"
);
const breakpointMobile = window.matchMedia("(max-width: 767px)");

const breakpoints = [
  {
    mediaQueryList: breakpointDesktop,
    parameters: {
      itemsPerPageRow: 4,
      itemsPerPageColumn: 2,
      pageCount: 6,
      columnGapPx: 40,
      itemWidthPx: 270,
    },
  },
  {
    mediaQueryList: breakpointTablet,
    parameters: {
      itemsPerPageRow: 2,
      itemsPerPageColumn: 3,
      pageCount: 8,
      columnGapPx: 40,
      itemWidthPx: 270,
    },
  },
  {
    mediaQueryList: breakpointMobile,
    parameters: {
      itemsPerPageRow: 1,
      itemsPerPageColumn: 3,
      pageCount: 16,
      columnGapPx: 40,
      itemWidthPx: 270,
    },
  },
];

function getBreakPointChangedHandler(
  mediaQueryList,
  { itemsPerPageRow, itemsPerPageColumn, pageCount, columnGapPx, itemWidthPx }
) {
  return function () {
    if (mediaQueryList.matches) {
      slider = new PaginatedSlider({
        sourceItems: pets,
        itemsPerPageRow,
        itemsPerPageColumn,
        pageCount,
        columnGapPx,
        itemWidthPx,
        itemDOMGenerator: PetCard,
        areItemsEqual: (pet1, pet2) => pet1.name === pet2.name,
      });
    }
  };
}

for (const breakpoint of breakpoints) {
  const breakpointChangedHandler = getBreakPointChangedHandler(
    breakpoint.mediaQueryList,
    breakpoint.parameters
  );

  breakpointChangedHandler();

  breakpoint.mediaQueryList.addEventListener("change", (event) =>
    breakpointChangedHandler()
  );
}
