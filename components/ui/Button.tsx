import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  customStyle?: object
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', size = 'medium', customStyle={} , children, ...props }) => {
  return (
    <button className={`${styles.button} ${styles[variant]} ${styles[size]}`} {...props}
      style={customStyle}
    >
      {children}
    </button>
  );
};

export default Button;
