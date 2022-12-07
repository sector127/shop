import React, { useEffect, useState, useRef } from "react";
import uuid from "react-uuid";

import "./Cart.css";

import { useIncart } from "../../../providers/CartProvider";
import { CartIcon } from "../../../atoms/CartIcon";
import { Collapsible } from "../../collapsible";
import { Link } from "react-router-dom";

export const Cart = () => {
  const { addToCart, toCart, offCart, currentCurrency, cartAttr } = useIncart();

  return (
    <>
      <Collapsible
        openedIcon={<CartIcon className="cart-icon" />}
        closedIcon={<CartIcon className="cart-icon" />}
        className="mini-cart"
      >
        <div className="mini-cart-title">
          <span>My Bag.</span> {addToCart.cartTotal} items
        </div>
        {Object.entries(addToCart.products).map(([products, desc]) => {
          const currentItem = {
            ...desc,
            id: products,
          };
          return (
            <div>
              <div className="mini-cart-products" key={uuid()}>
                <div className="mini-cart-product-desc" key={uuid()}>
                  <div className="mini-cart-product-desc-name" key={uuid()}>
                    {desc.name}
                  </div>
                  <div className="mini-cart-product-desc-brand" key={uuid()}>
                    {desc.brand}
                  </div>
                  <div className="mini-cart-product-price" key={uuid()}>
                    {currentCurrency}
                    {
                      desc.prices.find(
                        (c) => c.currency.symbol === currentCurrency
                      ).amount
                    }
                  </div>
                  <div className="mini-cart-product-attr">
                    {desc.attr?.map((attr) => {
                      return (
                        <div key={uuid()}>
                          <div
                            className="mini-cart-product-attr-title"
                            key={uuid()}
                          >{`${attr.name}:`}</div>
                          <div key={uuid()}>
                            {attr.items?.map((item) => {
                              const currentAttr = {
                                ...desc,
                                id: products,
                              };
                              const attrId = attr.name;
                              const attrValue = item.value;
                              let attrInCart = desc.selectedAttr.map((s) => s);
                              for (const a of attrInCart)
                                if (
                                  item.value === a.value &&
                                  attr.name === a.name
                                ) {
                                  return (
                                    <button
                                      key={uuid()}
                                      onClick={() => {
                                        cartAttr(
                                          currentAttr,
                                          attrId,
                                          attrValue
                                        );
                                      }}
                                      className={`${
                                        item.value.includes("#")
                                          ? "mini-cart-color-btn color-btn selected"
                                          : "mini-cart-btn btn-attr selected-string"
                                      }`}
                                      style={{
                                        backgroundColor: item.value,
                                      }}
                                    >
                                      {!item.value.includes("#")
                                        ? item.value
                                        : null}
                                    </button>
                                  );
                                }
                              if (item.value.includes("#")) {
                                return (
                                  <button
                                    key={uuid()}
                                    onClick={() => {
                                      cartAttr(currentAttr, attrId, attrValue);
                                      console.log(currentAttr);
                                    }}
                                    className={`mini-cart-color-btn color-btn`}
                                    style={{
                                      backgroundColor: item.value,
                                    }}
                                  ></button>
                                );
                              } else {
                                return (
                                  <button
                                    key={uuid()}
                                    className={`mini-cart-btn btn-attr `}
                                    onClick={(e) => {
                                      cartAttr(currentAttr, attrId, attrValue);
                                    }}
                                  >
                                    {item.value}
                                  </button>
                                );
                              }
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="mini-cart-qty">
                  <div className="mini-cart-qty-increment">
                    <button
                      className="mini-cart-btn btn-attr"
                      onClick={() => {
                        toCart(currentItem);
                      }}
                    >
                      +
                    </button>
                  </div>
                  <div className="mini-cart-qty-display">{desc.qty}</div>
                  <div className="mini-cart-qty-decrement">
                    <button
                      className="mini-cart-btn btn-attr"
                      onClick={() => {
                        offCart(currentItem);
                      }}
                    >
                      -
                    </button>
                  </div>
                </div>
                <div className="mini-cart-product-image" key={uuid()}>
                  <img src={desc.image[0]} />
                </div>
              </div>
            </div>
          );
        })}
        <div className="total">
          <span className="total-title">Total</span>
          <span className="total-price">
            {currentCurrency}
            {Math.round(addToCart.total)}
          </span>
        </div>
        <div className="checkout">
          <Link to="/bag">
            <button className="view-bag-btn">VIEW BAG</button>
          </Link>
          <button className="checkout-btn">CHECKOUT</button>
        </div>
      </Collapsible>
      <div className={`${addToCart.cartTotal ? "total-items" : undefined}`}>
        {addToCart.cartTotal ? addToCart.cartTotal : null}
      </div>
    </>
  );
};
