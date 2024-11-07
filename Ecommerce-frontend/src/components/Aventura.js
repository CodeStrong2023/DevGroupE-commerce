import { crearCarrusel } from './carousel';

document.addEventListener("DOMContentLoaded", () => {
    fetchAdventureGames();
});

async function fetchAdventureGames() {
    try {
        const response = await fetch('http://localhost:8080/games/category/3');
        if (!response.ok) {
            throw new Error("Error al obtener los juegos de aventura.");
        }

        const games = await response.json();
        displayGames(games);
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("games-container").innerHTML = "<p>No se pudieron cargar los juegos de aventura.</p>";
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

        // Agregar el carrusel si hay imágenes
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
    function addToCart(game) {
        const cartItem = {
            id: game.id,
            title: game.title,
            price: game.price,
            quantity: 1,
        };
    
        // Obtener el carrito actual de localStorage o crear uno nuevo si no existe
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
        // Verificar si el juego ya está en el carrito
        const existingItem = cart.find(item => item.id === cartItem.id);
        if (existingItem) {
            existingItem.quantity += 1; // Incrementar la cantidad si el juego ya está en el carrito
        } else {
            cart.push(cartItem); // Agregar el nuevo juego al carrito
        }
    
        // Guardar el carrito actualizado en localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    
        alert(`${game.title} ha sido añadido al carrito.`);
    }

