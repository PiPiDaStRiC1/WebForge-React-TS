import { Award } from "lucide-react"

export const VerificationProfile = () => {
    
    return (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-6">
            <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                    <Award className="text-indigo-600" size={20} />
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 mb-1">Верификация</h3>
                    <p className="text-sm text-gray-600">
                        Подтвердите свою личность для повышения доверия
                    </p>
                </div>
            </div>
            <button className="w-full py-2 bg-white text-indigo-600 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm">
                Пройти верификацию
            </button>
        </div>
    )
}