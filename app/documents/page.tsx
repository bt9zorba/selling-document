'use client';
import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { subjects, documents, classes, type DocumentType, createSlug } from '@/lib/data';
import { Skeleton } from '@/components/ui/LoadingSkeleton';
import Head from 'next/head';
import Search from '@/components/ui/Search';
import Filter from '@/components/ui/Filter';

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFileType, setSelectedFileType] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [isMounted, setIsMounted] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState('');
  const [minDownloads, setMinDownloads] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('all');
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showLoading, setShowLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ show: boolean, message: string } | null>(null);

  useEffect(() => { setIsMounted(true); }, []);

  // Gợi ý tìm kiếm
  useEffect(() => {
    if (!searchQuery) setSearchSuggestions([]);
    else {
      const lower = searchQuery.toLowerCase();
      setSearchSuggestions(documents.filter(doc => doc.title.toLowerCase().includes(lower) || doc.subject.toLowerCase().includes(lower)).slice(0, 5).map(doc => doc.title));
    }
  }, [searchQuery]);

  // Lọc tài liệu theo các điều kiện
  const filteredDocuments = useMemo(() => {
    setShowLoading(true);
    let filtered = documents;

    // Multi-select filter
    if (selectedSubjects.length > 0) {
      filtered = filtered.filter(doc => selectedSubjects.includes(doc.subject));
    } else if (selectedSubject !== 'all') {
      filtered = filtered.filter(doc => doc.subject === selectedSubject);
    }
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
        doc.description.toLowerCase().includes(nq) ||
        doc.subject.toLowerCase().includes(nq)
      ));
    }
    // Sắp xếp
    if (sortBy === 'popular') {
      filtered = filtered.slice().sort((a, b) => b.downloads - a.downloads);
    } else if (sortBy === 'rating') {
      filtered = filtered.slice().sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'free') {
      filtered = filtered.slice().sort((a, b) => a.price - b.price);
    } else {
      filtered = filtered.slice().sort((a, b) => b.id.localeCompare(a.id)); // newest
    }
    setTimeout(() => setShowLoading(false), 400);
    return filtered;
  }, [searchQuery, selectedSubjects, selectedClasses, selectedCategories, selectedTags, minPrice, maxPrice, minRating, selectedSubject, selectedClass, selectedCategory, sortBy]);

  // Khi lọc/tìm kiếm, hiển thị skeleton loading
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, [filteredDocuments]);

  // Danh mục tài liệu
  const documentCategories = [
    { id: 'all', name: 'Tất cả', count: documents.length },
    { id: 'de-thi', name: 'Đề thi', count: documents.filter(doc => doc.tags.includes('đề thi')).length },
    { id: 'giao-an', name: 'Giáo án', count: documents.filter(doc => doc.tags.includes('giáo án')).length },
    { id: 'chuyen-de', name: 'Chuyên đề', count: documents.filter(doc => doc.tags.includes('chuyên đề')).length },
    { id: 'bai-tap', name: 'Bài tập', count: documents.filter(doc => doc.tags.includes('bài tập')).length },
    { id: 'trac-nghiem', name: 'Trắc nghiệm', count: documents.filter(doc => doc.tags.includes('trắc nghiệm')).length },
    { id: 'on-tap', name: 'Ôn tập', count: documents.filter(doc => doc.tags.includes('ôn tập')).length },
  ];

  // Thống kê theo môn học
  const subjectStats = subjects.map(subject => ({
    name: subject,
    count: documents.filter(doc => doc.subject === subject).length,
    totalDownloads: documents.filter(doc => doc.subject === subject).reduce((sum, doc) => sum + doc.downloads, 0),
    avgRating: documents.filter(doc => doc.subject === subject).reduce((sum, doc) => sum + doc.rating, 0) / documents.filter(doc => doc.subject === subject).length || 0
  }));

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
        <title>{searchQuery ? `Tìm kiếm: ${searchQuery}` : 'Tất cả tài liệu'} | Selling Document</title>
        <meta name="description" content={searchQuery ? `Kết quả tìm kiếm cho: ${searchQuery}` : 'Tổng hợp tài liệu giáo viên, học sinh, đề thi, giáo án, chuyên đề, miễn phí, giảm giá, combo.'} />
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
              <span className="text-slate-900 font-medium">Tất cả tài liệu</span>
            </nav>
          </div>
        </div>

        {/* Header Section */}
        <section className="py-12 bg-gradient-to-br from-white to-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-slate-900 mb-4">
                Tất cả tài liệu giáo dục
              </h1>
              <p className="text-xl text-slate-600">
                {documents.length} tài liệu chất lượng cao, cập nhật liên tục
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
                onSearch={() => {}}
              />
            </div>

            {/* Subject Cards Section */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Duyệt theo môn học</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {subjectStats.map((subject) => {
                  const subjectConfig = {
                    'Toán học': { gradient: 'from-blue-500 to-cyan-500', icon: '🔢' },
                    'Văn học': { gradient: 'from-red-500 to-pink-500', icon: '📚' },
                    'Tiếng Anh': { gradient: 'from-green-500 to-emerald-500', icon: '🇬🇧' },
                    'Vật lý': { gradient: 'from-purple-500 to-indigo-500', icon: '⚡' },
                    'Hóa học': { gradient: 'from-orange-500 to-red-500', icon: '🧪' },
                    'Sinh học': { gradient: 'from-teal-500 to-blue-500', icon: '🧬' },
                    'Lịch sử': { gradient: 'from-amber-500 to-yellow-500', icon: '📜' },
                    'Địa lý': { gradient: 'from-emerald-500 to-green-500', icon: '🌍' }
                  };
                  
                  const config = subjectConfig[subject.name as keyof typeof subjectConfig] || { 
                    gradient: 'from-gray-500 to-slate-500', 
                    icon: '📚' 
                  };

                  return (
                                       <Link 
                       key={subject.name}
                       href={`/documents/${createSlug(subject.name)}`}
                       className="group block"
                     >
                      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 p-6 border border-slate-200">
                        <div className="text-center">
                          <div className={`text-4xl mb-3 bg-gradient-to-br ${config.gradient} bg-clip-text text-transparent`}>
                            {config.icon}
                          </div>
                          <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {subject.name}
                          </h3>
                          <div className="text-sm text-slate-600 space-y-1">
                            <div>{subject.count} tài liệu</div>
                            <div>⭐ {subject.avgRating.toFixed(1)}</div>
                            <div>{subject.totalDownloads.toLocaleString('vi-VN')} lượt tải</div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Multi-select Filter Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
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

        {/* Sticky filter trên mobile */}
        <div className="md:static fixed bottom-0 left-0 right-0 z-40 bg-white md:bg-transparent shadow md:shadow-none border-t md:border-none px-2 py-2 md:py-0 flex md:block gap-2 md:gap-0 overflow-x-auto md:overflow-visible">
          <div className="text-sm text-slate-600">
            Tìm thấy <span className="font-semibold text-slate-900">{filteredDocuments.length}</span> tài liệu
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600">Sắp xếp:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="newest">Mới nhất</option>
              <option value="oldest">Cũ nhất</option>
              <option value="downloads">Tải nhiều nhất</option>
              <option value="rating">Đánh giá cao nhất</option>
              <option value="price-low">Giá thấp nhất</option>
              <option value="price-high">Giá cao nhất</option>
            </select>
          </div>
        </div>

        {/* Documents Grid */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {showLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-64 rounded-3xl" />)}
              </div>
            ) : filteredDocuments.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Không tìm thấy tài liệu</h3>
                <p className="text-slate-600 mb-6">Không có tài liệu nào phù hợp với bộ lọc hiện tại.<br />Gợi ý tài liệu nổi bật:</p>
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
                  onClick={() => {
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
                  }}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Xóa bộ lọc
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDocuments.map((doc) => (
                  <div key={doc.id} className="group relative">
                    <div className="absolute top-2 right-2 z-10">
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded-lg shadow hover:bg-green-600 transition text-sm font-semibold"
                        onClick={() => {
                          // Thêm vào giỏ hàng
                          const cartObj = JSON.parse(localStorage.getItem('cart') || '{"items":[]}');
                          const cart = Array.isArray(cartObj.items) ? cartObj.items : [];
                          const existingItemIndex = cart.findIndex((item: any) => item.id === doc.id);
                          if (existingItemIndex >= 0) {
                            cart[existingItemIndex].quantity += 1;
                          } else {
                            cart.push({
                              id: doc.id,
                              title: doc.title,
                              price: doc.price,
                              image: doc.image || '/file.svg',
                              quantity: 1,
                              subject: doc.subject,
                              class: doc.class,
                            });
                          }
                          localStorage.setItem('cart', JSON.stringify({ items: cart }));
                          window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { items: cart } }));
                          setToast({ show: true, message: `Đã thêm "${doc.title}" vào giỏ hàng!` });
                          setTimeout(() => setToast(null), 2000);
                        }}
                        title="Thêm vào giỏ hàng"
                      >
                        🛒
                      </button>
                    </div>
                    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 p-6 border border-slate-200 flex flex-col items-center gap-4 h-full">
                      <img src={doc.image || '/file.svg'} alt={doc.title} className="w-32 h-32 object-cover rounded-2xl mb-2" />
                      <h3 className="text-xl font-bold text-slate-900 text-center mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">{highlight(doc.title, searchQuery)}</h3>
                      <div className="flex gap-2 text-sm text-slate-600 mb-1">
                        <span>{doc.subject}</span>
                        <span>-</span>
                        <span>{doc.class}</span>
                      </div>
                      <div className="flex gap-3 text-xs text-slate-500 mb-2">
                        <span>⭐ {doc.rating.toFixed(1)}</span>
                        <span>⬇️ {doc.downloads}</span>
                        <span>💬 {doc.reviews ? doc.reviews.length : 0}</span>
                      </div>
                      <div className="text-blue-600 font-bold text-2xl mt-1">{doc.price === 0 ? "Miễn phí" : doc.price.toLocaleString('vi-VN') + "₫"}</div>
                      <Link href={`/documents/${createSlug(doc.subject)}/${createSlug(doc.subject + '-' + doc.class)}/${createSlug(doc.title)}`} className="mt-2 w-full">
                        <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold text-lg shadow hover:from-blue-700 hover:to-purple-700 transition">Xem chi tiết</button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Toast notification */}
        {toast?.show && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-8 py-4 rounded-xl shadow-lg animate-bounce">
            <span className="text-xl mr-2">✓</span> {toast.message}
          </div>
        )}
      </div>
    </>
  );
} 