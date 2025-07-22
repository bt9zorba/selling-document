'use client';
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { documents, createSlug } from '@/lib/data';
import dynamic from 'next/dynamic';

const ChatSupport = dynamic(() => import('@/components/ui/ChatSupport'), { ssr: false });

export default function SubjectClassPage({ params }: { params: { subject: string, subjectClass: string } }) {
  const { subject, subjectClass } = params;
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('downloads');

  // Lọc tài liệu theo subject và class
  const filteredDocuments = useMemo(() => {
    return documents.filter(doc =>
      createSlug(doc.subject) === createSlug(subject) &&
      createSlug(doc.subject + ' ' + doc.class) === createSlug(subjectClass) &&
      (searchQuery === '' || doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || (doc.description && doc.description.toLowerCase().includes(searchQuery.toLowerCase())))
    ).sort((a, b) => {
      if (sortBy === 'downloads') return b.downloads - a.downloads;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.createdAt || '').localeCompare(a.createdAt || '');
      if (sortBy === 'free') return a.price - b.price;
      return 0;
    });
  }, [subject, subjectClass, searchQuery, sortBy]);

  // Hàm random rating cho mỗi tài liệu
  const getRandomRating = (seed: string) => {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    const rand = Math.abs(Math.sin(hash) * 10000) % 1;
    return (4.8 + rand * 0.2).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Tài liệu {subject.replace(/-/g, ' ')} - {subjectClass.replace(/-/g, ' ')}</h1>
          <p className="text-lg text-slate-600">Tổng hợp tài liệu chất lượng cao cho {subject.replace(/-/g, ' ')} {subjectClass.replace(/-/g, ' ')}.</p>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm tài liệu..."
            className="w-full md:w-1/2 px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="flex gap-2">
            <button className={`px-4 py-2 rounded-xl font-semibold transition-all ${sortBy === 'downloads' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50'}`} onClick={() => setSortBy('downloads')}>Phổ biến</button>
            <button className={`px-4 py-2 rounded-xl font-semibold transition-all ${sortBy === 'newest' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50'}`} onClick={() => setSortBy('newest')}>Mới nhất</button>
            <button className={`px-4 py-2 rounded-xl font-semibold transition-all ${sortBy === 'rating' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50'}`} onClick={() => setSortBy('rating')}>Đánh giá cao</button>
            <button className={`px-4 py-2 rounded-xl font-semibold transition-all ${sortBy === 'free' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50'}`} onClick={() => setSortBy('free')}>Miễn phí</button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDocuments.length === 0 && (
            <div className="col-span-full text-center text-slate-500 text-lg py-12">Không có tài liệu nào phù hợp.</div>
          )}
          {filteredDocuments.map(doc => (
            <Link key={doc.id} href={`/documents/${createSlug(doc.subject)}/${createSlug(doc.subject + ' ' + doc.class)}/${createSlug(doc.title)}`}>
              <Card className="h-full hover:scale-105 transition-all duration-300 cursor-pointer">
                <div className="flex flex-col space-y-2 pb-4">
                  <h3 className="tracking-tight text-lg font-semibold text-slate-900 line-clamp-2 mb-2">{doc.title}</h3>
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
      </div>
      {/* Chat tư vấn */}
      <ChatSupport mode="support" />
    </div>
  );
} 