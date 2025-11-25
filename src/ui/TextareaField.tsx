import React, { TextareaHTMLAttributes, forwardRef } from 'react';
import styles from './TextareaField.module.scss';

export interface TextareaFieldProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
}

const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ className = '', rows = 4, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`${styles.customTextarea} ${className}`}
        rows={rows}
        {...props}
      />
    );
  }
);

TextareaField.displayName = 'TextareaField';

export default TextareaField;

