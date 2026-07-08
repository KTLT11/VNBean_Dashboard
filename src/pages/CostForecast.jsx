import { useMemo, useState } from "react";
import { CartesianGrid, Legend, Line, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from "recharts";
import ChartCard from "../components/ChartCard";
import InsightBox from "../components/InsightBox";
import MetricCard from "../components/MetricCard";
import PageHeader from "../components/PageHeader";
import { areaColors, colors, tooltipStyle } from "../config/chartTheme";
import { formatCurrency, formatNumber } from "../utils/formatters";
import { calculateOLS } from "../utils/ols";

export default function CostForecast({ data }) {
  const ols = useMemo(() => calculateOLS(data), [data]);
  const [cost, setCost] = useState(80);
  const predicted = ols.intercept + ols.slope * Number(cost || 0);
  const inner = data.filter((row) => row.Khu_vuc === "Nội thành");
  const outer = data.filter((row) => row.Khu_vuc === "Ngoại thành");

  const chartRange = useMemo(() => {
    const costs = data.map((row) => Number(row.ChiPhi));
    const revenues = data.map((row) => Number(row.DoanhThu));
    return {
      minCost: Math.min(...costs),
      maxCost: Math.max(...costs),
      minRevenue: Math.min(...revenues),
      maxRevenue: Math.max(...revenues),
    };
  }, [data]);

  const diagonalReference = [
    { ChiPhi: chartRange.minCost, DoanhThu: chartRange.minRevenue },
    { ChiPhi: chartRange.maxCost, DoanhThu: chartRange.maxRevenue },
  ];

  return (
    <div className="page-stack">
      <PageHeader
        title="Chi phí & dự báo doanh thu"
        subtitle="Phân tích quan hệ giữa chi phí vận hành và doanh thu kỳ vọng."
      />

      <div className="metric-grid metric-grid--three">
        <MetricCard label="β0" value={formatNumber(ols.intercept, 3)} caption="Hệ số chặn của mô hình" tone="primary" />
        <MetricCard label="β1" value={formatNumber(ols.slope, 3)} caption="Tác động của 1 triệu chi phí" tone="purple" />
        <MetricCard label="R²" value={formatNumber(ols.r2, 3)} caption="Mức giải thích của mô hình" tone="green" />
      </div>

      <div className="content-grid content-grid--wide">
        <ChartCard title="Quan hệ chi phí - doanh thu" subtitle="Đơn vị: triệu đồng. Có đường OLS và một đường chéo tham chiếu để nhìn tương quan trực quan hơn.">
          <ResponsiveContainer width="100%" height={390}>
            <ScatterChart margin={{ top: 16, right: 28, left: 0, bottom: 16 }}>
              <CartesianGrid stroke={colors.border} strokeDasharray="4 4" />
              <XAxis dataKey="ChiPhi" name="Chi phí" type="number" tick={{ fill: colors.textSecondary, fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis dataKey="DoanhThu" name="Doanh thu" type="number" tick={{ fill: colors.textSecondary, fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip {...tooltipStyle} cursor={{ strokeDasharray: "3 3" }} formatter={(value, name) => [formatCurrency(value), name]} />
              <Legend />
              <Scatter name="Nội thành" data={inner} fill={areaColors["Nội thành"]} />
              <Scatter name="Ngoại thành" data={outer} fill={areaColors["Ngoại thành"]} />
              <Line data={diagonalReference} dataKey="DoanhThu" name="Đường chéo tham chiếu" stroke={colors.softBlue} strokeDasharray="6 6" strokeWidth={2} dot={false} activeDot={false} />
              <Line data={ols.line} dataKey="DoanhThu" name="Đường OLS" stroke={colors.text} strokeWidth={3} dot={false} activeDot={false} />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartCard>

        <section className="forecast-card">
          <h2>Dự báo nhanh</h2>
          <label>
            Chi phí dự kiến
            <input type="range" min="40" max="130" value={cost} onChange={(event) => setCost(event.target.value)} />
          </label>
          <div className="forecast-input">
            <input type="number" value={cost} onChange={(event) => setCost(event.target.value)} />
            <span>triệu đồng</span>
          </div>
          <strong>{formatCurrency(predicted)}</strong>
          <p>Doanh thu dự báo theo mô hình OLS đơn biến.</p>
        </section>
      </div>

      <InsightBox
        items={[
          `Hệ số β1 là ${formatNumber(ols.slope, 3)}, cho biết chi phí có xu hướng đi cùng doanh thu trong dữ liệu hiện tại.`,
          `Với chi phí ${formatNumber(cost)} triệu, doanh thu dự báo khoảng ${formatCurrency(predicted)}.`,
          "Đây là mô hình OLS đơn biến nên chỉ nên dùng như tín hiệu sơ bộ, không thay thế dự báo vận hành đầy đủ.",
        ]}
      />
    </div>
  );
}
