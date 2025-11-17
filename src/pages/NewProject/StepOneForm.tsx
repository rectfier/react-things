import React, { useState, ChangeEvent } from 'react';
import { Button } from 'primereact/button';
import { Calendar, CalendarChangeEvent } from 'primereact/calendar';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';

import FormField from '../../ui/FormField/FormField';

import '../../styles/form.scss';

interface StepOneFormData {
  name: string;
  owner: string;
  buStakeholder: string;
  team: string;
  delegates: string;
  category: string;
  notifications: string;
  description: string;
  plannedExecutionYear: string;
  startDate: Date | null;
  endDate: Date | null;
  product: string;
  clientRequestor: string;
  otherClientParticipant: string;
  buStakeholderAttr: string;
  therapeuticArea: string;
  researchType: string;
  methodology: string;
  markets: string;
  regions: string;
  respondentType: string;
  notes: string;
}

type TextChangeHandler = (
  field: keyof StepOneFormData
) => (e: ChangeEvent<HTMLInputElement>) => void;

type TextareaChangeHandler = (
  field: keyof StepOneFormData
) => (e: ChangeEvent<HTMLTextAreaElement>) => void;

type DateChangeHandler = (
  field: 'startDate' | 'endDate'
) => (e: CalendarChangeEvent) => void;

type DropdownChangeHandler = (
  field: keyof StepOneFormData
) => (e: DropdownChangeEvent) => void;

// Sample mock data for dropdowns
const ownerOptions = [
  { label: 'John Smith', value: 'john.smith' },
  { label: 'Sarah Johnson', value: 'sarah.johnson' },
  { label: 'Michael Brown', value: 'michael.brown' },
  { label: 'Emily Davis', value: 'emily.davis' },
  { label: 'David Wilson', value: 'david.wilson' }
];

const buStakeholderOptions = [
  { label: 'Global Oncology Marketing & Sales', value: 'global-oncology' },
  { label: 'Cardiovascular Business Unit', value: 'cardiovascular' },
  { label: 'Neurology Division', value: 'neurology' },
  { label: 'Immunology Unit', value: 'immunology' },
  { label: 'Rare Diseases', value: 'rare-diseases' }
];

const teamOptions = [
  { label: 'Research Team Alpha', value: 'team-alpha' },
  { label: 'Research Team Beta', value: 'team-beta' },
  { label: 'Clinical Operations', value: 'clinical-ops' },
  { label: 'Market Research', value: 'market-research' },
  { label: 'Data Analytics', value: 'data-analytics' }
];

const delegatesOptions = [
  { label: 'Alice Cooper', value: 'alice.cooper' },
  { label: 'Bob Martinez', value: 'bob.martinez' },
  { label: 'Carol White', value: 'carol.white' },
  { label: 'Daniel Lee', value: 'daniel.lee' },
  { label: 'Fiona Green', value: 'fiona.green' }
];

const categoryOptions = [
  { label: 'Market Research', value: 'market-research' },
  { label: 'Clinical Trial', value: 'clinical-trial' },
  { label: 'Product Launch', value: 'product-launch' },
  { label: 'Competitive Analysis', value: 'competitive-analysis' },
  { label: 'Regulatory Study', value: 'regulatory-study' }
];

