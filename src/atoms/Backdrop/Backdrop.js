import React from "react";

import "./Backdrop.css";

export const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onClick}></div>;
};
