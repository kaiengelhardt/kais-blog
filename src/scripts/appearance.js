(() => {
  const root = document.documentElement;
  const storageKey = 'kai-appearance';

  // Runs in the head before page content can paint.
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved === 'light' || saved === 'dark') {
      root.dataset.appearance = saved;
    }
  } catch {
    // System appearance still works when storage is unavailable.
  }

  document.addEventListener('DOMContentLoaded', () => {
    const control = document.getElementById('appearance-control');
    const select = document.getElementById('appearance');
    select.value = root.dataset.appearance ?? 'system';

    select.addEventListener('change', () => {
      if (select.value === 'system') {
        delete root.dataset.appearance;
      } else {
        root.dataset.appearance = select.value;
      }

      try {
        if (select.value === 'system') {
          localStorage.removeItem(storageKey);
        } else {
          localStorage.setItem(storageKey, select.value);
        }
      } catch {
        // Keep the selection for this page even if it cannot be saved.
      }
    });

    control.hidden = false;
  });
})();
