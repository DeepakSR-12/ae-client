import React from 'react';
import styles from './Card.module.scss';

interface CardProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  gradient?: boolean;
  size?: 'small' | 'medium' | 'large';
  width?: string;
  height?: string;
}

const Card: React.FC<CardProps> = ({ header, footer, children, gradient = true, size = 'medium', width, height }) => {
  const cardClasses = `${styles.card} ${gradient ? styles.gradient : styles.simple} ${styles[size]}`;

  return (
    <div className={cardClasses} style={{ width, height }}>
      {header && <div className={styles.header}>{header}</div>}
      <div className={styles.body}>{children}</div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
};

export default Card;
