export function combineFuncs<F extends (...args: any) => any>(
  funcA?: F,
  funcB?: F
): (...args: Parameters<F>) => void {
  return (...args: Parameters<F>) => {
    funcA?.(...args)
    funcB?.(...args)
  }
}
