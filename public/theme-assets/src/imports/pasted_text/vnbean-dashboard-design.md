Thiết kế giao diện web dashboard cho dự án:

VNBean Executive Dashboard

Đây là dashboard điều hành kinh doanh cho chuỗi cà phê VNBean, dùng để theo dõi doanh thu, hiệu quả khu vực, hiệu suất chi nhánh, chi phí, dự báo, chất lượng dịch vụ và chatbot phân tích.

Thiết kế theo phong cách:
Soft Mint Coffee Dashboard
Modern Pastel Executive Dashboard
Clean Business Dashboard

Cảm hứng giao diện:
- Nền xanh mint pastel giống mẫu tham khảo
- Sidebar màu kem/off-white
- Card màu kem/trắng ấm
- Accent màu cam caramel
- Card bo góc lớn
- Shadow mềm
- Giao diện sáng, thân thiện, hiện đại
- Có cảm giác dashboard kinh doanh chuyên nghiệp
- Không dùng style AI/neon/futuristic
- Không dùng quá nhiều icon
- Không dùng emoji
- Không dùng giao diện quá tối
- Không giống dashboard mặc định của Streamlit

==================================================
1. FRAME & LAYOUT CHUNG
==================================================

Tạo thiết kế cho desktop dashboard kích thước:

1440 x 1024 px

Layout gồm:

- Sidebar cố định bên trái
- Main content bên phải
- Header trên cùng trong main content
- Card grid bên dưới
- Dashboard có nhiều trang nhưng cùng một design system

Sidebar width:
260 px

Main content:
phần còn lại, padding 32 px

Body background:
mint pastel

Main dashboard container:
mint nhạt hơn, có bo góc nhẹ nếu phù hợp

==================================================
2. COLOR PALETTE
==================================================

Dùng bảng màu sau:

Background chính:
#9BCFBE

Background main content:
#CFE4D9

Sidebar background:
#F7F1E8

Card background:
#FFF8EE

Card secondary:
#FDF4E8

Primary accent:
#F28C00

Accent dark:
#C96F00

Coffee brown:
#5A3A24

Text primary:
#2E2A27

Text secondary:
#756A62

Muted border:
#E7D8C8

Positive green:
#78B89A

Soft mint:
#83BFA8

Warning pink:
#EE9BAA

Soft yellow:
#F5CB7A

Soft olive:
#B8B45F

Chart brown:
#8B5E34

Không dùng màu quá gắt.
Không dùng gradient tím/xanh kiểu AI.
Màu sắc phải nhất quán toàn bộ dashboard.

==================================================
3. TYPOGRAPHY
==================================================

Dùng font không chân, hiện đại, dễ đọc.

Heading font:
Space Grotesk

Body font:
Manrope

Nếu không có thì dùng fallback:
Inter hoặc Arial

Quy tắc font:

Dashboard title:
Space Grotesk Bold, 36-40 px

Page title:
Space Grotesk Bold, 30-34 px

Section title:
Space Grotesk SemiBold, 20-24 px

Card title:
Space Grotesk SemiBold, 16-18 px

Metric value:
Space Grotesk Bold, 28-34 px

Body text:
Manrope Regular/Medium, 14-16 px

Caption:
Manrope Regular, 12-13 px

Sidebar title:
Space Grotesk Bold, uppercase, letter spacing nhẹ

Tất cả chữ tiếng Việt phải có dấu đầy đủ.

==================================================
4. SIDEBAR
==================================================

Thiết kế sidebar bên trái màu kem:

Background:
#F7F1E8

Sidebar gồm:

Logo/title:
VNBEAN DASHBOARD

Subtitle nhỏ:
Báo cáo điều hành

Nhóm 1:
ĐIỀU HƯỚNG

Menu items:
- Tổng quan điều hành
- Hiệu quả khu vực
- Hiệu suất chi nhánh
- Chi phí & dự báo
- Khách hàng & dịch vụ
- Chatbot phân tích

