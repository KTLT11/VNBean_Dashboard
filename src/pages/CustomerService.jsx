import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from "recharts";
import ChartCard from "../components/ChartCard";
import InsightBox from "../components/InsightBox";
import PageHeader from "../components/PageHeader";
import { colors, serviceColors, tooltipStyle } from "../config/chartTheme";
import { formatCurrency, formatNumber } from "../utils/formatters";
import { getSatisfactionByBranch, getServiceRatingByArea } from "../utils/metrics";

export default function CustomerService({ data }) {
  const service = getServiceRatingByArea(data);
  const satisfaction = getSatisfactionByBranch(data).slice(0, 12);
  const risk = [...getSatisfactionByBranch(data)].sort((a, b) => b.DoanhThu_TB - a.DoanhThu_TB || a.HaiLongTB - b.HaiLongTB)[0];

  return (
    <div className="page-stack">
      <PageHeader
        title="Khách hàng & dịch vụ"
        subtitle="Đánh giá phân phối xếp hạng dịch vụ và mức độ hài lòng khách hàng."
      />

      <div className="content-grid">
        <ChartCard title="Xếp hạng dịch vụ theo khu vực">
          <ResponsiveContainer width="100%" height={330}>
            <BarChart data={service} margin={{ top: 16, right: 20, left: 0, bottom: 8 }}>
              <CartesianGrid stroke={colors.border} vertical={false} strokeDasharray="4 4" />
              <XAxis dataKey="Khu_vuc" tick={{ fill: colors.textSecondary, fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: colors.textSecondary, fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip {...tooltipStyle} />
              <Legend />
              <Bar dataKey="Tốt" stackId="rating" fill={serviceColors.Tốt} radius={[0, 0, 0, 0]} />
              <Bar dataKey="Khá" stackId="rating" fill={serviceColors.Khá} />
              <Bar dataKey="Trung bình" stackId="rating" fill={serviceColors["Trung bình"]} radius={[12, 12, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Hài lòng KH trung bình theo chi nhánh">
          <ResponsiveContainer width="100%" height={330}>
            <BarChart data={satisfaction} margin={{ top: 16, right: 20, left: 0, bottom: 8 }}>
              <CartesianGrid stroke={colors.border} vertical={false} strokeDasharray="4 4" />
              <XAxis dataKey="MaNhanh" tick={{ fill: colors.textSecondary, fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 10]} tick={{ fill: colors.textSecondary, fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip {...tooltipStyle} formatter={(value) => formatNumber(value, 2)} />
              <Bar dataKey="HaiLongTB" fill={colors.primary} radius={[12, 12, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="content-grid content-grid--wide">
        <ChartCard title="Hài lòng KH vs Doanh thu">
          <ResponsiveContainer width="100%" height={340}>
            <ScatterChart margin={{ top: 16, right: 20, left: 0, bottom: 16 }}>
              <CartesianGrid stroke={colors.border} strokeDasharray="4 4" />
              <XAxis dataKey="HaiLong_KH" name="Hài lòng KH" type="number" domain={[0, 10]} tick={{ fill: colors.textSecondary, fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis dataKey="DoanhThu" name="Doanh thu" type="number" tick={{ fill: colors.textSecondary, fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip {...tooltipStyle} formatter={(value, name) => [name === "Doanh thu" ? formatCurrency(value) : formatNumber(value, 2), name]} />
              <Scatter name="Quan sát" data={data} fill={colors.pink} />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartCard>

        <InsightBox
          items={[
            "Tỷ lệ xếp hạng dịch vụ cho biết chất lượng vận hành có đồng đều giữa hai khu vực hay không.",
            `${risk?.MaNhanh} có doanh thu trung bình cao trong nhóm được lọc; nếu điểm hài lòng thấp hơn mặt bằng thì đây là rủi ro giữ chân khách.`,
            "Chi nhánh hài lòng cao nhưng doanh thu thấp nên được xem xét thêm về marketing, vị trí và khả năng tăng lượt khách.",
          ]}
        />
      </div>
    </div>
  );
}
