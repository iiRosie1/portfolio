// Load navbar and footer into every page
document.addEventListener("DOMContentLoaded", () => {
    const flipbook = document.querySelector(".flipbook");
    const flipbookInner = document.querySelector(".flipbook-inner");

    if (!flipbook || !flipbookInner) return;

    const ASPECT = 518 / 800;

    const getFlipbookDimensions = () => {
        const screenWidth = window.innerWidth;
        let width = 800;
        let height = 518;

        if (screenWidth <= 768) {
            width = 600;
            height = Math.round(width * ASPECT);
        }

        if (screenWidth <= 480) {
            width = 320;
            height = Math.round(width * ASPECT);
        }

        return { width, height };
    };

    const initializeFlipbook = () => {
        const { width, height } = getFlipbookDimensions();

        if ($(flipbook).data("turn")) {
            $(flipbook).turn("destroy");
        }

        flipbookInner.style.width = `${width}px`;
        flipbookInner.style.height = `${height}px`;

        flipbook.offsetHeight;

        $(flipbook).turn({
            width,
            height,
            autoCenter: true,
            elevation: 50,
            gradients: true,
            display: "double",
            acceleration: true,
        });
    };

    let resizeTimer = null;
    const onResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(initializeFlipbook, 150);
    };

    Promise.all([
        fetch("navbar.html")
            .then((res) => res.text())
            .then((data) => {
                document.getElementById("navbar").innerHTML = data;
            }),
        fetch("footer.html")
            .then((res) => res.text())
            .then((data) => {
                document.getElementById("footer").innerHTML = data;
            }),
    ])
        .catch(() => {})
        .finally(() => {
            requestAnimationFrame(() => {
                initializeFlipbook();
            });
        });

    window.addEventListener("resize", onResize);
});
