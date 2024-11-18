import { fetchGamesByCategory, displayGames } from "./Service.js";

document.addEventListener("DOMContentLoaded", () => {
  fetchAndDisplayGames(1); // Cargar juegos de la categoría 1 (Deportes)
});

async function fetchAndDisplayGames(categoryId) {
  const games = await fetchGamesByCategory(categoryId);
  displayGames(games, "games-container");
}
