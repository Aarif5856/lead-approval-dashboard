'use client';

import { Lead, LeadStatus } from '@/types/lead';
import { StatusBadge } from './StatusBadge';

interface SidePanelProps {
  lead: Lead | null;
  onClose: () => void;
  onStatusChange: (id: string, status: LeadStatus) => void;
}

export function SidePanel({ lead, onClose, onStatusChange }: SidePanelProps) {
  if (!lead) return null;

  const handleDraftEmail = () => {
    const subject = encodeURIComponent(`Quick question regarding ${lead.company}`);
    const blogReference = lead.blogTitle ? `I recently read your article on "${lead.blogTitle}" and found it very insightful. ` : '';
    const body = encodeURIComponent(`Hi ${lead.name.split(' ')[0]},\n\n${blogReference}${lead.personalizedOpener}`);
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-md z-40 animate-backdrop-fade"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="fixed top-0 right-0 h-full w-full max-w-xl glass-card border-l border-white/10 shadow-2xl z-50 animate-spring-slide-in overflow-hidden flex flex-col"
        style={{ background: 'linear-gradient(135deg, rgba(10, 15, 26, 0.98), rgba(3, 7, 18, 0.99))' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-white/5">
          <div className="flex items-center gap-4">
            <h2 className="font-display text-2xl font-bold text-white">{lead.name}</h2>
            <StatusBadge status={lead.status} />
          </div>
          <button
            onClick={onClose}
            className="p-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {/* Company & Website */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <label className="font-body text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2 block">
                Company
              </label>
              <p className="font-display text-xl font-semibold text-white">{lead.company}</p>
            </div>
            {lead.website && lead.website !== 'N/A' && (
              <a
                href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold font-body
                  bg-white/[0.03] text-slate-300 border border-white/10
                  transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Visit Website
              </a>
            )}
          </div>

          {/* Trust Panel - Research Receipts */}
          <div className="bento-item rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 rounded-lg bg-lime-400/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-lime-400"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <line x1="10" y1="9" x2="8" y2="9" />
                </svg>
              </div>
              <h3 className="font-display text-sm font-bold uppercase tracking-widest text-lime-400">
                Research Receipts
              </h3>
            </div>

            {/* Latest Blog Title */}
            <div className="mb-5">
              <label className="font-body text-xs font-medium text-slate-500 mb-2 block">
                Latest Blog Title Found
              </label>
              <p className="font-body text-white font-medium bg-white/[0.03] p-4 rounded-xl border border-white/5">
                {lead.blogTitle || 'No blog title available'}
              </p>
            </div>

            {/* Source Verification */}
            {lead.website && lead.website !== 'N/A' && (
              <div>
                <label className="font-body text-xs font-medium text-slate-500 mb-2 block">
                  Source Website
                </label>
                <a
                  href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-cyan-400 hover:text-cyan-300 text-sm underline underline-offset-4 break-all transition-colors"
                >
                  {lead.website}
                </a>
              </div>
            )}
          </div>

          {/* Personalized Opener */}
          <div>
            <label className="font-body text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3 block">
              Personalized Opener
            </label>
            <p className="font-body text-slate-300 leading-relaxed bg-white/[0.02] p-5 rounded-2xl border border-white/5">
              {lead.personalizedOpener}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="p-8 border-t border-white/5 bg-black/30 backdrop-blur-xl space-y-4">
          {/* Draft Email Button */}
          <button
            onClick={handleDraftEmail}
            className="btn-glow w-full py-4 px-6 rounded-2xl font-semibold font-body transition-all duration-300
              bg-white/[0.03] text-cyan-400 border border-cyan-500/20
              flex items-center justify-center gap-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            Draft Email to {lead.name.split(' ')[0]}
          </button>

          {/* Approve/Reject Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => onStatusChange(lead.id, 'Rejected')}
              disabled={lead.status === 'Rejected'}
              className={`
                flex-1 py-4 px-6 rounded-2xl font-semibold font-body transition-all duration-300
                ${lead.status === 'Rejected'
                  ? 'neon-rose cursor-not-allowed opacity-60'
                  : 'bg-white/[0.03] text-slate-300 border border-white/10 hover:border-rose-400/50 hover:text-rose-400 hover:bg-rose-400/5'
                }
              `}
            >
              Reject
            </button>
            <button
              onClick={() => onStatusChange(lead.id, 'Approved')}
              disabled={lead.status === 'Approved'}
              className={`
                flex-1 py-4 px-6 rounded-2xl font-bold font-body transition-all duration-300
                ${lead.status === 'Approved'
                  ? 'neon-lime cursor-not-allowed opacity-60'
                  : 'bg-gradient-to-r from-lime-400 to-lime-500 text-slate-900 hover:from-lime-300 hover:to-lime-400 hover:shadow-lg hover:shadow-lime-400/30 hover:scale-[1.02]'
                }
              `}
            >
              Approve
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
