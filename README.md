# Selling Document - NextJS Project

Dự án website bán tài liệu bán hàng được xây dựng bằng Next.js 14 với App Router.

## 🚀 Tính năng

- **Trang chủ**: Landing page với thông tin giới thiệu
- **Sản phẩm**: Hiển thị danh sách tài liệu bán hàng
- **Giới thiệu**: Thông tin về công ty và đội ngũ
- **Liên hệ**: Form liên hệ và thông tin công ty
- **Responsive Design**: Tương thích với mọi thiết bị
- **TypeScript**: Được viết bằng TypeScript để type-safe
- **Tailwind CSS**: Styling với Tailwind CSS

## 📁 Cấu trúc dự án

```
selling-document/
├── app/                    # App Router (Next.js 14)
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── loading.tsx        # Loading component
│   ├── error.tsx          # Error boundary
│   ├── not-found.tsx      # 404 page
│   ├── globals.css        # Global styles
│   ├── products/          # Products pages
│   ├── about/             # About pages
│   └── contact/           # Contact pages
├── components/            # React components
│   ├── ui/               # UI components (Button, Input, Card)
│   └── layout/           # Layout components (Header, Footer)
├── lib/                  # Utility functions
│   ├── utils.ts          # Helper functions
│   ├── constants.ts      # Constants
│   └── types.ts          # TypeScript types
├── hooks/                # Custom React hooks
│   ├── useLocalStorage.ts
│   └── useDebounce.ts
├── public/               # Static assets
├── styles/               # Additional styles
└── package.json          # Dependencies
```

## 🛠️ Công nghệ sử dụng

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **React** - UI library
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 🚀 Cài đặt và chạy

### Yêu cầu hệ thống
- Node.js 18+ 
- npm hoặc yarn

### Cài đặt dependencies
```bash
npm install
# hoặc
yarn install
```

### Chạy development server
```bash
npm run dev
# hoặc
yarn dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem kết quả.

### Build production
```bash
npm run build
# hoặc
yarn build
```

### Chạy production
```bash
npm start
# hoặc
yarn start
```

## 📝 Scripts

- `npm run dev` - Chạy development server
- `npm run build` - Build production
- `npm run start` - Chạy production server
- `npm run lint` - Chạy ESLint
- `npm run type-check` - Kiểm tra TypeScript

## 🎨 Components

### UI Components
- `Button` - Button component với nhiều variants
- `Input` - Input component với validation
- `Card` - Card component cho layout

### Layout Components
- `Header` - Navigation header
- `Footer` - Site footer

## 🔧 Cấu hình

### Environment Variables
Tạo file `.env.local` với các biến môi trường:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/selling_document"

# Authentication
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Email
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
```

### Tailwind CSS
Dự án sử dụng Tailwind CSS với cấu hình tùy chỉnh trong `tailwind.config.js`.

## 📱 Responsive Design

Dự án được thiết kế responsive với các breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔍 SEO

- Meta tags được cấu hình trong layout
- Open Graph tags cho social media
- Structured data cho search engines

## 🚀 Deployment

### Vercel (Recommended)
1. Push code lên GitHub
2. Connect repository với Vercel
3. Deploy tự động

### Other Platforms
- Netlify
- Railway
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork dự án
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📄 License

Dự án này được phân phối dưới MIT License. Xem `LICENSE` để biết thêm chi tiết.

## 📞 Liên hệ

- Email: info@sellingdocument.com
- Website: https://sellingdocument.com
- Phone: +84 123 456 789

## 🙏 Acknowledgments

- Next.js team cho framework tuyệt vời
- Tailwind CSS team cho utility-first CSS
- Cộng đồng React và TypeScript

## 🛠️ Lộ trình nâng cấp toàn diện (2024)

### Các tính năng sẽ triển khai để tối ưu website bán tài liệu:

#### 1. Trải nghiệm người dùng (UX/UI)
- Đăng nhập nhanh bằng Google/Apple/Facebook (Social Login)
- Giao diện tối/sáng (Dark/Light mode)
- Đề xuất tài liệu cá nhân hóa, gợi ý thông minh
- Lưu lịch sử mua hàng, xem lại đơn cũ
- Đánh giá, review, xếp hạng tài liệu chi tiết
- Popup khuyến mãi, upsell, cross-sell
- Hỗ trợ chat trực tuyến (Live chat, Chatbot AI)
- Thông báo đẩy (Push notification)

#### 2. Thanh toán & bảo mật
- Thanh toán đa dạng: thẻ, ví điện tử, QR, Apple Pay/Google Pay
- Xác thực 2 lớp (2FA)
- Mã hóa dữ liệu nhạy cảm, bảo vệ thông tin người dùng
- Hóa đơn điện tử, xuất file PDF

#### 3. Quản lý & vận hành
- Quản lý kho, tự động cập nhật số lượng
- Thống kê, báo cáo doanh thu, lượt truy cập, hành vi người dùng
- Tích hợp công cụ phân tích (Google Analytics, Facebook Pixel)
- Hệ thống quản lý phản hồi, khiếu nại
- Hệ thống affiliate, liên kết cộng tác viên

#### 4. Marketing & SEO
- Tối ưu SEO nâng cao (schema.org, sitemap tự động, robots.txt)
- Chia sẻ MXH, liên kết affiliate
- Email marketing, gửi thông báo khuyến mãi tự động
- Tối ưu tốc độ tải trang (Lazy load, CDN, nén ảnh)

> Lộ trình sẽ được triển khai tự động, ưu tiên các tính năng giúp tăng chuyển đổi, trải nghiệm và bảo mật, tham khảo chuẩn các công ty lớn như Apple, Google, Amazon, Shopee, Huawei.
# selling-document
# selling-document
