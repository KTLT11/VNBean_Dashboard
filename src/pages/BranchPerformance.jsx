import { Bar, BarChart, CartesianGrid, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Badge from "../components/Badge";
import ChartCard from "../components/ChartCard";
import DataTable from "../components/DataTable";
import InsightBox from "../components/InsightBox";
import PageHeader from "../components/PageHeader";
import { colors, statusColors, tooltipStyle } from "../config/chartTheme";
import { average, formatCurrency, formatNumber } from "../utils/formatters";
import { getBranchRanking } from "../utils/metrics";

export default function BranchPerformance({ data }) {
  const ranking = getBranchRanking(data);
  const top15 = ranking.slice(0, 15).reverse();
  const chainAverage = average(ranking, "DoanhThu_TB");
  const top = ranking[0];
  const bottom = ranking[ranking.length - 1];

  return (
    <div className="page-stack">
      <PageHeader
        title="Hiệu suất chi nhánh"
        subtitle="Xếp hạng doanh thu, chi phí và chất lượng vận hành theo từng chi nhánh."
      />

      <ChartCard title="Ranking 15 chi nhánh theo doanh thu trung bình">
        <ResponsiveContainer width="100%" height={440}>
          <BarChart data={top15} layout="vertical" margin={{ top: 12, right: 36, left: 24, bottom: 8 }}>
            <CartesianGrid stroke={colors.border} horizontal={false} strokeDasharray="4 4" />
            <XAxis type="number" tick={{ fill: colors.textSecondary, fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis dataKey="MaNhanh" type="category" tick={{ fill: colors.textSecondary, fontSize: 12 }} axisLine={false} tickLine={false} width={56} />
            <Tooltip {...tooltipStyle} formatter={(value) => formatCurrency(value)} />
            <ReferenceLine x={chainAverage} stroke={colors.pink} strokeDasharray="5 5" label={{ value: "TB chuỗi", fill: colors.pink, fontSize: 12 }} />
            <Bar
              dataKey="DoanhThu_TB"
              radius={[0, 12, 12, 0]}
              fill={colors.primary}
              shape={(props) => {
                const fill = props.payload.TrangThai === "Vượt trung bình" ? statusColors["Vượt trung bình"] : statusColors["Dưới trung bình"];
                return <rect {...props} fill={fill} rx={10} ry={10} />;
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="content-grid content-grid--wide">
        <ChartCard title="Bảng hiệu suất chi nhánh">
          <DataTable
            columns={[
              { key: "MaNhanh", label: "Mã nhánh" },
              { key: "Khu_vuc", label: "Khu vực" },
              { key: "DoanhThu_TB", label: "Doanh thu TB", render: (row) => formatCurrency(row.DoanhThu_TB) },
              { key: "ChiPhi_TB", label: "Chi phí TB", render: (row) => formatCurrency(row.ChiPhi_TB) },
              { key: "HaiLong_TB", label: "Hài lòng TB", render: (row) => formatNumber(row.HaiLong_TB, 2) },
              { key: "TrangThai", label: "Trạng thái", render: (row) => <Badge tone={row.TrangThai === "Vượt trung bình" ? "success" : "danger"}>{row.TrangThai}</Badge> },
            ]}
            rows={ranking}
          />
        </ChartCard>

        <InsightBox
          items={[
            `${top?.MaNhanh} là nhóm nên học hỏi/nhân rộng với doanh thu TB ${formatCurrency(top?.DoanhThu_TB)}.`,
            `${bottom?.MaNhanh} là cảnh báo doanh thu thấp, cần xem lại chi phí, lưu lượng và chất lượng dịch vụ.`,
            `Mức trung bình toàn chuỗi là ${formatCurrency(chainAverage)}; các chi nhánh dưới ngưỡng cần kế hoạch cải thiện riêng.`,
          ]}
        />
      </div>
    </div>
  );
}
