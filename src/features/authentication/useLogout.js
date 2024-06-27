import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  console.log("useLogout");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  //Logging out will also be a mutation
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      //We should also remove the current "user" from the React Query cache
      //So, just logging out will ofcourse remove the user from local storage & also from the server, but they will stay inside the cache
      //So, we can remove all queries that have been accumulated in that cache.
      queryClient.removeQueries();
      //Now we want the user to be re-directed to login page, once they have logged out successfully.
      navigate("/login", { replace: true }); //With replace set to true, we will basically overwite the previous page in browser's history.
    },
  });

  return { logout, isLoading };
}
