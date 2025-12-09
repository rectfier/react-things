import * as React from 'react';
import styles from './StatusTracker.module.scss';
import { 
  ProjectStatus, 
  PROJECT_STATUS_LABELS,
  DocumentType,
  getDocProgress,
  DOC_PROGRESS_STEPS
} from '../../config/projectStatus.config';

export interface StatusTrackerProps {
  status: ProjectStatus;
  uploadedDocs?: DocumentType[];
}

/**
 * StatusTracker - displays project status
 * When status is "active", also shows document progress
 */
const StatusTracker = React.forwardRef<HTMLDivElement, StatusTrackerProps>(
  ({ status, uploadedDocs = [] }, ref) => {
    const progress = getDocProgress(uploadedDocs);

    return (
      <div ref={ref} className={styles.statusTracker}>
        <div className={styles.mainStatus}>
          <span className={styles.label}>Status:</span>
          <span className={styles.value}>{PROJECT_STATUS_LABELS[status]}</span>
        </div>

        {status === 'active' && (
          <div className={styles.docProgress}>
            <span className={styles.progressLabel}>
              Progress: {progress.completedSteps.length} / {DOC_PROGRESS_STEPS.length} documents
            </span>
            {progress.nextStep && (
              <span className={styles.nextStep}>
                Next: {progress.nextStep.label}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

StatusTracker.displayName = 'StatusTracker';

export default StatusTracker;
