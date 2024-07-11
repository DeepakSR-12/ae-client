import React from 'react';
import styles from './TextArea.module.scss';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  rows?: number;
}

const TextArea: React.FC<TextAreaProps> = (props) => {
  return <textarea className={styles.textarea} {...props} />;
};

export default TextArea;
