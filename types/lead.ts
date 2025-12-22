export type LeadStatus = 'Review' | 'Approved' | 'Rejected';

export interface Lead {
  id: string;
  name: string;
  company: string;
  personalizedOpener: string;
  blogTitle: string;
  website: string;
  status: LeadStatus;
}

// Helper to cycle through statuses
export const cycleStatus = (current: LeadStatus): LeadStatus => {
  const cycle: Record<LeadStatus, LeadStatus> = {
    'Review': 'Approved',
    'Approved': 'Rejected',
    'Rejected': 'Review',
  };
  return cycle[current];
};

