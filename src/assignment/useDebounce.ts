import { useState } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  // TODO: implement the debounce logic

  return debouncedValue;
}
