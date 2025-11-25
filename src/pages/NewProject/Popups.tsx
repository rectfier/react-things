import * as React from 'react';
import styles from '../../styles/NewProject.module.scss';

interface DialogBodyProps {
  projectName: string;
}

export const SubmitDialogBody: React.FC<DialogBodyProps> = ({ projectName }) => {
  return (
    <div className={styles.dialogContent}>
      <p className={styles.bodyText}>
        Vendor invitations have been sent to <strong>[1]</strong> selected partners.
      </p>
      <div className={styles.projectInfo}>
        <div className={styles.infoRow}>
          <span className={styles.label}>Project Name:</span>
          <span className={styles.value}>{projectName}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.label}>Project Status:</span>
          <span className={styles.value}>Bidding</span>
        </div>
      </div>
    </div>
  );
};

export const DraftDialogBody: React.FC<DialogBodyProps> = ({ projectName }) => {
  return (
    <div className={styles.dialogContent}>
      <p className={styles.bodyText}>
        Your project draft has been saved successfully.
      </p>
      <div className={styles.projectInfo}>
        <div className={styles.infoRow}>
          <span className={styles.label}>Project Name:</span>
          <span className={styles.value}>{projectName}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.label}>Project Status:</span>
          <span className={styles.value}>Draft</span>
        </div>
      </div>
    </div>
  );
};

