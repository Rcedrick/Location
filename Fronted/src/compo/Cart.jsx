import React from "react";
import { useCart } from "../context/CartContext.jsx";

function Cart() {
    const { cart, removeFromCart, updateQuantity } = useCart();

    return (
        <div>
            <h1>Panier</h1>
            {cart.length === 0 ? (
                <p>Votre panier est vide.</p>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Produit</th>
                            <th>Prix</th>
                            <th>Quantité</th>
                            <th>Total</th>
                            <th>Supprimer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item) => (
                            <tr key={item.idP}>
                                <td>
                                    <img src={`http://localhost:8080/aa/image/${item.imageP}`} alt={item.nomP} style={{ width: "50px" }} />
                                </td>
                                <td>{item.nomP}</td>
                                <td>{item.prix} Ariary</td>
                                <td>
                                    <button onClick={() => updateQuantity(item.idP, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                                    {item.quantity}
                                    <button onClick={() => updateQuantity(item.idP, item.quantity + 1)}>+</button>
                                </td>
                                <td>{item.prix * item.quantity} Ariary</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => removeFromCart(item.idP)}>X</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Cart;
