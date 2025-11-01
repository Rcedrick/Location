import React, { useEffect, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";

export function LocationList() {
    const url = "http://localhost:8080/api/locations/client/";
    const url2 = "http://localhost:8080/details/locationPar/";

    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [hoveredLocation, setHoveredLocation] = useState(null);
    const [details, setDetails] = useState(null);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const response = await axios.get('http://localhost:8080/session/utilisateur', { withCredentials: true });
            setUser(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération de l'utilisateur :", error);
            setError("Aucun utilisateur connecté");
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchLocations();
        }
    }, [user]);

    const fetchLocations = async () => {
        if (!user) {
            setError("Utilisateur non connecté");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(`${url}${user.id}`);
            setLocations(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Erreur lors de la récupération des locations :", error);
            setError("Une erreur est survenue lors de la récupération des données.");
            setLoading(false);
        }
    };

    // Fonction pour générer la facture en PDF sans utiliser jspdf-autotable
    const generateInvoice = async (location) => {
        try {
            const response = await axios.get(`${url2}${location.idL}`);
            const details = response.data;

            // Créer une nouvelle instance de jsPDF
            const doc = new jsPDF();

            // Ajouter un titre
            doc.setFontSize(18);
            doc.text("Facture", 105, 20, null, null, "center");

            // Ajouter les informations du client et la date
            doc.setFontSize(12);
            doc.text(`Client: ${user.nom} ${user.prenom}`, 20, 40);
            doc.text(`Adresse: ${user.adresse}`, 20, 50);
            doc.text(`Téléphone: ${user.phone}`, 20, 60);
            doc.text(`Date de la location: ${location.date}`, 20, 70);

            // Ajouter les détails des produits dans un tableau manuel
            doc.text("Produits :", 20, 80);
            let yPosition = 90;

            // Entête du tableau
            doc.text("Produit", 20, yPosition);
            doc.text("Quantité", 100, yPosition);
            doc.text("Prix", 160, yPosition);

            // Détails des produits
            details.forEach((detail) => {
                yPosition += 10;
                doc.text(detail.produit.nomP, 20, yPosition);
                doc.text(detail.nbrProd.toString(), 100, yPosition);
                doc.text(`${detail.produit.prix} Ar`, 160, yPosition);
            });

            // Ajouter le total
            yPosition += 15;
            doc.text(`Total: ${location.total} Ar`, 20, yPosition);

            // Télécharger le PDF
            doc.save(`facture-${location.idL}.pdf`);

        } catch (error) {
            console.error("Erreur lors de la récupération des détails :", error);
            alert("Impossible de générer la facture.");
        }
    };
    
    
    const handleMouseEnterCell = async (idL, event) => {
        if (!event.target.closest(".actions-cell")) {
            setHoveredLocation(idL);
            const rect = event.target.getBoundingClientRect();
            setPopupPosition({
                top: rect.top + window.scrollY + 30,
                left: rect.left + window.scrollX + rect.width + 10,
            });

            try {
            console.log("111111");
                const response = await axios.get(`${url2}${idL}`);
                console.log("22222");
                setDetails(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des détails :", error);
                setDetails(null);
                console.log("4444");
            }
        }
    };

    const handleMouseLeave = () => {
        setHoveredLocation(null);
        setDetails(null);
    };

    
    

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mt-4">
            <h2>Liste des Locations</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Date Début</th>
                        <th>Date Fin</th>
                        <th>Total</th>
                        <th>Paiement</th>
                        <th>Statut</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {locations.length === 0 ? (
                        <tr>
                            <td colSpan="8" className="text-center">Aucune location trouvée</td>
                        </tr>
                    ) : (
                        locations.map((location) => (
                            <tr key={location.idL}>
                                {["date", "dateDebut", "dateFin", "total", "modeP", "validation"].map((field, index) => (
                                    <td
                                        key={index}
                                        onMouseEnter={(e) => handleMouseEnterCell(location.idL, e)}
                                        onMouseLeave={handleMouseLeave}
                                        style={{ cursor: "pointer" }}
                                    >
                                        {location[field]}
                                    </td>
                                ))}
                                <td>
                                    {location.paiement ? (
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => generateInvoice(location)}
                                        >
                                            🧾 Facture
                                        </button>
                                    ) : (
                                        "Non payé"
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
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
                    {details.length > 0 ? (
                        details.map((detail) => (
                            <ul key={detail.idD}>
                                <li>Produit: {detail.produit.nomP}</li>
                                <li>Prix: {detail.produit.prix} Ar</li>
                                <li>Quantité: {detail.nbrProd}</li>
                            </ul>
                        ))
                    ) : (
                        <p>Aucun détail disponible</p>
                    )}
                </div>
            )}
        </div>
    );
}

