// Function to check if an element is in viewport with offset
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    const offset = 100; // Trigger 100px before element enters viewport
    
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
        rect.bottom >= -offset
    );
}

// Function to handle scroll animations
function handleScrollAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        if (isInViewport(item)) {
            // Add a shorter delay based on the item's position
            setTimeout(() => {
                item.classList.add('visible');
            }, index * 100); // 100ms delay between each item
        }
    });
}

// Add scroll event listener with throttling
let isScrolling;
window.addEventListener('scroll', () => {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
        handleScrollAnimations();
    }, 10);
});

// Initial check for elements in viewport
document.addEventListener('DOMContentLoaded', () => {
    handleScrollAnimations();
}); 