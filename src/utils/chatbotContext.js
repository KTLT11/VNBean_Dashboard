import { formatNumber } from "./formatters.js";
import { getAreaSummary, getBranchRanking, getOverviewMetrics, getQuarterlyRevenue } from "./metrics.js";
import { calculateOLS } from "./ols.js";

export const suggestedQuestions = [
  "Tóm tắt 3 insight quan trọng nhất cho Giám đốc.",
  "Chi nhánh nào có doanh thu trung bình cao nhất?",
  "Chi nhánh nào cần cải thiện nhất?",
  "Khu vực Nội thành hay Ngoại thành hiệu quả hơn?",
  "Doanh thu toàn chuỗi thay đổi như thế nào qua 6 quý?",
  "Nếu chi phí dự kiến là 80 triệu, doanh thu dự báo khoảng bao nhiêu?",
  "Có rủi ro nào về chất lượng dịch vụ không?",
];

export function buildChatbotContext(data) {
  const overview = getOverviewMetrics(data);
  const quarterly = getQuarterlyRevenue(data);
  const areaSummary = getAreaSummary(data);
  const ranking = getBranchRanking(data);
  const ols = calculateOLS(data);

  return {
    overview,
    quarterly,
    areaSummary,
    ranking,
    topBranches: ranking.slice(0, 5),
    bottomBranches: ranking.slice(-5).reverse(),
    averageSatisfaction: overview.averageSatisfaction,
    ols,
  };
}

export function serializeChatbotContext(context) {
  const lines = [
    `Tổng doanh thu: ${formatNumber(context.overview.totalRevenue)} triệu đồng.`,
    `Hài lòng KH trung bình: ${formatNumber(context.averageSatisfaction, 2)}.`,
    `Quý mới nhất theo Quy_order: ${context.overview.latestQuarter}.`,
    `OLS DoanhThu = ${formatNumber(context.ols.intercept, 3)} + ${formatNumber(context.ols.slope, 3)} * ChiPhi, R2 = ${formatNumber(context.ols.r2, 3)}.`,
    "Doanh thu theo quý:",
    ...context.quarterly.map((row) => `- ${row.Quy}: tổng ${formatNumber(row.TongDoanhThu)} triệu, TB ${formatNumber(row.DoanhThuTB)} triệu, ${row.SoQuanSat} quan sát.`),
    "Tổng hợp khu vực:",
    ...context.areaSummary.map((row) => `- ${row.Khu_vuc}: tổng ${formatNumber(row.TongDoanhThu)} triệu, TB ${formatNumber(row.DoanhThuTB)} triệu, chi phí TB ${formatNumber(row.ChiPhiTB)} triệu, hài lòng TB ${formatNumber(row.HaiLongTB, 2)}.`),
    "Top 5 chi nhánh:",
    ...context.topBranches.map((row) => `- ${row.MaNhanh}: doanh thu TB ${formatNumber(row.DoanhThu_TB)} triệu, chi phí TB ${formatNumber(row.ChiPhi_TB)} triệu, hài lòng ${formatNumber(row.HaiLong_TB, 2)}.`),
    "Bottom 5 chi nhánh:",
    ...context.bottomBranches.map((row) => `- ${row.MaNhanh}: doanh thu TB ${formatNumber(row.DoanhThu_TB)} triệu, chi phí TB ${formatNumber(row.ChiPhi_TB)} triệu, hài lòng ${formatNumber(row.HaiLong_TB, 2)}.`),
  ];

  return lines.join("\n");
}
