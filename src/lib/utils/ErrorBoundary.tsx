import { Component, type ReactNode } from "react";
import { Home, RefreshCw } from "lucide-react";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
    errorInfo?: { componentStack: string };
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error, errorInfo: null };
    }

    handleReset = () => {
        this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    };

    componentDidCatch(error: Error, errorInfo: { componentStack: string }) {
        console.error("ErrorBoundary caught an error:", error, errorInfo.componentStack);
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
                    <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                        <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                            <svg
                                className="w-10 h-10 text-red-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                        </div>

                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Упс! Что-то пошло не так
                        </h1>

                        <p className="text-gray-600 mb-6">
                            {this.state.error?.message || "Произошла непредвиденная ошибка"}
                        </p>

                        {import.meta.env.DEV && this.state.errorInfo && (
                            <details className="mb-6 text-left">
                                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 mb-2">
                                    Технические детали
                                </summary>
                                <pre className="text-xs bg-gray-100 p-3 rounded-lg overflow-auto max-h-40 text-gray-800">
                                    {this.state.errorInfo.componentStack}
                                </pre>
                            </details>
                        )}

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={this.handleReset}
                                className="cursor-pointer flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
                            >
                                <RefreshCw size={20} />
                                Попробовать снова
                            </button>
                            <a
                                href="/"
                                className="cursor-pointer flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                            >
                                <Home size={20} />
                                На главную
                            </a>
                        </div>

                        <p className="mt-6 text-sm text-gray-500">
                            Если проблема повторяется,{" "}
                            <a
                                href="mailto:support@webforge.com"
                                className="text-indigo-600 hover:underline"
                            >
                                свяжитесь с поддержкой
                            </a>
                        </p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
