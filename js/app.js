// =========================
// app.js
// =========================

// App Loaded
console.log('🚀 ShopEase Frontend Loaded Successfully');

// Set current year in footer
document.addEventListener('DOMContentLoaded', () => {

    const yearElement = document.getElementById('year');

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

});

// Utility: Show alert message
function showMessage(message, type = 'success') {

    const alertBox = document.createElement('div');

    alertBox.className = `alert alert-${type} position-fixed top-0 end-0 m-3`;

    alertBox.style.zIndex = '9999';

    alertBox.innerHTML = message;

    document.body.appendChild(alertBox);

    setTimeout(() => {
        alertBox.remove();
    }, 3000);
}
