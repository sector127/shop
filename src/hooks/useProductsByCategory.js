import { useQuery } from "@apollo/client";
import { GET_PRODUCTS_BY_CATEGORY } from "../api/queries";

export const useProductsByCategory = (input) => {
  const { error, loading, data } = useQuery(GET_PRODUCTS_BY_CATEGORY, {
    variables: {
      input,
    },
  });
  return {
    error,
    loading,
    data,
  };
};
