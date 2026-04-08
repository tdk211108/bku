# 🤝 Hướng Dẫn Contribute

Cảm ơn bạn quan tâm đến project BKU Admission System! Dưới đây là các bước để contribute.

## 📋 Các Quy Tắc

1. **Tôn trọng** tất cả các contributor
2. **Kiểm tra** trước khi submit PR
3. **Commit message** rõ ràng và chi tiết
4. **Code style** tuân theo project

## 🐛 Báo Cáo Lỗi (Bug Report)

### Khi Phát Hiện Lỗi
1. Kiểm tra xem **issue có tồn tại chưa**
2. Nếu chưa, click **"New Issue"**
3. Mô tả chi tiết:
   - **Title**: Ngắn gọn, rõ ràng
   - **Description**: Lỗi là gì, khi nào xảy ra
   - **Steps**: Cách tái tạo lỗi
   - **Expected**: Kết quả kỳ vọng
   - **Actual**: Kết quả thực tế
   - **Environment**: Browser, OS, version

### Ví Dụ
```
Title: LocalStorage không lưu từ Safari

Description:
Khi dùng Safari, ấn nút Reset rồi refresh trang, 
dữ liệu học bạ không được lưu lại.

Steps:
1. Mở trên Safari
2. Nhập học bạ
3. Nhấn "Xóa Dữ Liệu"
4. Refresh trang (Cmd+R)

Expected: Dữ liệu HB được giữ lại

Actual: Toàn bộ dữ liệu bị xóa

Environment: Safari 15, macOS 12
```

## 💡 Đề Xuất Tính Năng (Feature Request)

1. Click **"New Issue"** → **"Feature request"**
2. Mô tả tính năng:
   - **Tên**: Tính năng là gì
   - **Mô tả**: Nó giải quyết vấn đề gì
   - **Mệnh giá**: Tại sao cần nó
   - **Mẫu**: Nó sẽ trông/hoạt động như thế nào

### Ví Dụ
```
Title: Thêm tính năng Export kết quả PDF

Description:
Người dùng muốn lưu kết quả dưới dạng PDF 
để gửi tới đại học hoặc từ chối.

Mệnh giá:
- Lưu kết quả trước khi xóa
- Chia sẻ dễ dàng
- Có chứng chỉ

Mẫu:
Thêm nút "📥 Xuất PDF" ở thanh cuối cùng
```

## 🔧 Pull Request (Code Contribution)

### Setup Ban Đầu

```bash
# 1. Fork repo
Trên GitHub: Click "Fork"

# 2. Clone fork của bạn
git clone https://github.com/your-username/bku-admission.git
cd bku-admission

# 3. Thêm upstream
git remote add upstream https://github.com/original-owner/bku-admission.git

# 4. Tạo branch
git checkout -b fix/your-fix-name
```

### Cách Viết Code

**Naming Convention**
```javascript
// ✅ Tốt
const calculateTotalScore = () => {}
let userIELTSScore = 0;
const MAX_SCORE = 100;

// ❌ Tệ
const calc = () => {}
let x = 0;
const MAX = 100;
```

**Comments**
```javascript
// ✅ Tốt
// Calculate weighted score for method 1
const score1 = (nl * 0.7) + (tn * 0.2) + (hb * 0.1);

// ❌ Tệ
// score1
const score1 = (nl * 0.7) + (tn * 0.2) + (hb * 0.1);
```

**Style**
- Đối với HTML: Dòng tối đa 100 ký tự
- CSS: Use variables, snippets
- JavaScript: Arrow functions, modern syntax

### Commit & Push

```bash
# 1. Add changes
git add .

# 2. Commit (message rõ ràng)
git commit -m "Fix: Correct IELTS conversion for scores >= 8"
git commit -m "Feat: Add PDF export functionality"
git commit -m "Docs: Update README with new features"

# 3. Fetch bản mới nhất
git fetch upstream

# 4. Rebase nếu cần
git rebase upstream/main

# 5. Push
git push origin your-branch-name
```

### Mẫu Commit Message

