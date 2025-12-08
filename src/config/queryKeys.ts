/**
 * Query Keys
 * Centralized query keys for TanStack Query cache management
 */

export const queryKeys = {
  projects: {
    all: ['projects'] as const,
    detail: (id: string) => ['projects', id] as const
  },
  documents: {
    all: ['documents'] as const,
    byProject: (projectId: string) => ['documents', projectId] as const
  }
};
