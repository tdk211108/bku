# 🎓 BKU Admission System

Hệ thống xét tuyển công bằng cho Đại học Bách Khoa TP.HCM. Giúp học sinh tính toán điểm xét tuyển theo các phương thức khác nhau với giao diện hiện đại.

![BKU Logo](https://img.shields.io/badge/BKU%20TP.HCM-Education-blue?style=flat-square&logo=education)
![Version](https://img.shields.io/badge/version-1.0.0-brightgreen?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)

## ✨ Tính Năng

- 📊 **2 Phương Thức Xét Tuyển**
  - **Phương thức 1**: ĐGNL/SAT + Điểm TN THPT + Học bạ
  - **Phương thức 3**: TN THPT × 0.75 + Điểm TN THPT + Học bạ

- 🎯 **Tính Năng Chính**
  - Hỗ trợ ĐGNL Riêng và SAT
  - Nhận chứng chỉ IELTS (tự động quy đổi)
  - Nhập học bạ 3 năm (lớp 10, 11, 12)
  - Hiển thị kết quả 2 phương thức song song
  - **Lưu dữ liệu tự động** (Học bạ + IELTS được giữ lại khi refresh)
  - Nút **Xóa dữ liệu** (không xóa HB và IELTS)

- 🎨 **Giao Diện**
  - Theme chính thức BKU (Xanh đậm #003d82, Xanh nhạt #0066cc)
  - Responsive design - tích hợp 1 trang (không kéo lên xuống)
  - Animation mượt mà 
  - Thanh điểm cuối cùng hiển dụng phía dưới

- 💾 **LocalStorage**
  - Lưu tự động: Học bạ + IELTS
  - Dữ liệu được giữ ngay cả khi F5

## 🚀 Cách Sử Dụng

### Cục Bộ
1. Clone repository:
   ```bash
   git clone https://github.com/yourusername/bku-admission.git
   cd bku-admission
   ```

2. Mở `index.html` bằng trình duyệt
   - Double-click file
   - Hoặc dùng Live Server extension trong VS Code

### Trên Replit
1. Tạo project mới trên [Replit](https://replit.com)
2. Chọn **Python** hoặc **HTML/CSS/JS**
3. Clone GitHub repo hoặc upload files
4. Click **Run** để chạy

## 📋 Cấu Trúc Project

```
bku-admission/
├── index.html          # Trang chính
├── static/
│   ├── style.css      # Style + Animation
│   └── script.js      # Logic tính toán + LocalStorage
├── README.md          # Tài liệu này
└── .gitignore         # Ignore files
```

## 🔢 Công Thức Tính

### Phương Thức 1: ĐGNL/SAT + TN THPT + Học Bạ
```
Điểm Xét Tuyển = (Điểm NL × 0.7) + (Điểm TN THPT × 0.2) + (Điểm HB × 0.1)
```

**Điểm Năng Lực:**
- ĐGNL: `(Toán×2 + TV + TA + TDKH) / 15`
- SAT: Tra bảng chuyển đổi (1600→100, 1200→65, ...)

**Điểm TN THPT:**
```
(Toán×2 + Lý + Anh) / 40 × 100
```

**Điểm Học Bạ:**
```
((Toán×2 + Lý + Anh) / 4) × 10
```

### Phương Thức 3: TN THPT × 0.75 + TN THPT + Học Bạ
```
Điểm Xét Tuyển = (Điểm TN THPT × 0.75 × 0.7) + (Điểm TN THPT × 0.2) + (Điểm HB × 0.1)
```

### Quy Đổi IELTS
| IELTS | Điểm |
|-------|------|
| 6.0   | 8    |
| 6.5   | 8.5  |
| 7.0   | 9    |
| 7.5   | 9.5  |
| ≥ 8.0 | 10   |

## 🎨 Theme & Màu Sắc

- **Primary Dark**: `#003d82` (Xanh BKU đậm)
- **Primary Light**: `#0066cc` (Xanh BKU nhạt)
- **Accent**: `#00a4e8` (Xanh sáng)
- **Success**: `#28a745` (Xanh lá)

## 🛠 Công Nghệ

- **HTML5** - Cấu trúc
- **CSS3** - Style + Animation (Flexbox, Grid, Keyframes)
- **JavaScript Vanilla** - Logic + LocalStorage
- **No Framework** - Lightweight, fast

## 📱 Responsive

- ✅ Desktop (1400px+)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (< 768px)

Giao diện **tự động thích ứng** không cần kéo lên xuống trên mọi thiết bị.

## 🔒 LocalStorage

### Lưu Tự Động
```javascript
tb_toan_10, tb_toan_11, tb_toan_12  // Toán
tb_ly_10, tb_ly_11, tb_ly_12        // Lý
tb_anh_10, tb_anh_11, tb_anh_12      // Anh
ielts                                 // Điểm IELTS
ielts_option                          // Yes/No
```

### Xóa Dữ Liệu
- Nút **🗑️ Xóa Dữ Liệu** xóa toàn bộ nhập liệu nhưng **GIỮ**:
  - Học bạ (TB)
  - IELTS
  
Những dữ liệu này sẽ còn lại để dễ tính lại.

## 🐛 Known Issues
- Không có issue hiện tại

## 📝 Cải Tiến Trong Tương Lai
- ✅ Thêm hiệp định xét tuyển
- ✅ Export kết quả (PDF)
- ✅ Lịch sử lưu nhiều lần
- ✅ Châm ngôn ngữ

## 📄 License

MIT License - được phép sử dụng, sửa đổi và phân phối

## 👥 Tác Giả

- **Developer**: dK
- **Version**: 1.0
- **Last Update**: 2026

## 📞 Liên Hệ

- BKU: https://www.hcmut.edu.vn/
- Email: admissions@hcmut.edu.vn

---

**⭐ Nếu thích project này, vui lòng Stars và Fork!**

**💡 Có đề xuất cải tiến? Hãy tạo Issue hoặc Pull Request!**
