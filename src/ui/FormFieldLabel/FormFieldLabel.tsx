import React from 'react';
import '../../styles/form-field-label.scss';

export interface FormFieldLabelProps {
  label: string;
  required?: boolean;
}

const FormFieldLabel: React.FC<FormFieldLabelProps> = ({ 
  label, 
  required 
}) => {
  return (
    <label className="form-field-label">
      <span className="label-text">
        {label}
        {required && <span className="required-indicator">*</span>}
      </span>
    </label>
  );
};

export default FormFieldLabel;

