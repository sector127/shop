import React from "react";
import ReactDOM from "react-dom";
import "./RightSide.css";

import { CurrencySwitcher } from "./CurrencySwitcher";
import { Cart } from "./Cart";
import { useDispatch, useSelector } from "react-redux";
import CartButton from "./CartButton";
import { Backdrop } from "../../../atoms/Backdrop";
import { uiActions } from "../../../store/ui-slice";
import { CurrencyButton } from "./CurrencyButton";

export const RightSide = () => {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const showCurrency = useSelector((state) => state.ui.currencyIsVisible);
  const dispatch = useDispatch();
  const closeBackdropHandler = () => {
    dispatch(uiActions.toggle());
  };
  const closeCurrencyBackdropHandler = () => {
    dispatch(uiActions.toggleCurrency());
  };

  const portalElement = document.getElementById("overlays");

  return (
    <div className="currency-cart">
      {showCart &&
        ReactDOM.createPortal(
          <Backdrop onClick={closeBackdropHandler} />,
          portalElement
        )}
      {showCurrency &&
        ReactDOM.createPortal(
          <Backdrop onClick={closeCurrencyBackdropHandler} />,
          portalElement
        )}
      <CurrencyButton show={showCurrency} />
      {showCurrency && <CurrencySwitcher />}
      <CartButton />
      {showCart && <Cart />}
    </div>
  );
};
