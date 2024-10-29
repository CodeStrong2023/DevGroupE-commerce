document.addEventListener('DOMContentLoaded', () => {
    const loginContainer = document.getElementById('loginContainer');
    const closeButton = document.getElementById('closeButton');
    const formContent = document.getElementById('formContent');
  
    let currentView = 'login';
  
    const resetForm = () => {
      currentView = 'login';
      renderContent();
    };
  
    const handleLogin = async (event) => {
      event.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      try {
        const response = await fetch('http://localhost:8080/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
  
        if (response.ok) {
          const userData = await response.json();
          alert(`Bienvenido, ${userData.username}`);
          resetForm();
          window.location.href = '/dashboard'; // Redirige al dashboard
        } else {
          alert('Error: Credenciales inválidas');
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('Error al iniciar sesión');
      }
    };
  
    const renderLoginForm = () => `
      <form class="login-form" id="loginForm">
        <h2>Iniciar Sesión</h2>
        <div>
          <label>Usuario:</label>
          <input id="username" required />
        </div>
        <div>
          <label>Contraseña:</label>
          <input id="password" type="password" required />
        </div>
        <button type="submit">Iniciar Sesión</button>
        <div class="login-options">
          <button type="button" id="forgotPasswordButton">¿Olvidaste tu contraseña?</button>
          <br />
          <button type="button" id="registerButton">¿No tienes cuenta? Regístrate</button>
        </div>
      </form>
    `;
  
    const renderForgotPassword = () => `
      <div class="login-form">
        <h2>Recuperar Contraseña</h2>
        <p>Funcionalidad en construcción...</p>
        <button type="button" id="backButton">Volver</button>
      </div>
    `;
  
    const renderRegisterForm = () => `
      <div class="login-form">
        <h2>Registrarse</h2>
        <p>Funcionalidad en construcción...</p>
        <button type="button" id="backButton">Volver</button>
      </div>
    `;
  
    const renderContent = () => {
      switch (currentView) {
        case 'forgotPassword':
          formContent.innerHTML = renderForgotPassword();
          document.getElementById('backButton').onclick = () => {
            currentView = 'login';
            renderContent();
          };
          break;
        case 'register':
          formContent.innerHTML = renderRegisterForm();
          document.getElementById('backButton').onclick = () => {
            currentView = 'login';
            renderContent();
          };
          break;
        case 'login':
        default:
          formContent.innerHTML = renderLoginForm();
          document.getElementById('loginForm').onsubmit = handleLogin;
          document.getElementById('forgotPasswordButton').onclick = () => {
            currentView = 'forgotPassword';
            renderContent();
          };
          document.getElementById('registerButton').onclick = () => {
            currentView = 'register';
            renderContent();
          };
          break;
      }
    };
  
    // Manejar cierre con la tecla "Esc"
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        resetForm();
        loginContainer.style.display = 'none';
      }
    });
  
    // Cerrar formulario con el botón de cierre
    closeButton.onclick = () => {
      resetForm();
      loginContainer.style.display = 'none';
    };
  
    // Renderiza la vista inicial
    renderContent();
  });
  