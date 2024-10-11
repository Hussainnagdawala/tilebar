import { useEffect, useState } from "react";

export const useDebounce = (value, delay) => {
  const [newValue, setNewValue] = useState("");
  useEffect(() => {
    const timeout = setTimeout(() => {
      setNewValue(value);
    }, delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [delay, value]);
  return newValue;
};
