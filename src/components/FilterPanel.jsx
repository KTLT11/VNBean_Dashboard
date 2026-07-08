export default function FilterPanel({ filters, options, onChange }) {
  const update = (key, value) => onChange({ ...filters, [key]: value });

  return (
    <div className="filter-panel">
      <label>
        <span>Chọn quý</span>
        <select value={filters.quarter} onChange={(event) => update("quarter", event.target.value)}>
          <option value="all">Tất cả quý</option>
          {options.quarters.map((quarter) => (
            <option key={quarter} value={quarter}>{quarter}</option>
          ))}
        </select>
      </label>
      <label>
        <span>Chọn khu vực</span>
        <select value={filters.area} onChange={(event) => update("area", event.target.value)}>
          <option value="all">Tất cả khu vực</option>
          {options.areas.map((area) => (
            <option key={area} value={area}>{area}</option>
          ))}
        </select>
      </label>
      <label>
        <span>Chọn chi nhánh</span>
        <select value={filters.branch} onChange={(event) => update("branch", event.target.value)}>
          <option value="all">Tất cả chi nhánh</option>
          {options.branches.map((branch) => (
            <option key={branch} value={branch}>{branch}</option>
          ))}
        </select>
      </label>
    </div>
  );
}
