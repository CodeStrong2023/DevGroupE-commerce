document.getElementById("resetPasswordForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita la recarga de la página

    // Obtener el token de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    
    if (!token) {
        alert("Token inválido o faltante.");
        return;
    }

    // Obtener los valores de las contraseñas
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Verificar que las contraseñas coincidan
    if (newPassword !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    try {
        // Enviar la solicitud POST al backend
        const response = await fetch("http://localhost:8080/users/reset-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: token, newPassword: newPassword }),
        });

        // Verificar si la solicitud fue exitosa
        if (response.ok) {
            alert("Contraseña restablecida con éxito.");
            window.location.href = "/"; // Redirige al inicio
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message || "No se pudo restablecer la contraseña."}`);
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        alert("Hubo un error al intentar restablecer la contraseña. Inténtalo de nuevo más tarde.");
    }
});
