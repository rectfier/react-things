import * as React from 'react';
import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import TabView from '../../ui/TabView/TabView';
import TabPanel from '../../ui/TabView/TabPanel';
import FileUpload from '../../ui/FileUpload/FileUpload';
import StatusTracker from '../../ui/StatusTracker/StatusTracker';
import { documentService, projectService, Project, UploadedDocument } from '../../services';
import { queryKeys } from '../../config/queryKeys';
import { getStatusByDocumentType, getNextStatus } from '../../config/projectStatus.config';
import styles from './ProjectStatus.module.scss';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});

const PROJECT_ID = 'project-001';

interface UploadHistoryItem {
  document: UploadedDocument;
  previousStatus: string;
  newStatus: string;
  timestamp: string;
}

const ProjectStatusContent: React.FC = () => {
  const qc = useQueryClient();
  const [activeTabIndex, setActiveTabIndex] = React.useState(0);
  const [uploadHistory, setUploadHistory] = React.useState<UploadHistoryItem[]>([]);
  const [notification, setNotification] = React.useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  // Get current project
  const { data: project } = useQuery<Project>({
    queryKey: queryKeys.projects.detail(PROJECT_ID),
    queryFn: () => projectService.getProject(PROJECT_ID),
    staleTime: Infinity
  });

  // Upload document mutation
  const uploadMutation = useMutation({
    mutationFn: documentService.uploadDocument
  });

  // Update project mutation
  const updateMutation = useMutation({
    mutationFn: projectService.updateProject,
    onSuccess: (response) => {
      // Update cache directly with server response
      qc.setQueryData<Project>(
        queryKeys.projects.detail(PROJECT_ID),
        response.project
      );
    }
  });

  const handleUpload = async (file: File, documentType: string): Promise<void> => {
    try {
      setNotification(null);
      const previousStatusId = project?.currentStatusId || 'draft';

      // Step 1: Upload document
      const uploadResult = await uploadMutation.mutateAsync({
        file,
        documentType,
        projectId: PROJECT_ID
      });

      // Determine new status
      const statusForDocument = getStatusByDocumentType(documentType);
      if (!statusForDocument) {
        throw new Error(`Unknown document type: ${documentType}`);
      }

      const nextStatus = getNextStatus(statusForDocument.id);
      const newStatusId = nextStatus?.id || statusForDocument.id;

      // Step 2: Update project with new status
      await updateMutation.mutateAsync({
        projectId: PROJECT_ID,
        currentStatusId: newStatusId,
        documents: [...(project?.documents || []), uploadResult.document]
      });

      // Track in history
      setUploadHistory(prev => [{
        document: uploadResult.document,
        previousStatus: previousStatusId,
        newStatus: newStatusId,
        timestamp: new Date().toISOString()
      }, ...prev]);

      setNotification({
        type: 'success',
        message: `Document uploaded! Status: ${newStatusId.replace(/_/g, ' ')}`
      });

      setTimeout(() => setNotification(null), 5000);

    } catch (error) {
      setNotification({
        type: 'error',
        message: error instanceof Error ? error.message : 'Upload failed'
      });
    }
  };

  const isProcessing = uploadMutation.isLoading || updateMutation.isLoading;

  return (
    <div className={styles.projectStatus}>
      <div className={styles.header}>
        <h1 className={styles.title}>Project Status Management</h1>
        <StatusTracker projectId={PROJECT_ID} />
      </div>

      {notification && (
        <div className={`${styles.notification} ${styles[notification.type]}`}>
          <i className={`pi ${notification.type === 'success' ? 'pi-check-circle' : 'pi-times-circle'}`}></i>
          <span>{notification.message}</span>
          <button
            type="button"
            className={styles.notificationClose}
            onClick={() => setNotification(null)}
          >
            <i className="pi pi-times"></i>
          </button>
        </div>
      )}

      <div className={styles.content}>
        <TabView activeIndex={activeTabIndex} onTabChange={(e) => setActiveTabIndex(e.index)}>
          <TabPanel header="Upload Documents">
            <div className={styles.tabContent}>
              <FileUpload onUpload={handleUpload} isUploading={isProcessing} />

              {uploadHistory.length > 0 && (
                <div className={styles.historySection}>
                  <h3 className={styles.historyTitle}>Recent Uploads</h3>
                  <div className={styles.historyList}>
                    {uploadHistory.map((item) => (
                      <div key={item.document.id} className={styles.historyItem}>
                        <i className="pi pi-file"></i>
                        <div className={styles.historyDetails}>
                          <span className={styles.historyFileName}>{item.document.fileName}</span>
                          <span className={styles.historyStatus}>
                            {item.previousStatus.replace(/_/g, ' ')} → {item.newStatus.replace(/_/g, ' ')}
                          </span>
                        </div>
                        <i className="pi pi-check-circle" style={{ color: '#10b981' }}></i>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabPanel>

          <TabPanel header="Status">
            <div className={styles.tabContent}>
              <StatusTracker projectId={PROJECT_ID} />
            </div>
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
};

const ProjectStatus: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <ProjectStatusContent />
  </QueryClientProvider>
);

export default ProjectStatus;
