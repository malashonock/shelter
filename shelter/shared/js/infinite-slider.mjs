export class InfiniteSlider {
  #itemsMain = [];
  #itemsLeft = [];
  #itemsRight = [];

  DOMMapping = {
    sliderSelector: ".slider",
    sliderFrameSelector: ".slider__slides",
    itemsCollectionClass: "slider__slides-wrapper",
    itemClass: "slider__slide",
    navBtnPrevSelector: ".slider__nav-button--prev",
    navBtnNextSelector: ".slider__nav-button--next",
  };

  constructor(props) {
    this.sourceItems = props.sourceItems;
    this.itemDOMGenerator = props.itemDOMGenerator;
    this.itemsPerPageRow = props.itemsPerPageRow || 1;
    this.itemsPerPageColumn = props.itemsPerPageColumn || 1;
    this.DOMMapping = { ...this.DOMMapping, ...props.DOMMapping };

    this.populateMain();
    this.populateLeft();
    this.populateRight();

    this.renderDOM();
  }

  get itemsPerPage() {
    return this.itemsPerPageRow * this.itemsPerPageColumn;
  }

  get items() {
    return [...this.#itemsLeft, ...this.#itemsMain, ...this.#itemsRight];
  }

  set items([newItemsLeft, newItemsMain, newItemsRight]) {
    this.#itemsLeft = [...newItemsLeft];
    this.#itemsMain = [...newItemsMain];
    this.#itemsRight = [...newItemsRight];
    this.renderDOM();
  }

  generateItems(itemsCount = this.itemsPerPage) {
    return this.sourceItems
      .filter((item) => !this.#itemsMain.includes(item))
      .shuffle()
      .slice(0, itemsCount);
  }

  populateMain(itemsCount = this.itemsPerPage) {
    const newItems = this.generateItems(itemsCount);
    this.#itemsMain = [...newItems];
    return newItems;
  }

  populateLeft(itemsCount = this.itemsPerPage) {
    const newItems = this.generateItems(itemsCount);
    this.#itemsLeft = [...newItems];
    return newItems;
  }

  populateRight(itemsCount = this.itemsPerPage) {
    const newItems = this.generateItems(itemsCount);
    this.#itemsRight = [...newItems];
    return newItems;
  }

  renderDOM() {
    this.sliderElement = document.querySelector(this.DOMMapping.sliderSelector);

    this.sliderFrameElement = this.sliderElement.querySelector(
      this.DOMMapping.sliderFrameSelector
    );
    this.sliderFrameElement.style.overflowX = "hidden";

    this.itemsCollectionElement = document.createElement("div");
    this.itemsCollectionElement.classList.add(
      this.DOMMapping.itemsCollectionClass
    );

    const itemElements = this.items.map((item) => this.createItemElement(item));

    this.itemsCollectionElement.replaceChildren(...itemElements);
    this.sliderFrameElement.replaceChildren(this.itemsCollectionElement);

    this.navBtnNextElement = this.sliderElement.querySelector(
      this.DOMMapping.navBtnNextSelector
    );

    this.navBtnPrevElement = this.sliderElement.querySelector(
      this.DOMMapping.navBtnPrevSelector
    );

    this.addEventListeners();
  }

  createItemElement(item) {
    const itemElement = new this.itemDOMGenerator(item);
    itemElement.classList.add(this.DOMMapping.itemClass);
    itemElement.style.flexGrow = "0";
    itemElement.style.flexShrink = "0";
    return itemElement;
  }

  nextPage() {
    this.itemsCollectionElement.classList.add("move-right");
  }

  recreateItemsAfterNextPage() {
    const itemsToKeep = [...this.#itemsRight];

    this.#itemsMain = [...itemsToKeep];

    const newItemsLeft = this.populateLeft();
    const newItemsRight = this.populateRight();

    this.items = [newItemsLeft, itemsToKeep, newItemsRight];
  }

  prevPage() {
    this.itemsCollectionElement.classList.add("move-left");
  }

  recreateItemsAfterPrevPage() {
    const itemsToKeep = [...this.#itemsLeft];

    this.#itemsMain = [...itemsToKeep];

    const newItemsLeft = this.populateLeft();
    const newItemsRight = this.populateRight();

    this.items = [newItemsLeft, itemsToKeep, newItemsRight];
  }

  addEventListeners() {
    this.navBtnNextElement.addEventListener("click", (event) => {
      this.nextPage();
    });

    this.navBtnPrevElement.addEventListener("click", (event) => {
      this.prevPage();
    });

    this.itemsCollectionElement.addEventListener("animationend", (event) => {
      switch (event.animationName) {
        case "move-right":
          this.itemsCollectionElement.classList.remove("move-right");
          this.recreateItemsAfterNextPage();
          break;
        case "move-left":
          this.itemsCollectionElement.classList.remove("move-left");
          this.recreateItemsAfterPrevPage();
          break;
        default:
          break;
      }
    });
  }
}
