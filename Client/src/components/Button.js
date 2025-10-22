import React from 'react';
import styles from '../styles/Button.module.css';

const Button = ({ 
  children, 
  type = 'button', 
  variant = 'primary',
  disabled = false,
  onClick,
  className = '',
  ...props 
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${styles.button} ${styles[variant]} ${className} ${disabled ? styles.disabled : ''}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 