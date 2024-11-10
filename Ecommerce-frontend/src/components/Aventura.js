import { fetchGamesByCategory, displayGames } from './ Service.js';

document.addEventListener("DOMContentLoaded", () => {
    fetchAdventureGames(3);
});

async function fetchAndDisplayGames(categoryId) {
    const games = await fetchGamesByCategory(categoryId);
    displayGames(games, "games-container");
} 