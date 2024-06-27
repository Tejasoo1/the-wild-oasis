import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Account() {
  console.log("Account");

  return (
    // The reason for using React fragments: Because we then want all of these elements here, to be placed directly
    // into the main html element.
    <>
      <Heading as="h1">Update your account</Heading>

      <Row>
        <Heading as="h3">Update user data</Heading>
        {/* <p>Update user data form</p> */}
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading as="h3">Update password</Heading>
        {/* <p>Update user password form</p> */}
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
