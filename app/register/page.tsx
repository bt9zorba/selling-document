'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: '',
    agreeToTerms: false
  });

  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      // Xử lý đăng ký
      console.log('Đăng ký:', formData);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 flex items-center justify-center py-12">
      <div className="max-w-md w-full mx-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <span className="text-white font-bold text-xl">📚</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                StudyPro
              </h1>
              <p className="text-sm text-slate-500">Thư viện giáo dục</p>
            </div>
          </Link>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              {step === 1 ? 'Tạo tài khoản' : 'Hoàn tất đăng ký'}
            </h2>
            <p className="text-slate-600">
              {step === 1 
                ? 'Đăng ký để truy cập kho tài liệu giáo dục chất lượng cao'
                : 'Vui lòng cung cấp thêm thông tin để hoàn tất đăng ký'
              }
            </p>
          </div>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">Bước {step}/2</span>
              <span className="text-sm text-slate-500">{step === 1 ? '50%' : '100%'}</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: step === 1 ? '50%' : '100%' }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nhập họ và tên đầy đủ"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="example@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0123456789"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Mật khẩu *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                      placeholder="Tối thiểu 8 ký tự"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Xác nhận mật khẩu *
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                      placeholder="Nhập lại mật khẩu"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showConfirmPassword ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                    required
                  />
                  <label htmlFor="agreeToTerms" className="text-sm text-slate-600">
                    Tôi đồng ý với{' '}
                    <Link href="/terms" className="text-blue-600 hover:text-blue-700 font-medium">
                      Điều khoản sử dụng
                    </Link>{' '}
                    và{' '}
                    <Link href="/privacy" className="text-blue-600 hover:text-blue-700 font-medium">
                      Chính sách bảo mật
                    </Link>
                  </label>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Bạn là *
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Chọn vai trò</option>
                    <option value="teacher">Giáo viên</option>
                    <option value="student">Học sinh</option>
                    <option value="parent">Phụ huynh</option>
                    <option value="tutor">Gia sư</option>
                    <option value="other">Khác</option>
                  </select>
                </div>

                <div className="bg-blue-50 rounded-2xl p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">🎁 Quà tặng đăng ký</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• 3 tài liệu miễn phí trị giá 150.000₫</li>
                    <li>• Giảm 20% cho lần mua đầu tiên</li>
                    <li>• Hỗ trợ tư vấn miễn phí 24/7</li>
                    <li>• Nhận thông báo tài liệu mới</li>
                  </ul>
                </div>
              </>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 text-lg font-semibold rounded-2xl hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all"
            >
              {step === 1 ? 'Tiếp tục' : 'Hoàn tất đăng ký'}
            </Button>

            {step === 1 && (
              <div className="text-center">
                <span className="text-slate-600">Hoặc</span>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-3">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-2 border-red-500 text-red-600 py-3 font-semibold rounded-2xl hover:bg-red-50 transition-all"
                >
                  <span className="mr-2">📧</span>
                  Đăng ký bằng Gmail
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-2 border-blue-500 text-blue-600 py-3 font-semibold rounded-2xl hover:bg-blue-50 transition-all"
                >
                  <span className="mr-2">📱</span>
                  Đăng ký bằng Facebook
                </Button>
              </div>
            )}
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-600">
              Đã có tài khoản?{' '}
              <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-white rounded-2xl p-4 shadow-lg">
            <span className="text-2xl mb-2 block">📚</span>
            <h3 className="font-semibold text-slate-900 mb-1">Tài liệu chất lượng</h3>
            <p className="text-sm text-slate-600">Hàng nghìn tài liệu giáo dục chất lượng cao</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-lg">
            <span className="text-2xl mb-2 block">⚡</span>
            <h3 className="font-semibold text-slate-900 mb-1">Tải ngay</h3>
            <p className="text-sm text-slate-600">Nhận tài liệu ngay sau khi thanh toán</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-lg">
            <span className="text-2xl mb-2 block">🛡️</span>
            <h3 className="font-semibold text-slate-900 mb-1">Bảo hành 100%</h3>
            <p className="text-sm text-slate-600">Hoàn tiền nếu không hài lòng</p>
          </div>
        </div>
      </div>
    </div>
  );
} 