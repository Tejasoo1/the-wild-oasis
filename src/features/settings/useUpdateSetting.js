import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

/*
1] We are going to update only 1 setting value at a time.
2] 

*/

export function useUpdateSetting() {
  console.log("useUpdateSetting");

  const queryClient = useQueryClient();
  //For editting a cabin
  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Setting successfully edited");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
      // reset(); //resetting the Form
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateSetting };
}
