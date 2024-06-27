import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  console.log("useLogin");

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  //it's a mutation because something actually changes on the server (i.e. basically a user gets authenticated).
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),

    //data (user) that was received from the mutation function
    onSuccess: (user) => {
      //This basically allows us to manually set some data into the React query cache.
      queryClient.setQueryData(["user"], user.user); //Specify the query key & then its value
      navigate("/dashboard", { replace: true });
    },

    //err --> returned from the mutation function
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isLoading };
}
