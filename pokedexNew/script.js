import Pokemon from './pokemon.js';

const pokedex = document.getElementById("pokedex");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

let offset = 0;
const limit = 12;

async function loadPokedex(offsetValue = 0) {
  pokedex.innerHTML = ""; 

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offsetValue}`);
    const data = await response.json();

    for (const pokemon of data.results) {
      await loadPokemonDetails(pokemon.url);
    }


    prevBtn.disabled = offsetValue === 0;

  } catch (error) {
    console.error("Error en loadPokedex:", error);
  }
}

async function loadPokemonDetails(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const pokenObj = new Pokemon(data);
    pokedex.appendChild(pokenObj.renderCard());
  } catch (error) {
    console.error("Error en loadPokemonDetails:", error);
  }
}

// Eventos de los botones
prevBtn.addEventListener("click", () => {
  if (offset >= limit) {
    offset -= limit;
    loadPokedex(offset);
  }
});

nextBtn.addEventListener("click", () => {
  offset += limit;
  loadPokedex(offset);
});


loadPokedex();
