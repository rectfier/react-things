import * as React from 'react';
import { createPortal } from 'react-dom';
import styles from './Dialog.module.scss';

export interface DialogProps {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const Dialog = ({ 
  open, 
  title, 
  onClose, 
  children, 
  footer, 
  icon,
  className = ''
}: DialogProps) => {
  if (!open) return null;

  const combinedClassName = `${styles.dialog} ${className}`.trim();

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div 
        className={combinedClassName} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.body}>
          {icon && <div className={styles.iconContainer}>{icon}</div>}
          {title && <h2 className={styles.title}>{title}</h2>}
          {children}
        </div>
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>,
    document.body
  );
};

Dialog.displayName = 'Dialog';

export default Dialog;

