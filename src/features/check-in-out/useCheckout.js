import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckout() {
  console.log("useCheckout Hook");

  const queryClient = useQueryClient();

  // This mutation function can only receive 1 argument & so instead of just passing it the bookingId, we
  // will pass it an object
  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries({ active: true }); //So this will then invalidate all the queries that are currently active on the page.
    },

    onError: () => toast.error("There was an error while checking out"),
  });

  return { isCheckingOut, checkout };
}
