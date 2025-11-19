import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import TabView from '../../ui/TabView/TabView';
import TabPanel from '../../ui/TabView/TabPanel';
import StepOneForm from './StepOneForm';
import StepTwoForm from './StepTwoForm';
import styles from '../../styles/NewProject.module.scss';

// Define Zod schema combining Step 1 and Step 2 fields - all fields are required
const projectSchema = z.object({
  // Step 1 - All required fields
  name: z.string().min(1, 'Name is required'),
  owner: z.string().min(1, 'Owner is required'),
  buStakeholder: z.string().min(1, 'BU/Stakeholder is required'),
  team: z.string().min(1, 'Team is required'),
  delegates: z.string().min(1, 'Delegates is required'),
  category: z.string().min(1, 'Category is required'),
  notifications: z.string().min(1, 'Notifications is required'),
  description: z.string().min(1, 'Description is required'),
  plannedExecutionYear: z.string().min(1, 'Planned Execution Year is required'),
  startDate: z.date().refine((val) => val instanceof Date && !isNaN(val.getTime()), { message: 'Start Date is required' }),
  endDate: z.date().refine((val) => val instanceof Date && !isNaN(val.getTime()), { message: 'End Date is required' }),
  product: z.string().min(1, 'Product is required'),
  clientRequestor: z.string().min(1, 'Client Requestor is required'),
  otherClientParticipant: z.string().min(1, 'Other Client Participant is required'),
  buStakeholderAttr: z.string().min(1, 'B/U Stakeholder is required'),
  therapeuticArea: z.string().min(1, 'Therapeutic Area is required'),
  researchType: z.string().min(1, 'Research Type is required'),
  methodology: z.string().min(1, 'Methodology is required'),
  markets: z.string().min(1, 'Markets is required'),
  regions: z.string().min(1, 'Regions is required'),
  respondentType: z.string().min(1, 'Respondent Type is required'),
  notes: z.string().min(1, 'Notes is required'),
  
  // Step 2 - All required fields
  estimatedSpendUSD: z.string().min(1, 'Estimated Spend in USD is required'),
  estimatedSpendLocal: z.string().min(1, 'Estimated Spend in Local Currency is required'),
  associatedPO: z.string().min(1, 'Associated PO is required'),
  businessQuestion: z.string().min(1, 'Business Question is required'),
  valueToClient: z.string().min(1, 'Value to Client is required'),
  procurementNotification: z.boolean().refine((val) => val !== undefined, { message: 'Procurement Notification is required' }),
  selectedVendor: z.string().min(1, 'Selected Vendor is required'),
  searchQuery: z.string().optional(), // This is just for UI filtering, not a form field
});

export type ProjectFormData = z.infer<typeof projectSchema>;

const NewProject: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const methods = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: '',
      owner: '',
      buStakeholder: '',
      team: '',
      delegates: '',
      category: '',
      notifications: '',
      description: '',
      plannedExecutionYear: '',
      startDate: undefined,
      endDate: undefined,
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
      notes: '',
      estimatedSpendUSD: '',
      estimatedSpendLocal: '',
      associatedPO: '',
      businessQuestion: '',
      valueToClient: '',
      procurementNotification: false,
      selectedVendor: '',
      searchQuery: '',
    },
    mode: 'onChange',
  });

  const handleTabChange = async (e: { index: number }) => {
    // If switching to Step 2, validate all Step 1 fields first
    if (e.index === 1) {
      const step1Fields: (keyof ProjectFormData)[] = [
        'name',
        'owner',
        'buStakeholder',
        'team',
        'delegates',
        'category',
        'notifications',
        'description',
        'plannedExecutionYear',
        'startDate',
        'endDate',
        'product',
        'clientRequestor',
        'otherClientParticipant',
        'buStakeholderAttr',
        'therapeuticArea',
        'researchType',
        'methodology',
        'markets',
        'regions',
        'respondentType',
        'notes',
      ];
      
      const isValid = await methods.trigger(step1Fields as any);
      if (!isValid) {
        return; // Don't switch tabs if validation fails
      }
    }
    
    setActiveIndex(e.index);
  };

  const onSubmit = (data: ProjectFormData): void => {
    console.log('Form submitted:', data);
  };

  return (
    <FormProvider {...methods}>
      <div className={styles.newProjectContainer}>
        <div className={styles.newProjectCard}>
          <h1>New Project</h1>
          <TabView 
            activeIndex={activeIndex} 
            onTabChange={handleTabChange}
          >
            <TabPanel 
              header="Step 1" 
              subheader="Fill in Project Specifications"
              isValidated={activeIndex > 0}
            >
              <StepOneForm onNext={() => setActiveIndex(1)} />
            </TabPanel>
            <TabPanel 
              header="Step 2" 
              subheader="Fill in Financial Details and Select Vendor"
            >
              <StepTwoForm onSubmit={methods.handleSubmit(onSubmit)} />
            </TabPanel>
          </TabView>
        </div>
      </div>
    </FormProvider>
  );
};

export default NewProject;

