import { useQuery } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";

export function useAllBookings() {
  const { data: allBookings, isLoading } = useQuery({
    queryKey: ["allBookings"],
    queryFn: getAllBookings,
  });

  return { allBookings, isLoading };
}
