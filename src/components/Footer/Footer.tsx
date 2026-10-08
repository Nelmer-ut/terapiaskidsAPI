import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="main-footer">
      <p>&copy; {new Date().getFullYear()} TerapiasKids - Psicóloga Elizabeth Rivero Arias</p>
      <p>Juan José Latorre 461, Sector Puertas de Mar</p>
    </footer>
  );
};

export default Footer;
