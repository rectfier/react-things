// Document Service (SharePoint)
export { documentService } from './documentService';
export type { 
  AddDocumentRequest, 
  AddDocumentResponse 
} from './documentService';

// Project Service (Backend)
export { projectService } from './projectService';
export type { 
  Project, 
  UpdateProjectRequest, 
  UpdateProjectResponse 
} from './projectService';

// Lookup Service (Dropdowns)
export { lookupService, fetchLookup, fetchTeams, fetchDelegates } from './lookupService';
