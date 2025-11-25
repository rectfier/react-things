import * as React from 'react';
import { Button as BootstrapButton, ButtonProps as BootstrapButtonProps } from 'react-bootstrap';
import styles from './Button.module.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'link' | 'light';

export interface ButtonProps extends Omit<BootstrapButtonProps, 'variant'> {
  variant?: ButtonVariant;
  label?: string;
  icon?: string;
  iconPos?: 'left' | 'right';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', label, icon, iconPos = 'left', className = '', children, ...props }, ref) => {
    const variantClass = styles[variant] || styles.primary;
    const combinedClassName = `${styles.button} ${variantClass} ${className}`.trim();

    const iconElement = icon ? <i className={`pi ${icon}`}></i> : null;

    return (
      <BootstrapButton
        ref={ref}
        className={combinedClassName}
        variant={undefined}
        {...props}
      >
        {iconElement && iconPos === 'left' && iconElement}
        {label || children}
        {iconElement && iconPos === 'right' && iconElement}
      </BootstrapButton>
    );
  }
);

Button.displayName = 'Button';

export default Button;
