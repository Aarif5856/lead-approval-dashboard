'use client';

import { LeadStatus } from '@/types/lead';

interface StatusBadgeProps {
  status: LeadStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const baseClasses = 'px-4 py-1.5 rounded-full text-xs font-bold font-body uppercase tracking-widest transition-all duration-300';
  
  const statusClasses: Record<LeadStatus, string> = {
    Review: 'neon-lavender',
    Approved: 'neon-lime',
    Rejected: 'neon-rose',
  };

  return (
    <span className={`${baseClasses} ${statusClasses[status]}`}>
      {status}
    </span>
  );
}

