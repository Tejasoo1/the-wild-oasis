import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Settings from "./pages/Settings";
import NewUsers from "./pages/Users";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./context/DarkModeContext";
import CreateBookingForm from "./features/bookings/CreateBookingForm";
/*
! Creating our Routes:-

1] npm i react-router-dom@latest  

2] Setting up our routes:-
  
   In this application we will not use the data loading features of React Router, that we used in the 
   previous project.

3] So, we will need to set up/create our Routes in a declarative way.   

4] Routes component ---> which is the one that actually figures out, which Route matches
                         which URL.

   Route component ----> self closing elements         
   
   Navigate component ----> Provided by React Router

   replace --> So, that the URL gets replaced in the history stack.

5] Now when we reload the page, it will immidiately re-direct us to the index route(i.e. /dashboard)

*/

/*
~ Building the App Layout:-

1] The way we set up a 'Layout Route' is by placing all the routes that should be rendered inside the Layout
   as child routes of the 'Layout Route'.

2] If in the browser's window, we have this URL: http://localhost:5173/login   
  
3] Then Routes, will only find match with the Route having this path "root URL/login" & this route 
   <Route element={<AppLayout />}> ... </Route>, is completely ignored even if it doesn't have 
   'path' prop.

4] And that's because this (<Route path="login" element={<Login />} />) is not a child Route, of our
   'Layout' Route.   

5] Now, we need to build our Application Layout, where we will have, sidebar on the left side & then on the right side
   we will have the Header bar & at the top & below that the content itself. (DOUBT)


~ When to use React Query & when to use Redux :-

1] React Query is primarily for managing of remote data fetching and Redux is all about state management on a 
   bigger level.

2] React Query focuses on managing remote data fetching, caching, and synchronization at the component level, 
   while Redux provides a predictable state container for managing global application state. 
   
3] React Query can handle data fetching and caching for remote data, while Redux manages global or shared 
   application state. 
   
   Depending on your project's requirements, you can use React Query for data fetching 
   and Redux for managing global application state, or combine them as needed to leverage their respective
   strengths in managing different aspects of your application's state.

~ Setting up React Query:-

1]    


  
  you will nedd this to connect the remote repository with your local respository.

*/

//Creating a query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60000,
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <>
      <DarkModeProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <GlobalStyles />
          <BrowserRouter>
            <Routes>
              <Route path="login" element={<Login />} />
              {/* We need to place all the 'Routes' that should be rendered inside the 'Layout Route', inside this Route(Layout)  */}
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                {/* 
                1] This is called a 'Layout Route' because it doesn't have the 'path' prop.
                2] All of these below routes are child routes of this parent route.
                3] So, that means all of these components represented by child routes (i.e.all of these
                  pages) are rendered inside this AppLayout component.
                4] So, we are going to wrap this AppLayout itself into that ProtectedRoute component.
                5] So then that would mean that all of these different routes can only be accessed if the 
                ProtectedRoute component determines that there is a currently logged in user. 
                6] Now, all of these below routes will be child routes of ProtectRoute component as well. 
                7] And so in that component we will then only return the children if the user is 
                   actually authenticated.     
             */}
                <Route index element={<Navigate replace to="dashboard" />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="bookings" element={<Bookings />} />
                <Route path="/bookings/:bookingId" element={<Booking />} />
                <Route path="/checkin/:bookingId" element={<Checkin />} />
                <Route path="createBooking" element={<CreateBookingForm />} />
                <Route path="cabins" element={<Cabins />} />
                <Route path="users" element={<NewUsers />} />
                <Route path="settings" element={<Settings />} />
                <Route path="account" element={<Account />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>

          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: "var(--color-grey-0)",
                color: "var(--color-grey-700)",
              },
            }}
          />
        </QueryClientProvider>
      </DarkModeProvider>
    </>
  );
}

export default App;
