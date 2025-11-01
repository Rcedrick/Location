import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Profile from '../Profile'; // Importer Profile
import UserIcon from '../../assets/images/user.svg';
import CartIcon from '../../assets/images/cart.svg';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function NavbarAdmin() {
  const navigate = useNavigate();

  const { cart } = useCart();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);  // ✅ Affichage du menu popup
  const [showProfile, setShowProfile] = useState(false);  // ✅ Affichage du profil

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const isActive = (path) => (location.pathname === path ? 'nav-item active' : 'nav-item');

 
  const handleLogout = async () => {
    try {
      const response = await axios.get('http://localhost:8080/session/logout', { withCredentials: true });
      console.log(response.data);
      navigate('/');
    } catch (err) {
      console.error("Erreur lors de la déconnexion :", err);
      alert('Erreur lors de la déconnexion');
    }
  };


  return (
    <>
      <nav className="custom-navbar navbar navbar-expand-md navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">LoC<span>.</span></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsFurni">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsFurni">
            <ul className="custom-navbar-nav navbar-nav ms-auto">
              
              <li className={isActive('/admin/produit')}>
                <Link className="nav-link" to="/admin/produit">Produit</Link>
              </li>
              
            </ul>

            
          </div>
        </div>
      </nav>

      {/* ✅ Popup du profil */}
      {showProfile && <Profile onClose={() => setShowProfile(false)} />}
    </>
  );
}

export default NavbarAdmin;
