import * as React from 'react';
import { useState, useRef, useEffect, forwardRef } from 'react';
import styles from './DropdownField.module.scss';

export interface DropdownFieldOption {
  label: string;
  value: string | number;
  category?: string;
}

export interface DropdownFieldChangeEvent {
  value: string | number | null;
  originalEvent: React.MouseEvent | React.KeyboardEvent;
  selectedLabels: string[];  // Array of selected label strings
  formattedNames: string;    // Labels joined by " | " for multi-select, or single label
}

export interface DropdownFieldProps {
  value?: string | number | null;
  options?: DropdownFieldOption[];
  onChange?: (e: DropdownFieldChangeEvent) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  filter?: boolean;
  invalid?: boolean;
  multiselect?: boolean;
}

interface GroupedOptions {
  category: string | null;
  options: DropdownFieldOption[];
}

const DropdownField = forwardRef<HTMLDivElement, DropdownFieldProps>(
  ({ value, options = [], onChange, placeholder = 'Select...', className = '', disabled = false, filter = false, invalid = false, multiselect = false }, _ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const [filterText, setFilterText] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const filterInputRef = useRef<HTMLInputElement>(null);

    // For multiselect: convert comma-separated string to array
    const valueArray: string[] = multiselect && typeof value === 'string' && value
      ? value.split(',').map(v => v.trim()).filter(Boolean)
      : [];

    // Find selected option using a loop for older browser compatibility
    let selectedOption: DropdownFieldOption | undefined;
    for (let i = 0; i < options.length; i++) {
      if (options[i].value === value) {
        selectedOption = options[i];
        break;
      }
    }

    // For multiselect: get selected labels
    const selectedLabels: string[] = [];
    if (multiselect) {
      for (let i = 0; i < options.length; i++) {
        if (valueArray.indexOf(String(options[i].value)) !== -1) {
          selectedLabels.push(options[i].label);
        }
      }
    }

    // Filter options based on filterText
    const filteredOptions: DropdownFieldOption[] = [];
    if (filter && filterText.trim() !== '') {
      const lowerFilter = filterText.toLowerCase();
      for (let i = 0; i < options.length; i++) {
        if (options[i].label.toLowerCase().indexOf(lowerFilter) !== -1) {
          filteredOptions.push(options[i]);
        }
      }
    } else {
      for (let i = 0; i < options.length; i++) {
        filteredOptions.push(options[i]);
      }
    }

    // Group options by category
    const groupedOptions: GroupedOptions[] = [];
    const categoryMap: { [key: string]: DropdownFieldOption[] } = {};
    const uncategorized: DropdownFieldOption[] = [];

    for (let i = 0; i < filteredOptions.length; i++) {
      const opt = filteredOptions[i];
      if (opt.category) {
        if (!categoryMap[opt.category]) {
          categoryMap[opt.category] = [];
        }
        categoryMap[opt.category].push(opt);
      } else {
        uncategorized.push(opt);
      }
    }

    // Add categorized options
    const categoryKeys = Object.keys(categoryMap);
    for (let i = 0; i < categoryKeys.length; i++) {
      groupedOptions.push({ category: categoryKeys[i], options: categoryMap[categoryKeys[i]] });
    }

    // Add uncategorized only if there are no categories (show normally when no grouping)
    if (uncategorized.length > 0 && categoryKeys.length === 0) {
      groupedOptions.push({ category: null, options: uncategorized });
    }

    // Flatten for keyboard navigation (only clickable options)
    const flatOptions: DropdownFieldOption[] = [];
    for (let i = 0; i < groupedOptions.length; i++) {
      for (let j = 0; j < groupedOptions[i].options.length; j++) {
        flatOptions.push(groupedOptions[i].options[j]);
      }
    }

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          setFocusedIndex(-1);
          setFilterText('');
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);

    // Focus filter input when dropdown opens
    useEffect(() => {
      if (isOpen && filter && filterInputRef.current) {
        filterInputRef.current.focus();
      }
    }, [isOpen, filter]);

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
        const newIsOpen = !isOpen;
        setIsOpen(newIsOpen);
        setFocusedIndex(-1);
        if (!newIsOpen) {
          setFilterText('');
        }
      }
    };

    const handleSelect = (option: DropdownFieldOption, event: React.MouseEvent | React.KeyboardEvent) => {
      if (multiselect) {
        const currentValues = [...valueArray];
        const optionValueStr = String(option.value);
        const index = currentValues.indexOf(optionValueStr);

        if (index === -1) {
          currentValues.push(optionValueStr);
        } else {
          currentValues.splice(index, 1);
        }

        const newValue = currentValues.join(',');

        // Get selected labels
        const selectedLabels: string[] = [];
        for (let i = 0; i < options.length; i++) {
          if (currentValues.indexOf(String(options[i].value)) !== -1) {
            selectedLabels.push(options[i].label);
          }
        }
        const formattedNames = selectedLabels.join(' | ');

        if (onChange) {
          onChange({
            value: newValue,
            originalEvent: event,
            selectedLabels,
            formattedNames
          });
        }
        // Keep open for multiple selection
      } else {
        if (onChange) {
          onChange({
            value: option.value,
            originalEvent: event,
            selectedLabels: [option.label],
            formattedNames: option.label
          });
        }

        setIsOpen(false);
        setFocusedIndex(-1);
        setFilterText('');
      }
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilterText(e.target.value);
      setFocusedIndex(-1);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case 'Enter':
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else if (focusedIndex >= 0 && flatOptions[focusedIndex]) {
            handleSelect(flatOptions[focusedIndex], e);
          }
          break;
        case ' ':
          // Only toggle if not in filter mode or filter input is not focused
          if (!filter || document.activeElement !== filterInputRef.current) {
            e.preventDefault();
            if (!isOpen) {
              setIsOpen(true);
            } else if (focusedIndex >= 0 && flatOptions[focusedIndex]) {
              handleSelect(flatOptions[focusedIndex], e);
            }
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setFocusedIndex(-1);
          setFilterText('');
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            setFocusedIndex(prev => 
              prev < flatOptions.length - 1 ? prev + 1 : prev
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
          setFilterText('');
          break;
      }
    };

    // Helper to get flat index for an option
    const getFlatIndex = (option: DropdownFieldOption): number => {
      for (let i = 0; i < flatOptions.length; i++) {
        if (flatOptions[i].value === option.value) {
          return i;
        }
      }
      return -1;
    };

    return (
      <div
        ref={dropdownRef}
        className={`${styles.customDropdown} ${className} ${isOpen ? styles.dropdownOpen : ''} ${disabled ? styles.dropdownDisabled : ''}`}
        onKeyDown={handleKeyDown}
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
          <span className={`${styles.dropdownLabel} ${multiselect ? (selectedLabels.length === 0 ? styles.dropdownPlaceholder : '') : (!selectedOption ? styles.dropdownPlaceholder : '')}`}>
            {multiselect ? (selectedLabels.length > 0 ? selectedLabels.join(', ') : placeholder) : (selectedOption ? selectedOption.label : placeholder)}
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
        {isOpen && (
          <div className={styles.dropdownPanel} role="listbox" aria-multiselectable={multiselect}>
            {filter && (
              <div className={styles.filterContainer}>
                <input
                  ref={filterInputRef}
                  type="text"
                  className={styles.filterInput}
                  placeholder="Search..."
                  value={filterText}
                  onChange={handleFilterChange}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
            {flatOptions.length > 0 ? (
              <ul
                ref={listRef}
                className={styles.optionsList}
              >
                {groupedOptions.map((group) => (
                  <React.Fragment key={group.category || '__uncategorized__'}>
                    {group.category && (
                      <li className={styles.categoryHeader}>
                        {group.category}
                      </li>
                    )}
                    {group.options.map((option) => {
                      const flatIndex = getFlatIndex(option);
                      const hasCategory = group.category !== null;
                      const isSelected = multiselect
                        ? valueArray.indexOf(String(option.value)) !== -1
                        : option.value === value;
                      return (
                        <li
                          key={option.value}
                          className={`${styles.dropdownOption} ${hasCategory ? styles.optionIndented : ''} ${isSelected ? styles.optionSelected : ''} ${flatIndex === focusedIndex ? styles.optionFocused : ''}`}
                          onClick={(e) => handleSelect(option, e)}
                          role="option"
                          aria-selected={isSelected}
                        >
                          {multiselect ? (
                            <span className={styles.multiselectOption}>
                              <span>{option.label}</span>
                              {isSelected && <span className={styles.checkmark}>✓</span>}
                            </span>
                          ) : (
                            option.label
                          )}
                        </li>
                      );
                    })}
                  </React.Fragment>
                ))}
              </ul>
            ) : (
              <div className={styles.noResults}>No results found</div>
            )}
          </div>
        )}
      </div>
    );
  }
);

DropdownField.displayName = 'DropdownField';

export default DropdownField;

