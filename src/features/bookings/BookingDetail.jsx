import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import { HiTrash } from "react-icons/hi2";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  console.log("BookingDetail Component");

  /*
    1] Let's get the data for bookingId no. 3 from the API(server).
  
  */

  const moveBack = useMoveBack();
  const navigate = useNavigate();

  const { booking, isLoading } = useBooking();
  console.log({ isLoading, booking });

  const { checkout, isCheckingOut } = useCheckout();
  console.log({ isCheckingOut });

  //For implementing delete a booking based on its id, feature.
  const { isDeleting, deleteBooking } = useDeleteBooking();
  console.log({ isDeleting });

  if (isLoading || isCheckingOut || isDeleting) return <Spinner />;

  //if bookingId is invalid, then booking will be undefined
  if (!booking) return <Empty resourceName="booking" />;

  const { status, id: bookingId } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">{`Booking #${bookingId}`} </Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check in
          </Button>
        )}

        {status === "checked-in" && (
          <Button
            icon={<HiArrowUpOnSquare />}
            disabled={isCheckingOut}
            onClick={() => checkout(bookingId)}
          >
            Check out
          </Button>
        )}

        <Button
          icon={<HiTrash />}
          disabled={isDeleting}
          onClick={() =>
            deleteBooking(bookingId, { onSuccess: () => navigate(-1) })
          }
        >
          Delete
        </Button>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
