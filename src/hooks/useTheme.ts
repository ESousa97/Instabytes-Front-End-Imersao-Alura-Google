import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Verificar preferência salva no localStorage
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return JSON.parse(saved);
    }
    
    // Verificar preferência do sistema
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Salvar preferência no localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    
    // Aplicar classe ao documento
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    // Escutar mudanças na preferência do sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Só atualizar se não há preferência salva
      const saved = localStorage.getItem('darkMode');
      if (saved === null) {
        setDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return {
    darkMode,
    toggleDarkMode
  };
};
