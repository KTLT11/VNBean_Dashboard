import { useEffect, useMemo, useState } from "react";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import AreaPerformance from "./pages/AreaPerformance";
import BranchPerformance from "./pages/BranchPerformance";
import ChatbotPage from "./pages/ChatbotPage";
import CostForecast from "./pages/CostForecast";
import CustomerService from "./pages/CustomerService";
import Overview from "./pages/Overview";
import { loadVNBeanData } from "./utils/loadData";
import { getFilterOptions, getLatestQuarter } from "./utils/metrics";

const defaultFilters = {
  quarter: "all",
  area: "all",
  branch: "all",
};

function applyFilters(data, filters) {
  return data.filter((row) => {
    const quarterOk = filters.quarter === "all" || row.Quy === filters.quarter;
    const areaOk = filters.area === "all" || row.Khu_vuc === filters.area;
    const branchOk = filters.branch === "all" || row.MaNhanh === filters.branch;
    return quarterOk && areaOk && branchOk;
  });
}

export default function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [activePage, setActivePage] = useState("overview");
  const [filters, setFilters] = useState(defaultFilters);

  useEffect(() => {
    loadVNBeanData().then(setData).catch((err) => setError(err.message));
  }, []);

  const filteredData = useMemo(() => applyFilters(data, filters), [data, filters]);
  const visibleData = filteredData.length ? filteredData : data;
  const options = useMemo(() => getFilterOptions(data), [data]);
  const latestQuarter = useMemo(() => getLatestQuarter(data), [data]);

  const pages = {
    overview: <Overview data={visibleData} />,
    area: <AreaPerformance data={visibleData} />,
    branches: <BranchPerformance data={visibleData} />,
    cost: <CostForecast data={visibleData} />,
    customers: <CustomerService data={visibleData} />,
    chatbot: <ChatbotPage data={data} filteredData={visibleData} />,
  };

  if (error) return <main className="state-page">Không thể tải dữ liệu: {error}</main>;
  if (!data.length) return <main className="state-page">Đang tải dashboard VNBean...</main>;

  return (
    <div className="app-shell">
      <Sidebar
        activePage={activePage}
        onPageChange={setActivePage}
        filters={filters}
        options={options}
        onFiltersChange={setFilters}
      />
      <main className="main-area">
        <TopBar rowCount={data.length} filteredCount={filteredData.length} latestQuarter={latestQuarter} />
        {pages[activePage]}
      </main>
    </div>
  );
}
