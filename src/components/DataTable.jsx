export default function DataTable({ columns, rows, layout = "default", rowLabelKey, rowLabelHeader = "" }) {
  if (layout === "vertical") {
    return (
      <div className="table-wrap table-wrap--vertical">
        <table>
          <thead>
            <tr>
              <th>{rowLabelHeader}</th>
              {rows.map((row, index) => (
                <th key={row.id || row.MaNhanh || row.Khu_vuc || index}>{row[rowLabelKey]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {columns.map((column) => (
              <tr key={column.key}>
                <th>{column.label}</th>
                {rows.map((row, index) => (
                  <td key={`${column.key}-${row.id || row.MaNhanh || row.Khu_vuc || index}`}>
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id || row.MaNhanh || row.Khu_vuc || index}>
              {columns.map((column) => (
                <td key={column.key}>{column.render ? column.render(row) : row[column.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
