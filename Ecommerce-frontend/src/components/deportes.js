import { crearCarrusel } from './carousel.js';

document.addEventListener("DOMContentLoaded", () => {
    fetchSportsGames();
});

async function fetchSportsGames() {
    try {
        const response = await fetch('http://localhost:8080/games/category/1');
        if (!response.ok) {
            throw new Error("Error al obtener los juegos de deportes.");
        }

        const games = await response.json();
        displayGames(games);
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("games-container").innerHTML = "<p>No se pudieron cargar los juegos de deportes.</p>";
    }
}

function displayGames(games) {
    const container = document.getElementById("games-container");
    container.innerHTML = ""; // Limpiar cualquier contenido anterior

    games.forEach(game => {
        const gameElement = document.createElement("div");
        gameElement.classList.add("game-card");

        gameElement.innerHTML = `
            <h2>${game.title}</h2>
            <p>${game.description}</p>
            <p><strong>Precio:</strong> ${game.price} USD</p>
            <p><strong>Fecha de publicación:</strong> ${new Date(game.releaseDate).toLocaleDateString()}</p>

        `;

        if (game.images && Array.isArray(game.images) && game.images.length > 0) {
            const carousel = crearCarrusel(game.images);
            gameElement.appendChild(carousel);
        }
         // Agregar botón "Añadir al Carrito"
         const addButton = document.createElement("button");
         addButton.textContent = "Añadir al Carrito";
         addButton.classList.add("add-to-cart-button"); // Clase para estilos adicionales
         addButton.onclick = () => addToCart(game); // Llamada a la función addToCart con el juego actual
         gameElement.appendChild(addButton);
 
         container.appendChild(gameElement);
     });
}
