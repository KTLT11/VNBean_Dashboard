import { useState } from "react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, ScatterChart, Scatter,
  Legend, ComposedChart, Area
} from "recharts";
import {
  LayoutDashboard, MapPin, Store, TrendingUp, Users, MessageSquare,
  Search, Bell, ChevronDown, Send, Bot, User, Filter
} from "lucide-react";

// ── Color tokens ──────────────────────────────────────────────────────────────
const C = {
  blue:    "#5D7CF4",
  blueDk:  "#425FE0",
  blueSft: "#8EA2FF",
  purple:  "#8E55CF",
  pink:    "#F05A9D",
  pinkSft: "#F7A7C9",
  cyan:    "#36A3FF",
  green:   "#4EBE91",
  yellow:  "#F5B84B",
  red:     "#F05A7A",
  bg:      "#E9ECFA",
  bg2:     "#F4F6FF",
  surface: "#F8FAFF",
  white:   "#FFFFFF",
  cardAlt: "#F7F8FF",
  txt:     "#17151F",
  txtSec:  "#6E7280",
  txtMut:  "#A1A6B5",
  border:  "#E5E8F3",
};

// ── Mock data ─────────────────────────────────────────────────────────────────
const revenueData = [
  { q: "Q1/23", noi: 4.2, ngoai: 2.1 },
  { q: "Q2/23", noi: 4.8, ngoai: 2.4 },
  { q: "Q3/23", noi: 5.1, ngoai: 2.8 },
  { q: "Q4/23", noi: 5.6, ngoai: 3.1 },
  { q: "Q1/24", noi: 5.9, ngoai: 3.4 },
  { q: "Q2/24", noi: 6.2, ngoai: 3.7 },
  { q: "Q3/24", noi: 6.8, ngoai: 4.0 },
  { q: "Q4/24", noi: 7.1, ngoai: 4.3 },
];

const branchData = [
  { name: "Lê Văn Sỹ",    dt: 890 },
  { name: "Nguyễn Huệ",   dt: 860 },
  { name: "Bùi Viện",     dt: 820 },
  { name: "Đinh Tiên Hoàng", dt: 800 },
  { name: "Võ Thị Sáu",   dt: 780 },
  { name: "Cộng Hòa",     dt: 760 },
  { name: "Trần Phú",     dt: 740 },
  { name: "Nam Kỳ KN",    dt: 720 },
  { name: "Hai Bà Trưng", dt: 700 },
  { name: "Lê Lợi",       dt: 680 },
  { name: "Phan Xích Long",dt: 660 },
  { name: "Điện Biên Phủ",dt: 640 },
  { name: "Cách Mạng",    dt: 610 },
  { name: "Âu Cơ",        dt: 580 },
  { name: "Bình Thạnh",   dt: 540 },
];

const tableData = [
  { ma: "LVS", kv: "Nội thành",  dt: 890, cp: 310, hl: 4.7, status: "above" },
  { ma: "NH",  kv: "Nội thành",  dt: 860, cp: 295, hl: 4.6, status: "above" },
  { ma: "BV",  kv: "Nội thành",  dt: 820, cp: 280, hl: 4.5, status: "above" },
  { ma: "DTH", kv: "Ngoại thành",dt: 800, cp: 270, hl: 4.4, status: "above" },
  { ma: "VTS", kv: "Ngoại thành",dt: 780, cp: 265, hl: 4.3, status: "above" },
  { ma: "CH",  kv: "Nội thành",  dt: 760, cp: 260, hl: 4.2, status: "above" },
  { ma: "TP",  kv: "Ngoại thành",dt: 740, cp: 255, hl: 4.0, status: "below" },
  { ma: "NKKN",kv: "Ngoại thành",dt: 720, cp: 250, hl: 3.9, status: "below" },
  { ma: "HBT", kv: "Nội thành",  dt: 700, cp: 245, hl: 3.8, status: "below" },
  { ma: "LL",  kv: "Ngoại thành",dt: 680, cp: 240, hl: 3.7, status: "below" },
];

const scatterData = Array.from({ length: 30 }, (_, i) => ({
  cp: 180 + Math.random() * 200,
  dt: 500 + Math.random() * 500 + (i * 5),
  kv: i % 2 === 0 ? "Nội thành" : "Ngoại thành",
}));

const serviceData = [
  { kv: "Nội thành",  tot: 45, kha: 35, tb: 20 },
  { kv: "Ngoại thành",tot: 38, kha: 38, tb: 24 },
];

