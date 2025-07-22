'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Skeleton, ContentSkeleton } from '@/components/ui/LoadingSkeleton';
import { documents, subjects, classes, type DocumentType, createSlug } from '@/lib/data';
import ShareButtons from '@/components/ui/ShareButtons';
import { Disclosure } from '@headlessui/react';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [userType, setUserType] = useState<'student' | 'teacher' | 'parent'>('student');
  const [userGrade, setUserGrade] = useState('');
  const [showAddCartSuccess, setShowAddCartSuccess] = useState(false);
  const [addedDocTitle, setAddedDocTitle] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  // Simulate user preferences (in real app, this would come from user profile)
  useEffect(() => {
    // Check if we're in browser environment
    if (typeof window !== 'undefined') {
      // Simulate detecting user type and preferences
      const savedUserType = localStorage.getItem('userType') as 'student' | 'teacher' | 'parent';
      const savedUserGrade = localStorage.getItem('userGrade');
      
      if (savedUserType) setUserType(savedUserType);
      if (savedUserGrade) setUserGrade(savedUserGrade);
    }
  }, []);

  useEffect(() => { setIsMounted(true); }, []);

  // Personalized hero content based on user type
  const getPersonalizedHero = () => {
    switch (userType) {
      case 'teacher':
        return {
          title: `Chào mừng thầy/cô đến với kho tài liệu giáo dục!`,
          subtitle: 'Khám phá bộ sưu tập giáo án, đề thi và tài liệu giảng dạy chất lượng cao',
          cta: 'Tìm tài liệu giảng dạy',
          featured: 'Giáo án mới nhất'
        };
      case 'parent':
        return {
          title: `Hỗ trợ con học tập hiệu quả`,
          subtitle: 'Tài liệu học tập chất lượng cao cho mọi cấp độ và môn học',
          cta: 'Tìm tài liệu cho con',
          featured: 'Tài liệu phổ biến'
        };
      default: // student
        return {
          title: `Học tập thông minh, thành công vượt trội`,
          subtitle: 'Kho tài liệu học tập đa dạng, chất lượng cao cho mọi môn học',
          cta: 'Bắt đầu học ngay',
          featured: 'Tài liệu nổi bật'
        };
    }
  };

  const hero = getPersonalizedHero();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Build search URL with parameters
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (selectedSubject) params.set('subject', selectedSubject);
    if (selectedClass) params.set('class', selectedClass);
    
    // Navigate to search page
    const searchUrl = `/search?${params.toString()}`;
    window.location.href = searchUrl;
  };

  // Function to handle subject selection from subject cards
  const handleSubjectSelect = (subject: string) => {
    // Convert subject name to slug for URL
    const slug = subject.toLowerCase().replace(/\s+/g, '-').replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
      .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
      .replace(/[ìíịỉĩ]/g, 'i')
      .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
      .replace(/[ùúụủũưừứựửữ]/g, 'u')
      .replace(/[ỳýỵỷỹ]/g, 'y')
      .replace(/đ/g, 'd');
    
    // Navigate to subject page
    window.location.href = `/documents/${slug}`;
  };

  // Function to handle quick search from hero section
  const handleQuickSearch = (query: string) => {
    // Navigate to search page with query
    const searchUrl = `/search?q=${encodeURIComponent(query)}`;
    window.location.href = searchUrl;
  };

  const handleAddToCart = async (documentId: string) => {
    // Simulate API call with loading state
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(`Added document ${documentId} to cart`);
    
    // Show success notification
    console.log('✅ Đã thêm vào giỏ hàng thành công!');
  };

  const tabs = [
    { key: "downloads", label: "Top tải nhiều" },
    { key: "rating", label: "Top đánh giá cao" },
    { key: "newest", label: "Mới nhất" },
    { key: "free", label: "Miễn phí" }
  ];

  // FeaturedSection - nâng cấp Card tài liệu
  function FeaturedSection() {
    const [tab, setTab] = useState("downloads");
    const [wishlistIds, setWishlistIds] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      function syncWishlist() {
        const wl = JSON.parse(localStorage.getItem('wishlist') || '[]');
        setWishlistIds(wl.map((d: any) => d.id));
      }
      window.addEventListener('wishlistUpdated', syncWishlist);
      syncWishlist();
      setTimeout(() => setLoading(false), 800); // skeleton loading
      return () => window.removeEventListener('wishlistUpdated', syncWishlist);
    }, []);
    const rankedDocs = useMemo(() => {
      let docs = documents;
      if (tab === "downloads") {
        docs = docs.slice().sort((a, b) => b.downloads - a.downloads).slice(0, 12);
      } else if (tab === "rating") {
        docs = docs.slice().sort((a, b) => b.rating - a.rating).slice(0, 12);
      } else if (tab === "newest") {
        docs = docs.slice().sort((a, b) => b.id.localeCompare(a.id)).slice(0, 12);
      } else if (tab === "free") {
        docs = docs.filter(doc => doc.price === 0).slice(0, 12);
      }
      return docs;
    }, [tab]);
    return (
      <section className="py-16 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Tài liệu nổi bật</h2>
          <div className="flex gap-4 mb-8">
            {tabs.map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`px-6 py-2 rounded-xl font-semibold transition-all ${tab === t.key ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50'}`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            {loading ? Array.from({length: 6}).map((_,i) => (
              <div key={i} className="rounded-2xl bg-white shadow-lg p-6 animate-pulse h-64 flex flex-col gap-4 min-h-[340px] max-h-[380px]">
                <div className="h-32 bg-slate-100 rounded-xl w-full"></div>
                <div className="h-4 bg-slate-100 rounded w-2/3"></div>
                <div className="h-3 bg-slate-100 rounded w-1/3"></div>
                <div className="h-3 bg-slate-100 rounded w-1/2"></div>
              </div>
            )) : rankedDocs.map(doc => {
              const isNew = doc.createdAt && (new Date().getTime()-new Date(doc.createdAt).getTime()<1000*60*60*24*14);
              const isHot = doc.downloads > 1000;
              const isFree = doc.price === 0;
              const discountPercent = doc.price && doc.price*1.2 > doc.price ? Math.round(100-(doc.price/doc.price*1.2)*100) : 0;
              return (
                <div key={doc.id} className="relative group rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-blue-200 flex flex-col p-4 w-[320px] flex-shrink-0 items-center justify-between transform transition-transform duration-300 hover:scale-105"
                  >
                  <Link href={`/documents/${createSlug(doc.subject)}/${createSlug(doc.subject + '-' + doc.class)}/${createSlug(doc.title)}`} className="block flex-1 h-full">
                    <div className="h-32 w-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center rounded-xl mb-3 overflow-hidden relative">
                      {doc.image ? (
                        <img src={doc.image} alt={doc.title} className="object-cover w-full h-full" loading="lazy" />
                      ) : (
                        <img src="/file.svg" alt="file" className="w-12 h-12 opacity-60" loading="lazy" />
                      )}
                      {isHot && <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-bold shadow animate-pulse">Hot</span>}
                      {isNew && <span className="absolute top-2 right-2 bg-purple-500 text-white px-2 py-0.5 rounded-full text-xs font-bold shadow">Mới</span>}
                      {isFree && <span className="absolute bottom-2 left-2 bg-green-500 text-white px-2 py-0.5 rounded-full text-xs font-bold shadow">Miễn phí</span>}
                      {!isFree && discountPercent > 0 && <span className="absolute bottom-2 right-2 bg-yellow-400 text-white px-2 py-0.5 rounded-full text-xs font-bold shadow">-{discountPercent}%</span>}
                    </div>
                    <div className="flex flex-col items-center space-y-1 pb-2 px-1">
                      <h3 className="tracking-tight text-base font-semibold text-slate-900 line-clamp-2 mb-0.5 text-center">{doc.title}</h3>
                      <div className="flex gap-2 text-xs text-slate-600 mb-0.5 justify-center">
                        <span>{doc.subject}</span>
                        <span>-</span>
                        <span>{doc.class}</span>
                      </div>
                      <div className="flex gap-2 text-xs text-slate-500 items-center justify-center mb-0.5">
                        <span>⭐ {doc.rating.toFixed(1)}</span>
                        <span>⬇️ {doc.downloads}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 justify-center">
                        {doc.price !== 0 && <span className="text-xs text-slate-400 line-through">{(doc.price*1.2).toLocaleString('vi-VN')}₫</span>}
                        <span className={`font-bold text-lg ${isFree ? 'text-green-600' : 'text-blue-600'}`}>{isFree ? "Miễn phí" : doc.price.toLocaleString('vi-VN') + "₫"}</span>
                      </div>
                    </div>
                  </Link>
                  {/* Chỉ giữ lại nút giỏ hàng và yêu thích */}
                  <div className="flex gap-2 px-2 pb-3 items-center justify-center mt-auto">
                    <button
                      className="flex-1 bg-white border border-green-500 text-green-600 px-4 py-2 rounded-xl font-semibold shadow transition-colors duration-200 text-sm flex items-center justify-center hover:bg-green-500 hover:text-white"
                      onClick={async (e) => {
                        e.preventDefault();
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
                        setAddedDocTitle(doc.title);
                        setShowAddCartSuccess(true);
                        setTimeout(() => setShowAddCartSuccess(false), 2000);
                      }}
                      title="Thêm vào giỏ hàng"
                    >
                      <span className="text-inherit text-xl">🛒</span>
                    </button>
                    <button
                      className={`w-10 h-10 flex items-center justify-center rounded-full border border-pink-300 text-pink-500 bg-white hover:bg-pink-100 transition text-lg font-bold shadow ${wishlistIds.includes(doc.id) ? 'bg-pink-500 text-white' : ''}`}
                      onClick={e => { e.preventDefault(); toggleWishlist(doc); }}
                      title={wishlistIds.includes(doc.id) ? 'Bỏ khỏi yêu thích' : 'Thêm vào yêu thích'}
                    >
                      ♥
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // Thêm hàm random rating cho mỗi tài liệu
  const getRandomRating = (seed: string) => {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    const rand = Math.abs(Math.sin(hash) * 10000) % 1;
    return (4.8 + rand * 0.2).toFixed(1);
  };

  // Helper: lấy lịch sử mua/xem từ localStorage
  function getUserHistory() {
    if (typeof window === 'undefined') return [];
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const viewed = JSON.parse(localStorage.getItem('viewedDocs') || '[]');
    const docIds = [
      ...orders.flatMap((o: any) => o.items.map((i: any) => i.id)),
      ...viewed
    ];
    return Array.from(new Set(docIds));
  }

  // Section: Đề xuất cho bạn - nâng cấp slider ngang, card đẹp, spacing rộng, responsive
  function PersonalizedSection() {
    const [history, setHistory] = useState<string[]>([]);
    useEffect(() => { setHistory(getUserHistory()); }, []);
    let personalizedDocs: DocumentType[] = [];
    if (userType === 'student') {
      personalizedDocs = documents.filter(doc => doc.class === userGrade || history.includes(doc.id)).slice(0, 12);
    } else if (userType === 'teacher') {
      personalizedDocs = documents.filter(doc => doc.category === 'Giáo án' || doc.category === 'Đề thi').slice(0, 12);
    } else {
      personalizedDocs = documents.filter(doc => doc.price > 0 && doc.rating > 4.7).slice(0, 12);
    }
    if (personalizedDocs.length === 0) personalizedDocs = documents.slice(0, 12);
    return (
      <section className="py-12 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Đề xuất cho bạn</h2>
            <Link href="/documents" className="text-blue-600 font-semibold hover:underline text-sm">Xem thêm</Link>
          </div>
          <div className="overflow-x-auto hide-scrollbar pb-2">
            <div className="flex gap-6 min-w-[340px]">
              {personalizedDocs.map(doc => (
                <Link key={doc.id} href={`/documents/${createSlug(doc.subject)}/${createSlug(doc.subject + '-' + doc.class)}/${createSlug(doc.title)}`} className="block min-w-[260px] max-w-[260px] flex-shrink-0 group">
                  <div className="rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-transparent group-hover:border-blue-200 p-4 flex flex-col h-full min-h-[340px] max-h-[380px]">
                    <div className="h-32 w-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center rounded-xl mb-3 overflow-hidden relative">
                      {doc.image ? (
                        <img src={doc.image} alt={doc.title} className="object-cover w-full h-full" loading="lazy" />
                      ) : (
                        <img src="/file.svg" alt="file" className="w-12 h-12 opacity-60" loading="lazy" />
                      )}
                    </div>
                    <h3 className="tracking-tight text-base font-semibold text-slate-900 line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">{doc.title}</h3>
                    <div className="flex gap-2 text-xs text-slate-600 mb-1">
                      <span>{doc.subject}</span>
                      <span>-</span>
                      <span>{doc.class}</span>
                    </div>
                    <div className="flex gap-3 text-xs text-slate-500">
                      <span>⭐ {doc.rating.toFixed(1)}</span>
                      <span>⬇️ {doc.downloads}</span>
                    </div>
                    <div className="text-blue-600 font-bold text-base mt-1">{doc.price === 0 ? "Miễn phí" : doc.price.toLocaleString('vi-VN') + "₫"}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Section: Tài liệu bán chạy hôm nay
  function HotTodaySection() {
    const hotDocs = useMemo(() => documents.slice().sort((a, b) => b.downloads - a.downloads).slice(0, 6), []);
    return (
      <section className="py-12 bg-gradient-to-br from-yellow-50 via-white to-pink-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Tài liệu bán chạy hôm nay</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotDocs.map(doc => (
              <Link key={doc.id} href={`/documents/${createSlug(doc.subject)}/${createSlug(doc.subject + '-' + doc.class)}/${createSlug(doc.title)}`}>
                <Card className="hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-yellow-200 rounded-2xl p-3 w-full">
                  <div className="flex flex-col gap-1">
                    <h3 className="tracking-tight text-base font-semibold text-slate-900 line-clamp-2 mb-0.5">{doc.title}</h3>
                    <div className="flex gap-2 text-xs text-slate-600 mb-0.5">
                      <span>{doc.subject}</span>
                      <span>-</span>
                      <span>{doc.class}</span>
                    </div>
                    <div className="flex gap-2 text-xs text-slate-500 items-center">
                      <span>⭐ {doc.rating.toFixed(1)}</span>
                      <span>⬇️ {doc.downloads}</span>
                    </div>
                    <div className="text-blue-600 font-bold text-base mt-0.5">{doc.price === 0 ? "Miễn phí" : doc.price.toLocaleString('vi-VN') + "₫"}</div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // FeedbackSection - nâng cấp slider ngang, avatar tròn, trích dẫn review, hiệu ứng mượt, carousel tự động
  function FeedbackSection() {
    const feedbacks = useMemo(() => {
      const all = documents.flatMap(doc => (doc.reviews || []).map(r => ({ ...r, docTitle: doc.title })));
      return all.slice(0, 12);
    }, []);
    const [current, setCurrent] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    useEffect(() => {
      intervalRef.current = setInterval(() => {
        setCurrent(c => (c + 1) % feedbacks.length);
      }, 4000);
      return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, [feedbacks.length]);
    const goTo = (idx: number) => setCurrent(idx);
    const prev = () => setCurrent(c => (c - 1 + feedbacks.length) % feedbacks.length);
    const next = () => setCurrent(c => (c + 1) % feedbacks.length);
    // Random pastel color for avatar
    const getAvatarColor = (name: string) => {
      const colors = ['bg-blue-100 text-blue-600','bg-pink-100 text-pink-600','bg-green-100 text-green-600','bg-yellow-100 text-yellow-600','bg-purple-100 text-purple-600','bg-emerald-100 text-emerald-600'];
      let hash = 0; for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
      return colors[Math.abs(hash) % colors.length];
    };
    return (
      <section className="py-12 bg-gradient-to-br from-white via-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Khách hàng nói gì?</h2>
          <div className="relative">
            <div className="flex items-center justify-center gap-4 mb-4">
              <button onClick={prev} className="w-10 h-10 rounded-full bg-slate-100 hover:bg-blue-200 flex items-center justify-center text-xl font-bold shadow">‹</button>
              <div className="w-full overflow-hidden">
                <div className="flex transition-transform duration-700" style={{ transform: `translateX(-${current * 340}px)` }}>
                  {feedbacks.map((fb, idx) => (
                    <div key={fb.id + fb.docTitle} className="min-w-[320px] max-w-[320px] flex-shrink-0">
                      <div className="p-6 rounded-2xl shadow border border-slate-100 bg-white flex flex-col h-full hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shadow ${getAvatarColor(fb.userName)}`}>{fb.userName.charAt(0)}</div>
                          <div>
                            <div className="font-semibold text-slate-900">{fb.userName}</div>
                            <div className="text-xs text-slate-500">Đánh giá: <span className="text-yellow-500 font-bold">{fb.rating}</span></div>
                          </div>
                        </div>
                        <div className="italic text-slate-700 mb-2 line-clamp-3">"{fb.comment}"</div>
                        <div className="text-xs text-slate-500">Về tài liệu: <span className="font-semibold">{fb.docTitle}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={next} className="w-10 h-10 rounded-full bg-slate-100 hover:bg-blue-200 flex items-center justify-center text-xl font-bold shadow">›</button>
            </div>
            <div className="flex justify-center gap-2 mt-2">
              {feedbacks.map((_, idx) => (
                <button key={idx} onClick={() => goTo(idx)} className={`w-3 h-3 rounded-full ${current === idx ? 'bg-blue-600' : 'bg-slate-300'}`}></button>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Section: Hướng dẫn mua & cam kết chất lượng
  function GuideAndCommitSection() {
    return (
      <section className="py-12 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Hướng dẫn mua tài liệu & Cam kết chất lượng</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow p-6 border border-slate-100">
              <h3 className="font-semibold text-blue-700 mb-2">Các bước mua tài liệu</h3>
              <ol className="list-decimal pl-5 space-y-1 text-slate-700">
                <li>Chọn tài liệu phù hợp từ danh sách hoặc tìm kiếm.</li>
                <li>Bấm "Thêm vào giỏ hàng" hoặc "Mua ngay".</li>
                <li>Vào giỏ hàng, kiểm tra và tiến hành thanh toán.</li>
                <li>Nhận tài liệu ngay sau khi thanh toán thành công.</li>
              </ol>
            </div>
            <div className="bg-white rounded-2xl shadow p-6 border border-slate-100">
              <h3 className="font-semibold text-green-700 mb-2">Cam kết chất lượng</h3>
              <ul className="list-disc pl-5 space-y-1 text-slate-700">
                <li>Tài liệu bản quyền, cập nhật liên tục.</li>
                <li>Hỗ trợ 24/7, đổi trả nếu file lỗi.</li>
                <li>Bảo mật thông tin khách hàng tuyệt đối.</li>
                <li>Đa dạng hình thức thanh toán, nhận file nhanh chóng.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Section: Flash Sale
  function FlashSaleSection() {
    const [timeLeft, setTimeLeft] = useState(0);
    const saleDocs = useMemo(() => documents.filter(doc => doc.price > 0), []);
    const [flashSaleIndex, setFlashSaleIndex] = useState(0);
    const visibleCount = 4;
    const canPrev = flashSaleIndex > 0;
    const canNext = flashSaleIndex + visibleCount < saleDocs.length;
    useEffect(() => {
      // Flash sale kết thúc sau 2 giờ kể từ khi truy cập
      const end = Date.now() + 2 * 60 * 60 * 1000;
      const timer = setInterval(() => {
        setTimeLeft(Math.max(0, Math.floor((end - Date.now()) / 1000)));
      }, 1000);
      return () => clearInterval(timer);
    }, []);
    const h = Math.floor(timeLeft / 3600);
    const m = Math.floor((timeLeft % 3600) / 60);
    const s = timeLeft % 60;
    return (
      <section className="py-8 bg-gradient-to-br from-pink-50 to-yellow-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
            <h2 className="text-xl md:text-2xl font-bold text-pink-700 flex items-center gap-2 text-center md:text-left w-full md:w-auto justify-center md:justify-start">
              ⚡ FLASH SALE - GIẢM GIÁ SỐC
            </h2>
            <div className="flex items-center gap-2 text-base font-semibold text-red-600 bg-white/90 px-4 py-2 rounded-xl shadow">
              ⏰ {h.toString().padStart(2, '0')}:{m.toString().padStart(2, '0')}:{s.toString().padStart(2, '0')}
            </div>
          </div>
          <div className="relative pb-2">
            <button
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-pink-300 rounded-full w-10 h-10 flex items-center justify-center shadow hover:bg-pink-100 transition disabled:opacity-40 disabled:cursor-not-allowed`}
              onClick={() => setFlashSaleIndex(i => Math.max(0, i - 3))}
              disabled={!canPrev}
              aria-label="Xem trái"
            >
              <span className="text-2xl text-pink-500">&#8592;</span>
            </button>
            <button
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-pink-300 rounded-full w-10 h-10 flex items-center justify-center shadow hover:bg-pink-100 transition disabled:opacity-40 disabled:cursor-not-allowed`}
              onClick={() => setFlashSaleIndex(i => Math.min(saleDocs.length - visibleCount, i + 3))}
              disabled={!canNext}
              aria-label="Xem phải"
            >
              <span className="text-2xl text-pink-500">&#8594;</span>
            </button>
            <div className="overflow-hidden w-full">
              <div
                className="flex gap-4 transition-transform duration-500"
                style={{ transform: `translateX(-${flashSaleIndex * 336}px)` }}
              >
                {saleDocs.map((doc, idx) => (
                  <div
                    key={doc.id}
                    className="relative group rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-blue-200 flex flex-col p-4 w-[320px] flex-shrink-0 items-center justify-between transform transition-transform duration-300 hover:scale-105"
                  >
                    <Link
                      href={`/documents/${createSlug(doc.subject)}/${createSlug(doc.subject + '-' + doc.class)}/${createSlug(doc.title)}`}
                      className="flex flex-col"
                    >
                      <div className="absolute top-2 left-2 bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow animate-pulse">
                        FLASH SALE
                      </div>
                      <h3 className="tracking-tight text-base font-semibold text-slate-900 line-clamp-2 mb-1 mt-6 text-center">
                        {doc.title}
                      </h3>
                      <div className="flex gap-2 text-xs text-slate-600 mb-1 justify-center">
                        <span>{doc.subject}</span>
                        <span>-</span>
                        <span>{doc.class}</span>
                      </div>
                      <div className="flex gap-3 text-xs text-slate-500 mb-1 justify-center">
                        <span>⭐ {doc.rating.toFixed(1)}</span>
                        <span>⬇️ {doc.downloads}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 justify-center">
                        <span className="text-red-600 font-bold text-lg">
                          {(doc.price * 0.7).toLocaleString('vi-VN')}₫
                        </span>
                        <span className="text-xs text-slate-400 line-through">
                          {doc.price.toLocaleString('vi-VN')}₫
                        </span>
                        <span className="bg-yellow-400 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                          -30%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-pink-100 rounded-full mt-2">
                        <div
                          className="h-2 bg-pink-500 rounded-full transition-all"
                          style={{ width: `${80 - idx * 15}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-pink-700 font-semibold mt-0.5 text-center">
                        {80 - idx * 15} suất còn lại
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Popup đăng ký nhận ưu đãi/email
  function EmailPopup() {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);
    useEffect(() => {
      if (typeof window !== 'undefined' && !localStorage.getItem('emailPopupShown')) {
        setTimeout(() => setShow(true), 2000);
        localStorage.setItem('emailPopupShown', '1');
      }
    }, []);
    if (!show) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">Nhận ưu đãi đặc biệt!</h2>
          <p className="mb-4 text-slate-700">Nhập email để nhận mã giảm giá và tài liệu miễn phí mỗi tuần.</p>
          {success ? (
            <div className="text-green-600 font-semibold">Đăng ký thành công! Hãy kiểm tra email của bạn.</div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSuccess(true); }}>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Nhập email của bạn" className="w-full px-4 py-2 border rounded-xl mb-4" />
              <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold">Nhận ưu đãi</button>
            </form>
          )}
          <button className="mt-4 text-slate-500 hover:underline" onClick={() => setShow(false)}>Đóng</button>
        </div>
      </div>
    );
  }

  // Wishlist logic
  function toggleWishlist(doc: DocumentType) {
    if (typeof window === 'undefined') return;
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const exists = wishlist.some((d: any) => d.id === doc.id);
    let newList;
    if (exists) newList = wishlist.filter((d: any) => d.id !== doc.id);
    else newList = [doc, ...wishlist];
    localStorage.setItem('wishlist', JSON.stringify(newList));
    window.dispatchEvent(new CustomEvent('wishlistUpdated', { detail: { items: newList } }));
  }
  function isInWishlist(doc: DocumentType) {
    if (typeof window === 'undefined') return false;
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    return wishlist.some((d: any) => d.id === doc.id);
  }

  // Sticky CTA cho mobile - nâng cấp UI/UX, spacing, icon, hiệu ứng
  function StickyCTA() {
    return (
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 block md:hidden">
        <Link href="/documents" className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-5 rounded-3xl shadow-2xl text-xl font-extrabold animate-bounce-in hover:scale-105 transition-all duration-300">
          <span className="text-2xl">🛒</span>
          <span>Mua tài liệu ngay</span>
        </Link>
      </div>
    );
  }

  // Section: Tài liệu miễn phí
  function FreeDocumentsSection() {
    const freeDocs = documents.filter(doc => doc.price === 0).slice(0, 12);
    if (freeDocs.length === 0) return null;
    return (
      <section className="py-12 bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-green-700">Tài liệu miễn phí</h2>
            <Link href="/documents/free" className="text-green-600 font-semibold hover:underline text-sm">Xem tất cả</Link>
          </div>
          <div className="overflow-x-auto hide-scrollbar pb-2">
            <div className="flex gap-6 min-w-[340px]">
              {freeDocs.map(doc => (
                <Link key={doc.id} href={`/documents/${createSlug(doc.subject)}/${createSlug(doc.subject + '-' + doc.class)}/${createSlug(doc.title)}`} className="block min-w-[260px] max-w-[260px] flex-shrink-0 group">
                  <div className="rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-transparent group-hover:border-green-200 p-4 flex flex-col h-full min-h-[340px] max-h-[380px]">
                    <div className="h-32 w-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center rounded-xl mb-3 overflow-hidden relative">
                      {doc.image ? (
                        <img src={doc.image} alt={doc.title} className="object-cover w-full h-full" loading="lazy" />
                      ) : (
                        <img src="/file.svg" alt="file" className="w-12 h-12 opacity-60" loading="lazy" />
                      )}
                      <span className="absolute top-2 left-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow">Miễn phí</span>
                    </div>
                    <h3 className="tracking-tight text-base font-semibold text-slate-900 line-clamp-2 mb-1 group-hover:text-green-700 transition-colors">{doc.title}</h3>
                    <div className="flex gap-2 text-xs text-slate-600 mb-1">
                      <span>{doc.subject}</span>
                      <span>-</span>
                      <span>{doc.class}</span>
                    </div>
                    <div className="flex gap-3 text-xs text-slate-500">
                      <span>⭐ {doc.rating.toFixed(1)}</span>
                      <span>⬇️ {doc.downloads}</span>
                    </div>
                    <div className="text-green-600 font-bold text-base mt-1">Miễn phí</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
  // Section: Tài liệu mới
  function NewDocumentsSection() {
    const newDocs = documents.filter(doc => doc.createdAt && (new Date().getTime()-new Date(doc.createdAt).getTime()<1000*60*60*24*14)).slice(0, 12);
    if (newDocs.length === 0) return null;
    return (
      <section className="py-12 bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-purple-700">Tài liệu mới</h2>
            <Link href="/documents/new" className="text-purple-600 font-semibold hover:underline text-sm">Xem tất cả</Link>
          </div>
          <div className="overflow-x-auto hide-scrollbar pb-2">
            <div className="flex gap-6 min-w-[340px]">
              {newDocs.map(doc => (
                <Link key={doc.id} href={`/documents/${createSlug(doc.subject)}/${createSlug(doc.subject + '-' + doc.class)}/${createSlug(doc.title)}`} className="block min-w-[260px] max-w-[260px] flex-shrink-0 group">
                  <div className="rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-transparent group-hover:border-purple-200 p-4 flex flex-col h-full min-h-[340px] max-h-[380px]">
                    <div className="h-32 w-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center rounded-xl mb-3 overflow-hidden relative">
                      {doc.image ? (
                        <img src={doc.image} alt={doc.title} className="object-cover w-full h-full" loading="lazy" />
                      ) : (
                        <img src="/file.svg" alt="file" className="w-12 h-12 opacity-60" loading="lazy" />
                      )}
                      <span className="absolute top-2 left-2 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow">Mới</span>
                    </div>
                    <h3 className="tracking-tight text-base font-semibold text-slate-900 line-clamp-2 mb-1 group-hover:text-purple-700 transition-colors">{doc.title}</h3>
                    <div className="flex gap-2 text-xs text-slate-600 mb-1">
                      <span>{doc.subject}</span>
                      <span>-</span>
                      <span>{doc.class}</span>
                    </div>
                    <div className="flex gap-3 text-xs text-slate-500">
                      <span>⭐ {doc.rating.toFixed(1)}</span>
                      <span>⬇️ {doc.downloads}</span>
                    </div>
                    <div className="text-purple-600 font-bold text-base mt-1">{doc.price === 0 ? "Miễn phí" : doc.price.toLocaleString('vi-VN') + "₫"}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Section: Combo tài liệu/mua kèm
  function ComboDocumentsSection() {
    // Gợi ý combo: lấy 2-3 tài liệu cùng môn/lớp, ưu đãi combo
    const combos = [];
    for (let i = 0; i < documents.length - 2; i++) {
      const d1 = documents[i];
      const d2 = documents[i+1];
      const d3 = documents[i+2];
      if (d1.subject === d2.subject && d2.subject === d3.subject && d1.class === d2.class && d2.class === d3.class) {
        combos.push([d1, d2, d3]);
        if (combos.length >= 6) break;
      }
    }
    if (combos.length === 0) return null;
    return (
      <section className="py-12 bg-gradient-to-br from-yellow-50 via-white to-pink-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-yellow-700">Combo tài liệu ưu đãi</h2>
            <Link href="/offers/combo" className="text-yellow-600 font-semibold hover:underline text-sm">Xem tất cả</Link>
          </div>
          <div className="overflow-x-auto hide-scrollbar pb-2">
            <div className="flex gap-6 min-w-[340px]">
              {combos.map((combo, idx) => {
                const comboPrice = Math.round((combo[0].price + combo[1].price + combo[2].price) * 0.85);
                return (
                  <div key={idx} className="min-w-[340px] max-w-[340px] flex-shrink-0 group rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent group-hover:border-yellow-200 p-4 flex flex-col h-full min-h-[340px] max-h-[380px] relative">
                    <div className="flex gap-2 mb-3">
                      {combo.map(doc => (
                        <div key={doc.id} className="w-1/3">
                          <img src={doc.image || '/file.svg'} alt={doc.title} className="w-full h-20 object-cover rounded-xl border bg-slate-50" loading="lazy" />
                        </div>
                      ))}
                    </div>
                    <div className="mb-2 font-semibold text-slate-900 line-clamp-2">{combo.map(doc => doc.title).join(' + ')}</div>
                    <div className="flex gap-2 text-xs text-slate-600 mb-1">
                      <span>{combo[0].subject}</span>
                      <span>-</span>
                      <span>{combo[0].class}</span>
                    </div>
                    <div className="flex gap-3 text-xs text-slate-500 mb-2">
                      <span>⭐ {((combo[0].rating + combo[1].rating + combo[2].rating)/3).toFixed(1)}</span>
                      <span>⬇️ {combo.reduce((sum, d) => sum + d.downloads, 0)}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-400 line-through">{(combo[0].price + combo[1].price + combo[2].price).toLocaleString('vi-VN')}₫</span>
                      <span className="font-bold text-lg text-yellow-700">{comboPrice.toLocaleString('vi-VN')}₫</span>
                      <span className="bg-yellow-400 text-white px-2 py-0.5 rounded-full text-xs font-bold">-15% combo</span>
                    </div>
                    <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl font-semibold shadow text-sm">Mua combo</button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Section Tabs for mobile (Free, New, Combo, HotToday)
  function MobileDocumentTabs() {
    const [tab, setTab] = useState('free');
    const tabList = [
      { key: 'free', label: 'Miễn phí', component: FreeDocumentsSection },
      { key: 'new', label: 'Mới', component: NewDocumentsSection },
      { key: 'combo', label: 'Combo', component: ComboDocumentsSection },
      { key: 'hot', label: 'Bán chạy', component: HotTodaySection },
    ];
    const ActiveComponent = tabList.find(t => t.key === tab)?.component;
    return (
      <section className="block md:hidden">
        <div className="flex gap-2 mb-4 px-4">
          {tabList.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 px-4 py-2 rounded-xl font-semibold transition-all text-sm ${tab === t.key ? 'bg-blue-600 text-white shadow' : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div>
          {ActiveComponent && <ActiveComponent />}
        </div>
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <EmailPopup />
      <FlashSaleSection />
      {/* Banner ưu đãi lớn ở đầu trang */}
      <div className="w-full bg-gradient-to-r from-yellow-400 via-pink-200 to-blue-300 py-8 px-4 text-center shadow-2xl mb-8 rounded-b-3xl flex flex-col items-center justify-center gap-4 animate-fade-in-up">
        <span className="text-3xl md:text-4xl font-extrabold text-pink-700 drop-shadow block mb-2">🎉 Ưu đãi tháng 6:</span>
        <div className="text-lg md:text-xl text-slate-800 font-semibold mb-4">Giảm 10% cho đơn hàng trên 100.000₫, combo 2+ tài liệu cùng môn/lớp giảm thêm 5%!</div>
        <Link href="/documents" className="inline-block bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-blue-700 transition">Mua ngay</Link>
      </div>
      {/* Duyệt theo môn học - nâng cấp UI/UX, slider ngang cho mobile */}
      <section className="py-16 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 drop-shadow">Duyệt theo môn học</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">Chọn môn học bạn quan tâm để xem tất cả tài liệu liên quan</p>
          </div>
          <div className="pb-2">
            <div className="grid gap-8 grid-cols-2 md:grid-cols-4 grid-rows-2">
              {subjects.slice(0, 8).map((subject, index) => {
                const subjectDocs = documents.filter(doc => doc.subject === subject);
                const totalDownloads = subjectDocs.reduce((sum, doc) => sum + doc.downloads, 0);
                // Định nghĩa gradient và icon cho từng môn học
                const subjectConfig = {
                  'Toán học': { gradient: 'from-blue-500 to-cyan-500', icon: '🔢', bgGradient: 'from-blue-50 to-cyan-50', borderColor: 'hover:border-blue-300' },
                  'Văn học': { gradient: 'from-red-500 to-pink-500', icon: '📚', bgGradient: 'from-red-50 to-pink-50', borderColor: 'hover:border-red-300' },
                  'Tiếng Anh': { gradient: 'from-green-500 to-emerald-500', icon: '🌍', bgGradient: 'from-green-50 to-emerald-50', borderColor: 'hover:border-green-300' },
                  'Vật lý': { gradient: 'from-purple-500 to-indigo-500', icon: '⚡', bgGradient: 'from-purple-50 to-indigo-50', borderColor: 'hover:border-purple-300' },
                  'Hóa học': { gradient: 'from-orange-500 to-red-500', icon: '🧪', bgGradient: 'from-orange-50 to-red-50', borderColor: 'hover:border-orange-300' },
                  'Sinh học': { gradient: 'from-green-600 to-teal-500', icon: '🧬', bgGradient: 'from-green-50 to-teal-50', borderColor: 'hover:border-green-300' },
                  'Lịch sử': { gradient: 'from-amber-500 to-yellow-500', icon: '📜', bgGradient: 'from-amber-50 to-yellow-50', borderColor: 'hover:border-amber-300' },
                  'Địa lý': { gradient: 'from-teal-500 to-blue-500', icon: '🌍', bgGradient: 'from-teal-50 to-blue-50', borderColor: 'hover:border-teal-300' }
                };
                const config = subjectConfig[subject as keyof typeof subjectConfig] || { gradient: 'from-blue-400 to-purple-400', icon: '📚', bgGradient: 'from-blue-50 to-purple-50', borderColor: 'hover:border-blue-300' };
                return (
                  <button
                    key={subject}
                    onClick={() => handleSubjectSelect(subject)}
                    className={`group bg-gradient-to-br ${config.bgGradient} rounded-2xl aspect-square w-full flex flex-col items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border-2 border-gray-100 ${config.borderColor} relative overflow-hidden animate-fade-in-up`}
                  >
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white/20 to-transparent rounded-full -translate-y-6 translate-x-6"></div>
                    <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-white/10 to-transparent rounded-full translate-y-4 -translate-x-4"></div>
                    <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
                      <div className={`w-16 h-16 bg-gradient-to-br ${config.gradient} rounded-2xl flex items-center justify-center text-white text-4xl font-bold group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-xl mb-2`}>
                        {config.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors text-center">
                        {subject}
                      </h3>
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-sm text-gray-600 font-semibold">{subjectDocs.length} tài liệu</span>
                        <span className="text-xs text-gray-500">{totalDownloads.toLocaleString('vi-VN')} lượt tải</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-bounce"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6 animate-fade-in-up">
              {hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto animate-fade-in-up">
              {hero.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 animate-fade-in-up">
              <Button 
                size="lg" 
                className="text-lg px-8 py-4"
                onClick={() => { window.location.href = '/documents'; }}
              >
                {hero.cta}
              </Button>
              
              <div className="flex gap-2 bg-white/80 backdrop-blur-sm rounded-xl p-2 border border-gray-200">
                {(['student', 'teacher', 'parent'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setUserType(type);
                      if (typeof window !== 'undefined') {
                        localStorage.setItem('userType', type);
                      }
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      userType === type
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {type === 'student' ? 'Học sinh' : type === 'teacher' ? 'Giáo viên' : 'Phụ huynh'}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick search buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in-up">
              <button
                onClick={() => handleQuickSearch('đề thi')}
                className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-white hover:shadow-md transition-all duration-200"
              >
                🔍 Đề thi
              </button>
              <button
                onClick={() => handleQuickSearch('giáo án')}
                className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-white hover:shadow-md transition-all duration-200"
              >
                📚 Giáo án
              </button>
              <button
                onClick={() => handleQuickSearch('chuyên đề')}
                className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-white hover:shadow-md transition-all duration-200"
              >
                📖 Chuyên đề
              </button>
              <button
                onClick={() => handleQuickSearch('bài tập')}
                className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-white hover:shadow-md transition-all duration-200"
              >
                ✏️ Bài tập
              </button>
            </div>
          </div>
        </div>
      </section>

      <FeaturedSection />
      <PersonalizedSection />
      {/* Gom nhóm các section tài liệu thành tab trên mobile */}
      <MobileDocumentTabs />
      {/* Desktop: hiển thị các section như cũ */}
      <div className="hidden md:block">
        <FreeDocumentsSection />
        <NewDocumentsSection />
        <ComboDocumentsSection />
        <HotTodaySection />
      </div>
      <FeedbackSection />
      <GuideAndCommitSection />
      <StickyCTA />

      {isMounted && showAddCartSuccess && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-white border border-green-400 text-green-700 px-8 py-5 rounded-2xl shadow-2xl flex items-center gap-4 animate-bounce-in">
          <span className="text-3xl">✅</span>
          <div className="flex flex-col items-start">
            <div className="font-bold text-lg mb-1">Đã thêm "{addedDocTitle}" vào giỏ hàng!</div>
            <div className="flex gap-2 mt-1">
              <Link href="/cart" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-semibold shadow text-sm">Xem giỏ hàng</Link>
              <Link href="/orders" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold shadow text-sm">Thanh toán ngay</Link>
            </div>
          </div>
          <button className="ml-4 text-slate-400 hover:text-slate-700 text-xl" onClick={() => setShowAddCartSuccess(false)}>×</button>
        </div>
      )}

      {/* Tìm kiếm */}
      <section id="search-section" className="py-16 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-2xl"></div>
        
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Tìm kiếm tài liệu
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Tìm kiếm nhanh chóng tài liệu bạn cần
            </p>
          </div>
          
          <div className="glass rounded-3xl shadow-xl p-8 border border-white/30 sticky top-24 bg-white/90 z-20">
            {/* Mobile: filter collapse */}
            <Disclosure as="div" className="md:hidden mb-4">
              {({ open }) => (
                <>
                  <Disclosure.Button className="w-full flex justify-between items-center px-4 py-3 bg-blue-50 rounded-xl border border-blue-200 text-blue-700 font-semibold">
                    Bộ lọc tìm kiếm
                    <span>{open ? '▲' : '▼'}</span>
                  </Disclosure.Button>
                  <Disclosure.Panel className="pt-4">
                    <form onChange={handleSearch} className="space-y-6">
                      <div className="grid grid-cols-1 gap-4">
                        <Input
                          type="text"
                          placeholder="Tìm kiếm theo tên tài liệu..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="h-14 text-lg pl-6 pr-12"
                        />
                        <select value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl">
                          <option value="">Tất cả môn học</option>
                          {subjects.map(subject => <option key={subject} value={subject}>{subject}</option>)}
                        </select>
                        <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl">
                          <option value="">Tất cả lớp</option>
                          {classes.map(cls => <option key={cls} value={cls}>{cls}</option>)}
                        </select>
                        <select value={selectedType} onChange={e => setSelectedType(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl">
                          <option value="">Tất cả loại</option>
                          <option value="Đề thi">Đề thi</option>
                          <option value="Giáo án">Giáo án</option>
                          <option value="Chuyên đề">Chuyên đề</option>
                          <option value="Sáng kiến">Sáng kiến</option>
                        </select>
                        <select value={selectedPrice} onChange={e => setSelectedPrice(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl">
                          <option value="">Tất cả mức giá</option>
                          <option value="free">Miễn phí</option>
                          <option value="under-20k">Dưới 20.000₫</option>
                          <option value="20k-50k">20.000₫ - 50.000₫</option>
                          <option value="over-50k">Trên 50.000₫</option>
                        </select>
                      </div>
                    </form>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            {/* Desktop: filter luôn hiển thị */}
            <form onChange={handleSearch} className="space-y-6 hidden md:block">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Tìm kiếm theo tên tài liệu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-14 text-lg pl-6 pr-12"
                />
                <Button
                  type="submit"
                  className="absolute right-2 top-2 h-10 px-6"
                  icon="🔍"
                >
                  Tìm kiếm
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Môn học</label>
                  <select value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl">
                    <option value="">Tất cả môn học</option>
                    {subjects.map(subject => <option key={subject} value={subject}>{subject}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lớp</label>
                  <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl">
                    <option value="">Tất cả lớp</option>
                    {classes.map(cls => <option key={cls} value={cls}>{cls}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Loại tài liệu</label>
                  <select value={selectedType} onChange={e => setSelectedType(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl">
                    <option value="">Tất cả loại</option>
                    <option value="Đề thi">Đề thi</option>
                    <option value="Giáo án">Giáo án</option>
                    <option value="Chuyên đề">Chuyên đề</option>
                    <option value="Sáng kiến">Sáng kiến</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Giá</label>
                  <select value={selectedPrice} onChange={e => setSelectedPrice(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl">
                    <option value="">Tất cả mức giá</option>
                    <option value="free">Miễn phí</option>
                    <option value="under-20k">Dưới 20.000₫</option>
                    <option value="20k-50k">20.000₫ - 50.000₫</option>
                    <option value="over-50k">Trên 50.000₫</option>
                  </select>
                </div>
              </div>
            </form>
            {/* Active filters as chips */}
            {(searchQuery || selectedSubject || selectedClass || selectedType || selectedPrice) && (
              <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-gray-200 mt-4">
                <span className="text-sm font-medium text-gray-700">Bộ lọc:</span>
                {searchQuery && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                    "{searchQuery}" <button onClick={() => setSearchQuery('')} className="ml-2 text-blue-600 hover:text-blue-800">×</button>
                  </span>
                )}
                {selectedSubject && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                    {selectedSubject} <button onClick={() => setSelectedSubject('')} className="ml-2 text-green-600 hover:text-green-800">×</button>
                  </span>
                )}
                {selectedClass && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                    {selectedClass} <button onClick={() => setSelectedClass('')} className="ml-2 text-purple-600 hover:text-purple-800">×</button>
                  </span>
                )}
                {selectedType && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">
                    {selectedType} <button onClick={() => setSelectedType('')} className="ml-2 text-yellow-600 hover:text-yellow-800">×</button>
                  </span>
                )}
                {selectedPrice && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-pink-100 text-pink-800">
                    {selectedPrice === 'free' ? 'Miễn phí' : selectedPrice === 'under-20k' ? 'Dưới 20.000₫' : selectedPrice === '20k-50k' ? '20.000₫ - 50.000₫' : 'Trên 50.000₫'} <button onClick={() => setSelectedPrice('')} className="ml-2 text-pink-600 hover:text-pink-800">×</button>
                  </span>
                )}
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedSubject('');
                    setSelectedClass('');
                    setSelectedType('');
                    setSelectedPrice('');
                  }}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  Xóa tất cả
                </button>
              </div>
            )}
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">Hoặc thử tìm kiếm nhanh:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Toán học', 'Văn học', 'Vật lý', 'Hóa học', 'Lớp 12', 'Đề thi', 'Giáo án'].map((term) => (
                <button
                  key={term}
                  onClick={() => handleQuickSearch(term)}
                  className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-white hover:shadow-md transition-all duration-200"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tìm kiếm theo lớp */}
      <section className="py-16 bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Tìm kiếm theo lớp
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Chọn lớp học để xem tài liệu phù hợp với trình độ
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {classes.map((cls, index) => {
              const classDocs = documents.filter(doc => doc.class === cls);
              const totalDownloads = classDocs.reduce((sum, doc) => sum + doc.downloads, 0);
              
              return (
                <button
                  key={cls}
                  onClick={() => {
                    const searchUrl = `/search?class=${encodeURIComponent(cls)}`;
                    window.location.href = searchUrl;
                  }}
                  className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border border-gray-100 hover:border-blue-200 text-center"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mx-auto mb-3 flex items-center justify-center text-white text-lg font-bold group-hover:scale-110 transition-transform duration-300">
                    {cls.replace('Lớp ', '')}
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {cls}
                  </h3>
                  <div className="text-xs text-gray-500 space-y-1">
                    <div>{classDocs.length} tài liệu</div>
                    <div>{totalDownloads.toLocaleString('vi-VN')} lượt tải</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
