/**
 * Query Keys for TanStack Query
 */

import { LookupType } from './lookupConfig';

export const queryKeys = {
  projects: {
    all: ['projects'] as const,
    detail: (id: string) => ['projects', id] as const
  },
  documents: {
    all: ['documents'] as const,
    byProject: (projectId: string) => ['documents', projectId] as const
  },
  lookups: {
    // Generic lookup key - use this for all dropdown options
    byType: (type: LookupType) => ['lookups', type] as const
  }
};
