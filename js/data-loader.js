// Enhanced data loader and renderer for portfolio sections
class PortfolioDataLoader {
  constructor() {
    this.data = {
      experience: [],
      projects: [],
      education: [],
      skills: {},
      personal: {},
      faq: [],
      socials: {}
    };
    this.cache = new Map();
    this.loadingStates = new Set();
  }

  async loadAllData() {
    try {
      // Show loading states
      this.showLoadingStates();

      const dataPromises = [
        this.loadDataWithCache('data/experience.json', 'experience'),
        this.loadDataWithCache('data/projects.json', 'projects'),
        this.loadDataWithCache('data/education.json', 'education'),
        this.loadDataWithCache('data/skills.json', 'skills'),
        this.loadDataWithCache('data/personal.json', 'personal'),
        this.loadDataWithCache('data/faq.json', 'faq'),
        this.loadDataWithCache('data/socials.json', 'socials')
      ];

      await Promise.all(dataPromises);
      this.renderAllSections();
      this.hideLoadingStates();
    } catch (error) {
      console.error('Error loading portfolio data:', error);
      this.showErrorState();
    }
  }

  async loadDataWithCache(url, key) {
    // Simple in-memory caching
    if (this.cache.has(url)) {
      this.data[key] = this.cache.get(url);
      return this.data[key];
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      this.cache.set(url, data);
      this.data[key] = data;
      return data;
    } catch (error) {
      console.error(`Failed to load ${url}:`, error);
      throw error;
    }
  }

  showLoadingStates() {
    const sections = ['.skills-content', '.timeline', '#projects-carousel', '#testimonials-carousel', '#accordionExample'];
    sections.forEach(selector => {
      const element = document.querySelector(selector);
      if (element) {
        element.innerHTML = '<div class="loading">Loading...</div>';
      }
    });
  }

  hideLoadingStates() {
    const loadingElements = document.querySelectorAll('.loading');
    loadingElements.forEach(el => el.remove());
  }

  showErrorState() {
    const sections = ['.skills-content', '.timeline', '#projects-carousel', '#testimonials-carousel', '#accordionExample'];
    sections.forEach(selector => {
      const element = document.querySelector(selector);
      if (element) {
        element.innerHTML = '<div class="error">Failed to load content. Please refresh the page.</div>';
      }
    });
  }

  renderAllSections() {
    this.renderSocials();
    this.renderPersonalInfo();
    this.renderSkills();
    this.renderExperience();
    this.renderProjects();
    this.renderEducation();
    this.renderFAQ();
  }

