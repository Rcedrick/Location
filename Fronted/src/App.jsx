import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import NavbarAdmin from './components/admin/NavbarAdmin'; // Assure-toi d'avoir cette navbar admin
import Hero from './components/Hero';
import Shop from './components/Shop';
import ProductSection from './components/ProductSection';
import Cart from './components/Cart';
import Footer from './components/Footer';
import Checkout from './components/Checkout';
import ThankYou from './components/ThankYou';
import Contact from './components/Contact';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Logout from './components/Logout';
import CheckSession from './components/Checkession';
import { CartProvider } from './context/CartContext';
import { LocationList } from './components/LocationList';
import { Location } from './components/admin/Location';
import { Product } from './components/admin/Product';
import { Paiement } from './components/admin/Paiement';
import Dashboard from './components/admin/Dashboard';
import { AuthProvider } from './context/AuthContext'; // Importer AuthProvider
import { PrivateRoute } from './components/PrivateRoute'; // Importer AuthProvider
import { List } from './components/List';
import { Client } from './components/admin/Client';

function Layout() {
  const location = useLocation(); // Récupérer l'URL actuelle

  // Liste des pages où la navbar ne doit pas s'afficher
  const noNavbarRoutes = ['/', '/register', '/logout'];

  // Vérifier si on est dans l'interface admin
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      {/* Afficher la navbar sauf si on est sur login, register, ou logout */}
      {!noNavbarRoutes.includes(location.pathname) && (
        isAdmin ? <NavbarAdmin /> : <Navbar />
      )}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/list" element={<List />} />
        <Route path="/register" element={<Register />} />
        <Route path="/session" element={<PrivateRoute element={<CheckSession />} />}/>
        <Route path="/contact" element={<PrivateRoute element={<><Contact/><Footer/></>} />}/>
        <Route path="/thanks" element={<PrivateRoute element={<><ThankYou/></>} />}/>
        <Route path="/checkout" element={<PrivateRoute element={<><Checkout/><Footer/></>} />}/>
        <Route path="/cart" element={<PrivateRoute element={<><Cart/><Footer/></>} />}/>
        <Route path="/shop" element={<PrivateRoute element={<><Shop/><Footer/></>} />}/>
        <Route path="/about" element={<PrivateRoute element={<><About/><Footer/></>} />}/>
        <Route path="/acceuil" element={<PrivateRoute element={<><Hero /><ProductSection /><Footer/></>} />}/>

        {/* Routes protégées */}
        <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
        <Route path="/location" element={<PrivateRoute element={<LocationList />} />} />

        {/* Routes admin protégées */}
        <Route path="/admin/produit" element={<PrivateRoute element={<Product />} />} />
        <Route path="/admin/location" element={<PrivateRoute element={<Location />} />} />
        <Route path="/admin/paiement" element={<PrivateRoute element={<Paiement />} />} />
        <Route path="/admin/acceuil" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/admin/client" element={<PrivateRoute element={<Client />} />} />
      </Routes>

    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Layout />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
