import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getCabins } from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

/*
~ Filtering:-
1] So, basically we want the ability to filter this cabins table by whether there is a discount
   or not.
  
2] We will add some buttons, to do the following:-
   So, whether the user wants all the cabins or only the cabins with a discount or only the cabins without a discount.

3] Now, we will do this in practice by storing the value(info. or state) by which the table should be filtered, in the 
   URL again.
  
4] Because this way the URL is gonna be easily shareable & bookmarkable.

5] So, if we were using the useState Hook to store the value by which the table should be filtered, then this table here
   would have to be a child component of the component that owns that state.

6] But since we are storing that state(info.) in the URL, then that filter component can be really anywhere that we want,
   in the component tree.

   Go to Cabins component for further notes.... 

*/

function CabinTable() {
  console.log("CabinTable");

  const [searchParams] = useSearchParams();
  console.log({ discount: searchParams.get("discount") });
  console.log({ sortBy: searchParams.get("sortBy") });

  // const x = useQuery({
  //   queryKey: ["cabins"],
  //   queryFn: getCabins,
  // });

  // console.log(x);

  //Getting the cabins data
  const { isLoading, isError, cabins } = useCabins();

  console.log(isLoading, cabins, isError);

  if (isLoading) return <Spinner />;

  //If cabins array is empty
  if (!cabins.length) return <Empty resourceName="cabins" />;

  //1] Filter
  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins = [];

  if (filterValue === "all") filteredCabins = cabins;

  if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);

  if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  //2] Sort
  const sortBy = searchParams.get("sortBy") || "name-asc";

  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedCabins = filteredCabins?.sort((a, b) => {
    if (typeof a[field] === "string") {
      return a[field].localeCompare(b[field]) * modifier;
    } else {
      return (a[field] - b[field]) * modifier;
    }
  });

  console.log({ sortedCabins });

  /*
    1] Here, we want to replace this Table comp., that we have, with the one we are building.
    2] What we want is to pass the column definition right into this table, so that then we can use
       that on all the child components. 
  */

  /*
    Menus component:-
    1] We will wrap all of this (entire Table component) into that Menus component. 
    2] Now, inside the Table.Body, inside of each 'Cabin Row' we will have a Menus.Menu 
   
   */
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        {/* 
          1] In here, we simply want to pass in the cabins data.
          2] And then we also need to pass in basically the instructions on how this Table.Body should actually
             render the data.
          3] And so that's where the render prop pattern comes into play.
          
          Q. So, Table.Body doesn't really know what to do with this data ?  
         ---> So, here we can now again specify the render prop.    
              So, this is where we then tell the component what to do with each cabin.     
       */}
        <Table.Body
          // data={cabins}
          // data={filteredCabins}
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
