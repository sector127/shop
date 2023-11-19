import React from "react";
import uuid from "react-uuid";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/cart-slice";

export const CartItem = (props) => {
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
    selectedAttributes,
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
        selectedAttributes,
      })
    );
  };

  const removeItemHandler = () => {
    dispatch(cartActions.removeItemCart({ id, selectedAttributes }));
  };

  return (
    <li className="cart-product" key={uuid()}>
      <div className="mini-cart-item">
        <div className="mini-cart-product-desc">
          <span>{brand}</span>
          <span>{name}</span>
          <span className="mini-cart-product-price">
            {priceSymbol}
            {price}
          </span>
        </div>
        <div className="mini-cart-actions">
          <button className="mini-cart-btn" onClick={addItemHandler}>
            +
          </button>
          <span>{quantity}</span>
          <button className="mini-cart-btn" onClick={removeItemHandler}>
            -
          </button>
        </div>
        <div className="mini-cart-product-image">
          <img src={gallery} alt={id} />
        </div>
      </div>
    </li>
  );
};
