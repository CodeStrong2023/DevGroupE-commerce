import { fetchGamesByCategory, displayGames } from "./Service";

document.addEventListener("DOMContentLoaded", () => {
    fetchAndDisplayGames(3);
});

async function fetchAndDisplayGames(categoryId) {
    const games = await fetchGamesByCategory(categoryId);
    displayGames(games, "games-container");
} 