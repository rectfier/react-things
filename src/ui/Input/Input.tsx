import React, { InputHTMLAttributes, forwardRef } from 'react';
import './Input.scss';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`custom-input ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;

