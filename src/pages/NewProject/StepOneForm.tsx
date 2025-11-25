import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import CalendarField from '../../ui/CalendarField';
import DropdownField, { DropdownFieldOption } from '../../ui/DropdownField';
import MultiSelectField, { MultiSelectOption } from '../../ui/MultiSelectField';
import InputField from '../../ui/InputField';
import TextareaField from '../../ui/TextareaField';

import FormField from '../../ui/FormField/FormField';

import styles from '../../styles/Form.module.scss';
import { ProjectFormData } from './NewProject';

interface StepOneFormProps {}

// Sample mock data for dropdowns
const ownerOptions: DropdownFieldOption[] = [
  { label: 'John Smith', value: 'john.smith' },
  { label: 'Sarah Johnson', value: 'sarah.johnson' },
  { label: 'Michael Brown', value: 'michael.brown' },
  { label: 'Emily Davis', value: 'emily.davis' },
  { label: 'David Wilson', value: 'david.wilson' }
];

const buStakeholderOptions: DropdownFieldOption[] = [
  { label: 'Global Oncology Marketing & Sales', value: 'global-oncology' },
  { label: 'Cardiovascular Business Unit', value: 'cardiovascular' },
  { label: 'Neurology Division', value: 'neurology' },
  { label: 'Immunology Unit', value: 'immunology' },
  { label: 'Rare Diseases', value: 'rare-diseases' }
];

const teamOptions: DropdownFieldOption[] = [
  { label: 'Research Team Alpha', value: 'team-alpha' },
  { label: 'Research Team Beta', value: 'team-beta' },
  { label: 'Clinical Operations', value: 'clinical-ops' },
  { label: 'Market Research', value: 'market-research' },
  { label: 'Data Analytics', value: 'data-analytics' }
];

const delegatesOptions: DropdownFieldOption[] = [
  { label: 'Alice Cooper', value: 'alice.cooper' },
  { label: 'Bob Martinez', value: 'bob.martinez' },
  { label: 'Carol White', value: 'carol.white' },
  { label: 'Daniel Lee', value: 'daniel.lee' },
  { label: 'Fiona Green', value: 'fiona.green' }
];

const categoryOptions: DropdownFieldOption[] = [
  { label: 'Market Research', value: 'market-research' },
  { label: 'Clinical Trial', value: 'clinical-trial' },
  { label: 'Product Launch', value: 'product-launch' },
  { label: 'Competitive Analysis', value: 'competitive-analysis' },
  { label: 'Regulatory Study', value: 'regulatory-study' }
];

