import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import styles from './StatusTracker.module.scss';
import { getStatusById } from '../../config/projectStatus.config';
import { queryKeys } from '../../config/queryKeys';
import { projectService, Project } from '../../services';

export interface StatusTrackerProps {
  projectId: string;
}

/**
 * StatusTracker - subscribes to project query and displays current status
 * Automatically updates when project data changes in the cache
 */
const StatusTracker = React.forwardRef<HTMLDivElement, StatusTrackerProps>(
  ({ projectId }, ref) => {
    const { data: project, isLoading } = useQuery<Project>({
      queryKey: queryKeys.projects.detail(projectId),
      queryFn: () => projectService.getProject(projectId),
      staleTime: Infinity // Don't refetch - we update cache directly
    });

    const currentStatusId = project?.currentStatusId || 'draft';
    const currentStatus = getStatusById(currentStatusId);

    if (isLoading) {
      return (
        <div ref={ref} className={styles.statusTracker}>
          <span className={styles.loading}>Loading...</span>
        </div>
      );
    }

    return (
      <div ref={ref} className={styles.statusTracker}>
        <span className={styles.label}>Status:</span>
        <span className={styles.value}>{currentStatus?.label || 'Unknown'}</span>
      </div>
    );
  }
);

StatusTracker.displayName = 'StatusTracker';

export default StatusTracker;
