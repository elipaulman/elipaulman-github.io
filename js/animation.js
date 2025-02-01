document.addEventListener('DOMContentLoaded', function() {
    // Animate social links
    document.querySelector('.social-links').classList.add('loaded');
    
    // Animate project cards
    const projectCards = document.querySelectorAll('.project-item');
    projectCards.forEach(card => card.classList.add('animate'));
  
    // Scroll triggered timeline animations
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.25 });
  
    timelineItems.forEach(item => observer.observe(item));
  });
  