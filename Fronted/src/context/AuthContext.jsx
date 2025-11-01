import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Créer le contexte
const AuthContext = createContext();

// Composant Provider pour envelopper l'application
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 🔥 Ajout d'un état de chargement

  // Fonction pour récupérer l'utilisateur connecté depuis la session
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:8080/session/utilisateur', { withCredentials: true });
        setUser(response.data);
        console.log(" Utilisateur récupéré :", response.data);
      } catch (error) {
        setUser(null);
        console.log(" Aucun utilisateur connecté.");
      } finally {
        setLoading(false); // Fin du chargement
      }
    };

    fetchUser();
  }, []);

  // Détecter si l'utilisateur change
  useEffect(() => {
    console.log(" Mise à jour de l'utilisateur :", user);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {!loading && children} {/* 🔥 Ne pas afficher l'UI tant que le chargement n'est pas terminé */}
    </AuthContext.Provider>
  );
};

// Hook pour accéder au contexte utilisateur
export const useAuth = () => {
  return useContext(AuthContext);
};

