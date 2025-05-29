document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const menuOverlay = document.querySelector('.menu-overlay');

    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
    });
}); 
