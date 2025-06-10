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

  // Popout image
  document.addEventListener('DOMContentLoaded', function() {
    // Select all popout images
    document.querySelectorAll('.popout-image img').forEach(img => {
      img.addEventListener('click', function() {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'popout-lightbox-overlay';
  
        // Create enlarged image
        const bigImg = document.createElement('img');
        bigImg.src = img.src;
        bigImg.alt = img.alt;
        bigImg.className = 'popout-lightbox-img';
  
        overlay.appendChild(bigImg);
        document.body.appendChild(overlay);
  
        // Remove overlay on click
        overlay.addEventListener('click', function() {
          overlay.remove();
        });
      });
    });
  });

  //Reveal findings on scroll
  function revealFindingsOnScroll() {
    const findings = document.querySelectorAll('.finding-item');
    const windowHeight = window.innerHeight;
    findings.forEach((el, i) => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 60) {
        setTimeout(() => el.classList.add('in-view'), i * 120); // Staggered reveal
      } else {
        el.classList.remove('in-view');
      }
    });
  }
  
  window.addEventListener('scroll', revealFindingsOnScroll);
  window.addEventListener('DOMContentLoaded', revealFindingsOnScroll);

  //Reveal features on scroll
  function revealFeaturesOnScroll() {
    const features = document.querySelectorAll('.features-list li');
    const windowHeight = window.innerHeight;
    features.forEach((el, i) => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 60) {
        setTimeout(() => el.classList.add('in-view'), i * 120); // Staggered reveal
      } else {
        el.classList.remove('in-view');
      }
    });
  }
  
  window.addEventListener('scroll', revealFeaturesOnScroll);
  window.addEventListener('DOMContentLoaded', revealFeaturesOnScroll);

  //Learnings scroll
  function revealLearningsOnScroll() {
    const learnings = document.querySelectorAll('.learnings-list li');
    const windowHeight = window.innerHeight;
    learnings.forEach((el, i) => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 60) {
        setTimeout(() => el.classList.add('in-view'), i * 120); // Staggered reveal
      } else {
        el.classList.remove('in-view');
      }
    });
  }
  
  window.addEventListener('scroll', revealLearningsOnScroll);
  window.addEventListener('DOMContentLoaded', revealLearningsOnScroll);

  //Back to top button
  document.addEventListener('DOMContentLoaded', function() {
    const backToTop = document.querySelector('.scroll-top');
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });
    backToTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

// Scroll Reveal Functionality
function revealOnScroll() {
    const elements = document.querySelectorAll('.card, .finding-item, .features-list li, .learnings-list li, .popout-image, .solution-image');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize scroll reveal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    revealOnScroll();
});

// Slideshow functionality
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.slide-dots');
    const prevButton = document.querySelector('.slide-nav.prev');
    const nextButton = document.querySelector('.slide-nav.next');
    let currentSlide = 0;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlides();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlides();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlides();
    }

    // Event listeners
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
});

// Feedback slideshow functionality
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.feedback-slide');
    const dotsContainer = document.querySelector('.feedback-dots');
    const prevButton = document.querySelector('.feedback-nav.prev');
    const nextButton = document.querySelector('.feedback-nav.next');
    let currentSlide = 0;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('feedback-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.feedback-dot');

    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlides();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlides();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlides();
    }

    // Event listeners
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
});