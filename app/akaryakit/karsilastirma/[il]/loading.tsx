export default function IlLoading() {
  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-10 animate-pulse">
      {/* Tasarruf banner skeleton */}
      <div className="h-16 bg-gray-200 dark:bg-gray-800 rounded-xl mb-6" />

      {/* 3-card skeleton */}
      <div className="grid grid-cols-3 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800/60 shadow-sm mb-6">
        {[0, 1, 2].map((i) => (
          <div key={i} className="bg-white dark:bg-[#0F1829] px-5 py-6 border-r border-gray-100 dark:border-gray-800 last:border-r-0">
            <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
            <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-3" />
            <div className="h-4 w-20 bg-gray-100 dark:bg-gray-800 rounded" />
          </div>
        ))}
      </div>

      {/* Table skeleton */}
      <div className="rounded-[14px] border border-gray-200 dark:border-gray-800/60 shadow-sm overflow-hidden">
        <div className="h-10 bg-[#0C447C] dark:bg-[#0A1F3D]" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex gap-4 px-4 py-4 border-t border-gray-100 dark:border-gray-800/50 bg-white dark:bg-[#0F1829]">
            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-4 w-20 bg-gray-100 dark:bg-gray-800 rounded ml-auto" />
            <div className="h-4 w-20 bg-gray-100 dark:bg-gray-800 rounded" />
            <div className="h-4 w-16 bg-gray-100 dark:bg-gray-800 rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}
