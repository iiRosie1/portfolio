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