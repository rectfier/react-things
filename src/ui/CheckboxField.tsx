import React, { InputHTMLAttributes, forwardRef } from 'react';
import styles from '../styles/CheckboxField.module.scss';

export interface CheckboxFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

const CheckboxField = forwardRef<HTMLInputElement, CheckboxFieldProps>(
  ({ className = '', label, checked, onChange, ...props }, ref) => {
    return (
      <label className={`${styles.checkboxLabel} ${className}`}>
        <input
          ref={ref}
          type="checkbox"
          className={styles.checkboxInput}
          checked={checked}
          onChange={onChange}
          {...props}
        />
        <span className={styles.checkboxCustom}></span>
        {label && <span className={styles.checkboxText}>{label}</span>}
      </label>
    );
  }
);

CheckboxField.displayName = 'CheckboxField';

export default CheckboxField;

