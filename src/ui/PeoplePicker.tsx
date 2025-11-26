import * as React from 'react';
import { NormalPeoplePicker, IPersonaProps } from '@fluentui/react';
import styles from './PeoplePicker.module.scss';

export interface PeoplePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
}

// Mock data for suggestions
const suggestionProps: IPersonaProps[] = [
  { text: 'John Smith', secondaryText: 'Project Manager' },
  { text: 'Sarah Johnson', secondaryText: 'Developer' },
  { text: 'Michael Brown', secondaryText: 'Designer' },
  { text: 'Emily Davis', secondaryText: 'QA' },
  { text: 'David Wilson', secondaryText: 'Stakeholder' },
];

export const PeoplePicker: React.FunctionComponent<PeoplePickerProps> = ({
  value,
  onChange,
  className = '',
  placeholder = 'Select a person...',
}) => {
  const [selectedItems, setSelectedItems] = React.useState<IPersonaProps[]>([]);

  // Initialize selected items from value string if provided
  React.useEffect(() => {
    if (value && selectedItems.length === 0) {
      // If we have a value string but no selected items, try to find it or create a temporary one
      const found = suggestionProps.find(p => p.text === value);
      if (found) {
        setSelectedItems([found]);
      } else {
        setSelectedItems([{ text: value }]);
      }
    } else if (!value && selectedItems.length > 0) {
        // If value is cleared externally
        setSelectedItems([]);
    }
  }, [value]);

  const onFilterChanged = (
    filterText: string,
    _currentPersonas: IPersonaProps[] | undefined,
    _limitResults?: number
  ): IPersonaProps[] | Promise<IPersonaProps[]> => {
    if (filterText) {
      return suggestionProps.filter(
        item => item.text && item.text.toLowerCase().indexOf(filterText.toLowerCase()) > -1
      );
    } else {
      return [];
    }
  };

  const onItemsChange = (items?: IPersonaProps[]) => {
    setSelectedItems(items || []);
    if (onChange && items && items.length > 0) {
      onChange(items[0].text || '');
    } else if (onChange) {
      onChange('');
    }
  };

  return (
    <div className={`${styles.peoplePickerWrapper} ${className}`}>
      <NormalPeoplePicker
        onResolveSuggestions={onFilterChanged}
        getTextFromItem={(persona: IPersonaProps) => persona.text || ''}
        pickerSuggestionsProps={{
          suggestionsHeaderText: 'Suggested People',
          noResultsFoundText: 'No results found',
          loadingText: 'Loading',
        }}
        inputProps={{
          placeholder: selectedItems.length > 0 ? '' : placeholder,
        }}
        selectedItems={selectedItems}
        onChange={onItemsChange}
        itemLimit={1}
      />
    </div>
  );
};

export default PeoplePicker;

