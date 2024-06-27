import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useBookings } from "./useBookings";
import Spinner from "../../ui/Spinner";
import PageNotFound from "../../pages/PageNotFound";
import Pagination from "../../ui/Pagination";
import { useSearchParams } from "react-router-dom";

/*
 Pagination component:-

 1] All that, it's going to do is to render a few buttons that will allow us to set the current 
    page state to the URL.
    
 2] So, that then our useBookings Hook, can get that data from the URL.    


*/

function BookingTable() {
  console.log("BookingTable");
  // const bookings = [];
  const [searchParams, setSearchParams] = useSearchParams();

  const { isLoading, bookings, count } = useBookings();

  console.log(isLoading, bookings);

  if (isLoading) return <Spinner />;

  //If suppose from page no. 3, we deleted all the bookings, then we should go back to previous page.
  const currPage = Number(searchParams.get("page"));

  if (currPage && currPage != 1 && bookings.length === 0) {
    // will only work if we have this 'rootURL/?page=2or3' URL in the browser's tab.
    searchParams.set("page", currPage - 1);
    setSearchParams(searchParams);
    return;
  }

  //
  if (!bookings?.length) return <Empty resourceName="bookings" />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />

        <Table.Footer>
          <Pagination count={count || 0} />{" "}
          {/* count={bookings?.length || 0} */}
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
