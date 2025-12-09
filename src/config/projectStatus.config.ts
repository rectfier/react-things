/**
 * Project Status Configuration
 * 
 * Main Status Flow: Draft → Submitted → Active → Completed
 * 
 * When status is "Active", document uploads drive sub-progress.
 * Once all required docs are uploaded, project can be marked "Completed".
 */

// ============================================
// Document Types (for Active status progress)
// ============================================
export const DOCUMENT_TYPES = [
  'bidding_document',
  'vendor_selection_document',
  'screener_approval_document',
  'recruitment_document',
  'medical_review_document',
  'interview_document',
  'project_progress_document',
  'completion_document'
] as const;

export type DocumentType = typeof DOCUMENT_TYPES[number];

// ============================================
// Main Project Statuses
// ============================================
export const PROJECT_STATUSES = [
  'draft',
  'submitted',
  'active',
  'completed'
] as const;

export type ProjectStatus = typeof PROJECT_STATUSES[number];

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  draft: 'Draft',
  submitted: 'Submitted',
  active: 'Active',
  completed: 'Completed'
};

// ============================================
// Document Progress (sub-steps within "Active")
// ============================================
export interface DocProgressStep {
  documentType: DocumentType;
  label: string;
  order: number;
}

export const DOC_PROGRESS_STEPS: DocProgressStep[] = [
  { documentType: 'bidding_document', label: 'Bidding', order: 1 },
  { documentType: 'vendor_selection_document', label: 'Vendor Selection', order: 2 },
  { documentType: 'screener_approval_document', label: 'Screener Approval', order: 3 },
  { documentType: 'recruitment_document', label: 'Recruitment', order: 4 },
  { documentType: 'medical_review_document', label: 'Medical Review', order: 5 },
  { documentType: 'interview_document', label: 'Interview', order: 6 },
  { documentType: 'project_progress_document', label: 'Project Progress', order: 7 },
  { documentType: 'completion_document', label: 'Final Completion', order: 8 }
];

// ============================================
// Helper Functions
// ============================================

/**
 * Get document progress from uploaded doc types
 * Returns which steps are completed and what's next
 */
export const getDocProgress = (uploadedDocs: DocumentType[]): {
  completedSteps: DocProgressStep[];
  nextStep: DocProgressStep | null;
  isAllDocsUploaded: boolean;
} => {
  const completedSteps = DOC_PROGRESS_STEPS.filter(
    step => uploadedDocs.includes(step.documentType)
  );
  
  const nextStep = DOC_PROGRESS_STEPS.find(
    step => !uploadedDocs.includes(step.documentType)
  ) || null;

  const isAllDocsUploaded = DOC_PROGRESS_STEPS.every(
    step => uploadedDocs.includes(step.documentType)
  );

  return { completedSteps, nextStep, isAllDocsUploaded };
};

/**
 * Check if project can be marked as completed
 */
export const canCompleteProject = (uploadedDocs: DocumentType[]): boolean => {
  return getDocProgress(uploadedDocs).isAllDocsUploaded;
};

// Document type options for UI dropdown
export const DOCUMENT_TYPE_OPTIONS = DOC_PROGRESS_STEPS.map(step => ({
  value: step.documentType,
  label: step.label
}));
