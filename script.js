document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');
  const contactForm = document.getElementById('contact-form');
  const toast = document.getElementById('toast');
  const scrollIndicator = document.querySelector('.scroll-indicator');
  const videoOverlay = document.getElementById('videoOverlay');
  const introVideo = document.getElementById('introVideo');
  const videoPopup = document.querySelector('.video-popup');


  // Load and apply saved theme
  const savedTheme = localStorage.getItem('theme');
  const isDark = savedTheme === 'dark';
  html.classList.toggle('dark', isDark);
  themeToggle.innerHTML = `<i data-lucide="${isDark ? 'sun' : 'moon'}"></i>`;
  lucide.createIcons();

  // Toggle theme on click
  themeToggle.addEventListener('click', () => {
    const dark = html.classList.toggle('dark');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
    themeToggle.innerHTML = `<i data-lucide="${dark ? 'sun' : 'moon'}"></i>`;
    lucide.createIcons();
  });

  // Toggle mobile menu
  function toggleMenu() {
    const nav = document.getElementById("navLinks");
    const hamburger = document.getElementById("hamburger");
    nav.classList.toggle("show");
    hamburger.classList.toggle("active");
  }
  window.toggleMenu = toggleMenu;

  // Activate nav link on scroll
  window.addEventListener('scroll', () => {
    let currentSection = null;

    sections.forEach(section => {
      const top = section.offsetTop - 120;
      const height = section.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        currentSection = section.id;
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      if (href === currentSection) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  });

  // 👉 EmailJS: Initialize with your PUBLIC key
  emailjs.init("d0hO4m-_gEcIiJbg2"); // ← Replace this with your actual public key

  // Handle contact form submission via EmailJS
  if (contactForm && toast) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      emailjs.sendForm('service_00qo94s', 'template_8pmvp9k', contactForm)
        .then(() => {
          toast.querySelector('.toast-title').textContent = "Message Sent!";
          toast.querySelector('.toast-description').textContent = "Thank you for reaching out. I'll get back to you soon.";
          toast.classList.add('show');
          contactForm.reset();

          setTimeout(() => {
            toast.classList.remove('show');
          }, 5000);
        })
        .catch((error) => {
          toast.querySelector('.toast-title').textContent = "Message Failed!";
          toast.querySelector('.toast-description').textContent = "There was an issue sending your message. Please try again.";
          toast.classList.add('show');

          setTimeout(() => {
            toast.classList.remove('show');
          }, 5000);

          console.error("EmailJS Error:", error);
        });
    });
  }
  // scroll to project section
  const viewWorkBtn = document.getElementById('view-work-btn');
  const recentWorkSection = document.getElementById('projects');

  if (viewWorkBtn && recentWorkSection) {
    viewWorkBtn.addEventListener('click', () => {
      recentWorkSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // scroll to contact section
  const WorkBtn = document.getElementById('work-btn');
  const ContactSection = document.getElementById('contact');

  if (WorkBtn && ContactSection) {
    WorkBtn.addEventListener('click', () => {
      ContactSection.scrollIntoView({ behavior: 'smooth' });
    });
  }
  // Show video overlay on scroll indicator click
  scrollIndicator.addEventListener('click', () => {
    videoOverlay.classList.add('show');
    introVideo.currentTime = 0;
    introVideo.play();
  });

  // Optional: click anywhere on overlay to close
  videoOverlay.addEventListener('click', () => {
    introVideo.pause();
    videoOverlay.classList.remove('show');
  });

  // When video ends, hide the overlay and go back to site
  introVideo.addEventListener('ended', () => {
    videoOverlay.classList.remove('show');
  });
  scrollIndicator.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      videoOverlay.classList.add('show');
      introVideo.currentTime = 0;
      introVideo.play();

      // Scroll again to ensure overlay is centered (especially on iOS Safari)
      setTimeout(() => {
        document.getElementById("videoOverlay").scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 50);
    }, 300);  // after scroll animation
  });
});
