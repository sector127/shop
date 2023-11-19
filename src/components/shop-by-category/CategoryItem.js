import React from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";

export const CategoryItem = (props) => {
  const { name, id, price, gallery, attributes, brand, priceSymbol, prices } =
    props;
  const dispatch = useDispatch();
  const addToCartHandler = (e) => {
    e.preventDefault();
    dispatch(
      cartActions.addItemToCart({
        id,
        name,
        brand,
        price,
        gallery,
        attributes,
        prices,
      })
    );
  };
  return (
    <div className="product">
      <div className="product-img">
        <img src={gallery[0]} alt={id} />
      </div>
      <div className="product-title">{name}</div>
      <div className="product-price">
        <span>{priceSymbol}</span>
        {price}
      </div>
      <button
        kay={id}
        className={"to-cart-btn"}
        onClick={addToCartHandler}
      ></button>
    </div>
  );
};
