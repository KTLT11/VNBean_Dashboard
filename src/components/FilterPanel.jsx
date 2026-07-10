import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

function FilterGroup({ label, values, selectedValues, onToggle, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const selectedCount = selectedValues.length;

  return (
    <section className="filter-group">
      <button type="button" className="filter-group__toggle" onClick={() => setOpen((current) => !current)}>
        <div className="filter-group__summary">
          <span>{label}</span>
          <small>{selectedCount === 0 ? "Tất cả" : `${selectedCount} đã chọn`}</small>
        </div>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {open ? (
        <div className="filter-group__body">
          <div className="filter-group__header">
            <button
              type="button"
              className={selectedValues.length === 0 ? "selected" : ""}
              onClick={() => onToggle(null)}
            >
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
        </div>
      ) : null}
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
        defaultOpen
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
