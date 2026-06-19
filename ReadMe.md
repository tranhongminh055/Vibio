
# VIBIO — Trang xem phim trực tuyến
Status: In Progress

## Tên dự án & Mục đích
Trang web VIBIO cung cấp trải nghiệm xem phim trực tuyến: phát video (HLS), quản lý danh mục và hồ sơ người dùng, xác thực với mật khẩu được mã hóa.

## Tech Stack
- Frontend: `ReactJS`, `Vite`
- Backend: `Node.js`, `Express`
- Database: `MySQL` (có hỗ trợ tùy chọn Microsoft SQL Server)
- Bảo mật: `bcryptjs` cho hashing mật khẩu

## Các tính năng nổi bật
- Đăng ký / Đăng nhập với mật khẩu mã hoá `bcryptjs`
- Đồng bộ/khởi tạo người dùng giữa MySQL và SQL Server (cấu hình)
- Phát video HLS (`hls.js`) và giao diện duyệt phim

## Cấu trúc chính của repo
- `vibio-app/`: frontend (Vite + React) và phần backend con tại `vibio-app/server`
- `vibio-app/server/`: API Express, scripts khởi tạo DB (`init-db.js`, `seed-db.js`)

## Getting Started — Chạy môi trường phát triển (đề xuất)
1) Cài và chạy cả frontend + backend (từ thư mục gốc dự án):
`bash
cd vibio-app
npm install
npm run dev

- `npm run dev` (tại `vibio-app`) sẽ chạy đồng thời backend (nodemon trên port 3001) và frontend (Vite/5174).

2) Chạy backend độc lập (Test Backend):
`bash
cd vibio-app/server
npm install
npm run dev    
` 

## Cấu hình môi trường ( `vibio-app/server/.env`)
Tạo file `.env` trong `vibio-app/server` với các biến sau :
`
DB_TYPE=mysql
DB_HOST=localhost
DB_USER=vibio_user
DB_PASSWORD=your_db_password
DB_NAME=vibio_db
PORT=3001
JWT_SECRET=your_jwt_secret
VNPAY_TMNCODE=your_vnpay_tmncode
VNPAY_HASHSECRET=your_vnpay_secret
`

## Khởi tạo cơ sở dữ liệu
Backend đã có script `init-db.js` để tạo các bảng chính (users, categories, movies) cho cả MySQL và SQL Server. Chạy từ `vibio-app/server`:
`bash
node init-db.js
`
(dữ liệu mẫu, chạy `node seed-db.js` )

### SQL (MySQL)
`sql
CREATE DATABASE vibio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'vibio_user'@'localhost' IDENTIFIED BY 'your_db_password';
GRANT ALL PRIVILEGES ON vibio_db.* TO 'vibio_user'@'localhost';
FLUSH PRIVILEGES;
`

## Endpoint 
- Health check: `GET /api/health` (vibio-app/server, mặc định port 3001)
- Auth: `POST /api/register`, `POST /api/login`




