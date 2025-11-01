import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

export function RentalCalendar() {
    const [date, setDate] = useState(new Date());
    const [validRentals, setValidRentals] = useState([]);
    const [colorMap, setColorMap] = useState({});

    useEffect(() => {
        fetchRentals();
    }, []);

    const fetchRentals = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/locations");
            const validLocations = response.data.filter(loc => loc.validation === "VALIDEE");

            setValidRentals(validLocations);
            assignColors(validLocations);
        } catch (error) {
            console.error("Erreur lors de la récupération des locations :", error);
        }
    };

    // Fonction pour générer une couleur unique par location validée
    const assignColors = (locations) => {
        const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF", "#33FFF2", "#FFC300"];
        let colorAssignment = {};
        let usedIndexes = {};

        locations.forEach((location) => {
            if (!usedIndexes[location.nomP]) {
                usedIndexes[location.nomP] = Object.keys(usedIndexes).length % colors.length;
            }
            colorAssignment[location.idL] = colors[usedIndexes[location.nomP]];
        });

        setColorMap(colorAssignment);
    };

    return (
        <div className="calendar-container">
            <h3>Calendrier des Locations Validées</h3>
            <Calendar 
                onChange={setDate} 
                value={date} 
                tileContent={({ date, view }) => {
                    if (view === "month") {
                        const formattedDate = date.toISOString().split("T")[0];

                        const rental = validRentals.find(
                            (r) => r.dateDebut <= formattedDate && r.dateFin >= formattedDate
                        );

                        return rental ? (
                            <div className="rental-tag" style={{ backgroundColor: colorMap[rental.idL] }}>
                                {rental.nomP}
                            </div>
                        ) : null;
                    }
                }}
            />
        </div>
    );
}

