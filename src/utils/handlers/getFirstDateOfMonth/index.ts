export const getFirstDateOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};
