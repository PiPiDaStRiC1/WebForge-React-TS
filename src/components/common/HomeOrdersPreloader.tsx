export const HomeOrdersPreloader = () => (
    <div 
        className="bg-white p-6 rounded-2xl border border-gray-200"
    >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
            <div className="h-6 bg-gray-200 rounded-lg w-24 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
        </div>
        
        {/* Title */}
        <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse mb-2" />
        
        {/* Description */}
        <div className="mb-4 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
        </div>
        
        {/* Footer */}
        <div className="pt-4 border-t border-gray-100">
            <div className="h-7 bg-gray-200 rounded w-28 animate-pulse" />
        </div>
    </div>
)