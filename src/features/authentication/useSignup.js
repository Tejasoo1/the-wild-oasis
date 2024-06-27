import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  console.log("useSignup");

  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        "Account successfully created! Please verify the new account from the user's email address. "
      );
    },
  });

  return { signup, isLoading };
}

/*

!! It looks like the newly created user becomes the active user. How to avoid this?

export async function signUp({ fullName, email, password }) {
   ? Save the current session before signing up a new user
   const { data: savedSessionData } = await supabase.auth.getSession();

    const {
      data: { user },
      error,
      } = await supabase.auth.signUp({
           email,
           password,
           options: {
              data: {
                fullName,
                avatar: "", 
              },
            },
         });

  ? Log the entire response for debugging
  console.log("Sign-up response:", { user, error });

  ~ If there was a previously authenticated user, restore their session
  ~ This action should be placed right after signUp, otherwise the authError will stop the restore
    if (savedSessionData) {
      await supabase.auth.setSession(savedSessionData.session); 
     }

  ! Handle errors
   let authError = null;

   if (user && !user.identities.length) {
      authError = {
        name: "AuthApiError",
        message: "This email has already been registered",
      };
   } else if (error) {
      authError = {
      name: error.name,
      message: error.message,
     };
   }

   if (authError) throw new Error(authError.message);

   return user;
}



*/
