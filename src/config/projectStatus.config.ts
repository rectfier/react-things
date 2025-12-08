/**
 * Project Status Configuration
 * 
 * This config maps each status to its requirements.
 * To modify the workflow, simply update this configuration.
 * 
 * Each status:
 * - id: unique identifier
 * - label: display name
 * - order: sequence in the workflow
 * - requiredDocumentType: the document type needed to progress to next status
 * - description: optional description for the status
 */

export interface StatusConfig {
  id: string;
  label: string;
  order: number;
  requiredDocumentType: string;
  description?: string;
}

export const PROJECT_STATUSES: StatusConfig[] = [
  {
    id: 'draft',
    label: 'Draft',
    order: 1,
    requiredDocumentType: 'draft_document',
    description: 'Initial project draft'
  },
  {
    id: 'bidding',
    label: 'Bidding',
    order: 2,
    requiredDocumentType: 'bidding_document',
    description: 'Bidding process in progress'
  },
  {
    id: 'vendor_selected',
    label: 'Vendor Selected',
    order: 3,
    requiredDocumentType: 'vendor_selection_document',
    description: 'Vendor has been selected'
  },
  {
    id: 'pending_screener_approval',
    label: 'Pending Screener Approval',
    order: 4,
    requiredDocumentType: 'screener_approval_document',
    description: 'Awaiting screener approval'
  },
  {
    id: 'recruitment',
    label: 'Recruitment',
    order: 5,
    requiredDocumentType: 'recruitment_document',
    description: 'Recruitment phase'
  },
  {
    id: 'pending_medical_review',
    label: 'Pending Medical Review',
    order: 6,
    requiredDocumentType: 'medical_review_document',
    description: 'Awaiting medical review'
  },
  {
    id: 'interview_in_progress',
    label: 'Interview in Progress',
    order: 7,
    requiredDocumentType: 'interview_document',
    description: 'Interviews are being conducted'
  },
  {
    id: 'project_in_progress',
    label: 'Project in Progress',
    order: 8,
    requiredDocumentType: 'project_progress_document',
    description: 'Project is actively in progress'
  },
  {
    id: 'complete_project',
    label: 'Complete Project',
    order: 9,
    requiredDocumentType: 'completion_document',
    description: 'Project has been completed'
  }
];

// Helper to get status by id
export const getStatusById = (id: string): StatusConfig | undefined => {
  return PROJECT_STATUSES.find(status => status.id === id);
};

// Helper to get next status
export const getNextStatus = (currentStatusId: string): StatusConfig | undefined => {
  const currentStatus = getStatusById(currentStatusId);
  if (!currentStatus) return undefined;
  return PROJECT_STATUSES.find(status => status.order === currentStatus.order + 1);
};

// Helper to get status for a document type
export const getStatusByDocumentType = (documentType: string): StatusConfig | undefined => {
  return PROJECT_STATUSES.find(status => status.requiredDocumentType === documentType);
};

// Document type options for dropdown
export const DOCUMENT_TYPE_OPTIONS = PROJECT_STATUSES.map(status => ({
  value: status.requiredDocumentType,
  label: status.label,
  statusId: status.id
}));