  renderSocials() {
    const { socials } = this.data;

    // Update structured data for SEO
    const structuredData = document.querySelector('script[type="application/ld+json"]');
    if (structuredData) {
      const data = JSON.parse(structuredData.textContent);
      data.email = socials.email.primary;
      data.url = socials.website;
      data.sameAs = [socials.socialMedia.linkedin.url, socials.socialMedia.github.url];
      structuredData.textContent = JSON.stringify(data, null, 2);
    }

    // Update hero section email
    const heroEmail = document.getElementById('hero-email');
    if (heroEmail) {
      heroEmail.href = `mailto:${socials.email.primary}`;
      heroEmail.textContent = socials.email.primary;
    }

    // Update hero social links
    const heroSocialLinks = document.getElementById('hero-social-links');
    if (heroSocialLinks) {
      heroSocialLinks.innerHTML = `
        <a
          href="${socials.resume.path}"
          class="hero-social-link"
          download
          aria-label="${socials.resume.label}"
        >
          <i class="${socials.resume.icon}"></i>
        </a>
        <a
          href="${socials.socialMedia.linkedin.url}"
          class="hero-social-link"
          target="_blank"
          aria-label="${socials.socialMedia.linkedin.label}"
        >
          <i class="${socials.socialMedia.linkedin.icon}"></i>
        </a>
        <a
          href="${socials.socialMedia.github.url}"
          class="hero-social-link"
          target="_blank"
          aria-label="${socials.socialMedia.github.label}"
        >
          <i class="${socials.socialMedia.github.icon}"></i>
        </a>
      `;
    }

    // Update about section email
    const aboutEmail = document.getElementById('about-email');
    if (aboutEmail) {
      aboutEmail.innerHTML = `
        <strong>Email :</strong><a href="mailto:${socials.email.primary}">${socials.email.primary}</a><i class="fas fa-arrow-right custom-icon"></i>
      `;
    }

    // Update GitHub repositories link
    const githubReposLink = document.getElementById('github-repos-link');
    if (githubReposLink) {
      githubReposLink.href = socials.socialMedia.github.repositories;
    }

    // Update contact section
    const contactInfo = document.getElementById('contact-info');
    if (contactInfo) {
      contactInfo.innerHTML = `
        <div class="contact-item phone">
          <i class="fas fa-phone"></i>
          <a href="tel:${socials.phone.replace(/\D/g, '')}">${socials.phone}</a>
        </div>
        <div class="contact-item email">
          <i class="fas fa-envelope"></i>
          <a href="mailto:${socials.email.primary}">${socials.email.primary}</a>
        </div>
        <div class="contact-item email">
          <i class="fas fa-envelope"></i>
          <a href="mailto:${socials.email.school}">${socials.email.school}</a>
        </div>
      `;
    }

    const contactSocialLinks = document.getElementById('contact-social-links');
    if (contactSocialLinks) {
      contactSocialLinks.innerHTML = `
        <a
          href="${socials.socialMedia.linkedin.url}"
          class="social-link linkedin"
          target="_blank"
        >
          <i class="${socials.socialMedia.linkedin.icon}"></i>
          <span>${socials.socialMedia.linkedin.label}</span>
        </a>
        <a
          href="${socials.socialMedia.github.url}"
          class="social-link github"
          target="_blank"
        >
          <i class="${socials.socialMedia.github.icon}"></i>
          <span>${socials.socialMedia.github.label}</span>
        </a>
      `;
    }

    const contactResume = document.getElementById('contact-resume');
    if (contactResume) {
      contactResume.innerHTML = `
        <a
          href="${socials.resume.path}"
          class="custom-btn btn"
          download
        >
          <i class="fas fa-download"></i>
          ${socials.resume.label}
        </a>
      `;
    }
  }

  renderPersonalInfo() {
    const { personal } = this.data;

    // Update hero section
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) heroTitle.textContent = `Hello, I'm ${personal.shortName}`;

