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