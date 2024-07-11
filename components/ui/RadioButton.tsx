import React from 'react';
import styles from './RadioButton.module.scss';

interface RadioButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const RadioButton: React.FC<RadioButtonProps> = (props) => {
  return (
    <label className={styles.radio}>
      <input type="radio" {...props} />
      <span className={styles.checkmark}></span>
      {props.children}
    </label>
  );
};

export default RadioButton;
