'use client';

import { Lead, LeadStatus, cycleStatus } from '@/types/lead';
import { StatusBadge } from './StatusBadge';

interface LeadsTableProps {
  leads: Lead[];
  onRowClick: (lead: Lead) => void;
  onStatusChange: (id: string, status: LeadStatus) => void;
  isPaid?: boolean;
}

export function LeadsTable({ leads, onRowClick, onStatusChange, isPaid = false }: LeadsTableProps) {
  const truncate = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  const handleStatusClick = (e: React.MouseEvent, lead: Lead) => {
    e.stopPropagation(); // Prevent row click
    onStatusChange(lead.id, cycleStatus(lead.status));
  };

  const handleDraftEmail = (e: React.MouseEvent, lead: Lead) => {
    e.stopPropagation(); // Prevent row click
    const subject = encodeURIComponent(`Quick question regarding ${lead.company}`);
    const blogReference = lead.blogTitle ? `I recently read your article on "${lead.blogTitle}" and found it very insightful. ` : '';
    const body = encodeURIComponent(`Hi ${lead.name.split(' ')[0]},\n\n${blogReference}${lead.personalizedOpener}`);
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <div className="overflow-hidden min-w-full">
      <table className="w-full min-w-[800px]">
        <thead>
          <tr className="border-b border-white/5">
            <th className="text-left py-4 sm:py-5 px-4 sm:px-8 font-body text-xs font-semibold uppercase tracking-widest text-slate-500">
              Name
            </th>
            <th className="text-left py-4 sm:py-5 px-3 sm:px-6 font-body text-xs font-semibold uppercase tracking-widest text-slate-500">
              Company
            </th>
            <th className="text-left py-4 sm:py-5 px-3 sm:px-6 font-body text-xs font-semibold uppercase tracking-widest text-slate-500 hidden sm:table-cell">
              Personalized Opener
            </th>
            <th className="text-center py-4 sm:py-5 px-3 sm:px-6 font-body text-xs font-semibold uppercase tracking-widest text-slate-500">
              Status
            </th>
            <th className="text-center py-4 sm:py-5 px-4 sm:px-8 font-body text-xs font-semibold uppercase tracking-widest text-slate-500">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.03]">
          {leads.map((lead, index) => {
            const isLocked = !isPaid && index >= 3;

            return (
              <tr
                key={lead.id}
                onClick={() => onRowClick(lead)}
                className={`row-glow cursor-pointer group active:bg-white/[0.02] relative ${isLocked ? 'pointer-events-none' : ''}`}
              >
                <td className={`py-4 sm:py-5 px-4 sm:px-8 ${isLocked ? 'blur-sm select-none' : ''}`}>
                  <span className="font-body text-white font-medium group-hover:text-lime-300 transition-colors text-sm sm:text-base">
                    {lead.name}
                  </span>
                </td>
                <td className={`py-4 sm:py-5 px-3 sm:px-6 ${isLocked ? 'blur-sm select-none' : ''}`}>
                  <span className="font-body text-slate-400 text-sm sm:text-base">{lead.company}</span>
                </td>
                <td className={`py-4 sm:py-5 px-3 sm:px-6 max-w-md hidden sm:table-cell ${isLocked ? 'blur-sm select-none' : ''}`}>
                  <span className="font-body text-slate-500 text-sm leading-relaxed">
                    {truncate(lead.personalizedOpener, 75)}
                  </span>
                </td>
                <td className={`py-4 sm:py-5 px-3 sm:px-6 text-center ${isLocked ? 'blur-sm select-none' : ''}`}>
                  <button
                    onClick={(e) => handleStatusClick(e, lead)}
                    className="transition-all duration-200 hover:scale-110 active:scale-95 touch-manipulation"
                    title="Click to cycle status"
                    disabled={isLocked}
                  >
                    <StatusBadge status={lead.status} />
                  </button>
                </td>
                <td className="py-4 sm:py-5 px-4 sm:px-8 text-center">
                  <button
                    onClick={(e) => handleDraftEmail(e, lead)}
                    disabled={isLocked}
                    className={`btn-glow inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-2 rounded-xl text-xs font-semibold font-body
                      border transition-all duration-300 touch-manipulation min-h-[44px] sm:min-h-0
                      ${isLocked
                        ? 'bg-white/[0.01] text-slate-600 border-white/[0.05] blur-[2px]'
                        : 'bg-white/[0.03] text-cyan-400 border-cyan-500/20 hover:bg-cyan-500/10'
                      }`}
                    title={isLocked ? "Unlock to draft email" : "Open email draft"}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="flex-shrink-0"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <span className="hidden xs:inline">{isLocked ? 'Locked' : 'Draft'}</span> {(!isLocked || window.innerWidth > 640) && 'Email'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {leads.length === 0 && (
        <div className="py-16 text-center font-body text-slate-500">
          No leads to display
        </div>
      )}
    </div>
  );
}

