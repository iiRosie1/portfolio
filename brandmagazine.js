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
        $(flipbook).turn({
            width: 800, // Width of the flipbook
            height: 500, // Height of the flipbook
            autoCenter: true, // Center the flipbook
            elevation: 50, // Elevation for the page flip effect
            gradients: true, // Enable gradients for a realistic effect
            when: {
                turning: function (event, page, view) {
                    console.log("Turning to page:", page);
                },
            },
        });
    }
});

// Adjust the flipbook size on window resize
window.addEventListener("resize", () => {
    const flipbook = $(".flipbook");
    if (flipbook.data("turn")) {
        flipbook.turn("size", 800, 500); // Adjust size as needed
    }
});