Nhóm 2:
BỘ LỌC DỮ LIỆU

Filter elements:
- Chọn quý
- Chọn khu vực
- Chọn chi nhánh

Style menu:
- Item active nền cam #F28C00
- Item active chữ trắng
- Item inactive chữ coffee brown #5A3A24
- Hover hoặc inactive background rất nhẹ
- Border radius item: 10-14 px
- Padding rộng rãi
- Không dùng quá nhiều icon
- Nếu dùng icon thì icon rất tối giản, line icon, màu đồng bộ

Sidebar phải nhìn giống một navigation panel chuyên nghiệp, không giống default sidebar.

==================================================
5. CARD DESIGN SYSTEM
==================================================

Tạo card style dùng chung toàn dashboard.

Card chung:
- Background: #FFF8EE
- Border radius: 22-24 px
- Padding: 20-24 px
- Border: 1px solid #E7D8C8 với opacity nhẹ
- Shadow mềm: màu xanh/brown nhẹ, không quá đậm
- Khoảng cách giữa card: 20-24 px

Metric card:
- Bo góc 20-24 px
- Có label nhỏ
- Có value lớn
- Có caption nhỏ
- Không lạm dụng icon
- Có thể dùng màu nền pastel khác nhau:

Metric card 1:
#F5CB7A

Metric card 2:
#A8D8C8

Metric card 3:
#B8B45F

Metric card 4:
#EE9BAA

Metric card 5:
#FFF8EE

Chart card:
- Card nền #FFF8EE
- Có title ở trên
- Có chart placeholder ở giữa
- Có caption/insight ngắn ở dưới nếu cần

Insight box:
- Background: #FDF4E8
- Border-left: 5px solid #F28C00
- Border radius: 18 px
- Padding: 16-20 px
- Title: “Góc nhìn điều hành”
- Nội dung dạng 2-3 bullet ngắn

Positive insight:
Border-left #78B89A

Warning insight:
Border-left #EE9BAA

==================================================
6. CHART STYLE PLACEHOLDER
==================================================

Trong Figma chỉ cần vẽ placeholder chart đẹp, không cần dữ liệu thật.

Chart style:
- Line chart mềm, màu cam và mint
- Bar chart bo góc nhẹ
- Donut hoặc KPI progress nếu cần
- Grid line rất mờ
- Legend nhỏ, gọn
- Không dùng màu mặc định xanh đỏ quá gắt

Color mapping:
Nội thành:
#F28C00

Ngoại thành:
#83BFA8

Tốt:
#78B89A

Khá:
#F5CB7A

Trung bình:
#EE9BAA

Vượt trung bình:
#78B89A

Dưới trung bình:
#EE9BAA

==================================================
7. CÁC TRANG CẦN THIẾT KẾ
==================================================

Thiết kế 6 frame desktop, cùng sidebar và cùng theme.

--------------------------------------------------
PAGE 1: TỔNG QUAN ĐIỀU HÀNH
--------------------------------------------------

Mục tiêu:
Giám đốc nhìn nhanh sức khỏe kinh doanh toàn chuỗi.

Layout:

Header:
Tổng quan điều hành
Theo dõi doanh thu, hiệu quả chi nhánh và tình hình vận hành toàn chuỗi VNBean.

KPI row gồm 5 card:
1. Tổng doanh thu
2. Doanh thu TB/chi nhánh
3. Chi nhánh cao nhất kỳ mới nhất
4. Chi nhánh thấp nhất kỳ mới nhất
5. Hài lòng KH trung bình

Bên dưới:
- Card lớn bên trái: Line chart “Xu hướng doanh thu theo quý”
- Card nhỏ bên phải: “Góc nhìn điều hành”

Bên dưới nữa:
- 2 card nhỏ:
  + Tổng quan doanh thu theo quý
  + Cảnh báo dữ liệu/điểm cần chú ý

