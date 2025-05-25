document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    const body = document.body;

    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        
        // Toggle body background color
        if (menuOverlay.classList.contains('active')) {
            body.style.backgroundColor = 'gray';
        } else {
            body.style.backgroundColor = 'white';
        }
    });
}); 