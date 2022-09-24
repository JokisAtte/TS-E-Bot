export const getSum = (message: string) => {
  const regex = /\d+\.?\d*/;
  return Number(regex.exec(message));
};
