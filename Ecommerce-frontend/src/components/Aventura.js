import { fetchGamesByCategory, displayGames } from './ Service.js';

document.addEventListener("DOMContentLoaded", () => {
    fetchAndDisplayGames(3); // Cargar juegos de la categoría 3 (Aventura)
});

async function fetchAndDisplayGames(categoryId) {
    const games = await fetchGamesByCategory(categoryId);
    displayGames(games, "games-container");
} 