const satisfactionData = [
  { name: "Lê Văn Sỹ",   hl: 4.7 },
  { name: "Nguyễn Huệ",  hl: 4.6 },
  { name: "Bùi Viện",    hl: 4.5 },
  { name: "Trần Phú",    hl: 4.0 },
  { name: "Âu Cơ",       hl: 3.7 },
];

const scatterServiceData = Array.from({ length: 20 }, (_, i) => ({
  hl: 3.5 + Math.random() * 1.4,
  dt: 500 + Math.random() * 400,
}));

const chatHistory = [
  { role: "assistant", text: "Xin chào! Tôi là trợ lý phân tích VNBean. Bạn muốn tìm hiểu gì về dữ liệu kinh doanh hôm nay?" },
  { role: "user", text: "Chi nhánh nào có doanh thu cao nhất quý vừa rồi?" },
  { role: "assistant", text: "Theo dữ liệu Q4/2024, chi nhánh **Lê Văn Sỹ** đạt doanh thu cao nhất với **890 triệu đồng**, vượt trung bình toàn chuỗi 18%. Đây cũng là chi nhánh có chỉ số hài lòng khách hàng tốt nhất (4.7/5)." },
];

const suggestedQuestions = [
  "Tóm tắt 3 insight quan trọng nhất",
  "Chi nhánh nào có doanh thu cao nhất?",
  "Khu vực nào hiệu quả hơn?",
  "Dự báo doanh thu khi chi phí là 80 triệu?",
  "Có rủi ro nào về chất lượng dịch vụ không?",
];

