export const getMonday = (date: Date) => {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - date.getDay() + 1
  );
};
