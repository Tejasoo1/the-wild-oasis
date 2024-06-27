/* 
  1] Displaying the details of the clicked booking using booking object identified via an id(bookingId),
     on this page.
     
  2] A page component should not fetch data from the server & also should not have any other side
     effects.   

*/

import BookingDetail from "../features/bookings/BookingDetail";

function Booking() {
  return <BookingDetail />;
}

export default Booking;
