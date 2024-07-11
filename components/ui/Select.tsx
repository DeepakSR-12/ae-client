import React from 'react';
import styles from './Select.module.scss';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select: React.FC<SelectProps> = (props) => {
  return <select className={styles.select} {...props} />;
};

export default Select;
