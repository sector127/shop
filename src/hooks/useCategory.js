import { useEffect, useState } from "react";
import { CATEGORY_NAMES } from "../api/queries";

import { useQuery } from "@apollo/client";

export const useCategory = () => {
  const { error, loading, data } = useQuery(CATEGORY_NAMES);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data) setCategories(data.categories);
    console.log(data);
  }, [data]);

  return categories;
};
