export const UserCardPreloader = () => {
    return (
        <div className="bg-gradient-to-br from-white/80 to-indigo-50/30 backdrop-blur-sm border border-gray-200 rounded-xl p-5 mb-4">
            <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                    <div className="w-14 h-14 rounded-xl bg-gray-200 animate-pulse" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                            <div className="h-5 bg-gray-200 rounded w-40 animate-pulse mb-2" />
                            <div className="flex items-center gap-3 mt-1">
                                <div className="h-3 bg-gray-200 rounded w-12 animate-pulse" />
                                <div className="h-3 bg-gray-200 rounded w-20 animate-pulse" />
                                <div className="h-3 bg-gray-200 rounded w-24 animate-pulse" />
                            </div>
                        </div>
                        <div className="h-3 bg-gray-200 rounded w-16 animate-pulse" />
                    </div>
                    <div className="mb-3 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                        <div className="h-6 bg-gray-200 rounded w-16 animate-pulse" />
                        <div className="h-6 bg-gray-200 rounded w-20 animate-pulse" />
                        <div className="h-6 bg-gray-200 rounded w-14 animate-pulse" />
                        <div className="h-6 bg-gray-200 rounded w-18 animate-pulse" />
                        <div className="h-6 bg-gray-200 rounded w-12 animate-pulse" />
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-8 bg-gray-200 rounded-lg w-24 animate-pulse" />
                        <div className="h-8 bg-gray-200 rounded-lg w-24 animate-pulse" />
                        <div className="ml-auto">
                            <div className="h-7 bg-gray-200 rounded w-32 animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

