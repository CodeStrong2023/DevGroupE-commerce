import { crearCarrusel } from "./carousel";

export async function fetchGamesByCategory(categoryId) {
  try {
    const response = await fetch(
      `https://devgroupe-commerce.up.railway.app/games/category/${categoryId}`
    );
    if (!response.ok) {
      throw new Error(
        `Error al obtener los juegos de la categoría ${categoryId}.`
      );
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
            <p><strong>Fecha de publicación:</strong> ${new Date(
              game.releaseDate
            ).toLocaleDateString()}</p>`;

    if (game.images && Array.isArray(game.images) && game.images.length > 0) {
      const carousel = crearCarrusel(game.images);
      gameElement.appendChild(carousel);
    }

    // Agregar el botón de "Añadir al Carrito"
    const addButton = document.createElement("button");
    addButton.textContent = "Añadir al Carrito";
    addButton.classList.add("add-to-cart-button"); // Clase para estilos adicionales
    addButton.onclick = () => addToCart(game); // Llamada a la función addToCart con el juego actual
    gameElement.appendChild(addButton);

    container.appendChild(gameElement);
  });
}
