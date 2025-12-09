/**
 * Project Service (Backend API)
 * 
 * Handles project CRUD operations.
 * Status is stored in project, updated via updateProject.
 */

import { ProjectStatus } from '../config/projectStatus.config';

// ============================================
// Types
// ============================================
export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProjectRequest {
  projectId: string;
  status?: ProjectStatus;
  name?: string;
}

export interface UpdateProjectResponse {
  success: boolean;
  project: Project;
}

// ============================================
// MOCK: In-memory storage
// ============================================
const mockStore: Map<string, Project> = new Map();

const delay = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

// ============================================
// Service Functions
// ============================================

/**
 * Get project by ID
 */
export const getProject = async (projectId: string): Promise<Project> => {
  await delay(200 + Math.random() * 200);

  let project = mockStore.get(projectId);
  
  if (!project) {
    // Create new project with default status
    project = {
      id: projectId,
      name: `Project ${projectId}`,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockStore.set(projectId, project);
  }

  return project;
};

/**
 * Update project (PUT request)
 * Can update status, name, or other fields
 */
export const updateProject = async (
  request: UpdateProjectRequest
): Promise<UpdateProjectResponse> => {
  await delay(300 + Math.random() * 300);

  // Simulate occasional failures (5% chance)
  if (Math.random() < 0.05) {
    throw new Error('Failed to update project. Server is temporarily unavailable.');
  }

  let project = mockStore.get(request.projectId);
  
  if (!project) {
    project = {
      id: request.projectId,
      name: request.name || `Project ${request.projectId}`,
      status: request.status || 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  } else {
    project = {
      ...project,
      ...(request.status && { status: request.status }),
      ...(request.name && { name: request.name }),
      updatedAt: new Date().toISOString()
    };
  }

  mockStore.set(request.projectId, project);

  return {
    success: true,
    project
  };
};

// Export as object
export const projectService = {
  getProject,
  updateProject
};
