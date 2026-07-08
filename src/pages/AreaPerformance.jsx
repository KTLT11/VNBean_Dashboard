import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import ChartCard from "../components/ChartCard";
import DataTable from "../components/DataTable";
import InsightBox from "../components/InsightBox";
import PageHeader from "../components/PageHeader";
import { areaColors, colors, tooltipStyle } from "../config/chartTheme";
import { formatCurrency, formatNumber } from "../utils/formatters";
import { getAreaSummary, getRevenueByAreaAndQuarter } from "../utils/metrics";

export default function AreaPerformance({ data }) {
  const byQuarter = getRevenueByAreaAndQuarter(data);
  const summary = getAreaSummary(data);
  const leader = summary[0];
  const follower = summary[summary.length - 1];

  return (
    <div className="page-stack">
      <PageHeader
        title="Hiệu quả theo khu vực"
        subtitle="Đánh giá đóng góp doanh thu và hiệu quả vận hành giữa Nội thành và Ngoại thành."
      />

      <div className="content-grid content-grid--wide">
        <ChartCard title="Doanh thu Nội thành vs Ngoại thành theo quý">
          <ResponsiveContainer width="100%" height={330}>
            <BarChart data={byQuarter} margin={{ top: 16, right: 24, left: 0, bottom: 8 }}>
              <CartesianGrid stroke={colors.border} vertical={false} strokeDasharray="4 4" />
              <XAxis dataKey="Quy" tick={{ fill: colors.textSecondary, fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: colors.textSecondary, fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip {...tooltipStyle} formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Bar dataKey="Nội thành" fill={areaColors["Nội thành"]} radius={[10, 10, 0, 0]} />
              <Bar dataKey="Ngoại thành" fill={areaColors["Ngoại thành"]} radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Doanh thu trung bình theo khu vực">
          <ResponsiveContainer width="100%" height={330}>
            <BarChart data={summary} layout="vertical" margin={{ top: 16, right: 20, left: 20, bottom: 8 }}>
              <CartesianGrid stroke={colors.border} horizontal={false} strokeDasharray="4 4" />
              <XAxis type="number" tick={{ fill: colors.textSecondary, fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis dataKey="Khu_vuc" type="category" tick={{ fill: colors.textSecondary, fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip {...tooltipStyle} formatter={(value) => formatCurrency(value)} />
              <Bar dataKey="DoanhThuTB" fill={colors.primary} radius={[0, 12, 12, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="content-grid content-grid--wide">
        <ChartCard title="Bảng tổng hợp khu vực">
          <DataTable
            layout="vertical"
            rowLabelKey="Khu_vuc"
            rowLabelHeader="Chỉ số"
            columns={[
              { key: "TongDoanhThu", label: "Tổng doanh thu", render: (row) => formatCurrency(row.TongDoanhThu) },
              { key: "DoanhThuTB", label: "Doanh thu TB", render: (row) => formatCurrency(row.DoanhThuTB) },
              { key: "ChiPhiTB", label: "Chi phí TB", render: (row) => formatCurrency(row.ChiPhiTB) },
              { key: "HaiLongTB", label: "Hài lòng TB", render: (row) => formatNumber(row.HaiLongTB, 2) },
              { key: "SoQuanSat", label: "Số quan sát" },
            ]}
            rows={summary}
          />
        </ChartCard>

        <InsightBox
          title="Hàm ý chiến lược thị trường"
          items={[
            `${leader?.Khu_vuc} đang đóng góp doanh thu tốt hơn với tổng ${formatCurrency(leader?.TongDoanhThu)}.`,
            `${leader?.Khu_vuc} có thể là khu vực ưu tiên mở rộng nếu chi phí và chất lượng dịch vụ vẫn ổn định.`,
            `${follower?.Khu_vuc} cần được soi thêm về lưu lượng, vị trí và năng lực vận hành trước khi mở rộng thêm.`,
          ]}
        />
      </div>
    </div>
  );
}
