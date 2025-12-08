/**
 * Document Service
 * Handles all document-related API calls (Server A)
 * 
 * Replace the mock implementations with real fetch calls when ready
 */

// Types
export interface UploadedDocument {
  id: string;
  fileName: string;
  documentType: string;
  uploadedAt: string;
  size: number;
}

export interface DocumentUploadRequest {
  file: File;
  documentType: string;
  projectId: string;
}

export interface DocumentUploadResponse {
  success: boolean;
  document: UploadedDocument;
  message: string;
}

// Simulate network delay
const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

// Generate unique ID
const generateId = (): string => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

/**
 * Upload a document to Server A
 */
export const uploadDocument = async (request: DocumentUploadRequest): Promise<DocumentUploadResponse> => {
  // Simulate network latency (500ms - 1500ms)
  await delay(500 + Math.random() * 1000);

  // Simulate occasional failures (10% chance)
  if (Math.random() < 0.1) {
    throw new Error('Document upload failed. Server A is temporarily unavailable.');
  }

  const document: UploadedDocument = {
    id: generateId(),
    fileName: request.file.name,
    documentType: request.documentType,
    uploadedAt: new Date().toISOString(),
    size: request.file.size
  };

  return {
    success: true,
    document,
    message: `Document "${request.file.name}" uploaded successfully`
  };
};

// Export as object for easier mocking in tests
export const documentService = {
  uploadDocument
};
