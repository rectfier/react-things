import React, { TextareaHTMLAttributes, forwardRef } from 'react';
import './Textarea.scss';

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
        className={`custom-textarea ${className}`}
        rows={rows}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;

