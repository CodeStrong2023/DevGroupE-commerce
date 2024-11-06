document.addEventListener("DOMContentLoaded", () => {
    fetchSportsGames();
});

async function fetchSportsGames() {
    try {
        const response = await fetch('http://localhost:8080/games/category/2');
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
            ${game.images && Array.isArray(game.images) 
                ? game.images.map(url => `<img src="${url}" alt="${game.title}">`).join('') 
                : ""
            }
        `;

        container.appendChild(gameElement);
    });
}