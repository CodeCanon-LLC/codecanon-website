import { useEffect, useState } from "react";

export function useMedia(query: string, defaultState = false) {
  const [state, setState] = useState(() => {
    if (typeof window === "undefined") return defaultState;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(query);
    const onChange = () => setState(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return state;
}
