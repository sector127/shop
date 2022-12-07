import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Home } from "./pages/home";
import { Bag } from "./pages/home/Bag";
import { ProductDetails } from "./pages/home/ProductDetails";

export const RoutesComp = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Navigate to="/all" />} />
      <Route path="/:input" element={<Home />} />
      <Route path="/details/:id" exact element={<ProductDetails />} />
      <Route path="/bag" element={<Bag />} />
    </Routes>
  );
};
