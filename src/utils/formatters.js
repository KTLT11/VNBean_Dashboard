export const sum = (items, key) => items.reduce((total, item) => total + Number(item[key] || 0), 0);

export const average = (items, key) => {
  if (!items.length) return 0;
  return sum(items, key) / items.length;
};

export const formatNumber = (value, digits = 1) =>
  new Intl.NumberFormat("en-US", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
    useGrouping: false,
  }).format(Number(value || 0));

export const formatCurrency = (value, digits = 1) => `${formatNumber(value, digits)} triệu`;

export const formatPercent = (value, digits = 1) => `${formatNumber(value, digits)}%`;

export const compactCurrency = (value) => {
  const amount = Number(value || 0);
  if (Math.abs(amount) >= 1000) return `${formatNumber(amount / 1000, 2)} tỷ`;
  return `${formatNumber(amount, 1)} triệu`;
};

export const byQuarterOrder = (a, b) => Number(a.Quy_order) - Number(b.Quy_order);

export const uniq = (items) => [...new Set(items.filter(Boolean))];
