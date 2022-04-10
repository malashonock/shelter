export class Slider {
  items = [];

  DOMMapping = {
    sliderSelector: ".slider",
    itemsCollectionSelector: ".slider__wrapper",
    itemClass: "slider__slide",
    navBtnPrevSelector: ".slider__nav-button--prev",
    navBtnNextSelector: ".slider__nav-button--next",
    // navBtnFirstSelector: ".slider__nav-button--first",
    // navBtnLastSelector: ".slider__nav-button--last",
    // paginationSelector: ".slider__pagination",
  };

  constructor(props) {
    this.sourceItems = props.sourceItems;
    this.itemDOMGenerator = props.itemDOMGenerator;
    this.itemsPerPageRow = props.itemsPerPageRow || 1;
    this.itemsPerPageColumn = props.itemsPerPageColumn || 1;
    // this.isInfinite = props.isInfinite || false;
    this.DOMMapping = { ...this.DOMMapping, ...props.DOMMapping };
    this.appendItems();
    this.buildDOM();
    this.bindEventHandlers();
    this.addEventListeners();
  }

  appendItems(itemsCount = this.itemsPerPage) {
    const availableItems = this.sourceItems
      .filter((item) => !this.items.includes(item))
      .shuffle();

    this.items = [...this.items, ...availableItems.slice(0, itemsCount)];
  }

  prependItems(itemsCount = this.itemsPerPage) {
    const availableItems = this.sourceItems
      .filter((item) => !this.items.includes(item))
      .shuffle();

    this.items = [...availableItems.slice(0, itemsCount), ...this.items];
  }

  removeItemsFromHead(itemsCount = this.itemsPerPage) {
    this.items = this.items.slice(itemsCount);
  }

  removeItemsFromTail(itemsCount = this.itemsPerPage) {
    this.items = this.items.slice(0, this.items.length - itemsCount);
  }

  buildDOM() {
    this.sliderElement = document.querySelector(this.DOMMapping.sliderSelector);

    this.itemsCollectionElement = this.sliderElement.querySelector(
      this.DOMMapping.itemsCollectionSelector
    );

    this.itemsCollectionElement.style.overflowX = "hidden";

    const itemElements = this.items.map((item) => {
      const itemElement = new this.itemDOMGenerator(item);
      itemElement.classList.add(this.DOMMapping.itemClass);
      itemElement.style.flexGrow = "0";
      itemElement.style.flexShrink = "0";
      return itemElement;
    });

    this.itemsCollectionElement.replaceChildren(...itemElements);

    this.navBtnNextElement = this.sliderElement.querySelector(
      this.DOMMapping.navBtnNextSelector
    );

    this.navBtnPrevElement = this.sliderElement.querySelector(
      this.DOMMapping.navBtnPrevSelector
    );
  }

  get itemsCount() {
    return this.items.length;
  }

  get itemsPerPage() {
    return this.itemsPerPageRow * this.itemsPerPageColumn;
  }

  bindEventHandlers() {
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }

  nextPage() {
    this.appendItems();
    this.removeItemsFromHead();
    this.buildDOM();
  }

  prevPage() {
    this.prependItems();
    this.removeItemsFromTail();
    this.buildDOM();
  }

  addEventListeners() {
    this.navBtnNextElement.addEventListener("click", (event) => {
      this.nextPage();
    });

    this.navBtnPrevElement.addEventListener("click", (event) => {
      this.prevPage();
    });
  }
}
