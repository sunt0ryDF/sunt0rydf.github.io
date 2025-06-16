class HamburgerMenu {
    constructor() {
        this.hamburgerMenu = document.querySelector('.hamburger-menu');
        this.menuOverlay = document.querySelector('.menu-overlay');
        this.isOpen = false;
        this.init();
    }

    init() {
        // Click handler
        this.hamburgerMenu.addEventListener('click', () => this.toggleMenu());

        // Keyboard navigation
        this.hamburgerMenu.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggleMenu();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeMenu();
            }
        });

        // Close on click outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && 
                !this.menuOverlay.contains(e.target) && 
                !this.hamburgerMenu.contains(e.target)) {
                this.closeMenu();
            }
        });

        // Handle focus trap
        this.menuOverlay.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                const focusableElements = this.menuOverlay.querySelectorAll(
                    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
                );
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        });
    }

    toggleMenu() {
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        this.isOpen = true;
        this.hamburgerMenu.classList.add('active');
        this.menuOverlay.classList.add('active');
        this.hamburgerMenu.setAttribute('aria-expanded', 'true');
        this.menuOverlay.setAttribute('aria-hidden', 'false');
        
        // Focus first focusable element
        const firstFocusable = this.menuOverlay.querySelector(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (firstFocusable) {
            firstFocusable.focus();
        }
    }

    closeMenu() {
        this.isOpen = false;
        this.hamburgerMenu.classList.remove('active');
        this.menuOverlay.classList.remove('active');
        this.hamburgerMenu.setAttribute('aria-expanded', 'false');
        this.menuOverlay.setAttribute('aria-hidden', 'true');
        
        // Return focus to hamburger button
        this.hamburgerMenu.focus();
    }
}

// Initialize the hamburger menu when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HamburgerMenu();
}); 