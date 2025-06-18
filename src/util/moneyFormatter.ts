export default (price: string | number) => {
  let result = '';
  const isSmallerThenZero = Number(price) < 0;

  price = String(Math.round(Math.abs(Number(price))));

  for (let i = 0; i < Math.ceil(price.length / 3); i += 1) {
    result =
      ',' +
      price.substring(price.length - (3 + i * 3), price.length - i * 3) +
      result;
  }

  if (isSmallerThenZero) {
    return '-' + result.substring(1);
  } else {
    return result.substring(1);
  }
};
