// script.js

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

// Gradient interaction
  document.addEventListener("mousemove", (e) => {
    const hero = document.querySelector(".hero");
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    hero.style.setProperty("--x", `${x}%`);
    hero.style.setProperty("--y", `${y}%`);
  });

  //View My Work button
  const heroButton = document.querySelector('.hero-button');
  if (heroButton) {
    heroButton.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector('#projects').scrollIntoView({
        behavior: 'smooth'
      });
    });
  }

  //Typewriter effect
  class TxtType {
    constructor(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.isDeleting = false;
        this.tick();
    }

    tick() {
        const i = this.loopNum % this.toRotate.length;
        const fullTxt = this.toRotate[i];

        this.txt = this.isDeleting
            ? fullTxt.substring(0, this.txt.length - 1)
            : fullTxt.substring(0, this.txt.length + 1);

        this.el.querySelector('.wrap').innerHTML = this.txt;

        let delta = 150 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(() => this.tick(), delta);
    }
  }

window.onload = function () {
    const elements = document.getElementsByClassName('typewrite');
    for (let i = 0; i < elements.length; i++) {
        const toRotate = elements[i].getAttribute('data-type');
        const period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }

    // Add cursor style dynamically
    const css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff }";
    document.body.appendChild(css);
};

// Navbar effect

document.addEventListener('DOMContentLoaded', () => {
  const currentLocation = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
      if (link.getAttribute('href') === currentLocation.split('/').pop()) {
          link.classList.add('active');
      }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const currentLocation = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
      if (link.getAttribute('href') === currentLocation.split('/').pop()) {
          link.classList.add('active');
      }
      // Special case for projects section in index.html
      if (currentLocation.endsWith('index.html') && link.getAttribute('href') === 'index.html#projects') {
          link.classList.remove('active');
      }
  });
});

// Tool tips
// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  // Select the Let Us Cook project card (update selector if needed)
  const letUsCookCard = document.querySelector('a[href*="youtube.com"][class*="project-card"]');
  const tooltip = document.getElementById('watch-video-tooltip');

  if (letUsCookCard && tooltip) {
    letUsCookCard.addEventListener('mouseenter', function() {
      tooltip.style.display = 'block';
    });

    letUsCookCard.addEventListener('mousemove', function(e) {
      // Offset so the tooltip doesn't cover the cursor
      tooltip.style.left = (e.clientX + 18) + 'px';
      tooltip.style.top = (e.clientY + 12) + 'px';
    });

    letUsCookCard.addEventListener('mouseleave', function() {
      tooltip.style.display = 'none';
    });
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const tooltip = document.getElementById('floating-tooltip');

  // Map: selector => tooltip text
  const tooltipMap = [
    {
      selector: 'a[href*="youtube.com"][class*="project-card"]',
      text: 'Watch video!'
    },
    {
      selector: 'a[href*="figma.com"][class*="project-card"]',
      text: 'View on Figma'
    }
  ];

  tooltipMap.forEach(item => {
    const card = document.querySelector(item.selector);
    if (card) {
      card.addEventListener('mouseenter', function() {
        tooltip.textContent = item.text;
        tooltip.style.display = 'block';
      });
      card.addEventListener('mousemove', function(e) {
        tooltip.style.left = (e.clientX + 18) + 'px';
        tooltip.style.top = (e.clientY + 12) + 'px';
      });
      card.addEventListener('mouseleave', function() {
        tooltip.style.display = 'none';
      });
    }
  });
});

// Scroll effects
function revealOnScroll() {
  const reveals = document.querySelectorAll('.scroll-fade-up');
  const windowHeight = window.innerHeight;
  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 60) {
      el.classList.add('in-view');
    } else {
      el.classList.remove('in-view');
    }
  });
}

// Run on scroll and on page load
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);

// Magical Button Scroll Behavior
document.addEventListener('DOMContentLoaded', function() {
  const magicalButton = document.querySelector('.magical-button');
  
  function checkScroll() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Show button when user has scrolled to the bottom
    if (scrollPosition + windowHeight >= documentHeight - 100) {
      magicalButton.classList.add('visible');
    } else {
      magicalButton.classList.remove('visible');
    }
  }
  
  window.addEventListener('scroll', checkScroll);
  checkScroll(); // Check initial position
});