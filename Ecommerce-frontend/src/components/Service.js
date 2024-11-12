import { crearCarrusel } from "./carousel";

export async function fetchGamesByCategory(categoryId) {
    try {
        const response = await fetch(`https://devgroupe-commerce-ecommerce-backend.onrender.com/games/category/${categoryId}`);
        if (!response.ok) {
            throw new Error(`Error al obtener los juegos de la categoría ${categoryId}.`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
}

export function displayGames(games, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ""; // Limpiar cualquier contenido anterior
  
    games.forEach((game) => {
      const gameElement = document.createElement("div");
      gameElement.classList.add("game-card");
  
      gameElement.innerHTML = `
        <h2>${game.title}</h2>
        <p>${game.description}</p>
        <p><strong>Precio:</strong> ${game.price} USD</p>
        <p><strong>Fecha de publicación:</strong> ${new Date(game.releaseDate).toLocaleDateString()}</p>`;
  
      // Verificación de imágenes
      if (game.images && Array.isArray(game.images) && game.images.length > 0) {
        const carousel = crearCarrusel(game.images);
        if (carousel) {
          gameElement.appendChild(carousel);
        } else {
          console.warn(`No se pudo crear el carrusel para el juego: ${game.title}`);
        }
      } else {
        console.warn(`No hay imágenes disponibles para el juego: ${game.title}`);
      }
  
      // Botón "Añadir al Carrito"
      const addButton = document.createElement("button");
      addButton.textContent = "Añadir al Carrito";
      addButton.classList.add("add-to-cart-button"); // Estilo del botón
      addButton.onclick = () => addToCart(game); // Llamada a la función addToCart con el juego actual
      gameElement.appendChild(addButton);
  
      container.appendChild(gameElement);
    });
  }
  
