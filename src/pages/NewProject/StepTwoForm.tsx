import React, { useState, ChangeEvent } from 'react';
import { Button } from 'primereact/button';
import InputField from '../../ui/InputField';
import CheckboxField from '../../ui/CheckboxField';
import FormField from '../../ui/FormField/FormField';
import VendorOverviewCard from './VendorOverviewCard';
import formStyles from '../../styles/Form.module.scss';

interface StepTwoFormData {
  estimatedSpendUSD: string;
  estimatedSpendLocal: string;
  associatedPO: string;
  businessQuestion: string;
  valueToClient: string;
  procurementNotification: boolean;
  selectedVendor: string | null;
  searchQuery: string;
}

const mockVendors = [
  'Vendor A', 'Vendor B', 'Vendor C', 'Vendor D', 'Vendor E',
  'Vendor F', 'Vendor G', 'Vendor H', 'Vendor I', 'Vendor J',
  'Vendor K', 'Vendor L', 'Vendor M', 'Vendor N', 'Vendor O',
  'Vendor P', 'Vendor Q', 'Vendor R'
];

const StepTwoForm: React.FC = () => {
  const [formData, setFormData] = useState<StepTwoFormData>({
    estimatedSpendUSD: '$125,000.00',
    estimatedSpendLocal: '€118,500.00',
    associatedPO: 'PO-457392-VERT',
    businessQuestion: 'Germany',
    valueToClient: 'France, Spain, Italy, United Kingdom',
    procurementNotification: true,
    selectedVendor: 'Vendor A',
    searchQuery: ''
  });

  const [filteredVendors, setFilteredVendors] = useState<string[]>(mockVendors);

  const handleInputChange = (field: keyof StepTwoFormData, value: string | boolean): void => {
    setFormData((prev: StepTwoFormData) => ({ ...prev, [field]: value }));
  };

  const handleTextChange = (field: keyof StepTwoFormData) => (e: ChangeEvent<HTMLInputElement>) => {
    handleInputChange(field, e.target.value);
    
    if (field === 'searchQuery') {
      const query = e.target.value.toLowerCase();
      const filtered = mockVendors.filter(vendor => 
        vendor.toLowerCase().includes(query)
      );
      setFilteredVendors(filtered);
    }
  };

  const handleCheckboxChange = (field: keyof StepTwoFormData) => (e: ChangeEvent<HTMLInputElement>) => {
    handleInputChange(field, e.target.checked);
  };

  const handleVendorSelect = (vendor: string) => {
    setFormData((prev: StepTwoFormData) => ({ ...prev, selectedVendor: vendor }));
  };

  const handleBack = (): void => {
    // TODO: Implement back functionality
    console.log('Going back to step 1...');
  };

  const handleSaveDraft = (): void => {
    // TODO: Implement save draft functionality
    console.log('Saving draft...', formData);
  };

  const handleSubmit = (): void => {
    // TODO: Implement submit functionality
    console.log('Submitting...', formData);
  };

  const selectedVendorData = formData.selectedVendor ? {
    name: formData.selectedVendor,
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
            >
              <InputField
                value={formData.estimatedSpendUSD}
                onChange={handleTextChange('estimatedSpendUSD')}
                className={formStyles.fullWidth}
              />
            </FormField>
            <FormField 
              label="Estimated Spend in Local Currency"
              tooltip="Enter the estimated spend in local currency"
            >
              <InputField
                value={formData.estimatedSpendLocal}
                onChange={handleTextChange('estimatedSpendLocal')}
                className={formStyles.fullWidth}
              />
            </FormField>
            <FormField 
              label="Associated PO #"
              tooltip="Enter the associated purchase order number"
            >
              <InputField
                value={formData.associatedPO}
                onChange={handleTextChange('associatedPO')}
                className={formStyles.fullWidth}
              />
            </FormField>
            <FormField 
              label="Business Question"
              tooltip="Enter the business question"
            >
              <InputField
                value={formData.businessQuestion}
                onChange={handleTextChange('businessQuestion')}
                className={formStyles.fullWidth}
              />
            </FormField>
            <FormField 
              label="Value to Client"
              tooltip="Enter the value to client"
            >
              <InputField
                value={formData.valueToClient}
                onChange={handleTextChange('valueToClient')}
                className={formStyles.fullWidth}
              />
            </FormField>
            <div className={formStyles.formField}>
              <div className={formStyles.checkboxFieldRow}>
                <label htmlFor="procurement-notification" className={formStyles.checkboxFieldLabel}>Procurement Notification</label>
                <CheckboxField
                  id="procurement-notification"
                  checked={formData.procurementNotification}
                  onChange={handleCheckboxChange('procurementNotification')}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Vendor Selection Section */}
        <div className={formStyles.formSection}>
          <h2>Vendor Selection</h2>
          <div className={formStyles.vendorSelectionLayout}>
            <div className={formStyles.vendorSearchSection}>
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
                    value={formData.searchQuery}
                    onChange={handleTextChange('searchQuery')}
                    placeholder={`${filteredVendors.length} Approved Vendors`}
                    className={formStyles.searchInput}
                  />
                </div>
                <Button
                  label="Search"
                  className={`${formStyles.searchButton} p-button-primary`}
                  onClick={() => console.log('Search')}
                />
                <Button
                  label="Apply Filter"
                  icon="pi pi-chevron-down"
                  iconPos="right"
                  className={`${formStyles.searchButton} ${formStyles.filterButton}`}
                  onClick={() => {
                    console.log('Apply Filter clicked');
                  }}
                />
              </div>
              
              <div className={formStyles.vendorList}>
                {filteredVendors.map((vendor) => (
                  <div
                    key={vendor}
                    className={`${formStyles.vendorItem} ${formData.selectedVendor === vendor ? formStyles.vendorItemSelected : ''}`}
                    onClick={() => handleVendorSelect(vendor)}
                  >
                    <span className={formStyles.vendorName}>{vendor}</span>
                    {formData.selectedVendor === vendor && (
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
            </div>

            {/* Vendor Overview Card */}
            {selectedVendorData && (
              <div className={formStyles.vendorCardWrapper}>
                <VendorOverviewCard
                  vendorName={selectedVendorData.name}
                  globalScore={selectedVendorData.globalScore}
                  summary={selectedVendorData.summary}
                  onViewProfile={() => console.log('View profile')}
                />
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className={formStyles.formActions}>
          <Button
            label="Cancel"
            icon="pi pi-times"
            className="p-button-text"
          />
          <div className={formStyles.actionGroup}>
            <Button
              label="Back"
              icon="pi pi-arrow-left"
              className="p-button-secondary"
              onClick={handleBack}
            />
            <button type="button" className={formStyles.attachFileLink}>
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
              label="Submit"
              icon="pi pi-check"
              iconPos="right"
              className="p-button-primary"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
  );
};

export default StepTwoForm;
