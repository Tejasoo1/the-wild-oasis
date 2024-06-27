import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  console.log("useUser");
  /* 
    it will basically get the current user & store it into cache (And so then user info. will 
    not have to be re-downloaded each time that its necessary). 
  */

  const {
    isLoading,
    data: user,
    fetchStatus,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    // refetchOnWindowFocus: false,
  });

  return {
    isLoading,
    user,
    isAuthenticated: user?.role === "authenticated",
    fetchStatus,
  };
}
