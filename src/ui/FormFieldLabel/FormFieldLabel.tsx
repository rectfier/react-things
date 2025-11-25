import React from 'react';
import styles from './FormFieldLabel.module.scss';

export interface FormFieldLabelProps {
  label: string;
  required?: boolean;
}

const FormFieldLabel: React.FC<FormFieldLabelProps> = ({ 
  label, 
  required 
}) => {
  return (
    <label className={styles.formFieldLabel}>
      <span className={styles.labelText}>
        {label}
        {required && <span className={styles.requiredIndicator}>*</span>}
      </span>
    </label>
  );
};

export default FormFieldLabel;

