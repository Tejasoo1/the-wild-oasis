import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings() {
  console.log("useSettings");

  const {
    isLoading,
    error,
    data: settings,
  } = useQuery({
    queryKey: ["settings"], //Again to uniquely identify this Query in our cache then.
    queryFn: getSettings, //Again, this(getSettings) needs to be a function that returns a promise
  });

  return { isLoading, error, settings };
}
