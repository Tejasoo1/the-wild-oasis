import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  console.log("useCabins");

  const {
    isLoading,
    data: cabins,
    isError,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,

    // refetchOnWindowFocus: false,
  });

  return { isLoading, isError, cabins };
}
