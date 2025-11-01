import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from 'react-router-dom';


function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  return (
    <div className="untree_co-section before-footer-section">
      <div className="container">
        <h1 className="mb-4">🛒 Votre Panier</h1>

        {cart.length === 0 ? (
          <p className="alert alert-warning">Votre panier est vide.</p>
        ) : (
          <>
            <div className="site-blocks-table">
              <table className="table">
                <thead>
                  <tr>
                    <th className="product-thumbnail">Image</th>
                    <th className="product-name">Produit</th>
                    <th className="product-price">Prix</th>
                    <th className="product-quantity">Quantité</th>
                    <th className="product-total">Total</th>
                    <th className="product-remove">Supprimer</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.idP}>
                      <td className="product-thumbnail">
                        <img
                          src={`http://localhost:8080/aa/image/${item.imageP}`}
                          alt={item.nomP}
                          className="img-fluid"
                          style={{ width: "150px", height: "150px", objectFit: "cover" }}
                        />
                      </td>
                      <td className="product-name">
                        <h2 className="h5 text-black">{item.nomP}</h2>
                      </td>
                      <td>{item.prix} Ar</td>
                      <td>
                        <div className="input-group mb-3 d-flex align-items-center quantity-container" style={{ maxWidth: '120px' }}>
                          <div className="input-group-prepend">
                            <button
                              className="btn btn-outline-black"
                              type="button"
                              onClick={() => updateQuantity(item.idP, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                          </div>
                          <input type="text" className="form-control text-center quantity-amount" value={item.quantity} readOnly />
                          <div className="input-group-append">
                            <button
                              className="btn btn-outline-black"
                              type="button"
                              onClick={() => updateQuantity(item.idP, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </td>
                      <td>{(item.prix * item.quantity).toFixed(2)} Ar</td>
                      <td>
                        <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.idP)}>X</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totaux et actions */}
            <div className="row">
              <div className="col-md-6">
                <div className="row mb-5">
                  <div className="col-md-6 mb-3 mb-md-0 continuer">
                    <button className="btn btn-outline-black btn-block btn-lg py-3"><Link className="nav-link" to="/shop">Continuer vos achats</Link></button>
                  </div>
                  
                </div>

                


                <div className="col-md-7 cardtotal">

                  <div className="row ">
                    <div className="col-md-12 text-right border-bottom mb-5">
                      <h3 className="text-black h4 text-uppercase">Cart Totals</h3>
                    </div>
                  </div>
                  <div className="row mb-5">
                    <div className="col-md-6">
                      <span className="text-black">Total</span>
                    </div>
                    <div className="col-md-6 text-right">
                      <strong className="text-black">{cart.reduce((total, item) => total + item.prix * item.quantity, 0).toFixed(2)} Ariary</strong>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                    <button 
                          className="btn btn-black btn-lg py-3 btn-block" ><Link className="nav-link" to="/checkout">Aller en paiement</Link>
    
  </button>
                    </div>
                  </div>
                </div>



              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
