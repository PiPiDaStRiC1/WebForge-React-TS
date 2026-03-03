import { AlertCircle } from "lucide-react";

interface ErrorAlertProps {
    message?: string;
    instructions?: string;
}

export const ErrorAlert = ({message = 'Не удалось загрузить', instructions = 'Попробуйте снова позже'}: ErrorAlertProps) => (
    <div className="max-w-md mx-auto text-center py-20">
        <AlertCircle size={64} className="text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{message}</h1>
        <p className="text-gray-600 mb-6">{instructions}</p>
    </div>
)