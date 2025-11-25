import * as React from 'react';
import { useDialog } from '../../contexts/DialogContext';
import Button from '../../ui/Button/Button';
import styles from '../../styles/NewProject.module.scss';
import dialogStyles from '../../ui/Dialog/Dialog.module.scss';

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

interface OpenDialogOptions {
  dialogType: 'submit' | 'saveDraft';
  projectName: string;
  onInitiateNewProject?: () => void;
  onGoToProjectBoard?: () => void;
}

export const usePopups = () => {
  const { openDialog, closeDialog } = useDialog();

  const openSubmitDialog = React.useCallback((options: OpenDialogOptions) => {
    const { projectName, onInitiateNewProject, onGoToProjectBoard } = options;
    
    const successIcon = (
      <div className={styles.successIcon}>
        <i className="pi pi-check"></i>
      </div>
    );

    openDialog({
      title: 'Invitations Sent Successfully!',
      icon: successIcon,
      children: <SubmitDialogBody projectName={projectName} />,
      footer: (
        <>
          <div className={dialogStyles.footerButtons}>
            <Button variant="secondary" onClick={() => { onInitiateNewProject?.(); closeDialog(); }}>
              Initiate New Project
            </Button>
            <Button variant="primary" onClick={() => { onGoToProjectBoard?.(); closeDialog(); }}>
              Go to Project Board
            </Button>
          </div>
          <button className={dialogStyles.closeLink} onClick={closeDialog}>
            Close Window
          </button>
        </>
      ),
    });
  }, [openDialog, closeDialog]);

  const openDraftDialog = React.useCallback((options: OpenDialogOptions) => {
    const { projectName, onInitiateNewProject, onGoToProjectBoard } = options;
    
    const successIcon = (
      <div className={styles.successIcon}>
        <i className="pi pi-check"></i>
      </div>
    );

    openDialog({
      title: 'Draft Saved Successfully!',
      icon: successIcon,
      children: <DraftDialogBody projectName={projectName} />,
      footer: (
        <>
          <div className={dialogStyles.footerButtons}>
            <Button variant="secondary" onClick={() => { onInitiateNewProject?.(); closeDialog(); }}>
              Initiate New Project
            </Button>
            <Button variant="primary" onClick={() => { onGoToProjectBoard?.(); closeDialog(); }}>
              Go to Project Board
            </Button>
          </div>
          <button className={dialogStyles.closeLink} onClick={closeDialog}>
            Close Window
          </button>
        </>
      ),
    });
  }, [openDialog, closeDialog]);

  return {
    openSubmitDialog,
    openDraftDialog,
    closeDialog,
  };
};

export default usePopups;

