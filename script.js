class Showcase {
    constructor() {
        this.showcaseGrid = document.querySelector('.showcase-grid');
        this.photoFlexRow = document.querySelector('.photo-flex-row');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.lightbox = document.querySelector('.lightbox');
        this.lightboxImage = document.querySelector('.lightbox-image');
        this.lightboxCaption = document.querySelector('.lightbox-caption');
        this.currentIndex = 0;
        this.images = [];
        this.filteredImages = [];
        this.activeFilter = 'photos'; // Default to photos
        this.init();
    }

    init() {
        this.loadImages();
        this.addEventListeners();
        this.initIntersectionObserver();
        this.preselectPhotos();
        this.handleLoading();
    }

    handleLoading() {
        // Wait for images to load
        const imagePromises = this.images.map(img => {
            return new Promise((resolve) => {
                const image = new Image();
                image.onload = resolve;
                image.onerror = resolve; // Resolve even on error to not block loading
                image.src = img.src;
            });
        });

        // Wait for all images to load or timeout after 2 seconds
        Promise.race([
            Promise.all(imagePromises),
            new Promise(resolve => setTimeout(resolve, 2000))
        ]).then(() => {
            // Add fade-out class to loading overlay
            const loadingOverlay = document.querySelector('.loading-overlay');
            if (loadingOverlay) {
                loadingOverlay.classList.add('fade-out');
                // Remove the overlay after animation completes
                setTimeout(() => {
                    loadingOverlay.remove();
                }, 500);
            }
        });
    }

    preselectPhotos() {
        const photosBtn = Array.from(this.filterButtons).find(btn => btn.dataset.filter === 'photos');
        if (photosBtn) {
            this.filterImages(photosBtn);
        }
    }

    loadImages() {
        // The format is: filename, title, description
        const imageData = {
            collection: [
                { filename: 'Collection log (Blood quartz) 2025-05-25_21-37-01.png', title: 'Blood quartz', description: '2025-05-25' },
                { filename: 'Collection log (Zenyte shard) 2025-05-22_22-33-20.png', title: 'Zenyte shard', description: '2025-05-22' },
                { filename: 'Collection log (Bandos boots) 2025-05-22_19-17-30.png', title: 'Bandos boots', description: '2025-05-22' },
                { filename: 'Collection log (Bandos tassets) 2025-05-19_21-56-45.png', title: 'Bandos tassets', description: '2025-05-19' },
                { filename: 'Collection log (Seers ring) 2025-05-11_17-23-57.png', title: 'Seers ring', description: '2025-05-11' },
                { filename: 'Collection log (Mud battlestaff) 2025-05-11_09-25-40.png', title: 'Mud battlestaff', description: '2025-05-11' },
                { filename: 'Collection log (Archers ring) 2025-05-11_08-09-43.png', title: 'Archers ring', description: '2025-05-11' },
                { filename: 'Collection log (Seercull) 2025-05-11_07-12-41.png', title: 'Seercull', description: '2025-05-11' },
                { filename: 'Collection log (Godsword shard 3) 2025-05-10_19-34-49.png', title: 'Godsword shard 3', description: '2025-05-10' }
            ],
            achievements: [
                { filename: '1936 Total Level 2025-05-26 200258.png', title: '1936 Total Level', description: '2025-05-26: State of the Account. Current goals are to get sufficient Crafting level for Zenytes and Fury, as well as Explorer\'s Ring 4 and Varrock Armour 4' }
            ],
            photos: [
                { filename: 'Full Bandos.png', title: 'Full Bandos', description: '2025-05-26: Childhood dream accomplished on the Ironman in May 2025. Full bandos in 578kc ft. a Black tourmaline core spoon.' }
            ]
        };
        // Flatten all images into a single array with category
        this.images = [];
        Object.entries(imageData).forEach(([category, arr]) => {
            arr.forEach(img => {
                this.images.push({
                    src: `Images/showcase/${category}/${img.filename}`,
                    alt: img.title,
                    title: img.title,
                    description: img.description,
                    category: category
                });
            });
        });
        this.filteredImages = [...this.images];
        this.renderImages();
    }

    addEventListeners() {
        // Filter buttons
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => this.filterImages(button));
        });

        // Showcase items (for both grid and flex row)
        this.showcaseGrid.addEventListener('click', (e) => {
            const item = e.target.closest('.showcase-item');
            if (item) {
                this.openLightbox(parseInt(item.dataset.index));
            }
        });
        this.photoFlexRow.addEventListener('click', (e) => {
            const item = e.target.closest('.showcase-item');
            if (item) {
                this.openLightbox(parseInt(item.dataset.index));
            }
        });

        // Carousel navigation (delegated)
        this.photoFlexRow.addEventListener('click', (e) => {
            if (e.target.classList.contains('carousel-prev')) this.showPrevPhoto();
            if (e.target.classList.contains('carousel-next')) this.showNextPhoto();
        });

        // Lightbox controls
        document.querySelector('.lightbox-close').addEventListener('click', () => this.closeLightbox());
        document.querySelector('.lightbox-prev').addEventListener('click', () => this.prevImage());
        document.querySelector('.lightbox-next').addEventListener('click', () => this.nextImage());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.photoFlexRow.style.display !== 'none') {
                if (e.key === 'ArrowLeft') this.showPrevPhoto();
                if (e.key === 'ArrowRight') this.showNextPhoto();
            }
            if (!this.lightbox.classList.contains('active')) return;
            switch(e.key) {
                case 'Escape':
                    this.closeLightbox();
                    break;
                case 'ArrowLeft':
                    this.prevImage();
                    break;
                case 'ArrowRight':
                    this.nextImage();
                    break;
            }
        });
    }

    filterImages(button) {
        const filter = button.dataset.filter;
        this.activeFilter = filter;
        // Update active button
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        // Filter images
        this.filteredImages = filter === 'all' 
            ? [...this.images]
            : this.images.filter(image => image.category === filter);
        // For photos, show only one at a time and show arrows
        if (filter === 'photos') {
            this.currentIndex = 0;
            this.photoFlexRow.style.display = 'flex';
            this.showcaseGrid.style.display = 'none';
        } else {
            this.photoFlexRow.style.display = 'none';
            this.showcaseGrid.style.display = '';
        }
        this.renderImages();
    }

    renderImages() {
        if (this.activeFilter === 'photos') {
            this.photoFlexRow.innerHTML = '';
            if (this.filteredImages.length === 0) return;
            const image = this.filteredImages[this.currentIndex];
            this.photoFlexRow.innerHTML = `
                <button class="carousel-prev" aria-label="Previous photo">&#8249;</button>
                <article class="showcase-item" data-index="${this.currentIndex}">
                    <div class="image-container">
                        <img src="${image.src}" alt="${image.alt}" loading="lazy">
                        <div class="image-overlay">
                            <h3>${image.title}</h3>
                            <p>${image.description}</p>
                        </div>
                    </div>
                </article>
                <button class="carousel-next" aria-label="Next photo">&#8250;</button>
            `;
        } else {
            this.showcaseGrid.innerHTML = '';
            if (this.filteredImages.length === 1) {
                this.showcaseGrid.classList.add('single-item');
            } else {
                this.showcaseGrid.classList.remove('single-item');
            }
            this.filteredImages.forEach((image, index) => {
                const item = document.createElement('article');
                item.className = 'showcase-item';
                item.dataset.index = index;
                item.innerHTML = `
                    <div class="image-container">
                        <img src="${image.src}" alt="${image.alt}" loading="lazy">
                        <div class="image-overlay">
                            <h3>${image.title}</h3>
                            <p>${image.description}</p>
                        </div>
                    </div>
                `;
                this.showcaseGrid.appendChild(item);
            });
        }
    }

    showPrevPhoto() {
        if (this.filteredImages.length === 0) return;
        this.currentIndex = (this.currentIndex - 1 + this.filteredImages.length) % this.filteredImages.length;
        this.renderImages();
    }

    showNextPhoto() {
        if (this.filteredImages.length === 0) return;
        this.currentIndex = (this.currentIndex + 1) % this.filteredImages.length;
        this.renderImages();
    }

    openLightbox(index) {
        this.currentIndex = index;
        const image = this.filteredImages[index];
        this.lightboxImage.src = image.src;
        this.lightboxImage.alt = image.alt;
        this.lightboxCaption.querySelector('h3').textContent = image.title;
        this.lightboxCaption.querySelector('p').textContent = image.description;
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    prevImage() {
        this.currentIndex = (this.currentIndex - 1 + this.filteredImages.length) % this.filteredImages.length;
        this.openLightbox(this.currentIndex);
    }

    nextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.filteredImages.length;
        this.openLightbox(this.currentIndex);
    }

    initIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target.querySelector('img');
                    if (img && img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, options);
        // Observe all showcase items
        document.querySelectorAll('.showcase-item').forEach(item => {
            observer.observe(item);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Showcase();
});
