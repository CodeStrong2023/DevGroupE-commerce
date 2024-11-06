document.addEventListener("DOMContentLoaded", () => {
    fetchSportsGames();
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
            ${game.images && Array.isArray(game.images) 
                ? game.images.map(url => `<img src="${url}" alt="${game.name}">`).join('') 
                : `<img src="ruta/placeholder.jpg" alt="Imagen no disponible">`
            }
        `;

        container.appendChild(gameElement);
    });
}

// Llama a la función para cargar y mostrar los juegos de todas las categorías
fetchGamesFromAllCategories();

