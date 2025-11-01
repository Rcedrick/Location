import React, { useEffect, useState } from "react";
import axios from "axios";

export function Paiement() {
    const url = `http://localhost:8080/api/locations/validees-non-payees`;

    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hoveredLocation, setHoveredLocation] = useState(null);
    const [details, setDetails] = useState(null);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
        fetchLocations();
    }, []);

    const fetchLocations = async () => {
        try {
            const response = await axios.get(url);
            setLocations(response.data);
            setLoading(false);
        } catch (error) {   
            console.error("Erreur lors de la récupération des locations :", error);
            setError("Une erreur est survenue lors de la récupération des données.");
            setLoading(false);
        }
    };
    
    const updateStatus = async (idL, status) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/locations/${idL}/status`, { status });
            
            if (response.status === 200) {
                setLocations((prevLocations) =>
                    prevLocations.map((location) =>
                        location.idL === idL ? { ...location, validation: status } : location
                    )
                );
                console.log(`Location ${idL} mise à jour avec le statut : ${status}`);
            } else {
                console.error("Échec de la mise à jour du statut !");
            }
            fetchLocations();
        } catch (error) {
            console.error(`Erreur lors de la mise à jour de la location ${idL}:`, error);
        }
    };

    const updatePaiement = async (idL) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/locations/${idL}/paiement`);

            if (response.status === 200) {
                setLocations((prevLocations) =>
                    prevLocations.map((location) =>
                        location.idL === idL ? { ...location, paiement: true } : location
                    )
                );
                console.log(`Paiement mis à jour pour la location ${idL}`);
            } else {
                console.error("Erreur lors de la mise à jour du paiement !");
            }
            fetchLocations();
        } catch (error) {
            console.error(`Erreur lors de la mise à jour du paiement de la location ${idL}:`, error);
        }
    };

    const handleMouseLeave = () => {
        setHoveredLocation(null);
        setDetails(null);
    };

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>{error}</div>;

    return(
        <div className="container mt-4">
            <h2>Liste des paiements de location</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Date Début</th>
                        <th>Date Fin</th>
                        <th>Total</th>
                        <th>Paiement</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {locations.length === 0 ? (
                        <tr>
                            <td colSpan="7" className="text-center">Aucune location trouvée</td>
                        </tr>
                    ) : (
                    locations.map((location) => (
                        <tr
                            key={location.idL}
                            onMouseEnter={(e) => fetchDetails(location.idL, e)}
                            onMouseLeave={handleMouseLeave}
                            style={{ cursor: "pointer" }}
                        >
                            <td>{location.idL}</td>
                            <td>{location.date}</td>
                            <td>{location.dateDebut}</td>
                            <td>{location.dateFin}</td>
                            <td>{location.total} Ar</td>
                            <td>{location.modeP}</td>
                            <td>
                                <button 
                                    className="btn btn-success btn-sm me-2"
                                    onClick={() => updateStatus(location.idL, "ATTENTE")}
                                >
                                Annuler
                                </button>
                                <button 
                                    className="btn btn-primary btn-sm"
                                    onClick={() => updatePaiement(location.idL)}
                                >
                                Payer
                                </button>
                            </td>
                        </tr>
                    ))
                    )}
                </tbody>
            </table>

            {/* Popup flottant avec les détails */}
            {hoveredLocation && details && (
                <div
                    className="position-absolute bg-light p-3 shadow"
                    style={{
                        position: "absolute",
                        top: popupPosition.top,
                        left: popupPosition.left,
                        width: "300px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        zIndex: 1000,
                        backgroundColor: "white",
                        padding: "10px",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <h5>Détails</h5>
                    {details.length > 0 ? (details.map((detail) => (
                        <ul key={detail.idD}>
                            <li>Produit: {detail.produit.nomP}</li>
                            <li>Quantité: {detail.nbrProd}</li>
                        </ul>
                    ))):(
                        <p>Aucun détail disponible</p>
                    )}
                </div>
            )}
        </div>
    );
}

