import React from 'react';
import pcAsus from '../assets/images/pc asus.png';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="hero">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-lg-5">
            <div className="intro-excerpt">
              <h1>Nous vous offrons <span className="d-block">la qualité</span></h1>
              <p className="mb-4">Nous combinons innovation, expérience et excellence pour vous fournir des produits et services exceptionnels. Notre équipe est dédiée à votre satisfaction et nous mettons un point d'honneur à dépasser vos attentes à chaque étape de votre parcours.</p>
              <p><Link to="/shop" className="btn btn-secondary me-2">Voir les Produits</Link><Link to="/location" className="btn btn-white-outline">Location</Link></p>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="hero-img-wrap">
              <img src={pcAsus} className="img-fluid" alt='pc asus' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;