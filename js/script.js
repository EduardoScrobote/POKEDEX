const POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon/';

const getPokemons = async () => {
    const response = await fetch(POKEMON_URL);
    const data = await response.json();
    return data.results;
};

const getPokemonInfo = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

const showPokemons = (data) => {
    const list = document.getElementById('list');
    data.forEach((pokemon) => {
        const div = document.createElement('div');
        div.className = 'card';
        const img = document.createElement('img');
        const name = document.createElement('h2');
        name.innerText = pokemon.name;
        name.className = 'name';

        getPokemonInfo(pokemon.url).then((data) => {
            img.src = data.sprites.front_default;
            data.types.forEach((type) => {
                const typeElement = document.createElement('span');
                typeElement.innerText = type.type.name;
                typeElement.className = 'type';
                typeElement.id = type.type.name;
                div.appendChild(typeElement);
            });
        });
        div.appendChild(img);
        div.appendChild(name);
        list.appendChild(div);
    });
}

window.onload = () => {
    getPokemons().then((data) => showPokemons(data));
    console.log('Loaded')
}