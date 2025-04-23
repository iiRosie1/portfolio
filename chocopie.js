// Gradient Interaction
document.addEventListener("mousemove", (e) => {
    const hero = document.querySelector(".hero");
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    hero.style.setProperty("--x", `${x}%`);
    hero.style.setProperty("--y", `${y}%`);
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

// Add this to your existing JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const scrollButton = document.getElementById('scroll-top');

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });

    // Smooth scroll to top with easing
    scrollButton.addEventListener('click', () => {
        const scrollToTop = () => {
            const c = document.documentElement.scrollTop || document.body.scrollTop;
            if (c > 0) {
                window.requestAnimationFrame(scrollToTop);
                window.scrollTo(0, c - c / 8);
            }
        };
        scrollToTop();
    });
});