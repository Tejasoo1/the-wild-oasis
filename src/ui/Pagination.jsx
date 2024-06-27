import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { PAGE_SIZE } from "../utils/constants";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

/*

1] Now the first thing that this Pagination component should get is total number of results.
2] Calculating the next page & previous page will always depend on what is the current page.
3] And that current page no., we will always get from the URL.



*/

// const PAGE_SIZE = 10; //each page can hold upto 10 results

function Pagination({ count }) {
  console.log("Pagination");

  const [searchParams, setSearchParams] = useSearchParams();

  //1) Get Current Page no.
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  //2) Knowing Page Count (How many pages will be there in total)

  /*
   1] It depends upon total no. of results (count value) 
   2]
        1 page = (can hold) 10 results 
        ? pages = (can hold) 23 results
      
        total pages = 23/10 = 2.3 pages 
        But there can be never 2.3 pages, hence upperbound(ceil) is taken, i.e. 3 pages.
  
  */
  const pageCount = Math.ceil(count / PAGE_SIZE);

  //Event Handler functions
  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    searchParams.set("page", next);
    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <StyledPagination>
      <P>
        {/* 
         1] Here, we will show the no. of results that are currently being shown on the page that is being currently rendered 
            count = 23 (total 23 results)
            
            1 to 10
            11 to 20
            20 to 23

       */}
        {/*
           Showing <span>1</span> to <span>10</span> of <span>{count}</span>
           results 
       */}
        Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{" "}
        <span>
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>{" "}
        of <span>{count}</span> results
      </P>

      <Buttons>
        <PaginationButton onClick={prevPage} disabled={currentPage === 1}>
          <HiChevronLeft />
          <span>Previous</span>
        </PaginationButton>
        <PaginationButton
          onClick={nextPage}
          disabled={currentPage === pageCount}
        >
          <span>Next</span>
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
