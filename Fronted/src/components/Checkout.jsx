import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from "../context/CartContext"; 

function Checkout() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const { cart } = useCart();
  
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalFinal, setTotalFinal] = useState(0);
  const [dateError, setDateError] = useState('');
  const [paymentMode, setPaymentMode] = useState('');
  
  useEffect(() => {
    axios.get('http://localhost:8080/session/utilisateur', { withCredentials: true })
      .then(response => {
        console.log("Utilisateur récupéré :", response.data);
        setUser(response.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
        setError("Aucun utilisateur connecté");
      });
  }, []);
  

  // Calcul du total de la commande
  const totalCommande = cart.reduce((total, item) => total + item.prix * item.quantity, 0);

  // Fonction pour valider et mettre à jour les dates
  const handleStartDateChange = (e) => {
    const selectedStartDate = e.target.value;
    const today = new Date().toISOString().split("T")[0]; // Récupère la date d'aujourd'hui

    if (selectedStartDate <= today) {
      setDateError("La date de début ne peut pas être dans le passé.");
      setStartDate('');
    } else {
      setDateError('');
      setStartDate(selectedStartDate);
    }
  };

  const handleEndDateChange = (e) => {
    const selectedEndDate = e.target.value;

    if (startDate && selectedEndDate <= startDate) {
      setDateError("La date de fin doit être supérieure à la date de début.");
      setEndDate('');
    } else {
      setDateError('');
      setEndDate(selectedEndDate);
    }
  };

  // Calcul du total final si les dates sont valides
  useEffect(() => {
    if (startDate && endDate) {
      const date1 = new Date(startDate);
      const date2 = new Date(endDate);
      const diffTime = date2 - date1;
      const diffDays = diffTime > 0 ? Math.ceil(diffTime / (1000 * 60 * 60 * 24)) : 0;
      setTotalFinal(totalCommande * diffDays);
    } else {
      setTotalFinal(0);
    }
  }, [startDate, endDate, totalCommande]);

  // Fonction pour soumettre la commande
  const handleCheckout = () => {
    if (!startDate || !endDate || !paymentMode) {
      setDateError('Tous les champs sont obligatoires');
      return;
    }

    const panier = cart.map(item => ({
      produitId: item.idP,
      quantite: item.quantity
    }));

    const data = {
      clientId: user.id,
      dateDebut: startDate,
      dateFin: endDate,
      total: totalFinal,
      modePaiement: paymentMode, // Convertir string en number (long)
      panier
    };
    

    console.log("Données envoyées pour la commande : ", data);

    axios.post('http://localhost:8080/api/checkout', data, { withCredentials: true })
      .then(response => {
        // Rediriger ou afficher un message de succès
        window.location.href = '/thankyou';
      })
      .catch(error => {
        setError("Une erreur s'est produite lors de la commande.");
      });
  };

  return (
    <>
      {/* Hero Section */}
      <div className="hero">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-5">
              <div className="intro-excerpt">
                <h1>Checkout</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Form */}
      <div className="untree_co-section">
        <div className="container">
          <div className="row">
            {/* Détails de location */}
            <div className="col-md-6 mb-5 mb-md-0">
              <h2 className="h3 mb-3 text-black">Détails de location</h2>
              <div className="p-3 p-lg-5 border bg-white">
                <div className="form-group">
                  <label htmlFor="payment-method" className="text-black">Mode de Paiement <span className="text-danger">*</span></label>
                  <select 
                    id="payment-method" 
                    className="form-control" 
                    value={paymentMode} 
                    onChange={(e) => setPaymentMode(e.target.value)}
                  >
                    <option value="M'vola">M'vola</option>
                    <option value="Orange Money">Orange Money</option>
                    <option value="Airtel Money">Airtel Money</option>
                    <option value="Espèce">Espèce</option>
                    <option value="Paypal">Paypal</option>
                    <option value="Virement Bancaire">Virement Bancaire</option>
                  </select>
                </div>

                {/* Autres champs de formulaire */}
                <div className="form-group row">
                  <div className="col-md-6">
                    <label htmlFor="first-name" className="text-black">Nom <span className="text-danger">*</span></label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="first-name" 
                      name="first-name" 
                      value={user?.nom || ""} 
                      readOnly 
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="last-name" className="text-black">Prénom <span className="text-danger">*</span></label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="last-name" 
                      name="last-name" 
                      value={user?.prenom || ""} 
                      readOnly 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="last-name" className="text-black">Adresse Email <span className="text-danger">*</span></label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="last-name" 
                      name="last-name" 
                      value={user?.email || ""} 
                      readOnly 
                    />
                  </div>
                   <div className="col-md-6">
                    <label htmlFor="first-name" className="text-black">Phone <span className="text-danger">*</span></label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="first-name" 
                      name="first-name" 
                      value={user?.phone || ""} 
                      readOnly 
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="last-name" className="text-black">Adresse <span className="text-danger">*</span></label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="last-name" 
                      name="last-name" 
                      value={user?.adresse || ""} 
                      readOnly 
                    />
                  </div>
                  
                </div>

                {/* Autres champs... */}
              </div>
            </div>

            {/* Order Summary */}
            <div className="col-md-6">
              <h2 className="h3 mb-3 text-black">Votre Commande</h2>
              <div className="p-3 p-lg-5 border bg-white">
                <table className="table site-block-order-table mb-5">
                  <thead>
                    <tr>
                      <th>Produit</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.length === 0 ? (
                      <tr>
                        <td colSpan="2" className="text-center">Votre panier est vide</td>
                      </tr>
                    ) : (
                      cart.map((item) => (
                        <tr key={item.idP}>
                          <td>{item.nomP} <strong className="mx-2">x</strong> {item.quantity}</td>
                          <td>{(item.prix * item.quantity).toFixed(2)} Ar</td>
                        </tr>
                      ))
                    )}
                    <tr>
                      <td className="text-black font-weight-bold"><strong>Total de la commande</strong></td>
                      <td className="text-black font-weight-bold"><strong>{totalCommande.toFixed(2)} Ariary / Jours</strong></td>
                    </tr>
                  </tbody>
                </table>

                {/* Sélection des dates */}
                <div className="form-group row">
                  <div className="col-md-6">
                    <label htmlFor="start-date" className="text-black">Date début <span className="text-danger">*</span></label>
                    <input type="date" id="start-date" className="form-control" value={startDate} onChange={handleStartDateChange} required />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="end-date" className="text-black">Date fin <span className="text-danger">*</span></label>
                    <input type="date" id="end-date" className="form-control" value={endDate} onChange={handleEndDateChange} required />
                  </div>
                </div>

                {/* Message d'erreur */}
                {dateError && <p className="text-danger">{dateError}</p>}

                {/* Total final */}
                <h4 className="text-black mt-3">Total Final : <strong>{totalFinal.toFixed(2)} Ariary</strong></h4>

                <div className="form-group">
                  <button className="btn btn-black btn-lg py-3 btn-block revenir-panier" onClick={() => window.location.href = '/cart'}>Revenir au Panier</button>
                  <button className="btn btn-black btn-lg py-3 btn-block louer" onClick={handleCheckout}>Louer les produits</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
