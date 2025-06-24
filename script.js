document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

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

  // Activate nav link on scroll
  window.addEventListener('scroll', () => {
    let currentSection = null;

    sections.forEach(section => {
      const top = section.offsetTop - 120; // adjust offset
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
});
