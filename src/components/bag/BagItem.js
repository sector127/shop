import React from "react";
import uuid from "react-uuid";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import { Slider } from "../Slider/Slider";

export const BagItem = (props) => {
  const {
    name,
    price,
    id,
    gallery,
    brand,
    attributes,
    priceSymbol,
    quantity,
    prices,
    totalPrice,
  } = props.item;
  const dispatch = useDispatch();

  const addItemHandler = (e) => {
    e.preventDefault();
    dispatch(
      cartActions.addItemToCart({
        id,
        name,
        brand,
        price,
        gallery,
        attributes,
        quantity,
        priceSymbol,
        prices,
        totalPrice,
      })
    );
  };

  const removeItemHandler = () => {
    dispatch(cartActions.removeItemCart(id));
  };

  return (
    <li className="cart-product" key={uuid()}>
      <div className="cart-item">
        <div className="mini-cart-product-desc">
          <div className="cart-product-desc-brand">{brand}</div>
          <div className="cart-product-desc-name">{name}</div>
          <div className="cart-product-price">
            {priceSymbol}
            {price}
          </div>
        </div>
        <div className="qty-slider">
          <div className="mini-cart-actions">
            <div className="mini-cart-qty-increment">
              <button className="mini-cart-btn" onClick={addItemHandler}>
                +
              </button>
            </div>
            <span>{quantity}</span>
            <div className="mini-cart-qty-decrement">
              <button className="mini-cart-btn" onClick={removeItemHandler}>
                -
              </button>
            </div>
          </div>
          <div className="cart-product-slider">
            <Slider slides={gallery} />
          </div>
        </div>
      </div>
    </li>
  );
};
