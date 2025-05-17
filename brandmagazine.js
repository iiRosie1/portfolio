// Load navbar and footer into every page
document.addEventListener("DOMContentLoaded", () => {
    // Load the navbar
    fetch("navbar.html")
        .then((res) => res.text())
        .then((data) => {
            document.getElementById("navbar").innerHTML = data;
        });

    // Load the footer
    fetch("footer.html")
        .then((res) => res.text())
        .then((data) => {
            document.getElementById("footer").innerHTML = data;
        });

    // Wait for the DOM to fully load before initializing Turn.js
    const flipbook = document.querySelector(".flipbook");

    
    if (flipbook) {
        const initializeFlipbook = () => {
            const screenWidth = window.innerWidth;

            
            let flipbookWidth = 800;
            let flipbookHeight = 518;

            if (screenWidth <= 768) {
                flipbookWidth = 600;
                flipbookHeight = flipbookWidth * 0.6875; 
            }

            if (screenWidth <= 480) {
                flipbookWidth = 320;
                flipbookHeight = flipbookWidth * 0.6875; 
            }

            // Set the container's dimensions
            const flipbookContainer = document.querySelector(".flipbook-container");
            flipbookContainer.style.width = `${flipbookWidth}px`;
            flipbookContainer.style.height = `${flipbookHeight}px`;

            // Force reflow
            flipbook.offsetHeight;

            // Initialize Turn.js with adjusted settings
            $(flipbook).turn({
                width: flipbookWidth,
                height: flipbookHeight,
                autoCenter: true,
                elevation: 50,
                gradients: true,
                display: 'double',
                acceleration: true,
                when: {
                    turning: function (event, page, view) {
                        console.log("Turning to page:", page);
                    },
                },
            });
        };

        // Initialize the flipbook
        initializeFlipbook();

        // Reinitialize the flipbook on window resize
        window.addEventListener("resize", () => {
            if ($(flipbook).data("turn")) {
                $(flipbook).turn("destroy"); // Destroy the existing flipbook
            }
            initializeFlipbook(); // Reinitialize with new dimensions
        });
    }
});

