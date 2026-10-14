(function () {
  const THEME_KEY = 'site-theme';
  const root = document.documentElement;
  let btn;

  function setTheme(theme) {
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      if (btn) { btn.textContent = '☀️'; btn.setAttribute('aria-label','Switch to light mode'); btn.setAttribute('aria-pressed','true'); }
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      if (btn) { btn.textContent = '🌙'; btn.setAttribute('aria-label','Switch to dark mode'); btn.setAttribute('aria-pressed','false'); }
    }
  }

  function getPreferredTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored) return stored;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    return 'light';
  }

  function toggleTheme() {
    const isDark = root.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    setTheme(newTheme);
    try { localStorage.setItem(THEME_KEY, newTheme); } catch (e) { /* ignore */ }
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
      // allow keyboard
      btn.addEventListener('keyup', function (e) {
        if (e.key === 'Enter' || e.key === ' ') toggleTheme();
      });
    }

    // react to system changes if user hasn't set a preference
    if (!localStorage.getItem(THEME_KEY) && window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        setTheme(e.matches ? 'dark' : 'light');
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
