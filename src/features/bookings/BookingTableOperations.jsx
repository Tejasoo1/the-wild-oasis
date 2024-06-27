import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

/*

~ API side filtering:-


1] If i want to filter for (according to) "checkedout" status, then i want the API to really 
   only send me all the bookings that have the 'checkedout' status.

2] So, i don't want to receive all of the bookings(objects) & then just filter them on the client side.     
   But instead only that filtered data should get downloaded from supabase.

3] So, for that we need to change our supabase query.   

*/

function BookingTableOperations() {
  console.log("BookingTableOperations");
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "checked-out", label: "Checked out" },
          { value: "checked-in", label: "Checked in" },
          { value: "unconfirmed", label: "Unconfirmed" },
        ]}
      />

      <SortBy
        options={[
          { value: "startDate-desc", label: "Sort by date (recent first)" },
          { value: "startDate-asc", label: "Sort by date (earlier first)" },
          {
            value: "totalPrice-desc",
            label: "Sort by amount (high first)",
          },
          { value: "totalPrice-asc", label: "Sort by amount (low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
