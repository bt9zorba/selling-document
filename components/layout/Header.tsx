"use client"

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { subjects, documents, classes, createSlug } from '@/lib/data';
import { useLocalStorage } from '@/hooks/useLocalStorage';

// Tạo navigation data từ subjects array
const navigationSubjects = subjects.map((subject, index) => ({
  id: index.toString(),
  name: subject,
  icon: '📚',
  categories: []
}));

// Thêm hàm normalizeVN để chuẩn hóa i/y
function normalizeVN(str: string) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/([b-df-hj-np-tv-z])i/g, '$1y') // phụ âm + i => phụ âm + y
    .replace(/([b-df-hj-np-tv-z])í/g, '$1ý') // phụ âm + í => phụ âm + ý
    .replace(/([b-df-hj-np-tv-z])ì/g, '$1ỳ')
    .replace(/([b-df-hj-np-tv-z])ỉ/g, '$1ỷ')
    .replace(/([b-df-hj-np-tv-z])ĩ/g, '$1ỹ')
    .replace(/([b-df-hj-np-tv-z])ị/g, '$1ỵ');
}

export default function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);
  const categoryTimeout = useRef<NodeJS.Timeout | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [cartCount, setCartCount] = useState(0);
  const [cartShake, setCartShake] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);
  useEffect(() => {
    const syncCartCount = () => {
      try {
        const cartObj = JSON.parse(localStorage.getItem('cart') || '{"items":[]}');
        const count = Array.isArray(cartObj.items) ? cartObj.items.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0) : 0;
        setCartCount(count);
      } catch {
        setCartCount(0);
      }
    };
    syncCartCount();
    window.addEventListener('cartUpdated', syncCartCount);
    window.addEventListener('storage', syncCartCount);
    return () => {
      window.removeEventListener('cartUpdated', syncCartCount);
      window.removeEventListener('storage', syncCartCount);
    };
  }, []);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user') || localStorage.getItem('token');
      setIsLoggedIn(!!user);
    }
  }, [isMounted]);

  // Hàm tìm kiếm thông minh toàn cục
  const smartSearch = (text: string, query: string) => {
    const normalizedText = normalizeVN(text);
    const normalizedQuery = normalizeVN(query);
    
    // Nếu query chỉ là 1 ký tự hoặc nhiều ký tự, chỉ cần tiêu đề chứa bất kỳ ký tự nào trong query là true
    if (normalizedQuery.length > 0) {
      for (const char of normalizedQuery) {
        if (char !== ' ' && normalizedText.includes(char)) return true;
      }
    }
    // Giữ lại logic cũ cho các trường hợp đặc biệt
    // Tìm kiếm chính xác
    if (normalizedText.includes(normalizedQuery)) return true;
    
    // Tìm kiếm theo từ khóa phổ biến
    const keywordMap: { [key: string]: string[] } = {
      'toan': ['toán học', 'toán', 'math', 'mathematics'],
      'van': ['văn học', 'văn', 'literature'],
      'anh': ['tiếng anh', 'english', 'anh'],
      'ly': ['vật lý', 'physics', 'lý', 'lý thuyết', 'lý luận'],
      'hoa': ['hóa học', 'chemistry', 'hóa'],
      'sinh': ['sinh học', 'biology', 'sinh'],
      'su': ['lịch sử', 'history', 'sử'],
      'dia': ['địa lý', 'geography', 'địa'],
      'de thi': ['đề thi', 'exam', 'test', 'đề'],
      'giao an': ['giáo án', 'lesson plan', 'giáo'],
      'chuyen de': ['chuyên đề', 'specialized', 'chuyên'],
      'bai tap': ['bài tập', 'exercise', 'bài'],
      'trac nghiem': ['trắc nghiệm', 'multiple choice', 'trắc'],
      'on tap': ['ôn tập', 'review', 'ôn'],
      'lop 6': ['lớp 6', 'grade 6', 'class 6'],
      'lop 7': ['lớp 7', 'grade 7', 'class 7'],
      'lop 8': ['lớp 8', 'grade 8', 'class 8'],
      'lop 9': ['lớp 9', 'grade 9', 'class 9'],
      'lop 10': ['lớp 10', 'grade 10', 'class 10'],
      'lop 11': ['lớp 11', 'grade 11', 'class 11'],
      'lop 12': ['lớp 12', 'grade 12', 'class 12'],
      'thpt': ['thpt', 'high school', 'trung học phổ thông'],
      'quoc gia': ['quốc gia', 'national', 'quốc'],
      'hoc ky': ['học kỳ', 'semester', 'học'],
      'kiem tra': ['kiểm tra', 'test', 'kiểm'],
      'thi thu': ['thi thử', 'mock exam', 'thử'],
      'dap an': ['đáp án', 'answer', 'đáp'],
      'giai chi tiet': ['giải chi tiết', 'detailed solution', 'giải'],
      'ly thuyet': ['lý thuyết', 'theory', 'lý'],
      'thuc hanh': ['thực hành', 'practice', 'thực'],
      'nang cao': ['nâng cao', 'advanced', 'nâng'],
      'co ban': ['cơ bản', 'basic', 'cơ'],
      'tong hop': ['tổng hợp', 'comprehensive', 'tổng'],
      'chuan bi': ['chuẩn bị', 'preparation', 'chuẩn'],
      'on thi': ['ôn thi', 'exam preparation', 'ôn'],
      'luyen thi': ['luyện thi', 'exam practice', 'luyện'],
      'chuyen cap': ['chuyển cấp', 'transition', 'chuyển'],
      'tot nghiep': ['tốt nghiệp', 'graduation', 'tốt'],
      'dai hoc': ['đại học', 'university', 'đại'],
      'cao dang': ['cao đẳng', 'college', 'cao'],
      'trung cap': ['trung cấp', 'intermediate', 'trung'],
      'nghe': ['nghề', 'vocational', 'nghề'],
      'ky nang': ['kỹ năng', 'skill', 'kỹ'],
      'phuong phap': ['phương pháp', 'method', 'phương'],
      'kinh nghiem': ['kinh nghiệm', 'experience', 'kinh'],
      'sang kien': ['sáng kiến', 'innovation', 'sáng'],
      'nghien cuu': ['nghiên cứu', 'research', 'nghiên'],
      'bao cao': ['báo cáo', 'report', 'báo'],
      'thuyet trinh': ['thuyết trình', 'presentation', 'thuyết'],
      'du an': ['dự án', 'project', 'dự'],
      'hoat dong': ['hoạt động', 'activity', 'hoạt'],
      'tro choi': ['trò chơi', 'game', 'trò'],
      'minh hoa': ['minh họa', 'illustration', 'minh'],
      'hinh anh': ['hình ảnh', 'image', 'hình'],
      'video': ['video', 'clip', 'phim'],
      'audio': ['audio', 'âm thanh', 'âm'],
      'pdf': ['pdf', 'document', 'tài liệu'],
      'word': ['word', 'doc', 'document'],
      'powerpoint': ['powerpoint', 'ppt', 'slide'],
      'excel': ['excel', 'xls', 'spreadsheet'],
      '2024': ['2024', 'năm 2024', 'current year'],
      '2025': ['2025', 'năm 2025', 'next year'],
      '2023': ['2023', 'năm 2023', 'last year'],
    };
    
    // Kiểm tra từ khóa phổ biến
    for (const [keyword, variations] of Object.entries(keywordMap)) {
      if (normalizedQuery.includes(keyword)) {
        for (const variation of variations) {
          const normalizedVariation = variation.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          if (normalizedText.includes(normalizedVariation)) return true;
        }
      }
    }
    
    // Tìm kiếm theo từng từ riêng lẻ
    const queryWords = normalizedQuery.split(/\s+/).filter(word => word.length > 1);
    for (const word of queryWords) {
      if (normalizedText.includes(word)) return true;
    }
    
    return false;
  };

  // Tạo suggestions dựa trên query và documents với tìm kiếm toàn cục
  const getSearchSuggestions = (query: string) => {
    if (!query.trim()) return [];
    
    const suggestions: Array<{
      text: string, 
      type: 'history' | 'popular' | 'document' | 'subject' | 'class', 
      count?: number,
      url?: string
    }> = [];
    
    // Thêm lịch sử tìm kiếm
    searchHistory.forEach(history => {
      if (history.toLowerCase().includes(query.toLowerCase())) {
        suggestions.push({ text: history, type: 'history' });
      }
    });
    
    // Thêm tìm kiếm phổ biến
    const popularSearches = [
      'đề thi toán lớp 12', 'giáo án văn học', 'chuyên đề hóa học',
      'sáng kiến kinh nghiệm', 'bài tập vật lý', 'ôn tập tiếng anh',
      'trắc nghiệm sinh học', 'luyện thi thpt quốc gia', 'đề thi thử 2025'
    ];
    
    popularSearches.forEach(popular => {
      if (popular.toLowerCase().includes(query.toLowerCase())) {
        suggestions.push({ text: popular, type: 'popular' });
      }
    });
    
    // Thêm suggestions từ subjects (môn học)
    subjects.forEach(subject => {
      if (smartSearch(subject, query)) {
        const subjectSlug = subject.toLowerCase().replace(/\s+/g, '-').replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
          .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
          .replace(/[ìíịỉĩ]/g, 'i')
          .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
          .replace(/[ùúụủũưừứựửữ]/g, 'u')
          .replace(/[ỳýỵỷỹ]/g, 'y')
          .replace(/đ/g, 'd');
        suggestions.push({ 
          text: `Môn ${subject}`, 
          type: 'subject',
          url: `/documents/${subjectSlug}`
        });
      }
    });
    
    // Thêm suggestions từ classes (lớp)
    classes.forEach(cls => {
      if (smartSearch(cls, query)) {
        suggestions.push({ 
          text: `Lớp ${cls}`, 
          type: 'class'
        });
      }
    });
    
    // Thêm suggestions từ documents với tìm kiếm toàn cục
    const matchingDocs = documents.filter(doc => {
      const searchableText = [
        doc.title,
        doc.description,
        doc.author,
        doc.subject,
        doc.class,
        ...doc.tags
      ].join(' ');
      return smartSearch(searchableText, query);
    }).slice(0, 5); // Giới hạn 5 kết quả

    matchingDocs.forEach(doc => {
      suggestions.push({
        text: doc.title,
        type: 'document',
        count: doc.downloads,
        url: `/documents/detail/${doc.id}`
      });
    });
    
    return suggestions;
  };

  // Lấy sản phẩm gợi ý (tài liệu phổ biến)
  const getSuggestedProducts = () => {
    return documents
      .sort((a, b) => b.downloads - a.downloads)
      .slice(0, 6)
      .map(doc => ({
        ...doc,
        price: Math.floor(Math.random() * 50000) + 10000, // Giá ngẫu nhiên
        originalPrice: Math.floor(Math.random() * 80000) + 15000,
        discount: Math.floor(Math.random() * 30) + 10
      }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Lưu vào lịch sử tìm kiếm
      const newHistory = [searchQuery, ...searchHistory.filter(h => h !== searchQuery)].slice(0, 10);
      setSearchHistory(newHistory);
      
      // Chuyển đến trang search
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSearchSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    // Lưu vào lịch sử tìm kiếm
    const newHistory = [suggestion, ...searchHistory.filter(h => h !== suggestion)].slice(0, 10);
    setSearchHistory(newHistory);
    
    // Chuyển đến trang search
    router.push(`/search?q=${encodeURIComponent(suggestion)}`);
    setShowSearchSuggestions(false);
  };

  const handleSuggestionClickWithUrl = (suggestion: { text: string; url?: string }) => {
    if (suggestion.url) {
      router.push(suggestion.url);
    } else {
      handleSuggestionClick(suggestion.text);
    }
    setShowSearchSuggestions(false);
  };

  const handleInputFocus = () => {
    setIsSearchFocused(true);
    setShowSearchSuggestions(true);
  };

  const handleInputBlur = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
    }
    closeTimeout.current = setTimeout(() => {
      setIsSearchFocused(false);
      setShowSearchSuggestions(false);
    }, 200);
  };

  const handleCategoryMenuEnter = () => {
    if (categoryTimeout.current) {
      clearTimeout(categoryTimeout.current);
    }
    setCategoryMenuOpen(true);
  };

  const handleCategoryMenuLeave = () => {
    categoryTimeout.current = setTimeout(() => {
      setCategoryMenuOpen(false);
      setActiveCategory(null);
    }, 300);
  };

  const handleCategoryEnter = (categoryId: string) => {
    if (categoryTimeout.current) {
      clearTimeout(categoryTimeout.current);
    }
    setActiveCategory(categoryId);
  };

  const handleCategoryLeave = () => {
    categoryTimeout.current = setTimeout(() => {
      setActiveCategory(null);
    }, 300);
  };

  // Effect để hiển thị suggestions khi có query
  useEffect(() => {
    if (searchQuery.trim() && isSearchFocused) {
      setShowSearchSuggestions(true);
    } else if (!searchQuery.trim()) {
      setShowSearchSuggestions(false);
    }
  }, [searchQuery, isSearchFocused]);

  return (
    <header className="sticky top-0 z-50 bg-white/95 border-b border-gray-100 shadow-lg font-sans backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex items-center h-20 gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-4 group flex-shrink-0">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl">
              <span className="text-white font-bold text-2xl">📚</span>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900 font-sans tracking-tight">StudyPro</h1>
              <p className="text-xs text-gray-400 -mt-1 font-medium">Thư viện giáo dục số 1</p>
            </div>
          </Link>
          {/* Search Bar */}
          <div className="flex-1 max-w-3xl mx-8">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  placeholder="Tìm giáo án, đề thi, chuyên đề, sáng kiến kinh nghiệm..."
                  className="w-full px-5 py-4 pl-14 pr-14 text-lg text-gray-900 bg-gray-50 border border-gray-200 rounded-2xl focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 shadow-sm placeholder-gray-400"
                />
                {/* Search Icon là nút submit */}
                <button type="submit" className="absolute left-5 top-1/2 -translate-y-1/2 p-0 m-0 bg-transparent border-0 cursor-pointer">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                </button>
                {/* Search Suggestions Popup - CellphoneS Style */}
                {showSearchSuggestions && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 max-h-[28rem] overflow-y-auto p-0">
                    <div className="p-4 pb-2 border-b border-gray-100">
                      {/* Gợi ý từ khóa hot */}
                      <div className="mb-2">
                        <div className="text-xs font-semibold text-gray-500 mb-1 flex items-center gap-2"><span className="text-orange-500">🔥</span> Từ khóa hot</div>
                        <div className="flex flex-wrap gap-2">
                          {["đề thi toán 12","giáo án văn","chuyên đề hóa","tài liệu miễn phí","tài liệu mới","luyện thi thpt","bài tập vật lý"].map(kw => (
                            <button key={kw} onClick={() => handleSuggestionClick(kw)} className="px-3 py-1 bg-orange-50 hover:bg-orange-100 rounded-full text-xs text-orange-700 font-medium transition-colors">{kw}</button>
                          ))}
                        </div>
                      </div>
                      {/* Bộ lọc nhanh */}
                      <div className="mb-2">
                        <div className="text-xs font-semibold text-gray-500 mb-1 flex items-center gap-2"><span className="text-blue-500">⚡</span> Bộ lọc nhanh</div>
                        <div className="flex flex-wrap gap-2">
                          {subjects.slice(0,4).map(subject => (
                            <button key={subject} onClick={() => handleSuggestionClick(subject)} className="px-3 py-1 bg-blue-50 hover:bg-blue-100 rounded-full text-xs text-blue-700 font-medium transition-colors">{subject}</button>
                          ))}
                          {classes.slice(0,3).map(cls => (
                            <button key={cls} onClick={() => handleSuggestionClick(cls)} className="px-3 py-1 bg-purple-50 hover:bg-purple-100 rounded-full text-xs text-purple-700 font-medium transition-colors">{cls}</button>
                          ))}
                          {["Đề thi","Giáo án","Chuyên đề"].map(type => (
                            <button key={type} onClick={() => handleSuggestionClick(type)} className="px-3 py-1 bg-green-50 hover:bg-green-100 rounded-full text-xs text-green-700 font-medium transition-colors">{type}</button>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* Gợi ý tài liệu nổi bật, miễn phí, mới */}
                    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 border-b border-gray-100">
                      {[...documents.filter(d=>d.price===0).slice(0,2),...documents.slice(0,2),...documents.sort((a,b)=>b.createdAt?.localeCompare(a.createdAt||"")||0).slice(0,2)].map(doc => (
                        <Link key={doc.id} href={`/documents/${createSlug(doc.subject)}/${createSlug(doc.subject+"-"+doc.class)}/${createSlug(doc.title)}`} className="group block">
                          <div className="bg-gray-50 rounded-xl p-3 hover:bg-blue-50 transition-colors flex gap-3 items-center shadow-sm">
                            <img src={doc.image||"/file.svg"} alt={doc.title} className="w-10 h-14 object-cover rounded-lg border bg-white" />
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-semibold text-gray-900 truncate group-hover:text-blue-700">{doc.title}</div>
                              <div className="text-xs text-gray-500">{doc.subject} • {doc.class}</div>
                              <div className="flex gap-2 items-center mt-1">
                                {doc.price===0 && <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-bold">Miễn phí</span>}
                                {doc.createdAt && (new Date().getTime()-new Date(doc.createdAt).getTime()<1000*60*60*24*14) && <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs font-bold">Mới</span>}
                                <span className="text-yellow-500">★ {doc.rating.toFixed(1)}</span>
                                <span className="text-blue-600 font-bold">{doc.price===0?"Miễn phí":doc.price.toLocaleString("vi-VN")+"₫"}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    {/* Gợi ý theo lịch sử, popular, document, subject, class (giữ nguyên logic cũ) */}
                    <div className="p-4">
                      {searchQuery.trim() && (
                        <div className="mb-2">
                          <div className="text-xs font-semibold text-gray-500 mb-1 flex items-center gap-2"><span className="text-blue-400">🔎</span> Có phải bạn muốn tìm</div>
                          <div className="space-y-2">
                            {getSearchSuggestions(searchQuery).slice(0, 5).map((suggestion, index) => (
                              <button
                                key={index}
                                onClick={() => handleSuggestionClickWithUrl(suggestion)}
                                className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors group flex items-center gap-3"
                              >
                                <div className="flex-shrink-0">
                                  {suggestion.type === 'history' && (<span className="text-gray-400">🕒</span>)}
                                  {suggestion.type === 'popular' && (<span className="text-orange-500">🔥</span>)}
                                  {suggestion.type === 'document' && (<span className="text-blue-500">📄</span>)}
                                  {suggestion.type === 'subject' && (<span className="text-green-500">📚</span>)}
                                  {suggestion.type === 'class' && (<span className="text-purple-500">🎓</span>)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-gray-900 font-medium truncate">{suggestion.text}</div>
                                  {suggestion.type === 'document' && suggestion.count && (
                                    <div className="text-xs text-gray-500">{suggestion.count.toLocaleString()} lượt tải</div>
                                  )}
                                </div>
                                <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
          {/* Menu phải: tối ưu spacing, icon, CTA */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {/* Menu Tài liệu với Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleCategoryMenuEnter}
              onMouseLeave={handleCategoryMenuLeave}
            >
              <button className="flex items-center gap-2 px-4 py-2 font-medium text-gray-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-50">
                <span>📚</span>
                Tài liệu
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {categoryMenuOpen && (
                <div className="absolute left-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-30">
                  <div className="p-4">
                    {/* Tất cả tài liệu */}
                    <div className="mb-4">
                      <Link 
                        href="/documents"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-semibold"
                      >
                        <span className="text-xl">📚</span>
                        <div>
                          <div className="font-bold">Tất cả tài liệu</div>
                          <div className="text-xs text-gray-500">Xem toàn bộ tài liệu</div>
                        </div>
                      </Link>
                    </div>

                    {/* Theo môn học */}
                    <div className="mb-4">
                      <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span>📖</span>
                        Theo môn học
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {subjects.map((subject) => {
                          const subjectDocs = documents.filter(doc => doc.subject === subject);
                          
                          return (
                            <div
                              key={subject}
                              className="relative group"
                              onMouseEnter={() => handleCategoryEnter(subject)}
                              onMouseLeave={handleCategoryLeave}
                            >
                              <Link 
                                href={`/documents/${subject.toLowerCase().replace(/\s+/g, '-').replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
                                  .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
                                  .replace(/[ìíịỉĩ]/g, 'i')
                                  .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
                                  .replace(/[ùúụủũưừứựửữ]/g, 'u')
                                  .replace(/[ỳýỵỷỹ]/g, 'y')
                                  .replace(/đ/g, 'd')}`}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                              >
                                <span className="text-sm">📚</span>
                                <div className="flex-1">
                                  <div className="font-medium text-sm">{subject}</div>
                                  <div className="text-xs text-gray-500">{subjectDocs.length} tài liệu</div>
                                </div>
                                <svg className="w-3 h-3 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </Link>

                              {/* Dropdown cấp 2 - Lớp học */}
                              {activeCategory === subject && (
                                <div className="absolute left-full top-0 ml-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-40">
                                  <div className="p-3">
                                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">Lớp học</h4>
                                    <div className="space-y-1">
                                      {classes.map((cls) => {
                                        const classDocs = subjectDocs.filter(doc => doc.class === cls);
                                        return (
                                          <Link
                                            key={cls}
                                            href={`/search?subject=${encodeURIComponent(subject)}&class=${encodeURIComponent(cls)}`}
                                            className="flex items-center justify-between px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm"
                                          >
                                            <span>{cls}</span>
                                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                              {classDocs.length}
                                            </span>
                                          </Link>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Theo loại tài liệu */}
                    <div className="mb-4">
                      <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span>📄</span>
                        Theo loại tài liệu
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        <Link href="/search?category=de-thi" className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                          <span>📝</span>
                          <div>
                            <div className="font-medium text-sm">Đề thi</div>
                            <div className="text-xs text-gray-500">Đề thi các môn</div>
                          </div>
                        </Link>
                        <Link href="/search?category=giao-an" className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                          <span>📋</span>
                          <div>
                            <div className="font-medium text-sm">Giáo án</div>
                            <div className="text-xs text-gray-500">Giáo án Word</div>
                          </div>
                        </Link>
                        <Link href="/search?category=chuyen-de" className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                          <span>📚</span>
                          <div>
                            <div className="font-medium text-sm">Chuyên đề</div>
                            <div className="text-xs text-gray-500">Chuyên đề bài tập</div>
                          </div>
                        </Link>
                        <Link href="/search?category=sang-kien" className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                          <span>💡</span>
                          <div>
                            <div className="font-medium text-sm">Sáng kiến</div>
                            <div className="text-xs text-gray-500">Sáng kiến kinh nghiệm</div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* Tài khoản - chỉ hiện khi đã đăng nhập */}
            {isLoggedIn && (
              <button className="flex items-center gap-2 px-5 py-3 font-semibold text-gray-700 hover:text-blue-600 transition-colors rounded-xl hover:bg-gray-100 shadow-sm bg-white/80">
                <div className="w-9 h-9 bg-gradient-to-r from-gray-300 to-gray-500 rounded-full flex items-center justify-center shadow">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 8-4 8-4s8 0 8 4"/></svg>
                </div>
                <span className="hidden sm:inline">Tài khoản</span>
              </button>
            )}
            {/* Giỏ hàng */}
            <Link href="/cart" className="relative flex items-center gap-2 px-5 py-3 font-semibold text-gray-700 hover:text-blue-600 transition-colors rounded-xl hover:bg-gray-100 shadow-sm bg-white/80 group" title="Xem giỏ hàng">
              <span className="relative">
                <svg className="w-8 h-8 text-gray-500 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow animate-bounce-in">{cartCount}</span>
                )}
              </span>
              <span>Giỏ hàng</span>
            </Link>
            {/* Đăng nhập CTA */}
            <Button onClick={() => router.push('/login')} className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-2xl font-bold shadow-lg transition-colors text-base">
              Đăng nhập
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
} 