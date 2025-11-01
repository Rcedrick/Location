import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

// Hook personnalisé pour accéder au contexte
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Ajouter un produit
    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.idP === product.idP);
            if (existingProduct) {
                return prevCart.map((item) =>
                    item.idP === product.idP ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    // Supprimer un produit
    const removeFromCart = (idP) => {
        setCart((prevCart) => prevCart.filter((item) => item.idP !== idP));
    };

    // Modifier la quantité
    const updateQuantity = (idP, quantity) => {
        setCart((prevCart) =>
            prevCart.map((item) => item.idP === idP ? { ...item, quantity } : item)
        );
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};
