import React, { ReactNode } from 'react';
import FormFieldLabel from '../FormFieldLabel/FormFieldLabel';
import wrapperStyles from '../../styles/FormFieldWrapper.module.scss';
import formStyles from '../../styles/Form.module.scss';

export interface FormFieldProps {
  label: string;
  tooltip?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
  error?: string;
}

const FormField: React.FC<FormFieldProps> = ({ 
  label, 
  tooltip,
  required,
  children,
  className = '',
  error
}) => {
  const content = tooltip ? (
    <div className={wrapperStyles.inputWithTooltip}>
      {children}
      <span className={wrapperStyles.tooltipIcon} title={tooltip}>
        <i className="pi pi-question-circle"></i>
      </span>
    </div>
  ) : (
    children
  );

  return (
    <div className={`${formStyles.formField} ${className}`}>
      <FormFieldLabel 
        label={label} 
        required={required}
      />
      <div 
        className={`${wrapperStyles.formFieldWrapper} ${error ? wrapperStyles.formFieldWrapperError : ''}`}
        aria-invalid={!!error}
        aria-label={error || undefined}
      >
        {content}
      </div>
    </div>
  );
};

export default FormField;

