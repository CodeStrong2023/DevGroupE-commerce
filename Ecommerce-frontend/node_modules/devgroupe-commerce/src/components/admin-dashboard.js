document.addEventListener('DOMContentLoaded', () => {
    // Verifica si el usuario tiene permiso de acceso (solo ADMIN)
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'ADMIN') {
        alert('No tienes permisos para acceder a esta página');
        window.location.href = '/'; // Redirige al inicio de sesión
        return;
    }

    // Selecciona el formulario y añade el evento para el envío
    const gameForm = document.getElementById('gameForm');
    gameForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Recoger y validar los datos
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const price = parseFloat(document.getElementById('price').value);
        const categoryId = parseFloat(document.getElementById('categoryId').value);
        const ownerId = parseInt(document.getElementById('ownerId').value);
        const releaseDate = new Date(document.getElementById('releaseDate').value).toISOString().split('T')[0];
        const imagesInput = document.getElementById('images').value;
        const images = imagesInput.split(',').map(url => url.trim());

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price); 
        formData.append('categoryId', categoryId); 
        formData.append('ownerId', ownerId);
        formData.append('releaseDate', releaseDate);

        images.forEach((url) => {
            formData.append('images', url);
        });

        try {
            console.log(title, description, price, categoryId, ownerId, releaseDate, images);
            const response = await fetch('http://localhost:8080/games', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Juego guardado con éxito');
                gameForm.reset();
            } else {
                alert('Error al guardar el juego');
            }
        } catch (error) {
            console.error('Error al enviar el juego:', error);
            alert('Error al enviar el juego');
        }
    });
});
