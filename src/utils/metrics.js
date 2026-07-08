import { average, byQuarterOrder, sum, uniq } from "./formatters.js";

const groupBy = (items, key) =>
  items.reduce((groups, item) => {
    const groupKey = item[key];
    groups[groupKey] = groups[groupKey] || [];
    groups[groupKey].push(item);
    return groups;
  }, {});

export const getLatestQuarter = (data) => {
  if (!data.length) return null;
  const maxOrder = Math.max(...data.map((row) => Number(row.Quy_order)));
  return data.find((row) => Number(row.Quy_order) === maxOrder)?.Quy || null;
};

export const getLatestRows = (data) => {
  if (!data.length) return [];
  const maxOrder = Math.max(...data.map((row) => Number(row.Quy_order)));
  return data.filter((row) => Number(row.Quy_order) === maxOrder);
};

export function getOverviewMetrics(data) {
  const latestRows = getLatestRows(data);
  const latestSorted = [...latestRows].sort((a, b) => b.DoanhThu - a.DoanhThu);
  return {
    totalRevenue: sum(data, "DoanhThu"),
    averageRevenue: average(data, "DoanhThu"),
    averageSatisfaction: average(data, "HaiLong_KH"),
    latestQuarter: getLatestQuarter(data),
    topLatestBranch: latestSorted[0],
    bottomLatestBranch: latestSorted[latestSorted.length - 1],
  };
}

export function getQuarterlyRevenue(data) {
  return Object.values(groupBy(data, "Quy"))
    .map((rows) => ({
      Quy: rows[0].Quy,
      Quy_order: rows[0].Quy_order,
      TongDoanhThu: sum(rows, "DoanhThu"),
      DoanhThuTB: average(rows, "DoanhThu"),
      SoQuanSat: rows.length,
    }))
    .sort(byQuarterOrder);
}

export function getRevenueByAreaAndQuarter(data) {
  const quarters = getQuarterlyRevenue(data);
  const grouped = groupBy(data, "Quy");
  return quarters.map((quarter) => {
    const rows = grouped[quarter.Quy] || [];
    return {
      Quy: quarter.Quy,
      Quy_order: quarter.Quy_order,
      "Nội thành": sum(rows.filter((row) => row.Khu_vuc === "Nội thành"), "DoanhThu"),
      "Ngoại thành": sum(rows.filter((row) => row.Khu_vuc === "Ngoại thành"), "DoanhThu"),
    };
  });
}

export function getAreaSummary(data) {
  return Object.entries(groupBy(data, "Khu_vuc"))
    .map(([area, rows]) => ({
      Khu_vuc: area,
      TongDoanhThu: sum(rows, "DoanhThu"),
      DoanhThuTB: average(rows, "DoanhThu"),
      ChiPhiTB: average(rows, "ChiPhi"),
      HaiLongTB: average(rows, "HaiLong_KH"),
      SoQuanSat: rows.length,
    }))
    .sort((a, b) => b.TongDoanhThu - a.TongDoanhThu);
}

export function getBranchRanking(data) {
  const rows = Object.entries(groupBy(data, "MaNhanh")).map(([branch, values]) => ({
    MaNhanh: branch,
    Khu_vuc: values[0].Khu_vuc,
    DoanhThu_TB: average(values, "DoanhThu"),
    TongDoanhThu: sum(values, "DoanhThu"),
    ChiPhi_TB: average(values, "ChiPhi"),
    HaiLong_TB: average(values, "HaiLong_KH"),
    SoQuanSat: values.length,
  }));
  const chainAverage = average(rows, "DoanhThu_TB");
  return rows
    .map((row) => ({
      ...row,
      TrangThai: row.DoanhThu_TB >= chainAverage ? "Vượt trung bình" : "Dưới trung bình",
    }))
    .sort((a, b) => b.DoanhThu_TB - a.DoanhThu_TB);
}

export function getServiceRatingByArea(data) {
  return Object.entries(groupBy(data, "Khu_vuc")).map(([area, rows]) => {
    const result = { Khu_vuc: area, Tốt: 0, Khá: 0, "Trung bình": 0, Tong: rows.length };
    rows.forEach((row) => {
      result[row.XepHang_DV] = (result[row.XepHang_DV] || 0) + 1;
    });
    result.TotPct = (result.Tốt / rows.length) * 100;
    result.KhaPct = (result.Khá / rows.length) * 100;
    result.TrungBinhPct = (result["Trung bình"] / rows.length) * 100;
    return result;
  });
}

export function getSatisfactionByBranch(data) {
  return getBranchRanking(data)
    .map((row) => ({ MaNhanh: row.MaNhanh, Khu_vuc: row.Khu_vuc, HaiLongTB: row.HaiLong_TB, DoanhThu_TB: row.DoanhThu_TB }))
    .sort((a, b) => b.HaiLongTB - a.HaiLongTB);
}

export function getFilterOptions(data) {
  return {
    quarters: Object.values(groupBy(data, "Quy")).map((rows) => rows[0]).sort(byQuarterOrder).map((row) => row.Quy),
    areas: uniq(data.map((row) => row.Khu_vuc)),
    branches: uniq(data.map((row) => row.MaNhanh)).sort(),
  };
}
