'use client';
import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { documents, subjects, classes, createSlug } from '@/lib/data';
import { useSearchParams } from 'next/navigation';
import Head from 'next/head';
import Search from '@/components/ui/Search';
import Filter from '@/components/ui/Filter';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showLoading, setShowLoading] = useState(false);

  // Lấy query parameters từ URL
  useEffect(() => {
    const query = searchParams.get('q') || '';
    const subject = searchParams.get('subject') || 'all';
    const cls = searchParams.get('class') || 'all';
    const category = searchParams.get('category') || 'all';
    
    setSearchQuery(query);
    setSelectedSubject(subject);
    setSelectedClass(cls);
    setSelectedCategory(category);
  }, [searchParams]);

  // Gợi ý tìm kiếm
  useEffect(() => {
    if (!searchQuery) setSearchSuggestions([]);
    else {
      const lower = searchQuery.toLowerCase();
      setSearchSuggestions(documents.filter(doc => doc.title.toLowerCase().includes(lower) || doc.subject.toLowerCase().includes(lower)).slice(0, 5).map(doc => doc.title));
    }
  }, [searchQuery]);

  // GỘP lại thành một hàm normalizeVN duy nhất, chuẩn hóa i/y, chuẩn hóa class/tag không dấu, thay thế 'lớp ' thành 'lop '
  const normalizeVN = (str: string) => str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/([b-df-hj-np-tv-z])i/g, '$1y')
    .replace(/([b-df-hj-np-tv-z])í/g, '$1ý')
    .replace(/([b-df-hj-np-tv-z])ì/g, '$1ỳ')
    .replace(/([b-df-hj-np-tv-z])ỉ/g, '$1ỷ')
    .replace(/([b-df-hj-np-tv-z])ĩ/g, '$1ỹ')
    .replace(/([b-df-hj-np-tv-z])ị/g, '$1ỵ')
    .replace(/^lớp /, 'lop ')
    .replace(/[^a-z0-9 ]/g, '')
    .trim();

  const isValidQuery = searchQuery && searchQuery.trim().length > 0 && /[a-zA-ZÀ-ỹ0-9]/.test(searchQuery.trim());

  // Lọc tài liệu nâng cao
  const filteredDocuments = useMemo(() => {
    setShowLoading(true);
    let filtered = documents;
    // Multi-select filter
    if (selectedSubjects.length > 0) {
      filtered = filtered.filter(doc => selectedSubjects.includes(doc.subject));
    } else if (selectedSubject !== 'all') {
      filtered = filtered.filter(doc => doc.subject === selectedSubject);
    }
    // Lọc class: so sánh không dấu, viết thường
    if (selectedClasses.length > 0) {
      filtered = filtered.filter(doc => selectedClasses.some(cls => normalizeVN(doc.class) === normalizeVN(cls)));
    } else if (selectedClass !== 'all') {
      filtered = filtered.filter(doc => normalizeVN(doc.class) === normalizeVN(selectedClass));
    }
    // Trong filteredDocuments useMemo, cập nhật filter category:
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(doc => selectedCategories.some(cat => normalizeVN(doc.category || '') === normalizeVN(cat) || (doc.tags && doc.tags.some(tag => normalizeVN(tag) === normalizeVN(cat)))));
    } else if (selectedCategory !== 'all') {
      filtered = filtered.filter(doc => normalizeVN(doc.category || '') === normalizeVN(selectedCategory) || (doc.tags && doc.tags.some(tag => normalizeVN(tag) === normalizeVN(selectedCategory))));
    }
    // Filter by price
    if (minPrice) filtered = filtered.filter(doc => doc.price >= Number(minPrice));
    if (maxPrice) filtered = filtered.filter(doc => doc.price <= Number(maxPrice));
    // Filter by rating
    if (minRating) filtered = filtered.filter(doc => doc.rating >= Number(minRating));
    // Filter by tag
    if (selectedTags.length > 0) filtered = filtered.filter(doc => doc.tags.some(tag => selectedTags.includes(tag)));
    // Tìm kiếm
    if (isValidQuery) {
      const nq = normalizeVN(searchQuery.trim());
      filtered = filtered.filter(doc => (
        normalizeVN(doc.title).includes(nq) ||
        normalizeVN(doc.description || '').includes(nq) ||
        normalizeVN(doc.subject).includes(nq) ||
        normalizeVN(doc.category || '').includes(nq) ||
        (doc.tags && doc.tags.some(tag => normalizeVN(tag).includes(nq)))
      ));
    }
    // Sắp xếp
    switch (sortBy) {
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt || '').getTime() - new Date(b.createdAt || '').getTime());
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
      default: // newest
        filtered.sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime());
    }
    setTimeout(() => setShowLoading(false), 400);
    return filtered;
  }, [documents, selectedSubjects, selectedClasses, selectedCategories, selectedTags, minPrice, maxPrice, minRating, selectedSubject, selectedClass, selectedCategory, isValidQuery, searchQuery, sortBy]);
  
  // Debug: log số lượng tài liệu được lọc
  console.log(`DEBUG - Total documents: ${documents.length}`);
  console.log(`DEBUG - Filtered documents: ${filteredDocuments.length}`);
  console.log(`DEBUG - isValidQuery: ${isValidQuery}`);
  console.log(`DEBUG - searchQuery: "${searchQuery}"`);

  // Danh mục tài liệu
  const documentCategories = [
    { id: 'all', name: 'Tất cả', icon: '📚', color: 'from-blue-500 to-purple-500' },
    { id: 'de-thi', name: 'Đề thi', icon: '📝', color: 'from-red-500 to-pink-500' },
    { id: 'giao-an', name: 'Giáo án', icon: '📖', color: 'from-green-500 to-emerald-500' },
    { id: 'chuyen-de', name: 'Chuyên đề', icon: '📋', color: 'from-purple-500 to-indigo-500' },
    { id: 'bai-tap', name: 'Bài tập', icon: '✏️', color: 'from-orange-500 to-red-500' },
    { id: 'trac-nghiem', name: 'Trắc nghiệm', icon: '✅', color: 'from-teal-500 to-blue-500' },
    { id: 'on-tap', name: 'Ôn tập', icon: '📚', color: 'from-amber-500 to-yellow-500' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (selectedSubjects.length > 0) params.set('subject', selectedSubjects.join(','));
    else if (selectedSubject !== 'all') params.set('subject', selectedSubject);
    if (selectedClasses.length > 0) params.set('class', selectedClasses.join(','));
    else if (selectedClass !== 'all') params.set('class', selectedClass);
    if (selectedCategories.length > 0) params.set('category', selectedCategories.join(','));
    else if (selectedCategory !== 'all') params.set('category', selectedCategory);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (minRating) params.set('minRating', minRating);
    if (selectedTags.length > 0) params.set('tags', selectedTags.join(','));
    
    const newUrl = `/search?${params.toString()}`;
    window.history.pushState({}, '', newUrl);
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedSubject('all');
    setSelectedSubjects([]);
    setSelectedClass('all');
    setSelectedClasses([]);
    setSelectedCategory('all');
    setSelectedCategories([]);
    setMinPrice('');
    setMaxPrice('');
    setMinRating('');
    setSelectedTags([]);
    setSortBy('newest');
    window.history.pushState({}, '', '/search');
  };

  // Thêm hàm random rating cho mỗi tài liệu
  const getRandomRating = (seed: string) => {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    const rand = Math.abs(Math.sin(hash) * 10000) % 1;
    return (4.8 + rand * 0.2).toFixed(1);
  };

  // Highlight từ khóa
  function highlight(text: string, keyword: string) {
    if (!keyword) return text;
    const re = new RegExp(`(${keyword})`, 'gi');
    return text.split(re).map((part, i) =>
      re.test(part) ? <span key={i} className="bg-yellow-200 text-blue-900 font-bold px-1 rounded">{part}</span> : part
    );
  }

  return (
    <>
      <Head>
        <title>{searchQuery ? `Tìm kiếm: ${searchQuery}` : 'Tìm kiếm tài liệu'} | Selling Document</title>
        <meta name="description" content={searchQuery ? `Kết quả tìm kiếm cho: ${searchQuery}` : 'Tìm kiếm tài liệu giáo viên, học sinh, đề thi, giáo án, chuyên đề, miễn phí, giảm giá, combo.'} />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        {/* Breadcrumb Navigation */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-slate-500 hover:text-blue-600 transition-colors">
                Trang chủ
              </Link>
              <span className="text-slate-400">/</span>
              <span className="text-slate-900 font-medium">Tìm kiếm</span>
            </nav>
          </div>
        </div>

        {/* Header Section */}
        <section className="py-12 bg-gradient-to-br from-white to-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-slate-900 mb-4">
                Kết quả tìm kiếm
              </h1>
              <p className="text-xl text-slate-600">
                {filteredDocuments.length} tài liệu được tìm thấy
              </p>
            </div>

            {/* Search Bar với auto-complete */}
            <div className="max-w-2xl mx-auto mb-8">
              <Search
                placeholder="Tìm kiếm tài liệu, môn học, lớp..."
                value={searchQuery}
                onChange={setSearchQuery}
                suggestions={searchSuggestions}
                onSuggestionSelect={s => setSearchQuery(s)}
                onSearch={() => handleSearch({ preventDefault: () => {} } as any)}
              />
            </div>

            {/* Category Cards Section */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Duyệt theo danh mục</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {documentCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`group relative p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-br ' + category.color + ' text-white shadow-xl'
                        : 'bg-white border-2 border-slate-200 hover:border-slate-300 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    <div className="text-center">
                      <div className={`text-3xl mb-2 ${selectedCategory === category.id ? '' : 'group-hover:scale-110 transition-transform duration-300'}`}>
                        {category.icon}
                      </div>
                      <div className={`font-semibold text-sm ${selectedCategory === category.id ? 'text-white' : 'text-slate-700'}`}>
                        {category.name}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Multi-select Filter Section */}
            <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Filter
                  options={subjects.map(s => ({ value: s, label: s }))}
                  value={selectedSubjects.join(',')}
                  onChange={v => setSelectedSubjects(v ? v.split(',') : [])}
                  placeholder="Chọn môn học"
                  multiSelect
                />
                <Filter
                  options={classes.map(c => ({ value: c, label: c }))}
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
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
            {(searchQuery || selectedSubjects.length > 0 || selectedClasses.length > 0 || selectedCategories.length > 0 || minPrice || maxPrice || minRating || selectedTags.length > 0) && (
              <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-200 mt-4">
                <span className="text-sm font-medium text-slate-700">Bộ lọc đang áp dụng:</span>
                {searchQuery && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                    "{searchQuery}" <button onClick={() => setSearchQuery('')} className="ml-2 text-blue-600 hover:text-blue-800">×</button>
                  </span>
                )}
                {selectedSubjects.length > 0 && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                    {selectedSubjects.map(s => `${s}, `).slice(0, -2)} <button onClick={() => setSelectedSubjects([])} className="ml-2 text-green-600 hover:text-green-800">×</button>
                  </span>
                )}
                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                    {documentCategories.find(c => c.id === selectedCategory)?.name} <button onClick={() => setSelectedCategory('all')} className="ml-2 text-purple-600 hover:text-purple-800">×</button>
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

          {/* Results Info */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-900">
              Kết quả tìm kiếm ({filteredDocuments.length} tài liệu)
            </h2>
            <div className="text-slate-600">
              Hiển thị {filteredDocuments.length} trong tổng số {documents.length} tài liệu
            </div>
          </div>

          {/* Loading Skeleton */}
          {showLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white/80 rounded-3xl h-56 animate-pulse" />
              ))}
            </div>
          ) : filteredDocuments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDocuments.map((doc) => (
                <Link key={doc.id} href={`/documents/${createSlug(doc.subject)}/${createSlug(doc.subject + '-' + doc.class)}/${createSlug(doc.title)}`}>
                  <div className="group bg-white/80 backdrop-blur-sm p-6 rounded-3xl border border-slate-200/50 hover:border-slate-300/50 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        {doc.subject}
                      </span>
                      <span className="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded-full font-medium">
                        {doc.class}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                      {highlight(doc.title, searchQuery)}
                    </h3>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-slate-600">Tác giả: {doc.author}</span>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-yellow-500">📥</span>
                        <span className="text-sm text-slate-600 font-medium">{doc.downloads.toLocaleString('vi-VN')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-500">⭐</span>
                        <span className="text-sm font-medium text-slate-700">{getRandomRating(doc.id || doc.title)}</span>
                        <span className="text-xs text-slate-500">({doc.downloads} lượt tải)</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          {doc.price.toLocaleString('vi-VN')} ₫
                        </span>
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-xl rounded-xl px-4 py-2 font-semibold"
                      >
                        Xem chi tiết
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <span className="text-6xl mb-6">🔍</span>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Không tìm thấy tài liệu</h3>
              <p className="text-slate-600 mb-6">
                Không có tài liệu nào phù hợp với bộ lọc hiện tại.<br />
                Gợi ý tài liệu nổi bật:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
                {documents.slice(0, 6).map(doc => (
                  <Link key={doc.id} href={`/documents/${createSlug(doc.subject)}/${createSlug(doc.subject + '-' + doc.class)}/${createSlug(doc.title)}`}>
                    <div className="bg-white rounded-2xl shadow p-4 border border-slate-100 hover:shadow-lg transition-all">
                      <h4 className="font-semibold text-slate-900 mb-1">{doc.title}</h4>
                      <div className="text-xs text-slate-500 mb-1">{doc.subject} - {doc.class}</div>
                      <div className="text-xs text-slate-500">⭐ {doc.rating.toFixed(1)} | ⬇️ {doc.downloads}</div>
                      <div className="text-blue-600 font-bold text-base mt-1">{doc.price === 0 ? "Miễn phí" : doc.price.toLocaleString('vi-VN') + "₫"}</div>
                    </div>
                  </Link>
                ))}
              </div>
              <button
                onClick={clearAllFilters}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all"
              >
                Xóa bộ lọc
              </button>
            </div>
          )}
        </section>
      </div>
    </>
  );
} 