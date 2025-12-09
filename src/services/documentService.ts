/**
 * Document Service (SharePoint)
 * 
 * Handles document storage in SharePoint.
 * - addDocument: uploads file with metadata
 * - getAllDocs: returns array of document types that exist
 */

import { DocumentType } from '../config/projectStatus.config';

// ============================================
// Types
// ============================================
export interface AddDocumentRequest {
  file: File;
  documentType: DocumentType;
  projectId: string;
}

export interface AddDocumentResponse {
  success: boolean;
  documentType: DocumentType;
  fileName: string;
}

// ============================================
// MOCK: In-memory storage (simulates SharePoint)
// ============================================
const mockStore: Map<string, DocumentType[]> = new Map();

const delay = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

// ============================================
// Service Functions
// ============================================

/**
 * Upload document to SharePoint with metadata
 * Returns success confirmation
 */
export const addDocument = async (
  request: AddDocumentRequest
): Promise<AddDocumentResponse> => {
  await delay(500 + Math.random() * 1000);

  // Simulate occasional failures (10% chance)
  if (Math.random() < 0.1) {
    throw new Error('Document upload failed. SharePoint is temporarily unavailable.');
  }

  // Store doc type (simulates SharePoint storing file with metadata)
  const existing = mockStore.get(request.projectId) || [];
  if (!existing.includes(request.documentType)) {
    mockStore.set(request.projectId, [...existing, request.documentType]);
  }

  return {
    success: true,
    documentType: request.documentType,
    fileName: request.file.name
  };
};

/**
 * Get all document types that exist for a project
 * Returns array of DocumentType strings
 */
export const getAllDocs = async (projectId: string): Promise<DocumentType[]> => {
  await delay(200 + Math.random() * 200);
  
  return mockStore.get(projectId) || [];
};

/**
 * Delete a document by type
 */
export const deleteDocument = async (
  projectId: string,
  documentType: DocumentType
): Promise<{ success: boolean }> => {
  await delay(300);
  
  const existing = mockStore.get(projectId) || [];
  mockStore.set(projectId, existing.filter(t => t !== documentType));
  
  return { success: true };
};

// Export as object
export const documentService = {
  addDocument,
  getAllDocs,
  deleteDocument
};
