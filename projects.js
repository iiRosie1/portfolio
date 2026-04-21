document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card[data-categories]');

    let activeCategory = 'all';

    const applyFilter = () => {
        projectCards.forEach((card) => {
            const categories = (card.dataset.categories || '').split(' ').filter(Boolean);
            const hideOnAll = card.dataset.hideOnAll === 'true';
            const shouldShow =
                activeCategory === 'all'
                    ? !hideOnAll
                    : categories.includes(activeCategory);
            card.classList.toggle('is-hidden', !shouldShow);
        });

        filterButtons.forEach((btn) => {
            const isActive = btn.dataset.category === activeCategory;
            btn.classList.toggle('active', isActive);
        });
    };

    filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            activeCategory = button.dataset.category || 'all';
            applyFilter();
        });
    });

    applyFilter();

    // Scroll to top button functionality
    const scrollButton = document.getElementById('scroll-top');
    if (scrollButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollButton.classList.add('visible');
            } else {
                scrollButton.classList.remove('visible');
            }
        });

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
    }
});
