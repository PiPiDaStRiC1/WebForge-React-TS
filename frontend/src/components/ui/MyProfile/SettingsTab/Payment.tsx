import { CreditCard } from "lucide-react";
import type { UserData } from "@/types";

interface PaymentProps {
    user: UserData;
}

export const Payment = ({ user }: PaymentProps) => {
    return (
        <div>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Платежи</h2>
                <p className="text-sm text-gray-600 mt-1">
                    {user.role === "freelancer" ? "Способы вывода средств" : "Способ оплаты"}
                </p>
            </div>

            <div className="text-center py-12 max-w-md mx-auto">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="text-blue-600" size={32} />
                </div>
                <p className="text-gray-500 mb-6">Платежные реквизиты не добавлены</p>
                <button className="cursor-pointer px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors">
                    Добавить карту
                </button>
            </div>
        </div>
    );
};