const marketsOptions = [
  { label: 'Germany', value: 'germany' },
  { label: 'France', value: 'france' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Spain', value: 'spain' },
  { label: 'Italy', value: 'italy' },
  { label: 'United States', value: 'usa' },
  { label: 'Canada', value: 'canada' },
  { label: 'Japan', value: 'japan' }
];

const respondentTypeOptions = [
  { label: 'Healthcare Professionals', value: 'hcp' },
  { label: 'Patients', value: 'patients' },
  { label: 'Caregivers', value: 'caregivers' },
  { label: 'Payers', value: 'payers' },
  { label: 'Key Opinion Leaders', value: 'kol' }
];

const StepOneForm: React.FC = () => {
  const [formData, setFormData] = useState<StepOneFormData>({
    name: '',
    owner: '',
    buStakeholder: '',
    team: '',
    delegates: '',
    category: '',
    notifications: '',
    description: '',
    plannedExecutionYear: '',
    startDate: null,
    endDate: null,
    product: '',
    clientRequestor: '',
    otherClientParticipant: '',
    buStakeholderAttr: '',
    therapeuticArea: '',
    researchType: '',
    methodology: '',
    markets: '',
    regions: '',
    respondentType: '',
    notes: ''
  });

  const handleInputChange = (field: keyof StepOneFormData, value: string | Date | null): void => {
    setFormData((prev: StepOneFormData) => ({ ...prev, [field]: value }));
  };

  const handleTextChange: TextChangeHandler = (field) => (e) => {
    handleInputChange(field, e.target.value);
  };

  const handleTextareaChange: TextareaChangeHandler = (field) => (e) => {
    handleInputChange(field, e.target.value);
  };

  const handleDateChange: DateChangeHandler = (field) => (e) => {
    handleInputChange(field, e.value as Date | null);
  };

  const handleDropdownChange: DropdownChangeHandler = (field) => (e) => {
    handleInputChange(field, e.value as string);
  };

  const handleSaveDraft = (): void => {
    // TODO: Implement save draft functionality
    // eslint-disable-next-line no-console
    console.log('Saving draft...', formData);
  };

  const handleNextStep = (): void => {
    // TODO: Implement next step functionality
    // eslint-disable-next-line no-console
    console.log('Moving to next step...', formData);
  };

  return (
    <div className="form">
      {/* Information Section */}
      <div className="form-section">
        <h2>Information</h2>
        <div className="form-grid three-columns">
          <FormField 
            label="Name"
            tooltip="Enter the project name"
          >
            <InputText
              value={formData.name}
              onChange={handleTextChange('name')}
              className="full-width"
            />
          </FormField>
          <FormField 
            label="Owner" 
            tooltip="Select the project owner"
          >
            <Dropdown
              value={formData.owner}
              onChange={handleDropdownChange('owner')}
              options={ownerOptions}
              placeholder="Select owner"
              className="full-width"
            />
          </FormField>
          <FormField 
            label="BU/Stakeholder" 
            tooltip="Business unit or stakeholder"
          >
            <Dropdown
              value={formData.buStakeholder}
              onChange={handleDropdownChange('buStakeholder')}
              options={buStakeholderOptions}
              placeholder="Select BU/Stakeholder"
              className="full-width"
            />
          </FormField>
          <FormField 
            label="Team" 
            tooltip="Select the team"
          >
            <Dropdown
              value={formData.team}
              onChange={handleDropdownChange('team')}
              options={teamOptions}
              placeholder="Select team"
              className="full-width"
            />
          </FormField>
          <FormField 
            label="Delegates" 
            tooltip="Select delegates"
          >
            <Dropdown
              value={formData.delegates}
              onChange={handleDropdownChange('delegates')}
              options={delegatesOptions}
              placeholder="Select delegates"
              className="full-width"
            />
          </FormField>
          <FormField 
            label="Category" 
            tooltip="Select category"
          >
            <Dropdown
              value={formData.category}
              onChange={handleDropdownChange('category')}
              options={categoryOptions}
              placeholder="Select category"
              className="full-width"
            />
          </FormField>
          <FormField 
            label="Notifications" 
            tooltip="Enter notification preferences"
            className="col-span-full"
          >
            <InputText
              value={formData.notifications}
              onChange={handleTextChange('notifications')}
              className="full-width"
            />
          </FormField>
          <FormField 
            label="Description" 
            tooltip="Enter project description"
            className="col-span-full"
          >
            <InputTextarea
              value={formData.description}
              onChange={handleTextareaChange('description')}
              rows={4}
              className="full-width"
            />
          </FormField>
        </div>
      </div>

      {/* Calendar Details Section */}
      <div className="form-section">
        <h2>Calendar Details</h2>
        <div className="form-grid three-columns">
          <FormField 
            label="Planned Execution Year" 
            tooltip="Enter the planned execution year"
          >
            <InputText
              value={formData.plannedExecutionYear}
              onChange={handleTextChange('plannedExecutionYear')}
              className="full-width"
            />
          </FormField>
          <FormField 
            label="Start Date"
            tooltip="Select the project start date"
          >
            <span className="p-input-icon-left full-width">
              <i className="pi pi-calendar" />
              <Calendar
                value={formData.startDate}
                onChange={handleDateChange('startDate')}
                dateFormat="mm/dd/yyyy"
                className="full-width"
              />
            </span>
          </FormField>
          <FormField 
            label="End Date"
            tooltip="Select the project end date"
          >
            <span className="p-input-icon-left full-width">
              <i className="pi pi-calendar" />
              <Calendar
                value={formData.endDate}
                onChange={handleDateChange('endDate')}
                dateFormat="mm/dd/yyyy"
                className="full-width"
              />
            </span>
          </FormField>
        </div>
      </div>

      {/* Attributes Section */}
      <div className="form-section">
        <h2>Attributes</h2>
        <div className="form-grid three-columns">
          <FormField 
            label="Product"
            tooltip="Enter the product name"
          >
            <InputText
              value={formData.product}
              onChange={handleTextChange('product')}
              className="full-width"
            />
          </FormField>
          <FormField 
            label="Client Requestor"
            tooltip="Enter the client requestor"
          >
            <InputText
              value={formData.clientRequestor}
              onChange={handleTextChange('clientRequestor')}
              className="full-width"
            />
          </FormField>
          <FormField 
            label="Other Client participant"
            tooltip="Enter other client participants"
          >
            <InputText
              value={formData.otherClientParticipant}
              onChange={handleTextChange('otherClientParticipant')}
              className="full-width"
            />
          </FormField>
          <FormField 
            label="B/U Stakeholder" 
            tooltip="Business unit stakeholder"
          >
            <InputText
              value={formData.buStakeholderAttr}
              onChange={handleTextChange('buStakeholderAttr')}
              className="full-width"
            />
          </FormField>
          <FormField 
            label="Therapeutic Area"
            tooltip="Enter the therapeutic area"
          >
            <InputText
              value={formData.therapeuticArea}
              onChange={handleTextChange('therapeuticArea')}
              className="full-width"
            />
          </FormField>
          <FormField 
            label="Research Type"
            tooltip="Enter the research type"
          >
            <InputText
              value={formData.researchType}
              onChange={handleTextChange('researchType')}
              className="full-width"
            />
          </FormField>
          <FormField 
            label="Methodology"
            tooltip="Enter the methodology"
          >
            <InputText
              value={formData.methodology}
              onChange={handleTextChange('methodology')}
              className="full-width"
            />
          </FormField>
          <FormField 
            label="Markets where study is being fielded"
            tooltip="Select markets where study is being fielded"
          >
            <Dropdown
              value={formData.markets}
              onChange={handleDropdownChange('markets')}
              options={marketsOptions}
              placeholder="Select markets"
              className="full-width"
            />
          </FormField>
          <FormField 
            label="Regions (If Applicable)"
            tooltip="Enter applicable regions"
          >
            <InputText
              value={formData.regions}
              onChange={handleTextChange('regions')}
              className="full-width"
            />
          </FormField>
          <FormField 
            label="Respondent Type" 
            tooltip="Select respondent type"
          >
            <Dropdown
              value={formData.respondentType}
              onChange={handleDropdownChange('respondentType')}
              options={respondentTypeOptions}
              placeholder="Select respondent type"
              className="full-width"
            />
          </FormField>
        </div>
      </div>

      {/* Notes Section */}
      <div className="form-section">
        <h2>Notes</h2>
        <FormField 
          label="Notes"
          tooltip="Enter additional notes"
        >
          <InputTextarea
            value={formData.notes}
            onChange={handleTextareaChange('notes')}
            rows={4}
            className="full-width"
          />
        </FormField>
      </div>

      {/* Action Buttons */}
      <div className="form-actions">
        <Button
          label="Cancel"
          icon="pi pi-times"
          className="p-button-text"
        />
        <div className="action-group">
          <button type="button" className="attach-file-link">
            <i className="pi pi-paperclip"></i>
            <span>Attach file</span>
          </button>
          <Button
            label="Save Draft"
            icon="pi pi-save"
            className="p-button-primary"
            onClick={handleSaveDraft}
          />
          <Button
            label="Next Step"
            icon="pi pi-arrow-right"
            iconPos="right"
            className="p-button-secondary"
            onClick={handleNextStep}
          />
        </div>
      </div>
    </div>
  );
};

export default StepOneForm;
