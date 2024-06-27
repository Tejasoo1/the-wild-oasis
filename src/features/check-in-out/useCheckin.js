import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  console.log("useCheckin");

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // This mutation function can only receive 1 argument & so instead of just passing it the bookingId, we
  // will pass it an object
  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({ active: true }); //So this will then invalidate all the queries that are currently active on the page.
      navigate("/");
    },

    onError: () => toast.error("There was an error while checking in"),
  });

  return { isCheckingIn, checkin };
}
