import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Overlay from './Overlay';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const NavBar = () => {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showConfirmOverlay, setShowConfirmOverlay] = useState(false);
  
  const API_BASE_URL = 'https://portfolio-back-h389.onrender.com';

  const handleLogout = () => {
    setShowConfirmOverlay(true);
  };

  const confirmLogout = () => {
    logout();
    setShowConfirmOverlay(false);
    navigate('/');
  };

  const cancelLogout = () => {
    setShowConfirmOverlay(false);
  };

  const isMiCuentaPage = location.pathname === '/mi-cuenta';

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Función mejorada para esperar a que el elemento exista
  const waitForElementAndScroll = (sectionId, maxAttempts = 20, attempt = 1) => {
    const element = document.getElementById(sectionId);
    
    if (element) {
      // El elemento existe, hacer scroll
      scrollToSection(sectionId);
    } else if (attempt < maxAttempts) {
      // El elemento no existe todavía, esperar un poco más
      setTimeout(() => {
        waitForElementAndScroll(sectionId, maxAttempts, attempt + 1);
      }, 150); // Intentar cada 150ms
    } else {
      console.warn(`No se pudo encontrar el elemento con id: ${sectionId}`);
    }
  };

  const closeMenu = () => {
    const navbarToggler = document.querySelector('.navbar-collapse');
    const togglerButton = document.querySelector('.navbar-toggler');
    
    if (navbarToggler && navbarToggler.classList.contains('show') && togglerButton) {
      togglerButton.click();
    }
  };

  const handleNavigation = (e, sectionId) => {
    e.preventDefault();
    closeMenu();
    
    // Si estamos en la página principal, hacer scroll directo
    if (location.pathname === '/') {
      scrollToSection(sectionId);
    } else {
      // Si estamos en otra página, navegar al home primero
      navigate('/');
      // Usar la función mejorada para esperar al elemento
      waitForElementAndScroll(sectionId);
    }
  };

  const handleHomeNavigation = (e) => {
    e.preventDefault();
    closeMenu();
    
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav 
        className="navbar navbar-expand-lg fixed-top bg-white border-0" 
        style={{ 
          fontFamily: 'Georgia, serif',
          padding: '20px 0',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(0,0,0,0.05)',
          zIndex: 1030
        }}
      >
        <div className="container">
          <a 
            className="navbar-brand fw-bold text-decoration-none" 
            href="#"
            onClick={handleHomeNavigation}
            style={{ 
              color: '#2c2c2c', 
              fontSize: '1.5rem',
              letterSpacing: '0.5px'
            }}
          >
            Inicio
          </a>
          
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{ 
              boxShadow: 'none',
              border: 'none',
              padding: '0'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', padding: '10px' }}>
              <span style={{ 
                display: 'block',
                width: '24px',
                height: '2px',
                backgroundColor: '#2c2c2c',
                transition: '0.3s'
              }}></span>
              <span style={{ 
                display: 'block',
                width: '24px',
                height: '2px',
                backgroundColor: '#2c2c2c',
                transition: '0.3s'
              }}></span>
              <span style={{ 
                display: 'block',
                width: '24px',
                height: '2px',
                backgroundColor: '#2c2c2c',
                transition: '0.3s'
              }}></span>
            </div>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto text-center">
              <li className="nav-item">
                <a 
                  className="nav-link px-3 text-decoration-none" 
                  href="#about"
                  onClick={(e) => handleNavigation(e, 'about')}
                  style={{ 
                    color: '#666', 
                    fontSize: '1rem',
                    letterSpacing: '1px',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseOver={(e) => e.target.style.color = '#2c2c2c'}
                  onMouseOut={(e) => e.target.style.color = '#666'}
                >
                  Sobre Mí
                </a>
              </li>
              <li className="nav-item">
                <a 
                  className="nav-link px-3 text-decoration-none" 
                  href="#skills"
                  onClick={(e) => handleNavigation(e, 'skills')}
                  style={{ 
                    color: '#666', 
                    fontSize: '1rem',
                    letterSpacing: '1px',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseOver={(e) => e.target.style.color = '#2c2c2c'}
                  onMouseOut={(e) => e.target.style.color = '#666'}
                >
                  Habilidades
                </a>
              </li>
              <li className="nav-item">
                <a 
                  className="nav-link px-3 text-decoration-none" 
                  href="#projects"
                  onClick={(e) => handleNavigation(e, 'projects')}
                  style={{ 
                    color: '#666', 
                    fontSize: '1rem',
                    letterSpacing: '1px',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseOver={(e) => e.target.style.color = '#2c2c2c'}
                  onMouseOut={(e) => e.target.style.color = '#666'}
                >
                  Proyectos
                </a>
              </li>
              <li className="nav-item">
                <a 
                  className="nav-link px-3 text-decoration-none" 
                  href="#contact"
                  onClick={(e) => handleNavigation(e, 'contact')}
                  style={{ 
                    color: '#666', 
                    fontSize: '1rem',
                    letterSpacing: '1px',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseOver={(e) => e.target.style.color = '#2c2c2c'}
                  onMouseOut={(e) => e.target.style.color = '#666'}
                >
                  Contáctame
                </a>
              </li>
              
              {user ? (
                <>
                  {!isMiCuentaPage && (
                    <li className="nav-item">
                      <Link 
                        className="nav-link px-3 text-decoration-none" 
                        to="/mi-cuenta"
                        onClick={closeMenu}
                        style={{ 
                          color: '#666', 
                          fontSize: '1rem',
                          letterSpacing: '1px',
                          transition: 'color 0.3s ease'
                        }}
                        onMouseOver={(e) => e.target.style.color = '#2c2c2c'}
                        onMouseOut={(e) => e.target.style.color = '#666'}
                      >
                        Mi Cuenta
                      </Link>
                    </li>
                  )}
                  {isAdmin() && (
                    <li className="nav-item">
                      <Link 
                        className="nav-link px-3 text-decoration-none" 
                        to="/admin"
                        onClick={closeMenu}
                        style={{ 
                          color: '#fff',
                          fontSize: '0.9rem',
                          letterSpacing: '1px',
                          backgroundColor: '#2c2c2c',
                          padding: '8px 16px',
                          borderRadius: '4px',
                          transition: 'all 0.3s ease',
                          marginLeft: '10px'
                        }}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = '#474747ff';
                          e.target.style.color = '#fff';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = '#2c2c2c';
                          e.target.style.color = '#fff';
                        }}
                      >
                        Editar
                      </Link>
                    </li>
                  )}
                  <li className="nav-item">
                    <a 
                      className="btn btn-link nav-link px-3 border-0"
                      onClick={(e) => {
                        e.preventDefault();
                        handleLogout();
                        closeMenu();
                      }}
                      style={{ 
                        color: '#666', 
                        fontSize: '1rem',
                        letterSpacing: '1px',
                        textDecoration: 'none',
                        backgroundColor: 'transparent',
                        transition: 'color 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onMouseOver={(e) => e.target.style.color = '#2c2c2c'}
                      onMouseOut={(e) => e.target.style.color = '#666'}
                    >
                      Cerrar Sesión
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link 
                      className="nav-link px-3 text-decoration-none" 
                      to="/login"
                      onClick={closeMenu}
                      style={{ 
                        color: '#666', 
                        fontSize: '1rem',
                        letterSpacing: '1px',
                        transition: 'color 0.3s ease'
                      }}
                      onMouseOver={(e) => e.target.style.color = '#2c2c2c'}
                      onMouseOut={(e) => e.target.style.color = '#666'}
                    >
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link 
                      className="nav-link px-3 text-decoration-none" 
                      to="/register"
                      onClick={closeMenu}
                      style={{ 
                        color: '#666', 
                        fontSize: '1rem',
                        letterSpacing: '1px',
                        transition: 'color 0.3s ease'
                      }}
                      onMouseOver={(e) => e.target.style.color = '#2c2c2c'}
                      onMouseOut={(e) => e.target.style.color = '#666'}
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      
      <Overlay
        show={showConfirmOverlay}
        type="confirm"
        title="Confirmar Salida"
        message="¿Estás seguro de que quieres cerrar tu sesión?"
        confirmText="Sí, salir"
        cancelText="Cancelar"
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    </>
  );
};

export default NavBar;