export const getSum = (message: string): number => {
  const regex = /\-?\d{0,2}(.|,)?\d{0,2}/;
  const indexOfSpace = message.indexOf(" ");
  if (indexOfSpace === -1) return NaN;
  //TODO: Käsittele euron merkit ja muu roina pois stringin lopusta
  return +message.substring(indexOfSpace + 1);
};
