import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

/*
 1] Before we can start building our statistics & charts, we first need to compute the latest bookings 
    & stays, from our supabase booking table.

 2] We need to distinguish between these 2 types of data:- 
    bookings & stay.

    So, the bookings are the actual sales 
    So for ex:- In the last 30 days the hotel might have sold 50 bookings online, but maybe 30 of these guests
                will only arrive & check into the hotel in the far future like a month or even a year
                after they have booked the booking.

 3] Now on the other hand we have the stays:-
    So stays are the actual check-ins of guests as they arrive for their bookings in our hotel.
   
 4] And we can identify stays in our hotel, by their start date together with their status
    of either checked-in or checked-out.
    
 5] A booking is an actual sale, while a stay is a guest actually staying in the hotel.   
    
    So, these things are very different & we need them for different parts (i.e. for our statistics
    & also these charts) 

 6] So, now we need to compute these 2 seperately.

 -----------------------------------------------------------------------------------------------------------

 ~ Display Satistics:-

 1] Let's now calculate statistics based on recent bookings, recent sales, check-ins & the total 
    occupancy rate.

 -----------------------------------------------------------------------------------------------------------

 1] npm i recharts@2

    Q. How we can create a nice line or area chart ?
   ---> 


*/

function DashboardLayout() {
  console.log("DashboardLayout");

  // For bookings
  const { bookings, isLoading: isLoadingBookings } = useRecentBookings();
  console.log({ bookings, isLoadingBookings });

  //For recent stays
  const {
    stays,
    confirmedStays,
    isLoading: isLoadingStays,
    numDays,
  } = useRecentStays();
  console.log({ stays, confirmedStays, isLoadingStays });

  //For cabins
  const { cabins, isLoading: isLoadingCabins } = useCabins();
  console.log({ cabins, isLoadingCabins });

  if (isLoadingBookings || isLoadingStays || isLoadingCabins)
    return <Spinner />;

  console.log({ bookings });

  return (
    <StyledDashboardLayout>
      {/* <div>Statistics</div> */}
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      {/* 
       <div>
         Today's activity , which is going to contain today's booking check-ins &
         check-outs
       </div>
      */}
      <TodayActivity />
      {/* <div>Chart for stay durations</div> */}
      <DurationChart confirmedStays={confirmedStays} />
      {/* <div> Chart for sales </div> */}
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
