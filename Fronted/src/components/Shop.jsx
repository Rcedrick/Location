import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cross from '../assets/images/cross.svg';
import closeIcon from '../assets/images/close2.png';
import { useCart } from "../context/CartContext.jsx";

function Shop() {
  const url = 'http://localhost:8080/aa/image/';
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('global');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/aa');
      setProducts(response.data);
      setFilteredProducts(response.data); // Initialiser avec tous les produits
    } catch (error) {
      console.error('Erreur lors de la récupération des produits', error);
    }
  };

  // Fonction de recherche en temps réel
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProducts(products);
    } else {
      const lowerCaseTerm = searchTerm.toLowerCase();
      const filtered = products.filter(product => {
        switch (filterType) {
          case 'name':
            return product.nomP.toLowerCase().includes(lowerCaseTerm);
          case 'category':
            return product.categorie.nomC.toLowerCase().includes(lowerCaseTerm);
          case 'description':
            return product.description.toLowerCase().includes(lowerCaseTerm);
          default:
            return (
              product.nomP.toLowerCase().includes(lowerCaseTerm) ||
              product.categorie.nomC.toLowerCase().includes(lowerCaseTerm) ||
              product.description.toLowerCase().includes(lowerCaseTerm)
            );
        }
      });
      setFilteredProducts(filtered);
    }
  }, [searchTerm, filterType, products]); // Exécuté à chaque modification du texte ou du filtre

  const handleOpenModal = (product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentProduct(null);
  };

  return (
    <div>
      {/* Start Hero Section */}
      <div className="hero">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-5">
              <div className="intro-excerpt">
                <h1>Shop</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Hero Section */}

      <div className="untree_co-section product-section before-footer-section">
        <div className="container">
          {/* Barre de recherche */}
          <div className="row mb-4">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Recherche instantanée
              />
            </div>
            <div className="col-md-4">
              <select className="form-select" onChange={(e) => setFilterType(e.target.value)}>
                <option value="global">Recherche globale</option>
                <option value="category">Par catégorie</option>
                <option value="name">Par nom</option>
                <option value="description">Par description</option>
              </select>
            </div>
          </div>

          {/* Affichage des produits */}
          <div className="row">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <div key={index} className="col-12 col-md-4 col-lg-3 mb-5">
                  <a className="product-item" href="#" onClick={(e) => { e.preventDefault(); handleOpenModal(product); }}>
                    <img 
                      src={url + product.imageP} 
                      className="img-fluid product-thumbnail" 
                      alt={product.nomP}
                    />
                    <h3 className="product-title">{product.nomP}</h3>
                    <strong className="product-price">{product.prix} Ariary</strong>
                    <span className="icon-cross">
                      <img src={cross} className="img-fluid" alt="cross"/>
                    </span>
                  </a>
                </div>
              ))
            ) : (
              <div className="col-12">
                <p className="text-center text-muted">Aucun produit trouvé.</p>
              </div>
            )}
          </div>
        </div>
      </div>        

      {/* Modal Popup */}
      {isModalOpen && currentProduct && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{currentProduct.nomP}</h2>
              <button className="close-btn" onClick={handleCloseModal}>
                <img src={closeIcon} alt="Fermer" />
              </button>
            </div>
            <div className="modal-body">
              <img
                src={url + currentProduct.imageP}
                className="modal-product-image"
                alt={currentProduct.nomP}
              />
              <div className="modal-product-details">
                <p className="modal-product-price">
                  <span className="modal-product-price-number">{currentProduct.prix}</span> Ariary
                </p>
                <p className="modal-product-category">{currentProduct.categorie.nomC}</p>
                <p className="modal-product-description">{currentProduct.description}</p>
                <p className="modal-product-stock">
                  <span className="modal-product-stock-number">{currentProduct.stock}</span> articles disponibles
                </p>
              </div>
            </div>
            <button className="btn btn-primary" onClick={() => { 
              addToCart(currentProduct); 
              handleCloseModal(); 
            }}>
              Ajouter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Shop;
