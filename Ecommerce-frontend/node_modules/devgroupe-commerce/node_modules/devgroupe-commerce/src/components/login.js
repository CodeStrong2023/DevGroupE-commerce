export async function authenticateUser(username, password) {
    try {
        const response = await fetch('http://localhost:8080/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const userData = await response.json();
            alert(`Bienvenido, ${userData.username}`);
            
            // Guarda el rol en el localStorage para usarlo en otras páginas
            localStorage.setItem('userRole', userData.role);

            // Redirige a dashboard si es admin
            if (userData.role === 'ADMIN') {
                window.location.href = '/src/pages/admin-dashboard.html';
            } else {
                alert('No tienes permisos para acceder al dashboard');
            }
        } else {
            alert('Error: Credenciales inválidas');
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('Error al iniciar sesión');
    }
}

export function initializeLoginForm() {
    const loginDropdown = document.getElementById('loginDropdown');
    const loginForm = document.getElementById('loginForm');
    const loginButton = document.getElementById('loginButton');

    if (!loginDropdown || !loginForm || !loginButton) {
        console.error('No se encontró uno de los elementos necesarios');
        return;
    }

    // Alternar visibilidad del menú desplegable al hacer clic en el botón de inicio de sesión
    loginButton.addEventListener('click', (event) => {
        event.preventDefault();
        loginDropdown.style.display = loginDropdown.style.display === 'block' ? 'none' : 'block';
    });

    // Maneja el envío del formulario de inicio de sesión
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita el envío estándar del formulario

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Llama a la función de autenticación con los valores ingresados
        await authenticateUser(username, password);
    });
}

// Inicializa el formulario de inicio de sesión cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', initializeLoginForm);
