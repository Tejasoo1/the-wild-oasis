// import { useEffect, useState } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
// import { getCabins } from "../services/apiCabins";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";

function Cabins() {
  console.log("Cabins");

  /*
  useEffect(function () {
    getCabins().then((data) => console.log(data)); //since this is an async function, we need to handle the promise that it returns.
  }, []);

  */

  /*
   1] We will create a new component called, CabinTableOperations. (operations ---> filter & sort)
  
  */

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        {/* <p>Filter / Sort</p> */}
        <CabinTableOperations />
      </Row>

      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
