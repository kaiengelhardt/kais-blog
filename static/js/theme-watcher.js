// The theme toggle is disabled: keep following the system appearance.
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
    document.documentElement.dataset.theme = event.matches ? 'dark' : 'light';
});
