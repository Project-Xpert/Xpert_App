const getStockIcon = (stockCode: string) => {
  let iconCode = stockCode;

  if (stockCode === 'BATL') {
    iconCode = '942958994376';
  } else if (stockCode === 'CGC') {
    iconCode = 'WEED.TO';
  } else if (stockCode === 'EVEX') {
    iconCode = '950783480256';
  } else if (stockCode === 'GOOGL') {
    iconCode = 'GOOG';
  } else if (stockCode === 'LUNR') {
    iconCode = '950838259336';
  } else if (stockCode === 'META') {
    iconCode = 'FB';
  }

  return `https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/${iconCode}.png`;
};

export default getStockIcon;
