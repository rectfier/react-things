import * as React from 'react';
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { IPersonaProps } from '@fluentui/react';
import Button from '../../ui/Button/Button';
import TabView from '../../ui/TabView/TabView';
import TabPanel from '../../ui/TabView/TabPanel';
import StepOneForm from './StepOneForm';
import StepTwoForm from './StepTwoForm';
import FormTypeSelection from './FormTypeSelection'; // Import the new component
import { useDialog } from '../../contexts/DialogContext';
import { SubmitDialogBody, DraftDialogBody } from './Popups';
import styles from '../../styles/NewProject.module.scss';
import formStyles from '../../styles/Form.module.scss';
import dialogStyles from '../../ui/Dialog/Dialog.module.scss';

// Custom Zod type for IPersonaProps array
const personaArraySchema = z.custom<IPersonaProps[]>(
  (val) => Array.isArray(val) && val.length > 0,
  { message: 'Owner is required' }
);

// Define Zod schema combining Step 1 and Step 2 fields - all fields are required
export const projectSchema = z.object({
  // Step 1 - All required fields
  name: z.string().optional(),
  owner: personaArraySchema.optional(),
  buStakeholder: z.string().optional(),
  team: z.string().optional(),
  delegates: z.string().optional(),
  category: z.string().optional(),
  notifications: z.string().optional(),
  description: z.string().optional(),
  plannedExecutionYear: z.string().optional(),
  startDate: z.date().refine((val) => val instanceof Date && !isNaN(val.getTime()), { message: 'Start Date is required' }).optional()   ,
  endDate: z.date().refine((val) => val instanceof Date && !isNaN(val.getTime()), { message: 'End Date is required' }).optional(),
  product: z.string().optional(),
  clientRequestor: z.string().optional(),
  otherClientParticipant: z.string().optional(),
  buStakeholderAttr: z.string().optional(),
  therapeuticArea: z.string().optional(),
  researchType: z.string().optional(),
  methodology: z.string().optional(),
  markets: z.string().optional(),
  regions: z.string().optional(),
  respondentType: z.string().optional(),
  notes: z.string().optional(),

  // Step 2 - All required fields
  estimatedSpendUSD: z.number().min(0, 'Estimated Spend in USD is required'),
  estimatedSpendLocal: z.object({
    currency: z.string().min(1, 'Currency is required'),
    value: z.number().min(0, 'Value is required'),
  }).refine((val) => val.currency && val.value !== undefined, { message: 'Estimated Spend in Local Currency is required' }),
  associatedPO: z.string().min(1, 'Associated PO is required'),
  businessQuestion: z.string().min(1, 'Business Question is required'),
  valueToClient: z.string().min(1, 'Value to Client is required'),
  procurementNotification: z.boolean().refine((val) => val !== undefined, { message: 'Procurement Notification is required' }),
  selectedVendor: z.array(z.string()).min(1, 'At least one vendor must be selected'),
});

export type ProjectFormData = z.infer<typeof projectSchema>;

interface FormActionsProps {
  activeStep: number;
  onCancel: () => void;
  onBack: () => void;
  onAttachFile: () => void;
  onSaveDraft: () => void;
  onNextStep: () => void;
  onSubmit: () => void;
}

const FormActions: React.FC<FormActionsProps> = ({
  activeStep,
  onCancel,
  onBack,
  onAttachFile,
  onSaveDraft,
  onNextStep,
  onSubmit,
}) => {
  return (
    <div className={formStyles.formActions}>
      <div className={formStyles.leftActions}>
        <Button
          label="Cancel"
          variant="outline"
          onClick={onCancel}
        />
        {activeStep === 1 && (
          <Button
            label="Back"
            variant="outline"
            onClick={onBack}
          />
        )}
      </div>
      <div className={formStyles.actionGroup}>
        <Button
          variant="link"
          label="Attach file"
          onClick={onAttachFile}
        />
        <Button
          label="Save Draft"
          variant="secondary"
          onClick={onSaveDraft}
        />
        {activeStep === 0 ? (
          <Button
            label="Next Step"
            variant="primary"
            onClick={onNextStep}
          />
        ) : (
          <Button
            label="Submit"
            variant="secondary"
            onClick={onSubmit}
          />
        )}
      </div>
    </div>
  );
};

