# VNBean Executive Dashboard

Dashboard điều hành cho chuỗi cà phê VNBean, xây bằng React/Vite và đọc dữ liệu đã làm sạch từ `public/data/VNBean_clean_streamlit.csv`.

## Cài dependencies

```bash
npm install
```

## Chạy local

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Deploy Vercel

- Đưa `VNBean_clean_streamlit.csv` vào `public/data/`.
- Thêm environment variable `GROQ_API_KEY` nếu dùng chatbot phân tích.
- API chatbot nằm tại `api/chat.js` và không gọi Groq trực tiếp từ frontend.

## Lưu ý dữ liệu

- Dashboard dùng dữ liệu đã làm sạch, không sửa CSV trong app.
- App chỉ đọc CSV, tạo bảng tổng hợp, tính KPI, OLS và insight từ dữ liệu hiện có.
- Quý mới nhất được xác định bằng `Quy_order` lớn nhất, không lấy theo dòng cuối CSV.
- Nếu không có `GROQ_API_KEY`, các trang dashboard vẫn hoạt động; chatbot sẽ báo thiếu key.
