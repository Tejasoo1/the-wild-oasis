import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingapi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  console.log("useDeleteBooking Hook");

  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: (bookingId) => deleteBookingapi(bookingId),

    onSuccess: () => {
      toast.success("Booking deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },

    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteBooking };
}
