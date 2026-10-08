import React from 'react';
import Button from '../Button/Button';
import './ErrorMessage.css';

interface ErrorMessageProps {
  message: string;
  title?: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  title = 'No pudimos cargar los programas',
  onRetry,
}) => {
  return (
    <div className="error-message" role="alert">
      <span className="error-icon" aria-hidden="true">⚠️</span>
      <h3>{title}</h3>
      <p>{message}</p>
      {onRetry && (
        <Button variant="primary" onClick={onRetry}>
          Reintentar
        </Button>
      )}
    </div>
  );
};

export default ErrorMessage;
