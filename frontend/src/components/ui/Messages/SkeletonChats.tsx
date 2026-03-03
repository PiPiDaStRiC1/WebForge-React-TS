export const SkeletonChats = () => {
    return (
        <section className="relative -mt-10">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-12 h-[calc(100vh-300px)] min-h-[600px]">
                        {/* Left Sidebar - Chat List Skeleton */}
                        <div className="lg:col-span-4 border-r border-gray-200 flex flex-col">
                            {/* Search Skeleton */}
                            <div className="p-4 border-b border-gray-200 bg-white/50">
                                <div className="h-10 bg-gray-200 rounded-xl animate-pulse" />
                            </div>

                            {/* Chat Items Skeleton */}
                            <div className="flex-1 overflow-y-auto">
                                {[...Array(8)].map((_, index) => (
                                    <div
                                        key={index}
                                        className="p-4 flex items-start gap-3 border-b border-gray-100 bg-white/30 animate-pulse"
                                        style={{animationDelay: `${index * 50}ms`}}
                                    >
                                        {/* Avatar Skeleton */}
                                        <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0" />

                                        {/* Content Skeleton */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="h-4 bg-gray-200 rounded w-32" />
                                                <div className="h-3 bg-gray-200 rounded w-12" />
                                            </div>
                                            <div className="h-3 bg-gray-200 rounded w-full" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Panel - Empty State Skeleton */}
                        <div className="hidden lg:flex lg:col-span-8 flex-col">
                            <div className="flex-1 flex flex-col items-center justify-center text-gray-300 animate-pulse">
                                <div className="w-16 h-16 bg-gray-200 rounded-full mb-4" />
                                <div className="h-6 bg-gray-200 rounded w-32 mb-2" />
                                <div className="h-4 bg-gray-200 rounded w-48" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
