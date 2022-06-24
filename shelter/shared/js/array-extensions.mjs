/* Shuffle array extension method */
export function shuffle() {
  const array = [...this];
  let currentIndex = array.length;
  let randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

/* Append to Array prototype */
Object.defineProperty(Array.prototype, "shuffle", {
  value: shuffle,
  writable: false,
  configurable: false,
});
