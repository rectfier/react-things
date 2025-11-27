import * as React from 'react';
import { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import Button from '../../ui/Button/Button';
import InputField from '../../ui/InputField';
import CheckboxField from '../../ui/CheckboxField';
import MultiSelectField, { MultiSelectOption } from '../../ui/MultiSelectField';
import FormField from '../../ui/FormField/FormField';
import VendorOverviewCard from './VendorOverviewCard';
import formStyles from '../../styles/Form.module.scss';
import { ProjectFormData, projectSchema } from './NewProject';

interface StepTwoFormProps {}

const mockVendors: string[] = [
  'Vendor A', 'Vendor B', 'Vendor C', 'Vendor D', 'Vendor E',
  'Vendor F', 'Vendor G', 'Vendor H', 'Vendor I', 'Vendor J',
  'Vendor K', 'Vendor L', 'Vendor M', 'Vendor N', 'Vendor O',
  'Vendor P', 'Vendor Q', 'Vendor R'
];

const valueToClientOptions: MultiSelectOption[] = [
  { label: 'Cost Savings', value: 'cost-savings' },
  { label: 'Process Efficiency', value: 'process-efficiency' },
  { label: 'Risk Mitigation', value: 'risk-mitigation' },
  { label: 'Innovation', value: 'innovation' },
  { label: 'Strategic Alignment', value: 'strategic-alignment' }
];

const StepTwoForm: React.FC<StepTwoFormProps> = () => {
  const { register, control, watch, setValue, formState: { errors } } = useFormContext<ProjectFormData>();
  const selectedVendor = watch('selectedVendor');

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredVendors, setFilteredVendors] = useState<string[]>(mockVendors);
  const [hoveredVendor, setHoveredVendor] = useState<string | null>(null);

  React.useEffect(() => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const filtered = mockVendors.filter((vendor: string) => {
        const vendorLower = String(vendor).toLowerCase();
        return vendorLower.indexOf(query) !== -1;
      });
      setFilteredVendors(filtered);
    } else {
      setFilteredVendors(mockVendors);
    }
  }, [searchQuery]);

  const handleVendorSelect = (vendor: string) => {
    setValue('selectedVendor', vendor);
    setSearchQuery('');
    setFilteredVendors(mockVendors);
  };

  // Show vendor profile for hovered vendor, or selected vendor if no hover
  const displayVendorData = hoveredVendor || selectedVendor;
  const vendorProfileData = displayVendorData ? {
    name: displayVendorData,
    globalScore: 8.1,
    summary: 'Specializes in multi-market quantitative oncology research, with deep expertise in the EU5 region. Certified for high-volume data collection.'
  } : null;

  return (
    <div className={formStyles.form}>
        {/* Financial Details Section */}
        <div className={formStyles.formSection}>
          <h2>Financial Details</h2>
          <div className={formStyles.formGrid}>
            <FormField 
              label="Estimated Spend in USD"
              tooltip="Enter the estimated spend in USD"
              error={errors.estimatedSpendUSD?.message}
              required={!projectSchema.shape.estimatedSpendUSD.isOptional()}
            >
              <InputField
                {...register('estimatedSpendUSD')}
                placeholder="Enter estimated spend in USD"
                className={formStyles.fullWidth}
              />
            </FormField>
            <FormField 
              label="Estimated Spend in Local Currency"
              tooltip="Enter the estimated spend in local currency"
              error={errors.estimatedSpendLocal?.amount?.message || errors.estimatedSpendLocal?.message}
              required={true}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ 
                  padding: '0.375rem 0.75rem', 
                  backgroundColor: '#f3f4f6', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '0.375rem',
                  color: '#374151',
                  fontSize: '0.875rem'
                }}>
                  {watch('estimatedSpendLocal.currency')}
                </span>
                <InputField
                  type="number"
                  {...register('estimatedSpendLocal.amount', { valueAsNumber: true })}
                  placeholder="Enter amount"
                  className={formStyles.fullWidth}
                />
              </div>
            </FormField>
            <FormField 
              label="Associated PO #"
              tooltip="Enter the associated purchase order number"
              error={errors.associatedPO?.message}
              required={!projectSchema.shape.associatedPO.isOptional()}
            >
              <InputField
                {...register('associatedPO')}
                placeholder="Enter associated PO number"
                className={formStyles.fullWidth}
              />
            </FormField>
            <FormField 
              label="Business Question"
              tooltip="Enter the business question"
              error={errors.businessQuestion?.message}
              required={!projectSchema.shape.businessQuestion.isOptional()}
            >
              <InputField
                {...register('businessQuestion')}
                placeholder="Enter business question"
                className={formStyles.fullWidth}
              />
            </FormField>
            <FormField 
              label="Value to Client"
              tooltip="Enter the value to client"
              error={errors.valueToClient?.message}
              required={!projectSchema.shape.valueToClient.isOptional()}
            >
              <Controller
                name="valueToClient"
                control={control}
                render={({ field, fieldState }) => (
                  <MultiSelectField
                    value={field.value}
                    onChange={(e) => field.onChange(e.value)}
                    options={valueToClientOptions}
                    placeholder="Select value to client"
                    className={formStyles.fullWidth}
                    invalid={fieldState.invalid}
                  />
                )}
              />
            </FormField>
            <div className={formStyles.formField}>
              <div 
                className={formStyles.checkboxFieldRow}
                aria-invalid={!!errors.procurementNotification}
                aria-label={errors.procurementNotification?.message}
              >
                <label htmlFor="procurement-notification" className={formStyles.checkboxFieldLabel}>Procurement Notification</label>
                <Controller
                  name="procurementNotification"
                  control={control}
                  render={({ field }) => (
                <CheckboxField
                  id="procurement-notification"
                      checked={field.value || false}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Vendor Selection Section */}
        <div className={formStyles.vendorWrapper}>
          <div className={`${formStyles.formSection} ${formStyles.vendorLeftSection}`}>
            <h2>Vendor Selection</h2>
            <FormField
              label="Vendor Selection"
              tooltip="Select a vendor from the list"
              error={errors.selectedVendor?.message}
              required={!projectSchema.shape.selectedVendor.isOptional()}
            >
              <div className={formStyles.vendorSearchSection}
                aria-invalid={!!errors.selectedVendor}
                aria-label={errors.selectedVendor?.message}
              >
                <div className={formStyles.searchControls}>
                  <span className={formStyles.vendorSelectionTitle}>Search Vendor</span>
                  <div className={formStyles.searchInputContainer}>
                    <span className={formStyles.searchIcon}>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
                          stroke="currentColor"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14 14L11.1 11.1"
                          stroke="currentColor"
                          strokeWidth="1.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={`${mockVendors.length} Approved Vendors`}
                      className={formStyles.searchInput}
                    />
                  </div>
                  <Button
                    label="Search"
                    variant="primary"
                    onClick={() => console.log('Search')}
                  />
                  <Button
                    label="Apply Filter"
                    icon="pi pi-chevron-down"
                    iconPos="right"
                    variant="outline"
                    onClick={() => {
                      console.log('Apply Filter clicked');
                    }}
                  />
                </div>
                
                {filteredVendors.length > 0 && (
                <div className={formStyles.vendorList}>
                  {filteredVendors.map((vendor) => (
                    <div
                      key={vendor}
                        className={`${formStyles.vendorItem} ${selectedVendor === vendor ? formStyles.vendorItemSelected : ''}`}
                      onClick={() => handleVendorSelect(vendor)}
                        onMouseEnter={() => setHoveredVendor(vendor)}
                        onMouseLeave={() => setHoveredVendor(null)}
                    >
                      <span className={formStyles.vendorName}>{vendor}</span>
                        {selectedVendor === vendor && (
                        <span className={formStyles.checkIcon}>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.3333 4L6 11.3333L2.66667 8"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                )}
              </div>
            </FormField>
          </div>

          {vendorProfileData && (
            <div className={formStyles.vendorRightSection}>
              <VendorOverviewCard
                vendorName={vendorProfileData.name}
                globalScore={vendorProfileData.globalScore}
                summary={vendorProfileData.summary}
                onViewProfile={() => console.log('View profile')}
              />
            </div>
          )}
        </div>

      </div>
  );
};

export default StepTwoForm;
