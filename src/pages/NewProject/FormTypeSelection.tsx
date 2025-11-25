import * as React from 'react';
import { useState } from 'react';
import DropdownField, { DropdownFieldOption } from '../../ui/DropdownField';
import Button from '../../ui/Button/Button';
import styles from '../../styles/NewProject.module.scss';

interface FormTypeSelectionProps {
  onFormTypeSelect: (formType: string) => void;
}

const formTypeOptions: DropdownFieldOption[] = [
  { label: 'Standard Project', value: 'standard' },
  { label: 'Express Project', value: 'express' },
  { label: 'Internal Project', value: 'internal' },
];

const FormTypeSelection: React.FC<FormTypeSelectionProps> = ({ onFormTypeSelect }) => {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleSelect = (e: { value: string | number | null }) => {
    setSelectedType(e.value as string);
  };

  const handleContinue = () => {
    if (selectedType) {
      onFormTypeSelect(selectedType);
    }
  };

  return (
    <div className={styles.formTypeSelectionContainer}>
      <h1>Create a New Project</h1>
      <p>Select the type of project you want to create. Each project type has a specific set of fields and requirements.</p>
      <DropdownField
        options={formTypeOptions}
        value={selectedType}
        onChange={handleSelect}
        placeholder="Select a project type..."
      />
      <div className={styles.continueButton}>
        <Button
            label="Continue"
            onClick={handleContinue}
            disabled={!selectedType}
            variant="primary"
        />
      </div>
    </div>
  );
};

export default FormTypeSelection;