// ── Sub-components ─────────────────────────────────────────────────────────────
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-3xl border p-6 ${className}`}
      style={{ background: C.white, borderColor: C.border, boxShadow: "0 12px 30px rgba(45,63,120,0.10)" }}
    >
      {children}
    </div>
  );
}

function MetricCard({
  label, value, caption, color, light = false
}: { label: string; value: string; caption: string; color: string; light?: boolean }) {
  return (
    <div
      className="rounded-3xl p-5 flex flex-col gap-1 min-h-[120px] justify-between"
      style={{
        background: light ? C.cardAlt : color,
        border: `1px solid ${C.border}`,
        boxShadow: "0 12px 30px rgba(45,63,120,0.10)"
      }}
    >
      <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: light ? C.txtSec : "rgba(255,255,255,0.8)", fontFamily: "var(--font-body)" }}>{label}</p>
      <p className="text-3xl font-bold" style={{ color: light ? color : "#fff", fontFamily: "var(--font-heading)" }}>{value}</p>
      <p className="text-xs" style={{ color: light ? C.txtMut : "rgba(255,255,255,0.7)", fontFamily: "var(--font-body)" }}>{caption}</p>
    </div>
  );
}

function InsightBox({ items, title = "Góc nhìn điều hành" }: { items: { text: string; type: "positive" | "warning" | "neutral" }[]; title?: string }) {
  return (
    <div
      className="rounded-3xl p-5 border-l-4"
      style={{ background: C.cardAlt, borderColor: C.blue, borderLeft: `4px solid ${C.blue}`, boxShadow: "0 12px 30px rgba(45,63,120,0.08)" }}
    >
      <p className="text-sm font-bold mb-3" style={{ color: C.txt, fontFamily: "var(--font-heading)" }}>{title}</p>
      <ul className="flex flex-col gap-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm" style={{ color: C.txtSec, fontFamily: "var(--font-body)" }}>
            <span className="mt-1 w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.type === "positive" ? C.green : item.type === "warning" ? C.pink : C.blue }} />
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-lg font-semibold mb-4" style={{ color: C.txt, fontFamily: "var(--font-heading)" }}>{children}</h2>;
}

function Badge({ above }: { above: boolean }) {
  return (
    <span className="text-xs px-2 py-1 rounded-full font-semibold" style={{
      background: above ? "#E6F9F2" : "#FEE7EF",
      color: above ? C.green : C.pink,
      fontFamily: "var(--font-body)"
    }}>
      {above ? "Vượt TB" : "Dưới TB"}
    </span>
  );
}

const CHART_TOOLTIP_STYLE = {
  contentStyle: { background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, fontSize: 12, fontFamily: "var(--font-body)" },
  itemStyle: { color: C.txt },
  labelStyle: { color: C.txtSec },
};

// ── Pages ──────────────────────────────────────────────────────────────────────
function PageOverview() {
  const goalPct = 78;
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: C.txt, fontFamily: "var(--font-heading)" }}>Tổng quan điều hành</h1>
        <p className="text-sm mt-1" style={{ color: C.txtSec, fontFamily: "var(--font-body)" }}>Theo dõi doanh thu, hiệu quả chi nhánh và tình hình vận hành toàn chuỗi VNBean.</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-5 gap-4">
        <MetricCard label="Tổng doanh thu" value="47.2 tỷ" caption="Năm 2024 • +12% YoY" color={C.blue} />
        <MetricCard label="Doanh thu TB/CN" value="754M" caption="Trung bình toàn chuỗi" color={C.cyan} />
        <MetricCard label="Chi nhánh cao nhất" value="Lê Văn Sỹ" caption="890M • Q4/2024" color={C.purple} />
        <MetricCard label="Chi nhánh thấp nhất" value="Bình Thạnh" caption="540M • Cần cải thiện" color={C.pink} />
        <MetricCard label="Hài lòng KH TB" value="4.3 / 5" caption="Toàn chuỗi 2024" color={C.green} />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-3 gap-6">
        <Card className="col-span-2">
          <SectionTitle>Xu hướng doanh thu theo quý</SectionTitle>
          <ResponsiveContainer width="100%" height={240}>
            <ComposedChart data={revenueData} margin={{ top: 0, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
              <XAxis dataKey="q" tick={{ fontSize: 11, fill: C.txtSec }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: C.txtSec }} axisLine={false} tickLine={false} />
              <Tooltip {...CHART_TOOLTIP_STYLE} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, fontFamily: "var(--font-body)" }} />
              <Area type="monotone" dataKey="noi" name="Nội thành" fill={`${C.blue}20`} stroke={C.blue} strokeWidth={2.5} dot={false} />
              <Area type="monotone" dataKey="ngoai" name="Ngoại thành" fill={`${C.pink}20`} stroke={C.pink} strokeWidth={2.5} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionTitle>Mục tiêu doanh thu</SectionTitle>
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-40 h-40">
              <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                <circle cx="60" cy="60" r="50" fill="none" stroke={C.border} strokeWidth="10" />
                <circle cx="60" cy="60" r="50" fill="none" stroke={C.blue} strokeWidth="10"
                  strokeDasharray={`${2 * Math.PI * 50 * goalPct / 100} ${2 * Math.PI * 50}`}
                  strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold" style={{ color: C.blue, fontFamily: "var(--font-heading)" }}>{goalPct}%</span>
                <span className="text-xs" style={{ color: C.txtSec, fontFamily: "var(--font-body)" }}>Đạt mục tiêu</span>
              </div>
            </div>
            <div className="w-full space-y-2 text-sm" style={{ fontFamily: "var(--font-body)" }}>
              <div className="flex justify-between"><span style={{ color: C.txtSec }}>Thực tế</span><span className="font-semibold" style={{ color: C.txt }}>47.2 tỷ</span></div>
              <div className="flex justify-between"><span style={{ color: C.txtSec }}>Mục tiêu</span><span className="font-semibold" style={{ color: C.txt }}>60 tỷ</span></div>
              <div className="flex justify-between"><span style={{ color: C.txtSec }}>Còn lại</span><span className="font-semibold" style={{ color: C.pink }}>12.8 tỷ</span></div>
            </div>
          </div>
        </Card>
      </div>

      <InsightBox title="Góc nhìn điều hành" items={[
        { text: "Nội thành tăng trưởng đều đặn 8-12% mỗi quý, duy trì đà tốt.", type: "positive" },
        { text: "Ngoại thành tăng trưởng nhưng còn cách xa tiềm năng — cần đầu tư marketing địa phương.", type: "warning" },
        { text: "Mục tiêu 2024 đạt 78%, cần thúc đẩy mạnh Q4 để về đích.", type: "neutral" },
      ]} />
    </div>
  );
}

function PageRegion() {
  const regionSummary = [
    { kv: "Nội thành", cns: 9, dtTB: 817, cpTB: 278, hlTB: 4.5 },
    { kv: "Ngoại thành", cns: 6, dtTB: 652, cpTB: 230, hlTB: 4.1 },
  ];
  const avgData = [
    { kv: "Nội thành",  dt: 817 },
    { kv: "Ngoại thành",dt: 652 },
  ];
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: C.txt, fontFamily: "var(--font-heading)" }}>Hiệu quả theo khu vực</h1>
        <p className="text-sm mt-1" style={{ color: C.txtSec, fontFamily: "var(--font-body)" }}>Đánh giá đóng góp doanh thu và hiệu quả vận hành giữa Nội thành và Ngoại thành.</p>
      </div>

      <Card>
        <SectionTitle>Doanh thu Nội thành vs Ngoại thành theo quý (tỷ đồng)</SectionTitle>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={revenueData} margin={{ top: 0, right: 8, left: -20, bottom: 0 }} barCategoryGap="35%">
            <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
            <XAxis dataKey="q" tick={{ fontSize: 11, fill: C.txtSec }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: C.txtSec }} axisLine={false} tickLine={false} />
            <Tooltip {...CHART_TOOLTIP_STYLE} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="noi" name="Nội thành" fill={C.blue} radius={[6, 6, 0, 0]} />
            <Bar dataKey="ngoai" name="Ngoại thành" fill={C.pink} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <SectionTitle>Tổng hợp theo khu vực</SectionTitle>
          <table className="w-full text-sm" style={{ fontFamily: "var(--font-body)" }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                {["Khu vực", "Số CN", "DT TB (M)", "CP TB (M)", "HL TB"].map(h => (
                  <th key={h} className="text-left py-2 pr-3 text-xs font-bold uppercase tracking-wide" style={{ color: C.txtMut }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {regionSummary.map((r, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                  <td className="py-3 pr-3 font-semibold" style={{ color: C.txt }}>{r.kv}</td>
                  <td className="py-3 pr-3" style={{ color: C.txtSec }}>{r.cns}</td>
                  <td className="py-3 pr-3 font-semibold" style={{ color: C.blue }}>{r.dtTB}</td>
                  <td className="py-3 pr-3" style={{ color: C.txtSec }}>{r.cpTB}</td>
                  <td className="py-3 pr-3" style={{ color: C.green }}>{r.hlTB}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card>
          <SectionTitle>Doanh thu trung bình theo khu vực (triệu đồng)</SectionTitle>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={avgData} layout="vertical" margin={{ top: 0, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: C.txtSec }} axisLine={false} tickLine={false} />
              <YAxis dataKey="kv" type="category" tick={{ fontSize: 12, fill: C.txt }} axisLine={false} tickLine={false} width={90} />
              <Tooltip {...CHART_TOOLTIP_STYLE} />
              <Bar dataKey="dt" name="DT TB" radius={[0, 6, 6, 0]}>
                <Cell fill={C.blue} />
                <Cell fill={C.pink} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <InsightBox title="Hàm ý chiến lược thị trường" items={[
        { text: "Nội thành vượt trội về doanh thu TB — chiến lược giữ chân khách hàng trung thành.", type: "positive" },
        { text: "Ngoại thành có dư địa tăng trưởng lớn, cần mở rộng thêm 3-4 điểm chiến lược.", type: "warning" },
        { text: "Chênh lệch chi phí giữa 2 khu vực hợp lý — hiệu quả vận hành tương đồng.", type: "positive" },
      ]} />
    </div>
  );
}

function PageBranch() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: C.txt, fontFamily: "var(--font-heading)" }}>Hiệu suất chi nhánh</h1>
        <p className="text-sm mt-1" style={{ color: C.txtSec, fontFamily: "var(--font-body)" }}>Xếp hạng doanh thu, chi phí và chất lượng vận hành theo từng chi nhánh.</p>
      </div>

      <Card>
        <SectionTitle>Xếp hạng 15 chi nhánh theo doanh thu (triệu đồng)</SectionTitle>
        <ResponsiveContainer width="100%" height={340}>
          <BarChart data={branchData} layout="vertical" margin={{ top: 0, right: 16, left: 8, bottom: 0 }} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" stroke={C.border} horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 11, fill: C.txtSec }} axisLine={false} tickLine={false} domain={[0, 1000]} />
            <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: C.txt }} axisLine={false} tickLine={false} width={120} />
            <Tooltip {...CHART_TOOLTIP_STYLE} />
            <Bar dataKey="dt" name="Doanh thu TB" radius={[0, 6, 6, 0]}>
              {branchData.map((_, i) => <Cell key={i} fill={i < 6 ? C.blue : i < 10 ? C.cyan : C.pink} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-3 gap-6">
        <Card className="col-span-2">
          <SectionTitle>Bảng hiệu suất chi nhánh</SectionTitle>
          <div className="overflow-auto">
            <table className="w-full text-sm" style={{ fontFamily: "var(--font-body)" }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                  {["Mã CN", "Khu vực", "DT TB (M)", "CP TB (M)", "HL TB", "Trạng thái"].map(h => (
                    <th key={h} className="text-left py-2 pr-4 text-xs font-bold uppercase tracking-wide" style={{ color: C.txtMut }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((r, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 pr-4 font-semibold" style={{ color: C.txt }}>{r.ma}</td>
                    <td className="py-3 pr-4 text-xs" style={{ color: C.txtSec }}>
                      <span className="px-2 py-0.5 rounded-full" style={{ background: r.kv === "Nội thành" ? `${C.blue}18` : `${C.pink}18`, color: r.kv === "Nội thành" ? C.blue : C.pink }}>{r.kv}</span>
                    </td>
                    <td className="py-3 pr-4 font-semibold" style={{ color: C.blue }}>{r.dt}</td>
                    <td className="py-3 pr-4" style={{ color: C.txtSec }}>{r.cp}</td>
                    <td className="py-3 pr-4" style={{ color: C.green }}>{r.hl}</td>
                    <td className="py-3 pr-4"><Badge above={r.status === "above"} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <InsightBox title="Phân nhóm chi nhánh" items={[
          { text: "Nhóm nên nhân rộng: LVS, NH, BV — doanh thu cao, hài lòng KH tốt.", type: "positive" },
          { text: "Nhóm cần cải thiện: HBT, LL, BTH — dưới trung bình chuỗi.", type: "warning" },
          { text: "Xem xét kế hoạch hỗ trợ vận hành cho 4 CN cuối bảng xếp hạng.", type: "neutral" },
        ]} />
      </div>
    </div>
  );
}

function PageForecast() {
  const [cost, setCost] = useState(250);
  const forecast = Math.round(120 + cost * 2.6);
  const r2 = 0.847;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: C.txt, fontFamily: "var(--font-heading)" }}>Chi phí & dự báo doanh thu</h1>
        <p className="text-sm mt-1" style={{ color: C.txtSec, fontFamily: "var(--font-body)" }}>Phân tích quan hệ giữa chi phí vận hành và doanh thu kỳ vọng.</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Card className="col-span-2">
          <SectionTitle>Scatter: Chi phí — Doanh thu (triệu đồng)</SectionTitle>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart margin={{ top: 0, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
              <XAxis dataKey="cp" name="Chi phí" unit="M" tick={{ fontSize: 11, fill: C.txtSec }} axisLine={false} tickLine={false} label={{ value: "Chi phí (M)", position: "insideBottom", offset: -4, fontSize: 11, fill: C.txtMut }} />
              <YAxis dataKey="dt" name="Doanh thu" unit="M" tick={{ fontSize: 11, fill: C.txtSec }} axisLine={false} tickLine={false} />
              <Tooltip {...CHART_TOOLTIP_STYLE} cursor={{ strokeDasharray: "3 3" }} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
              <Scatter name="Nội thành" data={scatterData.filter(d => d.kv === "Nội thành")} fill={C.blue} opacity={0.75} />
              <Scatter name="Ngoại thành" data={scatterData.filter(d => d.kv === "Ngoại thành")} fill={C.pink} opacity={0.75} />
            </ScatterChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionTitle>Dự báo doanh thu</SectionTitle>
          <div className="flex flex-col gap-5">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide block mb-2" style={{ color: C.txtSec, fontFamily: "var(--font-body)" }}>Chi phí dự kiến</label>
              <input
                type="range" min={100} max={500} value={cost} onChange={e => setCost(Number(e.target.value))}
                className="w-full accent-blue-500"
                style={{ accentColor: C.blue }}
              />
              <div className="flex justify-between text-xs mt-1" style={{ color: C.txtMut, fontFamily: "var(--font-body)" }}>
                <span>100M</span><span className="font-bold text-sm" style={{ color: C.blue }}>{cost}M</span><span>500M</span>
              </div>
            </div>

            <div className="rounded-2xl p-4 text-center" style={{ background: `${C.blue}12`, border: `1px solid ${C.blue}30` }}>
              <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: C.txtSec, fontFamily: "var(--font-body)" }}>Doanh thu dự báo</p>
              <p className="text-3xl font-bold" style={{ color: C.blue, fontFamily: "var(--font-heading)" }}>{forecast}M</p>
            </div>

            <div className="rounded-2xl p-4" style={{ background: C.cardAlt }}>
              <p className="text-xs font-semibold mb-2" style={{ color: C.txtSec, fontFamily: "var(--font-body)" }}>Mô hình hồi quy tuyến tính</p>
              <p className="text-sm font-mono" style={{ color: C.purple }}>DoanhThu = 120 + 2.6 × ChiPhí</p>
              <p className="text-xs mt-2" style={{ color: C.txtMut, fontFamily: "var(--font-body)" }}>R² = {r2} — Độ phù hợp cao</p>
            </div>
          </div>
        </Card>
      </div>

      <InsightBox title="Hàm ý kiểm soát chi phí" items={[
        { text: "Mỗi 10M tăng chi phí, doanh thu tăng ~26M — hệ số sinh lời tốt.", type: "positive" },
        { text: "Các chi nhánh chi phí trên 350M cần kiểm soát để tránh lãng phí.", type: "warning" },
        { text: "R² = 0.847 cho thấy chi phí là nhân tố quan trọng nhưng không phải duy nhất.", type: "neutral" },
      ]} />
    </div>
  );
}

function PageCustomer() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: C.txt, fontFamily: "var(--font-heading)" }}>Khách hàng & dịch vụ</h1>
        <p className="text-sm mt-1" style={{ color: C.txtSec, fontFamily: "var(--font-body)" }}>Đánh giá phân phối xếp hạng dịch vụ và mức độ hài lòng khách hàng.</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <SectionTitle>Phân phối xếp hạng dịch vụ theo khu vực</SectionTitle>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={serviceData} margin={{ top: 0, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
              <XAxis dataKey="kv" tick={{ fontSize: 12, fill: C.txt }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: C.txtSec }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip {...CHART_TOOLTIP_STYLE} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="tot" name="Tốt" stackId="a" fill={C.green} radius={[0, 0, 0, 0]} />
              <Bar dataKey="kha" name="Khá" stackId="a" fill={C.yellow} />
              <Bar dataKey="tb" name="Trung bình" stackId="a" fill={C.pink} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionTitle>Hài lòng KH trung bình — Top chi nhánh</SectionTitle>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={satisfactionData} layout="vertical" margin={{ top: 0, right: 16, left: 8, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} horizontal={false} />
              <XAxis type="number" domain={[0, 5]} tick={{ fontSize: 11, fill: C.txtSec }} axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: C.txt }} axisLine={false} tickLine={false} width={100} />
              <Tooltip {...CHART_TOOLTIP_STYLE} />
              <Bar dataKey="hl" name="Hài lòng TB" radius={[0, 6, 6, 0]}>
                {satisfactionData.map((d, i) => <Cell key={i} fill={d.hl >= 4.5 ? C.green : d.hl >= 4.0 ? C.blue : C.pink} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Card className="col-span-2">
          <SectionTitle>Tương quan: Hài lòng KH và Doanh thu</SectionTitle>
          <ResponsiveContainer width="100%" height={240}>
            <ScatterChart margin={{ top: 0, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
              <XAxis dataKey="hl" name="Hài lòng" domain={[3, 5]} tick={{ fontSize: 11, fill: C.txtSec }} axisLine={false} tickLine={false} label={{ value: "Điểm hài lòng", position: "insideBottom", offset: -4, fontSize: 11, fill: C.txtMut }} />
              <YAxis dataKey="dt" name="Doanh thu" unit="M" tick={{ fontSize: 11, fill: C.txtSec }} axisLine={false} tickLine={false} />
              <Tooltip {...CHART_TOOLTIP_STYLE} />
              <Scatter data={scatterServiceData} fill={C.purple} opacity={0.7} />
            </ScatterChart>
          </ResponsiveContainer>
        </Card>

        <InsightBox title="Rủi ro chất lượng dịch vụ" items={[
          { text: "Bình Thạnh, Âu Cơ có điểm hài lòng dưới 3.8 — nguy cơ mất khách cao.", type: "warning" },
          { text: "Tương quan HL–DT dương mạnh (r≈0.72) — đầu tư dịch vụ sinh lời.", type: "positive" },
          { text: "Nội thành duy trì chất lượng dịch vụ tốt hơn Ngoại thành.", type: "positive" },
        ]} />
      </div>
    </div>
  );
}

function PageChatbot() {
  const [messages, setMessages] = useState(chatHistory);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    if (!text.trim()) return;
    const newMsgs = [...messages, { role: "user", text }];
    setMessages(newMsgs);
    setInput("");
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: "assistant",
        text: "Cảm ơn câu hỏi của bạn. Dựa trên dữ liệu VNBean Q4/2024, tôi đang phân tích và sẽ phản hồi chi tiết ngay."
      }]);
    }, 800);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: C.txt, fontFamily: "var(--font-heading)" }}>Chatbot phân tích VNBean</h1>
        <p className="text-sm mt-1" style={{ color: C.txtSec, fontFamily: "var(--font-body)" }}>Hỏi nhanh về doanh thu, chi nhánh, khu vực, chi phí và chất lượng dịch vụ.</p>
      </div>

      <Card>
        <p className="text-sm" style={{ color: C.txtSec, fontFamily: "var(--font-body)" }}>
          Trợ lý phân tích hỗ trợ Giám đốc khai thác insight từ dữ liệu VNBean đã làm sạch. Đặt câu hỏi bằng tiếng Việt, hệ thống sẽ phân tích và phản hồi dựa trên dữ liệu thực tế.
        </p>
      </Card>

      <div className="grid grid-cols-5 gap-6">
        {/* Suggested questions */}
        <div className="col-span-2 flex flex-col gap-3">
          <p className="text-sm font-bold uppercase tracking-wide" style={{ color: C.txtMut, fontFamily: "var(--font-body)" }}>Câu hỏi gợi ý</p>
          {suggestedQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => send(q)}
              className="text-left text-sm px-4 py-3 rounded-2xl border transition-all hover:shadow-md"
              style={{
                background: C.cardAlt, borderColor: C.border, color: C.txt,
                fontFamily: "var(--font-body)", boxShadow: "0 4px 12px rgba(45,63,120,0.06)"
              }}
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat window */}
        <Card className="col-span-3 flex flex-col" style={{ minHeight: 400 }}>
          <div className="flex items-center gap-2 mb-4 pb-4" style={{ borderBottom: `1px solid ${C.border}` }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${C.blue}18` }}>
              <MessageSquare size={16} style={{ color: C.blue }} />
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: C.txt, fontFamily: "var(--font-heading)" }}>VNBean AI Assistant</p>
              <p className="text-xs" style={{ color: C.green, fontFamily: "var(--font-body)" }}>Trực tuyến</p>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-3 overflow-y-auto mb-4" style={{ maxHeight: 340 }}>
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{
                  background: m.role === "user" ? C.blue : C.border
                }}>
                  {m.role === "user" ? <User size={13} color="#fff" /> : <Bot size={13} style={{ color: C.blue }} />}
                </div>
                <div
                  className="rounded-2xl px-4 py-3 text-sm max-w-[80%]"
                  style={{
                    background: m.role === "user" ? C.blue : C.cardAlt,
                    color: m.role === "user" ? "#fff" : C.txt,
                    fontFamily: "var(--font-body)",
                    borderRadius: m.role === "user" ? "20px 6px 20px 20px" : "6px 20px 20px 20px"
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 pt-3" style={{ borderTop: `1px solid ${C.border}` }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send(input)}
              placeholder="Nhập câu hỏi phân tích..."
              className="flex-1 rounded-xl px-4 py-2.5 text-sm outline-none"
              style={{ background: C.bg2, border: `1px solid ${C.border}`, color: C.txt, fontFamily: "var(--font-body)" }}
            />
            <button
              onClick={() => send(input)}
              className="px-4 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-opacity hover:opacity-90"
              style={{ background: C.blue, color: "#fff", fontFamily: "var(--font-body)" }}
            >
              <Send size={14} /> Gửi
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ── Nav config ─────────────────────────────────────────────────────────────────
const NAV = [
  { id: "overview",  label: "Tổng quan điều hành",  icon: LayoutDashboard },
  { id: "region",    label: "Hiệu quả khu vực",      icon: MapPin },
  { id: "branch",    label: "Hiệu suất chi nhánh",   icon: Store },
  { id: "forecast",  label: "Chi phí & dự báo",       icon: TrendingUp },
  { id: "customer",  label: "Khách hàng & dịch vụ",  icon: Users },
  { id: "chatbot",   label: "Chatbot phân tích",      icon: MessageSquare },
];

// ── App shell ──────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("overview");
  const [quarter, setQuarter] = useState("Q4/2024");
  const [region, setRegion] = useState("Tất cả");

  const renderPage = () => {
    switch (page) {
      case "overview": return <PageOverview />;
      case "region":   return <PageRegion />;
      case "branch":   return <PageBranch />;
      case "forecast": return <PageForecast />;
      case "customer": return <PageCustomer />;
      case "chatbot":  return <PageChatbot />;
      default:         return <PageOverview />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: C.bg, fontFamily: "var(--font-body)" }}>
      {/* Sidebar */}
      <aside
        className="flex flex-col flex-shrink-0 overflow-y-auto"
        style={{
          width: 260, background: C.white,
          boxShadow: "4px 0 24px rgba(45,63,120,0.08)",
          borderRight: `1px solid ${C.border}`
        }}
      >
        {/* Brand */}
        <div className="px-6 pt-7 pb-5">
          <p className="text-3xl font-extrabold leading-none" style={{ color: C.blue, fontFamily: "var(--font-heading)" }}>VNBean.</p>
          <p className="text-xs mt-1 font-medium uppercase tracking-widest" style={{ color: C.txtMut }}>Executive Dashboard</p>
        </div>

        {/* Nav */}
        <nav className="px-4 flex-1">
          <p className="text-xs font-bold uppercase tracking-widest px-2 mb-3" style={{ color: C.txtMut }}>Điều hướng</p>
          <div className="flex flex-col gap-1">
            {NAV.map(item => {
              const active = page === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setPage(item.id)}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-medium text-left transition-all"
                  style={{
                    background: active ? C.blue : "transparent",
                    color: active ? "#fff" : C.txtSec,
                    fontFamily: "var(--font-body)"
                  }}
                >
                  <Icon size={16} />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Filters */}
          <p className="text-xs font-bold uppercase tracking-widest px-2 mt-7 mb-3" style={{ color: C.txtMut }}>Bộ lọc dữ liệu</p>
          <div className="flex flex-col gap-3 px-1">
            {[
              { label: "Chọn quý", value: quarter, options: ["Q1/2024","Q2/2024","Q3/2024","Q4/2024"], set: setQuarter },
              { label: "Chọn khu vực", value: region, options: ["Tất cả","Nội thành","Ngoại thành"], set: setRegion },
            ].map(f => (
              <div key={f.label}>
                <p className="text-xs mb-1.5 font-medium" style={{ color: C.txtSec }}>{f.label}</p>
                <div className="relative">
                  <select
                    value={f.value}
                    onChange={e => f.set(e.target.value)}
                    className="w-full text-sm px-3 py-2 pr-8 rounded-xl appearance-none outline-none"
                    style={{ background: C.bg2, border: `1px solid ${C.border}`, color: C.txt, fontFamily: "var(--font-body)" }}
                  >
                    {f.options.map(o => <option key={o}>{o}</option>)}
                  </select>
                  <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: C.txtMut }} />
                </div>
              </div>
            ))}
          </div>
        </nav>

        {/* Bottom card */}
        <div className="mx-4 mb-6 mt-4 rounded-2xl p-4" style={{ background: `${C.blue}10`, border: `1px solid ${C.blue}25` }}>
          <p className="text-xs font-bold" style={{ color: C.blue, fontFamily: "var(--font-heading)" }}>VNBean Insight</p>
          <p className="text-xs mt-1" style={{ color: C.txtSec, fontFamily: "var(--font-body)" }}>Dữ liệu cập nhật đến Q4/2024. 15 chi nhánh toàn quốc.</p>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header
          className="flex items-center gap-4 mx-6 mt-5 mb-1 px-5 flex-shrink-0"
          style={{
            background: C.white, borderRadius: 20, height: 60,
            border: `1px solid ${C.border}`,
            boxShadow: "0 4px 16px rgba(45,63,120,0.08)"
          }}
        >
          <div className="flex-1 flex items-center gap-2 rounded-xl px-3 py-2" style={{ background: C.bg2, border: `1px solid ${C.border}`, maxWidth: 320 }}>
            <Search size={14} style={{ color: C.txtMut }} />
            <input placeholder="Tìm kiếm chi nhánh, khu vực..." className="text-sm flex-1 outline-none bg-transparent" style={{ color: C.txt, fontFamily: "var(--font-body)" }} />
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl" style={{ background: C.bg2, border: `1px solid ${C.border}`, color: C.txtSec }}>
              <Filter size={12} />
              {quarter} · {region}
            </div>
            <button className="relative p-2 rounded-xl" style={{ background: C.bg2, border: `1px solid ${C.border}` }}>
              <Bell size={16} style={{ color: C.txtSec }} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full" style={{ background: C.pink }} />
            </button>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl" style={{ background: C.bg2, border: `1px solid ${C.border}` }}>
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: C.blue }}>GĐ</div>
              <span className="text-sm font-medium" style={{ color: C.txt, fontFamily: "var(--font-body)" }}>Giám đốc</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto px-6 py-5">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
