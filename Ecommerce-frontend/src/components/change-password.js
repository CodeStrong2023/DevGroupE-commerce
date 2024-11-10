document.getElementById("changePasswordForm").addEventListener("submit", async function (event) {
    event.preventDefault(); 

    // Obteniene el email del localStorage
    const email = localStorage.getItem("email");

    // Obteniene los valores de las contraseñas
    const currentPassword = document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    



    try {
        // Envia la solicitud PUT al backend
        const response = await fetch(`http://localhost:8080/users/change-password`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email, currentPassword: currentPassword, newPassword: newPassword }),
        });

        if (response.ok) {
            alert("Contraseña restablecida con éxito");
            window.location.href = "/"; 
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message || "No se pudo restablecer la contraseña"}`);
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        alert("Hubo un error al intentar restablecer la contraseña. Inténtalo de nuevo más tardes");
    }
});