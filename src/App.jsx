import './App.css';
import Home from './pages/Home.jsx';
import Products from './components/Products.jsx';
import Perfil from './pages/Perfil.jsx';
import NavBar from './navigation/NavBar.jsx';
import CheckOut from './pages/CheckOut.jsx';
import Gracias from './pages/Gracias.jsx';
import Footer from './navigation/Footer.jsx';
import ItemDetail from './components/ItemDetail.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <>

      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <div id="root">
              <NavBar />
              <main>
                <Routes>
                  <Route exact path='/' element={<Home />} />
                  <Route exact path='/productos' element={<Products />} />
                  <Route exact path='/perfil' element={<Perfil />} />
                  <Route exact path='/checkout' element={<CheckOut />} />
                  <Route exact path='/gracias' element={<Gracias />} />
                  <Route exact path='/producto/:prodId' element={<ItemDetail />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
          <ToastContainer position="bottom-right" autoClose={3000} />
        </CartProvider>
      </AuthProvider>
    </>
  )
}

export default App;
