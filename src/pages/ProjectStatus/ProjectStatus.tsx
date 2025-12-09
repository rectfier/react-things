import * as React from 'react';
import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import TabView from '../../ui/TabView/TabView';
import TabPanel from '../../ui/TabView/TabPanel';
import FileUpload from '../../ui/FileUpload/FileUpload';
import StatusTracker from '../../ui/StatusTracker/StatusTracker';
import Button from '../../ui/Button/Button';
import { documentService, projectService, Project } from '../../services';
import { queryKeys } from '../../config/queryKeys';
import { DocumentType, ProjectStatus as ProjectStatusType, canCompleteProject } from '../../config/projectStatus.config';
import styles from './ProjectStatus.module.scss';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 30000
    }
  }
});

const PROJECT_ID = 'project-001';

const ProjectStatusContent: React.FC = () => {
  const qc = useQueryClient();
  const [activeTabIndex, setActiveTabIndex] = React.useState(0);
  const [notification, setNotification] = React.useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  // Query: Get project data
  const { data: project } = useQuery<Project>({
    queryKey: queryKeys.projects.detail(PROJECT_ID),
    queryFn: () => projectService.getProject(PROJECT_ID)
  });

  // Query: Get uploaded document types
  const { data: uploadedDocs = [] } = useQuery<DocumentType[]>({
    queryKey: queryKeys.documents.byProject(PROJECT_ID),
    queryFn: () => documentService.getAllDocs(PROJECT_ID)
  });

  // Mutation: Upload document to SharePoint
  const uploadMutation = useMutation({
    mutationFn: documentService.addDocument,
    onSuccess: () => {
      // Invalidate docs query to refetch
      qc.invalidateQueries({ queryKey: queryKeys.documents.byProject(PROJECT_ID) });
    }
  });

  // Mutation: Update project status
  const updateProjectMutation = useMutation({
    mutationFn: projectService.updateProject,
    onSuccess: (response) => {
      qc.setQueryData<Project>(
        queryKeys.projects.detail(PROJECT_ID),
        response.project
      );
    }
  });

  const showNotification = (type: 'success' | 'error', message: string): void => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  // Handler: Upload document
  const handleUpload = async (file: File, documentType: DocumentType): Promise<void> => {
    try {
      await uploadMutation.mutateAsync({
        file,
        documentType,
        projectId: PROJECT_ID
      });
      showNotification('success', `${documentType.replace(/_/g, ' ')} uploaded!`);
    } catch (error) {
      showNotification('error', error instanceof Error ? error.message : 'Upload failed');
    }
  };

  // Handler: Change project status
  const handleStatusChange = async (newStatus: ProjectStatusType): Promise<void> => {
    try {
      await updateProjectMutation.mutateAsync({
        projectId: PROJECT_ID,
        status: newStatus
      });
      showNotification('success', `Status changed to ${newStatus}`);
    } catch (error) {
      showNotification('error', error instanceof Error ? error.message : 'Update failed');
    }
  };

  const status = project?.status || 'draft';
  const isProcessing = uploadMutation.isLoading || updateProjectMutation.isLoading;
  const canComplete = status === 'active' && canCompleteProject(uploadedDocs);

  return (
    <div className={styles.projectStatus}>
      <div className={styles.header}>
        <h1 className={styles.title}>Project Status</h1>
        <StatusTracker status={status} uploadedDocs={uploadedDocs} />
      </div>

      {notification && (
        <div className={`${styles.notification} ${styles[notification.type]}`}>
          <i className={`pi ${notification.type === 'success' ? 'pi-check-circle' : 'pi-times-circle'}`}></i>
          <span>{notification.message}</span>
          <button type="button" className={styles.closeBtn} onClick={() => setNotification(null)}>
            <i className="pi pi-times"></i>
          </button>
        </div>
      )}

      <div className={styles.content}>
        <TabView activeIndex={activeTabIndex} onTabChange={(e) => setActiveTabIndex(e.index)}>
          <TabPanel header="Status Actions">
            <div className={styles.tabContent}>
              <div className={styles.statusActions}>
                {status === 'draft' && (
                  <Button
                    variant="primary"
                    onClick={() => handleStatusChange('submitted')}
                    disabled={isProcessing}
                  >
                    Submit Project
                  </Button>
                )}

                {status === 'submitted' && (
                  <Button
                    variant="primary"
                    onClick={() => handleStatusChange('active')}
                    disabled={isProcessing}
                  >
                    Activate Project
                  </Button>
                )}

                {status === 'active' && (
                  <Button
                    variant="primary"
                    onClick={() => handleStatusChange('completed')}
                    disabled={isProcessing || !canComplete}
                  >
                    {canComplete ? 'Complete Project' : 'Upload all docs to complete'}
                  </Button>
                )}

                {status === 'completed' && (
                  <p className={styles.completedText}>✓ Project Completed</p>
                )}
              </div>
            </div>
          </TabPanel>

          <TabPanel header="Documents" disabled={status !== 'active'}>
            <div className={styles.tabContent}>
              {status === 'active' ? (
                <>
                  <FileUpload
                    onUpload={handleUpload}
                    isUploading={uploadMutation.isLoading}
                    uploadedDocs={uploadedDocs}
                  />

                  {uploadedDocs.length > 0 && (
                    <div className={styles.uploadedList}>
                      <h3>Uploaded Documents</h3>
                      <ul>
                        {uploadedDocs.map(doc => (
                          <li key={doc}>
                            <i className="pi pi-check-circle"></i>
                            {doc.replace(/_/g, ' ')}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <p>Activate project to upload documents</p>
              )}
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
