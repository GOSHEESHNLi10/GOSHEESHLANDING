// 3D Orbit Carousel for GOSHEESH NFTs with Lore Integration

document.addEventListener('DOMContentLoaded', function() {
    // Configuration for the carousel
    const config = {
        numItems: 10, // Number of NFTs to display
        radius: 380, // For desktop
        autoRotate: true, // Whether to auto-rotate
        rotationSpeed: -0.003, // Negative value to reverse spin direction
        // Video sources and lore segments remain the same
        videoSources: [
            'assets/1GOSHEESH.mp4',
            'assets/2GOSHEESH.mp4',
            'assets/3GOSHEESH.mp4',
            'assets/4GOSHEESH.mp4',
            'assets/5GOSHEESH.mp4',
            'assets/6GOSHEESH.mp4',
            'assets/7GOSHEESH.mp4',
            'assets/8GOSHEESH.mp4',
            'assets/9GOSHEESH.mp4',
            'assets/10GOSHEESH.mp4'
        ],
        loreSegments: [
            "FROM PURE SOURCE *LIGHT ENERGY* CAME GAIA (1/10)", 
            "SHE CREATED LIFE FROM COSMIC ESSENCE (2/10)", 
            "GOSHEESH EMERGED AS A GIFTED YOUNG WIZARD (3/10)", 
            "HE FORMED BONDS WITH MYTHICAL CREATURES ACROSS REALMS (4/10)", 
            "WHEN HIS SOUL GRADUATED INTO THE HEART (5/10)", 
            "HE FOUND HIS WAY BACK TO GAIA (6/10)", 
            "SHE AWAKENED HIS TRUE CELESTIAL VOICE (7/10)", 
            "WITH PROFOUND COSMIC WISDOM HE BORE WITNESS (8/10)", 
            "AS HIS GOLDEN CHILD OF LIGHT WAS BORN INTO BEING (9/10)", 
            "HIS FORM WAS THEN TAKEN BY THE PURE LOVING SOURCE LIGHT FROM WHICH GAIA CAME (10/10)"
        ]
    };

    // Elements
    const carouselOrbit = document.querySelector('.carousel-orbit');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const carouselContainer = document.querySelector('.carousel-container');

    // Create lore display element if it doesn't exist
    let loreDisplay = document.querySelector('.lore-display');
    if (!loreDisplay) {
        loreDisplay = document.createElement('div');
        loreDisplay.className = 'lore-display';
        carouselContainer.appendChild(loreDisplay);
    }

    // State variables
    let currentIndex = 0; // Start with first card (maintaining order)
    let currentAngle = 0;
    let targetAngle = 0;
    let isAnimating = false;
    let isMobile = window.innerWidth < 768;
    let touchStartX = 0;
    let touchEndX = 0;
    let carouselAutoRotateInterval = null;
    
    // Helper functions to get previous and next indices
    function getPrevIndex(current) {
        return (current - 1 + config.numItems) % config.numItems;
    }

    function getNextIndex(current) {
        return (current + 1) % config.numItems;
    }
    
    // Check if mobile and set up the appropriate carousel
    function checkMobile() {
        const wasMobile = isMobile;
        isMobile = window.innerWidth < 768;
        
        // If device type changed, reinitialize the appropriate carousel
        if (wasMobile !== isMobile) {
            // Clear auto-rotation interval if exists
            if (carouselAutoRotateInterval) {
                clearInterval(carouselAutoRotateInterval);
                carouselAutoRotateInterval = null;
            }
            initCarousel();
        }
    }
    
    // Create carousel items based on device type
    function initCarousel() {
        carouselOrbit.innerHTML = ''; // Clear any existing items
        
        if (isMobile) {
            initMobileCarousel();
        } else {
            initDesktopCarousel();
        }
    }
    
    // Mobile-specific carousel initialization
    function initMobileCarousel() {
        // Stop auto-rotation for mobile
        config.autoRotate = false;
        
        // Create items in sequential order
        for (let i = 0; i < config.numItems; i++) {
            const item = document.createElement('div');
            item.className = 'carousel-item';
            item.dataset.index = i;
            
            // Set display state based on position
            if (i === currentIndex) {
                item.classList.add('active');
                item.style.display = 'block';
            } else if (i === getPrevIndex(currentIndex)) {
                item.classList.add('left-item');
                item.style.display = 'block';
            } else if (i === getNextIndex(currentIndex)) {
                item.classList.add('right-item');
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
            
            // Create video element
            const video = document.createElement('video');
            video.src = config.videoSources[i];
            video.loop = true;
            video.muted = true;
            video.playsInline = true;
            video.autoplay = i === currentIndex; // Only autoplay active video
            video.loading = "lazy";
            
            // Enhanced styling
            item.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.7)';
            
            item.appendChild(video);
            
            // Add click handler
            item.addEventListener('click', function() {
                if (item.classList.contains('active')) {
                    // Open NFT in FlowFun when main card is clicked
                    window.open(`https://flowfun.xyz/collection/67c61e137d9c5bb5fbaf7b17/token`, '_blank');
                } else if (item.classList.contains('left-item')) {
                    // Move to previous card if left side card is clicked
                    goToPrev();
                } else if (item.classList.contains('right-item')) {
                    // Move to next card if right side card is clicked
                    goToNext();
                }
            });
            
            carouselOrbit.appendChild(item);
        }
        
        // Update lore text
        updateLoreDisplay(currentIndex);
        
        // Set up auto-rotation for mobile
        if (!carouselAutoRotateInterval) {
            carouselAutoRotateInterval = setInterval(function() {
                goToNext();
            }, 5000); // Auto-rotate every 5 seconds
        }
    }
    
    // Desktop-specific carousel initialization (your original code)
    function initDesktopCarousel() {
        config.autoRotate = true;
        
        for (let i = 0; i < config.numItems; i++) {
            const item = document.createElement('div');
            item.className = 'carousel-item';
            item.dataset.index = i;
            if (i === currentIndex) item.classList.add('active');
            
            // Add video
            const video = document.createElement('video');
            video.src = config.videoSources[i % config.videoSources.length];
            video.loop = true;
            video.muted = true;
            video.playsInline = true;
            video.autoplay = true;
            video.loading = "lazy";
            
            item.appendChild(video);
            
            // Add click handler with your original logic
            item.addEventListener('click', function() {
                if (item.classList.contains('active')) {
                    window.open(`https://flowfun.xyz/collection/67c61e137d9c5bb5fbaf7b17/token`, '_blank');
                } else {
                    const itemIndex = Array.from(carouselOrbit.children).indexOf(item);
                    const angleDiff = itemIndex - currentIndex;
                    targetAngle = currentAngle - (angleDiff * 2 * Math.PI / config.numItems);
                    isAnimating = true;
                }
            });
            
            carouselOrbit.appendChild(item);
            
            // Position in 3D space
            positionItem(item, i);
        }
        
        // Set initial lore text
        updateLoreDisplay(currentIndex);
    }

    // Update mobile navigation to next item
    function goToNextMobile() {
        // Get all items
        const items = document.querySelectorAll('.carousel-item');
        
        // Clear all position classes
        items.forEach(item => {
            item.classList.remove('active', 'left-item', 'right-item');
            item.style.display = 'none';
        });
        
        // Update current index
        const oldIndex = currentIndex;
        currentIndex = getNextIndex(currentIndex);
        const prevIndex = getPrevIndex(currentIndex);
        const nextIndex = getNextIndex(currentIndex);
        
        // Set new positions
        items[prevIndex].classList.add('left-item');
        items[prevIndex].style.display = 'block';
        
        items[currentIndex].classList.add('active');
        items[currentIndex].style.display = 'block';
        
        items[nextIndex].classList.add('right-item');
        items[nextIndex].style.display = 'block';
        
        // Play the active video
        const activeVideo = items[currentIndex].querySelector('video');
        if (activeVideo && activeVideo.paused) {
            activeVideo.play().catch(e => console.log('Auto-play prevented:', e));
        }
        
        // Pause other videos
        items.forEach((item, idx) => {
            if (idx !== currentIndex) {
                const video = item.querySelector('video');
                if (video && !video.paused) {
                    video.pause();
                }
            }
        });
        
        // Add transition classes for animation
        items[oldIndex].classList.add('slide-out-left');
        items[currentIndex].classList.add('slide-in-right');
        
        // Update lore text
        updateLoreDisplay(currentIndex);
        
        // Remove animation classes after transition completes
        setTimeout(() => {
            items.forEach(item => {
                item.classList.remove('slide-out-left', 'slide-in-right');
            });
        }, 500);
    }

    // Update mobile navigation to previous item
    function goToPrevMobile() {
        // Get all items
        const items = document.querySelectorAll('.carousel-item');
        
        // Clear all position classes
        items.forEach(item => {
            item.classList.remove('active', 'left-item', 'right-item');
            item.style.display = 'none';
        });
        
        // Update current index
        const oldIndex = currentIndex;
        currentIndex = getPrevIndex(currentIndex);
        const prevIndex = getPrevIndex(currentIndex);
        const nextIndex = getNextIndex(currentIndex);
        
        // Set new positions
        items[prevIndex].classList.add('left-item');
        items[prevIndex].style.display = 'block';
        
        items[currentIndex].classList.add('active');
        items[currentIndex].style.display = 'block';
        
        items[nextIndex].classList.add('right-item');
        items[nextIndex].style.display = 'block';
        
        // Play the active video
        const activeVideo = items[currentIndex].querySelector('video');
        if (activeVideo && activeVideo.paused) {
            activeVideo.play().catch(e => console.log('Auto-play prevented:', e));
        }
        
        // Pause other videos
        items.forEach((item, idx) => {
            if (idx !== currentIndex) {
                const video = item.querySelector('video');
                if (video && !video.paused) {
                    video.pause();
                }
            }
        });
        
        // Add transition classes for animation
        items[oldIndex].classList.add('slide-out-right');
        items[currentIndex].classList.add('slide-in-left');
        
        // Update lore text
        updateLoreDisplay(currentIndex);
        
        // Remove animation classes after transition completes
        setTimeout(() => {
            items.forEach(item => {
                item.classList.remove('slide-out-right', 'slide-in-left');
            });
        }, 500);
    }

    // Navigate to next/previous item functions
    function goToNext() {
        if (isMobile) {
            goToNextMobile();
        } else {
            // Desktop navigation (your original code)
            targetAngle = currentAngle - (2 * Math.PI / config.numItems);
            isAnimating = true;
        }
    }

    function goToPrev() {
        if (isMobile) {
            goToPrevMobile();
        } else {
            // Desktop navigation (your original code)
            targetAngle = currentAngle + (2 * Math.PI / config.numItems);
            isAnimating = true;
        }
    }

    // Desktop 3D positioning function
    function positionItem(item, index) {
        const angle = (index * 2 * Math.PI / config.numItems) + currentAngle;
        const x = Math.sin(angle) * config.radius;
        const z = Math.cos(angle) * config.radius;
        
        const roundedX = Math.round(x * 100) / 100;
        const roundedZ = Math.round(z * 100) / 100;

        item.style.transform = `translateX(calc(-50% + ${roundedX}px)) translateY(-50%) translateZ(${roundedZ}px)`;
        
        const normalizedZ = (z + config.radius) / (config.radius * 2);
        const opacity = Math.pow(normalizedZ, 0.8);
        item.style.opacity = Math.max(0.2, opacity).toFixed(2);
        
        let scaleAmount;
        if (isMobile) {
            scaleAmount = 0.55 + normalizedZ * 0.6;
        } else {
            scaleAmount = 0.7 + normalizedZ * 0.4;
        }
        
        item.style.transform += ` scale(${scaleAmount.toFixed(2)})`;
        item.dataset.angle = angle;
    }

    // Update carousel rotation (only used for desktop)
    function updateCarousel() {
        if (isMobile) return; // Skip for mobile
        
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
        
        // Update active class and lore text
        items.forEach((item, index) => {
            if (index === closestIndex) {
                if (!item.classList.contains('active')) {
                    document.querySelector('.carousel-item.active')?.classList.remove('active');
                    item.classList.add('active');
                    currentIndex = closestIndex;
                    
                    updateLoreDisplay(parseInt(item.dataset.index));
                }
            }
        });
    }

    // Update lore display text
    function updateLoreDisplay(index) {
        // Use direct index mapping without the offset formula to maintain exact order
        const loreText = config.loreSegments[index];
        loreDisplay.textContent = loreText;
        
        // Add fade-in animation
        loreDisplay.classList.remove('fade-in');
        void loreDisplay.offsetWidth; // Trigger reflow
        loreDisplay.classList.add('fade-in');
    }

    // Animation loop
    function animate() {
        if (isMobile) {
            // No animation needed for mobile - we're just showing/hiding cards
            requestAnimationFrame(animate);
            return;
        }
        
        if (isAnimating) {
            // Your original desktop animation code
            const angleDiff = targetAngle - currentAngle;
            currentAngle += angleDiff * 0.1;
            
            if (Math.abs(angleDiff) < 0.01) {
                currentAngle = targetAngle;
                isAnimating = false;
            }
        } else if (config.autoRotate) {
            currentAngle += config.rotationSpeed;
        }
        
        // Apply rotation to all items
        updateCarousel();
        
        // Optimize video playback
        optimizeVideoPlayback();
        
        // Continue animation loop
        requestAnimationFrame(animate);
    }

    // Optimize video playback
    function optimizeVideoPlayback() {
        if (isMobile) {
            // On mobile, only play the active video
            document.querySelectorAll('.carousel-item video').forEach(video => {
                const item = video.closest('.carousel-item');
                if (item.classList.contains('active')) {
                    if (video.paused) video.play().catch(e => console.log('Auto-play prevented:', e));
                } else {
                    if (!video.paused) video.pause();
                }
            });
        } else {
            // On desktop, play all visible videos
            document.querySelectorAll('.carousel-item video').forEach(video => {
                const item = video.closest('.carousel-item');
                const opacity = parseFloat(item.style.opacity || 0);
                
                // Only play videos that are reasonably visible (opacity > 0.4)
                if (opacity > 0.4) {
                    if (video.paused) video.play().catch(e => console.log('Auto-play prevented:', e));
                } else {
                    if (!video.paused) video.pause();
                }
            });
        }
    }

    // Swipe handling
    function handleTouchStart(e) {
        touchStartX = e.changedTouches[0].screenX;
    }
    
    function handleTouchEnd(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }
    
    function handleSwipe() {
        const swipeDistance = touchEndX - touchStartX;
        
        // Different thresholds for mobile vs desktop
        const threshold = isMobile ? 30 : 80;
        
        if (swipeDistance < -threshold) {
            // Swipe left - go to next
            goToNext();
        } else if (swipeDistance > threshold) {
            // Swipe right - go to prev
            goToPrev();
        }
    }

    // Initialize
    function init() {
        // Check if we're on mobile first
        checkMobile();
        
        // Create carousel based on device type
        initCarousel();
        
        // Start animation loop
        animate();
        
        // Set up event listeners
        prevBtn.addEventListener('click', goToPrev);
        nextBtn.addEventListener('click', goToNext);
        
        // Touch events
        carouselOrbit.addEventListener('touchstart', handleTouchStart);
        carouselOrbit.addEventListener('touchend', handleTouchEnd);
        
        // Desktop hover events (disabled on mobile)
        if (!isMobile) {
            carouselOrbit.addEventListener('mouseenter', () => {
                config.autoRotate = false;
            });
            
            carouselOrbit.addEventListener('mouseleave', () => {
                config.autoRotate = true;
            });
        }
        
        // Responsive handling
        window.addEventListener('resize', checkMobile);
        
        // Initial video optimization
        optimizeVideoPlayback();
        
        // Email capture form functionality
        const emailCaptureForm = document.getElementById('email-capture-form');
        if (emailCaptureForm) {
            emailCaptureForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = this.querySelector('.email-input').value;
                
                // Here you'd save the email to your database
                console.log('Email captured:', email);
                
                // Show success message
                alert('Thanks for subscribing! We\'ll keep you updated on GOSHEESH.');
                this.reset();
            });
        }
    }

    // Start the carousel
    init();
});