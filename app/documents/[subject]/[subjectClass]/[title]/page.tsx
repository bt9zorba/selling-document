'use client';

import { useMemo, useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { documents, createSlug } from '@/lib/data';
import dynamic from 'next/dynamic';
import ShareButtons from '@/components/ui/ShareButtons';
import Head from 'next/head';
import { useRouter } from 'next/navigation';

const ChatSupport = dynamic(() => import('@/components/ui/ChatSupport'), { ssr: false });

export default function DocumentDetailPage() {
  const params = useParams();
  const subjectSlug = params.subject as string;
  const subjectClassSlug = params.subjectClass as string;
  const titleSlug = params.title as string;

  const [reported, setReported] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  // Thay thế createSlug bằng hàm chuẩn hóa slug đồng bộ với lib/data
  const normalizeSlug = (str: string) => str.toLowerCase().normalize('NFD').replace(/\s+/g, '-').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-').replace(/^-|-$/g, '');

  // Sử dụng đúng hàm createSlug từ lib/data.ts cho mọi so sánh slug
  const document = useMemo(() => {
    console.log('Searching for document with:', { subjectSlug, subjectClassSlug, titleSlug });
    
    // Thử tìm theo nhiều cách khác nhau
    let foundDoc = documents.find(doc => {
      const docSubjectSlug = createSlug(doc.subject);
      const docClassSlug = createSlug(doc.subject + ' ' + doc.class);
      const docTitleSlug = createSlug(doc.title);
      
      return (
        docSubjectSlug === createSlug(subjectSlug) &&
        docClassSlug === createSlug(subjectClassSlug) &&
        docTitleSlug === createSlug(titleSlug)
      );
    });

    // Nếu không tìm thấy, thử tìm theo title trực tiếp
    if (!foundDoc) {
      foundDoc = documents.find(doc => {
        const docTitleSlug = createSlug(doc.title);
        return docTitleSlug === createSlug(titleSlug);
      });
    }

    // Nếu vẫn không tìm thấy, thử tìm theo title gần đúng
    if (!foundDoc) {
      foundDoc = documents.find(doc => {
        const docTitleLower = doc.title.toLowerCase();
        const titleSlugLower = titleSlug.toLowerCase();
        return docTitleLower.includes(titleSlugLower) || titleSlugLower.includes(docTitleLower.replace(/\s+/g, '-'));
      });
    }

    console.log('Found document:', foundDoc?.title);
    if (!foundDoc) {
      console.error('Không tìm thấy document với các slug sau:', { subjectSlug, subjectClassSlug, titleSlug });
    }
    return foundDoc;
  }, [subjectSlug, subjectClassSlug, titleSlug]);

  // Kiểm tra xem tài liệu đã có trong giỏ hàng chưa
  useEffect(() => {
    if (document) {
      const cart = JSON.parse(localStorage.getItem('cart') || '{"items":[]}');
      const isInCart = Array.isArray(cart.items) && cart.items.some((item: any) => item.id === document.id);
      setAddedToCart(isInCart);
    }
  }, [document]);

  // Tìm các tài liệu liên quan (cùng môn học hoặc cùng lớp)
  const relatedDocuments = useMemo(() => {
    if (!document) return [];
    return documents
      .filter(doc =>
        doc.id !== document.id &&
        (doc.subject === document.subject || doc.class === document.class)
      )
      .slice(0, 6);
  }, [document]);

  // Tạo slug cho subject, class, title
  const createSubjectSlug = (subject: string) => createSlug(subject);
  const createSubjectClassSlug = (subject: string, cls: string) => createSlug(subject + '-' + cls);
  const createTitleSlug = (title: string) => createSlug(title);

  // Thêm hàm random rating cho mỗi tài liệu
  const getRandomRating = (seed: string) => {
    // Tạo seed từ id hoặc title để mỗi tài liệu luôn có rating khác nhau nhưng ổn định
    let hash = 0;
    for (let i = 0; i < seed.length; i++) hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    const rand = Math.abs(Math.sin(hash) * 10000) % 1;
    return (4.8 + rand * 0.2).toFixed(1);
  };

  const handleAddToCart = () => {
    if (!document) {
      console.error('Document not found');
      return;
    }
    const cartObj = JSON.parse(localStorage.getItem('cart') || '{"items":[]}');
    const cart = Array.isArray(cartObj.items) ? cartObj.items : [];
    const existingItemIndex = cart.findIndex((item: any) => item.id === document.id);
    if (existingItemIndex >= 0) {
      cart[existingItemIndex].quantity += 1;
    } else {
      cart.push({
        id: document.id,
        title: document.title,
        price: document.price,
        image: document.image || '/file.svg',
        quantity: 1,
        subject: document.subject,
        class: document.class,
      });
    }
    localStorage.setItem('cart', JSON.stringify({ items: cart }));
    setAddedToCart(true);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { items: cart } }));
    // Reload lại cart để xác nhận
    const checkCart = JSON.parse(localStorage.getItem('cart') || '{"items":[]}');
    console.log('Cart after add:', checkCart);
  };

  if (!document) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-4">404</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy tài liệu</h2>
          <p className="text-gray-600 mb-6">Vui lòng kiểm tra lại đường dẫn hoặc slug.</p>
          <div className="text-left text-xs text-slate-500 bg-slate-100 rounded-xl p-4 mb-4">
            <div>subjectSlug: {subjectSlug}</div>
            <div>subjectClassSlug: {subjectClassSlug}</div>
            <div>titleSlug: {titleSlug}</div>
          </div>
          <Link href="/documents">
            <Button>Về trang tài liệu</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{document.title} | Tài liệu {document.subject} {document.class}</title>
        <meta name="description" content={document.description} />
        <meta property="og:title" content={document.title + ' | Tài liệu ' + document.subject + ' ' + document.class} />
        <meta property="og:description" content={document.description} />
        <meta property="og:type" content="article" />
        {/* Only render og:url and canonical after mount to avoid hydration error */}
        {isMounted && <meta property="og:url" content={currentUrl} />}
        <meta property="og:image" content={document.image || '/public/file.svg'} />
        {isMounted && <link rel="canonical" href={currentUrl} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={document.title} />
        <meta name="twitter:description" content={document.description} />
        <meta name="twitter:image" content={document.image || '/public/file.svg'} />
        {/* Only render JSON-LD after mount to avoid hydration error */}
        {isMounted && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": document.title,
            "description": document.description,
            "image": document.image || '/public/file.svg',
            "brand": { "@type": "Brand", "name": "StudyPro" },
            "offers": {
              "@type": "Offer",
              "price": document.price,
              "priceCurrency": "VND",
              "availability": "https://schema.org/InStock"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": document.rating,
              "reviewCount": document.reviews ? document.reviews.length : 0
            },
            "review": (document.reviews || []).map(r => ({
              "@type": "Review",
              "author": { "@type": "Person", "name": r.userName },
              "reviewRating": { "@type": "Rating", "ratingValue": r.rating },
              "reviewBody": r.comment,
              "datePublished": r.createdAt
            }))
          }) }} />
        )}
      </Head>
      {/* Only render Breadcrumb JSON-LD after mount */}
      {isMounted && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Tất cả tài liệu", "item": "/documents" },
            { "@type": "ListItem", "position": 2, "name": document.subject, "item": `/documents/${createSubjectSlug(document.subject)}` },
            { "@type": "ListItem", "position": 3, "name": `${document.subject} - ${document.class}`, "item": `/documents/${createSubjectSlug(document.subject)}/${createSubjectClassSlug(document.subject, document.class)}` },
            { "@type": "ListItem", "position": 4, "name": document.title, "item": currentUrl }
          ]
        }) }} />
      )}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        {/* Notification */}
        {showNotification && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-bounce">
            <div className="flex items-center gap-2">
              <span className="text-xl">✓</span>
              <span>Đã thêm vào giỏ hàng!</span>
            </div>
          </div>
        )}
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/documents" className="text-slate-500 hover:text-blue-600 transition-colors">
              Tất cả tài liệu
            </Link>
            <span className="text-slate-400">/</span>
            <Link href={`/documents/${createSubjectSlug(document.subject)}`} className="text-slate-500 hover:text-blue-600 transition-colors">
              {document.subject}
            </Link>
            <span className="text-slate-400">/</span>
            <Link href={`/documents/${createSubjectSlug(document.subject)}/${createSubjectClassSlug(document.subject, document.class)}`} className="text-slate-500 hover:text-blue-600 transition-colors">
              {document.subject} - {document.class}
            </Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-900 font-medium">{document.title}</span>
          </nav>
        </div>
      </div>

      {/* Document Detail */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  {/* Tag subject */}
                  <Link href={`/documents/${createSubjectSlug(document.subject)}`}
                    className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors">
                    {document.subject}
                  </Link>
                  {/* Tag class */}
                  <span
                    className="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded-full font-medium hover:bg-slate-200 transition-colors cursor-pointer"
                    onClick={() => {
                      // Chuyển class về không dấu, viết thường, đúng chuẩn
                      const classSlug = document.class
                        .toLowerCase()
                        .normalize('NFD')
                        .replace(/\s+/g, ' ')
                        .replace(/[\u0300-\u036f]/g, '')
                        .replace(/^lớp /, 'lop ')
                        .replace(/[^a-z0-9 ]/g, '')
                        .trim();
                      window.location.href = `/search?class=${encodeURIComponent(classSlug)}`;
                    }}
                  >
                    {document.class}
                  </span>
                  {/* Tag category */}
                  <span
                    className="text-sm text-purple-600 bg-purple-50 px-3 py-1 rounded-full hover:bg-purple-100 transition-colors cursor-pointer"
                    onClick={() => {
                      const catSlug = document.category
                        .toLowerCase()
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                        .replace(/[^a-z0-9 ]/g, '')
                        .trim();
                      window.location.href = `/search?category=${encodeURIComponent(catSlug)}`;
                    }}
                  >
                    {document.category}
                  </span>
                  {/* Các tag khác */}
                  {document.tags.map((tag, idx) => (
                    <Link
                      key={idx}
                      href={tag === document.subject ? `/documents/${createSubjectSlug(tag)}` : `/search?q=${encodeURIComponent(tag)}`}
                      className="text-xs text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full ml-1 hover:bg-blue-100 transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">
                  {document.title}
                </h1>
                <p className="text-lg text-slate-600 mb-6">
                  {document.description}
                </p>
                {/* Thay thế phần hiển thị giá: đặt ngay dưới tiêu đề tài liệu, bên trái, cùng dòng hoặc ngay dưới, không căn giữa, không box lớn. */}
                <div className="flex items-end gap-3 mb-4">
                  <span className="text-2xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
                    {isMounted ? document.price.toLocaleString('vi-VN') + ' ₫' : ''}
                  </span>
                  {isMounted && typeof (document as any).originalPrice === 'number' && (document as any).originalPrice > document.price && (
                    <span className="text-base text-slate-400 line-through">{(document as any).originalPrice.toLocaleString('vi-VN')} ₫</span>
                  )}
                  {isMounted && typeof (document as any).originalPrice === 'number' && (document as any).originalPrice > document.price && (
                    <span className="px-2 py-0.5 rounded bg-red-500 text-white text-xs font-bold ml-1">-
                      {Math.round(100 - document.price / (document as any).originalPrice * 100)}%
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    
                  </div>
                  <div className="flex space-x-3">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Xem trước
                    </Button>
                    <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600" onClick={() => {
                      // Thêm vào giỏ hàng nếu chưa có
                      const cartObj = JSON.parse(localStorage.getItem('cart') || '{"items":[]}');
                      const cart = Array.isArray(cartObj.items) ? cartObj.items : [];
                      const existingItemIndex = cart.findIndex((item: any) => item.id === document.id);
                      if (existingItemIndex >= 0) {
                        cart[existingItemIndex].quantity += 1;
                      } else {
                        cart.push({
                          id: document.id,
                          title: document.title,
                          price: document.price,
                          image: document.image || '/file.svg',
                          quantity: 1,
                          subject: document.subject,
                          class: document.class,
                        });
                      }
                      localStorage.setItem('cart', JSON.stringify({ items: cart }));
                      window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { items: cart } }));
                      setAddedToCart(true);
                      setShowNotification(true);
                      setTimeout(() => setShowNotification(false), 3000);
                      // Reload lại cart để xác nhận
                      const checkCart = JSON.parse(localStorage.getItem('cart') || '{"items":[]}');
                      console.log('Cart after add:', checkCart);
                      setTimeout(() => { window.location.href = '/cart'; }, 100);
                    }}>
                      Mua ngay
                    </Button>
                    <Button 
                      className={`${addedToCart 
                        ? 'bg-green-500 hover:bg-green-600' 
                        : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'
                      } transition-all duration-300`} 
                      onClick={() => {
                        const cartObj = JSON.parse(localStorage.getItem('cart') || '{"items":[]}');
                        const cart = Array.isArray(cartObj.items) ? cartObj.items : [];
                        const existingItemIndex = cart.findIndex((item: any) => item.id === document.id);
                        if (existingItemIndex >= 0) {
                          cart[existingItemIndex].quantity += 1;
                        } else {
                          cart.push({
                            id: document.id,
                            title: document.title,
                            price: document.price,
                            image: document.image || '/file.svg',
                            quantity: 1,
                            subject: document.subject,
                            class: document.class,
                          });
                        }
                        localStorage.setItem('cart', JSON.stringify({ items: cart }));
                        window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { items: cart } }));
                        setAddedToCart(true);
                        setShowNotification(true);
                        setTimeout(() => setShowNotification(false), 3000);
                      }}
                      disabled={addedToCart}
                    >
                      {addedToCart ? '✓ Đã thêm' : 'Thêm vào giỏ hàng'}
                    </Button>
                    <button
                      className="px-4 py-2 rounded-xl border border-red-200 text-red-500 font-semibold hover:bg-red-50 transition-all ml-2"
                      onClick={() => setReported(true)}
                      type="button"
                    >
                      🚩 Báo cáo vi phạm
                    </button>
                  </div>
                </div>
                <ShareButtons url={isMounted ? currentUrl : ''} title={document.title} />
                {reported && (
                  <div className="mt-4 text-sm text-green-600 font-semibold">Cảm ơn bạn đã báo cáo. Chúng tôi sẽ kiểm tra và xử lý sớm nhất!</div>
                )}
              </div>
            </div>
          </div>

          {/* Đánh giá & Bình luận */}
          <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <span className="text-yellow-400 text-3xl">★</span> Đánh giá & Bình luận
            </h2>
            {isMounted && (
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={`text-2xl ${document.rating >= i + 1 ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                  ))}
                </div>
                <span className="text-lg font-semibold text-slate-700">{document.rating.toFixed(1)}/5</span>
                <span className="text-slate-500">({document.reviews ? document.reviews.length : 0} đánh giá)</span>
              </div>
            )}
            {/* Form đánh giá, bình luận, các phần khác ... */}
            {/* Đóng các thẻ div, section, fragment còn thiếu ở cuối file */}
          </div>
        </div>
      </section>
      {/* Chat trực tiếp với người bán */}
      <ChatSupport mode="document" documentId={document.id} userId="user-1" sellerId="seller-1" />
      {isMounted && document && (
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Tài liệu liên quan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.filter(doc => doc.subject === document.subject && doc.id !== document.id).slice(0, 6).map(doc => (
              <Link key={doc.id} href={`/documents/${createSubjectSlug(doc.subject)}/${createSubjectClassSlug(doc.subject, doc.class)}/${createTitleSlug(doc.title)}`}>
                <Card className="h-full hover:scale-105 transition-all duration-300 cursor-pointer">
                  <div className="flex flex-col space-y-2 pb-4">
                    <h3 className="tracking-tight text-lg font-semibold text-slate-900 line-clamp-2 mb-2">{doc.title}</h3>
                    <div className="flex gap-2 text-sm text-slate-600 mb-2">
                      <span>{doc.subject}</span>
                      <span>-</span>
                      <span>{doc.class}</span>
                    </div>
                    <div className="flex gap-4 text-xs text-slate-500">
                      <span>★ {doc.rating.toFixed(1)}</span>
                      <span>⬇️ {doc.downloads}</span>
                    </div>
                    <div className="text-blue-600 font-bold text-lg mt-2">{doc.price === 0 ? "Miễn phí" : doc.price.toLocaleString('vi-VN') + "₫"}</div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
    </>
  );
}