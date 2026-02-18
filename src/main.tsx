import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "@/App/App";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { UserProvider } from "@/contexts";
import { ErrorBoundary } from "@/lib/utils";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
        <StrictMode>
            <BrowserRouter basename="/WebForge-React-TS/">
                <ErrorBoundary>
                    <UserProvider>
                        <App />
                    </UserProvider>
                </ErrorBoundary>
            </BrowserRouter>
        </StrictMode>
    </QueryClientProvider>,
);
