'use client';

export function SkeletonLoader() {
  return (
    <div className="animate-pulse">
      {/* Header Skeleton */}
      <div className="mb-12">
        <div className="flex items-start justify-between mb-10">
          <div>
            <div className="h-12 w-64 bg-white/5 rounded-xl mb-3" />
            <div className="h-5 w-80 bg-white/[0.03] rounded-lg" />
          </div>
          <div className="h-12 w-48 bg-white/5 rounded-2xl" />
        </div>

        {/* Bento Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bento-item rounded-2xl p-6"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="h-4 w-24 bg-white/5 rounded-md" />
                <div className="w-3 h-3 rounded-full bg-white/10" />
              </div>
              <div className="flex items-baseline gap-2">
                <div className="h-12 w-16 bg-white/5 rounded-lg" />
                <div className="h-4 w-12 bg-white/[0.03] rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="bento-item rounded-3xl overflow-hidden">
        {/* Header row */}
        <div className="flex gap-4 p-6 border-b border-white/5">
          <div className="h-4 w-20 bg-white/5 rounded-md" />
          <div className="h-4 w-24 bg-white/5 rounded-md" />
          <div className="h-4 w-40 bg-white/5 rounded-md flex-1" />
          <div className="h-4 w-16 bg-white/5 rounded-md" />
          <div className="h-4 w-20 bg-white/5 rounded-md" />
        </div>

        {/* Table rows */}
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-6 border-b border-white/[0.03] last:border-b-0"
            style={{ animationDelay: `${0.3 + i * 0.05}s` }}
          >
            {/* Name */}
            <div className="w-32">
              <div className="h-5 w-28 bg-white/5 rounded-md" />
            </div>
            {/* Company */}
            <div className="w-40">
              <div className="h-5 w-32 bg-white/[0.03] rounded-md" />
            </div>
            {/* Opener */}
            <div className="flex-1">
              <div className="h-4 w-full max-w-md bg-white/[0.02] rounded-md mb-1.5" />
              <div className="h-4 w-3/4 bg-white/[0.02] rounded-md" />
            </div>
            {/* Status */}
            <div className="w-24 flex justify-center">
              <div className="h-8 w-20 bg-white/5 rounded-full" />
            </div>
            {/* Action */}
            <div className="w-28 flex justify-center">
              <div className="h-9 w-24 bg-white/[0.03] rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

