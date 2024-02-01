import axios from "axios";

let apiUrl = 'https://pokeapi.co/api/v2/pokemon/'

export const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const getRandomPokemon = async () => {
    const randomIndex = getRandomIntInclusive(1, 25);
    try {
        const response = await axios.get(`${apiUrl}${randomIndex}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching random Pokémon:', error);
    }
};
