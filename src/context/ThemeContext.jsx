import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};

const STORAGE_KEY = 'theme-preference';
const VALID_THEMES = ['light', 'dark', 'system'];

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getStoredTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return VALID_THEMES.includes(stored) ? stored : 'system';
  } catch {
    return 'system';
  }
}

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(getStoredTheme);
  const [resolvedTheme, setResolvedTheme] = useState(() => {
    const stored = getStoredTheme();
    return stored === 'system' ? getSystemTheme() : stored;
  });

  const applyTheme = useCallback((resolved) => {
    const root = document.documentElement;
    if (resolved === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    setResolvedTheme(resolved);
  }, []);

  const setTheme = useCallback((newTheme) => {
    if (!VALID_THEMES.includes(newTheme)) return;
    setThemeState(newTheme);
    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch {}
    const resolved = newTheme === 'system' ? getSystemTheme() : newTheme;
    applyTheme(resolved);
  }, [applyTheme]);

  // Listen for system preference changes when in "system" mode
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => {
      if (theme === 'system') {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [theme, applyTheme]);

  // Apply on mount
  useEffect(() => {
    const resolved = theme === 'system' ? getSystemTheme() : theme;
    applyTheme(resolved);
  }, []);

  // Cycle function: light → dark → system → light
  const cycleTheme = useCallback(() => {
    const order = ['light', 'dark', 'system'];
    const next = order[(order.indexOf(theme) + 1) % order.length];
    setTheme(next);
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
