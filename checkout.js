// Function to display cart items in the order summary
function displayOrderSummary() {
    const orderSummaryItems = document.getElementById('order-summary-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Clear previous items
    orderSummaryItems.innerHTML = '';

    if (cart.length === 0) {
        orderSummaryItems.innerHTML = '<tr><td colspan="4">Your cart is empty.</td></tr>';
        resetOrderSummary();
        return;
    }

    let subtotal = 0;

    // Loop through cart items and create rows in the order summary
    cart.forEach(item => {
        const totalPrice = item.price * item.quantity;
        subtotal += totalPrice;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>₱${item.price.toLocaleString()}</td>
            <td>₱${totalPrice.toLocaleString()}</td>
        `;
        orderSummaryItems.appendChild(row);
    });

    // Update order summary totals
    updateOrderSummary(subtotal);
}

// Function to update the order summary
function updateOrderSummary(subtotal) {
    const tax = subtotal * 0.1; 
    const total = subtotal + tax;

    document.querySelector('.subtotal').textContent = `₱${subtotal.toLocaleString()}`;
    document.querySelector('.tax').textContent = `₱${tax.toLocaleString()}`;
    document.querySelector('.total').textContent = `₱${total.toLocaleString()}`;
}

// Function to reset the order summary
function resetOrderSummary() {
    document.querySelector('.subtotal').textContent = `₱0.00`;
    document.querySelector('.tax').textContent = `₱0.00`;
    document.querySelector('.total').textContent = `₱0.00`;
}

// Function to handle form submission
function handleCheckoutFormSubmit(event) {
    event.preventDefault(); // Prevent default form submission

    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const zip = document.getElementById('zip').value;
    const phone = document.getElementById('phone').value;
    const cardNumber = document.getElementById('card-number').value;
    const expiry = document.getElementById('expiry').value;
    const cvv = document.getElementById('cvv').value;

  // Perform validation
  if (!name || !address || !city || !state || !zip || !phone || !cardNumber || !expiry || !cvv) {
    alert("Please fill in all required fields.");
    return; // Exit if validation fails
}

    // Successful checkout process
    showSuccessModal(name);

    // Clear the cart in localStorage
    localStorage.removeItem('cart');

    // Delay the redirection to allow the modal to display
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 5000); // Redirect after 5 seconds
}

// Function to show success modal
function showSuccessModal(name) {
    document.getElementById('success-message').innerText = `Thank you for your purchase, ${name}! Your order has been placed successfully.`;
    document.getElementById('success-modal').style.display = 'flex'; 
}

// Function to close the modal
function closeModal() {
    document.getElementById('success-modal').style.display = 'none';
}

// Attach event listeners
document.getElementById('checkout-form').addEventListener('submit', handleCheckoutFormSubmit);

// Call displayOrderSummary on page load
displayOrderSummary();

// Mobile menu
document.getElementById('hamburger').addEventListener('click', function() {
    const nav = document.querySelector('nav');
    nav.classList.toggle('active'); 
});