import React from "react";

export const Button = ({ className, onClick, type, disabled, children }) => {
  const buttonContent = children ? children : Text;
  return (
    <button
      className={className}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {buttonContent}
    </button>
  );
};
