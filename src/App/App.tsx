import "@/styles/style.css";
import { Routes, Route, useLocation } from "react-router-dom";
import {
    Header,
    Main,
    Home,
    Footer,
    Performers,
    Categories,
    TopPerformers,
    Orders,
    NotFound,
    AuthModal,
    Auth,
} from "@/components";
import { ScrollToTop } from "@/lib/utils/index";
import { Preloader } from "@/components/common";
import { PublicRoute, ProtectedRoute, ChatGuard, OrderGuard } from "@/features";
import { UserProvider } from "@/contexts";
import { Toaster } from "react-hot-toast";
import { lazy, Suspense } from "react";

// TODO:
// 1) Сделать скелетоны для каждой страницы(later)
// 2) Возможно добавить отзывы заказчиков в профиле исполнителей(later)

// SEO
// Сделать SEO френдли с помощью React Helmet (later)
// добавить в title имя фрилансера и его специализацию) (later)

// Error Boundary
// components/common/ErrorBoundary.tsx(done)

// Чат:
// 2) сделать так, чтобы при отправки сообщений собеседник был online(later, overkill)
// 3) сделать отправку сообщений от лица, зависищего от пола фрилансера (например, если фрилансер мужского пола, то сообщения от его лица будут с мужским родом, если женского - с женским)
// 4) добавить возможность отправки файлов (например, изображений) в чат (later, overkill)
// 5) добавить возможность Заблокировать пользователя(later)

// AI
// Error Boundary(done)
// Возможная оптимизация изображений (Intersection Observer)(later, overkill)
// Непрочитанные сообщения(later)

const FAQ = lazy(() => import("@/components/pages/FAQ"));
const Guides = lazy(() => import("@/components/pages/Guides"));
const Terms = lazy(() => import("@/components/pages/Terms"));
const Privacy = lazy(() => import("@/components/pages/Privacy"));
const MyProfile = lazy(() => import("@/components/pages/MyProfile"));
const Favorites = lazy(() => import("@/components/pages/Favorites"));
const Messages = lazy(() => import("@/components/pages/Messages"));
const Chat = lazy(() => import("@/components/pages/Chat"));
const UserProfile = lazy(() => import("@/components/pages/UserProfile"));
const CreateOrder = lazy(() => import("@/components/pages/CreateOrder"));
const OrderInfo = lazy(() => import("@/components/pages/OrderInfo"));

function App() {
    const location = useLocation();
    const state = location.state as { background?: Location };

    return (
        <>
            <UserProvider>
                <Toaster toastOptions={{ duration: 1000 }} reverseOrder={false} />
                <Header />
                <ScrollToTop />
                <Routes location={state?.background || location}>
                    <Route element={<Main />}>
                        <Route path="/" index element={<Home />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route
                            path="/orders/:orderId"
                            element={
                                <Suspense fallback={<Preloader />}>
                                    <OrderGuard>
                                        <OrderInfo />
                                    </OrderGuard>
                                </Suspense>
                            }
                        />
                        <Route
                            path="/profile/:userId"
                            element={
                                <Suspense fallback={<Preloader />}>
                                    <UserProfile />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/messages"
                            element={
                                <Suspense fallback={<Preloader />}>
                                    <ProtectedRoute>
                                        <Messages />
                                    </ProtectedRoute>
                                </Suspense>
                            }
                        />
                        <Route
                            path="/messages/:userId"
                            element={
                                <Suspense fallback={<Preloader />}>
                                    <ChatGuard>
                                        <Chat />
                                    </ChatGuard>
                                </Suspense>
                            }
                        />
                        <Route
                            path="/my-profile"
                            element={
                                <Suspense fallback={<Preloader />}>
                                    <ProtectedRoute>
                                        <MyProfile />
                                    </ProtectedRoute>
                                </Suspense>
                            }
                        />
                        <Route path="/performers" element={<Performers />} />
                        <Route path="/categories" element={<Categories />} />
                        <Route path="/top-performers" element={<TopPerformers />} />
                        <Route
                            path="/faq"
                            element={
                                <Suspense fallback={<Preloader />}>
                                    <FAQ />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/guides"
                            element={
                                <Suspense fallback={<Preloader />}>
                                    <Guides />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/terms"
                            element={
                                <Suspense fallback={<Preloader />}>
                                    <Terms />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/privacy"
                            element={
                                <Suspense fallback={<Preloader />}>
                                    <Privacy />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/favorites"
                            element={
                                <Suspense fallback={<Preloader />}>
                                    <ProtectedRoute>
                                        <Favorites />
                                    </ProtectedRoute>
                                </Suspense>
                            }
                        />
                        <Route
                            path="/create-order"
                            element={
                                <Suspense fallback={<Preloader />}>
                                    <ProtectedRoute>
                                        <CreateOrder />
                                    </ProtectedRoute>
                                </Suspense>
                            }
                        />
                        {!state?.background && (
                            <Route
                                path="/auth"
                                element={
                                    <PublicRoute>
                                        <Auth />
                                    </PublicRoute>
                                }
                            />
                        )}
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
                {state?.background && (
                    <Routes>
                        <Route
                            path="/auth"
                            element={
                                <PublicRoute>
                                    <AuthModal />
                                </PublicRoute>
                            }
                        />
                    </Routes>
                )}
                <Footer />
            </UserProvider>
        </>
    );
}

export default App;
