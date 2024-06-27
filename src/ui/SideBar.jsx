import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import Uploader from "../data/Uploader";

/*
~ Let's build the side bar & implement navigation using Link:-

1] 

*/

const StyledSideBar = styled.aside`
  /* background-color: blue; */
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1/3;
  grid-column: 1/2;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function SideBar() {
  console.log("SideBar");
  return (
    <StyledSideBar>
      <Logo />
      <MainNav />
      {/* <Uploader /> */}
    </StyledSideBar>
  );
}

export default SideBar;
