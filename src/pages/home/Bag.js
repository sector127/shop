import React from "react";
import { Link } from "react-router-dom";
import uuid from "react-uuid";
import { useSelector } from "react-redux";
import { CartAttributes } from "../../components/attributes/CartAttributes";

import "../../components/header/rightside/Cart.css";
import { BagItem } from "../../components/bag/BagItem";

export const Bag = (props) => {
  const cartItems = useSelector((state) => state.cart.items);
  const { currency } = useSelector((state) => state.cart.currency);
  const totalPrice = useSelector((state) => state.cart.cartTotalPrice);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  return (
    <>
      <h1 className="cart-category-title">Cart</h1>
      <div className="cart-container" key={uuid()}>
        <div className="cart-products" key={uuid()}>
          <ul className="bag-list" key={uuid()}>
            {cartItems.map((item) => {
              const price = item.prices.find(
                (c) => c.currency.symbol === currency
              ).amount;
              const allAttibutes = item.attributes.map(
                (attribute) => attribute
              );
              return (
                <div key={uuid()} className="bag-item">
                  <BagItem
                    key={item.id}
                    item={{
                      id: item.id,
                      brand: item.brand,
                      name: item.name,
                      quantity: item.quantity,
                      price: price,
                      priceSymbol: currency,
                      gallery: item.gallery,
                      prices: item.prices,
                      totalPrice: item.totalPrice,
                    }}
                  />
                  <CartAttributes
                    key={uuid()}
                    attributes={allAttibutes}
                    id={item.id}
                    cartCl={""}
                  />
                </div>
              );
            })}
          </ul>
        </div>
        <div className="tax-total">
          <div className="cart-total-qty-title">
            Tax 21%:{" "}
            <span className="tax">
              {currency}
              {Math.round(totalPrice * 0.21)}
            </span>
          </div>
          <div className="cart-total-qty">
            <div className="cart-total-qty-title">
              Quantiy: <span className="tax">{totalQuantity}</span>
            </div>
          </div>
          <div className="total-after-tax">
            Total:{" "}
            <span className="tax">
              {currency}
              {Math.round(totalPrice * 1.21)}
            </span>
          </div>
          <button className="order">ORDER</button>
        </div>
      </div>
    </>
  );
};
