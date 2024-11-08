import { crearCarrusel } from './carousel.js';

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
    const gamePromises = categoryIds.map(id =>
        fetch(`http://localhost:8080/games/category/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error al obtener los juegos de la categoría ${id}.`);
                }
                return response.json();
            })
            .catch(error => {
                console.error(`Error en la categoría ${id}:`, error);
                return []; // Retorna un array vacío si hay error en una categoría
            })
    );

    try {
        const allGames = await Promise.all(gamePromises);
        const games = allGames.flat(); // Combina todos los juegos en un solo array
        displayGames(games);
    } catch (error) {
        console.error("Error al cargar todas las categorías:", error);
        document.getElementById("games-container").innerHTML = "<p>No se pudieron cargar los juegos.</p>";
    }
}

function displayGames(games) {
    const container = document.getElementById("games-container");
    container.innerHTML = ""; // Limpiar cualquier contenido anterior

    games.forEach(game => {
        console.log(game.images);
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

        // Agregar el botón de "Agregar al carrito"
        const addToCartButton = document.createElement("button");
        addToCartButton.textContent = "Agregar al carrito";
        addToCartButton.classList.add("add-to-cart-btn");  // Añadir clase CSS para estilos
        addToCartButton.addEventListener("click", () => addToCart(game));
        gameElement.appendChild(addToCartButton);

        container.appendChild(gameElement);
    });
}

function logout() {
    localStorage.removeItem('usuario');
    location.reload();  // Recarga la página para reflejar el cambio
}
