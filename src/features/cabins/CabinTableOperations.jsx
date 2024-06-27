import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function CabinTableOperations() {
  console.log("CabinTableOperations");

  /*
    ~ Adding the ability to sort the cabins table based on any field:-
     
    1] We want to have a drop down menu where we can select, which of these fields (here) we want to sort data(cabins array of objects)
       by.


                       |---> And then we also have the direction
                       |
    2] { value: "name-asc", label: "Sort by name (A-Z)" }   
                  |
                  |
                  |---> We have the field, by which we want to sort   
                        (Here, we use name of the fields as they are in the database)


  */

  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With discount" },
        ]}
      />

      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          { value: "regularPrice-asc", label: "Sort by price (low first)" },
          { value: "regularPrice-desc", label: "Sort by price (high first)" },
          { value: "maxCapacity-asc", label: "Sort by capacity (low first)" },
          { value: "maxCapacity-desc", label: "Sort by capacity (high first)" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
