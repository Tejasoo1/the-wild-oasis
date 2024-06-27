import styled from "styled-components";
import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";
import CheckoutButton from "./CheckoutButton";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ stay: activity }) {
  console.log("TodayItem");

  const { id, status, guests, numNights } = activity;

  /*
   1] Now we need to add a button for the users or for the guests that are arriving to check-in 
      & for the ones that are departing to check-out.
   2] When the user clicks on the check-in button, we want to basically take the user to Checkin 
      page.

   3] When you use the 'as' prop with the styled-components library in React, it's a way of extending a
      styled component to have the appearance of another component while maintaining its own 
      functionality. 
     
   4] When combined with the 'to' prop, it is often used to create a 'link-like' behavior.

   5] The 'button' has the visual styling defined in Button, and it has the behavior of a 'link', navigating 
      to the specified path when clicked. This can be beneficial for keeping consistent styling across 
      your application while using different components for various functionalities.

  */

  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}

      <Flag src={guests.countryFlag} alt={`Flag of ${guests.nationality}`} />
      <Guest>{guests.fullName}</Guest>
      <div>{numNights} nights</div>
      {status === "unconfirmed" && (
        <Button
          size="small"
          variation="primary"
          as={Link}
          to={`/Checkin/${id}`}
        >
          Check in
        </Button>
      )}
      {status === "checked-in" && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
}

export default TodayItem;
