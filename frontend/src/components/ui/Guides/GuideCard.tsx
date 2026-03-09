import type { Guide } from "@/pages/Guides";

interface GuideCardProps {
    index: number;
    guide: Guide;
}

const DIFFICULTY_COLORS = {
    Начинающий: "bg-green-100 text-green-700",
    Средний: "bg-yellow-100 text-yellow-700",
    Продвинутый: "bg-red-100 text-red-700",
};

export const GuideCard = ({ index, guide }: GuideCardProps) => (
    <div
        className="group cursor-pointer bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 animate-slide-in-left"
        style={{ animationDelay: `${index * 50}ms` }}
    >
        <div className={`h-32 bg-gradient-to-br ${guide.gradient} relative overflow-hidden`}>
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white rounded-full -translate-y-12 translate-x-12" />
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-white rounded-full translate-y-10 -translate-x-10" />
            </div>
            <div className="relative h-full flex items-center justify-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <guide.icon size={32} className="text-white" />
                </div>
            </div>
        </div>

        <div className="p-6">
            <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-indigo-600">{guide.category}</span>
                <span
                    className={`text-xs font-semibold px-2 py-1 rounded-lg ${DIFFICULTY_COLORS[guide.difficulty]}`}
                >
                    {guide.difficulty}
                </span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                {guide.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4 line-clamp-3">{guide.description}</p>
        </div>
    </div>
);
