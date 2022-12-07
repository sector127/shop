import { useState, useRef, useEffect } from "react";
import "./Collapsible.css";

export const Collapsible = ({
  title,
  closedIcon,
  openedIcon,
  isOpen = false,
  children,
  className,
}) => {
  const [opened, setOpened] = useState(isOpen);
  const [clickedOutside, setClickedOutside] = useState(false);
  const myRef = useRef();
  const handleClickOutside = (e) => {
    if (!myRef.current.contains(e.target)) {
      setClickedOutside(true);
      setOpened(isOpen);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  return (
    <div className={`${className}`}>
      <div className="switcher" onClick={() => setOpened(!opened)}>
        {title}
        {opened ? openedIcon : closedIcon}
      </div>
      <div
        className={`collapsible-content ${opened ? "opened" : ""}`}
        ref={myRef}
      >
        {opened ? children : null}
      </div>
      {clickedOutside}
    </div>
  );
};