--------------------------------------------------
PAGE 2: HIỆU QUẢ KHU VỰC
--------------------------------------------------

Mục tiêu:
So sánh Nội thành và Ngoại thành.

Header:
Hiệu quả theo khu vực
Đánh giá đóng góp doanh thu và hiệu quả vận hành giữa hai khu vực.

Layout:

Card lớn full width:
Line chart “Doanh thu Nội thành vs Ngoại thành theo quý”

Bên dưới 2 cột:
- Bảng tổng hợp khu vực:
  Khu vực, Tổng doanh thu, Doanh thu TB, Chi phí TB, Hài lòng TB
- Bar chart hoặc boxplot placeholder:
  Doanh thu trung bình theo khu vực

Insight box:
“Hàm ý chiến lược thị trường”

--------------------------------------------------
PAGE 3: HIỆU SUẤT CHI NHÁNH
--------------------------------------------------

Mục tiêu:
Xếp hạng 15 chi nhánh và phát hiện chi nhánh cần cải thiện.

Header:
Hiệu suất chi nhánh
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
- Vượt trung bình: xanh
- Dưới trung bình: hồng/cảnh báo

--------------------------------------------------
PAGE 4: CHI PHÍ & DỰ BÁO
--------------------------------------------------

Mục tiêu:
Xem mối quan hệ chi phí - doanh thu và dự báo doanh thu.

Header:
Chi phí & dự báo doanh thu
Phân tích quan hệ giữa chi phí vận hành và doanh thu kỳ vọng.

Layout:

Hai cột:

Cột trái lớn:
Scatter plot “Chi phí - Doanh thu”
Màu theo khu vực
Có đường hồi quy placeholder

Cột phải:
Forecast card:
- Slider/input “Chi phí dự kiến”
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

Mục tiêu:
Theo dõi chất lượng dịch vụ và hài lòng khách hàng.

Header:
Khách hàng & dịch vụ
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

Mục tiêu:
Chatbot hỏi đáp nhanh dựa trên dữ liệu VNBean.

Header:
Chatbot phân tích VNBean
Hỏi nhanh về doanh thu, chi nhánh, khu vực, chi phí và chất lượng dịch vụ.

Layout:

Bên trên:
Card giới thiệu chatbot:
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
- Input box ở dưới
- Button “Gửi câu hỏi”

Style chatbot:
- Không dùng icon robot quá lớn
- Không dùng emoji
- Bubble user màu cam nhạt
- Bubble assistant màu kem/trắng
- Giao diện giống business assistant, không giống AI demo

==================================================
8. RESPONSIVE NOTE
==================================================

Thiết kế desktop là chính.
Nhưng layout nên có khả năng chuyển thành responsive:
- Card có thể xếp dọc trên màn hình nhỏ
- Sidebar có thể chuyển thành top menu nếu cần
- Không để card quá nhỏ

==================================================
9. COMPONENTS CẦN TẠO
==================================================

Tạo component trong Figma:

- Sidebar
- Nav item active
- Nav item inactive
- Filter select
- Metric card
- Chart card
- Insight box
- Table card
- Badge
- Button
- Chat bubble user
- Chat bubble assistant
- Chat input
- Page header
- Section title

Đặt tên component rõ ràng để lập trình viên dễ chuyển sang React.

==================================================
10. FINAL STYLE EXPECTATION
==================================================

Kết quả cuối cùng phải giống một dashboard web hiện đại, mềm mại, chuyên nghiệp:

- Nền mint pastel
- Sidebar kem
- Card kem/trắng ấm
- Accent cam caramel
- Font đẹp, không phổ thông
- Tiếng Việt có dấu đầy đủ
- Các trang đồng nhất
- Không rối
- Không giống Streamlit mặc định
- Không có cảm giác AI/generic
- Phù hợp để chuyển sang React/Vite web app