import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/3 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">📚</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  StudyPro
                </h3>
                <p className="text-slate-300 text-sm">Thư viện giáo dục chất lượng cao</p>
              </div>
            </div>
            <p className="text-slate-300 mb-8 leading-relaxed max-w-md">
              Chúng tôi cung cấp hơn 1,290 tài liệu giáo dục chất lượng cao cho giáo viên và học sinh. 
              Tài liệu được chọn lọc kỹ lưỡng, cập nhật theo chương trình mới nhất.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
              >
                <span className="text-lg">📘</span>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
              >
                <span className="text-lg">📱</span>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
              >
                <span className="text-lg">💬</span>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
              >
                <span className="text-lg">📧</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Liên kết nhanh
            </h4>
            <ul className="space-y-4">
              <li>
                <Link 
                  href="/" 
                  className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link 
                  href="/documents" 
                  className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                  Tài liệu
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center group"
                >
                  <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Thông tin liên hệ
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">📍</span>
                </div>
                <div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    123 Đường ABC, Quận XYZ<br />
                    TP. Hồ Chí Minh, Việt Nam
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">📞</span>
                </div>
                <div>
                  <p className="text-slate-300 text-sm">
                    +84 123 456 789
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">📧</span>
                </div>
                <div>
                  <p className="text-slate-300 text-sm">
                    info@tailieuchuan.com
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-sm">
              © 2024 StudyPro. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex space-x-6">
              <Link 
                href="/privacy" 
                className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
              >
                Chính sách bảo mật
              </Link>
              <Link 
                href="/terms" 
                className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
              >
                Điều khoản sử dụng
              </Link>
              <Link 
                href="/sitemap" 
                className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 