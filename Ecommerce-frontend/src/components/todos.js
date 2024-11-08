import { fetchGamesByCategory, displayGames } from './Service.js';

document.addEventListener("DOMContentLoaded", () => {
    fetchGamesFromAllCategories();
    // Verificar si hay usuario en sesión y actualizar los botones
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
        document.getElementById("userButton").style.display = 'block'; // Mostrar el botón del usuario
        document.getElementById("userButton").textContent = usuario; // Mostrar el nombre del usuario
        document.getElementById("loginButton").style.display = 'none'; // Ocultar el botón de login
    } else {
        document.getElementById("loginButton").style.display = 'block'; // Mostrar el botón de login
        document.getElementById("userButton").style.display = 'none'; // Ocultar el botón del usuario
    }
});

async function fetchGamesFromAllCategories() {
    const categoryIds = [1, 2, 3, 4, 5];
    try {
        const allGames = await Promise.all(categoryIds.map(id => fetchGamesByCategory(id)));
        const games = allGames.flat(); // Combina todos los juegos en un solo array
        displayGames(games, "games-container");
    } catch (error) {
        console.error("Error al cargar todas las categorías:", error);
        document.getElementById("games-container").innerHTML = "<p>No se pudieron cargar los juegos.</p>";
    }
}