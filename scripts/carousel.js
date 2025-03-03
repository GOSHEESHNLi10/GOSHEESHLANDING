// 3D Orbit Carousel for GOSHEESH NFTs

document.addEventListener('DOMContentLoaded', function() {
    // Configuration for the carousel
    const config = {
        numItems: 10, // Number of NFTs to display
        radius: 700, // Radius of the orbit
        autoRotate: true, // Whether to auto-rotate
        rotationSpeed: 0.005, // Speed of auto-rotation
        videoSources: [
            // Replace these with your actual video paths once you have them
            'assets/nft1.mp4',
            'assets/nft2.mp4',
            'assets/nft3.mp4',
            'assets/nft4.mp4',
            'assets/nft5.mp4',
            'assets/nft6.mp4',
            'assets/nft7.mp4',
            'assets/nft8.mp4',
            'assets/nft9.mp4',
            'assets/nft10.mp4'
        ]
    };

    // Elements
    const carouselOrbit = document.querySelector('.carousel-orbit');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    // State variables
    let currentIndex = 0;
    let currentAngle = 0;
    let targetAngle = 0;
    let isAnimating = false;

    // Create carousel items
    function createCarouselItems() {
        for (let i = 0; i < config.numItems; i++) {
            const item = document.createElement('div');
            item.className = 'carousel-item';
            if (i === 0) item.classList.add('active');

            // Create video element
            const video = document.createElement('video');
            video.src = config.videoSources[i % config.videoSources.length];
            video.loop = true;
            video.muted = true;
            video.playsInline = true;
            
            // Only autoplay the active video
            if (i === 0) {
                video.autoplay = true;
            }

            item.appendChild(video);
            carouselOrbit.appendChild(item);
            
            // Position in 3D space
            positionItem(item, i);
        }
    }

    // Position an item in 3D space
    function positionItem(item, index) {
        const angle = (index * 2 * Math.PI / config.numItems) + currentAngle;
        const x = Math.sin(angle) * config.radius;
        const z = Math.cos(angle) * config.radius;
        
        // Apply 3D transform
        item.style.transform = `translateX(calc(-50% + ${x}px)) translateY(-50%) translateZ(${z}px)`;
        
        // Adjust opacity based on z position (items in front are more visible)
        const opacity = (z + config.radius) / (config.radius * 2);
        item.style.opacity = Math.max(0.4, opacity).toFixed(2);
        
        // Adjust scale based on z position (items in front are larger)
        const scale = 0.8 + ((z + config.radius) / (config.radius * 2)) * 0.4;
        item.style.transform += ` scale(${scale.toFixed(2)})`;
        
        // Store the angle for reference
        item.dataset.angle = angle;
    }

    // Update carousel rotation
    function updateCarousel() {
        const items = document.querySelectorAll('.carousel-item');
        
        // Find which item should be active
        const angleIncrement = 2 * Math.PI / config.numItems;
        let closestIndex = 0;
        let closestDistance = Infinity;
        
        items.forEach((item, index) => {
            const itemAngle = parseFloat(item.dataset.angle);
            const distance = Math.abs(((itemAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI));
            
            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }
            
            // Update position
            positionItem(item, index);
        });
        
        // Update active class
        items.forEach((item, index) => {
            if (index === closestIndex) {
                if (!item.classList.contains('active')) {
                    // Pause all videos
                    items.forEach(i => {
                        const video = i.querySelector('video');
                        video.pause();
                    });
                    
                    // Play active video
                    const activeVideo = item.querySelector('video');
                    activeVideo.currentTime = 0;
                    activeVideo.play();
                    
                    // Update active class
                    document.querySelector('.carousel-item.active')?.classList.remove('active');
                    item.classList.add('active');
                    currentIndex = closestIndex;
                }
            }
        });
    }

    // Animation loop
    function animate() {
        if (isAnimating) {
            // Smoothly interpolate current angle towards target angle
            const angleDiff = targetAngle - currentAngle;
            currentAngle += angleDiff * 0.1;
            
            // If almost at target, snap to it
            if (Math.abs(angleDiff) < 0.01) {
                currentAngle = targetAngle;
                isAnimating = false;
            }
        } else if (config.autoRotate) {
            // Auto rotate
            currentAngle += config.rotationSpeed;
        }
        
        // Apply rotation to all items
        updateCarousel();
        
        // Continue animation loop
        requestAnimationFrame(animate);
    }

    // Event handlers
    function goToNext() {
        targetAngle = currentAngle + (2 * Math.PI / config.numItems);
        isAnimating = true;
    }

    function goToPrev() {
        targetAngle = currentAngle - (2 * Math.PI / config.numItems);
        isAnimating = true;
    }
    
    // Touch and swipe handling
    let touchStartX = 0;
    let touchEndX = 0;
    
    function handleTouchStart(e) {
        touchStartX = e.changedTouches[0].screenX;
    }
    
    function handleTouchEnd(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left
            goToNext();
        } else if (touchEndX > touchStartX + 50) {
            // Swipe right
            goToPrev();
        }
    }

    // Initialize carousel
    function init() {
        createCarouselItems();
        animate();
        
        // Set up event listeners
        prevBtn.addEventListener('click', goToPrev);
        nextBtn.addEventListener('click', goToNext);
        
        // Touch events
        carouselOrbit.addEventListener('touchstart', handleTouchStart);
        carouselOrbit.addEventListener('touchend', handleTouchEnd);
        
        // Pause auto-rotate on hover
        carouselOrbit.addEventListener('mouseenter', () => {
            config.autoRotate = false;
        });
        
        carouselOrbit.addEventListener('mouseleave', () => {
            config.autoRotate = true;
        });
    }

    // Start the carousel
    init();
});