// Load navbar and footer into every page
document.addEventListener("DOMContentLoaded", () => {
    const flipbook = document.querySelector(".flipbook");
    const mainEl = document.querySelector("main");

    const ASPECT = 518 / 800;
    const MIN_WIDTH = 220;

    let resizeTimer = null;
    let lastW = 0;
    let lastH = 0;

    const computeFlipbookSize = () => {
        const container = document.querySelector(".flipbook-container");
        const hint = document.querySelector(".hover-text");
        const flipbookInner = document.querySelector(".flipbook-inner");
        if (!container || !flipbookInner) return null;

        const styles = getComputedStyle(container);
        const gap =
            parseFloat(styles.rowGap) ||
            parseFloat(styles.columnGap) ||
            parseFloat(styles.gap) ||
            8;

        const availW = container.clientWidth;
        const hintH = hint ? hint.offsetHeight : 0;
        const availH = Math.max(80, container.clientHeight - hintH - gap);

        if (availW < 1) return null;

        let width = Math.min(availW, 800);
        let height = width * ASPECT;

        if (height > availH) {
            height = availH;
            width = height / ASPECT;
        }

        width = Math.floor(Math.max(MIN_WIDTH, Math.min(width, availW)));
        height = Math.floor(width * ASPECT);

        return { width, height, flipbookInner };
    };

    const initializeFlipbook = () => {
        if (!flipbook) return;

        const dims = computeFlipbookSize();
        if (!dims) return;

        const { width, height, flipbookInner } = dims;

        if (
            $(flipbook).data("turn") &&
            Math.abs(width - lastW) < 2 &&
            Math.abs(height - lastH) < 2
        ) {
            return;
        }

        lastW = width;
        lastH = height;

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
            when: {
                turning: function (event, page, view) {
                    console.log("Turning to page:", page);
                },
            },
        });
    };

    const scheduleFlipbookResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            initializeFlipbook();
        }, 80);
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
                requestAnimationFrame(() => {
                    initializeFlipbook();
                });
            });
        });

    if (!flipbook) return;

    window.addEventListener("resize", scheduleFlipbookResize);

    if (mainEl && typeof ResizeObserver !== "undefined") {
        const ro = new ResizeObserver(() => scheduleFlipbookResize());
        ro.observe(mainEl);
    }
});
