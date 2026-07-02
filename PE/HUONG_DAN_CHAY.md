# Hướng dẫn chạy project Restaurant Management App

## 1. Cài thư viện

```bash
npm install
```

## 2. Chạy project

```bash
npm start
```

Lệnh này chạy đồng thời:
- json-server tại `http://localhost:3001`
- Vite React app tại địa chỉ hiển thị trên terminal, thường là `http://localhost:5173`

## 3. Tài khoản đăng nhập

```text
Username: admin
Password: admin123
Role: Admin
```

## 4. Chạy test

```bash
npm test -- --watchAll=false
```

Kết quả đã kiểm tra: 7 test suites passed, 20 tests passed.

## 5. Build production

```bash
npm run build
```

Kết quả đã kiểm tra: build thành công bằng Vite.

## Nội dung đã hoàn thiện

- TODO-01: Hiển thị Alert khi login sai hoặc không phải Admin.
- TODO-02: Hiển thị fullName và role trên Navbar.
- TODO-03: Logout gọi `logoutUser()` và chuyển về `/login`.
- TODO-04: Navbar Brand dùng `about.logo`, `about.appName`, link về `/`.
- TODO-05: Trang chi tiết nhà hàng, loading, error, category badge, format giá, nút Back.
- TODO-06: Xóa nhà hàng bằng `ModalConfirm`.
- TODO-07: Cột `Price Range` trong danh sách nhà hàng.
- TODO-08: Footer lấy dữ liệu từ `about.js`.
- TODO-09: Trang chi tiết Category và danh sách nhà hàng theo category.
- TODO-10A: Thêm Category, validate tên trùng và minLength.
- TODO-10B: Xóa Category bằng `ModalConfirm`.
