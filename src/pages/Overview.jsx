import { Bar, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import ChartCard from "../components/ChartCard";
import InsightBox from "../components/InsightBox";
import MetricCard from "../components/MetricCard";
import PageHeader from "../components/PageHeader";
import { colors, tooltipStyle } from "../config/chartTheme";
import { compactCurrency, formatCurrency, formatNumber } from "../utils/formatters";
import { getOverviewMetrics, getQuarterlyRevenue } from "../utils/metrics";

export default function Overview({ data }) {
  const metrics = getOverviewMetrics(data);
  const quarterly = getQuarterlyRevenue(data);
  const bestQuarter = [...quarterly].sort((a, b) => b.TongDoanhThu - a.TongDoanhThu)[0];
  const weakestQuarter = [...quarterly].sort((a, b) => a.TongDoanhThu - b.TongDoanhThu)[0];

  return (
    <div className="page-stack">
      <PageHeader
        title="Tổng quan điều hành"
        subtitle="Theo dõi doanh thu, hiệu quả chi nhánh và tình hình vận hành toàn chuỗi VNBean."
      />

      <div className="metric-grid metric-grid--five">
        <MetricCard label="Tổng doanh thu" value={compactCurrency(metrics.totalRevenue)} caption="Lũy kế theo dữ liệu đã lọc" tone="primary" />
        <MetricCard label="Doanh thu TB/chi nhánh" value={formatCurrency(metrics.averageRevenue)} caption="Trung bình trên mỗi quan sát" tone="blue" />
        <MetricCard label="Cao nhất kỳ mới nhất" value={metrics.topLatestBranch?.MaNhanh || "-"} caption={`${formatCurrency(metrics.topLatestBranch?.DoanhThu)} - ${metrics.latestQuarter}`} tone="purple" />
        <MetricCard label="Thấp nhất kỳ mới nhất" value={metrics.bottomLatestBranch?.MaNhanh || "-"} caption={`${formatCurrency(metrics.bottomLatestBranch?.DoanhThu)} - ${metrics.latestQuarter}`} tone="pink" />
        <MetricCard label="Hài lòng KH trung bình" value={formatNumber(metrics.averageSatisfaction, 2)} caption="Điểm trung bình toàn chuỗi" tone="green" />
      </div>

      <div className="content-grid content-grid--wide">
        <ChartCard title="Tổng doanh thu theo quý" subtitle="Tooltip có số quan sát và doanh thu trung bình để so sánh công bằng hơn.">
          <ResponsiveContainer width="100%" height={340}>
            <ComposedChart data={quarterly} margin={{ top: 16, right: 24, left: 0, bottom: 8 }}>
              <CartesianGrid stroke={colors.border} vertical={false} strokeDasharray="4 4" />
              <XAxis dataKey="Quy" tick={{ fill: colors.textSecondary, fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: colors.textSecondary, fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(value) => `${value}`} />
              <Tooltip
                {...tooltipStyle}
                formatter={(value, name) => [
                  name === "SoQuanSat" ? value : formatCurrency(value),
                  name === "TongDoanhThu" ? "Tổng doanh thu" : name === "DoanhThuTB" ? "Doanh thu TB/chi nhánh" : "Số quan sát",
                ]}
              />
              <Bar dataKey="TongDoanhThu" fill={colors.softBlue} radius={[12, 12, 0, 0]} />
              <Line type="monotone" dataKey="DoanhThuTB" stroke={colors.pink} strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="SoQuanSat" stroke={colors.success} strokeWidth={2} dot={false} yAxisId={0} opacity={0.001} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>

        <InsightBox
          items={[
            `Doanh thu cao nhất xuất hiện ở ${bestQuarter?.Quy} với ${formatCurrency(bestQuarter?.TongDoanhThu)}.`,
            `Kỳ thấp nhất là ${weakestQuarter?.Quy}; nên đọc cùng số quan sát (${weakestQuarter?.SoQuanSat}) trước khi kết luận hiệu suất.`,
            `${metrics.topLatestBranch?.MaNhanh} dẫn đầu kỳ mới nhất, trong khi ${metrics.bottomLatestBranch?.MaNhanh} là điểm cần theo dõi sát.`,
          ]}
        />
      </div>
    </div>
  );
}
