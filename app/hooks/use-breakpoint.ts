import { useMedia } from "./use-media";

/**
 * Breakpoint values for responsive design utilities.
 *
 * - "sm":       @media (width >= 40rem)
 * - "md":       @media (width >= 48rem)
 * - "lg":       @media (width >= 64rem)
 * - "xl":       @media (width >= 80rem)
 * - "2xl":      @media (width >= 96rem)
 * - "3xl":      @media (width >= 120rem)
 * - "4xl":      @media (width >= 160rem)
 * - "5xl":      @media (width >= 192rem)
 * - "6xl":      @media (width >= 224rem)
 * - "min-[X]":  @media (width >= X)         (X is any string, e.g. "56rem")
 *
 * - "max-sm":   @media (width < 40rem)
 * - "max-md":   @media (width < 48rem)
 * - "max-lg":   @media (width < 64rem)
 * - "max-xl":   @media (width < 80rem)
 * - "max-2xl":  @media (width < 96rem)
 * - "max-3xl":  @media (width < 120rem)
 * - "max-4xl":  @media (width < 160rem)
 * - "max-5xl":  @media (width < 192rem)
 * - "max-6xl":  @media (width < 224rem)
 * - "max-[X]":  @media (width < X)          (X is any string)
 *
 * - "min-sm", "min-md", "min-lg", "min-xl", "min-2xl":
 *      Aliases for the standard min breakpoints ("sm", "md", etc)
 * - "not-sm", "not-md", "not-lg", "not-xl", "not-2xl", "not-[X]":
 *      Aliases for the standard max breakpoints ("max-sm", etc)
 */
export type Breakpoint =
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | `min-[${string}]`
  | "max-sm"
  | "max-md"
  | "max-lg"
  | "max-xl"
  | "max-2xl"
  | "max-3xl"
  | "max-4xl"
  | "max-5xl"
  | "max-6xl"
  | `max-[${string}]`
  // ---------------------------------------------
  | "min-sm"
  | "min-md"
  | "min-lg"
  | "min-xl"
  | "min-2xl"
  | "min-3xl"
  | "min-4xl"
  | "min-5xl"
  | "min-6xl"
  // ---------------------------------------------
  | "not-sm"
  | "not-md"
  | "not-lg"
  | "not-xl"
  | "not-2xl"
  | "not-3xl"
  | "not-4xl"
  | "not-5xl"
  | "not-6xl"
  | `not-[${string}]`;

export const BreakpointSizes: Record<string, string> = {
  sm: "40rem",
  md: "48rem",
  lg: "64rem",
  xl: "80rem",
  "2xl": "96rem",
  "3xl": "120rem",
  "4xl": "160rem",
  "5xl": "192rem",
  "6xl": "224rem",
};

function getBreakpointParts(breakpoint: Breakpoint) {
  const prefix = breakpoint.slice(0, 3);
  const suffix = breakpoint.slice(4);
  const size =
    suffix[0] === "[" ? suffix.slice(1, -1) : BreakpointSizes[suffix];
  const operator = prefix === "max" || prefix === "not" ? "<" : ">=";

  return [operator, size] as const;
}

export function useIsBreakpoint(
  breakpoint: Breakpoint,
  defaultState?: boolean,
) {
  const [operator, size] = getBreakpointParts(breakpoint);
  return useMedia(`(width ${operator} ${size})`, defaultState);
}
