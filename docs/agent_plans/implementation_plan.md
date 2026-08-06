# Triển khai tính năng Thanh trượt Trước/Sau (Before & After Slider)

Tính năng này sẽ giúp khách hàng trực quan thấy được sự khác biệt tuyệt vời của hàm răng trước và sau khi làm dịch vụ tại Tâm Smile, từ đó tăng độ uy tín lên gấp nhiều lần.

## Vị trí đặt trên Web
Em dự định sẽ đặt phần **"Kết Quả Khách Hàng Thực Tế"** này ngay **sau phần Đội ngũ Bác sĩ** và **trước phần Đánh giá khách hàng (Testimonials)** ở trang chủ. Flow đọc của khách sẽ rất mượt: Xem Bác sĩ giỏi -> Xem kết quả thực tế -> Đọc review khen ngợi -> Chốt đặt lịch.

## User Review Required

> [!IMPORTANT]
> **Xử lý hình ảnh anh gửi:**
> 2 tấm ảnh anh gửi hiện đang bị ghép chung (nửa trên là Before, nửa dưới là After) trong cùng 1 tấm. Để làm thanh kéo trượt từ trái sang phải, em sẽ dùng code để **tự động cắt đôi** 2 tấm ảnh này ra (thành 4 tấm riêng biệt) và ghép vào hệ thống thanh trượt. Anh không cần phải tự cắt đâu ạ.
> 
> Tuy nhiên, vì ảnh anh gửi có góc chụp Trước và Sau hơi lệch nhau một xíu (không khớp 100% vị trí môi), nên khi kéo trượt ngang nó sẽ hơi "giật" nhẹ ở phần môi, nhưng phần Răng thì vẫn thấy rõ sự thay đổi trắng sáng. Anh xem như vậy có ổn không nhé!

## Open Questions

> [!NOTE]
> 1. Em làm 2 thanh trượt đặt cạnh nhau (trái/phải) trên giao diện máy tính nhé?
> 2. Anh có muốn em giữ lại chữ "Before" / "After" màu vàng như trong ảnh gốc, hay là em cắt bỏ chữ đó đi và dùng nút bấm giao diện Web đè lên cho nó sang trọng hơn? (Em đề xuất là nên che chữ cũ đi để dùng chữ của Web cho đồng bộ thiết kế).

## Proposed Changes

### 1. Xử lý ảnh (Backend)
Sử dụng script để cắt 2 ảnh `media_1785942045550.jpg` và `media_1785942046896.jpg` thành:
- `before_1.jpg` & `after_1.jpg` (Ca Cạo vôi răng)
- `before_2.jpg` & `after_2.jpg` (Ca Tẩy trắng/Bọc sứ)

### 2. Giao diện (Frontend)
- Cập nhật `styles.css` thêm hiệu ứng thanh kéo trượt (slider handle).
- Thêm script logic vào `script.js` để bắt sự kiện khi người dùng nắm chuột/ngón tay kéo thanh trượt sang 2 bên.
- Chèn khối HTML vào `index.html`.

## Verification Plan

### Manual Verification
- Em sẽ chạy Local Server và quay màn hình / chụp ảnh gửi anh xem hiệu ứng kéo trượt mượt mà.
- Anh duyệt OK em mới push lên Cloudflare.
