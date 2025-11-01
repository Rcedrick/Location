import React, { useState } from "react";
import axios from 'axios'; // Importer axios
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    adresse: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "client" // Ajouter un champ role avec valeur par défaut "client"
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateStep1 = () => {
    const { firstName, lastName, address, phone } = formData;
    if (!firstName || !lastName || !address || !phone) {
      setError("Veuillez remplir tous les champs.");
      return false;
    }
    setError("");
    return true;
  };

  const validateStep2 = () => {
    const { email, password, confirmPassword } = formData;
    if (!email || !password || !confirmPassword) {
      setError("Veuillez remplir tous les champs.");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return false;
    }
    setError("");
    return true;
  };

  const nextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const prevStep = () => {
    setStep(1);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (validateStep2()) {
      try {
        const response = await axios.post('http://localhost:8080/utilisateur/register', formData);
        console.log(response.data);
        alert("Inscription réussie !");
        navigate('/');
      } catch (error) {
        console.error(error);
        setError("Erreur lors de l'inscription.");
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-body">
              <h2 className="text-center mb-4">S'inscrire</h2>

              {error && <div className="alert alert-danger">{error}</div>} {/* Afficher les erreurs */}

              <form onSubmit={handleRegister}>
                {step === 1 && (
                  <>
                    <div className="mb-3">
                      <label className="form-label">Nom</label>
                      <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Prénom</label>
                      <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Numéro de téléphone</label>
                      <input
                        type="tel"
                        className="form-control"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Adresse</label>
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </div>
                    <button type="button" className="btn btn-primary w-100" onClick={nextStep}>
                      Suivant
                    </button>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Mot de passe</label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Confirmer le mot de passe</label>
                      <input
                        type="password"
                        className="form-control"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                    </div>
                    <div hidden className="mb-3">
                      <label className="form-label">Rôle</label>
                      <select hidden
                        className="form-control"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                      >
                        <option value="client">Client</option>
                        <option value="admin">Administrateur</option>
                      </select>
                    </div>
                    <div className="d-flex justify-content-between">
                      <button type="button" className="btn btn-secondary" onClick={prevStep}>
                        Précédent
                      </button>
                      <button type="submit" className="btn btn-success">
                        S'inscrire
                      </button>
                    </div>
                  </>
                )}
              </form>

              <div className="mt-3 text-center">
                <p>Vous avez déjà un compte ? <a href="/">Se connecter</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

