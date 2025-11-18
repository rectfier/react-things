import React, { InputHTMLAttributes, forwardRef } from 'react';
import styles from '../../styles/Input.module.scss';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`${styles.customInput} ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;

