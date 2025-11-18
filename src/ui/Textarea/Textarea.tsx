import React, { TextareaHTMLAttributes, forwardRef } from 'react';
import styles from '../../styles/Textarea.module.scss';

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
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

Textarea.displayName = 'Textarea';

export default Textarea;

