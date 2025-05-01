document.addEventListener('DOMContentLoaded', () => {
    const academicsLink = document.querySelector('.academics-link');
    const sideCategoryBar = document.getElementById('sideCategoryBar');

    academicsLink.addEventListener('mouseover', () => {
        sideCategoryBar.style.left = '50px'; // Adjust based on navbar width
    });

    academicsLink.addEventListener('mouseout', () => {
        setTimeout(() => {
            if (!sideCategoryBar.matches(':hover')) {
                sideCategoryBar.style.left = '-250px';
            }
        }, 300);
    });

    sideCategoryBar.addEventListener('mouseleave', () => {
        sideCategoryBar.style.left = '-250px';
    });
});