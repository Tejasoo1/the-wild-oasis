import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays() {
  console.log("useRecentStays");

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

  const { isLoading, data: stays } = useQuery({
    queryKey: ["stays", `last${numDays}`],
    queryFn: () => getStaysAfterDate(queryDate),
    // refetchOnWindowFocus: false,
  });

  console.log({ stays });

  //To calculate only the confirmed stays (So the ones that are not unconfirmed)
  const confirmedStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );

  console.log({ confirmedStays });

  return { isLoading, stays, confirmedStays, numDays };
}
