import * as React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { NormalPeoplePicker, IPersonaProps } from '@fluentui/react';
import CalendarField from '../../ui/CalendarField';
import DropdownField, { DropdownFieldOption } from '../../ui/DropdownField';
import MultiSelectField, { MultiSelectOption } from '../../ui/MultiSelectField';
import InputField from '../../ui/InputField';
import TextareaField from '../../ui/TextareaField';

import FormField from '../../ui/FormField/FormField';

import styles from '../../styles/Form.module.scss';
import peoplePickerStyles from '../../styles/NewProject.module.scss';
import { ProjectFormData, projectSchema } from './NewProject';

interface StepOneFormProps {}

// Sample mock data for dropdowns
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

// Mock people data for suggestions
const mockPeople: IPersonaProps[] = [
  { key: 'john.doe', text: 'John Doe', secondaryText: 'john.doe@company.com' },
  { key: 'jane.smith', text: 'Jane Smith', secondaryText: 'jane.smith@company.com' },
  { key: 'alice.cooper', text: 'Alice Cooper', secondaryText: 'alice.cooper@company.com' },
  { key: 'bob.martinez', text: 'Bob Martinez', secondaryText: 'bob.martinez@company.com' },
  { key: 'carol.white', text: 'Carol White', secondaryText: 'carol.white@company.com' },
  { key: 'daniel.lee', text: 'Daniel Lee', secondaryText: 'daniel.lee@company.com' },
  { key: 'fiona.green', text: 'Fiona Green', secondaryText: 'fiona.green@company.com' },
];

const getPeopleSuggestions = (
  filterText: string,
  selectedItems?: IPersonaProps[]
): IPersonaProps[] => {
  if (!filterText) {
    return [];
  }

  const filteredPeople = mockPeople.filter(
    (person) =>
      person.text?.toLowerCase().indexOf(filterText.toLowerCase()) !== -1 ||
      person.secondaryText?.toLowerCase().indexOf(filterText.toLowerCase()) !== -1
  );

  // Filter out already selected people
  return filteredPeople.filter(
    (person) => !selectedItems?.some((selected) => selected.key === person.key)
  );
};

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
            required={!projectSchema.shape.name.isOptional()}
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
            required={!projectSchema.shape.owner.isOptional()}
          >
            <Controller
              name="owner"
              control={control}
              render={({ field, fieldState }) => {
                const handlePeoplePickerChange = (items?: IPersonaProps[]): void => {
                  field.onChange(items || []);
                };

                return (
                  <div className={peoplePickerStyles.peoplePickerWrapper}>
                    <NormalPeoplePicker
                      selectedItems={field.value}
                      onResolveSuggestions={getPeopleSuggestions}
                      onChange={handlePeoplePickerChange}
                      errorMessage={fieldState.error?.message}
                      itemLimit={1}
                      inputProps={{
                        placeholder: 'Select owner',
                      }}
                    />
                  </div>
                );
              }}
            />
          </FormField>
          <FormField 
            label="BU/Stakeholder" 
            tooltip="Business unit or stakeholder"
            error={errors.buStakeholder?.message}
            required={!projectSchema.shape.buStakeholder.isOptional()}
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
            required={!projectSchema.shape.team.isOptional()}
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
            required={!projectSchema.shape.delegates.isOptional()}
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
            required={!projectSchema.shape.category.isOptional()}
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
            required={!projectSchema.shape.notifications.isOptional()}
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
            required={!projectSchema.shape.description.isOptional()}
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
            required={!projectSchema.shape.plannedExecutionYear.isOptional()}
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
            required={!projectSchema.shape.startDate.isOptional()}
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
            required={!projectSchema.shape.endDate.isOptional()}
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
            required={!projectSchema.shape.product.isOptional()}
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
            required={!projectSchema.shape.clientRequestor.isOptional()}
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
            required={!projectSchema.shape.otherClientParticipant.isOptional()}
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
            required={!projectSchema.shape.buStakeholderAttr.isOptional()}
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
            required={!projectSchema.shape.therapeuticArea.isOptional()}
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
            required={!projectSchema.shape.researchType.isOptional()}
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
            required={!projectSchema.shape.methodology.isOptional()}
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
            required={!projectSchema.shape.markets.isOptional()}
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
            required={!projectSchema.shape.regions.isOptional()}
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
            required={!projectSchema.shape.respondentType.isOptional()}
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
          required={!projectSchema.shape.notes.isOptional()}
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
