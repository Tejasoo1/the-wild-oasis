import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
  console.log("useLocalStorageState Hook");

  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(
    function () {
      console.log("useLocalStorage useEffect");
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
