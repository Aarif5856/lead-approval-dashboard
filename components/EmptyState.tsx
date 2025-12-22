'use client';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-8">
      {/* Animated Illustration */}
      <div className="relative mb-8">
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-lime-400/20 to-cyan-400/20 blur-3xl animate-pulse" />
        
        {/* Main circle */}
        <div className="relative w-40 h-40 rounded-full bg-gradient-to-br from-lime-400/10 to-cyan-400/5 border border-lime-400/20 flex items-center justify-center">
          {/* Checkmark */}
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-lime-400 animate-confetti-pop"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            
            {/* Sparkles */}
            <div className="absolute -top-2 -right-2 w-3 h-3 rounded-full bg-lime-400 animate-ping" />
            <div className="absolute -bottom-1 -left-3 w-2 h-2 rounded-full bg-cyan-400 animate-ping" style={{ animationDelay: '0.5s' }} />
            <div className="absolute top-1/2 -right-4 w-2 h-2 rounded-full bg-violet-400 animate-ping" style={{ animationDelay: '1s' }} />
          </div>
        </div>
        
        {/* Orbiting particles */}
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '8s' }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-2 h-2 rounded-full bg-lime-400/60" />
        </div>
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }}>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 w-1.5 h-1.5 rounded-full bg-cyan-400/60" />
        </div>
      </div>

      {/* Text Content */}
      <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 text-center">
        All Caught Up!
      </h2>
      <p className="font-body text-slate-400 text-center max-w-md mb-8 text-lg">
        You&apos;ve processed all your leads. Time to find more prospects with{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-cyan-400 font-semibold">
          Antigravity
        </span>
      </p>

      {/* CTA Button */}
      <button className="group relative px-8 py-4 rounded-2xl font-semibold font-body text-slate-900 bg-gradient-to-r from-lime-400 to-lime-500 hover:from-lime-300 hover:to-lime-400 transition-all duration-300 hover:shadow-lg hover:shadow-lime-400/30 hover:scale-[1.02]">
        <span className="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          Find More Leads
        </span>
      </button>

      {/* Stats summary */}
      <div className="mt-12 flex items-center gap-8 text-center">
        <div className="bento-item rounded-xl px-6 py-4">
          <div className="font-display text-2xl font-bold text-lime-400">0</div>
          <div className="font-body text-xs text-slate-500 uppercase tracking-wider">Pending</div>
        </div>
        <div className="font-body text-slate-600">•</div>
        <div className="text-slate-400 font-body text-sm">
          All leads have been reviewed
        </div>
      </div>
    </div>
  );
}

