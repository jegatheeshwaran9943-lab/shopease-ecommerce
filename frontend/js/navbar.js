// =========================
// navbar.js
// =========================

window.addEventListener('scroll', () => {

    const navbar = document.querySelector('.navbar');

    if (!navbar) return;

    if (window.scrollY > 50) {

        navbar.classList.add('shadow');

        navbar.style.backgroundColor = '#212529';

    } else {

        navbar.classList.remove('shadow');

        navbar.style.backgroundColor = '';

    }

});

// Highlight active nav link
document.addEventListener('DOMContentLoaded', () => {

    const currentPage = window.location.pathname.split('/').pop();

    document.querySelectorAll('.nav-link').forEach(link => {

        const href = link.getAttribute('href');

        if (href === currentPage) {
            link.classList.add('active');
        }

    });

});