import * as React from 'react';
import Dialog from '../../ui/Dialog/Dialog';
import Button from '../../ui/Button/Button';
import styles from '../../styles/NewProject.module.scss';
import dialogStyles from '../../ui/Dialog/Dialog.module.scss';

export interface PopupsProps {
  isOpen: boolean;
  dialogType: 'submit' | 'saveDraft' | null;
  projectName: string;
  onClose: () => void;
  onInitiateNewProject: () => void;
  onGoToProjectBoard: () => void;
}

interface DialogBodyProps {
  projectName: string;
}

const SubmitDialogBody: React.FC<DialogBodyProps> = ({ projectName }) => {
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

const DraftDialogBody: React.FC<DialogBodyProps> = ({ projectName }) => {
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

const Popups: React.FC<PopupsProps> = ({
  isOpen,
  dialogType,
  projectName,
  onClose,
  onInitiateNewProject,
  onGoToProjectBoard,
}) => {
  if (!dialogType) return null;

  const getDialogTitle = (): string => {
    if (dialogType === 'submit') {
      return 'Invitations Sent Successfully!';
    }
    return 'Draft Saved Successfully!';
  };

  const renderDialogBody = (): React.ReactNode => {
    if (dialogType === 'submit') {
      return <SubmitDialogBody projectName={projectName} />;
    }
    return <DraftDialogBody projectName={projectName} />;
  };

  const successIcon = (
    <div className={styles.successIcon}>
      <i className="pi pi-check"></i>
    </div>
  );

  return (
    <Dialog
      open={isOpen}
      title={getDialogTitle()}
      onClose={onClose}
      icon={successIcon}
      footer={
        <>
          <div className={dialogStyles.footerButtons}>
            <Button variant="secondary" onClick={onInitiateNewProject}>
              Initiate New Project
            </Button>
            <Button variant="primary" onClick={onGoToProjectBoard}>
              Go to Project Board
            </Button>
          </div>
          <button className={dialogStyles.closeLink} onClick={onClose}>
            Close Window
          </button>
        </>
      }
    >
      {renderDialogBody()}
    </Dialog>
  );
};

export default Popups;

