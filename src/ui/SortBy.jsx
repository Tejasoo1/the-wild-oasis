import { useSearchParams } from "react-router-dom";
import Select from "./Select";
/*
  1] Since, we will want the 'select' html element many times in our application, let's build a re-usable one. 
  2] We need to set this value (e.target.value), in the state present in URL. 



*/

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log("SortBy");

  const sortBy = searchParams.get("sortBy") || "";
  console.log(sortBy);

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      type="white"
      onChange={handleChange}
      value={sortBy}
    />
  );
}

export default SortBy;
