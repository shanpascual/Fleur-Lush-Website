function addItemToCart(productName, productPrice) {
    const item = {
        name: productName,
        price: productPrice,
        quantity: 1 
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the item is already in the cart
    const existingItemIndex = cart.findIndex(cartItem => cartItem.name === productName);
    
    if (existingItemIndex !== -1) {
        // If it exists, increase the quantity
        cart[existingItemIndex].quantity += 1;
    } else {
        // If it doesn't exist, add the new item
        cart.push(item);
    }

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    showModal(`${productName} has been added to your cart!`);
}

// Function to show modal
function showModal(message) {
    document.getElementById('modal-message').innerText = message; 
    document.getElementById('modal').style.display = 'block'; 
}

// Function to close the modal
function closeModal() {
    document.getElementById('modal').style.display = 'none'; 
}

// Function to display cart items
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<tr><td colspan="5">Your cart is empty. <a href="shop.html">Visit the shop</a> to add items!</td></tr>';
        resetCartSummary();
        return;
    }

    // Loop through cart items and create rows
    cart.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td><input type="number" value="${item.quantity}" min="1" class="quantity-input" onchange="updateQuantity('${item.name}', this.value)"></td>
            <td>₱${item.price.toLocaleString()}</td>
            <td>₱${(item.price * item.quantity).toLocaleString()}</td>
            <td><button class="remove-btn" onclick="removeItemFromCart('${item.name}')">Remove</button></td>
        `;
        cartItemsContainer.appendChild(row);
    });

    // Update cart summary
    updateCartSummary();
}

// Call displayCartItems on page load
window.onload = function() {
    displayCartItems();
};

// Function to update the quantity
function updateQuantity(productName, newQuantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.name === productName);
    if (itemIndex !== -1) {
        cart[itemIndex].quantity = parseInt(newQuantity, 10);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems(); 
    }
}

// Remove item from cart
function removeItemFromCart(productName) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log('Cart before removal:', cart); 
    console.log('Removing item:', productName); 
    
    cart = cart.filter(item => item.name !== productName);
    
    console.log('Cart after removal:', cart); 
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems(); 
}

// Function to update cart summary
function updateCartSummary() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.1; 
    const total = subtotal + tax;

    document.querySelector('.subtotal').textContent = `₱${subtotal.toLocaleString()}`;
    document.querySelector('.tax').textContent = `₱${tax.toLocaleString()}`;
    document.querySelector('.total').textContent = `₱${total.toLocaleString()}`;
}

// Function to reset cart summary
function resetCartSummary() {
    document.querySelector('.subtotal').textContent = `₱0.00`;
    document.querySelector('.tax').textContent = `₱0.00`;
    document.querySelector('.total').textContent = `₱0.00`;
}

//  Mobile menu
document.getElementById('hamburger').addEventListener('click', function() {
    const nav = document.querySelector('nav');
    nav.classList.toggle('active'); 
});