import { fetchGamesByCategory, displayGames } from "./Service";

document.addEventListener("DOMContentLoaded", () => {
    fetchAndDisplayGames(4); // Cargar juegos de la categoría 4 (Combate)
});

async function fetchAndDisplayGames(categoryId) {
    const games = await fetchGamesByCategory(categoryId);
    displayGames(games, "games-container");
}