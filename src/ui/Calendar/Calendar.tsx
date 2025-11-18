import React, { useState, useRef, useEffect, forwardRef } from 'react';
import styles from '../../styles/Calendar.module.scss';

export interface CalendarChangeEvent {
  value: Date | null;
  originalEvent: React.MouseEvent | React.ChangeEvent;
}

export interface CalendarProps {
  value?: Date | null;
  onChange?: (e: CalendarChangeEvent) => void;
  dateFormat?: string;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  showIcon?: boolean;
}

const Calendar = forwardRef<HTMLInputElement, CalendarProps>(
  ({ value, onChange, dateFormat = 'mm/dd/yyyy', className = '', disabled = false, placeholder, showIcon = true }, ref) => {
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (value) {
        const formatted = formatDate(value, dateFormat);
        setInputValue(formatted);
      } else {
        setInputValue('');
      }
    }, [value, dateFormat]);

    const padStart = (str: string, length: number, padChar: string): string => {
      str = String(str);
      while (str.length < length) {
        str = padChar + str;
      }
      return str;
    };

    const formatDate = (date: Date, format: string): string => {
      const month = padStart(String(date.getMonth() + 1), 2, '0');
      const day = padStart(String(date.getDate()), 2, '0');
      const year = date.getFullYear();

      return format
        .replace('mm', month)
        .replace('dd', day)
        .replace('yyyy', String(year))
        .replace('yy', String(year).slice(-2));
    };

    const parseDate = (value: string): Date | null => {
      if (!value) return null;

      // Handle mm/dd/yyyy format
      const parts = value.split('/');
      if (parts.length === 3) {
        const month = parseInt(parts[0], 10) - 1;
        const day = parseInt(parts[1], 10);
        const year = parseInt(parts[2], 10);

        if (!isNaN(month) && !isNaN(day) && !isNaN(year)) {
          const date = new Date(year, month, day);
          if (date.getMonth() === month && date.getDate() === day && date.getFullYear() === year) {
            return date;
          }
        }
      }

      return null;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);

      if (onChange) {
        const parsedDate = parseDate(newValue);
        onChange({
          value: parsedDate,
          originalEvent: e
        });
      }
    };

    const handleInputBlur = () => {
      // Validate and format on blur
      if (inputValue) {
        const parsedDate = parseDate(inputValue);
        if (parsedDate) {
          const formatted = formatDate(parsedDate, dateFormat);
          setInputValue(formatted);
        }
      }
    };

    return (
      <div className={`${styles.customCalendarWrapper} ${className} ${disabled ? styles.calendarDisabled : ''}`}>
        {showIcon && (
          <span className={styles.calendarIcon}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2.667H4a1.333 1.333 0 0 0-1.333 1.333v9.333A1.333 1.333 0 0 0 4 14.667h8a1.333 1.333 0 0 0 1.333-1.334V4a1.333 1.333 0 0 0-1.333-1.333zM10.667 1.333V4M5.333 1.333V4M2.667 6.667h10.666"
                stroke="currentColor"
                strokeWidth="1.333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        )}
        <input
          ref={ref || inputRef}
          type="text"
          className={styles.customCalendarInput}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          placeholder={placeholder || dateFormat}
          disabled={disabled}
        />
      </div>
    );
  }
);

Calendar.displayName = 'Calendar';

export default Calendar;

