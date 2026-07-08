import Papa from "papaparse";

const numericColumns = ["STT", "DoanhThu", "ChiPhi", "SoNhanVien", "DienTich", "HaiLong_KH", "Quy_order"];

export async function loadVNBeanData() {
  const response = await fetch("/data/VNBean_clean_streamlit.csv");
  if (!response.ok) throw new Error("Không thể đọc file dữ liệu VNBean.");
  const csv = await response.text();
  const parsed = Papa.parse(csv, {
    header: true,
    skipEmptyLines: true,
  });

  if (parsed.errors.length) {
    throw new Error("CSV có lỗi định dạng, vui lòng kiểm tra lại file.");
  }

  return parsed.data.map((row) => {
    const normalized = { ...row };
    numericColumns.forEach((column) => {
      normalized[column] = Number(row[column]);
    });
    return normalized;
  });
}
