import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

function Logout() {
  const navigate = useNavigate(); 

  const handleLogout = async () => {
    try {
      const response = await axios.get('http://localhost:8080/session/logout', { withCredentials: true });
      console.log(response.data);
      alert('Utilisateur déconnecté');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la déconnexion');
    }
  };

  return (
    <div>
      <h2>Déconnexion</h2>
      <button onClick={handleLogout}>Se déconnecter</button>
    </div>
  );
}

export default Logout;
