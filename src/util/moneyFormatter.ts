export default (price: string) => {
  let result = '';
  for (let i = 0; i < Math.ceil(price.length / 3); i += 1) {
    result =
      ',' +
      price.substring(price.length - (3 + i * 3), price.length - i * 3) +
      result;
  }
  return result.substring(1);
};
