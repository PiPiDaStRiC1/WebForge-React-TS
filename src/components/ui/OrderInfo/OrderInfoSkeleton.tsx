export const OrderInfoSkeleton = () => {
    return (
        <div className="min-h-screen pb-10">
            <section className="relative">
                <div className="absolute inset-0 h-64 via-purple-50">
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-40" />
                    <div className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] bg-purple-200 rounded-full blur-3xl opacity-40" />
                </div>

                <div className="relative pt-20 pb-32 animate-pulse">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-indigo-100 mb-4">
                            <div className="w-16 h-4 bg-gray-200 rounded" />
                        </div>

                        <div className="flex items-start gap-3 mb-4">
                            <div className="w-24 h-8 bg-gray-200 rounded-xl" />
                            <div className="w-20 h-8 bg-gray-200 rounded-xl" />
                        </div>

                        <div className="space-y-3 mb-4">
                            <div className="h-10 bg-gray-200 rounded-lg w-3/4" />
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                            <div className="h-5 bg-gray-200 rounded w-48" />
                            <div className="h-5 bg-gray-200 rounded w-32" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative -mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-pulse">
                    <aside className="lg:col-span-1 space-y-6">
                        <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-xl">
                            <div className="h-6 bg-gray-200 rounded w-32 mb-4" />
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-gray-200 flex-shrink-0" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-gray-200 rounded w-16" />
                                        <div className="h-6 bg-gray-200 rounded w-32" />
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-gray-200 flex-shrink-0" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-gray-200 rounded w-24" />
                                        <div className="h-6 bg-gray-200 rounded w-20" />
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-gray-200 flex-shrink-0" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-gray-200 rounded w-20" />
                                        <div className="h-6 bg-gray-200 rounded w-12" />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full h-12 bg-gray-200 rounded-xl mt-6" />
                        </div>

                        <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-xl">
                            <div className="h-6 bg-gray-200 rounded w-24 mb-4" />
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-16 h-16 bg-gray-200 rounded-xl flex-shrink-0" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-5 bg-gray-200 rounded w-32" />
                                    <div className="h-4 bg-gray-200 rounded w-24" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-200 rounded w-full" />
                                <div className="h-4 bg-gray-200 rounded w-5/6" />
                            </div>
                        </div>
                    </aside>

                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-xl">
                            <div className="h-6 bg-gray-200 rounded w-40 mb-4" />
                            <div className="space-y-3">
                                <div className="h-4 bg-gray-200 rounded w-full" />
                                <div className="h-4 bg-gray-200 rounded w-full" />
                                <div className="h-4 bg-gray-200 rounded w-5/6" />
                                <div className="h-4 bg-gray-200 rounded w-full" />
                                <div className="h-4 bg-gray-200 rounded w-4/6" />
                            </div>
                        </div>

                        <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-xl">
                            <div className="h-6 bg-gray-200 rounded w-44 mb-4" />
                            <div className="flex flex-wrap gap-2">
                                {[...Array(6)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="h-9 bg-gray-200 rounded-xl"
                                        style={{ width: `${80 + i * 60}px` }}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-xl">
                            <div className="space-y-4">
                                {[...Array(3)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="pb-4 border-b border-gray-200 last:border-0"
                                    >
                                        <div className="flex items-start gap-4 mb-3">
                                            <div className="w-12 h-12 bg-gray-200 rounded-xl flex-shrink-0" />
                                            <div className="flex-1 space-y-2">
                                                <div className="h-5 bg-gray-200 rounded w-40" />
                                                <div className="h-4 bg-gray-200 rounded w-32" />
                                            </div>
                                            <div className="w-24 h-8 bg-gray-200 rounded-lg" />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="h-4 bg-gray-200 rounded w-full" />
                                            <div className="h-4 bg-gray-200 rounded w-5/6" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
