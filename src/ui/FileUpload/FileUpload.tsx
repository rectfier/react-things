import * as React from 'react';
import styles from './FileUpload.module.scss';
import Button from '../Button/Button';
import { DOCUMENT_TYPE_OPTIONS, DocumentType } from '../../config/projectStatus.config';

export interface FileUploadProps {
  onUpload: (file: File, documentType: DocumentType) => void;
  isUploading?: boolean;
  disabled?: boolean;
  uploadedDocs?: DocumentType[];
}

const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  ({ onUpload, isUploading = false, disabled = false, uploadedDocs = [] }, ref) => {
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const [selectedDocumentType, setSelectedDocumentType] = React.useState<DocumentType | ''>('');
    const [isDragOver, setIsDragOver] = React.useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    // Filter out already uploaded doc types
    const availableOptions = DOCUMENT_TYPE_OPTIONS.filter(
      opt => !uploadedDocs.includes(opt.value)
    );

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>): void => {
      const files = event.target.files;
      if (files && files.length > 0) {
        setSelectedFile(files[0]);
      }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>): void => {
      event.preventDefault();
      setIsDragOver(false);
      const files = event.dataTransfer.files;
      if (files && files.length > 0) {
        setSelectedFile(files[0]);
      }
    };

    const handleUpload = (): void => {
      if (selectedFile && selectedDocumentType) {
        onUpload(selectedFile, selectedDocumentType);
        setSelectedFile(null);
        setSelectedDocumentType('');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    };

    const handleRemoveFile = (): void => {
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };

    const formatFileSize = (bytes: number): string => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const canUpload = selectedFile && selectedDocumentType && !isUploading && !disabled;

    return (
      <div ref={ref} className={styles.fileUpload}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Document Type</label>
          <select
            className={styles.select}
            value={selectedDocumentType}
            onChange={(e) => setSelectedDocumentType(e.target.value as DocumentType | '')}
            disabled={isUploading || disabled || availableOptions.length === 0}
          >
            <option value="">
              {availableOptions.length === 0 ? 'All documents uploaded' : 'Select document type...'}
            </option>
            {availableOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div
          className={`${styles.dropzone} ${isDragOver ? styles.dragOver : ''} ${disabled ? styles.disabled : ''}`}
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={(e) => { e.preventDefault(); setIsDragOver(false); }}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            className={styles.fileInput}
            onChange={handleFileSelect}
            disabled={isUploading || disabled}
          />
          <div className={styles.dropzoneContent}>
            <i className="pi pi-cloud-upload"></i>
            <p className={styles.dropzoneText}>
              Drag & drop or <span className={styles.browseLink}>browse</span>
            </p>
          </div>
        </div>

        {selectedFile && (
          <div className={styles.selectedFile}>
            <div className={styles.fileInfo}>
              <i className="pi pi-file"></i>
              <div className={styles.fileDetails}>
                <span className={styles.fileName}>{selectedFile.name}</span>
                <span className={styles.fileSize}>{formatFileSize(selectedFile.size)}</span>
              </div>
            </div>
            <button
              type="button"
              className={styles.removeButton}
              onClick={handleRemoveFile}
              disabled={isUploading}
            >
              <i className="pi pi-times"></i>
            </button>
          </div>
        )}

        <div className={styles.actions}>
          <Button
            variant="primary"
            onClick={handleUpload}
            disabled={!canUpload}
            icon={isUploading ? 'pi-spin pi-spinner' : 'pi-upload'}
          >
            {isUploading ? 'Uploading...' : 'Upload'}
          </Button>
        </div>
      </div>
    );
  }
);

FileUpload.displayName = 'FileUpload';

export default FileUpload;
