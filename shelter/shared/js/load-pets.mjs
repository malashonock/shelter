async function loadPets(path) {
  const response = await fetch(path);
  const json = await response.json();
  return json;
}

export const pets = await loadPets("../../shared/pets.json");
