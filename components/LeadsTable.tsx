'use client';

import React from 'react';

import { Lead, LeadStatus, cycleStatus } from '@/types/lead';
import { StatusBadge } from './StatusBadge';
import { CircleCheck } from 'lucide-react';

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
  // If not paid, we ONLY render the first 5 rows + paywall.
  // Rows 6-50 are NOT rendered at all (hidden).
  const visibleLeads = !isPaid ? leads.slice(0, 5) : leads;
  const showPaywall = !isPaid && leads.length > 5;

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
          {visibleLeads.map((lead, index) => {
            // No more blurring logic needed for rows 6-50 as they are not rendered.
            // But we might want to ensure rows 0-4 are fully interactive and clear.
            const isLocked = false;

            // Gradient only on the last visible row (index 4) right before the paywall
            const isLastVisible = !isPaid && index === 4;

            return (
              <React.Fragment key={lead.id}>
                <tr
                  onClick={() => onRowClick(lead)}
                  className={`row-glow cursor-pointer group active:bg-white/[0.02] relative`}
                >
                  <td className="py-4 sm:py-5 px-4 sm:px-8 relative">
                    <div className="flex items-center gap-2">
                      <span className="font-body text-white font-medium group-hover:text-lime-300 transition-colors text-sm sm:text-base">
                        {lead.name}
                      </span>
                      {index < 5 && (
                        <div className="group/icon relative flex items-center">
                          <CircleCheck className="w-4 h-4 text-emerald-400" />
                          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded whitespace-nowrap opacity-0 group-hover/icon:opacity-100 transition-opacity pointer-events-none border border-white/10 shadow-xl z-20">
                            Human-Verified by ResearchScoutAI Team
                          </div>
                        </div>
                      )}
                    </div>
                    {isLastVisible && (
                      <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-b from-transparent to-[#0B0F19] pointer-events-none z-10" />
                    )}
                  </td>
                  <td className="py-4 sm:py-5 px-3 sm:px-6 relative">
                    <span className="font-body text-slate-400 text-sm sm:text-base">{lead.company}</span>
                    {isLastVisible && (
                      <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-b from-transparent to-[#0B0F19] pointer-events-none z-10" />
                    )}
                  </td>
                  <td className="py-4 sm:py-5 px-3 sm:px-6 max-w-md hidden sm:table-cell relative">
                    <span className="font-body text-slate-500 text-sm leading-relaxed">
                      {truncate(lead.personalizedOpener, 75)}
                    </span>
                    {isLastVisible && (
                      <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-b from-transparent to-[#0B0F19] pointer-events-none z-10" />
                    )}
                  </td>
                  <td className="py-4 sm:py-5 px-3 sm:px-6 text-center relative">
                    <button
                      onClick={(e) => handleStatusClick(e, lead)}
                      className="transition-all duration-200 hover:scale-110 active:scale-95 touch-manipulation"
                      title="Click to cycle status"
                    >
                      <StatusBadge status={lead.status} />
                    </button>
                    {isLastVisible && (
                      <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-b from-transparent to-[#0B0F19] pointer-events-none z-10" />
                    )}
                  </td>
                  <td className="py-4 sm:py-5 px-4 sm:px-8 text-center relative">
                    <button
                      onClick={(e) => handleDraftEmail(e, lead)}
                      className="btn-glow inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-2 rounded-xl text-xs font-semibold font-body
                        border transition-all duration-300 touch-manipulation min-h-[44px] sm:min-h-0
                        bg-white/[0.03] text-cyan-400 border-cyan-500/20 hover:bg-cyan-500/10"
                      title="Open email draft"
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
                      <span className="hidden xs:inline">Draft</span> {window.innerWidth > 640 && 'Email'}
                    </button>
                    {isLastVisible && (
                      <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-b from-transparent to-[#0B0F19] pointer-events-none z-10" />
                    )}
                  </td>
                </tr>

                {/* Paywall Row - shows up immediately after the 5th item (index 4) */}
                {isLastVisible && showPaywall && (
                  <tr className="border-t border-white/5">
                    <td colSpan={5} className="py-8 text-center relative">
                      <div className="flex flex-col items-center justify-center p-6 bg-white/[0.02] rounded-2xl border border-white/5 mx-auto max-w-lg relative z-20">
                        <h3 className="text-xl font-display font-bold text-white mb-2">
                          Unlock {leads.length - 5} More Leads
                        </h3>
                        <p className="text-slate-400 text-sm mb-6 max-w-sm">
                          Upgrade to premium to view all 50 verified leads, including personalized details and contact info.
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

