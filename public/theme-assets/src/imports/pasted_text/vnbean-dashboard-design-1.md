Thiết kế giao diện web dashboard cho dự án:

VNBean Executive Dashboard

Đây là dashboard điều hành kinh doanh cho chuỗi cà phê VNBean, dùng để theo dõi doanh thu, hiệu quả khu vực, hiệu suất chi nhánh, chi phí, dự báo, chất lượng dịch vụ và chatbot phân tích.

LƯU Ý QUAN TRỌNG:
Chỉ lấy cảm hứng từ ảnh dashboard mẫu về:
- theme màu
- font chữ
- sidebar style
- card style
- spacing
- shadow
- border radius
- cảm giác UI hiện đại

KHÔNG copy nội dung trong ảnh mẫu.
KHÔNG thay đổi cấu trúc nghiệp vụ đã chốt.
Dashboard vẫn phải gồm 6 trang chính:

1. Tổng quan điều hành
2. Hiệu quả khu vực
3. Hiệu suất chi nhánh
4. Chi phí & dự báo
5. Khách hàng & dịch vụ
6. Chatbot phân tích

Phong cách thiết kế mong muốn:
Modern Soft Productivity Dashboard
Clean Executive Dashboard
Pastel Blue / Purple / Pink Business UI
Rounded Card Dashboard
Light, elegant, modern, professional

Dashboard phải có cảm giác:
- hiện đại
- sáng
- mềm mại
- gọn gàng
- chuyên nghiệp
- nhiều khoảng trắng
- card đồng nhất
- màu pastel nhưng vẫn nổi bật
- phù hợp để chuyển sang React/Vite web app

Không dùng:
- giao diện tối
- màu neon AI
- quá nhiều emoji
- quá nhiều icon trang trí
- bố cục rối
- style mặc định Streamlit
- style quá trẻ con

==================================================
1. FRAME & LAYOUT CHUNG
==================================================

Tạo thiết kế desktop dashboard kích thước:

1440 x 1024 px

Layout tổng thể:

- Sidebar cố định bên trái
- Main content bên phải
- Header/top bar phía trên main content
- Card grid bên dưới
- Tất cả trang dùng cùng design system

Sidebar width:
260 px

Main content padding:
28–32 px

Background toàn trang:
xanh tím nhạt / lavender very light

Main container:
nền trắng xanh rất nhạt, bo góc lớn

Card:
nền trắng hoặc trắng xanh nhạt, bo góc lớn, shadow mềm

==================================================
2. COLOR PALETTE
==================================================

Dùng bảng màu lấy cảm hứng từ mẫu dashboard mới.

Background chính:
#E9ECFA

Background phụ:
#F4F6FF

Main content surface:
#F8FAFF

Sidebar background:
#FFFFFF

Card background:
#FFFFFF

Card secondary:
#F7F8FF

Primary blue:
#5D7CF4

Primary blue dark:
#425FE0

Soft blue:
#8EA2FF

Purple:
#8E55CF

Pink:
#F05A9D

Soft pink:
#F7A7C9

Text primary:
#17151F

Text secondary:
#6E7280

Text muted:
#A1A6B5

Border:
#E5E8F3

Soft shadow:
rgba(45, 63, 120, 0.12)

Success:
#4EBE91

Warning:
#F5B84B

Danger:
#F05A7A

Chart colors:
- Blue: #5D7CF4
- Pink: #F05A9D
- Purple: #8E55CF
- Cyan/Blue light: #36A3FF
- Soft gray: #E8EAF2

Màu active menu:
#5D7CF4

Không dùng màu cam/caramel/mint của theme cũ nữa.
Chuyển hoàn toàn sang theme xanh tím/pink pastel giống mẫu mới.

==================================================
3. TYPOGRAPHY
==================================================

Dùng font không chân hiện đại, mạnh và rõ như mẫu.

Heading font:
Poppins hoặc Plus Jakarta Sans

Body font:
Inter hoặc Nunito Sans

Ưu tiên:
- Heading: Poppins
- Body: Inter

Fallback:
Arial, sans-serif

Quy tắc typography:

Dashboard title:
Poppins ExtraBold, 34–40 px

Page title:
Poppins Bold, 30–34 px

Section title:
Poppins SemiBold, 20–24 px

Card title:
Poppins SemiBold, 16–18 px

Metric value:
Poppins Bold, 28–36 px

Body:
Inter Regular/Medium, 14–16 px

Caption:
Inter Regular, 12–13 px

Sidebar brand:
Poppins ExtraBold, 32–36 px

Sidebar group title:
Inter Bold, 12–13 px, uppercase, letter spacing nhẹ

Tất cả tiếng Việt phải có dấu đầy đủ.

==================================================
4. SIDEBAR STYLE
==================================================

Thiết kế sidebar giống tinh thần mẫu:

- Sidebar nền trắng
- Bo góc lớn ở container nếu phù hợp
- Có shadow rất nhẹ
- Brand/title lớn ở trên
- Menu item dạng pill bo góc
- Active item nền xanh #5D7CF4, chữ trắng
- Inactive item chữ đen/xám
- Icon nếu có phải là line icon tối giản
- Không dùng quá nhiều icon
- Không dùng emoji
- Sidebar sạch, rộng rãi, dễ nhìn

