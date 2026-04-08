# 🚀 Hướng Dẫn Deploy

## Cách 1: Chạy Cục Bộ

### Yêu Cầu
- Trình duyệt web (Chrome, Firefox, Safari, Edge, ...)
- Không cần cài đặt gì thêm

### Các Bước
1. **Clone Project**
   ```bash
   git clone https://github.com/yourusername/bku-admission.git
   cd bku-admission
   ```

2. **Mở File HTML**
   - Cách 1: Double-click `index.html`
   - Cách 2: Drag thả `index.html` vào trình duyệt
   - Cách 3: Dùng Live Server (VS Code)
     - Cài đặt extension "Live Server"
     - Right-click `index.html` → "Open with Live Server"

3. **Sử Dụng**
   - Nhập dữ liệu vào form
   - Kết quả tính toán sẽ hiển thị tự động
   - Dữ liệu được lưu tự động (HB + IELTS)

## Cách 2: Deploy Lên Replit

### Bước 1: Tạo Project Trên Replit
1. Truy cập [replit.com](https://replit.com)
2. Click **"Create Repl"**
3. Chọn loại project:
   - **Option A**: Static HTML/CSS/JS
   - **Option B**: Python with HTTP Server

### Bước 2: Upload Code
**Cách A: Clone từ GitHub**
```bash
# Copy URL repo GitHub của bạn
git clone https://github.com/yourusername/bku-admission.git
```

**Cách B: Upload Files**
1. Tạo files theo cấu trúc:
   ```
   index.html
   static/
   ├── style.css
   └── script.js
   ```
2. Copy-paste nội dung từ file cục bộ

### Bước 3: Chạy
- Nếu chọn Static HTML: Click **"Run"**
- Nếu chọn Python: Code sẽ tự động serve trên `http://localhost:8000`

### Bước 4: Public URL
- Replit sẽ tạo URL public dạng: `https://bku-admission.yourusername.repl.co`
- Share URL này với bạn bè

---

## Cách 3: Deploy Lên GitHub Pages (Miễn Phí)

### Yêu Cầu
- Có GitHub Account
- Project đã được push lên GitHub

### Các Bước

1. **Thêm index.html Vào Root**
   - Đảm bảo `index.html` ở thư mục gốc

2. **Vào Repository Settings**
   - Trang GitHub repo → **Settings** tab
   - Cuộn xuống phần **"GitHub Pages"**

3. **Kích Hoạt GitHub Pages**
   - Source: Chọn branch **main** hoặc **master**
   - Folder: Chọn **/ (root)**
   - Click **Save**

4. **Lấy URL**
   - GitHub sẽ tạo URL: `https://yourusername.github.io/bku-admission`
   - Chờ vài phút để build
   - Verify status ở phần "Deployments"

### URL Tĩnh
- GitHub Pages phục vụ file tĩnh (HTML, CSS, JS)
- LocalStorage **hoạt động bình thường**
- Không cần server backend

---

## Cách 4: Deploy Lên Netlify (Miễn Phí)

### Các Bước
1. Truy cập [netlify.com](https://netlify.com)
2. Kéo thả thư mục project vào
3. Nhận URL public ngay lập tức

---

## Troubleshooting

### Lỗi: "Không tìm thấy file style.css hoặc script.js"
- ✅ Kiểm tra file tồn tại trong thư mục `static/`
- ✅ Các file phải nằm đúng vị trí cấu trúc
- ✅ Đặt tên file đúng chính tảng (case-sensitive trên Linux)

### LocalStorage Không Lưu
- ✅ Bật JavaScript trong browser
- ✅ Kiểm tra Browser Console (F12) xem có lỗi không
- ✅ Xóa cache browser (Ctrl+Shift+Delete)

### Không Tính Được Điểm
- ✅ Nhập dữ liệu dầy đủ vào **cả 2 phần**
- ✅ Kiểm tra giá trị nhập không vượt quá giới hạn
- ✅ Check Browser Console xem có error không

---

## Tạo GitHub Repository

```bash
# Tạo folder và khởi tạo git
mkdir bku-admission
cd bku-admission
git init

# Link đến remote repo (sau khi tạo trên GitHub)
git remote add origin https://github.com/yourusername/bku-admission.git

# Add files
git add .

# Commit
git commit -m "Initial commit: BKU Admission System v1.0"

# Push
git branch -M main
git push -u origin main
```

---

## Tips Thêm

- 📱 Project responsive, chạy tốt trên mobile
- 🔒 Dữ liệu lưu cục bộ (localStorage), không upload lên server
- ⚡ Fast load (< 2s)
- 🎨 Theme BKU chính thức
- 🌐 Hoạt động offline (sau lần load đầu tiên)

---

**Cần giúp đỡ? Tạo GitHub Issue hoặc liên hệ!** 📧