```
[Type]: Brief description

Optional longer explanation if needed.

Types:
- Feat: New feature
- Fix: Bug fix
- Docs: Documentation change
- Style: Code style/formatting
- Refactor: Code refactoring
- Test: Test addition/modification
- Chore: Build/dependency changes
```

### Tạo Pull Request

1. Vào GitHub → **"Compare & pull request"**
2. Điền thông tin:
   - **Title**: Mô tả PR
   - **Description**: Vấn đề được giải quyết, thay đổi quan trọng
   - **Related Issue**: Link issue #123
3. Chờ review từ maintainer

### Mẫu PR Description

```markdown
## 📝 Mô Tả
Sửa lỗi LocalStorage không lưu khi ấn reset.

## 🔗 Liên Quan
Fix #42

## 🧪 Cách Test
1. Nhập dữ liệu
2. Nhấn "Xóa Dữ Liệu"
3. Refresh trang
4. Xác minh HB còn lại

## ✅ Checklist
- [x] Code tôi tuân theo style của project
- [x] Tôi đã test thay đổi của mình
- [x] Tôi đã cập nhật README nếu cần
- [x] Không có breaking changes
```

## 📚 Cấu Trúc Project

```
bku-admission/
├── index.html           # Trang chính (HTML)
├── static/
│   ├── style.css       # Stylesheet (CSS)
│   └── script.js       # JavaScript logic
├── README.md           # Tài liệu chính
├── DEPLOYMENT.md       # Deploy guide
├── CONTRIBUTING.md     # File này
├── package.json        # Project metadata
├── .gitignore          # Git ignore rules
└── .replit             # Replit config
```

## 🎨 Code Style

### HTML
```html
<!-- ✅ Tốt -->
<div class="form-group">
    <label for="score">Điểm</label>
    <input type="number" id="score" min="0" max="100">
</div>

<!-- ❌ Tệ -->
<div class=form-group>
  <label>điểm</label>
  <input type=number>
</div>
```

### CSS
```css
/* ✅ Tốt */
.button {
    background: var(--primary-color);
    padding: 12px 24px;
    transition: all 0.3s ease;
}

.button:hover {
    background: var(--primary-dark);
    transform: translateY(-2px);
}

/* ❌ Tệ */
.button { background: #0066cc; padding: 12px 24px; }
.button:hover { background: #003d82; }
```

### JavaScript
```javascript
// ✅ Tốt
const calculateScore = (nl, tn, hb) => {
    return (nl * 0.7) + (tn * 0.2) + (hb * 0.1);
};

// ❌ Tệ
function calculateScore(nl,tn,hb){
return nl*0.7+tn*0.2+hb*0.1;}
```

## 🧪 Testing

Trước khi submit PR, test trên:
- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

```bash
# Test cục bộ
python3 -m http.server 8000
# Mở http://localhost:8000
```

## 📖 Tài Liệu

Khi thêm tính năng:
1. Cập nhật **README.md** nếu liên quan
2. Thêm **comments** trong code
3. Update **DEPLOYMENT.md** nếu cần

## 🚀 Releasing

Chỉ maintainer mới release:
1. Update version trong `package.json`
2. Tạo git tag: `git tag v1.0.1`
3. Push: `git push origin v1.0.1`
4. Tạo Release notes trên GitHub

## ✨ Code Review Guidelines

Khi review code, chúng ta sẽ check:
- ✅ Code quality
- ✅ Browser compatibility
- ✅ Performance
- ✅ Documentation
- ✅ Tests

**Lưu ý**: Review mất vài ngày, hãy kiên nhẫn!

## 🎓 Tài Liệu Học Tập

- [MDN Web Docs](https://developer.mozilla.org/)
- [JavaScript Info](https://javascript.info/)
- [CSS Tricks](https://css-tricks.com/)
- [BKU Official](https://www.hcmut.edu.vn/)

## 📞 Liên Hệ

- **Email**: admissions@hcmut.edu.vn
- **GitHub Issues**: [Tạo issue](https://github.com/yourusername/bku-admission/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/bku-admission/discussions)

---

**Cảm ơn bạn đã đóng góp! Hãy làm project này tuyệt vời! 🌟**
