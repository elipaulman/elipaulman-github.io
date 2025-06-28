// Analytics tracking helper for portfolio site
class Analytics {
  static trackEvent(eventName, parameters = {}) {
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, parameters);
      console.log('Analytics Event:', eventName, parameters);
    }
  }

  static trackPageView(pagePath) {
    if (typeof gtag !== 'undefined') {
      gtag('config', 'G-6ENGFNQ089', {
        page_path: pagePath
      });
    }
  }

  static trackDownload(fileName) {
    this.trackEvent('file_download', {
      file_name: fileName,
      file_extension: fileName.split('.').pop(),
      event_category: 'downloads',
      event_label: fileName
    });
  }

  static trackContactClick(method) {
    this.trackEvent('contact_click', {
      contact_method: method,
      event_category: 'contact',
      event_label: method
    });
  }

  static trackProjectView(projectName) {
    this.trackEvent('project_view', {
      project_name: projectName,
      event_category: 'projects',
      event_label: projectName
    });
  }

  static trackSectionView(sectionName) {
    this.trackEvent('section_view', {
      section_name: sectionName,
      event_category: 'navigation',
      event_label: sectionName
    });
  }

  static trackSocialClick(platform) {
    this.trackEvent('social_click', {
      social_platform: platform,
      event_category: 'social',
      event_label: platform
    });
  }

  static trackThemeToggle(theme) {
    this.trackEvent('theme_toggle', {
      theme_mode: theme,
      event_category: 'ui',
      event_label: `theme_${theme}`
    });
  }

  static trackSkillInteraction(skillName) {
    this.trackEvent('skill_interaction', {
      skill_name: skillName,
      event_category: 'skills',
      event_label: skillName
    });
  }

  static trackTimelineView(experienceTitle) {
    this.trackEvent('timeline_view', {
      experience_title: experienceTitle,
      event_category: 'experience',
      event_label: experienceTitle
    });
  }

  static trackFAQExpand(question) {
    this.trackEvent('faq_expand', {
      question_text: question,
      event_category: 'faq',
      event_label: question
    });
  }

  static trackWeatherPageVisit() {
    this.trackEvent('weather_page_visit', {
      event_category: 'special_pages',
      event_label: 'weather_app'
    });
  }

  static trackEngagement() {
    // Track time on page milestones
    const milestones = [30, 60, 120, 300]; // seconds
    let timeOnPage = 0;
    
    const interval = setInterval(() => {
      timeOnPage += 10;
      
      if (milestones.includes(timeOnPage)) {
        this.trackEvent('engagement_milestone', {
          time_on_page: timeOnPage,
          event_category: 'engagement',
          event_label: `${timeOnPage}s`
        });
      }
      
      // Stop tracking after 5 minutes
      if (timeOnPage >= 300) {
        clearInterval(interval);
      }
    }, 10000); // Check every 10 seconds
  }

  static trackScrollDepth() {
    let maxScroll = 0;
    const milestones = [25, 50, 75, 90, 100];
    const tracked = new Set();
    
    window.addEventListener('scroll', () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        
        milestones.forEach(milestone => {
          if (scrollPercent >= milestone && !tracked.has(milestone)) {
            tracked.add(milestone);
            this.trackEvent('scroll_depth', {
              scroll_percentage: milestone,
              event_category: 'engagement',
              event_label: `${milestone}%`
            });
          }
        });
      }
    });
  }
}

// Initialize analytics tracking when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Start engagement tracking
  Analytics.trackEngagement();
  Analytics.trackScrollDepth();

  // Track resume downloads
  const resumeLinks = document.querySelectorAll('a[href*="Resume"], a[href*="resume"], a[href*="cv"]');
  resumeLinks.forEach(link => {
    link.addEventListener('click', function() {
      const fileName = this.href.split('/').pop() || 'Eli_Paulman_Resume.pdf';
      Analytics.trackDownload(fileName);
    });
  });

  // Track email contacts
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
  emailLinks.forEach(link => {
    link.addEventListener('click', function() {
      Analytics.trackContactClick('email');
    });
  });

  // Track phone contacts
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
  phoneLinks.forEach(link => {
    link.addEventListener('click', function() {
      Analytics.trackContactClick('phone');
    });
  });

  // Track social media clicks
  const linkedinLinks = document.querySelectorAll('a[href*="linkedin"]');
  linkedinLinks.forEach(link => {
    link.addEventListener('click', function() {
      Analytics.trackSocialClick('linkedin');
    });
  });

  const githubLinks = document.querySelectorAll('a[href*="github"]');
  githubLinks.forEach(link => {
    link.addEventListener('click', function() {
      Analytics.trackSocialClick('github');
    });
  });

  // Track navigation clicks
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      const sectionName = this.getAttribute('href').replace('#', '');
      Analytics.trackSectionView(sectionName);
    });
  });

  // Track project interactions
  document.addEventListener('click', function(e) {
    // Track project carousel clicks
    if (e.target.closest('.view-project-link')) {
      const projectCard = e.target.closest('.project-item') || e.target.closest('.item');
      const projectTitle = projectCard?.querySelector('h4')?.textContent || 'Unknown Project';
      Analytics.trackProjectView(projectTitle);
    }

    // Track "View All Projects" click
    if (e.target.closest('.view-all-projects')) {
      Analytics.trackSocialClick('github_projects');
    }

    // Track theme toggle
    if (e.target.closest('#theme-toggle')) {
      const isDark = document.body.classList.contains('dark-mode');
      Analytics.trackThemeToggle(isDark ? 'light' : 'dark');
    }
  });

  // Track FAQ interactions
  document.addEventListener('click', function(e) {
    if (e.target.closest('[data-toggle="collapse"]')) {
      const button = e.target.closest('[data-toggle="collapse"]');
      const questionText = button.textContent.trim();
      Analytics.trackFAQExpand(questionText);
    }
  });

  // Track skill hover interactions
  document.addEventListener('mouseenter', function(e) {
    if (e.target.closest('.skill-item')) {
      const skillName = e.target.querySelector('h6')?.textContent || 'Unknown Skill';
      Analytics.trackSkillInteraction(skillName);
    }
  }, true);

  // Track timeline item views using Intersection Observer
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const experienceTitle = entry.target.querySelector('h6')?.textContent || 'Unknown Experience';
        Analytics.trackTimelineView(experienceTitle);
      }
    });
  }, { threshold: 0.5 });

  // Observe timeline items when they're loaded
  const observeTimelineItems = () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => timelineObserver.observe(item));
  };

  // Initial observation and re-observe after dynamic content loads
  setTimeout(observeTimelineItems, 1000);
  
  // Track weather app visits if on weather page
  if (window.location.pathname.includes('weather')) {
    Analytics.trackWeatherPageVisit();
  }
});

// Track page visibility changes
document.addEventListener('visibilitychange', function() {
  if (document.visibilityState === 'visible') {
    Analytics.trackEvent('page_focus', {
      event_category: 'engagement',
      event_label: 'page_visible'
    });
  } else {
    Analytics.trackEvent('page_blur', {
      event_category: 'engagement',
      event_label: 'page_hidden'
    });
  }
});

// Track exit intent (when user moves mouse to top of page)
let exitIntentTracked = false;
document.addEventListener('mouseleave', function(e) {
  if (e.clientY <= 0 && !exitIntentTracked) {
    exitIntentTracked = true;
    Analytics.trackEvent('exit_intent', {
      event_category: 'engagement',
      event_label: 'mouse_leave_top'
    });
  }
});