Sidebar content:

Brand:
VNBean.

Subtitle nhỏ:
Executive Dashboard

Nhóm:
ĐIỀU HƯỚNG

Menu:
- Tổng quan điều hành
- Hiệu quả khu vực
- Hiệu suất chi nhánh
- Chi phí & dự báo
- Khách hàng & dịch vụ
- Chatbot phân tích

Nhóm:
BỘ LỌC DỮ LIỆU

Filter:
- Chọn quý
- Chọn khu vực
- Chọn chi nhánh

Nếu cần thêm một card nhỏ dưới sidebar, tạo dạng “VNBean Insight” hoặc “Dashboard Pro” nhưng không quá màu mè.

==================================================
5. TOP BAR STYLE
==================================================

Mỗi trang có top bar giống mẫu:

- Search/input placeholder ở bên trái hoặc giữa
- Bộ chọn ngôn ngữ/nhãn dữ liệu nhỏ nếu cần
- Avatar hoặc user icon nhỏ bên phải nếu phù hợp
- Notification icon có thể có nhưng rất tối giản

Lưu ý:
Top bar chỉ là thành phần visual, không cần quá nhiều chức năng.
Không làm rối dashboard.

Top bar style:
- background: #FFFFFF
- border-radius: 18–22 px
- padding: 12–18 px
- shadow nhẹ
- height khoảng 56–64 px

==================================================
6. CARD DESIGN SYSTEM
==================================================

Tất cả card phải đồng nhất.

Card chung:
- Background: #FFFFFF
- Border radius: 20–24 px
- Padding: 20–24 px
- Border: 1px solid #E5E8F3
- Shadow: 0 12px 30px rgba(45, 63, 120, 0.10)
- Margin giữa card: 20–24 px

Metric card:
- Bo góc 20–24 px
- Dùng màu nền pastel nổi bật
- Label nhỏ
- Value lớn
- Caption nhỏ
- Có thể có icon nhỏ tối giản nhưng không bắt buộc

Metric card colors:
1. Revenue: #5D7CF4
2. Average revenue: #36A3FF
3. Best branch: #8E55CF
4. Warning/lowest branch: #F05A9D
5. Satisfaction: #4EBE91

Metric text:
- Nếu nền đậm: chữ trắng
- Nếu nền nhạt: chữ #17151F

Chart card:
- Card trắng
- Title rõ
- Tabs nhỏ nếu cần: Ngày / Tuần / Tháng / Năm, nhưng chỉ làm visual
- Chart placeholder gọn
- Legend nhỏ

Insight card:
- Background: #F7F8FF
- Border-left hoặc top accent màu #5D7CF4
- Border radius: 18–22 px
- Title: “Góc nhìn điều hành”
- Nội dung 2–3 bullet ngắn
- Không quá dài dòng

Positive insight:
Accent #4EBE91

Warning insight:
Accent #F05A9D

==================================================
7. CHART STYLE
==================================================

Trong Figma chỉ cần chart placeholder đẹp, không cần dữ liệu thật.

Chart style giống mẫu:
- Bar chart bo góc
- Line chart mềm
- Donut/progress chart nếu phù hợp
- Grid line rất nhạt
- Legend nhỏ
- Màu xanh, tím, hồng đồng bộ
- Không dùng màu đỏ/xanh lá gắt

Color mapping cho dashboard:

Khu_vuc:
- Nội thành: #5D7CF4
- Ngoại thành: #F05A9D

XepHang_DV:
- Tốt: #4EBE91
- Khá: #F5B84B
- Trung bình: #F05A9D

Trạng thái:
- Vượt trung bình: #5D7CF4 hoặc #4EBE91
- Dưới trung bình: #F05A9D

Chart background:
transparent hoặc #FFFFFF

==================================================
8. COMPONENTS CẦN TẠO
==================================================

Tạo component rõ ràng trong Figma:

- App shell
- Sidebar
- Sidebar nav item active
- Sidebar nav item inactive
- Top bar
- Search bar
- Filter select
- Metric card
- Chart card
- Insight box
- Table card
- Badge
- Button primary
- Button secondary
- Chat bubble user
- Chat bubble assistant
- Chat input
- Page header
- Section title

Đặt tên component rõ ràng để dễ chuyển sang React.

==================================================
9. CÁC TRANG CẦN THIẾT KẾ
==================================================

Thiết kế 6 frame desktop.
Tất cả trang dùng chung sidebar, top bar, theme.

--------------------------------------------------
PAGE 1: TỔNG QUAN ĐIỀU HÀNH
--------------------------------------------------

Mục tiêu:
Giám đốc nhìn nhanh sức khỏe kinh doanh toàn chuỗi.

Header:
Tổng quan điều hành

Subtitle:
Theo dõi doanh thu, hiệu quả chi nhánh và tình hình vận hành toàn chuỗi VNBean.

Layout:

Hàng KPI gồm 5 card:
1. Tổng doanh thu
2. Doanh thu TB/chi nhánh
3. Chi nhánh cao nhất kỳ mới nhất
4. Chi nhánh thấp nhất kỳ mới nhất
5. Hài lòng KH trung bình

