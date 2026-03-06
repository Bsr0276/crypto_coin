// fiyatı formatla
export const formatPrice = (price) => {
  if (!price) return "N/A";

  if (price.price < 0.01) {
    return `$${price.toFixed(6)}`;
  } else if (price < 1) {
    return `$${price.toFixed(4)}`;
  } else if (price < 100) {
    return `$${price.toFixed(2)}`;
  } else {
    return `$${price.toLocaleString(0)}`;
  }
};

//bbüyük sayı formatla

export const formatBigNumber = (number) => {
  if (!number) return "N/A";

  if (number >= 1e12) {
    return `$${(number / 1e12).toFixed(2)}T`;
  } else if (number > 1e9) {
    return `$${(number / 1e9).toFixed(2)}B`;
  } else if (number > 1e6) {
    return `$${(number / 1e6).toFixed(2)}M`;
  } else {
    return `$${number.toLocaleString()}`;
  }
};

// % yüzdelik değeri formatla

export const formatPercentage = (percantage) => {
  if (!percantage) return "N/A";

  // sayını mutlak değerini al ve noktafdan sonra 2 basamak olsun

  const formatted = Math.abs(percantage).toFixed(2);
// işaretini belirle
  const sing = percantage >= 0 ? "+" : "-";
// işaretini ekle ve return  et
  return `${sing}${formatted}`;
};
