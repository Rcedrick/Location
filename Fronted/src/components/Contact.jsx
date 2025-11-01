import React, { useEffect, useState } from 'react';
import axios from 'axios';
function Contact () {
    const [user, setUser] = useState(null);
  
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
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-8 pb-4">
          <div className="row mb-5">
            <div className="col-lg-4 d-flex align-items-center">
              <div className="me-3">
                <i className="bi bi-geo-alt-fill fs-3 text-primary"></i>
              </div>
              <p className="mb-0">Fianarantsoa. Amponenana, Ex sympa 2000</p>
            </div>
            <div className="col-lg-4 d-flex align-items-center">
              <div className="me-3">
                <i className="bi bi-envelope-fill fs-3 text-primary"></i>
              </div>
              <p className="mb-0">ratsimbazafycedrick.com</p>
            </div>
            <div className="col-lg-4 d-flex align-items-center">
              <div className="me-3">
                <i className="bi bi-telephone-fill fs-3 text-primary"></i>
              </div>
              <p className="mb-0">+1 294 48 561 30</p>
            </div>
          </div>
          <form>
            <div className="row mb-3">
              <div className="col-6">
                <label className="form-label">Nom</label>
                <input type="text" className="form-control"  value={user?.nom}/>
              </div>
              <div className="col-6">
                <label className="form-label">Prénom</label>
                <input type="text" className="form-control" value={user?.prenom} />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Adresse Email</label>
              <input type="email" className="form-control"  value={user?.email}/>
            </div>
            <div className="mb-4">
              <label className="form-label">Message</label>
              <textarea className="form-control" rows="5"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Envoyer Message</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact;
