import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

/*
1] So, now as we click on each of these buttons, here, we need to update the URL state.  
   
                                                                  (In the handleClick func.) 
   value (based on which we need to filter the cabins table) ---> We will receive the value that we 
                                                                  actually want to set into the URL.
                                                                  
2] Now to store this value into the URL, we use 'useSearchParams' Hook.    

3] Now, we first actually need to set the state on searchParams itself:-

       searchParams.set("discount", value); 
                           |          |-----> value of the state(field)  
                           |
                           |------> Here, the first value is the name of the state (i.e of the field in the URL).  


~ Q. But what if we wanted to re-use this Filter component for our Next "Bookings" table ?
 
 --> So, we need to pass in all the data (here) that might change in this component, as props.
     So, this 'discount' field might change.

     options ---> will be an array of these things (objcets) :-
                 [
                   {value: "all", label: "All"} ,
                   {value: "no-discount", label: "No discount"},
                   {value: "with-discount", label: "With discount"},
                 ]
   
      Each of these objects will be for one of the <FilterButton></FilterButton>.


  4] We also want to display(highlight) which of the options (buttons) is currently being selected/clicked.

      active={searchParams.get("discount") === opt.value}
  
  ~     Q. Why ?
  ---> 1] I found a problem with page query. If we're in bookings with status unconfirmed and there is 
         for e.g. 30 results, and we go to the third page (with pagination) on the unconfirmed bookings 
         page and go to checked-in page (we filter it) our page will break because page query is 3 and
         in checked-in page there are only 12 result that mean that we pass the range for checked-in 
         page.

         http://localhost:5173/bookings?page=3&status=unconfirmed

         http://localhost:5173/bookings?page=3&status=checked-in 

       2] To fix that we need to reset the page query every time we change the status.
       3] In the Filter.jsx in the handleClick function we add this line of code 
          searchParams.set('page', 1); before setSearchParams function. 
          
*/

function Filter({ filterField, options }) {
  console.log("Filter");

  const [searchParams, setSearchParams] = useSearchParams();

  function handleClick(value) {
    searchParams.set(filterField, value);

    //Wheneever we set a new filter, we also need to reset the page to 1
    searchParams.set("page", 1); //Why ? ---> see above

    setSearchParams(searchParams); //React Router will add '?discount=all' to the existing URL 'rootURL/cabins'
  }

  // const filterValue = searchParams.get(filterField) || "all";
  const filterValue = searchParams.get(filterField) || options[0].value;

  return (
    <StyledFilter>
      {/*
       <FilterButton onClick={() => handleClick("all")}>All</FilterButton>
       <FilterButton onClick={() => handleClick("no-discount")}>
          No discount
       </FilterButton>
       <FilterButton onClick={() => handleClick("with-discount")}>
          With discount
       </FilterButton>
     */}
      {options.map((opt) => (
        <FilterButton
          $active={filterValue === opt.value}
          disabled={searchParams.get(filterField) === opt.value}
          onClick={() => handleClick(opt.value)}
          key={opt.value}
        >
          {opt.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;

/*
^ Transient props:-

1] If you want to prevent props meant to be consumed by styled components from being passed to the 
    underlying React node or rendered to the DOM element, you can prefix the prop name with a 
    dollar sign ($), turning it into a transient prop.

 ~ In this example, $draggable isn't rendered to the DOM like draggable is.


   const Comp = styled.div`
     color: ${props =>
     props.$draggable || 'black'};
  `;


   render(
     <Comp $draggable="red" draggable="true">
       Drag me!
     </Comp>
   );


*/
