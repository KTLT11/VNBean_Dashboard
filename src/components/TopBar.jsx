import { Search } from "lucide-react";

export default function TopBar({ rowCount, filteredCount, latestQuarter }) {
  return (
    <div className="topbar">
      <div className="search-box">
        <Search size={18} />
        <span>Tìm insight theo doanh thu, khu vực, chi nhánh</span>
      </div>
      <div className="topbar-meta">
        <span>{filteredCount}/{rowCount} quan sát</span>
        <strong>Kỳ mới nhất: {latestQuarter || "Đang tải"}</strong>
      </div>
    </div>
  );
}
