import { PAGE_SIZE } from "../utils/constants";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";

/*

  await supabase.from("bookings").select("*, cabins(*), guests(*)");
                                                |   |
                                                |   |-----------------> select everything (every row for each field) from the cabin's table.
                                                |
                                                |---> name of the tables that we are referrencing to (i.e. cabins, guests)   
                                                                                    (using foreign key)

  2] But from the cabins & guests table, we do not need all the field values.
     
     For cabins ----> we need only the name field
     For guests ----> we need only the fullName & email fields.

     So, using this, we reduce the amount of unnecessary data that needs to be downloaded 
   
  ---------------------------------------------------------------------------------------------------------------------------------------
  
  1] Let's say if we want to filter immidiately here, only for the status of 'uncomfirmed'.

  2] So, for that on this query i can use the eq() method:-
   
      await supabase
    .from("bookings")
    .select("*, cabins(name), guests(fullName,email)").eq("status","unconfirmed");
                                                             |          |----> The value that we want status to be equal to.
                                                             |
                                                             |--> specify the field name.


  3] Now we will only get booking objects in the form of an array, whose status field is "unconfirmed" 
     
      await supabase
    .from("bookings")
    .select("*, cabins(name), guests(fullName,email)")
    .eq("status","unconfirmed") 
    .gte("totalPrice", 5000);
      |
      |
      |---> select only those rows from the 'bookings' table, whose 'totalPrice' field's value is greater than or equal to 2000.
    
     .lte(...) --> less than or equal to

  4] Now, how do we get that 'status' state from the URL, here, in this function.
     This is just a regular function, so we can not use the useSearchParams hook in this function.
     
     Instead we can use it in useBookings custom Hook.

  5] filter will also be an object containing, {field: ..., value: ...}
    

  6] Building a query from stratch in multiple parts.

  ~ Pagination (on the server side) :-

  1] In this .select() function we can pass in a second argument, which is this object with the 
     count property.

     {count: "exact"} (this)
                |
                |---> We can define count as exact.

     So, this can actually be helpful whenever you don't want to query the entire data, but really
     only need the number of results.           

  2] So, what this will do is that, besides data & error, this query will then also return a 
     variable called 'count' in the object.
  
  3] query = query.range(  )
                         |----> here, we will need to pass in a from parameter & a to parameter. 
  
     For Ex:- On the first page we want to go from result no. 0 to result no. 9, if atleast 10 
              results is what we want.                     
   
*/

export async function getBookings({ filter, sortBy, page }) {
  console.log("getBookings");

  /*
  let { data, error } = await supabase
    .from("bookings")
    // .select("*, cabins(*), guests(*)");
    .select("*, cabins(name), guests(fullName,email)");
  */

  let query = supabase
    .from("bookings")
    // .select("*, cabins(*), guests(*)");
    .select("*, cabins(name), guests(fullName,email)", { count: "exact" });

  //FILTER (Adding stuff to the query conditionally)
  if (filter !== null) {
    // query.eq(filter.field, filter.value);
    query[filter?.method || "eq"](filter.field, filter.value);
  }

  //SORT
  if (sortBy) {
    // order(fieldName, {an object with options, where we can specify the ascending option})
    query.order(sortBy.field, { ascending: sortBy.direction === "asc" });
  }

  //Pagination
  if (page) {
    //Adding something more to our query
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  let { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }

  // console.log(data);
  console.log("Bookings-data-retrived");

  return { data, count };
}

export async function getBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  console.log("getBookingsAfterDate function");

  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  //This 'date' that this function receives needs to be an ISO string.

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  console.log(" bookings data retrived", data);

  return data;
}

/*
? How It Helps in Date Comparison:-
   
~ Let's say you have a list of records with 'created_at' timestamps. You want to filter out records 
~ that were created today. 

   const records = [
      { id: 1, created_at: "2024-06-24T08:30:00.000Z" },
      { id: 2, created_at: "2024-06-23T16:45:00.000Z" },
      { id: 3, created_at: "2024-06-24T22:15:00.000Z" }
    ];

   const startOfToday = getToday();
   const endOfToday = getToday({ end: true });

    const recordsCreatedToday = records.filter(record => {
      return record.created_at >= startOfToday && record.created_at <= endOfToday;
    });

    console.log(recordsCreatedToday);


Output: 
[
  { id: 1, created_at: "2024-06-24T08:30:00.000Z" },
  { id: 3, created_at: "2024-06-24T22:15:00.000Z" }
]

*/

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  console.log("getStaysAfterDate func.");

  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  console.log("Stays data retrived", data);

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  console.log("getStaysTodayActivity");

  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  /*
   1] (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) :-
       And so this here means a guest ready to arrive & check-in at the current day.
       
   2] (stay.status === 'checked-in' && isToday(new Date(stay.endDate))) :-
       which is a booking that is currently checked-in, but the end date is today.
       (So this guest is ready to leave today)
   
   3] The '.or()' function is used to combine multiple conditions with an 'OR' logical operator. The 
      query will select records where either of the following conditions are met:

      The status is 'unconfirmed' and the startDate is equal to today's date.
      The status is 'checked-in' and the endDate is equal to today's date.
      The function 'getToday()' is presumably a function that returns today's date in the 
      required format.

   4] .order("created_at");
       This part of the query specifies that the results should be ordered by the 'created_at' column. The 
       default order is 'ascending', but it can be specified as 'descending' by adding a second argument 
       such as { ascending: false }.  

   5] .select("*, guests(fullName, nationality, countryFlag)")
      This part of the query selects all columns from the 'bookings' table (*), as well as specific columns 
      (fullName, nationality, countryFlag) from the related 'guests' table. This assumes that there is a
       relationship set up between the 'bookings' and 'guests' tables.    

  */

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  console.log("data retrived", data);

  return data;
}

//It receives the 'id' of the row that needs to be updated & the object(obj) with all the new field values
//i.e. all the values for the columns that are going to be updated.
export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  console.log("deleteBooking");

  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }

  console.log("Booking deleted Successfully");

  return data;
}

export async function getAllBookings() {
  console.log("getAllBookings");

  const { data, error } = await supabase
    .from("bookings")
    // .select("*, cabins(*), guests(*)");
    .select("*, cabins(name), guests(fullName,email)", { count: "exact" });

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }

  return data;
}