    // Update about text
    const aboutParagraphs = document.querySelectorAll('.about p');
    if (aboutParagraphs.length >= 2) {
      aboutParagraphs[0].textContent = personal.about.short;
      aboutParagraphs[1].textContent = personal.about.detailed;
    }
  }

  renderFAQ() {
    const accordion = document.querySelector('#accordionExample');
    if (!accordion) return;

    accordion.innerHTML = this.data.faq.map((faq, index) => {
      const collapseId = `collapse${faq.id}`;
      const headingId = `heading${faq.id}`;
      
      let answerContent = '';
      
      if (typeof faq.answer === 'string') {
        answerContent = `<p>${faq.answer}</p>`;
      } else if (faq.id === 'technical-skills') {
        answerContent = `
          <h5>Programming Languages & Frameworks:</h5>
          <p>${faq.answer.programmingLanguages}</p>
          <h5>Software:</h5>
          <p>${faq.answer.software}</p>
          <h5>Other Skills:</h5>
          <p>${faq.answer.otherSkills}</p>
        `;
      } else if (faq.id === 'involvement') {
        answerContent = `
          <h5>Leadership & Involvement:</h5>
          <ul>${faq.answer.leadership.map(item => `<li>${item}</li>`).join('')}</ul>
          <h5>Roles:</h5>
          <ul>${faq.answer.roles.map(role => `<li>${role}</li>`).join('')}</ul>
          <h5>Leadership Goals:</h5>
          <p>${faq.answer.goals}</p>
        `;
      }

      return `
        <div class="card">
          <div class="card-header" id="${headingId}">
            <h2 class="mb-0">
              <button
                class="btn btn-link ${faq.expanded ? 'expanded' : ''}"
                type="button"
                data-toggle="collapse"
                data-target="#${collapseId}"
                aria-expanded="${faq.expanded}"
                aria-controls="${collapseId}"
              >
                ${faq.question}
              </button>
            </h2>
          </div>
          <div
            id="${collapseId}"
            class="collapse ${faq.expanded ? 'show' : ''}"
            aria-labelledby="${headingId}"
            data-parent="#accordionExample"
          >
            <div class="card-body">
              ${answerContent}
            </div>
          </div>
        </div>
      `;
    }).join('') + `
      <span class="faq-info-text">
        Please feel free to send any additional questions, comments, or
        concerns to <strong>${this.data.personal.email}</strong>
      </span>
    `;
  }

  renderSkills() {
    const programmingContainer = document.querySelector('.skills-category:first-of-type .skills-content');
    const frameworksContainer = document.querySelector('.skills-category:last-of-type .skills-content');

    if (programmingContainer) {
      programmingContainer.innerHTML = this.data.skills.programmingLanguages
        .map(skill => `
          <div class="skill-item">
            <i class="${skill.icon}"></i>
            <h6>${skill.name}</h6>
          </div>
        `).join('');
    }

    if (frameworksContainer) {
      frameworksContainer.innerHTML = this.data.skills.frameworks
        .map(skill => `
          <div class="skill-item">
            <i class="${skill.icon}"></i>
            <h6>${skill.name}</h6>
          </div>
        `).join('');
    }
  }

  renderExperience() {
    const timelineContainer = document.querySelector('.timeline');
    if (!timelineContainer) return;

    timelineContainer.innerHTML = this.data.experience
      .map(exp => `
        <div class="timeline-item">
          <div class="timeline-date">${exp.date}</div>
          <div class="timeline-content">
            <div class="timeline-header">
              <h6 class="mb-0">${exp.title}</h6>
              <span>${exp.company}</span>
              <img
                src="${exp.logo}"
                class="timeline-logo"
                alt="${exp.logoAlt}"
              />
            </div>
            <ul>
              ${exp.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
            </ul>
          </div>
        </div>
      `).join('');
  }

  renderProjects() {
    const projectsCarousel = document.querySelector('#projects-carousel');
    if (!projectsCarousel) return;

    projectsCarousel.innerHTML = this.data.projects
      .map(project => `
        <div class="item">
          <div class="project-item">
            <div class="project-overlay">
              <div class="project-info">
                <h4>${project.title}</h4>
                <p>${project.description}</p>
                <p class="tech-used">Tech used: ${project.techUsed}</p>
                <a
                  href="${project.link}"
                  class="view-project-link"
                  target="_blank"
                >${project.linkText}</a>
              </div>
            </div>
          </div>
        </div>
      `).join('');

    // Reinitialize the carousel after updating content
    if (typeof $ !== 'undefined' && $('.owl-carousel').length) {
      $('#projects-carousel').trigger('destroy.owl.carousel');
      $('#projects-carousel').owlCarousel({
        items: 1,
        loop: true,
        margin: 20,
        nav: false,
        dots: true,
        autoplay: true,
        autoplayTimeout: 5000,
        responsive: {
          768: { items: 2, margin: 20 },
          1024: { items: 3, margin: 25 }
        }
      });
    }
  }

  renderEducation() {
    const educationCarousel = document.querySelector('#testimonials-carousel');
    if (!educationCarousel) return;

    educationCarousel.innerHTML = this.data.education
      .map(edu => `
        <div class="item">
          <div class="testimonials-thumb">
            <div class="education-grid">
              <div class="testimonials-image">
                <img
                  src="${edu.image}"
                  class="same-size-image round-image"
                  alt="${edu.imageAlt}"
                />
              </div>
              <div class="education-header">
                <h6 class="mb-0">${edu.institution}</h6>
                <span>${edu.degree}</span>
              </div>
              <div class="education-details">
                <ul>
                  ${edu.details.map(detail => `<li>${detail}</li>`).join('')}
                </ul>
              </div>
            </div>
          </div>
        </div>
      `).join('');

    // Reinitialize the carousel after updating content
    if (typeof $ !== 'undefined' && $('.owl-carousel').length) {
      $('#testimonials-carousel').trigger('destroy.owl.carousel');
      $('#testimonials-carousel').owlCarousel({
        items: 1,
        loop: true,
        margin: 25,
        nav: false,
        dots: true,
        autoplay: false,
        responsive: {
          576: { items: 1 },
          768: { items: 1 },
          992: { items: 2 },
          1400: { items: 2 }
        }
      });
    }
  }
}

// Initialize the data loader when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  const portfolioLoader = new PortfolioDataLoader();
  portfolioLoader.loadAllData();
});
