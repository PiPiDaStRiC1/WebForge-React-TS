import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "@/App/App";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ErrorBoundary } from "@/lib/utils";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
        <StrictMode>
            <BrowserRouter basename="/WebForge-React-TS/">
                <ErrorBoundary>
                    <App />
                </ErrorBoundary>
            </BrowserRouter>
        </StrictMode>
    </QueryClientProvider>,
);
