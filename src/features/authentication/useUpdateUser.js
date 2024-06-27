import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  console.log("useUpdateUser Hook");

  const queryClient = useQueryClient();
  //For editting a cabin
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: ({ fullName, avatar }) =>
      updateCurrentUser({ fullName, avatar }),
    onSuccess: ({ user }) => {
      toast.success("User account successfully updated");
      //Set the updated user into the cache.
      if (user) queryClient.setQueryData(["user"], user);

      queryClient.invalidateQueries({
        queryKey: ["user"], //The query that should be invalidated
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateUser };
}
