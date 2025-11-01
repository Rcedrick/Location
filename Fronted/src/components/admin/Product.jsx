import React, { useEffect, useState } from "react";
import axios from 'axios';
import "../../assets/admin/product.css";
export function Product() {
    const url = `http://localhost:8080/aa/image/`;

    const [dataP, setDataP] = useState({
        nomP: "",
        prix: "",
        stock: "",
        description: "",
        idC: ""
    });

    useEffect(() => {
        afficheP();
    }, []);

    const [tabP, setTab] = useState([]);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(true);
    const [idProduit, setIdProduit] = useState("");

    // Récupérer la liste des produits
    const afficheP = async () => {
        try {
            const response = await axios.get("http://localhost:8080/aa");
            setTab(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des produits :", error);
        }
    };

    // Sélection d'une image
    const selectImage = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
        }
    };

    // Gestion des changements des inputs
    const HandleChange = (e) => {
        setDataP({
            ...dataP,
            [e.target.name]: e.target.value
        });
    };

    // Suppression d'un produit
    const handleDelete = async (idP) => {
        try {
            await axios.delete("http://localhost:8080/aa/" + idP);
            setTab(tabP.filter(item => item.idP !== idP));
        } catch (error) {
            console.error("Erreur lors de la suppression :", error);
        }
    };

    // Ajouter ou modifier un produit
    const ajouterProduit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("nomP", dataP.nomP);
        formData.append("prix", dataP.prix);
        formData.append("stock", dataP.stock);
        if(image){
            formData.append("imageP", image);
        }
        formData.append("description", dataP.description);
        formData.append("idC", dataP.idC);

        try {
            if (type) {
                await axios.post("http://localhost:8080/aa", formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                console.log("Produit ajouté !");
            } else {
                await axios.put(`http://localhost:8080/aa/${idProduit}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                console.log("Produit modifié !");
            }
            afficheP();
        } catch (error) {
            console.error("Erreur lors de l'ajout/modification :", error);
        }
    };

    // Charger les détails d'un produit
    const handleNatha = async (nomP, prix, stock, desc, idC, img) => {
        setDataP({ nomP, prix, stock, description: desc, idC });

        try {
            const response = await axios.get(url + img, { responseType: "blob" });
            const file = new File([response.data], img, { type: response.data.type });
            setImage(file);
        } catch (error) {
            console.error("Erreur lors du chargement de l'image :", error);
        }
    };

    // Modifier un produit
    const handleUpdate = async (nomP, prix, stock, desc, idC, img, idP) => {
        setDataP({ nomP, prix, stock, description: desc, idC });
        setIdProduit(idP);
        setType(false);

        try {
            const response = await axios.get(url + img, { responseType: "blob" });
            const file = new File([response.data], img, { type: response.data.type });
            setImage(file);
        } catch (error) {
            console.error("Erreur lors du chargement de l'image :", error);
        }
    };

    return (
        <div>
        <form onSubmit={ajouterProduit}>
            {image ? (
                image instanceof File ? (
                    <img src={URL.createObjectURL(image)} width={100} height={100} alt="Produit" />
                ) : (
                    <p>Aucune image sélectionnée</p>
                )
            ) : (
                <p>Aucune image sélectionnée</p>
            )}
            <br />
            <input type="text" value={dataP.nomP} name="nomP" placeholder="Nom" onChange={HandleChange} className="form-control"/> <br />
            <input type="text" value={dataP.prix} name="prix" placeholder="Prix" onChange={HandleChange} className="form-control"/> <br />
            <input type="text" value={dataP.stock} name="stock" placeholder="Stock" onChange={HandleChange} className="form-control"/> <br />
            <input type="text" value={dataP.description} name="description" placeholder="Description" onChange={HandleChange} className="form-control"/> <br />
            <select name="idC" value={dataP.idC} onChange={HandleChange} className="form-control">
                <option value="">-- Choisir une catégorie --</option>
                <option value="1">Ordinateur</option>
                <option value="2">Imprimante</option>
                <option value="3">Scanneur</option>
                <option value="4">Ecran</option>
                <option value="5">Casque</option>
                <option value="6">Clavier</option>
                <option value="6">Souris</option>
            </select>
            <br/>
            <input type="file" onChange={selectImage} /> <br />
            <button type="submit">{type ? 'Ajouter' : 'Modifier'}</button>

        </form>
    
        <h3>Liste des Produits</h3>
        <div className="produit-grid">
            {tabP.map((product, i) => (
                <div className="produit-item" key={i}>
                    <img src={url + product.imageP} width={100} height={100} alt="Produit" />
                    <h4>{product.nomP}</h4>
                    <p>{product.description}</p>
                    <p><strong>Prix:</strong> {product.prix}</p>
                    <p><strong>Stock:</strong> {product.stock}</p>
                    <p><strong>Catégorie:</strong> {product.categorie.nomC}</p>
                    <div className="produit-actions">
                        <button 
                            className="btn btn-primary"
                            onClick={() => handleNatha(product.nomP, product.prix, product.stock, product.description, product.categorie.idC, product.imageP)}>
                            Détail
                        </button>
                        <button 
                            className="btn btn-warning"
                            onClick={() => handleUpdate(product.nomP, product.prix, product.stock, product.description, product.categorie.idC, product.imageP, product.idP)}>
                            Modifier
                        </button>
                        <button 
                            className="btn btn-danger"
                            onClick={() => handleDelete(product.idP)}>
                            Supprimer
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
    /*<div className="container mt-4">
    <div className="row">
        <div className="col-md-5">
            <h4>{type ? "Ajouter un produit" : "Modifier un produit"}</h4>
            <form onSubmit={ajouterProduit}>
                {image && image instanceof File && (
                    <img src={URL.createObjectURL(image)} width={100} height={100} alt="Produit" />
                )}
                <div className="mb-2">
                    <input type="text" value={dataP.nomP} name="nomP" placeholder="Nom" onChange={HandleChange} className="form-control" />
                </div>
                <div className="mb-2">
                    <input type="text" value={dataP.prix} name="prix" placeholder="Prix" onChange={HandleChange} className="form-control" />
                </div>
                <div className="mb-2">
                    <input type="text" value={dataP.stock} name="stock" placeholder="Stock" onChange={HandleChange} className="form-control" />
                </div>
                <div className="mb-2">
                    <input type="text" value={dataP.description} name="description" placeholder="Description" onChange={HandleChange} className="form-control" />
                </div>
                <div className="mb-2">
                    <select name="idC" value={dataP.idC} onChange={HandleChange} className="form-control">
                        <option value="">-- Choisir une catégorie --</option>
                        <option value="1">Ordinateur</option>
                        <option value="2">Imprimante</option>
                        <option value="3">Scanneur</option>
                        <option value="4">Ecran</option>
                        <option value="5">Casque</option>
                        <option value="6">Clavier</option>
                        <option value="7">Souris</option>
                    </select>
                </div>
                <div className="mb-2">
                    <input type="file" onChange={selectImage} className="form-control" />
                </div>
                <button type="submit" className="btn btn-success w-100">{type ? 'Ajouter' : 'Modifier'}</button>
            </form>
        </div>

        <div className="col-md-7">
            <h4>Liste des Produits</h4>
            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>Image</th>
                        <th>Nom</th>
                        <th>Prix</th>
                        <th>Stock</th>
                        <th>Catégorie</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tabP.map((product, i) => (
                        <tr key={i}>
                            <td><img src={url + product.imageP} width={60} height={60} alt="Produit" /></td>
                            <td>{product.nomP}</td>
                            <td>{product.prix}</td>
                            <td>{product.stock}</td>
                            <td>{product.categorie.nomC}</td>
                            <td>
                                <button className="btn btn-info btn-sm me-1"
                                    onClick={() => handleNatha(product.nomP, product.prix, product.stock, product.description, product.categorie.idC, product.imageP)}>
                                    Détail
                                </button>
                                <button className="btn btn-warning btn-sm me-1"
                                    onClick={() => handleUpdate(product.nomP, product.prix, product.stock, product.description, product.categorie.idC, product.imageP, product.idP)}>
                                    Modifier
                                </button>
                                <button className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(product.idP)}>
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                    {tabP.length === 0 && (
                        <tr>
                            <td colSpan="6" className="text-center">Aucun produit trouvé</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
</div>*/
    );
}

