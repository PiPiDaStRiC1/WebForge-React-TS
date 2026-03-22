import "@/styles/style.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { Header, Main, Home, Footer, Categories, NotFound, AuthModal, Auth } from "@/components";
import { ScrollToTop } from "@/lib/utils/index";
import { Preloader } from "@/components/common";
import { PublicRoute, ProtectedRoute, ChatGuard, OrderGuard } from "@/features";
import { Toaster } from "react-hot-toast";
import { lazy, Suspense } from "react";

// TODO:
// 1) Затипизовать все api функции во вкладке frontend
// 2) Непрочитанные сообщения
// 3) Переделать структуру responses в json, а именно сделать так, чтобы ключом был
// номера заказа, а не номер самого id response (getOneOrderResponses)
// 4) Сделать любимые заказы для фрилансеров (later)

// SEO
// Сделать SEO френдли с помощью React Helmet (later)
// добавить в title имя фрилансера и его специализацию (later)

// Чат:
// 1) сделать так, чтобы при отправки сообщений собеседник был online(later, overkill)
// 2) добавить возможность отправки файлов (например, изображений) в чат (overkill)
// 3) добавить возможность Заблокировать пользователя(later)

const FAQ = lazy(() => import("@/pages/FAQ"));
const Guides = lazy(() => import("@/pages/Guides"));
const Terms = lazy(() => import("@/pages/Terms"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const MyProfile = lazy(() => import("@/pages/MyProfile"));
const Favorites = lazy(() => import("@/pages/Favorites"));
const Messages = lazy(() => import("@/pages/Messages"));
const Chat = lazy(() => import("@/pages/Chat"));
const UserProfile = lazy(() => import("@/pages/UserProfile"));
const CreateOrder = lazy(() => import("@/pages/CreateOrder"));
const OrderInfo = lazy(() => import("@/pages/OrderInfo"));
const Performers = lazy(() => import("@/pages/Performers"));
const TopPerformers = lazy(() => import("@/pages/TopPerformers"));
const Orders = lazy(() => import("@/pages/Orders"));

function App() {
    const location = useLocation();
    const state = location.state as { background?: Location };

    return (
        <>
            <Toaster toastOptions={{ duration: 1000 }} reverseOrder={false} />
            <Header />
            <ScrollToTop />
            <Routes location={state?.background || location}>
                <Route element={<Main />}>
                    <Route path="/" index element={<Home />} />
                    <Route
                        path="/orders"
                        element={
                            <Suspense fallback={<Preloader />}>
                                <Orders />
                            </Suspense>
                        }
                    />
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
                    <Route
                        path="/performers"
                        element={
                            <Suspense fallback={<Preloader />}>
                                <Performers />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/top-performers"
                        element={
                            <Suspense fallback={<Preloader />}>
                                <TopPerformers />
                            </Suspense>
                        }
                    />
                    <Route path="/categories" element={<Categories />} />
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
        </>
    );
}

export default App;
