import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  console.log("SignupForm component");

  const { signup, isLoading } = useSignup();
  console.log({ signup, isLoading });

  /*
   1] So, whenever we are having a bigger form like below, & which needs some important validation
      it's a good idea to use a helper library like React Hook Form.
  
   2] Now, here the idea is to use the register function in each of these inputs to give them a name 
   
   3] And then React Hook Form will actually manage the state for each of these input fields & not us.
   
   ------------------------------------------------------------------------------------------------------

   1] Let's use the Form that we just created in order to sign up the users to our application & basically
      to our supabase database.

   2] Users are really only signed up after thay have confirmed their email address.
   
   3] Also we need to change our site's URL, so currently we are not at 'https://localhost:3000', 
      But actually at this one "http://localhost:5173"
      
      And so whenever the user gets an email so that they can confirm their account, we want them 
      to then be redirected to exactly this URL:- "http://localhost:5173/dashboard"
 
  */
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  console.log(errors);

  //handleSubmit function will allow us to register our own custom handler function.
  function onSubmit(data) {
    //it will receive the data of all the input fields
    console.log(data);

    const { fullName, email, password } = data;

    signup(
      { fullName, email, password },
      {
        onSettled: () => reset(),
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isLoading}
          // This register function will return a few props which we then spread onto this input field.
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          //For email address, we actually need to check whether it is valid or not.
          {...register("email", {
            required: "This field is required",
            pattern: {
              //Here we can specify the value, which is the regex itself
              value: /\S+@\S+\.\S+/,
              // Display message in case this field's value fails regex.
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isLoading}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          //This field's value needs to be same as above fields value, otherwise we will not allow this form to be submitted
          {...register("passwordConfirm", {
            required: "This field is required",
            //This function gets the current value of this field.
            //We need to check whether this value of current field is equal to this password field's value.
            //And so if they are the same, then the validation will pass & otherwise this string here will become the error message.
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button disabled={isLoading} variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
