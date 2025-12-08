/**
 * Project Service
 * Handles all project-related API calls (Server B)
 * 
 * Replace mock implementations with real fetch calls when ready
 */

import { UploadedDocument } from './documentService';

// Types
export interface Project {
  id: string;
  currentStatusId: string;
  documents: UploadedDocument[];
  updatedAt: string;
}

export interface UpdateProjectRequest {
  projectId: string;
  currentStatusId?: string;
  documents?: UploadedDocument[];
}

export interface UpdateProjectResponse {
  success: boolean;
  project: Project;
}

// Simulate network delay
const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Get project by ID
 */
export const getProject = async (projectId: string): Promise<Project> => {
  await delay(200 + Math.random() * 300);
  
  return {
    id: projectId,
    currentStatusId: 'draft',
    documents: [],
    updatedAt: new Date().toISOString()
  };
};

/**
 * Update project (PUT request)
 * Can update any project field - status, documents, etc.
 */
export const updateProject = async (request: UpdateProjectRequest): Promise<UpdateProjectResponse> => {
  await delay(300 + Math.random() * 500);

  // Simulate occasional failures (5% chance)
  if (Math.random() < 0.05) {
    throw new Error('Project update failed. Server B is temporarily unavailable.');
  }

  const project: Project = {
    id: request.projectId,
    currentStatusId: request.currentStatusId || 'draft',
    documents: request.documents || [],
    updatedAt: new Date().toISOString()
  };

  return {
    success: true,
    project
  };
};

export const projectService = {
  getProject,
  updateProject
};
