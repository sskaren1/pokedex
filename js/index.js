//Card
const card = document.querySelector(".card");
const pokemonCardNode = document.querySelector(".card");
const pokemonSearchBtn = document.querySelector("#pokemonSearchBtn");
const pokemonInputSearch = document.querySelector("#pokemonInputSearch");
// Datos del card
const pokemonImage = document.querySelector("#pokemonImage");
const pokemonId = document.querySelector("#pokemonId");
const pokemonName = document.querySelector("#pokemonName");

// Modal
const modalBtnPokemon = document.querySelector("#modalBtnPokemon");
const modalContent= document.querySelector(".modal-content");
// const pokemonModalName = document.querySelector("#pokemonModalName");


// Obteniendo id o name del pokemon del search

const pokemonSearch = pokemonSearchBtn.onclick = () => {
  const inputPokemon = pokemonInputSearch.value;
  pokemonInputSearch.value = "";
  console.log(inputPokemon);

  if (inputPokemon === "") {
    Swal.fire({
      title: "Error",
      text: "Debe llenar el campo nombre pokemon o id",
      icon: "error",
    });
    return;
  }

  obtenerPokemon(inputPokemon);
};

pokemonInputSearch.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    obtenerPokemon(event.target.value);
  }
});

// vamos a crear una funcion para obtener el pokemon deseado
const obtenerPokemon= async (nameId = "bulbasaur") => {
  try {
    pokemonInputSearch.value = "";
    const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

    const response = await fetch(`${baseUrl}${nameId.toLocaleLowerCase()}`);
    const data = await response.json();
    // console.log(data);
    // console.log(data.name);
    setPokemonsCard(data);
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "No se encontro el pokemon",
      icon: "error",
    });
  }
};
obtenerPokemon();


// vamos a crear a una funcion la cual se encargue de poder pintar nuestros pokemones
const setPokemonsCard = async (data) => {
  const bgColor = await getColorPokemon(data.id);
  console.log(bgColor);

  card.style = `background-color: ${bgColor};`;

  const imgUrl =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/';

  console.log(data);
  // console.log(data.id);

  pokemonImage.src = `${imgUrl}${data.id}.svg`;
  pokemonId.innerHTML = `N° ${data.id}`;
  pokemonName.innerHTML = data.name;

  modalBtnPokemon.addEventListener('click',obtenerDetallePokemon(data))
};

const obtenerDetallePokemon = async (data) => {
  
  const modal = [];
  modalContent.innerHTML="";
  //Info del Modal
  //* Creando imagen del pokemon
  const pokemonImage = document.createElement('img');
  pokemonImage.src = data.sprites.front_default;

  //* Nombre del pokemon e ID
  const pokemonName = document.createElement('h4');
  pokemonName.innerText = `Name: ${data.name} - ID: ${data.id}`;

  //*Tipo de pokemon
  const pokemonType = document.createElement('h4');
  pokemonType.innerText = `Type: ${data.types[0].type.name}`;

  //* Pokemon HP
  const hp = document.createElement('p');
  hp.innerText = `${data.stats[0].stat.name}: ${data.stats[0].base_stat}`;
  hp.classList.add('pokemonStats');

  //* Attack power
  const attack = document.createElement('p');
  attack.innerText = `${data.stats[1].stat.name}: ${data.stats[1].base_stat}`;
  attack.classList.add('pokemonStats');

  //* Defense
  const defense = document.createElement('p');
  defense.innerText = `${data.stats[2].stat.name}: ${data.stats[2].base_stat}`;
  defense.classList.add('pokemonStats');

  //* Special Attack
  const specialAttack = document.createElement('p');
  specialAttack.innerText = `${data.stats[3].stat.name}: ${data.stats[3].base_stat}`;
  specialAttack.classList.add('pokemonStats');

  //* Special Defense
  const specialDefense = document.createElement('p');
  specialDefense.innerText = `${data.stats[4].stat.name}: ${data.stats[4].base_stat}`;
  specialDefense.classList.add('pokemonStats');

  //* Speed
  const speed = document.createElement('p');
  speed.innerText = `${data.stats[5].stat.name}: ${data.stats[5].base_stat}`;
  speed.classList.add('pokemonStats');

  //* Contenedor de los stats
  const stats = document.createElement('div');
  stats.append(hp, attack, defense, specialAttack, specialDefense, speed);
  stats.classList.add('pokemonStatsContainer');

  //* Crear contenedor
  const modalBody = document.createElement('div');
  modalBody.append(pokemonImage , pokemonName ,pokemonType, stats);
  modalBody.classList.add('modal-body');

  modal.push(modalBody);

  modalContent.append(...modal);
  console.log(modalContent);

};



// vamos a crear una funcion para obtener todos los pokemones
const obtenerAllPokemones = async () => {
  const baseUrl = "https://pokeapi.co/api/v2/pokemon";
  fetch()
  const response = await fetch(`${baseUrl}?limit=100`);
  const data = await response.json();

  // console.log(data);
  // console.log(data.results);
  // console.log(data.results[0]);
  // console.log(data.results[0].name);

  setAllPokemons(data.results);
};

const setAllPokemons = (results) => {
  const imgUrl =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/';
  // console.log(imgUrl);

  const pokemons = results;

  pokemons.map(async (pokemon, index) => {
    // const bgColor = await getColorPokemon(index + 1);
    console.log(index);

    const htmlAllPokemon = `
        <img class="card-image" src='${imgUrl}${index+1}.svg' />

        <div class="card-body text-center">
          <h6 class='text-title text-white'>N° ${index+1}</h6>
          <h4 class='text-title text-white'>${pokemon.name}</h4>
        </div>

        <button class='btn btn-primary' onclick='obtenerDetallePokemon("${
          pokemon.url
        }")' data-bs-toggle='modal' data-bs-target='#modalPokemon'>ver detalle</button>
    `;
    // despues de crear el html basico concatenamos el html al container
    // pokemonContainer.innerHTML += htmlCard;
  });
};

const color = {
  red: "rgba(255, 74, 77, 0.7)",
  green: "rgba(141, 206, 119, 0.7)",
  blue: "rgba(113, 104, 226, 0.7)",
  brown: "rgba(93, 82, 82, 0.7)",
  purple: "rgba(151, 79, 148, 0.7)",
  pink: "rgba(255, 165, 252, 0.7)",
  yellow: "rgba(244, 255, 95, 0.7)",
};

const getColorPokemon = async (id) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${id}`
  );

  const data = await response.json();

  console.log(data.color.name);
  return color[data.color.name];
};
