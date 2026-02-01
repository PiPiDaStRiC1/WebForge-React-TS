export const ProfileSkeleton = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-8 animate-pulse">
            <div className="max-w-4xl mx-auto px-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
                    <div className="flex items-start gap-6">
                        <div className="w-32 h-32 bg-gray-200 rounded-2xl" />

                        <div className="flex-1">
                            <div className="h-8 bg-gray-200 rounded-lg w-48 mb-4" />
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-6 bg-gray-200 rounded-lg w-24" />
                                <div className="h-4 bg-gray-200 rounded w-32" />
                            </div>
                            <div className="h-4 bg-gray-200 rounded w-56" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <div className="h-6 bg-gray-200 rounded w-24 mb-4" />
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-200 rounded w-full" />
                                <div className="h-4 bg-gray-200 rounded w-5/6" />
                                <div className="h-4 bg-gray-200 rounded w-4/6" />
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <div className="h-6 bg-gray-200 rounded w-24 mb-4" />
                            <div className="flex flex-wrap gap-2">
                                <div className="h-8 bg-gray-200 rounded-lg w-20" />
                                <div className="h-8 bg-gray-200 rounded-lg w-24" />
                                <div className="h-8 bg-gray-200 rounded-lg w-28" />
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <div className="h-6 bg-gray-200 rounded w-32 mb-4" />
                            <div className="h-48 bg-gray-200 rounded-xl" />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <div className="h-6 bg-gray-200 rounded w-28 mb-4" />
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="h-4 bg-gray-200 rounded w-24" />
                                    <div className="h-6 bg-gray-200 rounded w-12" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="h-4 bg-gray-200 rounded w-20" />
                                    <div className="h-6 bg-gray-200 rounded w-8" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="h-4 bg-gray-200 rounded w-28" />
                                    <div className="h-6 bg-gray-200 rounded w-16" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <div className="h-6 bg-gray-200 rounded w-32 mb-4" />
                            <div className="space-y-3">
                                <div className="h-4 bg-gray-200 rounded w-full" />
                                <div className="h-4 bg-gray-200 rounded w-5/6" />
                            </div>
                        </div>

                        <div className="bg-gray-200 rounded-2xl p-6">
                            <div className="flex items-start gap-3 mb-3">
                                <div className="w-10 h-10 bg-gray-300 rounded-xl" />
                                <div className="flex-1">
                                    <div className="h-5 bg-gray-300 rounded w-24 mb-2" />
                                    <div className="h-4 bg-gray-300 rounded w-full" />
                                </div>
                            </div>
                            <div className="h-10 bg-gray-300 rounded-lg w-full" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}