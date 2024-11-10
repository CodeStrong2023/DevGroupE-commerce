import { fetchGamesByCategory, displayGames } from "./Service";

document.addEventListener("DOMContentLoaded", () => {
    fetchAndDisplayGames(5); // Cargar juegos de la categoría 5 (Estrategia)
});

async function fetchAndDisplayGames(categoryId) {
    const games = await fetchGamesByCategory(categoryId);
    displayGames(games, "games-container");
}