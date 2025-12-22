'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Papa from 'papaparse';
import { Lead, LeadStatus } from '@/types/lead';
import { LeadsTable } from './LeadsTable';
import { SidePanel } from './SidePanel';
import { DownloadButton } from './DownloadButton';
import { EmptyState } from './EmptyState';
import { SkeletonLoader } from './SkeletonLoader';
import { PayPalCheckout } from './PayPalCheckout';

interface CSVRow {
  Name: string;
  Company: string;
  Website: string;
  'Latest Blog Title': string;
  'Personalized Opener': string;
}

const STORAGE_KEY = 'lead-approval-data';

// Load saved leads from localStorage
const loadSavedLeads = (): Lead[] | null => {
  if (typeof window === 'undefined') return null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

// Save leads to localStorage
const saveLeads = (leads: Lead[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export function DashboardComponent() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const initialLoadDone = useRef(false);

  // Load leads from localStorage or fetch from CSV on initial mount
  useEffect(() => {
    // Check localStorage first for existing data
    const savedLeads = loadSavedLeads();

    if (savedLeads && savedLeads.length > 0) {
      // Use cached leads from localStorage (enables offline use)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLeads(savedLeads);
      setIsLoaded(true);
      initialLoadDone.current = true;
    } else {
      // No cached data, fetch and parse the CSV file using PapaParse
      fetch('/leads.csv')
        .then(response => response.text())
        .then(csvText => {
          Papa.parse<CSVRow>(csvText, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
              const parsedLeads: Lead[] = results.data
                .filter(row => row.Name && row.Name.trim() !== '')
                .map((row, index) => {
                  // Simple string concatenation for ID
                  const id = 'lead-' + (index + 1);
                  return {
                    id: id,
                    name: row.Name || '',
                    company: row.Company || '',
                    personalizedOpener: row['Personalized Opener'] || '',
                    blogTitle: row['Latest Blog Title'] || '',
                    website: row.Website || '',
                    status: 'Review' as LeadStatus,
                  };
                });
              setLeads(parsedLeads);
              setIsLoaded(true);
              initialLoadDone.current = true;
            },
            error: (error: unknown) => {
              console.error('Error parsing CSV:', error);
              setIsLoaded(true);
              initialLoadDone.current = true;
            }
          });
        })
        .catch(error => {
          console.error('Error fetching CSV:', error);
          setIsLoaded(true);
          initialLoadDone.current = true;
        });
    }
  }, []);

  // Save leads to localStorage whenever they change (after initial load)
  useEffect(() => {
    if (initialLoadDone.current && leads.length > 0) {
      saveLeads(leads);
    }
  }, [leads]);

  const handleRowClick = (lead: Lead) => {
    // Find index of lead
    const index = leads.findIndex(l => l.id === lead.id);

    // If not paid and index >= 3, show checkout instead of panel
    if (!isPaid && index >= 3) {
      setShowCheckout(true);
      return;
    }

    setSelectedLead(lead);
  };

  const handleClosePanel = () => {
    setSelectedLead(null);
  };

  const handleStatusChange = useCallback((id: string, newStatus: LeadStatus) => {
    setLeads(prevLeads =>
      prevLeads.map(lead =>
        lead.id === id ? { ...lead, status: newStatus } : lead
      )
    );
    // Update the selected lead as well
    setSelectedLead(prev =>
      prev && prev.id === id ? { ...prev, status: newStatus } : prev
    );
  }, []);

  const approvedCount = leads.filter(l => l.status === 'Approved').length;
  const rejectedCount = leads.filter(l => l.status === 'Rejected').length;
  const reviewCount = leads.filter(l => l.status === 'Review').length;

  // Check if all leads are processed (none in Review status)
  const allProcessed = isLoaded && leads.length > 0 && reviewCount === 0;

  return (
    <main className="min-h-screen premium-bg grid-pattern">
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          {/* Loading Skeleton */}
          {!isLoaded && <SkeletonLoader />}

          {/* Main Content */}
          {isLoaded && (
            <>
              {/* Header */}
              <header className="mb-8 sm:mb-10 lg:mb-12 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6 mb-8 sm:mb-10">
                  <div>
                    <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3 tracking-tight">
                      ResearchScoutAI
                    </h1>
                    <p className="font-body text-slate-400 text-base sm:text-lg">
                      Unlock premium lead research and approvals
                    </p>
                  </div>
                  <DownloadButton leads={leads} />
                </div>

                {/* Bento Grid Metrics - Stack on mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  {/* Review Card */}
                  <div className="bento-item rounded-2xl p-4 sm:p-6 animate-fade-in stagger-1">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <span className="font-body text-xs sm:text-sm font-medium text-slate-500 uppercase tracking-wider">
                        Pending Review
                      </span>
                      <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-violet-500 shadow-lg shadow-violet-500/50" />
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-4xl sm:text-5xl font-bold text-white">{reviewCount}</span>
                      <span className="font-body text-slate-500 text-sm sm:text-base">leads</span>
                    </div>
                  </div>

                  {/* Approved Card */}
                  <div className="bento-item rounded-2xl p-4 sm:p-6 animate-fade-in stagger-2">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <span className="font-body text-xs sm:text-sm font-medium text-slate-500 uppercase tracking-wider">
                        Approved
                      </span>
                      <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-lime-400 shadow-lg shadow-lime-400/50" />
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-4xl sm:text-5xl font-bold text-lime-400">{approvedCount}</span>
                      <span className="font-body text-slate-500 text-sm sm:text-base">leads</span>
                    </div>
                  </div>

                  {/* Rejected Card */}
                  <div className="bento-item rounded-2xl p-4 sm:p-6 animate-fade-in stagger-3">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <span className="font-body text-xs sm:text-sm font-medium text-slate-500 uppercase tracking-wider">
                        Rejected
                      </span>
                      <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-rose-400 shadow-lg shadow-rose-400/50" />
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-4xl sm:text-5xl font-bold text-rose-400">{rejectedCount}</span>
                      <span className="font-body text-slate-500 text-sm sm:text-base">leads</span>
                    </div>
                  </div>
                </div>
              </header>

              {/* Table or Empty State */}
              <div className="bento-item rounded-2xl sm:rounded-3xl overflow-hidden animate-fade-in stagger-4 relative">
                {allProcessed ? (
                  <EmptyState />
                ) : (
                  <div className="overflow-x-auto relative min-h-[400px]">
                    {/* Overlay for blocked content visual */}
                    {!isPaid && leads.length > 3 && (
                      <div className="absolute inset-x-0 bottom-0 top-[200px] z-10 bg-gradient-to-b from-transparent to-slate-900/90 pointer-events-none" />
                    )}

                    <LeadsTable
                      leads={leads}
                      onRowClick={handleRowClick}
                      onStatusChange={handleStatusChange}
                      isPaid={isPaid}
                    />

                    {!isPaid && leads.length > 3 && (
                      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center p-4">
                        <div className="bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-2xl max-w-sm text-center">
                          <h3 className="text-white font-bold text-lg mb-2">Unlock All {leads.length} Leads</h3>
                          <p className="text-slate-400 text-sm mb-4">Upgrade to premium to view all verified research data.</p>
                          <button
                            onClick={() => setShowCheckout(true)}
                            className="w-full py-3 px-6 bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-400 hover:to-fuchsia-400 text-white font-semibold rounded-xl text-sm transition-all shadow-lg hover:shadow-violet-500/25"
                          >
                            Unlock Now - $99.00
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* PayPal Checkout Modal */}
        {showCheckout && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="relative w-full max-w-md">
              <button
                onClick={() => setShowCheckout(false)}
                className="absolute -top-12 right-0 text-white/70 hover:text-white"
              >
                Close
              </button>
              <PayPalCheckout onSuccess={() => {
                setIsPaid(true);
                setShowCheckout(false);
              }} />
            </div>
          </div>
        )}

        {/* Side Panel */}
        <SidePanel
          lead={selectedLead}
          onClose={handleClosePanel}
          onStatusChange={handleStatusChange}
        />
      </div>
    </main>
  );
}

// Ensure default export is not used if we export named component
// But we need to use it in page.tsx
export default DashboardComponent;