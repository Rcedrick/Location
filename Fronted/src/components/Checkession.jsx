import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CheckSession = () => {
  const [sessionStatus, setSessionStatus] = useState('');

  useEffect(() => {
    // Vérifier l'état de la session au démarrage du composant
    axios
      .get('http://localhost:8080/session/utilisateur', { withCredentials: true })
      .then((response) => {
        setSessionStatus(`Utilisateur connecté avec ID : ${response.data.id}`);
        console.log(response.data);
      })
      .catch(() => {
        setSessionStatus('Aucun utilisateur connecté');
      });
  }, []);

  return <div>{sessionStatus}</div>;
};

export default CheckSession;
