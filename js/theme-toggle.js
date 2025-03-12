// Dark mode toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const icon = themeToggle.querySelector('i');

// Function to update theme and icon
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  updateIcon(theme === 'dark');
}

// Function to update icon
function updateIcon(isDark) {
  icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
}

// Check for saved theme preference or system preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  setTheme(savedTheme);
} else {
  // Check system preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(prefersDark ? 'dark' : 'light');
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (!localStorage.getItem('theme')) {
    setTheme(e.matches ? 'dark' : 'light');
  }
});

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});