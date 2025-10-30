import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Ứng Dụng Của Tôi
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Trang Chủ
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Giới Thiệu
            </Link>
            <Link
              href="/blog"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Liên Hệ
            </Link>
            <Link
              href="/counter"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Đếm Số
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Bảng Điều Khiển
            </Link>
            <Link
              href="/login"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Đăng Nhập
            </Link>
            <Link
              href="/register"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Đăng Ký
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
