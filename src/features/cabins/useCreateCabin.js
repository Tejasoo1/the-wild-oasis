import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

/* 
 1] We do not have this reset() function available right here.
 2] reset() function --->  comes from useFrom() Hook. 
 3] How can we bring this reset() function into this custom Hook:-

 i. We can pass, this below code, into the mutation function:

    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset(); //resetting the Form
    } 

 ii. So, again we can place this onSuccess handler function not only, right here.
 iii. But also, right in the function where the mutation actually happens.
    

                                    |--> passing in an object of options 
      createCabin({...data, image}, {
        onSuccess: () => reset(),
      }); 
                                         
*/

export function useCreateCabin() {
  const queryClient = useQueryClient();

  //For creating a new cabin
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    //right here
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      // reset(); //resetting the Form
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createCabin };
}
