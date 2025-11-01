import React from 'react';
import appleImage from '../assets/images/image informatique/1_big_nowater.jpg';
import casqueImage from '../assets/images/image informatique/Casque-Gamer-Onikuma-K8-3.5mm-Maroc.jpg';
import iphoneImage from '../assets/images/image informatique/iphone-card-40-iphone15prohero-202309_FMT_WHH.jpeg';
import crossImage from '../assets/images/cross.svg';
import { Link } from 'react-router-dom';

function ProductSection() {
  return (
    <div className="product-section">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-3 mb-5 mb-lg-0">
            <h2 className="mb-4 section-title">Louez du matériel de qualité, sans engagement !</h2>
              <p className="mb-4">
                Accédez à un large choix de matériel high-tech et professionnel à des prix avantageux.  
                Louez en toute simplicité et profitez d’un service rapide et sécurisé.
              </p>
              <p><Link to="/shop" className="btn ">Voir nos produits</Link></p>
          </div>
          <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
            <Link className="product-item" to="/shop">
              <img src={appleImage} className="img-fluid product-thumbnail" alt='apple' />
              <h3 className="product-title">Apple</h3>
              <strong className="product-price">300.000 Ariary</strong>
              <span className="icon-cross">
                <img src={crossImage} className="img-fluid" alt='cross' />
              </span>
            </Link>
          </div>
          <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
            <Link className="product-item" to="/shop">
              <img src={casqueImage} className="img-fluid product-thumbnail" alt='casque' />
              <h3 className="product-title">Casque XD</h3>
              <strong className="product-price">50.000 Ariary</strong>
              <span className="icon-cross">
                <img src={crossImage} className="img-fluid" alt='cross' />
              </span>
            </Link>
          </div>
          <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
            <Link className="product-item" to="/shop">
              <img src={iphoneImage} className="img-fluid product-thumbnail" alt='casque' />
              <h3 className="product-title">Iphone 15</h3>
              <strong className="product-price">200.000 Ariary</strong>
              <span className="icon-cross">
                <img src={crossImage} className="img-fluid" alt='cross' />
              </span>
            </Link>
          </div>
         
        </div>
      </div>
    </div>
  );
}

export default ProductSection;
