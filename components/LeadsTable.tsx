'use client';

import React from 'react';

import { Lead, LeadStatus, cycleStatus } from '@/types/lead';
import { StatusBadge } from './StatusBadge';

interface LeadsTableProps {
  leads: Lead[];
  onRowClick: (lead: Lead) => void;
  onStatusChange: (id: string, status: LeadStatus) => void;
  isPaid?: boolean;
  onUnlock?: () => void;
}

export function LeadsTable({ leads, onRowClick, onStatusChange, isPaid = false, onUnlock }: LeadsTableProps) {
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

  // Logic to limit rows if not paid
  // We now render ALL leads, but lock/blur those after index 2

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
            // Gradient only on the 5th lead (index 4) right before the paywall button
            const isLastBeforePaywall = !isPaid && index === 4;
            const showPaywallRow = !isPaid && index === 4;

            return (
              <React.Fragment key={lead.id}>
                <tr
                  onClick={() => !isLocked && onRowClick(lead)}
                  className={`row-glow cursor-pointer group active:bg-white/[0.02] relative ${isLocked ? 'pointer-events-none' : ''}`}
                >
                  <td className={`py-4 sm:py-5 px-4 sm:px-8 relative ${isLocked ? 'blur-[3px] select-none opacity-60' : ''}`}>
                    <span className="font-body text-white font-medium group-hover:text-lime-300 transition-colors text-sm sm:text-base">
                      {lead.name}
                    </span>
                    {isLastBeforePaywall && (
                      <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-b from-transparent to-[#0B0F19]/90 pointer-events-none z-10" />
                    )}
                  </td>
                  <td className={`py-4 sm:py-5 px-3 sm:px-6 relative ${isLocked ? 'blur-[3px] select-none opacity-60' : ''}`}>
                    <span className="font-body text-slate-400 text-sm sm:text-base">{lead.company}</span>
                    {isLastBeforePaywall && (
                      <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-b from-transparent to-[#0B0F19]/90 pointer-events-none z-10" />
                    )}
                  </td>
                  <td className={`py-4 sm:py-5 px-3 sm:px-6 max-w-md hidden sm:table-cell relative ${isLocked ? 'blur-[3px] select-none opacity-60' : ''}`}>
                    <span className="font-body text-slate-500 text-sm leading-relaxed">
                      {truncate(lead.personalizedOpener, 75)}
                    </span>
                    {isLastBeforePaywall && (
                      <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-b from-transparent to-[#0B0F19]/90 pointer-events-none z-10" />
                    )}
                  </td>
                  <td className={`py-4 sm:py-5 px-3 sm:px-6 text-center relative ${isLocked ? 'blur-[3px] select-none opacity-60' : ''}`}>
                    <button
                      onClick={(e) => handleStatusClick(e, lead)}
                      className="transition-all duration-200 hover:scale-110 active:scale-95 touch-manipulation"
                      title="Click to cycle status"
                      disabled={isLocked}
                    >
                      <StatusBadge status={lead.status} />
                    </button>
                    {isLastBeforePaywall && (
                      <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-b from-transparent to-[#0B0F19]/90 pointer-events-none z-10" />
                    )}
                  </td>
                  <td className={`py-4 sm:py-5 px-4 sm:px-8 text-center relative`}>
                    <div className={isLocked ? 'blur-[3px] select-none opacity-60' : ''}>
                      <button
                        onClick={(e) => handleDraftEmail(e, lead)}
                        disabled={isLocked}
                        className={`btn-glow inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-2 rounded-xl text-xs font-semibold font-body
                          border transition-all duration-300 touch-manipulation min-h-[44px] sm:min-h-0
                          ${isLocked
                            ? 'bg-white/[0.01] text-slate-600 border-white/[0.05]'
                            : 'bg-white/[0.03] text-cyan-400 border-cyan-500/20 hover:bg-cyan-500/10'}`}
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
                    </div>
                    {isLastBeforePaywall && (
                      <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-b from-transparent to-[#0B0F19]/90 pointer-events-none z-10" />
                    )}
                  </td>
                </tr>

                {showPaywallRow && (
                  <tr className="border-t border-white/5">
                    <td colSpan={5} className="py-8 text-center relative">
                      <div className="flex flex-col items-center justify-center p-6 bg-white/[0.02] rounded-2xl border border-white/5 mx-auto max-w-lg relative z-20">
                        <h3 className="text-xl font-display font-bold text-white mb-2">
                          Unlock All {leads.length} Leads
                        </h3>
                        <p className="text-slate-400 text-sm mb-6 max-w-sm">
                          Upgrade to premium to view all 50 verification leads, including personalized details and contact info.
                        </p>
                        {onUnlock ? (
                          <button
                            onClick={onUnlock}
                            className="px-8 py-3 bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-300 hover:to-emerald-300 text-slate-900 font-bold rounded-xl text-sm transition-all shadow-lg shadow-lime-400/20 hover:shadow-lime-400/30 transform hover:-translate-y-0.5"
                          >
                            Unlock All Leads - $99.00
                          </button>
                        ) : (
                          <div className="text-red-400 text-sm">Error: Unlock handler missing</div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
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

