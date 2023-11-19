import { useEffect, useState } from "react";
import uuid from "react-uuid";
import { CATEGORY_NAMES } from "../../../api/queries";
import "./LeftSide.css";

import { useQuery } from "@apollo/client";
import { NavLink } from "react-router-dom";

export const LeftSide = () => {
  const { data } = useQuery(CATEGORY_NAMES);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data) setCategories(data.categories);
  }, [data]);

  let activeClassName = "header-nav-active";

  return (
    <div className="header-nav" key={Math.random()}>
      {categories.map((val) => {
        return (
          <NavLink
            to={val.name}
            id={val.name}
            key={uuid()}
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
          >
            {val.name.toUpperCase()}
          </NavLink>
        );
      })}
    </div>
  );
};

export default LeftSide;
