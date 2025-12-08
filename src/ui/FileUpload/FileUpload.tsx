import * as React from 'react';
import styles from './FileUpload.module.scss';
import Button from '../Button/Button';
import { DOCUMENT_TYPE_OPTIONS } from '../../config/projectStatus.config';

export interface FileUploadProps {
  onUpload: (file: File, documentType: string) => void;
  isUploading?: boolean;
  disabled?: boolean;
}

export interface UploadedFileInfo {
  file: File;
  documentType: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
}

const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  ({ onUpload, isUploading = false, disabled = false }, ref) => {
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const [selectedDocumentType, setSelectedDocumentType] = React.useState<string>('');
    const [isDragOver, setIsDragOver] = React.useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

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

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
      event.preventDefault();
      setIsDragOver(true);
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>): void => {
      event.preventDefault();
      setIsDragOver(false);
    };

    const handleBrowseClick = (): void => {
      fileInputRef.current?.click();
    };

    const handleDocumentTypeChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
      setSelectedDocumentType(event.target.value);
    };

    const handleUpload = (): void => {
      if (selectedFile && selectedDocumentType) {
        onUpload(selectedFile, selectedDocumentType);
        // Reset form after initiating upload
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
            onChange={handleDocumentTypeChange}
            disabled={isUploading || disabled}
          >
            <option value="">Select document type...</option>
            {DOCUMENT_TYPE_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div
          className={`${styles.dropzone} ${isDragOver ? styles.dragOver : ''} ${disabled ? styles.disabled : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleBrowseClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleBrowseClick()}
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
              Drag & drop a file here, or <span className={styles.browseLink}>browse</span>
            </p>
            <p className={styles.dropzoneHint}>Supports any file type</p>
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
              aria-label="Remove file"
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
            {isUploading ? 'Uploading...' : 'Upload Document'}
          </Button>
        </div>
      </div>
    );
  }
);

FileUpload.displayName = 'FileUpload';

export default FileUpload;
