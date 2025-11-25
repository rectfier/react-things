import * as React from 'react';
import styles from './Button.module.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'link' | 'light';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  label?: string;
  icon?: string;
  iconPos?: 'left' | 'right';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    label, 
    icon, 
    iconPos = 'left', 
    className = '', 
    children, 
    type = 'button',
    ...props 
  }, ref) => {
    const variantClass = styles[variant] || styles.primary;
    const combinedClassName = `${styles.button} ${variantClass} ${className}`.trim();

    const iconElement = icon ? <i className={`pi ${icon}`}></i> : null;

    return (
      <button
        ref={ref}
        type={type}
        className={combinedClassName}
        {...props}
      >
        {iconElement && iconPos === 'left' && iconElement}
        {label || children}
        {iconElement && iconPos === 'right' && iconElement}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
