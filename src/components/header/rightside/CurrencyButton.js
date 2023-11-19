import React from "react";

import "./CurrencySwitcher.css";
import { useDispatch, useSelector } from "react-redux";
import { ArrowDown, ArrowUp } from "../../../atoms/Arrow";
import { uiActions } from "../../../store/ui-slice";

export const CurrencyButton = (props) => {
  const currentCurrency = useSelector((state) => state.cart.currency.currency);
  const dispatch = useDispatch();
  const toggleCurrencyHandler = () => {
    dispatch(uiActions.toggleCurrency());
  };
  return (
    <button className="currency-btn" onClick={toggleCurrencyHandler}>
      {currentCurrency}
      {props.show ? <ArrowUp /> : <ArrowDown />}
    </button>
  );
};
