export function range(start = 0, end: number, step = 1, isRight = false): number[] {
  if (end === undefined) {
    end = start;
    start = 0;
  }
  if (step === 0) {
    return new Array(end - start).fill(undefined).map(() => start);
  }
  if (isRight) {
    if (end < 0) {
      return new Array((0 - end) - start).fill(undefined).map((_, index) => start - index * step).reverse();
    }
    return new Array((end - start) / step).fill(undefined).map((_, index) => start + index * step).reverse();
  }
  if (end < 0) {
    return new Array((0 - end) - start).fill(undefined).map((_, index) => start - index * step);
  }
  return new Array((end - start) / step).fill(undefined).map((_, index) => start + index * step);
}
