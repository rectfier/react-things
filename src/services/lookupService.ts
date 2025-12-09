/**
 * Lookup Service
 * 
 * Generic service for fetching dropdown options from APIs.
 * Uses lookupConfig for endpoints and transforms.
 */

import { DropdownFieldOption } from '../ui/DropdownField';
import { LookupType, lookupConfigs } from '../config/lookupConfig';

// ============================================
// Generic Lookup Fetcher
// ============================================

/**
 * Fetch lookup options by type
 * This is the main function used by useLookupOptions hook
 */
export const fetchLookup = async (type: LookupType): Promise<DropdownFieldOption[]> => {
  const config = lookupConfigs[type];
  
  if (!config) {
    throw new Error(`Unknown lookup type: ${type}`);
  }

  const response = await fetch(config.endpoint);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch ${type}`);
  }

  const data = await response.json();
  
  // Transform the data using the configured transform function
  return config.transform(data);
};

// ============================================
// Legacy exports (for backwards compatibility)
// ============================================

export const fetchTeams = (): Promise<DropdownFieldOption[]> => fetchLookup('teams');
export const fetchDelegates = (): Promise<DropdownFieldOption[]> => fetchLookup('delegates');

// Export as object
export const lookupService = {
  fetchLookup,
  fetchTeams,
  fetchDelegates
};
