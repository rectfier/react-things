import React, { ReactNode } from 'react';
import FormFieldLabel from '../FormFieldLabel/FormFieldLabel';
import '../../styles/form-field-wrapper.scss';

export interface FormFieldProps {
  label: string;
  tooltip?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({ 
  label, 
  tooltip,
  required,
  children,
  className = ''
}) => {
  const content = tooltip ? (
    <div className="input-with-tooltip">
      {children}
      <span className="tooltip-icon" title={tooltip}>
        <i className="pi pi-question-circle"></i>
      </span>
    </div>
  ) : (
    children
  );

  return (
    <div className={`form-field ${className}`}>
      <FormFieldLabel 
        label={label} 
        required={required}
      />
      <div className="form-field-wrapper">
        {content}
      </div>
    </div>
  );
};

export default FormField;

