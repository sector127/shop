import React, { useState } from "react";
import { createContext, useContext } from "react";
import uuid from "react-uuid";
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
      let defaultSelected = [];
      products.attributes.forEach((attr) => {
        let allAttr = {};
        allAttr.name = attr.name;
        allAttr.value = attr.items[0].value;
        defaultSelected.push(allAttr);
      });
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
      } else {
        return {
          ...prev,
          cartTotal: prev.cartTotal + 1,
          products: {
            ...prev.products,
            [products.id + uuid()]: {
              id: products.id,
              wish: true,
              qty: 1,
              attributes: products.attributes,
              gallery: products.gallery,
              name: products.name,
              brand: products.brand,
              prices: products.prices,
              selectedAttr:
                products.selectedAttr?.length > 0
                  ? products.selectedAttr
                  : defaultSelected,
            },
          },
          total:
            prev.total +
            products.prices.find((c) => c.currency.symbol === currentCurrency)
              .amount,
        };
      }
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
      let selected = {
        name: attr,
        value: value,
      };
      const arr = inCart[products.id].selectedAttr;
      const indexOfObject = inCart[products.id]?.selectedAttr.findIndex(
        (object) => object.name === selected.name
      );
      if (arr.some((s) => s.name === attr && s.value === value)) {
        arr.splice(indexOfObject, 1);
        return {
          ...prev,
          products: {
            ...prev.products,
            [products.id]: {
              ...products,
              selectedAttr: arr,
            },
          },
        };
      } else if (arr.some((s) => s.name === attr)) {
        arr.splice(indexOfObject, 1);
        arr.push(selected);
        return {
          ...prev,
          products: {
            ...prev.products,
            [products.id]: {
              ...products,
              selectedAttr: arr,
            },
          },
        };
      } else
        return {
          ...prev,
          products: {
            ...prev.products,
            [products.id]: {
              ...products,
              selectedAttr: [...products.selectedAttr, selected],
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
