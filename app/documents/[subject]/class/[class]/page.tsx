'use client';
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { documents, createSlug } from '@/lib/data';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Search from '@/components/ui/Search';
import Filter from '@/components/ui/Filter';
import { Skeleton } from '@/components/ui/LoadingSkeleton';

const ChatSupport = dynamic(() => import('@/components/ui/ChatSupport'), { ssr: false });

export default function SubjectClassPage({ params }: { params: { subject: string, class: string } }) {
  const { subject, class: className } = params;
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('downloads');
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showLoading, setShowLoading] = useState(false);

  // Gợi ý tìm kiếm
  React.useEffect(() => {
    if (!searchQuery) setSearchSuggestions([]);
    else {
      const lower = searchQuery.toLowerCase();
      setSearchSuggestions(documents.filter(doc => doc.title.toLowerCase().includes(lower) || doc.subject.toLowerCase().includes(lower)).slice(0, 5).map(doc => doc.title));
    }
  }, [searchQuery]);

  // Lọc tài liệu nâng cao
  const filteredDocuments = useMemo(() => {
    setShowLoading(true);
    let filtered = documents.filter(doc =>
      createSlug(doc.subject) === createSlug(subject) &&
      createSlug(doc.class) === createSlug(className)
    );
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
        (doc.description && doc.description.toLowerCase().includes(nq))
      ));
    }
    // Sắp xếp
    if (sortBy === 'downloads') filtered.sort((a, b) => b.downloads - a.downloads);
    else if (sortBy === 'rating') filtered.sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'newest') filtered.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
    else if (sortBy === 'free') filtered.sort((a, b) => a.price - b.price);
    setTimeout(() => setShowLoading(false), 400);
    return filtered;
  }, [subject, className, searchQuery, sortBy, minPrice, maxPrice, minRating, selectedTags]);

  // Hàm random rating cho mỗi tài liệu
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
        <title>{searchQuery ? `Tìm kiếm: ${searchQuery}` : `Tài liệu ${subject.replace(/-/g, ' ')} - ${className.replace(/-/g, ' ')}`} | Selling Document</title>
        <meta name="description" content={searchQuery ? `Kết quả tìm kiếm cho: ${searchQuery}` : `Tổng hợp tài liệu ${subject.replace(/-/g, ' ')} - ${className.replace(/-/g, ' ')} cho giáo viên, học sinh, đề thi, giáo án, chuyên đề, miễn phí, giảm giá, combo.`} />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Tài liệu {subject.replace(/-/g, ' ')} - {className.replace(/-/g, ' ')}</h1>
            <p className="text-lg text-slate-600">Tổng hợp tài liệu chất lượng cao cho {subject.replace(/-/g, ' ')} {className.replace(/-/g, ' ')}.</p>
          </div>
          {/* Search Bar với auto-complete */}
          <div className="max-w-2xl mx-auto mb-8">
            <Search
              placeholder="Tìm kiếm tài liệu..."
              value={searchQuery}
              onChange={setSearchQuery}
              suggestions={searchSuggestions}
              onSuggestionSelect={s => setSearchQuery(s)}
              onSearch={() => {}}
            />
          </div>
          {/* Lọc nâng cao */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
          {(searchQuery || minPrice || maxPrice || minRating || selectedTags.length > 0) && (
            <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-200 mt-4">
              <span className="text-sm font-medium text-slate-700">Bộ lọc đang áp dụng:</span>
              {searchQuery && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                  "{searchQuery}" <button onClick={() => setSearchQuery('')} className="ml-2 text-blue-600 hover:text-blue-800">×</button>
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
          {/* Loading Skeleton */}
          {showLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-64 rounded-3xl" />)}
            </div>
          ) : filteredDocuments.length === 0 ? (
            <div className="col-span-full text-center text-slate-500 text-lg py-12">
              Không có tài liệu nào phù hợp.<br />
              Gợi ý tài liệu nổi bật:
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8 mt-6">
                {documents.slice(0, 6).map(doc => (
                  <Link key={doc.id} href={`/documents/${createSlug(doc.subject)}/${createSlug(doc.subject + ' ' + doc.class)}/${createSlug(doc.title)}`}>
                    <div className="bg-white rounded-2xl shadow p-4 border border-slate-100 hover:shadow-lg transition-all">
                      <h4 className="font-semibold text-slate-900 mb-1">{doc.title}</h4>
                      <div className="text-xs text-slate-500 mb-1">{doc.subject} - {doc.class}</div>
                      <div className="text-xs text-slate-500">⭐ {getRandomRating(doc.id || doc.title)} | ⬇️ {doc.downloads}</div>
                      <div className="text-blue-600 font-bold text-base mt-1">{doc.price === 0 ? "Miễn phí" : doc.price.toLocaleString() + "₫"}</div>
                    </div>
                  </Link>
                ))}
              </div>
              <Button onClick={() => {
                setSearchQuery('');
                setMinPrice('');
                setMaxPrice('');
                setMinRating('');
                setSelectedTags([]);
              }} className="bg-gradient-to-r from-blue-500 to-purple-500 text-white mt-4">Xóa bộ lọc</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDocuments.map(doc => (
                <Link key={doc.id} href={`/documents/${createSlug(doc.subject)}/${createSlug(doc.subject + ' ' + doc.class)}/${createSlug(doc.title)}`}>
                  <Card className="h-full hover:scale-105 transition-all duration-300 cursor-pointer">
                    <div className="flex flex-col space-y-2 pb-4">
                      <h3 className="tracking-tight text-lg font-semibold text-slate-900 line-clamp-2 mb-2">{highlight(doc.title, searchQuery)}</h3>
                      <div className="flex gap-2 text-sm text-slate-600 mb-2">
                        <span>{doc.subject}</span>
                        <span>-</span>
                        <span>{doc.class}</span>
                      </div>
                      <div className="flex gap-4 text-xs text-slate-500">
                        <span>⭐ {getRandomRating(doc.id || doc.title)}</span>
                        <span>⬇️ {doc.downloads}</span>
                      </div>
                      <div className="text-blue-600 font-bold text-lg mt-2">{doc.price === 0 ? "Miễn phí" : doc.price.toLocaleString() + "₫"}</div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
        {/* Chat tư vấn */}
        <ChatSupport mode="support" />
      </div>
    </>
  );
} 