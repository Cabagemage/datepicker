export const getSunday = (date: Date) => {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - date.getDay() + 7
  );
};
