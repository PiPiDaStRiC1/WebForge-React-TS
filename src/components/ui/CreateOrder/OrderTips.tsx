export const OrderTips = () => (
    <div className="mt-6 bg-blue-50/70 backdrop-blur-sm border border-blue-100 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-3">💡 Советы для успешного заказа</h3>
        <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span><strong>Будьте конкретны:</strong> Чем детальнее описание, тем точнее будут предложения исполнителей</span>
            </li>
            <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span><strong>Укажите референсы:</strong> Примеры похожих работ помогут понять вашу задачу</span>
            </li>
            <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span><strong>Реалистичный бюджет:</strong> Адекватная оценка увеличит количество откликов</span>
            </li>
            <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span><strong>Выбирайте навыки:</strong> Это поможет найти специалистов с нужной экспертизой</span>
            </li>
        </ul>
    </div>
)