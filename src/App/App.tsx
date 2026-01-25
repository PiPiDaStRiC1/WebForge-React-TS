import '@/styles/style.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header, Main, Home, Footer, Performers } from '@/components';


function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<Main />}>
          <Route path="/" index element={<Home />} />
          <Route path="/orders" element={<div>Страница заказов</div>} />
          <Route path="/performers" element={<Performers />} />
          <Route path="/categories" element={<div>Страница категорий</div>} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
