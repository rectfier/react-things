/**
 * Lookup Service
 * 
 * Note: The main lookup functionality is now in useLookupOptions hook.
 * This file is kept for backwards compatibility and direct service calls if needed.
 */

import { DropdownFieldOption } from '../ui/DropdownField';

// API Response Type (same for all lookups)
interface LookupApiResponse {
  Id: number;
  value: string;
  isActive: number;
}

// Transform function
const transformToDropdownOptions = (data: LookupApiResponse[]): DropdownFieldOption[] => 
  data
    .filter(item => item.isActive === 1)
    .map(item => ({
      label: item.value,
      value: item.Id
    }));

/**
 * Generic fetch lookup function
 */
export const fetchLookup = async (endpoint: string): Promise<DropdownFieldOption[]> => {
  const response = await fetch(endpoint);
  
  if (!response.ok) {
    throw new Error('Failed to fetch lookup data');
  }

  const data: LookupApiResponse[] = await response.json();
  return transformToDropdownOptions(data);
};

// Legacy exports
export const fetchTeams = (): Promise<DropdownFieldOption[]> => 
  fetchLookup('https://jsonplaceholder.typicode.com/users');

export const fetchDelegates = (): Promise<DropdownFieldOption[]> => 
  fetchLookup('https://jsonplaceholder.typicode.com/users');

export const lookupService = {
  fetchLookup,
  fetchTeams,
  fetchDelegates
};
