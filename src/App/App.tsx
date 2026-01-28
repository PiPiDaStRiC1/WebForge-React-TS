import '@/styles/style.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header, Main, Home, Footer, Performers, Categories, TopPerformers, FAQ, Guides, Terms, Privacy, Orders, UserProfile, OrderInfo } from '@/components';
import {ScrollToTop} from '@/lib/utils/index'

// Lazy imports later


function App() {

  return (
    <BrowserRouter>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route element={<Main />}>
          <Route path="/" index element={<Home />} />
          <Route path="/orders" element={<Orders />} />
          <Route path='/orders/:orderId'element={<OrderInfo />}/>
          <Route path="/profile/:userId" element={<UserProfile />}/>
          <Route path="/performers" element={<Performers />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/top-performers" element={<TopPerformers />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/terms" element={<Terms />}/>
          <Route path="/privacy" element={<Privacy />}/>
          <Route path="*" element={<div>Error 404</div>}/>
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
