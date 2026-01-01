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

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });
  
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

// ============================================
// Helper Functions
// ============================================

/**
 * Extracts selection information (IDs and names) from dropdown values
 * 
 * @param selectedValue - The current value from the dropdown (ID or comma-separated IDs)
 * @param options - Available dropdown options
 * @param isMultiselect - Whether this is a multiselect dropdown
 * @returns Object with formatted IDs and names
 */
export interface SelectionInfo {
  ids: string;      // "1,2,3" for multi, "1" for single
  names: string;    // "Name A | Name B | Name C" for multi, "Name A" for single
}

export const getSelectionInfo = (
  selectedValue: string | number | null,
  options: DropdownFieldOption[],
  isMultiselect: boolean = false
): SelectionInfo => {
  if (!selectedValue) {
    return { ids: '', names: '' };
  }

  if (isMultiselect && typeof selectedValue === 'string') {
    // Parse comma-separated IDs
    const selectedIds = selectedValue.split(',').map(v => v.trim()).filter(Boolean);
    
    const selectedOptions = options.filter(opt => 
      selectedIds.includes(String(opt.value))
    );
    
    const ids = selectedOptions.map(opt => String(opt.value)).join(',');
    const names = selectedOptions.map(opt => opt.label).join(' | ');
    
    return { ids, names };
  } else {
    // Single select
    const selectedOption = options.find(opt => opt.value === selectedValue);
    
    if (selectedOption) {
      return {
        ids: String(selectedOption.value),
        names: selectedOption.label
      };
    }
  }

  return { ids: '', names: '' };
};

export default useLookupOptions;
