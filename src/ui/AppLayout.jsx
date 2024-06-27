import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "./Header";
import styled from "styled-components";

// padding: Top left right bottom

const Main = styled.main`
  /* background-color: green; */
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  /* overflow: scroll; */
  overflow: auto;
`;

/*
1] The 1st row height, should be the size of the content of grid item itself. 

2] 

*/
const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

/*
  Q. How to handle errors that might occur during React rendering ?
 --> 1] This is something that every single React App should have.
     2] implementing an error boundary for this.
     3] We can fix the bugs/erros that happen in production phase, with a React feature 
        called error boundaries.
     4] So, error boundaries are like try-catch but for React rendering, which basically allows us
        to react to JS errors in our render code/ in react render logic.
        
        package ---> ReactErrorBoundary (npm i react-error-boundary)

     5] And so this package all it does, is to give us an error boundary component where we can
        pass in the fallback & also a function to reset the application, whenever an error has 
        occured.
      
     6] And so to use this concept, we basically wrap our entire application into that error boundary 
        component.    

     7] But this component is not really part of our application tree itself.
        See main.jsx file   
            
*/

function AppLayout() {
  console.log("AppLayout");

  return (
    <StyledAppLayout>
      {/* <p>App Layout</p> */}
      <Header />
      <SideBar />
      {/* The reason for putting <Outlet /> component in main, is that we can have all these pages, basically
          with the same style */}
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
