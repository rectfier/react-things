import React, { InputHTMLAttributes, forwardRef } from 'react';
import styles from '../styles/InputField.module.scss';

export interface InputFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
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

InputField.displayName = 'InputField';

export default InputField;

