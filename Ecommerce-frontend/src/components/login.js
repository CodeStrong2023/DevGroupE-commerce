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
            localStorage.clear();

            // Guarda el rol y el nombre en el localStorage
            localStorage.setItem("userRole", userData.role);
            localStorage.setItem("username", userData.username);
            // Ejemplo de cómo guardar el ID en sessionStorage
            localStorage.setItem("email", userData.email);  // 'userId' es el valor recibido del backend

            console.log(localStorage.getItem("email"));

            // Oculta el formulario de inicio de sesión
            const loginContainer = document.getElementById("loginDropdown");
            const closeButton = document.getElementById('close-button');
            if (loginContainer) {
                loginContainer.style.display = "none";
            }

            // Oculta el botón de inicio de sesión (si existe en la página principal)
            const loginButton = document.getElementById("loginButton");
            if (loginButton) {
                loginButton.style.display = "none";
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
    // Selecciona el contenedor donde se encontraba el botón de inicio de sesión
    const loginButton = document.getElementById("loginButton");

    // Crea el botón de bienvenida y usa la misma clase para mantener el estilo
    const welcomeButton = document.createElement("button");
    welcomeButton.textContent = username;
    welcomeButton.className = loginButton.className; // Mismo estilo
    welcomeButton.id = "welcomeButton"; // Nuevo ID para el botón de bienvenida

    // Reemplaza el botón de inicio de sesión por el de bienvenida
    loginButton.replaceWith(welcomeButton);

    // Crea el menú desplegable 
    const dropdownMenu = document.createElement("div");
    dropdownMenu.className = "dropdown-menu";
    dropdownMenu.style.display = "none";
    dropdownMenu.style.backgroundColor = "#242424";
    dropdownMenu.innerHTML = `
        <ul>
            <li><a href="#" id="logoutButton" style='color: #9b86f4;'>Cerrar Sesión</a></li>
            <li><a href="/src/pages/change-password.html" style='color: #9b86f4;'>Cambiar Contraseña</a></li>
            <li><a href="/src/pages/${role.toLowerCase()}-dashboard.html" class="panel" style='color: #9b86f4;'>Ir al Dashboard</a></li>
        </ul>
    `;
    welcomeButton.insertAdjacentElement("afterend", dropdownMenu);

    // Muestra/oculta el menú desplegable al hacer clic en el botón de bienvenida
    welcomeButton.addEventListener("click", () => {
        dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
    });

    // Manejo del cierre de sesión
    document.getElementById("logoutButton").addEventListener("click", () => {
        const confirmLogout = confirm("¿Está seguro que desea cerrar sesión?");
        if (confirmLogout) {
        localStorage.removeItem("userRole");
        localStorage.removeItem("username");
        alert("Has cerrado sesión");
        window.location.href = "/";
    } else {
        console.log("La sesión se mantiene activa");
    }
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

    loginButton.addEventListener("click", (event) => {
        event.preventDefault();
        loginDropdown.style.display = loginDropdown.style.display === "block" ? "none" : "block";
    });

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        await authenticateUser(username, password);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initializeLoginForm();

    // Verifica si el usuario ya está autenticado
    const userRole = localStorage.getItem("userRole");
    const username = localStorage.getItem("username");

    if (userRole && username) {
        // Si el usuario ya está autenticado, muestra el mensaje de bienvenida
        showWelcomeMessage(username, userRole);

        function onLoginSuccess(username) {
            // Oculta el botón de inicio de sesión
            document.getElementById('loginButton').style.display = 'none';
        
            // Muestra el botón con el nombre del usuario
            const userButton = document.getElementById('userButton');
            userButton.style.display = 'block';
            userButton.textContent = username; // Cambia el texto al nombre del usuario
        }

        // Oculta el formulario de inicio de sesión
        const loginContainer = document.getElementById("loginDropdown");
        if (loginContainer) {
            loginContainer.style.display = "none";
        }

        // Oculta el botón de inicio de sesión
        const loginButton = document.getElementById("loginButton");
        if (loginButton) {
            loginButton.style.display = "none";
        }

        // Crea el menú desplegable
    const dropdownMenu = document.getElementById("dropdownMenu");


    
    }
});

const closeButton = document.getElementById('close-button');

document.getElementById('closeButton').addEventListener('click', () => {
    const loginDropdown = document.getElementById('loginDropdown');
    if (loginDropdown) {
        loginDropdown.style.display = 'none';
    }
});
