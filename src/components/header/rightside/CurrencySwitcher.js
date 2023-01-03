import React from "react";

import uuid from "react-uuid";

import "./CurrencySwitcher.css";
import { useCurrency } from "../../../hooks/useCurrency";
import { useIncart } from "../../../providers/CartProvider";
import { Collapsible } from "../../collapsible";
import { ArrowDown, ArrowUp } from "../../../atoms/Arrow";

export const CurrencySwitcher = () => {
  const { data } = useCurrency();
  const { currentCurrency, setCurrentCurrency } = useIncart();

  if (data)
    return (
      <Collapsible
        title={currentCurrency}
        openedIcon={<ArrowUp />}
        closedIcon={<ArrowDown />}
        className="currency"
      >
        {data.currencies.map((val) => {
          return (
            <div className="currency-options" key={uuid()}>
              <ul>
                <li
                  key={uuid()}
                  onClick={() => {
                    setCurrentCurrency(val.symbol);
                  }}
                >
                  {`${val.symbol}  ${val.label}`}
                </li>
              </ul>
            </div>
          );
        })}
      </Collapsible>
    );
};
