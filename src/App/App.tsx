import '@/styles/style.css'
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header, Main, Home, Footer, Performers, Categories, TopPerformers, FAQ, Guides, Terms, Privacy, Orders, UserProfile, OrderInfo, CreateOrder, NotFound, MyProfile, AuthModal } from '@/components';
import {ScrollToTop} from '@/lib/utils/index'

// Lazy imports later


function App() {
  const location = useLocation();
  const state = location.state as { background?: Location };

  return (
    <>
      <Header />
      <ScrollToTop />
      <Routes location={state?.background || location}>
        <Route element={<Main />}>
          <Route path="/" index element={<Home />} />
          <Route path="/orders" element={<Orders />} />
          <Route path='/orders/:orderId'element={<OrderInfo />}/>
          <Route path="/profile/:userId" element={<UserProfile />}/>
          <Route path="/my-profile" element={<MyProfile />}/>
          <Route path="/performers" element={<Performers />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/top-performers" element={<TopPerformers />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/terms" element={<Terms />}/>
          <Route path="/privacy" element={<Privacy />}/>
          <Route path="create-order" element={<CreateOrder />}/>
          <Route path="/auth" element={<AuthModal />} />
          <Route path="*" element={<NotFound />}/>
        </Route>
      </Routes>
      {state?.background && (
        <Routes>
          <Route path="/auth" element={<AuthModal />} />
        </Routes>
      )}
      <Footer />
    </>
  )
}

export default App
