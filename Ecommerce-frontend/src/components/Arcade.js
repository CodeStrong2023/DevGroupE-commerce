import { fetchGamesByCategory, displayGames } from "./Service.js";

document.addEventListener("DOMContentLoaded", () => {
  fetchAndDisplayGames(2); // Cargar juegos de la categoría 2 (Arcade)
});

async function fetchAndDisplayGames(categoryId) {
  const games = await fetchGamesByCategory(categoryId);
  displayGames(games, "games-container");
}
