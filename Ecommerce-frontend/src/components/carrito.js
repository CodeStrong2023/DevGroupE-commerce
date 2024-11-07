// Función para abrir el popup del carrito
function openCartPopup(event) {
    event.preventDefault();
    const popup = document.getElementById('cartPopup');
    if (popup) {
        popup.style.display = 'block';
        updateCart();  // Llama a la función para actualizar el carrito
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

// Función para agregar productos al carrito
function addToCart(event) {
    const button = event.target;
    const productId = button.getAttribute('data-product-id');
    const productName = button.getAttribute('data-product-name');
    const productPrice = button.getAttribute('data-product-price');

    // Obtener el carrito del almacenamiento local
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Crear un nuevo producto
    const product = {
        id: productId,
        name: productName,
        price: parseFloat(productPrice),
        quantity: 1,
    };

    // Verificar si el producto ya está en el carrito
    const existingProductIndex = cart.findIndex(p => p.id === productId);
    if (existingProductIndex > -1) {
        // Si el producto ya está, aumentamos la cantidad
        cart[existingProductIndex].quantity += 1;
    } else {
        // Si no está en el carrito, lo agregamos
        cart.push(product);
    }

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Actualizar el carrito en la vista
    updateCart();
}

// Función para actualizar el carrito en la vista
function updateCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartTableBody = document.getElementById('cartItems');  // Cambiado a 'cartItems' según el HTML
    const totalPriceElement = document.getElementById('totalPrice');  // Cambiado a 'totalPrice' según el HTML

    // Limpiar los productos actuales del carrito en la vista
    cartTableBody.innerHTML = '';

    // Agregar productos al carrito en la vista
    cart.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td><input type="number" value="${product.quantity}" min="1" data-product-id="${product.id}" class="product-quantity"></td>
            <td>$${(product.price * product.quantity).toFixed(2)}</td>
            <td><button class="btn remove-from-cart" data-product-id="${product.id}">Eliminar</button></td>
        `;
        cartTableBody.appendChild(row);
    });

    // Actualizar el total
    const total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
    totalPriceElement.textContent = `$${total.toFixed(2)}`;
}

// Función para eliminar productos del carrito
function removeFromCart(event) {
    const button = event.target;
    const productId = button.getAttribute('data-product-id');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Eliminar el producto del carrito
    cart = cart.filter(product => product.id !== productId);

    // Guardar el carrito actualizado
    localStorage.setItem('cart', JSON.stringify(cart));

    // Actualizar el carrito en la vista
    updateCart();
}

// Función para actualizar la cantidad del producto en el carrito
function updateQuantity(event) {
    const input = event.target;
    const productId = input.getAttribute('data-product-id');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Buscar el producto y actualizar la cantidad
    const product = cart.find(p => p.id === productId);
    if (product) {
        product.quantity = parseInt(input.value, 10);
    }

    // Guardar el carrito actualizado
    localStorage.setItem('cart', JSON.stringify(cart));

    // Actualizar el carrito en la vista
    updateCart();
}

// Agregar el evento de clic a los botones "Añadir al carrito"
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', addToCart);
});
