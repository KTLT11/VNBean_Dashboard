function FilterGroup({ label, values, selectedValues, onToggle }) {
  return (
    <section className="filter-group">
      <div className="filter-group__header">
        <span>{label}</span>
        <button type="button" className={selectedValues.length === 0 ? "selected" : ""} onClick={() => onToggle(null)}>
          Tất cả
        </button>
      </div>
      <div className="filter-group__options">
        {values.map((value) => {
          const selected = selectedValues.includes(value);
          return (
            <button
              key={value}
              type="button"
              className={selected ? "selected" : ""}
              onClick={() => onToggle(value)}
            >
              {value}
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default function FilterPanel({ filters, options, onChange }) {
  const toggleSelection = (key, value) => {
    if (value === null) {
      onChange({ ...filters, [key]: [] });
      return;
    }

    const currentValues = filters[key];
    const nextValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];

    onChange({ ...filters, [key]: nextValues });
  };

  return (
    <div className="filter-panel">
      <FilterGroup
        label="Chọn quý"
        values={options.quarters}
        selectedValues={filters.quarters}
        onToggle={(value) => toggleSelection("quarters", value)}
      />
      <FilterGroup
        label="Chọn khu vực"
        values={options.areas}
        selectedValues={filters.areas}
        onToggle={(value) => toggleSelection("areas", value)}
      />
      <FilterGroup
        label="Chọn chi nhánh"
        values={options.branches}
        selectedValues={filters.branches}
        onToggle={(value) => toggleSelection("branches", value)}
      />
    </div>
  );
}
