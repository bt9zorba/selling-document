'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState<{ show: boolean, message: string, type: 'success' | 'error' } | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  // Tự động focus vào ô email khi vào trang
  useEffect(() => {
    if (emailRef.current) emailRef.current.focus();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    // Validate
    if (!formData.email.includes('@')) {
      setError('Email không hợp lệ.');
      setIsLoading(false);
      setToast({ show: true, message: 'Email không hợp lệ.', type: 'error' });
      setTimeout(() => setToast(null), 2000);
      return;
    }
    if (formData.password.length < 6) {
      setError('Mật khẩu phải từ 6 ký tự.');
      setIsLoading(false);
      setToast({ show: true, message: 'Mật khẩu phải từ 6 ký tự.', type: 'error' });
      setTimeout(() => setToast(null), 2000);
      return;
    }
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccessModal(true);
      setToast({ show: true, message: 'Đăng nhập thành công!', type: 'success' });
      setTimeout(() => setToast(null), 2000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Banner giới thiệu */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-12 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Đăng nhập để trải nghiệm đầy đủ</h1>
        <p className="text-lg mb-6">Tải thử miễn phí, nhận ưu đãi đặc biệt, lưu tài liệu yêu thích</p>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <span className="bg-white/20 px-3 py-1 rounded-full">📄 Tải thử miễn phí</span>
          <span className="bg-white/20 px-3 py-1 rounded-full">🎁 Ưu đãi đặc biệt</span>
          <span className="bg-white/20 px-3 py-1 rounded-full">❤️ Lưu tài liệu yêu thích</span>
        </div>
      </section>

      <div className="max-w-md w-full space-y-8">
        {/* Logo and Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Đăng nhập
          </h2>
          <p className="text-gray-600">
            Chào mừng bạn quay trở lại! Vui lòng đăng nhập để tiếp tục.
          </p>
        </div>

        {/* Login Form */}
        <Card className="p-10 rounded-3xl shadow-2xl border-0">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-base font-semibold text-slate-700 mb-2">Email</label>
              <input
                ref={emailRef}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-5 py-4 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                placeholder="Nhập email của bạn"
                required
                autoComplete="username"
              />
            </div>
            
            <div>
              <label className="block text-base font-semibold text-slate-700 mb-2">Mật khẩu</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-14 text-lg"
                  placeholder="Nhập mật khẩu"
                  required
                  minLength={6}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
                >
                  {showPassword ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-slate-600">Ghi nhớ đăng nhập</span>
              </label>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-500">Quên mật khẩu?</a>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-slate-600">Nhận thông báo ưu đãi và tài liệu mới</span>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 px-6 rounded-2xl font-bold text-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Đang đăng nhập...
                </div>
              ) : (
                'Đăng nhập'
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Hoặc</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-3">
              <button
                type="button"
                className="w-full flex justify-center items-center px-4 py-3 border border-gray-300 rounded-2xl shadow bg-white text-base font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => signIn('google')}
              >
                <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Đăng nhập với Google
              </button>
              <button
                type="button"
                className="w-full flex justify-center items-center px-4 py-3 border border-gray-300 rounded-2xl shadow bg-white text-base font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => signIn('facebook')}
              >
                <svg className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
                Đăng nhập với Facebook
              </button>
              <button
                type="button"
                className="w-full flex justify-center items-center px-4 py-3 border border-gray-300 rounded-2xl shadow bg-white text-base font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => signIn('apple')}
              >
                <svg className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16.365 1.43c0 1.14-.93 2.07-2.07 2.07-1.14 0-2.07-.93-2.07-2.07 0-1.14.93-2.07 2.07-2.07 1.14 0 2.07.93 2.07 2.07zm4.7 4.7c-.13-.13-.34-.13-.47 0-.13.13-.13.34 0 .47.13.13.34.13.47 0 .13-.13.13-.34 0-.47zm-2.07 1.4c-1.14 0-2.07.93-2.07 2.07 0 1.14.93 2.07 2.07 2.07 1.14 0 2.07-.93 2.07-2.07 0-1.14-.93-2.07-2.07-2.07zm-4.7 1.4c-.13-.13-.34-.13-.47 0-.13.13-.13.34 0 .47.13.13.34.13.47 0 .13-.13.13-.34 0-.47zm2.07 1.4c-1.14 0-2.07.93-2.07 2.07 0 1.14.93 2.07 2.07 2.07 1.14 0 2.07-.93 2.07-2.07 0-1.14-.93-2.07-2.07-2.07z"/>
                </svg>
                Đăng nhập với Apple
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Chưa có tài khoản?{' '}
                <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
                  Đăng ký ngay
                </Link>
              </p>
            </div>
          </form>
        </Card>

        {/* Section lợi ích đăng nhập */}
        <section className="py-12 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8 text-slate-900">Tại sao nên đăng nhập?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📄</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Tải thử miễn phí</h3>
                <p className="text-slate-600">Trải nghiệm chất lượng tài liệu trước khi mua</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎁</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Ưu đãi đặc biệt</h3>
                <p className="text-slate-600">Giảm giá và khuyến mãi dành riêng cho thành viên</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">❤️</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Lưu tài liệu yêu thích</h3>
                <p className="text-slate-600">Tạo bộ sưu tập cá nhân, dễ dàng tìm lại</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Links */}
        <div className="text-center space-y-2">
          <p className="text-xs text-gray-500">
            Bằng việc đăng nhập, bạn đồng ý với{' '}
            <Link href="/terms" className="text-blue-600 hover:text-blue-500">
              Điều khoản sử dụng
            </Link>{' '}
            và{' '}
            <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
              Chính sách bảo mật
            </Link>
          </p>
        </div>
      </div>

      {/* Toast notification */}
      {toast?.show && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-8 py-4 rounded-xl shadow-lg animate-bounce text-white ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
          <span className="text-xl mr-2">{toast.type === 'success' ? '✓' : '⚠️'}</span> {toast.message}
        </div>
      )}

      {/* Popup đăng nhập thành công */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-2">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative animate-fade-in-up">
            <button className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100" onClick={() => setShowSuccessModal(false)}>
              <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
            <div className="flex flex-col items-center text-center">
              <span className="text-4xl mb-3">🎉</span>
              <h3 className="font-bold text-2xl mb-2 text-slate-900">Đăng nhập thành công!</h3>
              <p className="text-slate-700 mb-4">Chào mừng bạn quay trở lại. Bạn có muốn xem tài liệu mới nhất không?</p>
              <div className="flex gap-2 w-full flex-col sm:flex-row">
                <button className="flex-1 bg-blue-500 text-white px-4 py-3 rounded-xl font-bold text-lg">Xem tài liệu mới</button>
                <button className="flex-1 bg-slate-200 text-slate-700 px-4 py-3 rounded-xl font-bold text-lg">Đóng</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 