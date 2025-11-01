import React from "react";
import pcAsus from '../assets/images/pc asus.png';
import Truck from '../assets/images/truck.svg';
import Bag from '../assets/images/bag.svg';
import Return from '../assets/images/return.svg';
import ImgAbout from '../assets/images/ww.jpg';
import Support from '../assets/images/support.svg';

function About () {
  return (
    <div>
      {/* Hero Section */}
      <div className="hero">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-5">
              <div className="intro-excerpt">
                <h1>A propos de Nous</h1>
                <p className="mb-4">
                Nous nous engageons à offrir des services de qualité supérieure, rapides et fiables, afin de répondre à tous vos besoins. Avec nous, vous bénéficiez d'une expérience facile, sécurisée et sans tracas, de la commande à la livraison

                </p>
                
              </div>
            </div>
            <div className="col-lg-7">
              <div className="hero-img-wrap">
                <img src={pcAsus} className="img-fluid" alt="Couch" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Hero Section */}

      {/* Why Choose Us Section */}
      <div className="why-choose-section">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-lg-6">
              <h2 className="section-title">Pourquoi Nous Choisir</h2>
              <p>Chez nous, chaque client est une priorité. Nous nous efforçons de vous offrir une expérience personnalisée, en écoutant vos besoins et en vous proposant des solutions adaptées, à chaque étape de votre projet.</p>

              <div className="row my-5">
                  <div className="col-6 col-md-6">
                    <div className="feature">
                      <div className="icon">
                        <img src={Truck} alt="Feature Icon" className="img-fluid" />
                      </div>
                      <h3>Rapide & Livraison gratuit</h3>
                      <p>Nous assurons une livraison rapide et gratuite sur toutes vos commandes, vous permettant de recevoir vos produits dans les plus brefs délais, sans frais supplémentaires.</p>
                    </div>
                  </div>
                  <div className="col-6 col-md-6">
                    <div className="feature">
                      <div className="icon">
                        <img src={Bag} alt="Feature Icon" className="img-fluid" />
                      </div>
                      <h3>Facile de loyer les produits</h3>
                      <p>Notre plateforme vous permet de louer des produits en quelques clics, avec un processus simplifié et une interface intuitive qui rend le tout rapide et facile.</p>
                    </div>
                  </div>
                  <div className="col-6 col-md-6">
                    <div className="feature">
                      <div className="icon">
                        <img src={Support} alt="Feature Icon" className="img-fluid" />
                      </div>
                      <h3>Service d'assistance personnalisé</h3>
                      <p>Nous offrons un service client personnalisé pour vous aider à trouver les meilleures solutions à vos besoins. N'hésitez pas à nous contacter pour toute question ou conseil.</p>

                    </div>
                  </div>
                  <div className="col-6 col-md-6">
                    <div className="feature">
                      <div className="icon">
                        <img src={Return} alt="Feature Icon" className="img-fluid" />
                      </div>
                      <h3>Echange 7/7 jours</h3>
                      <p>Nos services d'échange sont disponibles tous les jours de la semaine. Si vous avez un problème avec un produit, contactez-nous, et nous trouverons une solution rapidement.</p>
                    </div>
                  </div>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="img-wrap">
                <img src={ImgAbout} alt="Why Choose Us" className="img-fluid" width={300} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About;
