import React, { useRef, forwardRef } from 'react';
import styles from './CalendarField.module.scss';

export interface CalendarFieldChangeEvent {
  value: Date | null;
  originalEvent: React.MouseEvent | React.ChangeEvent;
}

export interface CalendarFieldProps {
  value?: Date | null;
  onChange?: (e: CalendarFieldChangeEvent) => void;
  dateFormat?: string;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  showIcon?: boolean;
}

const CalendarField = forwardRef<HTMLInputElement, CalendarFieldProps>(
  ({ value, onChange, className = '', disabled = false }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    // Convert Date to YYYY-MM-DD format for HTML5 date input
    const formatDateForInput = (date: Date | null | undefined): string => {
      if (!date) return '';
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    // Convert YYYY-MM-DD string to Date object
    // const parseDateFromInput = (value: string): Date | null => {
    //   if (!value) return null;
    //   const date = new Date(value + 'T00:00:00'); // Add time to avoid timezone issues
    //   if (isNaN(date.getTime())) return null;
    //   return date;
    // };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      const parsedDate = parseDateFromInput(newValue);

      if (onChange) {
        onChange({
          value: parsedDate,
          originalEvent: e
        });
      }
    };

    const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
      if (disabled) return;
      const input = e.currentTarget;
      // Try to open the date picker programmatically
      if ('showPicker' in input && typeof (input as any).showPicker === 'function') {
        try {
          (input as any).showPicker();
        } catch (err) {
          // showPicker might not be supported or might require user gesture
          // The default browser behavior will handle it
        }
      }
    };

    const handleWrapperClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      // If clicking on wrapper (not input), focus and open the input
      if (e.target === e.currentTarget) {
        const input = ref && typeof ref !== 'function' ? ref.current : inputRef.current;
        if (input) {
          input.focus();
          if ('showPicker' in input && typeof (input as any).showPicker === 'function') {
            try {
              (input as any).showPicker();
            } catch (err) {
              // showPicker might not be supported
            }
          }
        }
      }
    };

    const inputValue = formatDateForInput(value);

    return (
      <div 
        className={`${styles.customCalendarWrapper} ${className} ${disabled ? styles.calendarDisabled : ''}`}
        onClick={handleWrapperClick}
      >
        <input
          ref={ref || inputRef}
          type="date"
          className={styles.customCalendarInput}
          value={inputValue}
          onChange={handleInputChange}
          onClick={handleInputClick}
          disabled={disabled}
        />
      </div>
    );
  }
);

CalendarField.displayName = 'CalendarField';

export default CalendarField;

