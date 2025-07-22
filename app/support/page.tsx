'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState('faq');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const faqs = [
    {
      id: 1,
      question: 'Làm thế nào để mua tài liệu?',
      answer: 'Bạn có thể mua tài liệu bằng cách: 1) Chọn tài liệu muốn mua, 2) Nhấn "Mua ngay", 3) Chọn phương thức thanh toán, 4) Hoàn tất thanh toán. Bạn sẽ nhận được link tải về ngay sau khi thanh toán thành công.'
    },
    {
      id: 2,
      question: 'Tài liệu có thể tải về bao nhiêu lần?',
      answer: 'Sau khi mua, bạn có thể tải về tài liệu không giới hạn số lần trong thời hạn sở hữu. Link tải về sẽ được gửi qua email và có thể sử dụng nhiều lần.'
    },
    {
      id: 3,
      question: 'Nếu tài liệu không đúng mô tả thì sao?',
      answer: 'Chúng tôi cam kết bảo hành 100%. Nếu tài liệu không đúng mô tả hoặc có lỗi, bạn có thể yêu cầu hoàn tiền trong vòng 7 ngày kể từ ngày mua.'
    },
    {
      id: 4,
      question: 'Có thể xem trước tài liệu trước khi mua không?',
      answer: 'Có, bạn có thể xem trước một số trang đầu của tài liệu bằng cách nhấn nút "Xem trước" trên trang chi tiết tài liệu.'
    },
    {
      id: 5,
      question: 'Tài liệu có cập nhật không?',
      answer: 'Có, chúng tôi thường xuyên cập nhật tài liệu theo chương trình mới nhất của Bộ GD&ĐT. Khách hàng sẽ được thông báo khi có cập nhật.'
    },
    {
      id: 6,
      question: 'Có hỗ trợ tư vấn chuyên môn không?',
      answer: 'Có, chúng tôi có đội ngũ giáo viên chuyên môn sẵn sàng tư vấn miễn phí về cách sử dụng tài liệu và phương pháp giảng dạy.'
    }
  ];

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email',
      description: 'Gửi email cho chúng tôi',
      contact: 'support@studypro.vn',
      response: 'Phản hồi trong 24h'
    },
    {
      icon: '📱',
      title: 'Hotline',
      description: 'Gọi điện trực tiếp',
      contact: '1900 1234',
      response: 'Hỗ trợ 8h-22h'
    },
    {
      icon: '💬',
      title: 'Chat trực tuyến',
      description: 'Chat với nhân viên',
      contact: 'Bắt đầu chat',
      response: 'Phản hồi ngay lập tức'
    },
    {
      icon: '📞',
      title: 'Zalo',
      description: 'Kết nối qua Zalo',
      contact: 'StudyPro Support',
      response: 'Phản hồi trong 2h'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Gửi yêu cầu hỗ trợ:', contactForm);
    // Xử lý gửi form
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">💬 Hỗ trợ khách hàng</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7 với mọi vấn đề về tài liệu giáo dục
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-white/20 px-4 py-2 rounded-full">⚡ Phản hồi nhanh chóng</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">🛡️ Bảo hành 100%</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">💯 Hài lòng khách hàng</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-2xl p-2 shadow-lg">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('faq')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === 'faq'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ❓ Câu hỏi thường gặp
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === 'contact'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                📞 Liên hệ hỗ trợ
              </button>
              <button
                onClick={() => setActiveTab('guide')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === 'guide'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                📖 Hướng dẫn sử dụng
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">❓ Câu hỏi thường gặp</h2>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div key={faq.id} className="border border-slate-200 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                      className="w-full px-6 py-4 text-left bg-slate-50 hover:bg-slate-100 transition-colors flex justify-between items-center"
                    >
                      <span className="font-semibold text-slate-900">{faq.question}</span>
                      <span className="text-slate-500">
                        {openFaq === faq.id ? '−' : '+'}
                      </span>
                    </button>
                    {openFaq === faq.id && (
                      <div className="px-6 py-4 bg-white">
                        <p className="text-slate-700 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === 'contact' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Methods */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">📞 Liên hệ với chúng tôi</h2>
              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl">{method.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-slate-900 mb-1">{method.title}</h3>
                        <p className="text-slate-600 mb-2">{method.description}</p>
                        <div className="font-semibold text-blue-600 mb-1">{method.contact}</div>
                        <div className="text-sm text-green-600">{method.response}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">📝 Gửi yêu cầu hỗ trợ</h2>
              <div className="bg-white rounded-3xl shadow-lg p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Nhập họ và tên"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="example@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0123456789"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Chủ đề *
                    </label>
                    <select
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Chọn chủ đề</option>
                      <option value="purchase">Vấn đề mua hàng</option>
                      <option value="download">Vấn đề tải tài liệu</option>
                      <option value="quality">Chất lượng tài liệu</option>
                      <option value="refund">Yêu cầu hoàn tiền</option>
                      <option value="technical">Vấn đề kỹ thuật</option>
                      <option value="other">Khác</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Nội dung *
                    </label>
                    <textarea
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      rows={4}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Mô tả chi tiết vấn đề của bạn..."
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 text-lg font-semibold rounded-2xl hover:from-blue-600 hover:to-purple-600"
                  >
                    Gửi yêu cầu hỗ trợ
                  </Button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Guide Tab */}
        {activeTab === 'guide' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">📖 Hướng dẫn sử dụng</h2>
              
              <div className="space-y-8">
                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">1. Cách mua tài liệu</h3>
                  <div className="space-y-3 text-slate-700">
                    <p>• <strong>Bước 1:</strong> Tìm kiếm tài liệu bạn cần trong kho tài liệu</p>
                    <p>• <strong>Bước 2:</strong> Xem chi tiết và đọc mô tả tài liệu</p>
                    <p>• <strong>Bước 3:</strong> Nhấn "Mua ngay" và chọn phương thức thanh toán</p>
                    <p>• <strong>Bước 4:</strong> Hoàn tất thanh toán và nhận link tải về</p>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">2. Cách tải tài liệu</h3>
                  <div className="space-y-3 text-slate-700">
                    <p>• <strong>Bước 1:</strong> Kiểm tra email để nhận link tải về</p>
                    <p>• <strong>Bước 2:</strong> Nhấn vào link tải về trong email</p>
                    <p>• <strong>Bước 3:</strong> Chọn vị trí lưu file trên máy tính</p>
                    <p>• <strong>Bước 4:</strong> Giải nén file (nếu cần) và sử dụng</p>
                  </div>
                </div>

                <div className="border-l-4 border-purple-500 pl-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">3. Cách sử dụng tài liệu</h3>
                  <div className="space-y-3 text-slate-700">
                    <p>• <strong>Giáo viên:</strong> Sử dụng để soạn giáo án, tạo bài giảng</p>
                    <p>• <strong>Học sinh:</strong> Sử dụng để ôn tập, làm bài tập</p>
                    <p>• <strong>Phụ huynh:</strong> Sử dụng để hỗ trợ con học tập</p>
                    <p>• <strong>Lưu ý:</strong> Tài liệu có thể chỉnh sửa theo nhu cầu</p>
                  </div>
                </div>

                <div className="border-l-4 border-orange-500 pl-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">4. Chính sách bảo hành</h3>
                  <div className="space-y-3 text-slate-700">
                    <p>• <strong>Hoàn tiền 100%</strong> nếu tài liệu không đúng mô tả</p>
                    <p>• <strong>Thời gian:</strong> Trong vòng 7 ngày kể từ ngày mua</p>
                    <p>• <strong>Điều kiện:</strong> Chưa tải về hoặc chưa sử dụng</p>
                    <p>• <strong>Liên hệ:</strong> Gửi email hoặc gọi hotline để yêu cầu</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">🚀 Hành động nhanh</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/documents/all">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all text-center cursor-pointer">
                <span className="text-4xl mb-4 block">📚</span>
                <h3 className="font-bold text-lg text-slate-900 mb-2">Xem tài liệu</h3>
                <p className="text-slate-600">Khám phá kho tài liệu khổng lồ</p>
              </div>
            </Link>
            <Link href="/offers">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all text-center cursor-pointer">
                <span className="text-4xl mb-4 block">🔥</span>
                <h3 className="font-bold text-lg text-slate-900 mb-2">Ưu đãi</h3>
                <p className="text-slate-600">Xem các combo và ưu đãi đặc biệt</p>
              </div>
            </Link>
            <Link href="/register">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all text-center cursor-pointer">
                <span className="text-4xl mb-4 block">👤</span>
                <h3 className="font-bold text-lg text-slate-900 mb-2">Đăng ký</h3>
                <p className="text-slate-600">Tạo tài khoản để nhận ưu đãi</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      {/* Form yêu cầu tài liệu */}
      <div className="bg-white rounded-3xl shadow-lg p-8 mt-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
          <span className="text-green-500 text-3xl">📥</span> Yêu cầu tài liệu
        </h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Họ tên</label>
            <input type="text" className="w-full border rounded-xl px-4 py-2 mb-2" placeholder="Nhập họ tên" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" className="w-full border rounded-xl px-4 py-2 mb-2" placeholder="Nhập email" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Môn học</label>
            <input type="text" className="w-full border rounded-xl px-4 py-2 mb-2" placeholder="Ví dụ: Toán, Văn..." />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Lớp</label>
            <input type="text" className="w-full border rounded-xl px-4 py-2 mb-2" placeholder="Ví dụ: 10, 11, 12..." />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Mô tả tài liệu cần tìm</label>
            <textarea className="w-full border rounded-xl px-4 py-2 mb-2" rows={3} placeholder="Nhập mô tả chi tiết về tài liệu bạn cần..."></textarea>
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button type="submit" className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all">Gửi yêu cầu</button>
          </div>
        </form>
      </div>
      {/* Quản lý đơn hàng & lịch sử mua bán */}
      <div className="bg-white rounded-3xl shadow-lg p-8 mt-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
          <span className="text-blue-500 text-3xl">📦</span> Quản lý đơn hàng & Lịch sử mua
        </h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-blue-50">
              <th className="py-2 px-3 font-semibold">Mã đơn</th>
              <th className="py-2 px-3 font-semibold">Ngày</th>
              <th className="py-2 px-3 font-semibold">Tài liệu</th>
              <th className="py-2 px-3 font-semibold">Trạng thái</th>
              <th className="py-2 px-3 font-semibold">Tải lại</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2 px-3">#12345</td>
              <td className="py-2 px-3">12/07/2024</td>
              <td className="py-2 px-3">Toán 12 - Đề thi thử 2025</td>
              <td className="py-2 px-3 text-green-600 font-semibold">Đã thanh toán</td>
              <td className="py-2 px-3"><button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl font-semibold hover:bg-blue-200 transition-all">Tải lại</button></td>
            </tr>
            <tr>
              <td className="py-2 px-3">#12344</td>
              <td className="py-2 px-3">10/07/2024</td>
              <td className="py-2 px-3">Văn 11 - Chuyên đề nghị luận</td>
              <td className="py-2 px-3 text-green-600 font-semibold">Đã thanh toán</td>
              <td className="py-2 px-3"><button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl font-semibold hover:bg-blue-200 transition-all">Tải lại</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Hướng dẫn sử dụng dạng video/ảnh động */}
      <div className="bg-white rounded-3xl shadow-lg p-8 mt-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
          <span className="text-purple-500 text-3xl">🎬</span> Video hướng dẫn sử dụng
        </h2>
        <div className="aspect-w-16 aspect-h-9 w-full rounded-2xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.youtube.com/embed/2e-eXJ6HgkQ"
            title="Hướng dẫn sử dụng web bán tài liệu"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
    </div>
  );
} 