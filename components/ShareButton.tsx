'use client';

import { useState } from 'react';
import { Share2, Check } from 'lucide-react';

export function ShareButton() {
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        const url = window.location.href;
        const title = 'ResearchScoutAI - Verified SaaS Leads';
        const text = 'Check out this list of 50 verified SaaS founder leads with personalized openers.';

        // Try Native Share API first (Mobile)
        if (navigator.share) {
            try {
                await navigator.share({
                    title,
                    text,
                    url,
                });
                return;
            } catch (error) {
                console.log('Error sharing:', error);
            }
        }

        // Fallback to Clipboard (Desktop)
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <button
            onClick={handleShare}
            className={`
        flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold font-body text-sm
        transition-all duration-300 ease-out border
        ${copied
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    : 'bg-white/[0.03] text-slate-300 border-white/10 hover:bg-white/[0.08] hover:text-white hover:border-white/20'
                }
      `}
        >
            {copied ? (
                <Check className="w-4 h-4" />
            ) : (
                <Share2 className="w-4 h-4" />
            )}
            {copied ? 'Copied Link' : 'Share'}
        </button>
    );
}
