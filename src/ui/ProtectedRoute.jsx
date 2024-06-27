import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  console.log("ProtectedRoute component");

  const navigate = useNavigate();

  //1. Load the authenticated user
  const { user, isLoading, isAuthenticated, fetchStatus } = useUser();
  console.log({ user, isLoading, isAuthenticated, fetchStatus });

  //2. If there is no authenticated user, then re-direct to the login page (/login)
  /*
     1. But we are only allowed to call navigate function, inside a call back fun. or useEffect Hook
        & not at the top level of any component.
        
     2. 
     3. Removing access token from local storage, thus the session object will no longer be 
        present in the local storage. (Then, we will be re-directed to login page.)   
  */

  useEffect(
    function () {
      console.log("useEffect ProtectedRoute");

      if (!isAuthenticated && !isLoading && fetchStatus !== "fetching") {
        navigate("/login");
      }
    },
    [isAuthenticated, isLoading, fetchStatus]
  );

  //3. While loading, show a spinner (Wrapping Spinner component in a FullPage component, so that it really renders in the middle of the page)
  if (isLoading)
    return (
      <FullPage>
        <Spinner />;
      </FullPage>
    );

  //4. If the user is authenticated, then render the application (AppLayout component).

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
