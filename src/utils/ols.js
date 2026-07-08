export function calculateOLS(data, xKey = "ChiPhi", yKey = "DoanhThu") {
  const points = data
    .map((item) => ({ x: Number(item[xKey]), y: Number(item[yKey]) }))
    .filter((point) => Number.isFinite(point.x) && Number.isFinite(point.y));

  const n = points.length;
  if (n < 2) {
    return { intercept: 0, slope: 0, r2: 0, points: [], line: [] };
  }

  const meanX = points.reduce((total, point) => total + point.x, 0) / n;
  const meanY = points.reduce((total, point) => total + point.y, 0) / n;
  const numerator = points.reduce((total, point) => total + (point.x - meanX) * (point.y - meanY), 0);
  const denominator = points.reduce((total, point) => total + (point.x - meanX) ** 2, 0);
  const slope = denominator === 0 ? 0 : numerator / denominator;
  const intercept = meanY - slope * meanX;

  const ssTotal = points.reduce((total, point) => total + (point.y - meanY) ** 2, 0);
  const ssResidual = points.reduce((total, point) => {
    const predicted = intercept + slope * point.x;
    return total + (point.y - predicted) ** 2;
  }, 0);
  const r2 = ssTotal === 0 ? 0 : 1 - ssResidual / ssTotal;

  const xs = points.map((point) => point.x);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const line = [
    { ChiPhi: minX, DoanhThu: intercept + slope * minX },
    { ChiPhi: maxX, DoanhThu: intercept + slope * maxX },
  ];

  return { intercept, slope, r2, points, line };
}
