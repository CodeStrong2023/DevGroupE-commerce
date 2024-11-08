// Función para abrir el popup del carrito
function openCartPopup() {
    const popup = document.getElementById('cartPopup');
    if (popup) {
        popup.style.display = 'block';
        updateCart();  // Llama a la función para actualizar el carrito cuando se abre el popup
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

function addToCart(game) {
    const cartItem = {
        id: game.id,
        title: game.title,
        price: game.price,
    };

    // Obtener el carrito actual de localStorage o crear uno nuevo si no existe
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log(cart);
    // Verificar si el juego ya está en el carrito
    const existingItem = cart.find(item => item.id === cartItem.id);
    console.log(existingItem);
    if (!existingItem) {
        cart.push(cartItem); // Agregar el nuevo juego al carrito
        // Guardar el carrito actualizado en localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        alert("Juego agregado al carrito correctamente.");           
    } else {
        alert("El juego ya está cargado");
    }
}

// Función para actualizar el carrito en la vista
function updateCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartTableBody = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');

    // Limpiar contenido previo del carrito para evitar duplicados
    cartTableBody.innerHTML = '';

    // Agregar productos al carrito en la vista
    cart.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.title}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td><button class="btn remove-from-cart" data-product-id="${product.id}">Eliminar</button></td>
        `;
        cartTableBody.appendChild(row);
    });

    // Actualizar el total
    const total = cart.reduce((sum, product) => sum + product.price, 0);
    totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;

    // Agregar eventos a los botones de eliminar y campos de cantidad
    cartTableBody.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
}

// Función para eliminar productos del carrito
function removeFromCart(event) {
    const button = event.target;
    const productId = parseInt(button.getAttribute('data-product-id'));
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Eliminar el producto del carrito
    cart = cart.filter(product => product.id !== productId);

    // Guardar el carrito actualizado
    localStorage.setItem('cart', JSON.stringify(cart));

    // Actualizar el carrito en la vista
    updateCart();
}

// Agregar el evento de clic a los botones "Añadir al carrito" cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', addToCart);
    });

    // Agregar eventos al ícono del carrito y al botón de cerrar
    const cartIcon = document.querySelector('[aria-label="Carrito de compras"]');
    if (cartIcon) {
        cartIcon.addEventListener('click', openCartPopup);
    }

    const closeButton = document.querySelector('#cartPopup .close-button');
    if (closeButton) {
        closeButton.addEventListener('click', closeCartPopup);
    }
});
