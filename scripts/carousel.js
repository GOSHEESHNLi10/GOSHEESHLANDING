// 3D Orbit Carousel for GOSHEESH NFTs with Lore Integration

document.addEventListener('DOMContentLoaded', function() {
    // Configuration for the carousel
    const config = {
        numItems: 10, // Number of NFTs to display
        radius: 380, // For desktop
        autoRotate: true, // Whether to auto-rotate
        rotationSpeed: -0.003, // Negative value to reverse spin direction
        // Updated to match your file naming
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
        // Lore segments for each NFT
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

    // Create lore display element if it doesn't exist
    let loreDisplay = document.querySelector('.lore-display');
    if (!loreDisplay) {
        loreDisplay = document.createElement('div');
        loreDisplay.className = 'lore-display';
        document.querySelector('.carousel-container').appendChild(loreDisplay);
    }

    // State variables
    let currentIndex = 0;
    let currentAngle = 0;
    let targetAngle = 0;
    let isAnimating = false;
    
    // Debug info for development
    function addDebugInfo() {
        // Only show debug in development
        if (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') {
            const debugDiv = document.createElement('div');
            debugDiv.style.position = 'fixed';
            debugDiv.style.top = '10px';
            debugDiv.style.right = '10px';
            debugDiv.style.padding = '10px';
            debugDiv.style.background = 'rgba(0,0,0,0.7)';
            debugDiv.style.color = 'white';
            debugDiv.style.fontSize = '12px';
            debugDiv.style.zIndex = '9999';
            debugDiv.id = 'debug-info';
            document.body.appendChild(debugDiv);
            
            // Update debug info every second
            setInterval(() => {
                debugDiv.innerHTML = `
                    Width: ${window.innerWidth}px<br>
                    Radius: ${config.radius}px<br>
                    Current Index: ${currentIndex}<br>
                    Is Animating: ${isAnimating}<br>
                    Touch Start: ${touchStartX}<br>
                    Touch End: ${touchEndX}<br>
                `;
            }, 500);
        }
    }

    // Create carousel items
    function createCarouselItems() {
        carouselOrbit.innerHTML = ''; // Clear any existing items
        
        for (let i = 0; i < config.numItems; i++) {
            const item = document.createElement('div');
            item.className = 'carousel-item';
            item.dataset.index = i; // Store the index for lore reference
            if (i === 0) item.classList.add('active');

            // Use videos with fallback to placeholders
            if (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') {
                // Try to load videos first
                const video = document.createElement('video');
                video.src = config.videoSources[i % config.videoSources.length];
                video.loop = true;
                video.muted = true;
                video.playsInline = true;
                video.autoplay = true; // Autoplay all videos
                video.loading = "lazy"; // Add lazy loading for better performance
                
                // Handle video load errors by falling back to placeholders
                video.onerror = function() {
                    // Remove failed video and add placeholder image
                    this.remove();
                    const img = document.createElement('img');
                    img.src = `https://via.placeholder.com/240x280/111111/FFFFFF?text=GOSHEESH+${i+1}`;
                    img.loading = "lazy"; // Add lazy loading for better performance
                    item.appendChild(img);
                };
                
                item.appendChild(video);
            } else {
                // In production, always use videos
                const video = document.createElement('video');
                video.src = config.videoSources[i % config.videoSources.length];
                video.loop = true;
                video.muted = true;
                video.playsInline = true;
                video.autoplay = true; // Autoplay all videos
                video.loading = "lazy"; // Add lazy loading for better performance
                
                item.appendChild(video);
            }

            // Add click handler to open NFT details
            item.addEventListener('click', function() {
                if (item.classList.contains('active')) {
                    // Open NFT in FlowFun with updated URL
                    window.open(`https://flowfun.xyz/collection/67c61e137d9c5bb5fbaf7b17/token`, '_blank');
                } else {
                    // Move carousel to this item
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
        updateLoreDisplay(0);
    }

    // Position an item in 3D space
    function positionItem(item, index) {
        const angle = (index * 2 * Math.PI / config.numItems) + currentAngle;
        const x = Math.sin(angle) * config.radius;
        const z = Math.cos(angle) * config.radius;
        
        const roundedX = Math.round(x * 100) / 100;
        const roundedZ = Math.round(z * 100) / 100;

        // Apply 3D transform
        item.style.transform = `translateX(calc(-50% + ${roundedX}px)) translateY(-50%) translateZ(${roundedZ}px)`;
        
        // Improved opacity curve: front items more visible, back items more faded
        const normalizedZ = (z + config.radius) / (config.radius * 2);
        const opacity = Math.pow(normalizedZ, 0.8); // More dramatic opacity falloff
        item.style.opacity = Math.max(0.2, opacity).toFixed(2);
        
        // Adjust scale based on z position with improved mobile scaling
        let scaleAmount;
        if (window.innerWidth < 768) {
            // More dramatic scaling difference on mobile
            scaleAmount = 0.55 + normalizedZ * 0.6;
        } else {
            scaleAmount = 0.7 + normalizedZ * 0.4;
        }
        
        item.style.transform += ` scale(${scaleAmount.toFixed(2)})`;
        
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
        
        // Update active class and lore text
        items.forEach((item, index) => {
            if (index === closestIndex) {
                if (!item.classList.contains('active')) {
                    // Update active class
                    document.querySelector('.carousel-item.active')?.classList.remove('active');
                    item.classList.add('active');
                    currentIndex = closestIndex;
                    
                    // Update lore display with the corresponding segment
                    updateLoreDisplay(parseInt(item.dataset.index));
                }
            }
        });
    }

    // Update lore display text
    function updateLoreDisplay(index) {
        // Change this line to use the correct index (offset by 1)
        const loreText = config.loreSegments[(index + 9) % 10]; // This will shift it one card to match the correct NFT
        loreDisplay.textContent = loreText;
        
        // Add fade-in animation
        loreDisplay.classList.remove('fade-in');
        void loreDisplay.offsetWidth; // Trigger reflow
        loreDisplay.classList.add('fade-in');
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
            // Auto rotate (now in reverse direction due to negative rotationSpeed)
            currentAngle += config.rotationSpeed;
        }
        
        // Apply rotation to all items
        updateCarousel();
        
        // Optimize video playback (new function)
        optimizeVideoPlayback();
        
        // Continue animation loop
        requestAnimationFrame(animate);
    }

    // Make carousel responsive
    function updateCarouselResponsiveness() {
        if (window.innerWidth < 768) {
            // Better mobile radius to ensure items aren't cut off at screen edges
            config.radius = 200;
            // Slow down autorotation on mobile for better visibility
            config.rotationSpeed = -0.001;
        } else {
            config.radius = 380; // Keep the same desktop radius
            config.rotationSpeed = -0.003;
        }
        
        // Update positions of all items with new radius
        document.querySelectorAll('.carousel-item').forEach((item, index) => {
            positionItem(item, index);
        });
    }

    // Event handlers
    function goToNext() {
        // Since we reversed the rotation, swap next/prev
        targetAngle = currentAngle - (2 * Math.PI / config.numItems);
        isAnimating = true;
    }

    function goToPrev() {
        // Since we reversed the rotation, swap next/prev
        targetAngle = currentAngle + (2 * Math.PI / config.numItems);
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
        const swipeDistance = touchEndX - touchStartX;
        
        // Different thresholds for mobile vs desktop
        const threshold = window.innerWidth < 768 ? 40 : 80;
        
        if (swipeDistance < -threshold) {
            // Swipe left - go to next
            goToNext();
        } else if (swipeDistance > threshold) {
            // Swipe right - go to prev
            goToPrev();
        }
    }

    // Optimize video playback for better mobile performance
    function optimizeVideoPlayback() {
        // On mobile, only play the visible/active video
        if (window.innerWidth < 768) {
            document.querySelectorAll('.carousel-item video').forEach(video => {
                const item = video.closest('.carousel-item');
                if (item.classList.contains('active')) {
                    if (video.paused) video.play().catch(e => console.log('Auto-play prevented:', e));
                } else {
                    if (!video.paused) video.pause();
                }
            });
        } else {
            // On desktop, play all videos
            document.querySelectorAll('.carousel-item video').forEach(video => {
                if (video.paused) video.play().catch(e => console.log('Auto-play prevented:', e));
            });
        }
    }

    // Initialize carousel
    function init() {
        createCarouselItems();
        animate();
        
        // Add debug info for development
        addDebugInfo();
        
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
        
        // Responsive handling
        window.addEventListener('resize', updateCarouselResponsiveness);
        updateCarouselResponsiveness(); // Call once on init
        
        // Initial video optimization
        optimizeVideoPlayback();
    }

    // Start the carousel
    init();
});