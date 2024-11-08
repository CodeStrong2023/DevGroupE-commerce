document.addEventListener('DOMContentLoaded', () => {
    // Asegúrate de usar la ruta correcta según la ubicación de tu archivo footer.js
    fetch('../components/footer.html')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al cargar el footer: ' + response.statusText);
        }
        return response.text();
      })
      .then(data => {
        // Asegúrate de que el elemento con id "footerContainer" exista en el DOM
        const footerContainer = document.getElementById('footerContainer');
        if (footerContainer) {
          footerContainer.innerHTML = data;
        } else {
          console.error('No se encontró el contenedor del footer.');
        }
      })
      .catch(error => console.error('Error al cargar el footer:', error));
});
