import { Outlet } from "react-router-dom";

export const Main = () => {
    return (
        <div className="min-h-[calc(100vh-78px)] flex-grow bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <div className="max-w-7xl mx-auto px-6">
                <Outlet />
            </div>
        </div>
    );
};
