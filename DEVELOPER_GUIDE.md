# TÀI LIỆU HƯỚNG DẪN DÀNH CHO LẬP TRÌNH VIÊN (DEVELOPER GUIDE)

Tài liệu này lưu trữ lại toàn bộ quá trình tinh chỉnh, các tính năng đặc biệt và các lưu ý quan trọng về hệ thống để tiện cho việc bảo trì, nâng cấp website **Nha Khoa Tâm Smile** sau này.

## 1. Xử lý Cache (Bộ nhớ đệm) của Cloudflare
Cloudflare lưu cache rất mạnh. Để đảm bảo khách hàng luôn thấy giao diện và tính năng mới nhất mỗi khi chúng ta cập nhật code, hệ thống HTML đã được thiết lập thêm tham số phiên bản ?v=... vào sau tên file.
- **Ví dụ:** <link rel="stylesheet" href="styles.css?v=1785836271">
- **Lưu ý khi sửa code:** Nếu bạn chỉnh sửa styles.css hoặc script.js mà trên web thực tế chưa đổi, hãy đổi số =... trong các file .html thành một số mới để ép Cloudflare tải lại file.

## 2. Ảnh Thu Nhỏ Khi Chia Sẻ Link (Open Graph / SEO)
Khi gửi link website qua Zalo, Facebook, một hình ảnh banner và tiêu đề sẽ được hiển thị.
- **Code liên quan:** Nằm ở phần <head> của index.html (các thẻ <meta property="og:...">).
- **File hình ảnh:** ssets/images/og_banner.jpg.
- **⚠️ Cảnh báo quan trọng:** Trên Cloudflare, **TUYỆT ĐỐI KHÔNG BẬT "Bot Fight Mode"**. Nếu bật tính năng này, tường lửa của Cloudflare sẽ chặn các con bot của Zalo/Facebook, khiến link chia sẻ bị mất hình thu nhỏ. Nếu ảnh bị kẹt cache của Zalo/Facebook, hãy thêm một đoạn ngẫu nhiên vào sau link (vd: 
hakhoatamsmile.com/?zalo1) để ép chúng quét lại.

## 3. Tính năng Thanh Trượt Before & After (So sánh ảnh)
Đây là tính năng tương tác (Interactive Slider) cho phép khách hàng kéo trượt để xem sự khác biệt trước/sau khi làm răng.
- **Vị trí HTML:** Nằm trong index.html (phần <section id="results"...>).
- **CSS:** Cuối file styles.css (tìm cụm /* ========== BEFORE & AFTER SLIDER ========== */). Dùng thuộc tính clip-path để tạo hiệu ứng cắt ảnh. Tỉ lệ khung hình (aspect-ratio) được set cứng là 16/9.
- **JavaScript:** Cuối file script.js. Logic bắt sự kiện kéo thanh trượt (input) để thay đổi độ rộng của lớp ảnh đè.
- **Hình ảnh:** Gồm 4 tấm ảnh đã được AI xử lý đồng bộ tuyệt đối về góc chụp để khi trượt không bị lệch khung miệng:
  - a_tartar_before_new.jpg & a_tartar_after_new.jpg (Ca Cạo vôi răng)
  - a_veneer_before_new.jpg & a_veneer_after_new.jpg (Ca Tẩy trắng / Răng sứ)

## 4. Hiệu ứng Loading Trang
- Trạng thái hiện tại: **Đã tắt hoàn toàn** trên toàn bộ website để ưu tiên tốc độ tải trang tối đa.
- Nếu muốn bật lại: Cần phục hồi thẻ <div id="pageLoader"> trong HTML và khôi phục lại logic window.addEventListener('load') trong file script.js đã bị xóa trước đó.

## 5. Modal Đặt Lịch (Booking Popup)
- Form đặt lịch được cấu hình thông qua **FormSubmit**. Logic đóng/mở form được xử lý bằng JS thuần trong script.js.
- Cần chú ý không để các biến JS (như modal) bị 
ull ở các trang con, tránh gây lỗi chặn thực thi script. Mọi thao tác DOM đều phải được bọc trong lệnh kiểm tra if(element).