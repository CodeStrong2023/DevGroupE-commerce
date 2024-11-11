const backendUrl = import.meta.env.VITE_BACKEND_URL;

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const backButton = document.getElementById("backButton");
  const messageElement = document.getElementById("registerMessage");

  registerForm.onsubmit = async (event) => {
    event.preventDefault();

    const username = document.getElementById("regUsername").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    try {
      const response = await fetch(`${backendUrl}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        messageElement.textContent =
          "Registro exitoso. Ahora puedes iniciar sesión.";
      } else {
        messageElement.textContent =
          "Error en el registro. Intenta nuevamente.";
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      messageElement.textContent = "Error al registrar.";
    }
  };

  backButton.onclick = () => {
    window.location.href = "./"; // Volver al login
  };
});
