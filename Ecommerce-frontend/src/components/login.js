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
          // Aquí podrías actualizar la interfaz para indicar que el usuario ha iniciado sesión
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

  // Verifica si los elementos están presentes
  console.log('Elementos encontrados:', {
      loginDropdown,
      loginForm,
      loginButton
  });

  if (!loginDropdown || !loginForm || !loginButton) {
      console.error('No se encontró uno de los elementos necesarios');
      return;
  }

  // Alternar la visibilidad del menú desplegable
  loginButton.addEventListener('click', (event) => {
      event.preventDefault();
      console.log('Click en loginButton');
      loginDropdown.style.display = loginDropdown.style.display === 'block' ? 'none' : 'block';
      console.log('Estado del loginDropdown:', loginDropdown.style.display);
  });
}


// Inicializa el formulario de inicio de sesión cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', initializeLoginForm);
