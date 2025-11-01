import React, { useEffect, useState } from "react";
import axios from "axios";

export function Client() {
    
    const url = `http://localhost:8080/utilisateur`;
    const [utilisateurs, setUtilisateurs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        fetchUtilisateurs();
    }, []);

    const fetchUtilisateurs = async () => {
        console.log("ffff0");
        try {
            console.log("ffff1");
            const response = await axios.get(url);
            console.log("ffff2");
            setUtilisateurs(response.data);
            setLoading(false);
            console.log(response.data);
            console.log("ccccc");
        } catch (error) {
            console.error("Erreur lors de la récupération des utilisateurs :", error);
            setError("Une erreur est survenue lors de la récupération dkes données.");
            setLoading(false);
        }
    };

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mt-4">
            <h2>Liste des clients</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom et Prénom</th>
                        <th>Adresse Email</th>
                        <th>Phone</th>
                        <th>Adresse</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {utilisateurs.length === 0 ? (
                        <tr>
                            <td colSpan="7" className="text-center">Aucune client trouvé</td>
                        </tr>
                    ) : (
                        utilisateurs.map((utilisateur) => (
                            <tr>
                                <td>{utilisateur.idU}</td>
                                <td>{utilisateur.client.nomCli} {utilisateur.client.prenomCli}</td>
                                <td>{utilisateur.emailU}</td>
                                <td>{utilisateur.client.phoneCli}</td>
                                <td>{utilisateur.client.adresseCli}</td>
                               	<td>
                                    <button className="btn btn-primary btn-sm">Voir</button>
                                    <button className="btn btn-second btn-sm">Modifier</button>
                                    <button className="btn btn-danger btn-sm">Suprimmer</button>
				                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

