import styled from "styled-components";

import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import { useTodayActivity } from "./useTodayActivity";
import Spinner from "../../ui/Spinner";
import TodayItem from "./TodayItem";

const StyledToday = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
`;

const TodayList = styled.ul`
  overflow: auto;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

function TodayActivity() {
  console.log("TodayActivity");

  /*
   1] Now in our application, an activity basically means that there is a guest arriving or leaving 
      at that day. 
  
  */

  const { stays, isLoading } = useTodayActivity();
  console.log({ stays, isLoading });

  /*
   1] There might not be any activities for the day.
   2] So, inside of the TodayList for each of the stays, here we now want to render one TodayItem 
      component.
  */

  return (
    <StyledToday>
      <Row type="horizontal">
        <Heading as="h2">Today</Heading>
      </Row>

      {!isLoading ? (
        stays?.length > 0 ? (
          <TodayList>
            {stays.map((stay) => (
              <TodayItem stay={stay} key={stay.id} />
            ))}
          </TodayList>
        ) : (
          "No activities found for today"
        )
      ) : (
        <Spinner />
      )}
    </StyledToday>
  );
}

export default TodayActivity;
