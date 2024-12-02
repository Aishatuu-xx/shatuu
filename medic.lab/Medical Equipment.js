const cart = [];
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');

// Add to Cart Functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));

        const item = cart.find(item => item.name === name);

        if (item) {
            item.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        updateCart();
    });
});

// Update Cart
function updateCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${item.name} - $${item.price} x ${item.quantity}
            <button class="remove" data-index="${index}">Remove</button>
        `;
        cartItemsContainer.appendChild(listItem);
    });

    cartTotal.textContent = total.toFixed(2);

    // Remove Item from Cart
    document.querySelectorAll('.remove').forEach(button => {
        button.addEventListener('click', () => {
            const index = parseInt(button.getAttribute('data-index'));
            cart.splice(index, 1);
            updateCart();
        });
    });
}

// Handle Payment
document.getElementById('payment-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Payment Successful! Thank you for your purchase.');
    cart.length = 0; // Clear cart
    updateCart();
});
