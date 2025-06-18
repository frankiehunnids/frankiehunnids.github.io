// Projects carousel functionality
class ProjectsCarousel {
  constructor() {
    this.currentIndex = 0;
    this.projectsPerPage = this.getProjectsPerPage();
    this.projects = document.querySelectorAll('.project-card');
    this.totalProjects = this.projects.length;
    this.maxIndex = Math.max(0, this.totalProjects - this.projectsPerPage);

    this.prevBtn = document.getElementById('prevBtn');
    this.nextBtn = document.getElementById('nextBtn');
    this.paginationContainer = document.getElementById('pagination');

    this.init();
    this.createPagination();
    this.updateView();

    window.addEventListener('resize', () => {
      this.projectsPerPage = this.getProjectsPerPage();
      this.maxIndex = Math.max(0, this.totalProjects - this.projectsPerPage);
      this.updateView();
    });
  }

  getProjectsPerPage() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  init() {
    this.prevBtn.addEventListener('click', () => this.prevProjects());
    this.nextBtn.addEventListener('click', () => this.nextProjects());
  }

  prevProjects() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateView();
    }
  }

  nextProjects() {
    if (this.currentIndex < this.maxIndex) {
      this.currentIndex++;
      this.updateView();
    }
  }

  goToSlide(index) {
    this.currentIndex = Math.min(index, this.maxIndex);
    this.updateView();
  }

  createPagination() {
    this.paginationContainer.innerHTML = '';
    const totalPages = this.maxIndex + 1;

    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement('div');
      dot.className = 'pagination-dot';
      dot.addEventListener('click', () => this.goToSlide(i));
      this.paginationContainer.appendChild(dot);
    }
  }

  updateView() {
    this.projects.forEach((project, index) => {
      project.style.display =
        index >= this.currentIndex &&
        index < this.currentIndex + this.projectsPerPage
          ? 'block'
          : 'none';
    });

    this.prevBtn.disabled = this.currentIndex === 0;
    this.nextBtn.disabled = this.currentIndex >= this.maxIndex;

    const dots = this.paginationContainer.querySelectorAll('.pagination-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentIndex);
    });
  }
}

// Smooth scrolling for nav links
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
        });
      }
    });
  });
}

// Navbar scroll background change
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    navbar.style.background =
      window.scrollY > 50
        ? 'rgba(15, 23, 42, 0.98)'
        : 'rgba(15, 23, 42, 0.95)';
  });
}

// Animations on scroll
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll(
    '.project-card, .service-card, .stat-item'
  );
  animatedElements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Contact button behavior
function initContactForm() {
  const contactBtns = document.querySelectorAll('.contact-btn, .cta-btn');

  contactBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const contactSection = document.querySelector('#contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = 'mailto:your.email@example.com';
      }
    });
  });
}

// ✅ Fixed: Project buttons & links
function initProjectHoverEffects() {
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach((card) => {
    const overlay = card.querySelector('.project-overlay');

    // Only select <button>, not <a>
    const buttons = overlay.querySelectorAll('button');

    buttons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();

        if (btn.textContent.includes('Live Demo')) {
          // Replace with real demo URL
          window.open('https://example.com/live-demo', '_blank');
        } else if (btn.textContent.includes('Code')) {
          // Replace with real GitHub URL (only if not using <a>)
          window.open(
            'https://github.com/frankiehunnids/sleep-health-analysis-ml',
            '_blank'
          );
        }
      });
    });
  });
}

// Stats counter animation
function animateStats() {
  const statNumbers = document.querySelectorAll('.stat-number');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const finalNumber = parseInt(target.textContent);
        const suffix = target.textContent.replace(/[0-9]/g, '');

        let current = 0;
        const increment = finalNumber / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= finalNumber) {
            current = finalNumber;
            clearInterval(timer);
          }
          target.textContent = Math.floor(current) + suffix;
        }, 30);

        observer.unobserve(target);
      }
    });
  });

  statNumbers.forEach((stat) => observer.observe(stat));
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
  new ProjectsCarousel();
  initSmoothScrolling();
  initNavbarScroll();
  initScrollAnimations();
  initContactForm();
  initProjectHoverEffects();
  setTimeout(animateStats, 500);
});
