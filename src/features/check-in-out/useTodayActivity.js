import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayActivity() {
  console.log("useTodayActivity");

  const { isLoading, data: stays } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["today-activity"], //The today's activities, will not be affected by the filters that we have in the dashboard
  });

  return { stays, isLoading };
}
