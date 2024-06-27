import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  console.log("useBookings");

  const queryClient = useQueryClient(); //for pre-fetching the data

  const [searchParams] = useSearchParams();

  /*
    1] Here, we can now read the filtered value ('status' state from URL) & then pass it into the getBookings 
       function.
    2] We need to tell React query to re-fetch the bookings data as soon as the URL changes.
  
        queryKey: ["bookings", filter]
                                 |
                                 |
                                 |---> Now basically, whenever this filter changes then React-Query
                                       will refetch the data. 

    3] Whenever we change sortBy, then useQuery will do its job & fetch the data again & store it in our 
       cache.
       
    ~ Pagination:-
    1] Now, here data will be an object i.e. {data: [{},..], count: 24}
    
    Q. What prefetching is, & how we can implement it using React Query in order to make
       the pagination experience a lot better ?

   --> 1] Prefetching is all about fetching some data, that we know might become necessary,
          before we actually need that data to render it on the UI.
          
          And in the context of pagination, usually that means, that we fetch the next page 
          before it is actually displayed. 
          
       2] So, in this case that would mean, here in page no. 2, we will already have page no.
          3's data stored in the cache.   
          
       3] And so then we move to page no. 3, then we will simply det the data associated to 
          page no. 3 from the cache & hence no loading spinner will be displayed, which
          enhances the user experience.


    

 */

  //FILTER
  const filterValue = searchParams.get("status") || "all";
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  // { field: "totalPrice", value: 5000, method: "gte" };

  //SORT
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");

  const sortBy = { field, direction };

  //Pagination
  //1) Get Current Page no.
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  //QUERY
  const {
    isLoading,
    // data: bookings,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    // As soon as we change the page, we also then want to re-fetch the data
    queryKey: ["bookings", filter, sortBy, page], //dependency array of useQuery
    /*
      if we do not pass in filter object here, then the refetching will not be initiated when this BoookingTable
      component re-renders, instead what was stored in the cache previously will be returned. 
    */
    // queryKey: ["bookings"],
    queryFn: () => getBookings({ filter, sortBy, page }),
    // queryFn: getBookings,
  });

  //PRE-FETCHING
  /*
   1] We first need to access queryClient here, and then on that we call the prefetchQuery()
      method.

   2] It works in the same way as useQuery Hook.
      So, we need a queryKey & queryFn inside this object.

   3] But now what we want to actually load    

  */

  //if we are on the last page, then don't pre-fetch data for the next page, as it doesn't exist
  const pageCount = Math.ceil(count / PAGE_SIZE); //count of total no. of pages

  console.log("Pre-fetching data for next page");

  //For pre-fetching next page's data.
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  //For pre-fetching previous page's data. (If the user jumps to some page no. directly, in that case)
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { isLoading, bookings, error, count };
}
