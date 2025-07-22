'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function OffersPage() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  const packages = [
    {
      id: 'basic',
      name: 'Gói Cơ bản',
      price: 299000,
      originalPrice: 500000,
      duration: '3 tháng',
      features: [
        'Truy cập 1000+ tài liệu cơ bản',
        'Tải 50 tài liệu/tháng',
        'Hỗ trợ qua email',
        'Cập nhật tài liệu mới',
        'Không có tài liệu độc quyền'
      ],
      color: 'from-blue-500 to-cyan-500',
      popular: false
    },
    {
      id: 'premium',
      name: 'Gói Cao cấp',
      price: 599000,
      originalPrice: 1200000,
      duration: '6 tháng',
      features: [
        'Truy cập 5000+ tài liệu đầy đủ',
        'Tải không giới hạn',
        'Hỗ trợ 24/7 qua chat',
        'Tài liệu độc quyền',
        'Tặng 10 tài liệu mới/tháng',
        'Ưu tiên hỗ trợ',
        'Combo giảm giá 30%'
      ],
      color: 'from-purple-500 to-pink-500',
      popular: true
    },
    {
      id: 'lifetime',
      name: 'Gói Trọn đời',
      price: 1999000,
      originalPrice: 5000000,
      duration: 'Vĩnh viễn',
      features: [
        'Truy cập tất cả tài liệu',
        'Tải không giới hạn',
        'Hỗ trợ VIP 24/7',
        'Tài liệu độc quyền',
        'Tặng tất cả tài liệu mới',
        'Ưu tiên cao nhất',
        'Giảm giá 50% cho mọi mua hàng',
        'Tư vấn chuyên môn miễn phí'
      ],
      color: 'from-orange-500 to-red-500',
      popular: false
    }
  ];

  const combos = [
    {
      id: 'combo-physics',
      name: 'Combo Vật lý Toàn diện',
      description: 'Tất cả tài liệu Vật lý từ lớp 10-12',
      price: 299000,
      originalPrice: 450000,
      savings: 'Tiết kiệm 151.000₫',
      documents: 25,
      subjects: ['VẬT LÝ'],
      levels: ['Lớp 10', 'Lớp 11', 'Lớp 12'],
      image: '⚡'
    },
    {
      id: 'combo-math',
      name: 'Combo Toán Học Đầy đủ',
      description: 'Tất cả tài liệu Toán từ lớp 10-12',
      price: 399000,
      originalPrice: 600000,
      savings: 'Tiết kiệm 201.000₫',
      documents: 30,
      subjects: ['TOÁN HỌC'],
      levels: ['Lớp 10', 'Lớp 11', 'Lớp 12'],
      image: '🔢'
    },
    {
      id: 'combo-science',
      name: 'Combo Khoa Học Tự Nhiên',
      description: 'Vật lý, Hóa học, Sinh học lớp 10-12',
      price: 799000,
      originalPrice: 1200000,
      savings: 'Tiết kiệm 401.000₫',
      documents: 75,
      subjects: ['VẬT LÝ', 'HÓA HỌC', 'SINH HỌC'],
      levels: ['Lớp 10', 'Lớp 11', 'Lớp 12'],
      image: '🧪'
    },
    {
      id: 'combo-all',
      name: 'Combo Tất cả Môn Học',
      description: 'Tất cả tài liệu từ tất cả môn học',
      price: 1499000,
      originalPrice: 2500000,
      savings: 'Tiết kiệm 1.001.000₫',
      documents: 200,
      subjects: ['Tất cả môn học'],
      levels: ['Lớp 10', 'Lớp 11', 'Lớp 12'],
      image: '📚'
    }
  ];

  const specialOffers = [
    {
      id: 'new-user',
      name: 'Ưu đãi người dùng mới',
      description: 'Giảm 50% cho lần mua đầu tiên',
      discount: '50%',
      code: 'NEW50',
      validUntil: '31/12/2024',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'teacher',
      name: 'Ưu đãi giáo viên',
      description: 'Giảm 30% cho giáo viên đang công tác',
      discount: '30%',
      code: 'TEACHER30',
      validUntil: '31/12/2024',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      id: 'student',
      name: 'Ưu đãi học sinh',
      description: 'Giảm 25% cho học sinh với thẻ học sinh',
      discount: '25%',
      code: 'STUDENT25',
      validUntil: '31/12/2024',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Ví điện tử/Điểm thưởng */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div>
            <div className="text-lg font-semibold text-slate-900 mb-2">Số dư ví: <span className="text-blue-600 font-bold">500.000₫</span></div>
            <div className="text-lg font-semibold text-slate-900">Điểm thưởng: <span className="text-purple-600 font-bold">1200</span></div>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all">Nạp tiền</button>
            <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all">Đổi điểm</button>
          </div>
        </div>
      </div>
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">🔥 Ưu đãi đặc biệt</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Tiết kiệm đến 70% với các combo và gói tài liệu chất lượng cao
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-white/20 px-4 py-2 rounded-full">🎁 Giảm giá lên đến 70%</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">⚡ Tải ngay sau khi mua</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">🛡️ Bảo hành 100%</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Special Offers */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">🎫 Mã giảm giá đặc biệt</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {specialOffers.map((offer) => (
              <div key={offer.id} className={`bg-gradient-to-r ${offer.color} text-white rounded-3xl p-6 shadow-lg`}>
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2">{offer.name}</h3>
                  <p className="text-sm opacity-90 mb-4">{offer.description}</p>
                  <div className="bg-white/20 rounded-2xl p-4 mb-4">
                    <div className="text-3xl font-bold mb-1">{offer.discount}</div>
                    <div className="text-sm opacity-90">Giảm giá</div>
                  </div>
                  <div className="bg-white/20 rounded-xl p-3 mb-4">
                    <div className="text-sm opacity-90 mb-1">Mã code:</div>
                    <div className="font-mono font-bold text-lg">{offer.code}</div>
                  </div>
                  <div className="text-xs opacity-75">
                    Có hiệu lực đến: {offer.validUntil}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Combo Packages */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">📦 Combo tài liệu tiết kiệm</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {combos.map((combo) => (
              <div key={combo.id} className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-4">{combo.image}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{combo.name}</h3>
                  <p className="text-slate-600 text-sm mb-4">{combo.description}</p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Số tài liệu:</span>
                    <span className="font-semibold text-blue-600">{combo.documents}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Môn học:</span>
                    <span className="font-semibold text-blue-600">{combo.subjects.join(', ')}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Lớp:</span>
                    <span className="font-semibold text-blue-600">{combo.levels.join(', ')}</span>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {combo.price.toLocaleString('vi-VN')} ₫
                  </div>
                  <div className="text-slate-500 line-through text-sm mb-1">
                    {combo.originalPrice.toLocaleString('vi-VN')} ₫
                  </div>
                  <div className="text-green-600 font-semibold text-sm">
                    {combo.savings}
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-2xl font-semibold hover:from-blue-600 hover:to-purple-600">
                  Mua ngay
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Subscription Packages */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">💎 Gói đăng ký</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div key={pkg.id} className={`relative bg-white rounded-3xl shadow-lg p-8 ${pkg.popular ? 'ring-2 ring-purple-500' : ''}`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                      ⭐ Phổ biến nhất
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{pkg.name}</h3>
                  <div className="text-4xl font-bold text-slate-900 mb-2">
                    {pkg.price.toLocaleString('vi-VN')} ₫
                  </div>
                  <div className="text-slate-500 line-through mb-1">
                    {pkg.originalPrice.toLocaleString('vi-VN')} ₫
                  </div>
                  <div className="text-sm text-slate-600 mb-4">
                    Thời hạn: {pkg.duration}
                  </div>
                  <div className={`bg-gradient-to-r ${pkg.color} text-white px-6 py-3 rounded-2xl font-semibold`}>
                    Tiết kiệm {(pkg.originalPrice - pkg.price).toLocaleString('vi-VN')} ₫
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {pkg.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <span className="text-green-500">✓</span>
                      <span className="text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  onClick={() => {
                    setSelectedPackage(pkg.id);
                    setShowPurchaseModal(true);
                  }}
                  className={`w-full py-4 text-lg font-semibold rounded-2xl ${
                    pkg.popular 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
                  }`}
                >
                  Chọn gói này
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">🤔 Tại sao chọn StudyPro?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Tài liệu chất lượng</h3>
              <p className="text-slate-600">Hàng nghìn tài liệu được biên soạn bởi giáo viên có kinh nghiệm</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Tải ngay lập tức</h3>
              <p className="text-slate-600">Nhận tài liệu ngay sau khi thanh toán thành công</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Bảo hành 100%</h3>
              <p className="text-slate-600">Hoàn tiền nếu tài liệu không đúng mô tả</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Hỗ trợ 24/7</h3>
              <p className="text-slate-600">Đội ngũ hỗ trợ chuyên nghiệp sẵn sàng giúp đỡ</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Sẵn sàng bắt đầu?</h2>
          <p className="text-xl mb-8 opacity-90">
            Đăng ký ngay để nhận ưu đãi đặc biệt và truy cập kho tài liệu khổng lồ
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button className="bg-white text-blue-600 px-8 py-4 text-lg font-semibold rounded-2xl hover:bg-slate-100">
                Đăng ký miễn phí
              </Button>
            </Link>
            <Link href="/documents/all">
              <Button variant="outline" className="border-2 border-white text-white px-8 py-4 text-lg font-semibold rounded-2xl hover:bg-white hover:text-blue-600">
                Xem tài liệu
              </Button>
            </Link>
          </div>
        </section>
      </div>

      {/* Purchase Modal */}
      {showPurchaseModal && selectedPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full mx-4">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Thanh toán gói</h2>
                <button onClick={() => setShowPurchaseModal(false)} className="text-slate-400 hover:text-slate-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-slate-900 mb-2">
                  {packages.find(p => p.id === selectedPackage)?.name}
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Tổng tiền:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    {packages.find(p => p.id === selectedPackage)?.price.toLocaleString('vi-VN')} ₫
                  </span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <h4 className="font-semibold text-slate-900">Chọn phương thức thanh toán:</h4>
                
                <label className="flex items-center p-4 border border-slate-200 rounded-xl cursor-pointer hover:border-blue-300">
                  <input type="radio" name="payment" value="bank" className="mr-3" defaultChecked />
                  <div>
                    <div className="font-semibold">Chuyển khoản ngân hàng</div>
                    <div className="text-sm text-slate-600">Chuyển khoản qua QR Code hoặc số tài khoản</div>
                  </div>
                </label>

                <label className="flex items-center p-4 border border-slate-200 rounded-xl cursor-pointer hover:border-blue-300">
                  <input type="radio" name="payment" value="momo" className="mr-3" />
                  <div>
                    <div className="font-semibold">Ví MoMo</div>
                    <div className="text-sm text-slate-600">Thanh toán qua ứng dụng MoMo</div>
                  </div>
                </label>

                <label className="flex items-center p-4 border border-slate-200 rounded-xl cursor-pointer hover:border-blue-300">
                  <input type="radio" name="payment" value="zalopay" className="mr-3" />
                  <div>
                    <div className="font-semibold">ZaloPay</div>
                    <div className="text-sm text-slate-600">Thanh toán qua ứng dụng ZaloPay</div>
                  </div>
                </label>
              </div>

              <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 text-lg font-semibold rounded-2xl">
                Thanh toán ngay
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 