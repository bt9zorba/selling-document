'use client';
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { subjects, documents, classes, type DocumentType } from '@/lib/data';
import Head from 'next/head';
import Search from '@/components/ui/Search';
import Filter from '@/components/ui/Filter';
import { Skeleton } from '@/components/ui/LoadingSkeleton';

export default function SubjectPage({ params }: { params: { subject: string } }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFileType, setSelectedFileType] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showLoading, setShowLoading] = useState(false);

  // Tìm môn học theo slug
  const subjectName = subjects.find(s => {
    const slug = s.toLowerCase().replace(/\s+/g, '-').replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
      .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
      .replace(/[ìíịỉĩ]/g, 'i')
      .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
      .replace(/[ùúụủũưừứựửữ]/g, 'u')
      .replace(/[ỳýỵỷỹ]/g, 'y')
      .replace(/đ/g, 'd');
    return slug === params.subject;
  });
  
  // Nếu không tìm thấy môn học, hiển thị trang 404
  if (!subjectName) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Không tìm thấy môn học</h1>
          <p className="text-slate-600 mb-8">Môn học bạn đang tìm kiếm không tồn tại.</p>
          <Link href="/documents">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              Xem tất cả tài liệu
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  // Gợi ý tìm kiếm
  React.useEffect(() => {
    if (!searchQuery) setSearchSuggestions([]);
    else {
      const lower = searchQuery.toLowerCase();
      setSearchSuggestions(documents.filter(doc => doc.title.toLowerCase().includes(lower) || doc.subject.toLowerCase().includes(lower)).slice(0, 5).map(doc => doc.title));
    }
  }, [searchQuery]);

  // Lọc tài liệu nâng cao
  const subjectDocuments = useMemo(() => {
    setShowLoading(true);
    let filtered = documents.filter(doc => doc.subject === subjectName);
    // Multi-select filter
    if (selectedClasses.length > 0) {
      filtered = filtered.filter(doc => selectedClasses.includes(doc.class));
    } else if (selectedClass !== 'all') {
      filtered = filtered.filter(doc => doc.class === selectedClass);
    }
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(doc => selectedCategories.some(cat => doc.tags.includes(cat)));
    } else if (selectedCategory !== 'all') {
      filtered = filtered.filter(doc => doc.tags.includes(selectedCategory));
    }
    // Filter by price
    if (minPrice) filtered = filtered.filter(doc => doc.price >= Number(minPrice));
    if (maxPrice) filtered = filtered.filter(doc => doc.price <= Number(maxPrice));
    // Filter by rating
    if (minRating) filtered = filtered.filter(doc => doc.rating >= Number(minRating));
    // Filter by tag
    if (selectedTags.length > 0) filtered = filtered.filter(doc => doc.tags.some(tag => selectedTags.includes(tag)));
    // Tìm kiếm
    if (searchQuery) {
      const nq = searchQuery.toLowerCase();
      filtered = filtered.filter(doc => (
        doc.title.toLowerCase().includes(nq) ||
        doc.description.toLowerCase().includes(nq)
      ));
    }
    // Sắp xếp
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case 'oldest':
        filtered.sort((a, b) => a.id.localeCompare(b.id));
        break;
      case 'downloads':
        filtered.sort((a, b) => b.downloads - a.downloads);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
    }
    setTimeout(() => setShowLoading(false), 400);
    return filtered;
  }, [subjectName, searchQuery, selectedClasses, selectedCategories, selectedTags, minPrice, maxPrice, minRating, selectedClass, selectedCategory, sortBy]);

  // Tạo slug cho tiêu đề tài liệu
  const createTitleSlug = (title: string) => {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
      .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
      .replace(/[ìíịỉĩ]/g, 'i')
      .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
      .replace(/[ùúụủũưừứựửữ]/g, 'u')
      .replace(/[ỳýỵỷỹ]/g, 'y')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9-]/g, '');
  };

  // Danh mục tài liệu với icon và màu sắc
  const documentCategories = [
    { 
      id: 'all', 
      name: 'Tất cả', 
      icon: '📚',
      color: 'from-blue-500 to-purple-500',
      count: documents.filter(doc => doc.subject === subjectName).length 
    },
    { 
      id: 'de-thi', 
      name: 'Đề thi', 
      icon: '📝',
      color: 'from-red-500 to-pink-500',
      count: documents.filter(doc => doc.subject === subjectName && doc.tags.includes('đề thi')).length 
    },
    { 
      id: 'giao-an', 
      name: 'Giáo án', 
      icon: '📖',
      color: 'from-green-500 to-emerald-500',
      count: documents.filter(doc => doc.subject === subjectName && doc.tags.includes('giáo án')).length 
    },
    { 
      id: 'chuyen-de', 
      name: 'Chuyên đề', 
      icon: '📋',
      color: 'from-purple-500 to-indigo-500',
      count: documents.filter(doc => doc.subject === subjectName && doc.tags.includes('chuyên đề')).length 
    },
    { 
      id: 'bai-tap', 
      name: 'Bài tập', 
      icon: '✏️',
      color: 'from-orange-500 to-red-500',
      count: documents.filter(doc => doc.subject === subjectName && doc.tags.includes('bài tập')).length 
    },
    { 
      id: 'trac-nghiem', 
      name: 'Trắc nghiệm', 
      icon: '✅',
      color: 'from-teal-500 to-blue-500',
      count: documents.filter(doc => doc.subject === subjectName && doc.tags.includes('trắc nghiệm')).length 
    },
    { 
      id: 'on-tap', 
      name: 'Ôn tập', 
      icon: '📚',
      color: 'from-amber-500 to-yellow-500',
      count: documents.filter(doc => doc.subject === subjectName && doc.tags.includes('ôn tập')).length 
    },
  ];

  // Lớp có tài liệu cho môn học này
  const availableClasses = ['all', ...Array.from(new Set(documents.filter(doc => doc.subject === subjectName).map(doc => doc.class)))];

  // Loại file có sẵn
  const availableFileTypes = [
    { id: 'all', name: 'Tất cả loại file', icon: '📄' },
    { id: 'pdf', name: 'PDF', icon: '📕' },
    { id: 'doc', name: 'Word', icon: '📘' },
    { id: 'ppt', name: 'PowerPoint', icon: '📙' },
    { id: 'excel', name: 'Excel', icon: '📗' }
  ];

  // Khi render danh sách subjectDocuments, gán rating random từ 4.8 đến 5.0
  const getRandomRating = () => (Math.random() * 0.2 + 4.8).toFixed(1);

  // Highlight từ khóa
  function highlight(text: string, keyword: string) {
    if (!keyword) return text;
    const re = new RegExp(`(${keyword})`, 'gi');
    return text.split(re).map((part, i) =>
      re.test(part) ? <span key={i} className="bg-yellow-200 text-blue-900 font-bold px-1 rounded">{part}</span> : part
    );
  }

  // Thêm icon cho từng môn học
  const subjectConfig = {
    'Toán học': { icon: '🔢', gradient: 'from-blue-500 to-cyan-500' },
    'Văn học': { icon: '📚', gradient: 'from-red-500 to-pink-500' },
    'Tiếng Anh': { icon: '🌍', gradient: 'from-green-500 to-emerald-500' },
    'Vật lý': { icon: '⚡', gradient: 'from-purple-500 to-indigo-500' },
    'Hóa học': { icon: '🧪', gradient: 'from-orange-500 to-red-500' },
    'Sinh học': { icon: '🧬', gradient: 'from-green-600 to-teal-500' },
    'Lịch sử': { icon: '📜', gradient: 'from-amber-500 to-yellow-500' },
    'Địa lý': { icon: '🌍', gradient: 'from-teal-500 to-blue-500' }
  };
  const config = subjectConfig[subjectName as keyof typeof subjectConfig] || { icon: '📚', gradient: 'from-blue-400 to-purple-400' };

  return (
    <>
      <Head>
        <title>{searchQuery ? `Tìm kiếm: ${searchQuery}` : `Tài liệu ${subjectName}`} | Selling Document</title>
        <meta name="description" content={searchQuery ? `Kết quả tìm kiếm cho: ${searchQuery}` : `Tổng hợp tài liệu ${subjectName} cho giáo viên, học sinh, đề thi, giáo án, chuyên đề, miễn phí, giảm giá, combo.`} />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/documents" className="text-slate-500 hover:text-blue-600 transition-colors">
              Tất cả tài liệu
            </Link>
            <span className="text-slate-400">/</span>
            <Link href="/documents/subject" className="text-slate-500 hover:text-blue-600 transition-colors">
              Môn học
            </Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-900 font-medium">{subjectName}</span>
          </nav>
        </div>
      </div>

      {/* Header Section */}
      <section className={`relative overflow-hidden py-16 bg-gradient-to-br ${config.gradient} via-white to-blue-50/30`}>
        {/* Animated background */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-white/30 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-56 h-56 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="flex flex-col items-center justify-center mb-8">
            <div className={`w-24 h-24 rounded-3xl flex items-center justify-center text-5xl font-bold mb-4 shadow-xl bg-gradient-to-br ${config.gradient} text-white animate-fade-in-up`}>
              {config.icon}
            </div>
            <h1 className="text-5xl font-extrabold text-slate-900 mb-4 drop-shadow animate-fade-in-up text-center">{subjectName}</h1>
            <p className="text-xl text-slate-700 max-w-2xl mx-auto text-center mb-2 animate-fade-in-up">
              Khám phá kho tài liệu <span className="font-bold text-blue-600">{subjectName.toLowerCase()}</span> chất lượng cao, biên soạn bởi giáo viên kinh nghiệm, cập nhật liên tục.
            </p>
            <div className="flex flex-wrap gap-2 justify-center mt-2 animate-fade-in-up">
              {documentCategories.filter(c => c.id !== 'all').map(cat => (
                <span key={cat.id} className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-white/80 border border-gray-200 shadow hover:bg-blue-50 transition-colors text-blue-700 cursor-pointer" onClick={() => setSelectedCategories([cat.id])}>
                  <span className="mr-2">{cat.icon}</span>{cat.name} <span className="ml-2 text-xs text-slate-500">({cat.count})</span>
                </span>
              ))}
            </div>
          </div>
          {/* Search Bar với auto-complete */}
          <div className="max-w-2xl mx-auto mb-8 animate-fade-in-up">
            <Search
              placeholder="Tìm kiếm tài liệu..."
              value={searchQuery}
              onChange={setSearchQuery}
              suggestions={searchSuggestions}
              onSuggestionSelect={s => setSearchQuery(s)}
              onSearch={() => {}}
            />
          </div>
          {/* Multi-select Filter Section */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 animate-fade-in-up">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Filter
                options={availableClasses.filter(cls => cls !== 'all').map(c => ({ value: c, label: c }))}
                value={selectedClasses.join(',')}
                onChange={v => setSelectedClasses(v ? v.split(',') : [])}
                placeholder="Chọn lớp"
                multiSelect
              />
              <Filter
                options={documentCategories.map(c => ({ value: c.id, label: c.name }))}
                value={selectedCategories.join(',')}
                onChange={v => setSelectedCategories(v ? v.split(',') : [])}
                placeholder="Chọn danh mục"
                multiSelect
              />
              <Filter
                options={[{ value: 'free', label: 'Miễn phí' }, { value: 'discount', label: 'Giảm giá' }]}
                value={selectedTags.join(',')}
                onChange={v => setSelectedTags(v ? v.split(',') : [])}
                placeholder="Miễn phí/Giảm giá"
                multiSelect
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Giá từ</label>
                <input type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} className="w-full px-4 py-2 border rounded-xl" placeholder="0" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Giá đến</label>
                <input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className="w-full px-4 py-2 border rounded-xl" placeholder="1000000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Đánh giá tối thiểu</label>
                <input type="number" value={minRating} onChange={e => setMinRating(e.target.value)} className="w-full px-4 py-2 border rounded-xl" placeholder="4.5" min="0" max="5" step="0.1" />
              </div>
            </div>
          </div>
          {/* Active Filters Display */}
          {(searchQuery || selectedClasses.length > 0 || selectedCategories.length > 0 || minPrice || maxPrice || minRating || selectedTags.length > 0) && (
            <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-200 mt-4">
              <span className="text-sm font-medium text-slate-700">Bộ lọc đang áp dụng:</span>
              {searchQuery && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                  "{searchQuery}" <button onClick={() => setSearchQuery('')} className="ml-2 text-blue-600 hover:text-blue-800">×</button>
                </span>
              )}
              {selectedClasses.length > 0 && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                  {selectedClasses.map(s => `${s}, `).slice(0, -2)} <button onClick={() => setSelectedClasses([])} className="ml-2 text-green-600 hover:text-green-800">×</button>
                </span>
              )}
              {selectedCategories.length > 0 && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                  {selectedCategories.map(c => `${c}, `).slice(0, -2)} <button onClick={() => setSelectedCategories([])} className="ml-2 text-purple-600 hover:text-purple-800">×</button>
                </span>
              )}
              {selectedTags.length > 0 && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">
                  {selectedTags.map(t => `${t}, `).slice(0, -2)} <button onClick={() => setSelectedTags([])} className="ml-2 text-yellow-600 hover:text-yellow-800">×</button>
                </span>
              )}
              {minPrice && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                  Từ {minPrice} ₫ <button onClick={() => setMinPrice('')} className="ml-2 text-blue-600 hover:text-blue-800">×</button>
                </span>
              )}
              {maxPrice && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                  Đến {maxPrice} ₫ <button onClick={() => setMaxPrice('')} className="ml-2 text-blue-600 hover:text-blue-800">×</button>
                </span>
              )}
              {minRating && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                  Đánh giá tối thiểu {minRating} <button onClick={() => setMinRating('')} className="ml-2 text-blue-600 hover:text-blue-800">×</button>
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Documents Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Loading Skeleton */}
          {showLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-64 rounded-3xl" />)}
            </div>
          ) : subjectDocuments.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-2">Không tìm thấy tài liệu</h3>
              <p className="text-slate-600 mb-6">Không có tài liệu nào phù hợp với bộ lọc hiện tại.<br />Gợi ý tài liệu nổi bật:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
                {documents.slice(0, 6).map(doc => (
                  <Link key={doc.id} href={`/documents/${doc.subject.toLowerCase().replace(/\s+/g, '-')}/${doc.subject.toLowerCase().replace(/\s+/g, '-') + '-' + doc.class.toLowerCase().replace(/\s+/g, '-')}/${doc.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    <div className="bg-white rounded-2xl shadow p-4 border border-slate-100 hover:shadow-lg transition-all">
                      <h4 className="font-semibold text-slate-900 mb-1">{doc.title}</h4>
                      <div className="text-xs text-slate-500 mb-1">{doc.subject} - {doc.class}</div>
                      <div className="text-xs text-slate-500">⭐ {doc.rating.toFixed(1)} | ⬇️ {doc.downloads}</div>
                      <div className="text-blue-600 font-bold text-base mt-1">{doc.price === 0 ? "Miễn phí" : doc.price.toLocaleString('vi-VN') + "₫"}</div>
                    </div>
                  </Link>
                ))}
              </div>
              <Button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedClasses([]);
                  setSelectedCategories([]);
                  setMinPrice('');
                  setMaxPrice('');
                  setMinRating('');
                  setSelectedTags([]);
                }}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white"
              >
                Xóa bộ lọc
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-slate-600">
                  Tìm thấy <span className="font-semibold text-slate-900">{subjectDocuments.length}</span> tài liệu
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subjectDocuments.map((doc) => (
                  <Link key={doc.id} href={`/documents/${createTitleSlug(doc.subject)}/${createTitleSlug(doc.subject + '-' + doc.class)}/${createTitleSlug(doc.title)}`}>
                    <Card className="h-full rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer border-2 border-transparent hover:border-blue-200 bg-white flex flex-col justify-between">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg font-semibold text-slate-900 line-clamp-2">
                            {highlight(doc.title, searchQuery)}
                          </CardTitle>
                          <div className="text-2xl ml-2 flex gap-1">
                            {doc.tags.includes('đề thi') && <span title="Đề thi">📝</span>}
                            {doc.tags.includes('giáo án') && <span title="Giáo án">📖</span>}
                            {doc.tags.includes('chuyên đề') && <span title="Chuyên đề">📋</span>}
                            {doc.tags.includes('bài tập') && <span title="Bài tập">✏️</span>}
                            {doc.tags.includes('trắc nghiệm') && <span title="Trắc nghiệm">✅</span>}
                            {doc.tags.includes('ôn tập') && <span title="Ôn tập">📚</span>}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                          {doc.description}
                        </p>
                        <div className="flex items-center justify-between text-sm text-slate-500 mb-2">
                          <span className="underline text-blue-600 cursor-pointer hover:text-blue-800"
                            onClick={e => {
                              e.preventDefault();
                              const classSlug = doc.class
                                .toLowerCase()
                                .normalize('NFD')
                                .replace(/[ 0-\u036f]/g, '')
                                .replace(/lớp /, 'lop ')
                                .replace(/[^a-z0-9 ]/g, '');
                              window.location.href = `/search?class=${encodeURIComponent(classSlug.trim())}`;
                            }}
                          >
                            Lớp {doc.class}
                          </span>
                          {doc.tags && doc.tags.length > 0 && (
                            <span
                              className="ml-2 underline text-purple-600 cursor-pointer hover:text-purple-800"
                              onClick={e => {
                                e.preventDefault();
                                const cat = doc.tags[0];
                                const catSlug = cat
                                  .toLowerCase()
                                  .normalize('NFD')
                                  .replace(/[\u0300-\u036f]/g, '')
                                  .replace(/[^a-z0-9 ]/g, '');
                                window.location.href = `/search?category=${encodeURIComponent(catSlug.trim())}`;
                              }}
                            >
                              {doc.tags[0]}
                            </span>
                          )}
                          <span>{doc.downloads} lượt tải</span>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-1">
                            <span className="text-yellow-500">★</span>
                            <span className="text-sm text-slate-600">{getRandomRating()}</span>
                          </div>
                          <div className="text-lg font-bold text-blue-600">
                            {doc.price === 0 ? <span className="text-green-600">Miễn phí</span> : doc.price.toLocaleString('vi-VN') + '₫'}
                          </div>
                        </div>
                        {/* Badge nổi bật */}
                        <div className="flex gap-2 mt-2">
                          {doc.price === 0 && <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-bold">Miễn phí</span>}
                          {doc.downloads > 1000 && <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs font-bold">Hot</span>}
                          {doc.createdAt && (new Date().getTime() - new Date(doc.createdAt).getTime() < 1000*60*60*24*14) && <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs font-bold">Mới</span>}
                          {typeof doc.originalPrice === 'number' && doc.originalPrice > doc.price && <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-xs font-bold">Giảm giá</span>}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
    </>
  );
} 