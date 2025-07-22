'use client';
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { documents } from '@/lib/data';
import { createSlug } from '@/lib/utils';

// Mock data giỏ hàng
const mockCart = [
  {
    id: '11',
    title: 'Đề thi học kỳ 1 Văn học lớp 11',
    price: 18000,
    image: '/file.svg',
    quantity: 1,
    subject: 'Văn học',
    class: 'Lớp 11',
  },
  {
    id: '3',
    title: 'Bài tập trắc nghiệm Tiếng Anh lớp 9',
    price: 20000,
    image: '/file.svg',
    quantity: 2,
    subject: 'Tiếng Anh',
    class: 'Lớp 9',
  },
];

export default function CartPage() {
  // Đảm bảo khởi tạo cart là [] và luôn lấy từ localStorage
  const [cart, setCart] = useState<any[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const localCartObj = JSON.parse(localStorage.getItem('cart') || '{"items":[]}');
        return Array.isArray(localCartObj.items) ? localCartObj.items : [];
      } catch {
        return [];
      }
    }
    return [];
  });
  const [showNotification, setShowNotification] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [voucher, setVoucher] = useState('');
  const [voucherApplied, setVoucherApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const cartListRef = React.useRef<HTMLDivElement>(null);
  const [lastAddedId, setLastAddedId] = useState<string | null>(null);
  // Danh sách mã giảm giá mẫu
  const voucherList = [
    { code: 'STUDY10', value: 0.1, desc: 'Giảm 10% cho đơn hàng' },
    { code: 'TEACHER20', value: 0.2, desc: 'Giảm 20% cho giáo viên' },
    { code: 'FREESHIP', value: 0.05, desc: 'Giảm 5% phí tài liệu' },
  ];
  // Áp dụng voucher
  const handleApplyVoucher = () => {
    const found = voucherList.find(v => v.code.toLowerCase() === voucher.trim().toLowerCase());
    if (found) {
      setDiscount(found.value);
      setVoucherApplied(true);
    } else {
      setDiscount(0);
      setVoucherApplied(false);
      alert('Mã giảm giá không hợp lệ!');
    }
  };
  // Tổng tiền sau giảm giá
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalDiscount = Math.round(total * discount);
  const totalAfterDiscount = total - totalDiscount;

  const [isMounted, setIsMounted] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [lastOrder, setLastOrder] = useState<any>(null);
  const [showCheckoutConfirm, setShowCheckoutConfirm] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState<any[]>([]);
  const [comboDiscount, setComboDiscount] = useState(0);
  const [comboBanner, setComboBanner] = useState('');

  // Luôn đồng bộ với localStorage khi tab được focus hoặc localStorage thay đổi
  useEffect(() => {
    const syncCart = () => {
      try {
        const localCartObj = JSON.parse(localStorage.getItem('cart') || '{"items":[]}');
        setCart(Array.isArray(localCartObj.items) ? localCartObj.items : []);
      } catch {
        setCart([]);
      }
    };

    // Lắng nghe sự kiện cartUpdated từ các trang khác
    const handleCartUpdate = (event: CustomEvent) => {
      const items = event.detail?.items;
      if (Array.isArray(items)) {
        setCart(items);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
        // Scroll đến sản phẩm vừa thêm (nếu có)
        if (items.length > cart.length) {
          setLastAddedId(items[items.length - 1].id);
        }
      }
    };

    // Lắng nghe thay đổi localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cart') {
        syncCart();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cartUpdated', handleCartUpdate as EventListener);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') syncCart();
    });
    
    syncCart();
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleCartUpdate as EventListener);
      document.removeEventListener('visibilitychange', syncCart);
    };
  }, []);

  useEffect(() => {
    // Luôn lưu lại cart khi thay đổi
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify({ items: cart }));
    }
  }, [cart]);

  useEffect(() => {
    // Scroll đến sản phẩm vừa thêm
    if (lastAddedId && cartListRef.current) {
      const el = cartListRef.current.querySelector(`[data-cart-id="${lastAddedId}"]`);
      if (el) {
        (el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      setLastAddedId(null);
    }
  }, [lastAddedId]);

  useEffect(() => {
    const handleScroll = () => {
      // Nếu cuộn xuống dưới 100px thì hiện sticky
      setIsSticky(window.scrollY > 100 && cart.length > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [cart.length]);

  useEffect(() => {
    // Hiển thị hướng dẫn cho người dùng mới (chỉ hiển thị 1 lần)
    if (!localStorage.getItem('cartGuideShown')) {
      setShowGuide(true);
      localStorage.setItem('cartGuideShown', '1');
    }
  }, []);

  useEffect(() => { setIsMounted(true); }, []);

  useEffect(() => {
    if (!isMounted) return;
    // Tính tổng tiền các sản phẩm đã chọn hoặc toàn bộ cart
    const items = selectedIds.length > 0 ? cart.filter(item => selectedIds.includes(item.id)) : cart;
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let discount = 0;
    let banner = '';
    // Ưu đãi tổng tiền lớn
    if (total > 100000) {
      discount += 0.1;
      banner = 'Bạn được giảm 10% cho đơn hàng trên 100.000₫!';
    }
    // Combo cùng môn hoặc cùng lớp
    const subjectCount: Record<string, number> = {};
    const classCount: Record<string, number> = {};
    items.forEach(item => {
      subjectCount[item.subject] = (subjectCount[item.subject] || 0) + 1;
      classCount[item.class] = (classCount[item.class] || 0) + 1;
    });
    const hasCombo = Object.values(subjectCount).some(c => c >= 2) || Object.values(classCount).some(c => c >= 2);
    if (hasCombo) {
      discount += 0.05;
      banner += (banner ? ' ' : '') + 'Mua combo 2+ tài liệu cùng môn/lớp giảm thêm 5%!';
    }
    setComboDiscount(discount);
    setComboBanner(banner);
  }, [cart, selectedIds, isMounted]);

  const handleRemove = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Loại bỏ các hàm thay đổi số lượng
  // const handleChangeQty = (id: string, qty: number) => { ... }
  // const handleIncreaseQty = (id: string) => { ... }
  // const handleDecreaseQty = (id: string) => { ... }

  // Gợi ý tài liệu liên quan nâng cấp đa tiêu chí
  const relatedDocs = useMemo(() => {
    if (!cart.length) return [];
    const cartIds = cart.map(item => item.id);
    const cartSubjects = cart.map(item => item.subject);
    const cartClasses = cart.map(item => item.class);
    // Lấy tất cả category từ documents theo id trong cart
    const cartCategories = documents.filter(doc => cartIds.includes(doc.id)).map(doc => doc.category);
    let candidates = documents.filter(doc => !cartIds.includes(doc.id));
    // Tạo mảng tạm để sort theo score
    const scored = candidates.map(doc => {
      let score = 0;
      if (cartSubjects.includes(doc.subject)) score += 5;
      if (cartClasses.includes(doc.class)) score += 3;
      if (cartCategories.includes(doc.category)) score += 2;
      score += Math.min(doc.downloads / 100, 3);
      score += Math.max(doc.rating - 4.5, 0) * 2;
      score += new Date(doc.createdAt || '').getTime() / 1e12;
      return { doc, score };
    });
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 8).map(s => s.doc);
  }, [cart]);

  // Gợi ý tài liệu tham khảo khi giỏ hàng trống
  const recommendedDocs = useMemo(() => {
    // Lấy 6 tài liệu nổi bật hoặc theo subject đầu tiên trong documents
    return documents.slice(0, 6);
  }, []);

  let createSlug = (text: string) => text.toLowerCase().normalize('NFD').replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    createSlug = require('@/lib/utils').createSlug || createSlug;
  } catch (e) {}

  if (!isMounted) {
    return <div className="min-h-screen flex items-center justify-center text-slate-400">Đang tải giỏ hàng...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-12">
      {/* Banner ưu đãi/khuyến mãi */}
      {comboBanner && (
        <div className="max-w-3xl mx-auto mb-6 px-2">
          <div className="bg-gradient-to-r from-yellow-200 to-pink-100 border border-yellow-400 text-yellow-900 rounded-2xl px-6 py-4 text-center text-lg font-semibold shadow animate-bounce-in">
            🎁 {comboBanner}
          </div>
        </div>
      )}
      {/* Hướng dẫn sử dụng */}
      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">Hướng dẫn sử dụng giỏ hàng</h2>
            <ul className="text-left text-slate-700 mb-4 list-disc pl-6 space-y-2">
              <li>Bạn có thể thêm nhiều tài liệu vào giỏ hàng từ bất kỳ trang nào.</li>
              <li>Chỉnh sửa số lượng, xóa từng tài liệu hoặc xóa nhiều tài liệu cùng lúc.</li>
              <li>Áp dụng mã giảm giá để nhận ưu đãi.</li>
              <li>Thanh toán nhanh chóng, an toàn.</li>
            </ul>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold" onClick={() => setShowGuide(false)}>Đã hiểu</button>
          </div>
        </div>
      )}
      {/* Popup xác nhận xóa toàn bộ giỏ hàng */}
      {showConfirmClear && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
            <h2 className="text-xl font-bold mb-4 text-red-600">Xác nhận xóa toàn bộ giỏ hàng?</h2>
            <p className="mb-6 text-slate-700">Bạn có chắc chắn muốn xóa tất cả sản phẩm trong giỏ hàng không? Hành động này không thể hoàn tác.</p>
            <div className="flex justify-center gap-4">
              <button className="bg-red-500 text-white px-6 py-2 rounded-xl font-semibold" onClick={() => { localStorage.removeItem('cart'); setCart([]); setShowConfirmClear(false); }}>Xóa hết</button>
              <button className="bg-slate-200 text-slate-700 px-6 py-2 rounded-xl font-semibold" onClick={() => setShowConfirmClear(false)}>Hủy</button>
            </div>
          </div>
        </div>
      )}
      {/* Popup xác nhận xóa từng sản phẩm */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
            <h2 className="text-xl font-bold mb-4 text-red-600">Xác nhận xóa sản phẩm?</h2>
            <p className="mb-6 text-slate-700">Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng không?</p>
            <div className="flex justify-center gap-4">
              <button className="bg-red-500 text-white px-6 py-2 rounded-xl font-semibold" onClick={() => { setCart(cart.filter(item => item.id !== confirmDeleteId)); setConfirmDeleteId(null); }}>Xóa</button>
              <button className="bg-slate-200 text-slate-700 px-6 py-2 rounded-xl font-semibold" onClick={() => setConfirmDeleteId(null)}>Hủy</button>
            </div>
          </div>
        </div>
      )}
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-bounce">
          <div className="flex items-center gap-2">
            <span className="text-xl">✓</span>
            <span>Giỏ hàng đã được cập nhật!</span>
          </div>
        </div>
      )}
      <div className="max-w-6xl mx-auto px-2 sm:px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cột trái: Danh sách sản phẩm */}
        <div className="lg:col-span-2" ref={cartListRef}>
          <h1 className="text-3xl font-bold text-slate-900 mb-10 text-center">Giỏ hàng của bạn</h1>
          {!isMounted ? (
            <div className="text-center text-slate-400 py-20">Đang tải...</div>
          ) : cart.length === 0 ? (
            <div className="text-center text-slate-500 text-lg py-20">
              Giỏ hàng trống. <Link href="/documents" className="text-blue-600 hover:underline">Tiếp tục mua tài liệu</Link>
              <div className="mt-10">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Tài liệu tham khảo nổi bật</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendedDocs.map(doc => (
                    <Link key={doc.id} href={`/documents/${createSlug(doc.subject)}/${createSlug(doc.subject + '-' + doc.class)}/${createSlug(doc.title)}`} className="block group">
                      <Card className="h-full hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border-2 border-transparent group-hover:border-blue-200 rounded-2xl p-4">
                        <div className="flex-1 flex flex-col space-y-2 pb-2">
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
                        <div className="flex gap-2 mt-2">
                          <Button variant="outline" size="sm" className="flex-1" onClick={e => {e.preventDefault(); window.location.href = `/documents/${createSlug(doc.subject)}/${createSlug(doc.subject + '-' + doc.class)}/${createSlug(doc.title)}`;}}>
                            Xem chi tiết
                          </Button>
                          <Button size="sm" className="flex-1" onClick={e => {
                            e.preventDefault();
                            // Thêm vào giỏ hàng
                            const cartObj = JSON.parse(localStorage.getItem('cart') || '{"items":[]}');
                            const cartArr = Array.isArray(cartObj.items) ? cartObj.items : [];
                            const existingItemIndex = cartArr.findIndex((item: any) => item.id === doc.id);
                            if (existingItemIndex >= 0) {
                              cartArr[existingItemIndex].quantity += 1;
                            } else {
                              cartArr.push({
                                id: doc.id,
                                title: doc.title,
                                price: doc.price,
                                image: doc.image || '/file.svg',
                                quantity: 1,
                                subject: doc.subject,
                                class: doc.class,
                              });
                            }
                            setCart(cartArr);
                            localStorage.setItem('cart', JSON.stringify({ items: cartArr }));
                            window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { items: cartArr } }));
                          }}>
                            🛒 Thêm vào giỏ hàng
                          </Button>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-4 mb-4">
                <input
                  type="checkbox"
                  checked={selectedIds.length === cart.length && cart.length > 0}
                  onChange={e => {
                    if (e.target.checked) setSelectedIds(cart.map(item => item.id));
                    else setSelectedIds([]);
                  }}
                  className="w-5 h-5 accent-blue-600"
                  id="selectAllCart"
                />
                <label htmlFor="selectAllCart" className="text-sm text-slate-700 cursor-pointer select-none">
                  Chọn tất cả ({selectedIds.length}/{cart.length})
                </label>
                {selectedIds.length > 0 && (
                  <button
                    className="ml-4 px-4 py-2 bg-red-500 text-white rounded-xl text-sm font-semibold hover:bg-red-600"
                    onClick={() => {
                      setCart(cart.filter(item => !selectedIds.includes(item.id)));
                      setSelectedIds([]);
                    }}
                  >
                    Xóa các sản phẩm đã chọn
                  </button>
                )}
              </div>
              <div className="space-y-6 pb-32">
                {(showAll ? cart : cart.slice(0, 10)).map(item => (
                  <Card key={item.id} data-cart-id={item.id} className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-slate-100 bg-white">
                    <div className="flex flex-col items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(item.id)}
                        onChange={e => {
                          setSelectedIds(e.target.checked ? [...selectedIds, item.id] : selectedIds.filter(id => id !== item.id));
                        }}
                        className="w-5 h-5 accent-blue-600"
                      />
                      <img src={item.image} alt={item.title} className="w-24 h-24 rounded-xl object-cover border bg-slate-50" />
                    </div>
                    <div className="flex-1 min-w-0 w-full">
                      <h2 className="font-bold text-lg text-slate-900 mb-1 line-clamp-2">{item.title}</h2>
                      <div className="text-sm text-slate-600 mb-2">{item.subject} - {item.class}</div>
                      <div className="flex items-center gap-3 mt-2">
                        {('originalPrice' in item) && (item as any).originalPrice > item.price && (
                          <span className="text-xs text-slate-400 line-through">{(item as any).originalPrice.toLocaleString('vi-VN')}₫</span>
                        )}
                        <span className="text-blue-600 font-bold text-lg">{item.price.toLocaleString('vi-VN')}₫</span>
                        <span className="text-xs text-slate-500">x</span>
                        {/* Số lượng luôn là 1, không cho chỉnh sửa */}
                        <span className="px-3 py-1 border rounded-lg bg-slate-50 text-slate-700">1</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 w-32">
                      <span className="text-lg font-bold text-purple-600">{item.price.toLocaleString('vi-VN')}₫</span>
                      <button onClick={() => setConfirmDeleteId(item.id)} className="text-red-500 hover:underline text-sm">Xóa</button>
                    </div>
                  </Card>
                ))}
                {/* Nút xóa nhiều sản phẩm */}
                {selectedIds.length > 0 && (
                  <div className="flex justify-end">
                    <Button className="bg-red-500 text-white px-6 py-2 rounded-xl" onClick={() => {
                      setCart(cart.filter(item => !selectedIds.includes(item.id)));
                      setSelectedIds([]);
                    }}>
                      Xóa {selectedIds.length} sản phẩm đã chọn
                    </Button>
                  </div>
                )}
                {cart.length > 10 && !showAll && (
                  <div className="flex justify-center mt-4">
                    <Button className="px-6 py-2 rounded-xl bg-blue-600 text-white font-semibold" onClick={() => setShowAll(true)}>
                      Xem thêm {cart.length - 10} sản phẩm
                    </Button>
                  </div>
                )}
                {showAll && cart.length > 10 && (
                  <div className="flex justify-center mt-2">
                    <Button className="px-6 py-2 rounded-xl bg-slate-200 text-slate-700 font-semibold" onClick={() => setShowAll(false)}>
                      Thu gọn
                    </Button>
                  </div>
                )}
                {/* Dời phần tổng tiền và thanh toán ra ngoài, để sticky */}
              </div>
            </>
          )}
        </div>
        {/* Cột phải: Tổng cộng + Thanh toán (sidebar) */}
        {isMounted && cart.length > 0 && (
          <div className="sticky top-28 bg-white rounded-2xl shadow-xl border border-slate-100 p-6 flex flex-col gap-6 h-fit">
            <div className="text-xl sm:text-2xl font-bold text-slate-900">
              Tổng cộng: <span className="text-blue-600">{(() => {
                const items = selectedIds.length > 0 ? cart.filter(item => selectedIds.includes(item.id)) : cart;
                const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
                const discount = comboDiscount;
                return (total - Math.round(total * discount)).toLocaleString('vi-VN');
              })()}₫</span>
            </div>
            {comboDiscount > 0 && (
              <div className="text-sm text-green-600">Đã áp dụng ưu đãi: -{(() => {
                const items = selectedIds.length > 0 ? cart.filter(item => selectedIds.includes(item.id)) : cart;
                const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
                return Math.round(total * comboDiscount).toLocaleString('vi-VN');
              })()}₫</div>
            )}
            {discount > 0 && selectedIds.length === 0 && comboDiscount === 0 && (
              <div className="text-sm text-green-600">Đã áp dụng mã giảm giá: -{totalDiscount.toLocaleString('vi-VN')}₫</div>
            )}
            <div className="flex gap-3 items-center">
              <Button 
                className="bg-gradient-to-r from-red-400 to-red-600 text-white px-6 py-3 rounded-2xl text-lg font-semibold shadow hover:from-red-500 hover:to-red-700"
                onClick={() => setShowConfirmClear(true)}
              >
                Xóa giỏ hàng
              </Button>
              <Button
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 text-lg font-semibold rounded-2xl hover:from-green-600 hover:to-emerald-600 shadow-lg"
                onClick={() => {
                  const itemsToPay = selectedIds.length > 0 ? cart.filter(item => selectedIds.includes(item.id)) : cart;
                  if (itemsToPay.length === 0) {
                    alert('Vui lòng chọn sản phẩm để thanh toán!');
                    return;
                  }
                  setCheckoutItems(itemsToPay);
                  setShowCheckoutConfirm(true);
                }}
              >
                Thanh toán ngay
              </Button>
            </div>
            {/* Box nhập mã giảm giá */}
            <div className="flex items-center gap-2 w-full">
              <input type="text" placeholder="Nhập mã giảm giá (VD: STUDY10)" value={voucher} onChange={e => setVoucher(e.target.value)} className="px-4 py-2 border rounded-xl w-48" />
              <Button className="bg-blue-600 text-white px-4 py-2 rounded-xl" onClick={handleApplyVoucher} disabled={voucherApplied}>Áp dụng</Button>
              {voucherApplied && <span className="text-green-600 text-sm ml-2">Đã áp dụng!</span>}
            </div>
            <div className="text-xs text-slate-500">Mã mẫu: STUDY10, TEACHER20, FREESHIP</div>
            {/* Chính sách hỗ trợ */}
            <div className="flex flex-col gap-2 border-t border-slate-100 pt-2 mt-2">
              <div className="flex items-center gap-3 text-xs text-slate-600">
                <span>💬 Hỗ trợ 24/7</span>
                <span>🔄 Đổi trả trong 7 ngày</span>
                <span>🔒 Tài liệu bản quyền</span>
              </div>
              <div className="text-xs text-slate-400">Liên hệ: support@studypro.vn</div>
            </div>
          </div>
        )}
      </div>
      {/* Gợi ý tài liệu liên quan */}
      {isMounted && relatedDocs.length > 0 && (
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Tài liệu liên quan</h2>
          <div className="relative">
            <div className="flex gap-6 overflow-x-auto pb-2 px-2 hide-scrollbar snap-x snap-mandatory">
              {relatedDocs.map(doc => (
                <Link key={doc.id} href={`/documents/${createSlug(doc.subject)}/${createSlug(doc.subject + '-' + doc.class)}/${createSlug(doc.title)}`} className="block min-w-[260px] max-w-[260px] flex-shrink-0 snap-start group">
                  <Card className="h-full flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border-2 border-transparent group-hover:border-blue-200 rounded-2xl p-4">
                    <div className="flex-1 flex flex-col space-y-2 pb-2">
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
                    <div className="flex gap-2 mt-2">
                      {!cart.some(item => item.id === doc.id) && (
                        <Button size="sm" className="flex-1" onClick={e => {
                          e.preventDefault();
                          const cartObj = JSON.parse(localStorage.getItem('cart') || '{"items":[]}');
                          const cartArr = Array.isArray(cartObj.items) ? cartObj.items : [];
                          const existingItemIndex = cartArr.findIndex((item: any) => item.id === doc.id);
                          if (existingItemIndex >= 0) {
                            cartArr[existingItemIndex].quantity += 1;
                          } else {
                            cartArr.push({
                              id: doc.id,
                              title: doc.title,
                              price: doc.price,
                              image: doc.image || '/file.svg',
                              quantity: 1,
                              subject: doc.subject,
                              class: doc.class,
                            });
                          }
                          setCart(cartArr);
                          localStorage.setItem('cart', JSON.stringify({ items: cartArr }));
                          window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { items: cartArr } }));
                        }}>
                          🛒 Thêm vào giỏ
                        </Button>
                      )}
                      <Button variant="outline" size="sm" className="flex-1" onClick={e => {e.preventDefault(); window.location.href = `/documents/${createSlug(doc.subject)}/${createSlug(doc.subject + '-' + doc.class)}/${createSlug(doc.title)}`;}}>
                        Xem chi tiết
                      </Button>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
      {showOrderSuccess && lastOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
            <h2 className="text-2xl font-bold mb-4 text-green-600">Thanh toán thành công!</h2>
            <div className="mb-4 text-slate-700">Bạn đã thanh toán {lastOrder.items.length} sản phẩm với tổng số tiền <span className="font-bold text-blue-600">{lastOrder.total.toLocaleString('vi-VN')}₫</span>.</div>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold mr-2" onClick={() => { setShowOrderSuccess(false); window.location.href = '/orders'; }}>Xem lịch sử mua hàng</button>
            <button className="bg-slate-200 text-slate-700 px-6 py-2 rounded-xl font-semibold" onClick={() => setShowOrderSuccess(false)}>Tiếp tục mua sắm</button>
          </div>
        </div>
      )}
      {showCheckoutConfirm && checkoutItems.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">Xác nhận thanh toán</h2>
            <div className="mb-4 text-slate-700">Bạn sắp thanh toán <span className="font-bold">{checkoutItems.length}</span> sản phẩm với tổng số tiền <span className="font-bold text-blue-600">{checkoutItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString('vi-VN')}₫</span>.</div>
            <div className="max-h-60 overflow-y-auto mb-4">
              {checkoutItems.map(item => (
                <div key={item.id} className="flex items-center gap-3 border rounded-xl p-3 bg-slate-50 mb-2">
                  <img src={item.image} alt={item.title} className="w-12 h-12 rounded-lg object-cover border bg-white" />
                  <div className="flex-1 min-w-0 text-left">
                    <div className="font-semibold text-slate-900 line-clamp-1">{item.title}</div>
                    <div className="text-xs text-slate-500">{item.subject} - {item.class}</div>
                    <div className="text-xs text-slate-500">Số lượng: {item.quantity}</div>
                    <div className="text-xs text-blue-600 font-bold">{item.price.toLocaleString('vi-VN')}₫</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <button className="bg-green-600 text-white px-6 py-2 rounded-xl font-semibold" onClick={() => {
                // Thực hiện thanh toán thật sự
                const order = {
                  id: 'order-' + Date.now(),
                  items: checkoutItems,
                  total: checkoutItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
                  createdAt: new Date().toISOString(),
                };
                const orders = JSON.parse(localStorage.getItem('orders') || '[]');
                orders.unshift(order);
                localStorage.setItem('orders', JSON.stringify(orders));
                setLastOrder(order);
                setShowOrderSuccess(true);
                setCart(cart.filter(item => !checkoutItems.some((i: any) => i.id === item.id)));
                setSelectedIds([]);
                setShowCheckoutConfirm(false);
              }}>Xác nhận thanh toán</button>
              <button className="bg-slate-200 text-slate-700 px-6 py-2 rounded-xl font-semibold" onClick={() => setShowCheckoutConfirm(false)}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 