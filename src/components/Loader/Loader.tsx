import React from 'react';
import './Loader.css';

interface LoaderProps {
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({ message = 'Cargando programas...' }) => {
  return (
    <div className="loader" role="status" aria-live="polite">
      <div className="loader-spinner" aria-hidden="true" />
      <p className="loader-text">{message}</p>
    </div>
  );
};

export default Loader;
