import React, { useEffect, useState } from "react";
import axios from "axios";
import defaultProfile from "../assets/images/default-img.png"; // Image de profil par défaut

function Profile({ onClose }) {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    phone: "",
    photo: defaultProfile,
  });
  const [image, setImage] = useState(null); // Pour stocker l'image sélectionnée

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8080/utilisateur/profile", {
          withCredentials: true,
        });

        setProfile({
          firstName: response.data.nomCli,
          lastName: response.data.prénomCli,
          address: response.data.adresseCli,
          email: response.data.emailU,
          phone: response.data.phoneCli,
          photo: response.data.photo || defaultProfile,
        });
      } catch (error) {
        console.error("Erreur lors de la récupération du profil :", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]); // Mettre à jour l'image sélectionnée
    }
  };

  const handleSaveClick = async () => {
    const formData = new FormData();
    formData.append("firstName", profile.firstName);
    formData.append("lastName", profile.lastName);
    formData.append("address", profile.address);
    formData.append("email", profile.email);
    formData.append("phone", profile.phone);
    if (image) {
      formData.append("photo", image); // Ajouter la nouvelle image si sélectionnée
    }

    try {
      await axios.put("http://localhost:8080/utilisateur/profile", formData, {
        withCredentials: true,
      });
      setProfile({ ...profile, photo: image ? URL.createObjectURL(image) : profile.photo });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil :", error);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>Profil Client</h2>

        {/* Photo de profil alignée à gauche avec les infos */}
        <div className="profile-container">
          <img src={profile.photo} alt="Profil" className="profile-picture" />
          <div className="profile-info">
            <input
              type="text"
              name="firstName"
              value={profile.firstName}
              onChange={handleInputChange}
              placeholder="Nom"
            />
            <input
              type="text"
              name="lastName"
              value={profile.lastName}
              onChange={handleInputChange}
              placeholder="Prénom"
            />
            <input
              type="text"
              name="address"
              value={profile.address}
              onChange={handleInputChange}
              placeholder="Adresse"
            />
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
            <input
              type="tel"
              name="phone"
              value={profile.phone}
              onChange={handleInputChange}
              placeholder="Téléphone"
            />
            <div>
              <label htmlFor="photo">Changer la photo de profil</label>
              <input
                type="file"
                id="photo"
                name="photo"
                onChange={handleImageChange}
              />
            </div>
          </div>
        </div>

        {/* Bouton Enregistrer */}
        <div className="profile-buttons">
          <button className="btn btn-success" onClick={handleSaveClick}>Enregistrer</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
