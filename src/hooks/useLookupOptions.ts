/**
 * useLookupOptions Hook
 * 
 * Reusable hook for fetching dropdown options from API.
 * 
 * Usage:
 *   const { options, isLoading } = useLookupOptions('teams');
 *   const { options, isLoading } = useLookupOptions('delegates');
 */

import { useQuery } from '@tanstack/react-query';
import { DropdownFieldOption } from '../ui/DropdownField';

// ============================================
// Lookup Types - Add new types here
// ============================================
export type LookupType = 
  | 'teams'
  | 'delegates'
  | 'categories'
  | 'markets'
  | 'buStakeholders'
  | 'respondentTypes';

// ============================================
// API Response Type (same for all lookups)
// ============================================
interface LookupApiResponse {
  Id: number;
  value: string;
  isActive: number;
}

// ============================================
// Endpoint Configuration
// ============================================
const lookupEndpoints: Record<LookupType, string> = {
  teams: 'https://jsonplaceholder.typicode.com/users',
  delegates: 'https://jsonplaceholder.typicode.com/users',
  categories: 'https://jsonplaceholder.typicode.com/users',
  markets: 'https://jsonplaceholder.typicode.com/users',
  buStakeholders: 'https://jsonplaceholder.typicode.com/users',
  respondentTypes: 'https://jsonplaceholder.typicode.com/users',
};

// ============================================
// Transform Function (same for all)
// ============================================
const transformToDropdownOptions = (data: LookupApiResponse[]): DropdownFieldOption[] => 
  data
    .filter(item => item.isActive === 1) // Only active items
    .map(item => ({
      label: item.value,
      value: item.Id
    }));

// ============================================
// Fetch Function
// ============================================
const fetchLookup = async (type: LookupType): Promise<DropdownFieldOption[]> => {
  const endpoint = lookupEndpoints[type];
  
  const response = await fetch(endpoint);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch ${type}`);
  }

  const data: LookupApiResponse[] = await response.json();
  
  return transformToDropdownOptions(data);
};

// ============================================
// Hook
// ============================================
export interface UseLookupOptionsResult {
  options: DropdownFieldOption[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export const useLookupOptions = (type: LookupType): UseLookupOptionsResult => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['lookups', type],
    queryFn: () => fetchLookup(type),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  return {
    options: data ?? [],
    isLoading,
    isError,
    error: error as Error | null
  };
};

export default useLookupOptions;
