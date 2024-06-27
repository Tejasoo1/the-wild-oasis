import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  console.log("BookingRow");
  // console.log(booking);

  const navigate = useNavigate();

  //For implementing checking-out feature
  const { checkout, isCheckingOut } = useCheckout();
  console.log({ isCheckingOut });

  //For implementing delete a booking based on its id, feature.
  const { isDeleting, deleteBooking } = useDeleteBooking();
  console.log({ isDeleting });

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      {/* 
        1] Each of these menus will contain a Toggle button & a list of buttons.
        2] When we click on this "Eye" button what we want to happen:-
           We want to navigate to a new page.
           
        
      */}
      <Menus.Menu>
        <Menus.Toggle id={bookingId} />
        <Menus.List id={bookingId}>
          <Menus.Button
            icon={<HiEye />}
            onClick={() => navigate(`/bookings/${bookingId}`)}
          >
            See details
          </Menus.Button>
          {/*
               Not all bookings can be checked in:-
             1] For ex, bookings that are already checked in can ofcourse not be checked in again.
             2] And the ones that are already checked out can also not be checked in again.
             3] The only bookings that can be checked in are unconfirmed one's.


          */}
          {status === "unconfirmed" && (
            <Menus.Button
              icon={<HiArrowDownOnSquare />}
              onClick={() => navigate(`/checkin/${bookingId}`)}
            >
              Check in
            </Menus.Button>
          )}

          {/* 
           1] Only the guests that are currently checked-in, can actually be checked out.
           2] Adding a button here, if the user is actually checked-in.
           3] Checking-out will also be to basically edit or update a booking based on its
              bookingId.
           4] In this case, it doesn't even make sense to re-direct the user to the dashboard.   
               
              V.IMP bug that we need to fix:-

          
          */}
          {status === "checked-in" && (
            <Menus.Button
              icon={<HiArrowUpOnSquare />}
              disabled={isCheckingOut}
              onClick={() => checkout(bookingId)}
            >
              Check out
            </Menus.Button>
          )}

          <Menus.Button
            icon={<HiTrash />}
            disabled={isDeleting}
            onClick={() => deleteBooking(bookingId)}
          >
            Delete
          </Menus.Button>
        </Menus.List>
      </Menus.Menu>
    </Table.Row>
  );
}

export default BookingRow;
