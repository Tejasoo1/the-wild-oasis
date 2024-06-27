import DashboardFilter from "../features/dashboard/DashboardFilter";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

/*
1] The dashboard should render a list of check-ins & check-outs for the current day.

2] Some statistics about the recent bookings & also 2 charts on sales & on stay durations.


 
 
    

*/

function Dashboard() {
  console.log("DashBoard");
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        {/* <p>TEST</p> */}
        <DashboardFilter />
      </Row>
      <DashboardLayout />
    </>
  );
}

export default Dashboard; //tejas@1234Patil ---> supabase password

/*

curl "https://acqtzlewrgwnsmyrswyp.supabase.co/rest/v1/cabins?select=*" ^
-H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjcXR6bGV3cmd3bnNteXJzd3lwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYxMjAxODAsImV4cCI6MjAzMTY5NjE4MH0.1cDwOJ9wE86J_WyzYDzT4i0MIqClcls6EzrzRuOs9jU" ^
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjcXR6bGV3cmd3bnNteXJzd3lwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYxMjAxODAsImV4cCI6MjAzMTY5NjE4MH0.1cDwOJ9wE86J_WyzYDzT4i0MIqClcls6EzrzRuOs9jU"





*/
