import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";

/*
~ Implementing the Login Form:-

 1] users actually need to be logged into the application in order to use it.
 2] In supabase, for users we do not create a normal table.
    But instead we come to the authentication tab, where we will have a table for our users.

 3] Go to the Providers section, where you can actually enable all kinds of different providers.
    By default we have the email provider activated.   

 4] So, basically this allows users to sign up using a password & an email.   
    Deactivate the Confirm email option.
 
 5] Go back to the users section & add a new user to the users table.
 
    Now we have to connect this users table with our frontend.

    Go to user Management part.

 ~ Authorization (Protecting Routes) :
 
 1] So, basically only authorizing the authenticated users into our application.

 2] Implementing authorization,  so that only logged in users can actually access our application.

    And the way in which we are going to implement this is by wrapping the entire application into
    a protected route component. 

*/

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log("LoginForm component");

  //For login into the application
  const { login, isLoading } = useLogin();
  console.log({ login, isLoading });

  function handleSubmit(e) {
    e.preventDefault();

    //Guard clause
    if (!email.trim() || !password.trim()) return;

    login(
      { email, password },
      {
        onSettled: () => {
          setPassword("");
          setEmail("");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLoading}>
          {!isLoading ? "Login" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
