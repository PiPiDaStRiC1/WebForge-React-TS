import {OrderCardSkeleton} from '../../common/OrderCardSkeleton'

export const UserProfileSkeleton = () => {
    return (
        <div className="min-h-screen pb-10">
            <section className="relative">
                <div className="absolute inset-0 h-64 via-purple-50">
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-40" />
                    <div className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] bg-purple-200 rounded-full blur-3xl opacity-40" />
                </div>

                <div className="relative pt-20 pb-32">
                    <div className="flex flex-col md:flex-row md:items-end gap-6">
                        <div className="relative flex-shrink-0">
                            <div className="w-32 h-32 rounded-2xl border-4 border-white shadow-2xl bg-gray-200 animate-pulse" />
                        </div>

                        <div className="flex-1">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <div className="h-10 bg-gray-200 rounded-lg w-64 mb-2 animate-pulse" />
                                    <div className="h-6 bg-gray-200 rounded-lg w-40 mb-4 animate-pulse" />
                                    
                                    <div className="flex flex-wrap gap-4">
                                        <div className="h-5 bg-gray-200 rounded-lg w-32 animate-pulse" />
                                        <div className="h-5 bg-gray-200 rounded-lg w-28 animate-pulse" />
                                        <div className="h-5 bg-gray-200 rounded-lg w-36 animate-pulse" />
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="w-11 h-11 rounded-xl bg-gray-200 animate-pulse" />
                                    <div className="w-11 h-11 rounded-xl bg-gray-200 animate-pulse" />
                                    <div className="w-32 h-11 rounded-xl bg-gray-200 animate-pulse" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative -mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-xl">
                            <div className="h-6 bg-gray-200 rounded-lg w-32 mb-4 animate-pulse" />
                            <div className="space-y-4">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-gray-200 animate-pulse flex-shrink-0" />
                                        <div className="flex-1">
                                            <div className="h-4 bg-gray-200 rounded w-28 mb-2 animate-pulse" />
                                            <div className="h-6 bg-gray-200 rounded w-16 animate-pulse" />
                                        </div>
                                    </div>
                                ))}
                                
                                <div className="pt-4 border-t border-gray-100">
                                    <div className="h-4 bg-gray-200 rounded w-48 animate-pulse" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-xl">
                            <div className="h-6 bg-gray-200 rounded-lg w-24 mb-4 animate-pulse" />
                            <div className="flex flex-wrap gap-2">
                                {[...Array(8)].map((_, i) => (
                                    <div 
                                        key={i} 
                                        className="h-8 bg-gray-200 rounded-lg animate-pulse"
                                        style={{ width: `${60 + i * 40}px` }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-xl">
                            <div className="h-6 bg-gray-200 rounded-lg w-24 mb-4 animate-pulse" />
                            <div className="space-y-3">
                                <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                                <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                                <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse" />
                                <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                            </div>
                        </div>

                        {[...Array(3)].map((_, i) => (
                            <OrderCardSkeleton key={i} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}