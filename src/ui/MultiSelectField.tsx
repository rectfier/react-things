import React, { useState, useRef, useEffect, forwardRef } from 'react';
import styles from '../styles/DropdownField.module.scss';

export interface MultiSelectOption {
  label: string;
  value: string | number;
}

export interface MultiSelectChangeEvent {
  value: string;
  originalEvent: React.MouseEvent | React.KeyboardEvent;
}

export interface MultiSelectFieldProps {
  value?: string;
  options?: MultiSelectOption[];
  onChange?: (e: MultiSelectChangeEvent) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  invalid?: boolean;
}

const MultiSelectField = forwardRef<HTMLDivElement, MultiSelectFieldProps>(
  ({ value = '', options = [], onChange, placeholder = 'Select...', className = '', disabled = false, invalid = false }, _ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Convert comma-separated string to array
    const valueArray = value ? value.split(',').map(v => v.trim()).filter(Boolean) : [];

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);

    const handleToggle = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
      }
    };

    const handleSelect = (option: MultiSelectOption, event: React.MouseEvent) => {
      if (disabled) return;

      const currentValues = [...valueArray];
      const optionValueStr = String(option.value);
      const index = currentValues.indexOf(optionValueStr);

      if (index === -1) {
        currentValues.push(optionValueStr);
      } else {
        currentValues.splice(index, 1);
      }

      // Convert array back to comma-separated string
      const newValue = currentValues.join(', ');

      if (onChange) {
        onChange({
          value: newValue,
          originalEvent: event
        });
      }
      // Keep open for multiple selection
    };

    const selectedLabels = options
      .filter(opt => valueArray.includes(String(opt.value)))
      .map(opt => opt.label)
      .join(', ');

    return (
      <div
        ref={dropdownRef}
        className={`${styles.customDropdown} ${className} ${isOpen ? styles.dropdownOpen : ''} ${disabled ? styles.dropdownDisabled : ''}`}
        tabIndex={disabled ? -1 : 0}
      >
        <div
          className={styles.dropdownTrigger}
          onClick={handleToggle}
          role="button"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-invalid={invalid}
        >
          <span className={`${styles.dropdownLabel} ${!selectedLabels ? styles.dropdownPlaceholder : ''}`}>
            {selectedLabels || placeholder}
          </span>
          <span className={styles.dropdownArrow}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 4L6 8L10 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
        {isOpen && options.length > 0 && (
          <ul
            className={styles.dropdownPanel}
            role="listbox"
            aria-multiselectable="true"
          >
            {options.map((option) => {
              const isSelected = valueArray.includes(String(option.value));
              return (
                <li
                  key={option.value}
                  className={`${styles.dropdownOption} ${isSelected ? styles.optionSelected : ''}`}
                  onClick={(e) => handleSelect(option, e)}
                  role="option"
                  aria-selected={isSelected}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <span>{option.label}</span>
                    {isSelected && (
                      <span style={{ color: 'currentColor' }}>✓</span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
);

MultiSelectField.displayName = 'MultiSelectField';

export default MultiSelectField;

