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

    // Ensure the flipbook exists before initializing Turn.js
    if (flipbook) {
        const initializeFlipbook = () => {
            const screenWidth = window.innerWidth;

            // Adjust flipbook size based on screen width
            let flipbookWidth = 800;
            let flipbookHeight = 500; // Default aspect ratio: 16:10

            if (screenWidth <= 768) {
                flipbookWidth = 600;
                flipbookHeight = flipbookWidth * 0.625; // Maintain aspect ratio
            }

            if (screenWidth <= 480) {
                flipbookWidth = 320;
                flipbookHeight = flipbookWidth * 0.625; // Maintain aspect ratio
            }

            // Set the container's dimensions
            const flipbookContainer = document.querySelector(".flipbook-container");
            flipbookContainer.style.width = `${flipbookWidth}px`;
            flipbookContainer.style.height = `${flipbookHeight}px`;

            // Initialize Turn.js
            $(flipbook).turn({
                width: flipbookWidth,
                height: flipbookHeight,
                autoCenter: true,
                elevation: 50,
                gradients: true,
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

