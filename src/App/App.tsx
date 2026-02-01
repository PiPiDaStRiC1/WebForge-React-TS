import '@/styles/style.css'
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header, Main, Home, Footer, Performers, Categories, TopPerformers, FAQ, Guides, Terms, Privacy, Orders, UserProfile, OrderInfo, CreateOrder, NotFound, MyProfile, AuthModal } from '@/components';
import { ScrollToTop } from '@/lib/utils/index'
import { PublicRoute, ProtectedRoute } from '@/features';
import { UserProvider } from '@/contexts';
import { Toaster } from 'react-hot-toast';

// Lazy imports later
// Maybe do separated page for auth

function App() {
  const location = useLocation();
  const state = location.state as { background?: Location };

  return (
    <>
      <UserProvider>
        <Toaster toastOptions={{duration: 1000}} reverseOrder={false} />
        <Header />
        <ScrollToTop />
        <Routes location={state?.background || location}>
          <Route element={<Main />}>
            <Route path="/" index element={<Home />} />
            <Route path="/orders" element={<Orders />} />
            <Route path='/orders/:orderId'element={<OrderInfo />} />
            <Route path="/profile/:userId" element={<UserProfile />} />
            <Route path="/my-profile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
            <Route path="/performers" element={<Performers />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/top-performers" element={<TopPerformers />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/terms" element={<Terms />}/>
            <Route path="/privacy" element={<Privacy />}/>
            <Route path="create-order" element={<ProtectedRoute><CreateOrder /></ProtectedRoute>}/>
            <Route path="/auth" element={<PublicRoute><AuthModal /></PublicRoute>} />
            <Route path="*" element={<NotFound />}/>
          </Route>
        </Routes>
        {state?.background && (
          <Routes>
            <Route path="/auth" element={<PublicRoute><AuthModal /></PublicRoute>} />
          </Routes>
        )}
        <Footer />
      </UserProvider>
    </>
  )
}

export default App
