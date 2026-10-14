(function(){
  const btn = document.getElementById('theme-toggle');
  if(!btn) return;
  const stored = localStorage.getItem('theme');
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  // Default to dark unless user previously chose light
  const isLight = stored ? stored === 'light' : false;
  function apply(light){
    if(light){
      document.documentElement.classList.add('light');
      btn.innerText = '☀️';
      btn.setAttribute('aria-pressed','false');
    } else {
      document.documentElement.classList.remove('light');
      btn.innerText = '🌙';
      btn.setAttribute('aria-pressed','true');
    }
  }
  apply(isLight);
  btn.addEventListener('click', function(){
    const nowLight = !document.documentElement.classList.contains('light');
    localStorage.setItem('theme', nowLight ? 'light' : 'dark');
    apply(nowLight);
  });
})();
