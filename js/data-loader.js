// Data loader and renderer for portfolio sections
class PortfolioDataLoader {
  constructor() {
    this.data = {
      experience: [],
      projects: [],
      education: [],
      skills: {},
      personal: {},
      faq: []
    };
  }

  async loadAllData() {
    try {
      const [experienceRes, projectsRes, educationRes, skillsRes, personalRes, faqRes] = await Promise.all([
        fetch('data/experience.json'),
        fetch('data/projects.json'),
        fetch('data/education.json'),
        fetch('data/skills.json'),
        fetch('data/personal.json'),
        fetch('data/faq.json')
      ]);

      this.data.experience = await experienceRes.json();
      this.data.projects = await projectsRes.json();
      this.data.education = await educationRes.json();
      this.data.skills = await skillsRes.json();
      this.data.personal = await personalRes.json();
      this.data.faq = await faqRes.json();

      this.renderAllSections();
    } catch (error) {
      console.error('Error loading portfolio data:', error);
    }
  }

  renderAllSections() {
    this.renderPersonalInfo();
    this.renderSkills();
    this.renderExperience();
    this.renderProjects();
    this.renderEducation();
    this.renderFAQ();
  }

  renderPersonalInfo() {
    const { personal } = this.data;
    
    // Update hero section
    const heroTitle = document.querySelector('.hero-title');
    const emailLink = document.querySelector('.email-link');
    if (heroTitle) heroTitle.textContent = `Hello, I'm ${personal.shortName}`;
    if (emailLink) {
      emailLink.textContent = personal.email;
      emailLink.href = `mailto:${personal.email}`;
    }

    // Update about section
    const aboutName = document.querySelector('.profile-list li strong');
    const aboutEmail = document.querySelector('.profile-list li a[href*="mailto"]');
    if (aboutName) aboutName.nextSibling.textContent = personal.name;
    if (aboutEmail) {
      aboutEmail.textContent = personal.email;
      aboutEmail.href = `mailto:${personal.email}`;
    }

    // Update about text
    const aboutParagraphs = document.querySelectorAll('.about p');
    if (aboutParagraphs.length >= 2) {
      aboutParagraphs[0].textContent = personal.about.short;
      aboutParagraphs[1].textContent = personal.about.detailed;
    }

    // Update contact section
    const phoneLink = document.querySelector('a[href*="tel"]');
    const emailLinks = document.querySelectorAll('a[href*="mailto"]');
    const linkedInLink = document.querySelector('a[href*="linkedin"]');
    const githubLink = document.querySelector('a[href*="github"]');

    if (phoneLink) {
      phoneLink.textContent = personal.phone;
      phoneLink.href = `tel:${personal.phone.replace(/\D/g, '')}`;
    }

    emailLinks.forEach(link => {
      if (link.textContent.includes('eli.paulman')) {
        link.textContent = personal.email;
        link.href = `mailto:${personal.email}`;
      } else if (link.textContent.includes('paulman.2')) {
        link.textContent = personal.schoolEmail;
        link.href = `mailto:${personal.schoolEmail}`;
      }
    });

    if (linkedInLink) linkedInLink.href = personal.linkedIn;
    if (githubLink) githubLink.href = personal.github;
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
                class="btn btn-link"
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
        margin: 10,
        nav: false,
        dots: true,
        autoplay: true,
        autoplayTimeout: 5000,
        responsive: {
          768: { items: 2 },
          1024: { items: 3 }
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
          <div class="testimonials-thumb d-flex">
            <div class="testimonials-image">
              <img
                src="${edu.image}"
                class="same-size-image round-image"
                alt="${edu.imageAlt}"
              />
            </div>
            <div class="testimonials-info">
              <h6 class="mb-0">${edu.institution}</h6>
              <span>${edu.degree}</span>
              ${edu.details.map(detail => `<li>${detail}</li>`).join('')}
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
        margin: 20,
        nav: false,
        dots: true,
        autoplay: true,
        autoplayTimeout: 4000,
        responsive: {
          576: { items: 1 },
          768: { items: 2 },
          992: { items: 2 },
          1200: { items: 3 }
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