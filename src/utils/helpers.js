import { formatDistance, parseISO } from "date-fns";
import { differenceInDays } from "date-fns";
// import { differenceInDays } from "date-fns/esm";

// install: npm i date-fns

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options = {}) {
  console.log("getToday helper function");

  //This line creates a new 'Date' object representing the current date and time.
  const today = new Date();

  console.log({ today });

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    /*
      1] If the 'end' property exists and is 'true', this line sets the time to the last moment of the day 
         (23:59:59.999 UTC), which means 1 millisecond before midnight.
    */
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  /*
      1] If the 'end' property does not exist or is 'false', this line sets the time to the very start 
         of the day (00:00:00.000 UTC).     
    */

  console.log({ today: today.toISOString() });

  /*
  ~ return today.toISOString();
    This converts the 'Date' object to an ISO date string and returns it. An ISO date string is a standardized 
    way to represent dates and times.
  */
  return today.toISOString();
};

/*
1. Getting the Start of Today:-
   If you want to get the 'start' of the current day (00:00:00.000 UTC), you call the function without 
   any options or with end set to false:

   ~ const startOfToday = getToday(); // or getToday({ end: false });
   ~ console.log(startOfToday); // Output: "2024-06-24T00:00:00.000Z"


 2. Getting the End of Today:-
    If you want to get the 'end' of the current day (23:59:59.999 UTC), you call the function with end 
    set to true:

   ? const endOfToday = getToday({ end: true });
   ? console.log(endOfToday); // Output: "2024-06-24T23:59:59.999Z"


   

*/

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );

export const getImageNameFromUrl = (url) => url?.split("/").pop();