Bên dưới:
- Card lớn bên trái: Line/bar chart “Xu hướng doanh thu theo quý”
- Card bên phải: Progress/donut hoặc Insight card “Mục tiêu doanh thu”
- Insight box: “Góc nhìn điều hành”

Có thể lấy tinh thần giống mẫu:
biểu đồ chính bên trái, progress hoặc summary bên phải.

--------------------------------------------------
PAGE 2: HIỆU QUẢ KHU VỰC
--------------------------------------------------

Header:
Hiệu quả theo khu vực

Subtitle:
Đánh giá đóng góp doanh thu và hiệu quả vận hành giữa Nội thành và Ngoại thành.

Layout:

Card lớn:
Line/bar chart “Doanh thu Nội thành vs Ngoại thành theo quý”

Bên dưới 2 cột:
- Bảng tổng hợp khu vực
- Bar chart “Doanh thu trung bình theo khu vực”

Insight box:
“Hàm ý chiến lược thị trường”

--------------------------------------------------
PAGE 3: HIỆU SUẤT CHI NHÁNH
--------------------------------------------------

Header:
Hiệu suất chi nhánh

Subtitle:
Xếp hạng doanh thu, chi phí và chất lượng vận hành theo từng chi nhánh.

Layout:

Card lớn:
Horizontal bar chart “Xếp hạng 15 chi nhánh theo doanh thu”

Bên dưới:
- Table card:
  MaNhanh, Khu vực, Doanh thu TB, Chi phí TB, Hài lòng TB, Trạng thái
- Insight card:
  Nhóm nên nhân rộng / nhóm cần cải thiện

Dùng badge:
- Vượt trung bình
- Dưới trung bình

--------------------------------------------------
PAGE 4: CHI PHÍ & DỰ BÁO
--------------------------------------------------

Header:
Chi phí & dự báo doanh thu

Subtitle:
Phân tích quan hệ giữa chi phí vận hành và doanh thu kỳ vọng.

Layout:

Hai cột:

Cột trái lớn:
Scatter plot “Chi phí - Doanh thu”
Màu theo khu vực
Có regression line placeholder

Cột phải:
Forecast card:
- Input/slider “Chi phí dự kiến”
- Kết quả “Doanh thu dự báo”
- Công thức nhỏ:
  DoanhThu = β0 + β1 × ChiPhi
- R² placeholder

Bên dưới:
Insight box:
“Hàm ý kiểm soát chi phí”

--------------------------------------------------
PAGE 5: KHÁCH HÀNG & DỊCH VỤ
--------------------------------------------------

Header:
Khách hàng & dịch vụ

Subtitle:
Đánh giá phân phối xếp hạng dịch vụ và mức độ hài lòng khách hàng.

Layout:

Hai card ngang:
- Stacked bar “Phân phối xếp hạng dịch vụ theo khu vực”
- Bar chart “Hài lòng KH trung bình”

Bên dưới:
- Scatter chart “Hài lòng KH và Doanh thu”
- Insight card:
  Rủi ro chất lượng dịch vụ

Màu:
Tốt xanh
Khá vàng
Trung bình hồng

--------------------------------------------------
PAGE 6: CHATBOT PHÂN TÍCH
--------------------------------------------------

Header:
Chatbot phân tích VNBean

Subtitle:
Hỏi nhanh về doanh thu, chi nhánh, khu vực, chi phí và chất lượng dịch vụ.

Layout:

Card giới thiệu:
“Trợ lý phân tích hỗ trợ Giám đốc khai thác insight từ dữ liệu VNBean đã làm sạch.”

Bên dưới:
Hai cột:

Cột trái:
Suggested questions:
- Tóm tắt 3 insight quan trọng nhất
- Chi nhánh nào có doanh thu cao nhất?
- Khu vực nào hiệu quả hơn?
- Dự báo doanh thu khi chi phí là 80 triệu?
- Có rủi ro nào về chất lượng dịch vụ không?

Cột phải:
Chat window:
- Bubble user
- Bubble assistant
- Input box
- Button “Gửi câu hỏi”

Style chatbot:
- Không dùng icon robot lớn
- Không dùng emoji
- Bubble user màu xanh #5D7CF4, chữ trắng
- Bubble assistant màu #F7F8FF, chữ đen
- Giao diện giống business assistant, không giống AI demo

==================================================
10. DESIGN QUALITY REQUIREMENTS
==================================================

Thiết kế cuối cùng phải đạt:

- Nhìn hiện đại như dashboard SaaS
- Màu xanh/tím/hồng pastel giống mẫu
- Font mạnh và đẹp hơn Streamlit mặc định
- Sidebar chuyên nghiệp
- Active menu nổi bật
- Card đồng nhất
- Shadow mềm
- Border radius lớn
- Nhiều khoảng trắng
- Chart card gọn
- Insight card rõ
- Tiếng Việt có dấu đầy đủ
- Không rối
- Không quá nhiều icon
- Không có cảm giác AI/generic
- Dễ chuyển sang React/Vite