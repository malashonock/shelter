export class PaginatedSlider {
  #items = [];
  #pageNumber = 1;

  DOMMapping = {
    sliderSelector: ".slider",
    sliderFrameSelector: ".slider__slides",
    itemsCollectionClass: "slider__slides-wrapper",
    itemClass: "slider__slide",
    navBtnPrevSelector: ".slider__nav-button--prev",
    navBtnNextSelector: ".slider__nav-button--next",
    navBtnFirstSelector: ".slider__nav-button--first",
    navBtnLastSelector: ".slider__nav-button--last",
    paginationSelector: ".slider__pagination",
  };

  constructor(props) {
    this.sourceItems = props.sourceItems;
    this.itemDOMGenerator = props.itemDOMGenerator;
    this.itemsPerPageRow = props.itemsPerPageRow || 1;
    this.itemsPerPageColumn = props.itemsPerPageColumn || 1;
    this.pageCount = props.pageCount || this.sourceItems.length;
    this.columnGapPx = props.columnGapPx;
    this.itemWidthPx = props.itemWidthPx;
    this.DOMMapping = { ...this.DOMMapping, ...props.DOMMapping };

    this.pageWidthPx =
      this.itemWidthPx * this.itemsPerPageRow +
      this.columnGapPx * (this.itemsPerPageRow - 1);

    this.itemsWidthPx =
      this.pageCount * this.itemsPerPageRow * this.itemWidthPx +
      (this.pageCount * this.itemsPerPageRow - 1) * this.columnGapPx;

    this.populateItems();
    this.renderDOM();
    this.bindEventHandlers();
    this.addEventListeners();
  }

  get items() {
    return this.#items;
  }

  set items(value) {
    this.#items = value;
  }

  get itemsCount() {
    return this.items.length;
  }

  get itemsPerPage() {
    return this.itemsPerPageRow * this.itemsPerPageColumn;
  }

  get pageNumber() {
    return this.#pageNumber;
  }

  set pageNumber(value) {
    if (value <= 0) {
      value = 1;
    }

    if (value > this.pageCount) {
      value = this.pageCount;
    }

    this.#pageNumber = value;
    this.#scrollToPage(this.#pageNumber);
    this.updateDOM();
  }

  get isFirst() {
    return this.#pageNumber === 1;
  }

  get isLast() {
    return this.#pageNumber === this.pageCount;
  }

  populateItems() {
    const targetItemsCount =
      this.pageCount * this.itemsPerPageRow * this.itemsPerPageColumn;

    let availableItems = this.sourceItems.shuffle();

    while (this.#items.length < targetItemsCount) {
      if (
        availableItems.length === 0 ||
        this.#items.length % this.itemsPerPage === 0
      ) {
        availableItems = this.sourceItems.shuffle();
      }

      this.#items.push(availableItems.pop());
    }
  }

  renderDOM() {
    this.sliderElement = document.querySelector(this.DOMMapping.sliderSelector);

    this.sliderFrameElement = this.sliderElement.querySelector(
      this.DOMMapping.sliderFrameSelector
    );
    this.sliderFrameElement.style.overflow = "hidden";

    this.itemsCollectionElement = document.createElement("div");
    this.itemsCollectionElement.classList.add(
      this.DOMMapping.itemsCollectionClass
    );
    this.itemsCollectionElement.style.transform = "translateX(0%)";
    this.itemsCollectionElement.style.transition = "transform 0.2s ease";

    const itemElements = this.#items.map((item) => {
      const itemElement = new this.itemDOMGenerator(item);
      itemElement.classList.add(this.DOMMapping.itemClass);
      itemElement.style.flexGrow = "0";
      itemElement.style.flexShrink = "0";
      return itemElement;
    });

    this.itemsCollectionElement.replaceChildren(...itemElements);
    this.sliderFrameElement.replaceChildren(this.itemsCollectionElement);

    this.navBtnNextElement = this.sliderElement.querySelector(
      this.DOMMapping.navBtnNextSelector
    );

    this.navBtnPrevElement = this.sliderElement.querySelector(
      this.DOMMapping.navBtnPrevSelector
    );

    this.navBtnFirstElement = this.sliderElement.querySelector(
      this.DOMMapping.navBtnFirstSelector
    );

    this.navBtnLastElement = this.sliderElement.querySelector(
      this.DOMMapping.navBtnLastSelector
    );

    this.paginationElement = this.sliderElement.querySelector(
      this.DOMMapping.paginationSelector
    );

    this.updateDOM();
  }

  updateDOM() {
    this.paginationElement.innerText = this.pageNumber;

    this.navBtnFirstElement.disabled = this.isFirst;
    this.navBtnPrevElement.disabled = this.isFirst;

    this.navBtnLastElement.disabled = this.isLast;
    this.navBtnNextElement.disabled = this.isLast;
  }

  #scrollToPage(pageNumber) {
    const scrollPctg =
      ((-1 * ((pageNumber - 1) * (this.pageWidthPx + this.columnGapPx))) /
        this.pageWidthPx) *
      100;

    this.itemsCollectionElement.style.transform = `translateX(${scrollPctg}%)`;
  }

  bindEventHandlers() {
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.firstPage = this.firstPage.bind(this);
    this.lastPage = this.lastPage.bind(this);
  }

  nextPage() {
    this.pageNumber++;
  }

  prevPage() {
    this.pageNumber--;
  }

  firstPage() {
    this.pageNumber = 1;
  }

  lastPage() {
    this.pageNumber = this.pageCount;
  }

  addEventListeners() {
    this.navBtnNextElement.addEventListener("click", (event) => {
      this.nextPage();
    });

    this.navBtnPrevElement.addEventListener("click", (event) => {
      this.prevPage();
    });

    this.navBtnFirstElement.addEventListener("click", (event) => {
      this.firstPage();
    });

    this.navBtnLastElement.addEventListener("click", (event) => {
      this.lastPage();
    });
  }
}
