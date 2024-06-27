import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();

  console.log("CheckinBooking Component");

  //Now we need to connect this state with that checkbox
  const [confirmPaid, setConfirmPaid] = useState(false);

  //We need a state to store the information about, whether the guest has already added the breakfast or not.
  const [addBreakfast, setAddBreakfast] = useState(false);

  //We need to bring in the data about current booking, based on the booking id
  const { isLoading, booking } = useBooking();
  console.log({ isLoading, booking });

  //We need to bring in the data from the settings table
  const { isLoading: isSetting, settings } = useSettings();
  console.log({ isSetting, settings });

  //if the user has already paid for the booking, then set confirmPaid to true.
  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

  //mutate function ---> checkin (to update the bookings table fields)
  const { isCheckingIn, checkin } = useCheckin();
  console.log({ isCheckingIn });

  if (isLoading || isSetting) return <Spinner />;

  /*
  1] Now its time to implement that small feature where the hotel employee needs to confirm
     whether this booking has already been paid or not. 
   
  2] For that, we need a checkbox which will allow us to mark total price paid on visit
  3] And if we want this button (Check in) to respond according to whether that check box
     is being checked or not    
  4] So, that means we need a piece of state(information).


  */
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice =
    settings?.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          //Here we will now set the properties, that we want to update in supabase.
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {/* We should only render this box, if the guest didn't choose breakfast initially */}
      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              // Even if the customer has paid for the cabin, and then he wants to add breakfast then, we need to reset the payment
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            Wants to add breakfast for {formatCurrency(optionalBreakfastPrice)}{" "}
            ?
          </Checkbox>
        </Box>
      )}

      <Box>
        {/* Making this a controlled element */}
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirmPaid) => !confirmPaid)}
          disabled={confirmPaid || isCheckingIn}
          id="confirm"
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        {/* Q. What checking in actually means ?
          ---> 1] We are going to update the current booking object's status field value to "checked-in" 
                  from "unconfirmed" 
               
               2] And also "isPaid" needs to be set to 'TRUE'.
               
               3] So, basically what we will now do, is use useMutate Hook to update a booking object
                  by setting these two fields i.e. status to 'checked-in' & isPaid to 'true'.

        */}
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
