import React from "react";
import "./RightSide.css";

import { CurrencySwitcher } from "./CurrencySwitcher";
import { Cart } from "./Cart";

export const RightSide = () => {
  return (
    <div className="currency-cart">
      <CurrencySwitcher />
      <Cart />
    </div>
  );
};
