document.addEventListener('DOMContentLoaded', function() {
    // Animate social links
    document.querySelector('.social-links').classList.add('loaded');
    
    // Animate project cards
    const projectCards = document.querySelectorAll('.project-item');
    projectCards.forEach(card => card.classList.add('animate'));
  
    // Scroll triggered timeline animations
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // First make all items visible
    timelineItems.forEach(item => {
        item.classList.add('visible');
    });
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add('visible');
          entry.target.classList.remove('hidden');
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '50px'
    });
  
    timelineItems.forEach(item => observer.observe(item));
});
  