const marketsOptions: DropdownFieldOption[] = [
  { label: 'Germany', value: 'germany' },
  { label: 'France', value: 'france' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Spain', value: 'spain' },
  { label: 'Italy', value: 'italy' },
  { label: 'United States', value: 'usa' },
  { label: 'Canada', value: 'canada' },
  { label: 'Japan', value: 'japan' }
];

const respondentTypeOptions: DropdownFieldOption[] = [
  { label: 'Healthcare Professionals', value: 'hcp' },
  { label: 'Patients', value: 'patients' },
  { label: 'Caregivers', value: 'caregivers' },
  { label: 'Payers', value: 'payers' },
  { label: 'Key Opinion Leaders', value: 'kol' }
];

const regionOptions: MultiSelectOption[] = [
  { label: 'North America', value: 'na' },
  { label: 'Europe', value: 'eu' },
  { label: 'Asia Pacific', value: 'apac' },
  { label: 'Latin America', value: 'latam' },
  { label: 'Middle East & Africa', value: 'mea' }
];

const StepOneForm: React.FC<StepOneFormProps> = () => {
  const { register, control, formState: { errors } } = useFormContext<ProjectFormData>();

  return (
    <div className={styles.form}>
      {/* Information Section */}
      <div className={styles.formSection}>
        <h2>Information</h2>
        <div className={`${styles.formGrid} ${styles.threeColumns}`}>
          <FormField 
            label="Name"
            tooltip="Enter the project name"
            error={errors.name?.message}
            required
          >
            <InputField
              {...register('name')}
              className={styles.fullWidth}
            />
          </FormField>
          <FormField 
            label="Owner" 
            tooltip="Select the project owner"
            error={errors.owner?.message}
            required
          >
            <Controller
              name="owner"
              control={control}
              render={({ field, fieldState }) => (
            <DropdownField
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
              options={ownerOptions}
              placeholder="Select owner"
              className={styles.fullWidth}
              invalid={fieldState.invalid}
                />
              )}
            />
          </FormField>
          <FormField 
            label="BU/Stakeholder" 
            tooltip="Business unit or stakeholder"
            error={errors.buStakeholder?.message}
            required
          >
            <Controller
              name="buStakeholder"
              control={control}
              render={({ field, fieldState }) => (
            <DropdownField
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
              options={buStakeholderOptions}
              placeholder="Select BU/Stakeholder"
              className={styles.fullWidth}
              invalid={fieldState.invalid}
                />
              )}
            />
          </FormField>
          <FormField 
            label="Team" 
            tooltip="Select the team"
            error={errors.team?.message}
            required
          >
            <Controller
              name="team"
              control={control}
              render={({ field, fieldState }) => (
            <DropdownField
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
              options={teamOptions}
              placeholder="Select team"
              className={styles.fullWidth}
              invalid={fieldState.invalid}
                />
              )}
            />
          </FormField>
          <FormField 
            label="Delegates" 
            tooltip="Select delegates"
            error={errors.delegates?.message}
            required
          >
            <Controller
              name="delegates"
              control={control}
              render={({ field, fieldState }) => (
            <DropdownField
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
              options={delegatesOptions}
              placeholder="Select delegates"
              className={styles.fullWidth}
              invalid={fieldState.invalid}
                />
              )}
            />
          </FormField>
          <FormField 
            label="Category" 
            tooltip="Select category"
            error={errors.category?.message}
            required
          >
            <Controller
              name="category"
              control={control}
              render={({ field, fieldState }) => (
            <DropdownField
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
              options={categoryOptions}
              placeholder="Select category"
              className={styles.fullWidth}
              invalid={fieldState.invalid}
                />
              )}
            />
          </FormField>
          <FormField 
            label="Notifications" 
            tooltip="Enter notification preferences"
            className={styles.colSpanFull}
            error={errors.notifications?.message}
            required
          >
            <InputField
              {...register('notifications')}
              className={styles.fullWidth}
            />
          </FormField>
          <FormField 
            label="Description" 
            tooltip="Enter project description"
            className={styles.colSpanFull}
            error={errors.description?.message}
            required
          >
            <TextareaField
              {...register('description')}
              rows={4}
              className={styles.fullWidth}
            />
          </FormField>
        </div>
      </div>

      {/* Calendar Details Section */}
      <div className={styles.formSection}>
        <h2>Calendar Details</h2>
        <div className={`${styles.formGrid} ${styles.threeColumns}`}>
          <FormField 
            label="Planned Execution Year" 
            tooltip="Enter the planned execution year"
            error={errors.plannedExecutionYear?.message}
            required
          >
            <InputField
              {...register('plannedExecutionYear')}
              className={styles.fullWidth}
            />
          </FormField>
          <FormField 
            label="Start Date"
            tooltip="Select the project start date"
            error={errors.startDate?.message}
            required
          >
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
            <CalendarField
                  value={field.value || undefined}
                  onChange={(e) => field.onChange(e.value || undefined)}
              dateFormat="mm/dd/yyyy"
              className={styles.fullWidth}
                />
              )}
            />
          </FormField>
          <FormField 
            label="End Date"
            tooltip="Select the project end date"
            error={errors.endDate?.message}
            required
          >
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
            <CalendarField
                  value={field.value || undefined}
                  onChange={(e) => field.onChange(e.value || undefined)}
              dateFormat="mm/dd/yyyy"
              className={styles.fullWidth}
                />
              )}
            />
          </FormField>
        </div>
      </div>

      {/* Attributes Section */}
      <div className={styles.formSection}>
        <h2>Attributes</h2>
        <div className={`${styles.formGrid} ${styles.threeColumns}`}>
          <FormField 
            label="Product"
            tooltip="Enter the product name"
            error={errors.product?.message}
            required
          >
            <InputField
              {...register('product')}
              className={styles.fullWidth}
            />
          </FormField>
          <FormField 
            label="Client Requestor"
            tooltip="Enter the client requestor"
            error={errors.clientRequestor?.message}
            required
          >
            <InputField
              {...register('clientRequestor')}
              className={styles.fullWidth}
            />
          </FormField>
          <FormField 
            label="Other Client participant"
            tooltip="Enter other client participants"
            error={errors.otherClientParticipant?.message}
            required
          >
            <InputField
              {...register('otherClientParticipant')}
              className={styles.fullWidth}
            />
          </FormField>
          <FormField 
            label="B/U Stakeholder" 
            tooltip="Business unit stakeholder"
            error={errors.buStakeholderAttr?.message}
            required
          >
            <InputField
              {...register('buStakeholderAttr')}
              className={styles.fullWidth}
            />
          </FormField>
          <FormField 
            label="Therapeutic Area"
            tooltip="Enter the therapeutic area"
            error={errors.therapeuticArea?.message}
            required
          >
            <InputField
              {...register('therapeuticArea')}
              className={styles.fullWidth}
            />
          </FormField>
          <FormField 
            label="Research Type"
            tooltip="Enter the research type"
            error={errors.researchType?.message}
            required
          >
            <InputField
              {...register('researchType')}
              className={styles.fullWidth}
            />
          </FormField>
          <FormField 
            label="Methodology"
            tooltip="Enter the methodology"
            error={errors.methodology?.message}
            required
          >
            <InputField
              {...register('methodology')}
              className={styles.fullWidth}
            />
          </FormField>
          <FormField 
            label="Markets where study is being fielded"
            tooltip="Select markets where study is being fielded"
            error={errors.markets?.message}
            required
          >
            <Controller
              name="markets"
              control={control}
              render={({ field, fieldState }) => (
            <DropdownField
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
              options={marketsOptions}
              placeholder="Select markets"
              className={styles.fullWidth}
              invalid={fieldState.invalid}
                />
              )}
            />
          </FormField>
          <FormField 
            label="Regions (If Applicable)"
            tooltip="Enter applicable regions"
            error={errors.regions?.message}
            required
          >
            <Controller
              name="regions"
              control={control}
              render={({ field, fieldState }) => (
                <MultiSelectField
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
                  options={regionOptions}
                  placeholder="Select regions"
                  className={styles.fullWidth}
                  invalid={fieldState.invalid}
                />
              )}
            />
          </FormField>
          <FormField 
            label="Respondent Type" 
            tooltip="Select respondent type"
            error={errors.respondentType?.message}
            required
          >
            <Controller
              name="respondentType"
              control={control}
              render={({ field, fieldState }) => (
            <DropdownField
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
              options={respondentTypeOptions}
              placeholder="Select respondent type"
              className={styles.fullWidth}
              invalid={fieldState.invalid}
                />
              )}
            />
          </FormField>
        </div>
      </div>

      {/* Notes Section */}
      <div className={styles.formSection}>
        <h2>Notes</h2>
        <FormField 
          label="Notes"
          tooltip="Enter additional notes"
          error={errors.notes?.message}
          required
        >
          <TextareaField
            {...register('notes')}
            rows={4}
            className={styles.fullWidth}
          />
        </FormField>
      </div>

    </div>
  );
};

export default StepOneForm;
