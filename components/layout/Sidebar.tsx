import React, { useState } from 'react';
import Link from 'next/link';

const subjects = [
  { id: 'math', name: 'Toán', icon: '📐' },
  { id: 'physics', name: 'Vật lý', icon: '⚡' },
  { id: 'chemistry', name: 'Hóa học', icon: '🧪' },
  { id: 'biology', name: 'Sinh học', icon: '🧬' },
  { id: 'english', name: 'Tiếng Anh', icon: '🇬🇧' },
  { id: 'literature', name: 'Ngữ văn', icon: '📖' },
  { id: 'history', name: 'Lịch sử', icon: '🏛️' },
  { id: 'civics', name: 'GDCD', icon: '⚖️' },
];
const grades = [ '10', '11', '12' ];
const types = [
  { id: 'chuyen-de', label: 'Chuyên đề' },
  { id: 'de-thi', label: 'Đề thi' },
  { id: 'giao-an', label: 'Giáo án' },
  { id: 'bai-giang', label: 'Bài giảng' },
  { id: 'on-tap', label: 'Ôn tập' },
];
const prices = [
  { id: 'free', label: 'Miễn phí' },
  { id: 'under-50k', label: 'Dưới 50.000₫' },
  { id: '50k-100k', label: '50.000₫ - 100.000₫' },
  { id: 'over-100k', label: 'Trên 100.000₫' },
];

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const [open, setOpen] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [showThanks, setShowThanks] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setShowThanks(true);
    setTimeout(() => setShowThanks(false), 2500);
    setEmail('');
  };

  return (
    <aside className={`fixed z-40 top-0 left-0 h-full w-80 bg-white/95 border-r border-slate-200 shadow-xl transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : '-translate-x-full'} md:static md:translate-x-0 md:w-72 md:rounded-3xl md:shadow-lg md:my-8 md:ml-4 md:bg-white/90 md:border md:border-slate-100`}
      style={{ maxWidth: 340 }}
    >
      {/* Toggle button */}
      <button
        className="absolute top-4 right-4 md:hidden p-2 rounded-full bg-slate-100 hover:bg-slate-200 shadow"
        onClick={() => { setOpen(false); if (onClose) onClose(); }}
        aria-label="Đóng sidebar"
      >
        <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      {/* Logo & Search */}
      <div className="p-6 pb-2 flex flex-col gap-4 border-b border-slate-100">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">📚 StudyPro</span>
        </div>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Tìm kiếm nhanh..."
          className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-slate-700 bg-white"
        />
      </div>
      {/* Danh mục môn học */}
      <div className="p-6 pt-4 border-b border-slate-100">
        <h3 className="font-semibold text-slate-700 mb-3">Môn học</h3>
        <div className="flex flex-wrap gap-2">
          {subjects.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.id.includes(search.toLowerCase())).map(subject => (
            <button
              key={subject.id}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${selectedSubject === subject.id ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' : 'bg-slate-100 text-slate-700 hover:bg-blue-50'}`}
              onClick={() => setSelectedSubject(subject.id === selectedSubject ? null : subject.id)}
            >
              <span>{subject.icon}</span> {subject.name}
            </button>
          ))}
        </div>
      </div>
      {/* Lọc theo lớp */}
      <div className="p-6 pt-4 border-b border-slate-100">
        <h3 className="font-semibold text-slate-700 mb-3">Lớp</h3>
        <div className="flex gap-2">
          {grades.map(grade => (
            <button
              key={grade}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${selectedGrade === grade ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' : 'bg-slate-100 text-slate-700 hover:bg-blue-50'}`}
              onClick={() => setSelectedGrade(grade === selectedGrade ? null : grade)}
            >
              Lớp {grade}
            </button>
          ))}
        </div>
      </div>
      {/* Lọc theo loại tài liệu */}
      <div className="p-6 pt-4 border-b border-slate-100">
        <h3 className="font-semibold text-slate-700 mb-3">Loại tài liệu</h3>
        <div className="flex flex-wrap gap-2">
          {types.map(type => (
            <button
              key={type.id}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${selectedType === type.id ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' : 'bg-slate-100 text-slate-700 hover:bg-blue-50'}`}
              onClick={() => setSelectedType(type.id === selectedType ? null : type.id)}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>
      {/* Lọc theo giá */}
      <div className="p-6 pt-4 border-b border-slate-100">
        <h3 className="font-semibold text-slate-700 mb-3">Giá</h3>
        <div className="flex flex-wrap gap-2">
          {prices.map(price => (
            <button
              key={price.id}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${selectedPrice === price.id ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' : 'bg-slate-100 text-slate-700 hover:bg-blue-50'}`}
              onClick={() => setSelectedPrice(price.id === selectedPrice ? null : price.id)}
            >
              {price.label}
            </button>
          ))}
        </div>
      </div>
      {/* Banner marketing nhỏ */}
      <div className="p-6 border-b border-slate-100">
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-4 flex flex-col items-center text-center shadow">
          <span className="text-2xl mb-2">🔥</span>
          <p className="font-semibold text-slate-800 mb-1">Ưu đãi đặc biệt!</p>
          <p className="text-slate-600 text-sm mb-3">Mua combo tài liệu giảm đến <span className="font-bold text-blue-600">50%</span> cho thành viên mới.</p>
          <Link href="/documents/all" className="inline-block mt-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold text-sm shadow hover:from-blue-600 hover:to-purple-600 transition-all">Xem ưu đãi</Link>
        </div>
      </div>
      {/* CTA đăng ký nhận ưu đãi */}
      <div className="p-6">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 flex flex-col items-center text-center shadow">
          <span className="text-lg mb-2">🎁</span>
          <p className="font-semibold text-slate-800 mb-1">Đăng ký nhận ưu đãi</p>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-2 w-full">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Nhập email của bạn"
              className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-slate-700 bg-white"
              required
            />
            <button
              type="submit"
              className="w-full px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold text-sm shadow hover:from-blue-600 hover:to-purple-600 transition-all"
            >
              Đăng ký ngay
            </button>
          </form>
          {showThanks && <div className="text-green-600 text-sm mt-2">Cảm ơn bạn đã đăng ký!</div>}
        </div>
      </div>
    </aside>
  );
} 