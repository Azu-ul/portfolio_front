import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const BASE_URL = 'https://portfolio-back-h389.onrender.com';

const Header = () => {
  const [headerData, setHeaderData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/content/header`);
        if (!response.ok) {
          throw new Error('Error al cargar los datos');
        }
        const data = await response.json();
        setHeaderData(data);
      } catch (error) {
        console.error('Error fetching header data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHeaderData();
  }, []);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };

  if (loading) {
    return (
      <header className="min-vh-100 d-flex align-items-center bg-white">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <div className="spinner-border text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  if (error || !headerData) {
    return (
      <header className="min-vh-100 d-flex align-items-center bg-white">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <p style={{ color: '#dc3545' }}>Error: No se pudieron cargar los datos</p>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="min-vh-100 d-flex align-items-center bg-white" style={{ fontFamily: 'Georgia, serif' }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-5"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="display-1 fw-normal mb-4"
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 6rem)', // Reducido de 8rem a 6rem
                  lineHeight: '1.1',
                  color: '#2c2c2c',
                  letterSpacing: '-2px',
                  textAlign: 'left' // Alineación a la izquierda
                }}
              >
                {headerData.main_title}
              </motion.h1>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="h1 fw-normal mb-5"
                style={{
                  color: '#666',
                  fontSize: 'clamp(1.2rem, 3vw, 2.5rem)', // Reducido de 3rem a 2.5rem
                  letterSpacing: '1px',
                  lineHeight: '1.3',
                  textAlign: 'left' // Alineación a la izquierda
                }}
              >
                {headerData.subtitle}
              </motion.h2>
            </motion.div>

            <div className="mb-5" style={{ textAlign: 'left' }}> {/* Alineación a la izquierda */}
              <a
                href="#about"
                onClick={(e) => scrollToSection(e, 'about')}
                className="text-decoration-none me-4"
                style={{
                  color: '#2c2c2c',
                  fontSize: '1rem', // Reducido de 1.1rem a 1rem
                  fontWeight: '400',
                  letterSpacing: '2px',
                  textTransform: 'uppercase'
                }}
              >
                {headerData.cta_text}
              </a>
            </div>

            {/* Social Links - alineados a la izquierda */}
            <motion.div 
              className="d-flex gap-4 mt-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <a
                href={headerData.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none"
                style={{ 
                  color: '#666', 
                  fontSize: '1.1rem',
                  transition: 'color 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.color = '#F79995'}
                onMouseOut={(e) => e.target.style.color = '#666'}
              >
                LinkedIn
              </a>
              <a
                href={headerData.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none"
                style={{ 
                  color: '#666', 
                  fontSize: '1.1rem',
                  transition: 'color 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.color = '#F79995'}
                onMouseOut={(e) => e.target.style.color = '#666'}
              >
                Website
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mantener el scroll indicator centrado */}
      <div
        className="position-absolute bottom-0 start-50 translate-middle-x mb-4"
        style={{ animation: 'bounce 2s infinite' }}
      >
        <div
          className="rounded-circle"
          style={{ width: '2px', height: '30px', backgroundColor: '#F79995' }} // Cambiado a color rosa
        ></div>
      </div>

      <style>{`
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0) translateX(-50%);
    }
    40% {
      transform: translateY(-10px) translateX(-50%);
    }
    60% {
      transform: translateY(-5px) translateX(-50%);
    }
  }
`}</style>

    </header>
  );
};

export default Header;