import React from "react";
import { Link } from "react-router-dom";
import uuid from "react-uuid";
import { useSelector } from "react-redux";
import { CartAttributes } from "../../attributes/CartAttributes";

import "./Cart.css";
import { CartItem } from "./CartItem";

export const Cart = (props) => {
  const cartItems = useSelector((state) => state.cart.items);
  const { currency } = useSelector((state) => state.cart.currency);
  const totalPrice = useSelector((state) => state.cart.cartTotalPrice);
  return (
    <div className="mini-cart-container" key={uuid()}>
      <div className="mini-cart" key={uuid()}>
        {cartItems.length < 1 && <span>Your cart is empty</span>}
        <ul key={uuid()}>
          {cartItems.map((item) => {
            console.log(item);
            const price = item.prices.find(
              (c) => c.currency.symbol === currency
            ).amount;
            const allAttibutes = item.attributes.map((attribute) => attribute);
            return (
              <div key={uuid()}>
                <CartItem
                  key={item.id}
                  item={{
                    id: item.id,
                    brand: item.brand,
                    name: item.name,
                    quantity: item.quantity,
                    price: price,
                    priceSymbol: currency,
                    gallery: item.gallery[0],
                    prices: item.prices,
                    totalPrice: item.totalPrice,
                  }}
                />
                <CartAttributes
                  key={uuid()}
                  attributes={allAttibutes}
                  id={item.id}
                  cartCl="mini-"
                />
              </div>
            );
          })}
        </ul>
        <div className="total">
          <span className="total-title">Total</span>
          <span className="total-price">
            {currency}
            {Math.round(totalPrice)}
          </span>
        </div>
        <div className="checkout">
          <Link to="/bag">
            <button className="view-bag-btn">VIEW BAG</button>
          </Link>
          <button className="checkout-btn">CHECKOUT</button>
        </div>
      </div>
    </div>
  );
};
