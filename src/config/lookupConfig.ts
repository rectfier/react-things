/**
 * Lookup Configuration
 * 
 * Centralized config for all dropdown field data sources.
 * Add new lookup types here and they'll automatically work with useLookupOptions hook.
 */

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
// Transform Functions
// ============================================

// JSONPlaceholder user type (common API response)
interface ApiUser {
  id: number;
  name: string;
  username: string;
  email: string;
  company: {
    name: string;
  };
}

// Transform functions for different lookup types
const transformTeams = (users: ApiUser[]): DropdownFieldOption[] => 
  users.map((user) => ({
    label: `${user.company.name} Team`,
    value: `team-${user.id}`
  }));

const transformDelegates = (users: ApiUser[]): DropdownFieldOption[] => 
  users.map((user) => ({
    label: user.name,
    value: user.username
  }));

const transformCategories = (users: ApiUser[]): DropdownFieldOption[] => 
  users.slice(0, 5).map((user, index) => ({
    label: ['Market Research', 'Clinical Trial', 'Product Launch', 'Competitive Analysis', 'Regulatory Study'][index],
    value: ['market-research', 'clinical-trial', 'product-launch', 'competitive-analysis', 'regulatory-study'][index]
  }));

const transformMarkets = (users: ApiUser[]): DropdownFieldOption[] => 
  users.slice(0, 8).map((user, index) => ({
    label: ['Germany', 'France', 'United Kingdom', 'Spain', 'Italy', 'United States', 'Canada', 'Japan'][index],
    value: ['germany', 'france', 'uk', 'spain', 'italy', 'usa', 'canada', 'japan'][index]
  }));

const transformBuStakeholders = (users: ApiUser[]): DropdownFieldOption[] => 
  users.slice(0, 5).map((user, index) => ({
    label: ['Global Oncology Marketing & Sales', 'Cardiovascular Business Unit', 'Neurology Division', 'Immunology Unit', 'Rare Diseases'][index],
    value: ['global-oncology', 'cardiovascular', 'neurology', 'immunology', 'rare-diseases'][index]
  }));

const transformRespondentTypes = (users: ApiUser[]): DropdownFieldOption[] => 
  users.slice(0, 5).map((user, index) => ({
    label: ['Healthcare Professionals', 'Patients', 'Caregivers', 'Payers', 'Key Opinion Leaders'][index],
    value: ['hcp', 'patients', 'caregivers', 'payers', 'kol'][index]
  }));

// ============================================
// Lookup Configuration Map
// ============================================

export interface LookupConfig {
  endpoint: string;
  transform: (data: ApiUser[]) => DropdownFieldOption[];
  staleTime?: number; // Cache time in milliseconds
}

export const lookupConfigs: Record<LookupType, LookupConfig> = {
  teams: {
    endpoint: 'https://jsonplaceholder.typicode.com/users',
    transform: transformTeams,
    staleTime: 5 * 60 * 1000, // 5 minutes
  },
  delegates: {
    endpoint: 'https://jsonplaceholder.typicode.com/users',
    transform: transformDelegates,
    staleTime: 5 * 60 * 1000,
  },
  categories: {
    endpoint: 'https://jsonplaceholder.typicode.com/users',
    transform: transformCategories,
    staleTime: 10 * 60 * 1000, // 10 minutes - more static data
  },
  markets: {
    endpoint: 'https://jsonplaceholder.typicode.com/users',
    transform: transformMarkets,
    staleTime: 10 * 60 * 1000,
  },
  buStakeholders: {
    endpoint: 'https://jsonplaceholder.typicode.com/users',
    transform: transformBuStakeholders,
    staleTime: 10 * 60 * 1000,
  },
  respondentTypes: {
    endpoint: 'https://jsonplaceholder.typicode.com/users',
    transform: transformRespondentTypes,
    staleTime: 10 * 60 * 1000,
  },
};

