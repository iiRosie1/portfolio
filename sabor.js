// Gradient Interaction
document.addEventListener("mousemove", (e) => {
    const body = document.body;
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    body.style.setProperty("--x", `${x}%`);
    body.style.setProperty("--y", `${y}%`);
});

// Load navbar and footer into every page
document.addEventListener("DOMContentLoaded", () => {
    fetch("navbar.html")
      .then((res) => res.text())
      .then((data) => {
        document.getElementById("navbar").innerHTML = data;
      });
  
    fetch("footer.html")
      .then((res) => res.text())
      .then((data) => {
        document.getElementById("footer").innerHTML = data;
      });
  });

  // Tooltip
  document.addEventListener('DOMContentLoaded', function() {
    const tooltip = document.getElementById('floating-tooltip');

    // Select all project-content links that go to Roblox
    const robloxLinks = document.querySelectorAll('.project-content a[href*="roblox.com"]');

    robloxLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            tooltip.textContent = 'View on Roblox';
            tooltip.style.display = 'block';
        });

        link.addEventListener('mousemove', function(e) {
            tooltip.style.left = (e.clientX + 18) + 'px';
            tooltip.style.top = (e.clientY + 12) + 'px';
        });

        link.addEventListener('mouseleave', function() {
            tooltip.style.display = 'none';
        });
    });
});

// Year switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const yearButtons = document.querySelectorAll('.year-btn');
    const yearGroups = document.querySelectorAll('.year-group');

    yearButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and groups
            yearButtons.forEach(btn => btn.classList.remove('active'));
            yearGroups.forEach(group => group.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            // Show corresponding year group
            const year = button.getAttribute('data-year');
            const activeGroup = document.querySelector(`.year-group[data-year="${year}"]`);
            if (activeGroup) {
                activeGroup.classList.add('active');
            }
        });
    });
});

// Image Preview Modal
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const closeBtn = document.querySelector('.modal-close');
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');
    const yearPhotos = document.querySelectorAll('.year-photos img');
    
    let currentImageIndex = 0;
    let currentYearImages = [];
    let isAnimating = false;

    // Open modal when clicking on an image
    yearPhotos.forEach((img, index) => {
        img.addEventListener('click', function() {
            // Get all images from the same year group
            const yearGroup = this.closest('.year-group');
            currentYearImages = Array.from(yearGroup.querySelectorAll('img'));
            currentImageIndex = currentYearImages.indexOf(this);
            
            modal.style.display = 'flex';
            modalImg.src = this.src;
            
            // Trigger animations after a small delay
            requestAnimationFrame(() => {
                modal.classList.add('active');
                modalImg.classList.add('active');
            });
            
            document.body.style.overflow = 'hidden';
            updateNavigationButtons();
        });
    });

    // Navigation functions
    function showNextImage() {
        if (isAnimating) return;
        isAnimating = true;
        
        currentImageIndex = (currentImageIndex + 1) % currentYearImages.length;
        modalImg.src = currentYearImages[currentImageIndex].src;
        
        setTimeout(() => {
            isAnimating = false;
        }, 100);
    }

    function showPrevImage() {
        if (isAnimating) return;
        isAnimating = true;
        
        currentImageIndex = (currentImageIndex - 1 + currentYearImages.length) % currentYearImages.length;
        modalImg.src = currentYearImages[currentImageIndex].src;
        
        setTimeout(() => {
            isAnimating = false;
        }, 100);
    }

    function updateNavigationButtons() {
        // Show/hide navigation buttons based on number of images
        if (currentYearImages.length <= 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
        }
    }

    // Event listeners for navigation
    nextBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        showNextImage();
    });

    prevBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        showPrevImage();
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'flex') {
            if (e.key === 'ArrowRight') {
                showNextImage();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'Escape') {
                closeModal();
            }
        }
    });

    function closeModal() {
        modal.classList.remove('active');
        modalImg.classList.remove('active');
        
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }

    // Close modal when clicking the close button
    closeBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
});