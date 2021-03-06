export const calculateChange = (
  container: HTMLDivElement,
  step: number,
  min: number,
  max: number
) => {
  return (e) => {
    if (!container) return 0;
    const { width: containerWidth } = container.getBoundingClientRect();
    const x = typeof e.pageX === "number" ? e.pageX : e.touches[0].pageX;
    let left =
      x - (container.getBoundingClientRect().left + window.pageXOffset);

    if (left < 0) {
      left = 0;
    } else if (left > containerWidth) {
      left = containerWidth;
    }

    const value =
      Math.floor(Math.floor((left / containerWidth) * (max - min)) / step) *
        step +
      min;

    return { value: value - min };
  };
};
