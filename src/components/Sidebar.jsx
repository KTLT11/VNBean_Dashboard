import { navigation } from "../config/navigation";
import FilterPanel from "./FilterPanel";

export default function Sidebar({ activePage, onPageChange, filters, options, onFiltersChange }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">VN</div>
        <div>
          <strong>VNBean.</strong>
          <span>Executive Dashboard</span>
        </div>
      </div>

      <section className="sidebar-section">
        <p>Điều hướng</p>
        <nav>
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={activePage === item.id ? "active" : ""}
                onClick={() => onPageChange(item.id)}
                type="button"
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </section>

      <section className="sidebar-section">
        <p>Bộ lọc dữ liệu</p>
        <FilterPanel filters={filters} options={options} onChange={onFiltersChange} />
      </section>
    </aside>
  );
}
