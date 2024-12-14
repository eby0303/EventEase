import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register'; 
import SellerDashboard from './pages/SellerDashboard';
import Products from './pages/Products';
import { CartProvider } from './CartContext';
import { AuthProvider } from './AuthContext';
import './styles.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <AuthProvider>
          <NavigationBar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/seller-dashboard" element={<SellerDashboard />} />
              <Route path="/Products" element={<Products />}/>
            </Routes>
          </div>
          <Footer />
        </AuthProvider>
      </Router>
    </CartProvider>
  );
}

export default App;
