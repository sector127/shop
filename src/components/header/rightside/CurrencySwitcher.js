import React from "react";

import uuid from "react-uuid";

import "./CurrencySwitcher.css";
import { useCurrency } from "../../../hooks/useCurrency";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/cart-slice";
import { uiActions } from "../../../store/ui-slice";

export const CurrencySwitcher = () => {
  const { data } = useCurrency();
  const dispatch = useDispatch();
  const currencyHandler = (currency) => {
    dispatch(cartActions.selectCurrency({ currency }));
  };

  const closeBackdropHandler = () => {
    dispatch(uiActions.toggleCurrency());
  };

  if (data)
    return (
      <div className="currency">
        {data.currencies.map((val) => {
          return (
            <div className="currency-options" key={uuid()}>
              <ul>
                <li
                  key={uuid()}
                  onClick={() => {
                    currencyHandler(val.symbol);
                    closeBackdropHandler();
                  }}
                >
                  {`${val.symbol}  ${val.label}`}
                </li>
              </ul>
            </div>
          );
        })}
      </div>
    );
};
