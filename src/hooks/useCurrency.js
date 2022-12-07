import { useQuery } from "@apollo/client";
import { CURRENCY_DETIALS } from "../api/queries";

export const useCurrency = () => {
  const { error, loading, data } = useQuery(CURRENCY_DETIALS);

  return {
    error,
    loading,
    data,
  };
};
