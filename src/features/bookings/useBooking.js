import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

/*
1] By default React query will try to fetch data 3 times, in case that it fails in the beginning.
2] But sometimes that might not make much sense, so in this case not finding the data probably 
   means that it doesn't exist in the first place  

   Then there is no point in retrying.
    
*/

export function useBooking() {
  console.log("useBooking");

  const { bookingId } = useParams();

  const {
    isLoading,
    data: booking,
    isError,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,

    // refetchOnWindowFocus: false,
  });

  return { isLoading, booking };
}
