// Función para abrir el popup del carrito
function openCartPopup(event) {
    event.preventDefault();  // Evita la redirección inmediata
    const popup = document.getElementById('cartPopup');
    if (popup) {
        popup.style.display = 'block';
    } else {
        console.warn('El popup de carrito no está definido en el HTML.');
    }
}

// Función para cerrar el popup del carrito
function closeCartPopup() {
    const popup = document.getElementById('cartPopup');
    if (popup) {
        popup.style.display = 'none';
    }
}

// Función para redirigir a la página del carrito
function goToCart() {
    window.location.href = '../../carrito.html';  // Asegúrate de que esta ruta sea correcta
}

// Agregar eventos al ícono del carrito y al botón de cerrar
document.addEventListener('DOMContentLoaded', function() {
    // Ícono del carrito en la esquina superior derecha
    const cartIcon = document.querySelector('[aria-label="Carrito de compras"]');
    if (cartIcon) {
        cartIcon.addEventListener('click', openCartPopup);
    } else {
        console.warn('Ícono de carrito no encontrado.');
    }

    // Botón para cerrar el popup
    const closeButton = document.querySelector('#cartPopup .close-button');  // Asegúrate de tener un botón con clase "close-button" en el popup
    if (closeButton) {
        closeButton.addEventListener('click', closeCartPopup);
    }

    // Botón para ir al carrito en el popup
    const goToCartButton = document.querySelector('#cartPopup .go-to-cart-button');  // Asegúrate de tener un botón con clase "go-to-cart-button" en el popup
    if (goToCartButton) {
        goToCartButton.addEventListener('click', goToCart);
    }
});
