export const OrderCardSkeleton = () => {
    return (
        <div className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl p-4">
            <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1 min-w-0 space-y-2">
                    <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
                </div>
                <div className="flex-shrink-0 text-right space-y-1">
                    <div className="h-6 bg-gray-200 rounded w-32 animate-pulse ml-auto" />
                    <div className="h-3 bg-gray-200 rounded w-16 animate-pulse ml-auto" />
                </div>
            </div>

            <div className="flex gap-1.5 mb-3">
                <div className="h-6 bg-gray-200 rounded w-16 animate-pulse" />
                <div className="h-6 bg-gray-200 rounded w-20 animate-pulse" />
                <div className="h-6 bg-gray-200 rounded w-24 animate-pulse" />
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex gap-3">
                    <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
                </div>
                <div className="h-6 bg-gray-200 rounded w-24 animate-pulse" />
            </div>
        </div>
    );
};
