class HamburgerMenu {
    constructor() {
        this.hamburgerMenu = document.querySelector('.hamburger-menu');
        this.menuOverlay = document.querySelector('.menu-overlay');
        this.init();
    }

    init() {
        this.hamburgerMenu.addEventListener('click', () => {
            this.hamburgerMenu.classList.toggle('active');
            this.menuOverlay.classList.toggle('active');
        });
    }
}

// Initialize the hamburger menu when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HamburgerMenu();
}); 