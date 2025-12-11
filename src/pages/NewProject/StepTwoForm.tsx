import * as React from 'react';
import { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import Button from '../../ui/Button/Button';
import InputField from '../../ui/InputField';
import CheckboxField from '../../ui/CheckboxField';
import DropdownField, { DropdownFieldOption } from '../../ui/DropdownField';
import FormField from '../../ui/FormField/FormField';
import VendorOverviewCard from './VendorOverviewCard';
import formStyles from '../../styles/Form.module.scss';
import { ProjectFormData, projectSchema } from './NewProject';

interface StepTwoFormProps {}

interface VendorData {
  name: string;
  globalScore: number;
  specialization: string;
}

const mockVendors: VendorData[] = [
  { name: 'Vendor A', globalScore: 8.5, specialization: 'Oncology Research' },
  { name: 'Vendor B', globalScore: 7.8, specialization: 'Cardiology Studies' },
  { name: 'Vendor C', globalScore: 9.2, specialization: 'Neurology Trials' },
  { name: 'Vendor D', globalScore: 8.1, specialization: 'Immunology Research' },
  { name: 'Vendor E', globalScore: 7.5, specialization: 'Dermatology Studies' },
  { name: 'Vendor F', globalScore: 8.9, specialization: 'Respiratory Research' },
  { name: 'Vendor G', globalScore: 7.2, specialization: 'Gastroenterology' },
  { name: 'Vendor H', globalScore: 8.7, specialization: 'Endocrinology Studies' },
  { name: 'Vendor I', globalScore: 9.0, specialization: 'Hematology Research' },
  { name: 'Vendor J', globalScore: 7.9, specialization: 'Rheumatology Trials' },
  { name: 'Vendor K', globalScore: 8.3, specialization: 'Infectious Disease' },
  { name: 'Vendor L', globalScore: 7.6, specialization: 'Nephrology Studies' },
  { name: 'Vendor M', globalScore: 8.8, specialization: 'Ophthalmology Research' },
  { name: 'Vendor N', globalScore: 7.4, specialization: 'Urology Trials' },
  { name: 'Vendor O', globalScore: 9.1, specialization: 'Psychiatry Research' },
  { name: 'Vendor P', globalScore: 8.0, specialization: 'Orthopedics Studies' },
  { name: 'Vendor Q', globalScore: 7.7, specialization: 'Pediatrics Research' },
  { name: 'Vendor R', globalScore: 8.6, specialization: 'Geriatrics Trials' }
];

const valueToClientOptions: DropdownFieldOption[] = [
  { label: 'Cost Savings', value: 'cost-savings' },
  { label: 'Process Efficiency', value: 'process-efficiency' },
  { label: 'Risk Mitigation', value: 'risk-mitigation' },
  { label: 'Innovation', value: 'innovation' },
  { label: 'Strategic Alignment', value: 'strategic-alignment' }
];

const currencyOptions: DropdownFieldOption[] = [
  { label: 'EUR', value: 'EUR' },
  { label: 'USD', value: 'USD' },
  { label: 'GBP', value: 'GBP' },
  { label: 'JPY', value: 'JPY' },
  { label: 'CAD', value: 'CAD' },
  { label: 'AUD', value: 'AUD' },
  { label: 'CHF', value: 'CHF' },
  { label: 'CNY', value: 'CNY' },
];

const StepTwoForm: React.FC<StepTwoFormProps> = () => {
  const { register, control, getValues, setValue, formState: { errors } } = useFormContext<ProjectFormData>();
  
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredVendors, setFilteredVendors] = useState<VendorData[]>(mockVendors);
  const [hoveredVendor, setHoveredVendor] = useState<string | null>(null);
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);

  // Sync selected vendors from form
  React.useEffect(() => {
    const formValue = getValues('selectedVendor');
    if (Array.isArray(formValue)) {
      setSelectedVendors(formValue as string[]);
    }
  });

  React.useEffect(() => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const filtered = mockVendors.filter((vendor: VendorData) => {
        const vendorNameLower = vendor.name.toLowerCase();
        const vendorSpecLower = vendor.specialization.toLowerCase();
        return vendorNameLower.indexOf(query) !== -1 || vendorSpecLower.indexOf(query) !== -1;
      });
      setFilteredVendors(filtered);
    } else {
      setFilteredVendors(mockVendors);
    }
  }, [searchQuery]);

  const handleVendorSelect = (vendor: string) => {
    const currentVendors = [...selectedVendors];
    const isSelected = currentVendors.includes(vendor);
    
    if (isSelected) {
      // Remove vendor if already selected
      const updatedVendors = currentVendors.filter((v: string) => v !== vendor);
      setValue('selectedVendor', updatedVendors, { shouldValidate: true });
    } else {
      // Add vendor if not selected
      const updatedVendors = [...currentVendors, vendor];
      setValue('selectedVendor', updatedVendors, { shouldValidate: true });
    }
    setSearchQuery('');
    setFilteredVendors(mockVendors);
  };

  // Show vendor profile for hovered vendor, or first selected vendor if no hover
  const displayVendorData = hoveredVendor || (selectedVendors.length > 0 ? selectedVendors[0] : null);
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
              error={errors.estimatedSpendLocal?.value?.message || errors.estimatedSpendLocal?.message}
              required={true}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Controller
                  name="estimatedSpendLocal.currency"
                  control={control}
                  render={({ field }) => (
                    <DropdownField
                      value={field.value}
                      onChange={(e) => field.onChange(e.value)}
                      options={currencyOptions}
                      className={formStyles.currencyDropdown}
                    />
                  )}
                />
                <InputField
                  type="number"
                  {...register('estimatedSpendLocal.value', { valueAsNumber: true })}
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
          </div>
          <div className={`${formStyles.formGrid} ${formStyles.financialGridLowerRow}`}>
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
                  <DropdownField
                    value={field.value}
                    onChange={(e) => field.onChange(e.value)}
                    options={valueToClientOptions}
                    placeholder="Select value to client"
                    className={formStyles.fullWidth}
                    invalid={fieldState.invalid}
                    multiselect
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
                <div className={formStyles.vendorTableWrapper}>
                  <table className={formStyles.vendorTable}>
                    <thead>
                      <tr>
                        <th>Vendor Name</th>
                        <th>Global Score</th>
                        <th>Specialization</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredVendors.map((vendor) => (
                        <tr
                          key={vendor.name}
                          className={`${formStyles.vendorRow} ${selectedVendors.includes(vendor.name) ? formStyles.vendorRowSelected : ''}`}
                          onClick={() => handleVendorSelect(vendor.name)}
                          onMouseEnter={() => setHoveredVendor(vendor.name)}
                          onMouseLeave={() => setHoveredVendor(null)}
                        >
                          <td className={formStyles.vendorNameCell}>
                            <span className={formStyles.vendorName}>{vendor.name}</span>
                          </td>
                          <td className={formStyles.vendorScoreCell}>{vendor.globalScore}</td>
                          <td className={formStyles.vendorSpecCell}>{vendor.specialization}</td>
                          <td className={formStyles.checkIconCell}>
                            {selectedVendors.includes(vendor.name) && (
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
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
