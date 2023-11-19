import React from "react";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-uuid";
import { cartActions } from "../../store/cart-slice";

import "./CartAttributes.css";

export const CartAttributes = (props) => {
  const { attributes, id, selectedAttributes } = props;

  const dispatch = useDispatch();

  const handleAttrSelect = (attrName, itemValue) => {
    dispatch(cartActions.selectAttribute({ id, attrName, itemValue }));
  };

  return (
    <div className="cart-attrs" key={uuid()}>
      {attributes?.map((attr) => {
        return (
          <div key={uuid()}>
            <div className="cart-attributes-name" key={uuid()}>
              {attr.name}
            </div>
            <div className="cart-attributes-value" key={uuid()}>
              {attr.items.map((item) => {
                let isSelected = false;
                for (const a of [selectedAttributes]) {
                  a.map((i) => {
                    if (i.value === item.value && i.name === attr.name)
                      isSelected = true;
                  });
                }
                return (
                  <button
                    className={`${
                      item.value.includes("#")
                        ? `attr-btn ${props.cartCl}cart-color-btn`
                        : "attr-btn"
                    } ${
                      isSelected && item.value.includes("#")
                        ? "selected"
                        : isSelected
                        ? "selected-string"
                        : null
                    } `}
                    style={{
                      backgroundColor: item.value,
                    }}
                    key={uuid()}
                    onClick={(e) => {
                      e.preventDefault();
                      handleAttrSelect(attr.name, item.value);
                    }}
                  >
                    {!item.value.includes("#") ? item.value : null}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
