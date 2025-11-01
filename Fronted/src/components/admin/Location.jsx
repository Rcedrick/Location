import React, { useEffect, useState } from "react";
import axios from "axios";

export function Location() {
    const url = "http://localhost:8080/api/locations/status/attente";
    const url2 = "http://localhost:8080/details/locationPar/";

    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hoveredLocation, setHoveredLocation] = useState(null);
    const [details, setDetails] = useState(null);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

    const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

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

    // Fonction pour trier les données en fonction de la clé et de la direction
    const sortData = (key) => {
        const direction = 
            sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc"; // Toggle the sort direction
        setSortConfig({ key, direction });

        const sortedLocations = [...locations].sort((a, b) => {
            if (key === "date" || key === "dateDebut" || key === "dateFin") {
                const dateA = new Date(a[key]);
                const dateB = new Date(b[key]);
                return direction === "asc" ? dateA - dateB : dateB - dateA;
            } else if (key === "total") {
                return direction === "asc" ? a[key] - b[key] : b[key] - a[key];
            }
            return 0;
        });

        setLocations(sortedLocations);
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
                console.log("3333");
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

    // Fonction pour mettre à jour le statut de la location
    const updateStatus = async (idL, status) => {
        try {
            await axios.put(`http://localhost:8080/api/locations/${idL}/status`, { status });
            // Après la mise à jour, on recharge les locations
            console.log("2dddd");
            fetchLocations();
            
        } catch (error) {
        console.log("3dddd");
            console.error("Erreur lors de la mise à jour du statut :", error);
        }
    };

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mt-4">
            <h2>Liste des Locations</h2>

            {/* Ajouter des boutons pour trier */}
            <div className="mb-3">
                <button
                    className="btn btn-primary me-2"
                    onClick={() => sortData("date")}
                >
                    Trier par Date {sortConfig.key === "date" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </button>
                <button
                    className="btn btn-primary"
                    onClick={() => sortData("total")}
                >
                    Trier par Montant {sortConfig.key === "total" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </button>
            </div>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
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
                                {["idL", "date", "dateDebut", "dateFin", "total", "modeP", "validation"].map((field, index) => (
                                    <td
                                        key={index}
                                        onMouseEnter={(e) => handleMouseEnterCell(location.idL, e)}
                                        onMouseLeave={handleMouseLeave}
                                        style={{ cursor: "pointer" }}
                                    >
                                        {location[field]}
                                    </td>
                                ))}
                                <td className="actions-cell">
                                    <button 
                                        className="btn btn-success btn-sm me-2"
                                        onClick={() => updateStatus(location.idL, "VALIDEE")}
                                    >
                                        ✅
                                    </button>
                                    <button 
                                        className="btn btn-danger btn-sm"
                                        onClick={() => updateStatus(location.idL, "REJETEE")}
                                    >
                                        ❌
                                    </button>
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