const ProjectForm: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const { openDialog, closeDialog } = useDialog();

  // Example: How to use pnpjs and SharePoint instance from useAppContext hook
  // Uncomment and use when AppContext is available:
  // 
  // import { useAppContext } from '../../contexts/AppContext';
  // const { sp, context } = useAppContext();
  //
  // Example usage:
  // const fetchProjectData = async () => {
  //   try {
  //     const items = await sp.web.lists.getByTitle('Projects').items.get();
  //     console.log('Projects:', items);
  //   } catch (error) {
  //     console.error('Error fetching projects:', error);
  //   }
  // };
  //
  // const saveProject = async (projectData: ProjectFormData) => {
  //   try {
  //     await sp.web.lists.getByTitle('Projects').items.add({
  //       Title: projectData.name,
  //       Owner: projectData.owner,
  //       // ... other fields
  //     });
  //   } catch (error) {
  //     console.error('Error saving project:', error);
  //   }
  // };

  const methods = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: '',
      owner: [] as IPersonaProps[],
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
      estimatedSpendUSD: 0,
      estimatedSpendLocal: {
        currency: 'EUR',
        value: 0,
      },
      associatedPO: '',
      businessQuestion: '',
      valueToClient: '',
      procurementNotification: false,
      selectedVendor: [],
    },
    mode: 'onChange',
  });

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

  const handleTabChange = async (e: { index: number }) => {
    // If switching to Step 2, validate all Step 1 fields first
    if (e.index === 1) {
      const isValid = await methods.trigger(step1Fields as any);
      if (!isValid) {
        return; // Don't switch tabs if validation fails
      }
    }
    
    setActiveIndex(e.index);
  };

  const handleCancel = (): void => {
    console.log('Cancel clicked');
    // TODO: Implement cancel functionality
  };

  const handleBack = (): void => {
    setActiveIndex(0);
  };

  const handleAttachFile = (): void => {
    console.log('Attach file clicked');
    // TODO: Implement attach file functionality
  };

  const handleSaveDraft = (): void => {
    console.log('Saving draft...');
    const projectName = methods.getValues().name || 'Untitled Project';
    
    const successIcon = (
      <div className={styles.successIcon}>
        <i className="pi pi-check"></i>
      </div>
    );
    
    openDialog({
      title: 'Draft Saved Successfully!',
      icon: successIcon,
      children: <DraftDialogBody projectName={projectName} />,
      footer: (
        <>
          <div className={dialogStyles.footerButtons}>
            <Button variant="secondary" onClick={() => { 
              closeDialog();
              // TODO: Navigate to new project or reset form
            }}>
              Initiate New Project
            </Button>
            <Button variant="primary" onClick={() => { 
              closeDialog();
              // TODO: Navigate to project board
            }}>
              Go to Project Board
            </Button>
          </div>
          <button className={dialogStyles.closeLink} onClick={closeDialog}>
            Close Window
          </button>
        </>
      ),
    });
    // TODO: Implement save draft functionality
  };

  const handleNextStep = async (): Promise<void> => {
    const isValid = await methods.trigger(step1Fields as any);
    if (isValid) {
      setActiveIndex(1);
    }
  };

  const handleSubmit = (): void => {
    methods.handleSubmit((data: ProjectFormData) => {
      console.log('Form submitted:', data);
      const projectName = data.name || 'Untitled Project';
      
      const successIcon = (
        <div className={styles.successIcon}>
          <i className="pi pi-check"></i>
        </div>
      );
      
      openDialog({
        title: 'Invitations Sent Successfully!',
        icon: successIcon,
        children: <SubmitDialogBody projectName={projectName} />,
        footer: (
          <>
            <div className={dialogStyles.footerButtons}>
              <Button variant="secondary" onClick={() => { 
                closeDialog();
                // TODO: Navigate to new project or reset form
              }}>
                Initiate New Project
              </Button>
              <Button variant="primary" onClick={() => { 
                closeDialog();
                // TODO: Navigate to project board
              }}>
                Go to Project Board
              </Button>
            </div>
            <button className={dialogStyles.closeLink} onClick={closeDialog}>
              Close Window
            </button>
          </>
        ),
      });
      // TODO: Implement form submission
    })();
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
              <StepOneForm />
            </TabPanel>
            <TabPanel 
              header="Step 2" 
              subheader="Fill in Financial Details and Select Vendor"
            >
              <StepTwoForm />
            </TabPanel>
          </TabView>
          
          <FormActions
            activeStep={activeIndex}
            onCancel={handleCancel}
            onBack={handleBack}
            onAttachFile={handleAttachFile}
            onSaveDraft={handleSaveDraft}
            onNextStep={handleNextStep}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </FormProvider>
  );
};


const NewProject: React.FC = () => {
    const [formType, setFormType] = useState<string | null>(null);

    const handleFormTypeSelect = (type: string) => {
        setFormType(type);
    };

    return (
        <>
            {formType ? (
                <ProjectForm />
            ) : (
                <FormTypeSelection onFormTypeSelect={handleFormTypeSelect} />
            )}
        </>
    );
};

export default NewProject;
