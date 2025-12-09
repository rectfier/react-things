/**
 * useLookupOptions Hook
 * 
 * Reusable hook for fetching dropdown options from API.
 * Uses TanStack Query for caching and state management.
 * 
 * Usage:
 *   const { options, isLoading } = useLookupOptions('teams');
 *   const { options, isLoading } = useLookupOptions('delegates');
 */

import { useQuery } from '@tanstack/react-query';
import { LookupType, lookupConfigs } from '../config/lookupConfig';
import { queryKeys } from '../config/queryKeys';
import { fetchLookup } from '../services/lookupService';
import { DropdownFieldOption } from '../ui/DropdownField';

export interface UseLookupOptionsResult {
  options: DropdownFieldOption[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export const useLookupOptions = (type: LookupType): UseLookupOptionsResult => {
  const config = lookupConfigs[type];
  
  const { data, isLoading, isError, error } = useQuery({
    queryKey: queryKeys.lookups.byType(type),
    queryFn: () => fetchLookup(type),
    staleTime: config?.staleTime ?? 5 * 60 * 1000, // Default 5 minutes
  });

  return {
    options: data ?? [],
    isLoading,
    isError,
    error: error as Error | null
  };
};

export default useLookupOptions;

