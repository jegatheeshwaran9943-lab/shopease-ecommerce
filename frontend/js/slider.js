// =========================
// slider.js
// =========================

document.addEventListener('DOMContentLoaded', () => {

    const slider = document.querySelector('#slider');

    if (slider) {

        new bootstrap.Carousel(slider, {

            interval: 3000,   // Change slide every 3 seconds

            pause: false,     // Do not pause on hover

            ride: 'carousel',

            wrap: true         // Loop continuously

        });

    }

});