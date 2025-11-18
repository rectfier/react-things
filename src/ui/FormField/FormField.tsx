import React, { ReactNode } from 'react';
import FormFieldLabel from '../FormFieldLabel/FormFieldLabel';
import wrapperStyles from '../../styles/form-field-wrapper.module.scss';
import formStyles from '../../styles/form.module.scss';

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
      <div className={wrapperStyles.formFieldWrapper}>
        {content}
      </div>
    </div>
  );
};

export default FormField;

