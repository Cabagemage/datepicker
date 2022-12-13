export const isFirstDateEarlierThanSecondOne = (
  start: Date | string,
  end: Date | string
): boolean => {
  const endTime = new Date(end);
  const startTime = new Date(start);
  const today = new Date().toLocaleDateString();
  return (
    startTime.getTime() <= endTime.getTime() &&
    today !== startTime.toLocaleDateString()
  );
};
