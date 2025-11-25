import * as React from 'react';
import { useState } from 'react';
import Dialog from '../../ui/Dialog/Dialog';
import Button from '../../ui/Button/Button';
import styles from './Dialog.module.scss';
import dialogStyles from '../../ui/Dialog/Dialog.module.scss';

const DialogPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleInitiateNewProject = () => {
    console.log('Initiate New Project');
    setIsOpen(false);
  };

  const handleGoToProjectBoard = () => {
    console.log('Go to Project Board');
    setIsOpen(false);
  };

  const successIcon = (
    <div className={styles.successIcon}>
      <i className="pi pi-check"></i>
    </div>
  );

  return (
    <div className={styles.dialogPage}>
      <Button 
        variant="primary" 
        onClick={handleOpen}
        className={styles.centerButton}
      >
        Open Dialog
      </Button>

      <Dialog
        open={isOpen}
        title="Invitations Sent Successfully!"
        onClose={handleClose}
        icon={successIcon}
        footer={
          <>
            <div className={dialogStyles.footerButtons}>
              <Button variant="secondary" onClick={handleInitiateNewProject}>
                Initiate New Project
              </Button>
              <Button variant="primary" onClick={handleGoToProjectBoard}>
                Go to Project Board
              </Button>
            </div>
            <button className={dialogStyles.closeLink} onClick={handleClose}>
              Close Window
            </button>
          </>
        }
      >
        <div className={styles.dialogContent}>
          <p className={styles.bodyText}>
            Vendor invitations have been sent to <strong>[1]</strong> selected partners.
          </p>
          <div className={styles.projectInfo}>
            <div className={styles.infoRow}>
              <span className={styles.label}>Project Name:</span>
              <span className={styles.value}>Launch Readiness Study: Oncology Drug 'Veridian' - EU5</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>Project Status:</span>
              <span className={styles.value}>Bidding</span>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default DialogPage;

