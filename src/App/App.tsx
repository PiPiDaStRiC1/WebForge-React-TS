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
    FAQ,
    Guides,
    Terms,
    Privacy,
    Orders,
    UserProfile,
    OrderInfo,
    CreateOrder,
    NotFound,
    MyProfile,
    AuthModal,
    Messages,
    Chat,
    Favorites,
    Auth,
} from "@/components";
import { ScrollToTop } from "@/lib/utils/index";
import { PublicRoute, ProtectedRoute, ChatGuard, OrderGuard } from "@/features";
import { UserProvider } from "@/contexts";
import { Toaster } from "react-hot-toast";

// Lazy imports later
// TODO:
// 1) Добавить возможность смена роли аккаунта в настройки (client и freelancer)

// Роутинг
// 1) сделать корректное удаление желаемого при разлоге (возможно сделать guest аккаунт)

// Чат:
// 1) добавить gender, ник (с @), сделать валидацию через Zod или React Hook Form
// 2) сделать так, чтобы при отправки сообщений собеседник был online
// 3) сделать отправку сообщений от лица, зависищего от пола фрилансера (например, если фрилансер мужского пола, то сообщения от его лица будут с мужским родом, если женского - с женским)
// 4) добавить возможность отправки файлов (например, изображений) в чат (очень маловероятно)
// 5) добавить возможность Заблокировать пользователя

// AI
// Error Boundary
// Toast для всех мутаций
// Возможная оптимизация изображений (Intersection Observer)
// Непрочитанные сообщения

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
                                <OrderGuard>
                                    <OrderInfo />
                                </OrderGuard>
                            }
                        />
                        <Route path="/profile/:userId" element={<UserProfile />} />
                        <Route
                            path="/messages"
                            element={
                                <ProtectedRoute>
                                    <Messages />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/messages/:userId"
                            element={
                                <ChatGuard>
                                    <Chat />
                                </ChatGuard>
                            }
                        />
                        <Route
                            path="/my-profile"
                            element={
                                <ProtectedRoute>
                                    <MyProfile />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/performers" element={<Performers />} />
                        <Route path="/categories" element={<Categories />} />
                        <Route path="/top-performers" element={<TopPerformers />} />
                        <Route path="/faq" element={<FAQ />} />
                        <Route path="/guides" element={<Guides />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route
                            path="/favorites"
                            element={
                                <ProtectedRoute>
                                    <Favorites />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/create-order"
                            element={
                                <ProtectedRoute>
                                    <CreateOrder />
                                </ProtectedRoute>
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
