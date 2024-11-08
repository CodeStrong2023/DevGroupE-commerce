export async function authenticateUser(username, password) {
    try {
        const response = await fetch("http://localhost:8080/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const userData = await response.json();
            alert(`Bienvenido, ${userData.username}`);

            // Guarda el rol y el nombre en el localStorage
            localStorage.setItem("userRole", userData.role);
            localStorage.setItem("username", userData.username);

            // Oculta el botón de inicio de sesión
            const loginButton = document.getElementById("loginButton");
            if (loginButton) {
                loginButton.style.display = "none"; // Oculta el botón de login
            }

            // Muestra el nombre de usuario o un mensaje de bienvenida
            showWelcomeMessage(userData.username, userData.role);
        } else {
            alert("Error: Credenciales inválidas");
        }
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        alert("Error al iniciar sesión");
    }
}

function showWelcomeMessage(username, role) {
    // Crea el botón de bienvenida
    const welcomeButton = document.createElement("button");
    welcomeButton.textContent = username; // Usa el nombre de usuario logueado
    welcomeButton.className = "welcome-message"; // Clase para estilizar
    document.body.insertBefore(welcomeButton, document.body.firstChild); // Muestra el mensaje al inicio del body

    // Crea el menú desplegable
    const dropdownMenu = document.createElement("div");
    dropdownMenu.className = "dropdown-menu";
    dropdownMenu.style.display = "none"; // Oculto por defecto
    dropdownMenu.innerHTML = `
        <ul>
            <li><a href="#" id="logoutButton">Cerrar Sesión</a></li>
            <li><a href="./change-password.html">Cambiar Contraseña</a></li>
            <li><a href="/src/pages/${role.toLowerCase()}-dashboard.html">Ir al Dashboard</a></li>
        </ul>
    `;
    document.body.appendChild(dropdownMenu);

    // Muestra/oculta el menú al hacer clic en el botón
    welcomeButton.addEventListener("click", () => {
        dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
    });

    // Manejo del cierre de sesión
    document.getElementById("logoutButton").addEventListener("click", () => {
        localStorage.removeItem("userRole");
        localStorage.removeItem("username");
        alert("Has cerrado sesión.");
        window.location.href = "/"; // Redirige al inicio de sesión
    });
}

export function initializeLoginForm() {
    const loginDropdown = document.getElementById("loginDropdown");
    const loginForm = document.getElementById("loginForm");
    const loginButton = document.getElementById("loginButton");

    if (!loginDropdown || !loginForm || !loginButton) {
        console.error("No se encontró uno de los elementos necesarios");
        return;
    }

    // Alternar visibilidad del menú desplegable al hacer clic en el botón de inicio de sesión
    loginButton.addEventListener("click", (event) => {
        event.preventDefault();
        loginDropdown.style.display =
            loginDropdown.style.display === "block" ? "none" : "block";
    });

    // Maneja el envío del formulario de inicio de sesión
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Evita el envío estándar del formulario

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Llama a la función de autenticación con los valores ingresados
        await authenticateUser(username, password);
    });
}

// Inicializa el formulario de inicio de sesión cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
    initializeLoginForm();
    
    // Verifica si el usuario ya está autenticado
    const userRole = localStorage.getItem("userRole");
    const username = localStorage.getItem("username"); // Recupera el nombre de usuario

    if (userRole && username) {
        // Si el usuario ya está autenticado, muestra el mensaje de bienvenida
        showWelcomeMessage(username, userRole);
        const loginButton = document.getElementById("loginButton");
        if (loginButton) {
            loginButton.style.display = "none"; // Oculta el botón de login
        }
    }
});