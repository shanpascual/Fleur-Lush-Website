// Function to open the modal
function openModal() {
    document.getElementById('messageModal').style.display = "block";
}

// Function to close the modal
function closeModal() {
    document.getElementById('messageModal').style.display = "none";
}

// Add event listener for the form
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    
    // Show the modal
    openModal();
    
    this.reset();
});

window.onclick = function(event) {
    const modal = document.getElementById('messageModal');
    if (event.target == modal) {
        closeModal();
    }
}

// Mobile menu
document.getElementById('hamburger').addEventListener('click', function() {
    const nav = document.querySelector('nav');
    nav.classList.toggle('active'); 
});