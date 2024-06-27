import SignupForm from "../features/authentication/SignupForm";
import Heading from "../ui/Heading";

/*
1] Now in this application not everyone can create a new account.
2] So, not everyone can signup for this application, so in this application, only employess of the hotel
   should actually be the users of this application. 

3] So therefore the idea is that, these user's can only be created inside the application.
4] So, in this way new user's are basically immediately verified by the existing hotel staff, because
   only that staff can actually create new users.
   
5] And so that will happen in the user's page, where we have a form to signup a new user.   

*/

function NewUsers() {
  console.log("Users");
  return (
    <>
      <Heading as="h1">Create a new user</Heading>
      <SignupForm />
    </>
  );
}

export default NewUsers;
