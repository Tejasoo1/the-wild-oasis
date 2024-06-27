import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBookings() {
  console.log("useRecentBookings");

  const { searchParams, setSearchParams } = useSearchParams();

  //For how many days in the past, we want to get our data
  const numDays = !searchParams?.get("last")
    ? 7
    : Number(searchParams.get("last"));

  /*
   1] Now what do we actually do, with these 7 days or 30 or 50 days.
   2] So, in the getBookingsAfterDate function we need to pass in a date that is actually already 
      7 or 30 or 90 days ago & which is in ISO format. 
    
  */
  //This function takes in as the 1st argument the current date & then the no. of days that we want to subtract
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: bookings } = useQuery({
    queryKey: ["bookings", `last${numDays}`],
    queryFn: () => getBookingsAfterDate(queryDate),
    // refetchOnWindowFocus: false,
  });

  return { isLoading, bookings };
}
