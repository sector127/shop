import { useQuery } from "@apollo/client";
import { GET_PRODUCTS_BY_ID } from "../api/queries";

export const useProduct = (id) => {
  const { error, loading, data } = useQuery(GET_PRODUCTS_BY_ID, {
    variables: {
      id,
    },
  });

  return {
    error,
    loading,
    data,
  };
};
