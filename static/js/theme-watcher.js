(function() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    function handleThemeChange(e) {
        const theme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);

        if (localStorage.getItem('pref-theme') === 'auto' || !localStorage.getItem('pref-theme')) {
            if (e.matches) {
                document.body.classList.add('dark');
                document.body.classList.remove('light');
            } else {
                document.body.classList.add('light');
                document.body.classList.remove('dark');
            }
        }
    }

    if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleThemeChange);
    } else if (mediaQuery.addListener) {
        mediaQuery.addListener(handleThemeChange);
    }
})();