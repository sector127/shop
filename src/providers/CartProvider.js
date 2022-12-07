import { isObjectType } from "graphql";
import React, { useState } from "react";
import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks";

export const CartContext = createContext({
  cartTotal: 0,
});
CartContext.displayName = "CartContext";

export const CartProvider = ({ children }) => {
  const [addToCart, setAddToCart] = useLocalStorage("Shop-App", {
    cartTotal: 0,
    total: 0,
    products: {},
  });

  const [currentCurrency, setCurrentCurrency] = useState("$");

  const toCart = (products) => {
    setAddToCart((prev) => {
      if (prev.products[products.id]) {
        const inCart = { ...prev.products };
        inCart[products.id].qty = inCart[products.id].qty + 1;
        return {
          ...prev,
          cartTotal: prev.cartTotal + 1,
          products: {
            ...inCart,
          },
          total:
            prev.total +
            products.prices.find((c) => c.currency.symbol === currentCurrency)
              .amount,
        };
      } else
        return {
          ...prev,
          cartTotal: prev.cartTotal + 1,
          products: {
            ...prev.products,
            [products.id]: {
              wish: true,
              qty: 1,
              attr: products.attributes,
              image: products.gallery,
              name: products.name,
              brand: products.brand,
              prices: products.prices,
              selectedAttr: [],
            },
          },
          total:
            prev.total +
            products.prices.find((c) => c.currency.symbol === currentCurrency)
              .amount,
        };
    });
  };

  const offCart = (products) => {
    setAddToCart((prev) => {
      let inCart = { ...prev.products };
      if (prev.products[products.id]) {
        const cartProduct = prev.products[products.id];
        if (cartProduct.qty > 1) {
          inCart[products.id].qty = inCart[products.id].qty - 1;
        } else {
          delete inCart[products.id];
        }
      }

      return {
        ...prev,
        cartTotal: prev.cartTotal - 1,
        products: {
          ...inCart,
        },
        total:
          prev.total -
          products.prices.find((c) => c.currency.symbol === currentCurrency)
            .amount,
      };
    });
  };

  const cartAttr = (products, attr, value) => {
    setAddToCart((prev) => {
      const inCart = { ...prev.products };
      const selected = inCart[products.id].selectedAttr?.find(
        (obj) => obj.name === attr
      );
      const indexOfObject = inCart[products.id].selectedAttr?.findIndex(
        (object) => {
          return object.name === selected.name;
        }
      );
      if (selected) {
        inCart[products.id].selectedAttr.splice(indexOfObject, 1);
      }

      return {
        ...prev,
        products: {
          ...prev.products,
          [products.id]: {
            ...products,
            selectedAttr: [
              ...products.selectedAttr,
              { name: attr, value: value },
            ],
          },
        },
      };
    });
  };

  return (
    <CartContext.Provider
      value={{
        addToCart,
        toCart,
        offCart,
        currentCurrency,
        setCurrentCurrency,
        cartAttr,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useIncart = () => {
  const inCart = useContext(CartContext);
  if (!inCart) {
    throw SyntaxError("CartProvider is not defined");
  }

  return inCart;
};
