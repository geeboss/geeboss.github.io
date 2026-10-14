(function () {
  const THEME_KEY = 'site-theme';
  const root = document.documentElement;
  let btn;

  function setTheme(theme) {
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      if (btn) {
        btn.textContent = '☀️';
        btn.setAttribute('aria-label', 'Switch to light mode');
        btn.setAttribute('aria-pressed', 'true');
      }
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      if (btn) {
        btn.textContent = '🌙';
        btn.setAttribute('aria-label', 'Switch to dark mode');
        btn.setAttribute('aria-pressed', 'false');
      }
    }
  }

  function getPreferredTheme() {
    try {
      const stored = localStorage.getItem(THEME_KEY);
      if (stored) return stored;
    } catch (e) {}

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    return 'light';
  }

  function toggleTheme() {
    const isDark = root.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    setTheme(newTheme);
    try { localStorage.setItem(THEME_KEY, newTheme); } catch (e) {}
  }

  function init() {
    btn = document.getElementById('theme-toggle');
    const theme = getPreferredTheme();
    setTheme(theme);

    if (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        toggleTheme();
      });
      btn.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleTheme();
        }
      });
    }

    if (!localStorage.getItem(THEME_KEY) && window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (event) {
        setTheme(event.matches ? 'dark' : 'light');
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
