document.getElementById("changePasswordForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita la recarga de la página

    // Obtener el email del localStorage
    const email = localStorage.getItem("email");

    // Obtener los valores de las contraseñas
    const currentPassword = document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    



    try {
        // Enviar la solicitud PUT al backend
        const response = await fetch(`http://localhost:8080/users/change-password`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email, currentPassword: currentPassword, newPassword: newPassword }),
        });

        // Verificar si la solicitud fue exitosa
        if (response.ok) {
            alert("Contraseña restablecida con éxito");
            window.location.href = "/"; // Redirige al inicio
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message || "No se pudo restablecer la contraseña"}`);
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        alert("Hubo un error al intentar restablecer la contraseña. Inténtalo de nuevo más tardes");
    }
});