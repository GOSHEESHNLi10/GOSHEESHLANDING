import { useEffect } from 'react';

export default function Carousel() {
  useEffect(() => {
    document.addEventListener('DOMContentLoaded', function() {
      const config = {
        numItems: 10,
        radius: 380,
        autoRotate: true,
        rotationSpeed: -0.003,
        videoSources: [
          '/assets/1GOSHEESH.mp4',
          '/assets/2GOSHEESH.mp4',
          '/assets/3GOSHEESH.mp4',
          '/assets/4GOSHEESH.mp4',
          '/assets/5GOSHEESH.mp4',
          '/assets/6GOSHEESH.mp4',
          '/assets/7GOSHEESH.mp4',
          '/assets/8GOSHEESH.mp4',
          '/assets/9GOSHEESH.mp4',
          '/assets/10GOSHEESH.mp4'
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
      const carouselOrbit = document.querySelector('.carousel-orbit');
      const prevBtn = document.querySelector('.prev-btn');
      const nextBtn = document.querySelector('.next-btn');
      const carouselContainer = document.querySelector('.carousel-container');
      let loreDisplay = document.querySelector('.lore-display');
      if (!loreDisplay) {
        loreDisplay = document.createElement('div');
        loreDisplay.className = 'lore-display';
        carouselContainer.appendChild(loreDisplay);
      }
      let currentIndex = 0;
      let currentAngle = 0;
      let targetAngle = 0;
      let isAnimating = false;
      let isMobile = window.innerWidth < 768;
      let touchStartX = 0;
      let touchEndX = 0;
      let carouselAutoRotateInterval = null;

      function getPrevIndex(current) {
        return (current - 1 + config.numItems) % config.numItems;
      }

      function getNextIndex(current) {
        return (current + 1) % config.numItems;
      }

      function checkMobile() {
        const wasMobile = isMobile;
        isMobile = window.innerWidth < 768;
        if (wasMobile !== isMobile) {
          if (carouselAutoRotateInterval) {
            clearInterval(carouselAutoRotateInterval);
            carouselAutoRotateInterval = null;
          }
          initCarousel();
        }
      }

      function initCarousel() {
        carouselOrbit.innerHTML = '';
        if (isMobile) {
          initMobileCarousel();
        } else {
          initDesktopCarousel();
        }
      }

      function initMobileCarousel() {
        config.autoRotate = false;
        for (let i = 0; i < config.numItems; i++) {
          const item = document.createElement('div');
          item.className = 'carousel-item';
          item.dataset.index = i;
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
          const video = document.createElement('video');
          video.src = config.videoSources[i];
          video.loop = true;
          video.muted = true;
          video.playsInline = true;
          video.autoplay = i === currentIndex;
          video.loading = "lazy";
          item.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.7)';
          item.appendChild(video);
          item.addEventListener('click', function() {
            if (item.classList.contains('active')) {
              window.open(`https://flowfun.xyz/collection/67c61e137d9c5bb5fbaf7b17/token`, '_blank');
            } else if (item.classList.contains('left-item')) {
              goToPrev();
            } else if (item.classList.contains('right-item')) {
              goToNext();
            }
          });
          carouselOrbit.appendChild(item);
        }
        updateLoreDisplay(currentIndex);
        if (!carouselAutoRotateInterval) {
          carouselAutoRotateInterval = setInterval(function() {
            goToNext();
          }, 5000);
        }
      }

      function initDesktopCarousel() {
        config.autoRotate = true;
        for (let i = 0; i < config.numItems; i++) {
          const item = document.createElement('div');
          item.className = 'carousel-item';
          item.dataset.index = i;
          if (i === currentIndex) item.classList.add('active');
          const video = document.createElement('video');
          video.src = config.videoSources[i % config.videoSources.length];
          video.loop = true;
          video.muted = true;
          video.playsInline = true;
          video.autoplay = true;
          video.loading = "lazy";
          item.appendChild(video);
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
          positionItem(item, i);
        }
        updateLoreDisplay(currentIndex);
      }

      function goToNextMobile() {
        const items = document.querySelectorAll('.carousel-item');
        items.forEach(item => {
          item.classList.remove('active', 'left-item', 'right-item');
          item.style.display = 'none';
        });
        const oldIndex = currentIndex;
        currentIndex = getNextIndex(currentIndex);
        const prevIndex = getPrevIndex(currentIndex);
        const nextIndex = getNextIndex(currentIndex);
        items[prevIndex].classList.add('left-item');
        items[prevIndex].style.display = 'block';
        items[currentIndex].classList.add('active');
        items[currentIndex].style.display = 'block';
        items[nextIndex].classList.add('right-item');
        items[nextIndex].style.display = 'block';
        const activeVideo = items[currentIndex].querySelector('video');
        if (activeVideo && activeVideo.paused) {
          activeVideo.play().catch(e => console.log('Auto-play prevented:', e));
        }
        items.forEach((item, idx) => {
          if (idx !== currentIndex) {
            const video = item.querySelector('video');
            if (video && !video.paused) {
              video.pause();
            }
          }
        });
        items[oldIndex].classList.add('slide-out-left');
        items[currentIndex].classList.add('slide-in-right');
        updateLoreDisplay(currentIndex);
        setTimeout(() => {
          items.forEach(item => {
            item.classList.remove('slide-out-left', 'slide-in-right');
          });
        }, 500);
      }

      function goToPrevMobile() {
        const items = document.querySelectorAll('.carousel-item');
        items.forEach(item => {
          item.classList.remove('active', 'left-item', 'right-item');
          item.style.display = 'none';
        });
        const oldIndex = currentIndex;
        currentIndex = getPrevIndex(currentIndex);
        const prevIndex = getPrevIndex(currentIndex);
        const nextIndex = getNextIndex(currentIndex);
        items[prevIndex].classList.add('left-item');
        items[prevIndex].style.display = 'block';
        items[currentIndex].classList.add('active');
        items[currentIndex].style.display = 'block';
        items[nextIndex].classList.add('right-item');
        items[nextIndex].style.display = 'block';
        const activeVideo = items[currentIndex].querySelector('video');
        if (activeVideo && activeVideo.paused) {
          activeVideo.play().catch(e => console.log('Auto-play prevented:', e));
        }
        items.forEach((item, idx) => {
          if (idx !== currentIndex) {
            const video = item.querySelector('video');
            if (video && !video.paused) {
              video.pause();
            }
          }
        });
        items[oldIndex].classList.add('slide-out-right');
        items[currentIndex].classList.add('slide-in-left');
        updateLoreDisplay(currentIndex);
        setTimeout(() => {
          items.forEach(item => {
            item.classList.remove('slide-out-right', 'slide-in-left');
          });
        }, 500);
      }

      function goToNext() {
        if (isMobile) {
          goToNextMobile();
        } else {
          targetAngle = currentAngle - (2 * Math.PI / config.numItems);
          isAnimating = true;
        }
      }

      function goToPrev() {
        if (isMobile) {
          goToPrevMobile();
        } else {
          targetAngle = currentAngle + (2 * Math.PI / config.numItems);
          isAnimating = true;
        }
      }

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

      function updateCarousel() {
        if (isMobile) return;
        const items = document.querySelectorAll('.carousel-item');
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
          positionItem(item, index);
        });
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

      function updateLoreDisplay(index) {
        const loreText = config.loreSegments[index];
        loreDisplay.textContent = loreText;
        loreDisplay.classList.remove('fade-in');
        void loreDisplay.offsetWidth;
        loreDisplay.classList.add('fade-in');
      }

      function animate() {
        if (isMobile) {
          requestAnimationFrame(animate);
          return;
        }
        if (isAnimating) {
          const angleDiff = targetAngle - currentAngle;
          currentAngle += angleDiff * 0.1;
          if (Math.abs(angleDiff) < 0.01) {
            currentAngle = targetAngle;
            isAnimating = false;
          }
        } else if (config.autoRotate) {
          currentAngle += config.rotationSpeed;
        }
        updateCarousel();
        optimizeVideoPlayback();
        requestAnimationFrame(animate);
      }

      function optimizeVideoPlayback() {
        if (isMobile) {
          document.querySelectorAll('.carousel-item video').forEach(video => {
            const item = video.closest('.carousel-item');
            if (item.classList.contains('active')) {
              if (video.paused) video.play().catch(e => console.log('Auto-play prevented:', e));
            } else {
              if (!video.paused) video.pause();
            }
          });
        } else {
          document.querySelectorAll('.carousel-item video').forEach(video => {
            const item = video.closest('.carousel-item');
            const opacity = parseFloat(item.style.opacity || 0);
            if (opacity > 0.4) {
              if (video.paused) video.play().catch(e => console.log('Auto-play prevented:', e));
            } else {
              if (!video.paused) video.pause();
            }
          });
        }
      }

      function handleTouchStart(e) {
        touchStartX = e.changedTouches[0].screenX;
      }

      function handleTouchEnd(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      }

      function handleSwipe() {
        const swipeDistance = touchEndX - touchStartX;
        const threshold = isMobile ? 30 : 80;
        if (swipeDistance < -threshold) {
          goToNext();
        } else if (swipeDistance > threshold) {
          goToPrev();
        }
      }

      function init() {
        checkMobile();
        initCarousel();
        animate();
        prevBtn.addEventListener('click', goToPrev);
        nextBtn.addEventListener('click', goToNext);
        carouselOrbit.addEventListener('touchstart', handleTouchStart);
        carouselOrbit.addEventListener('touchend', handleTouchEnd);
        if (!isMobile) {
          carouselOrbit.addEventListener('mouseenter', () => {
            config.autoRotate = false;
          });
          carouselOrbit.addEventListener('mouseleave', () => {
            config.autoRotate = true;
          });
        }
        window.addEventListener('resize', checkMobile);
        optimizeVideoPlayback();
        const emailCaptureForm = document.getElementById('email-capture-form');
        if (emailCaptureForm) {
          emailCaptureForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('.email-input').value;
            console.log('Email captured:', email);
            alert('Thanks for subscribing! We\'ll keep you updated on GOSHEESH.');
            this.reset();
          });
        }
      }

      init();
    }, []);

    return (
      <div className="carousel-orbit">
        {/* Items will be added dynamically by JS */}
      </div>
    );
  }