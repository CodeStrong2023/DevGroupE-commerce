document.addEventListener('DOMContentLoaded', () => {
    // Verifica si el usuario tiene permiso de acceso (solo ADMIN)
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'ADMIN') {
        alert('No tienes permisos para acceder a esta página');
        window.location.href = '/login.html'; // Redirige al inicio de sesión
        return;
    }

    // Selecciona el formulario y añade el evento para el envío
    const gameForm = document.getElementById('gameForm');
    gameForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita el envío estándar del formulario

        // Recoge los datos del formulario
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const price = parseFloat(document.getElementById('price').value);
        const publishDate = document.getElementById('publishDate').value;
        const images = document.getElementById('images').files;

        // Prepara los datos para enviar al backend
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('releaseDate', releaseDate);

        // Agrega cada imagen seleccionada al FormData
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }

        try {
            // Envía los datos al backend
            const response = await fetch('http://localhost:8080/admin/games', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Juego guardado con éxito');
                gameForm.reset(); // Limpia el formulario tras guardar
            } else {
                alert('Error al guardar el juego');
            }
        } catch (error) {
            console.error('Error al enviar el juego:', error);
            alert('Error al enviar el juego');
        }
    });
});
