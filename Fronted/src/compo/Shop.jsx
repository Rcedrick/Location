import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext.jsx";

function Shop() {
    const [products, setProducts] = useState([]);
    const { addToCart } = useCart();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:8080/aa");
            setProducts(response.data);
        } catch (error) {
            console.error("Erreur API:", error);
        }
    };

    return (
        <div>
            <h1>Shop</h1>
            <div className="row">
                {products.map((product) => (
                    <div key={product.idP} className="col-12 col-md-4 col-lg-3 mb-5">
                        <div className="product-item">
                            <img src={`http://localhost:8080/aa/image/${product.imageP}`} alt={product.nomP} className="img-fluid" />
                            <h3>{product.nomP}</h3>
                            <strong>{product.prix} Ariary</strong>
                            <button className="btn btn-primary" onClick={() => addToCart(product)}>Ajouter</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Shop;
