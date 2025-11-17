import React, { useState, useRef, useEffect, forwardRef } from 'react';
import './Dropdown.scss';

export interface DropdownOption {
  label: string;
  value: string | number;
}

export interface DropdownChangeEvent {
  value: string | number | null;
  originalEvent: React.MouseEvent | React.KeyboardEvent;
}

export interface DropdownProps {
  value?: string | number | null;
  options?: DropdownOption[];
  onChange?: (e: DropdownChangeEvent) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  filter?: boolean;
}

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ value, options = [], onChange, placeholder = 'Select...', className = '', disabled = false }, _ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    const selectedOption = options.find(opt => opt.value === value);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          setFocusedIndex(-1);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);

    useEffect(() => {
      if (isOpen && listRef.current && focusedIndex >= 0) {
        const items = listRef.current.querySelectorAll('li');
        if (items[focusedIndex]) {
          items[focusedIndex].scrollIntoView({ block: 'nearest' });
        }
      }
    }, [focusedIndex, isOpen]);

    const handleToggle = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
        setFocusedIndex(-1);
      }
    };

    const handleSelect = (option: DropdownOption, event: React.MouseEvent) => {
      if (onChange) {
        onChange({
          value: option.value,
          originalEvent: event
        });
      }
      setIsOpen(false);
      setFocusedIndex(-1);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else if (focusedIndex >= 0 && options[focusedIndex]) {
            handleSelect(options[focusedIndex], e as any);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setFocusedIndex(-1);
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            setFocusedIndex(prev => 
              prev < options.length - 1 ? prev + 1 : prev
            );
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (isOpen) {
            setFocusedIndex(prev => prev > 0 ? prev - 1 : 0);
          }
          break;
        case 'Tab':
          setIsOpen(false);
          setFocusedIndex(-1);
          break;
      }
    };

    return (
      <div
        ref={dropdownRef}
        className={`custom-dropdown ${className} ${isOpen ? 'dropdown-open' : ''} ${disabled ? 'dropdown-disabled' : ''}`}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
      >
        <div
          className="dropdown-trigger"
          onClick={handleToggle}
          role="button"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <span className={`dropdown-label ${!selectedOption ? 'dropdown-placeholder' : ''}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span className="dropdown-arrow">
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
            ref={listRef}
            className="dropdown-panel"
            role="listbox"
          >
            {options.map((option, index) => (
              <li
                key={option.value}
                className={`dropdown-option ${option.value === value ? 'option-selected' : ''} ${index === focusedIndex ? 'option-focused' : ''}`}
                onClick={(e) => handleSelect(option, e)}
                role="option"
                aria-selected={option.value === value}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

Dropdown.displayName = 'Dropdown';

export default Dropdown;

