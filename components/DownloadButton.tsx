'use client';

import { Lead } from '@/types/lead';
import { downloadCSV } from '@/lib/csv-utils';

interface DownloadButtonProps {
  leads: Lead[];
}

export function DownloadButton({ leads }: DownloadButtonProps) {
  const approvedLeads = leads.filter(lead => lead.status === 'Approved');
  
  const handleDownload = () => {
    if (approvedLeads.length === 0) {
      return;
    }
    downloadCSV(approvedLeads, 'approved-leads.csv');
  };

  return (
    <button
      onClick={handleDownload}
      disabled={approvedLeads.length === 0}
      className={`
        flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold font-body text-sm
        transition-all duration-300 ease-out
        ${approvedLeads.length > 0
          ? 'bg-gradient-to-r from-lime-400 to-lime-500 text-slate-900 hover:from-lime-300 hover:to-lime-400 hover:shadow-lg hover:shadow-lime-400/30 hover:scale-[1.02] active:scale-95'
          : 'bg-white/[0.03] text-slate-600 border border-white/5 cursor-not-allowed'
        }
      `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      Download Approved
      {approvedLeads.length > 0 && (
        <span className="bg-slate-900/30 px-2.5 py-1 rounded-lg text-xs font-bold">
          {approvedLeads.length}
        </span>
      )}
    </button>
  );
}

