/*
1] So, all this will do is to calculate those statistics & then display one of these 'stat' components
   for each of them.

2]    


*/

import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  console.log("Stats");

  //1] No. of Bookings
  const numBookings = bookings.length;

  //2] Calculating total sales (those we will get by adding together all the total prices of all the bookings)
  const sales = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0);

  //3] Total check-ins
  const checkins = confirmedStays.length;

  //4] Occupancy Rate

  /*
  
   1] 'confirmedStays' is an array that likely represents reservations or stays in a cabin.

   2] 'numDays' represents the total number of days.

   3] 'cabinCount' is the total number of cabins available.

   4] The purpose of the occupancy rate calculation is to determine how many nights have been occupied by 
      guests compared to the total number of nights available in all cabins over a specific period 
      (defined by numDays).

   ~ Here's how it works:

  1] confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0): 
     This part of the formula iterates through the confirmedStays array and accumulates the number of
     nights each guest stayed (cur.numNights). It calculates the total number of nights occupied 
     by guests.

  2] (numDays * cabinCount): This represents the total number of available nights, assuming that all 
                      cabins are available for numDays each. It's the maximum number of nights that 
                      could be occupied if all cabins were booked for the full numDays.

  3] The result of the first part is divided by the second part. This division calculates the ratio of 
     occupied nights to available nights, and then it's typically multiplied by 100 to express it as 
     a percentage.

  4] In summary, the occupancy rate represents the percentage of nights that were occupied by guests compared 
     to the total number of nights that could have been occupied if all cabins were fully booked for
     the specified number of days.
  
  
  */

  const occupation =
    confirmedStays.reduce((acc, curr) => acc + curr.numNights, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
}

export default Stats;
