function openCartPopup() {
  const popup = document.getElementById("cartPopup");
  if (popup) {
    popup.style.display = "block";
    updateCart();
  }
}

function closeCartPopup() {
  const popup = document.getElementById("cartPopup");
  if (popup) {
    popup.style.display = "none";
  }
}

function addToCart(game) {
  const cartItem = {
    id: game.id,
    title: game.title,
    price: game.price,
  };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItem = cart.find((item) => item.id === cartItem.id);

  if (!existingItem) {
    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Juego agregado al carrito correctamente.");
  } else {
    alert("El juego ya está en el carrito");
  }
}

function updateCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartTableBody = document.getElementById("cartItems");
  const totalPriceElement = document.getElementById("totalPrice");

  cartTableBody.innerHTML = "";

  cart.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${product.title}</td>
      <td>$${product.price.toFixed(2)}</td>
      <td><button class="btn remove-from-cart" data-product-id="${product.id}">Eliminar</button></td>
    `;
    cartTableBody.appendChild(row);
  });

  const total = cart.reduce((sum, product) => sum + product.price, 0);
  totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;
  localStorage.setItem('total-carrito', total);

  cartTableBody.querySelectorAll(".remove-from-cart").forEach((button) => {
    button.addEventListener("click", removeFromCart);
  });
}

async function processPayment() {
  total = localStorage.getItem('total-carrito');
  try {
    const orderData = {
      title: "VARIOS",        // Título genérico para múltiples productos
      quantity: 1,            // Cantidad fija para el total acumulado
      unit_price: total       // Total del carrito
    };

    console.log(orderData);
    const response = await fetch("http://localhost:8080/mp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData), // Enviamos directamente el JSON
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const preferenceId = await response.text();
    if (preferenceId) {
      createCheckoutButton(preferenceId);
    } else {
      console.error("No se pudo crear la preferencia de pago");
    }
  } catch (error) {
    console.error("Error al enviar la solicitud:", error.message);
    alert("ERROR: " + error.message);
  }
}



function removeFromCart(event) {
  const button = event.target;
  const productId = parseInt(button.getAttribute("data-product-id"));
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart = cart.filter((product) => product.id !== productId);

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

const createCheckoutButton = (preferenceId) => {
  const walletContainer = document.getElementById("wallet_container");

  if (walletContainer) {
    walletContainer.innerHTML = "";
    const mp = new window.MercadoPago("APP_USR-22e6ef29-e6b7-49f3-aa7e-c8d85937802e", {
      locale: "es-AR",
    });

    mp.checkout({
      preference: {
        id: preferenceId,
      },
      render: {
        container: "#wallet_container",
        label: "Pagar con Mercado Pago",
        mode: "modal",
      },
    });
  }
};

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
    button.addEventListener("click", addToCart);
  });

  const cartIcon = document.querySelector('[aria-label="Carrito de compras"]');
  if (cartIcon) {
    cartIcon.addEventListener("click", openCartPopup);
  }

  const closeButton = document.querySelector("#cartPopup .close-button");
  if (closeButton) {
    closeButton.addEventListener("click", closeCartPopup);
  }
});
