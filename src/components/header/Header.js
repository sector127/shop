import React from "react";
import { Center } from "./Center";
import "./Header.css";
import LeftSide from "./leftside/LeftSide";
import { RightSide } from "./rightside";

export const Header = () => {
  return (
    <div className="header">
      <div className="top">
        <LeftSide />
        <Center />
        <RightSide />
      </div>
    </div>
  );
};
