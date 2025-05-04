import React, { useState, useEffect } from 'react';
import './SidebarMenu.css';
import menuIcon from './menu.png'; // Assicurati che il percorso sia corretto

export default function SidebarMenu({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    // Rileva il tema predefinito del sistema operativo
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return localStorage.getItem('theme') || (systemPrefersDark ? 'dark' : 'light');
  });

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div
      className={`app-container ${menuOpen ? 'menu-open' : ''} ${
        theme === 'dark' ? 'dark-theme' : 'light-theme'
      }`}
    >
      {/* Icona per aprire il menù */}
      <div className="menu-icon" onClick={toggleMenu}>
        <i className="fas fa-bars"></i>
      </div>

      {/* Menù laterale */}
      <div className={`side-menu ${menuOpen ? 'open' : ''}`}>
        <button className="close-menu" onClick={toggleMenu}>
          <img src={menuIcon} alt="Menu" className="menu-close-icon" />
        </button>

        {/* Switch per il tema */}
        <div className="theme-switch">
            <label className="switch">
                <input
                type="checkbox"
                checked={theme === 'light'} // Usa lo stato per controllare lo switch, per cambiare scrivi dark
                onChange={toggleTheme}
                />
                <span className="slider">
                <div className="star star_1"></div>
                <div className="star star_2"></div>
                <div className="star star_3"></div>
                <svg viewBox="0 0 16 16" className="cloud_1 cloud">
                    <path
                    transform="matrix(.77976 0 0 .78395-299.99-418.63)"
                    fill="#fff"
                    d="m391.84 540.91c-.421-.329-.949-.524-1.523-.524-1.351 0-2.451 1.084-2.485 2.435-1.395.526-2.388 1.88-2.388 3.466 0 1.874 1.385 3.423 3.182 3.667v.034h12.73v-.006c1.775-.104 3.182-1.584 3.182-3.395 0-1.747-1.309-3.186-2.994-3.379.007-.106.011-.214.011-.322 0-2.707-2.271-4.901-5.072-4.901-2.073 0-3.856 1.202-4.643 2.925"
                    ></path>
                </svg>
                </span>
            </label>
        </div>



        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/listaAziende">Aziende</a></li>
          <li><a href="/studenti">Studenti</a></li>
          {/*TODO: questa parte si deve vedere solo se hai le autorizzazioni giuste */}
          <li><a href="/studenti">Aggiungi dati</a></li>
        </ul>
      </div>

      {/* Contenuto principale */}
      <div className="main-content">
        {children}
      </div>
    </div>
  );
}   