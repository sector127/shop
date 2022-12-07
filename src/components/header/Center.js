import React from "react";
import { Logo } from "../../atoms/Logo/Logo";
import { Link } from "react-router-dom";

export const Center = () => {
  return (
    <div className="logo">
      <Link to="/">
        <Logo />
      </Link>
    </div>
  );
};
