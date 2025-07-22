'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<any[]>([]);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const data = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setWishlist(data);
      const sync = () => setWishlist(JSON.parse(localStorage.getItem('wishlist') || '[]'));
      window.addEventListener('wishlistUpdated', sync);
      return () => window.removeEventListener('wishlistUpdated', sync);
    }
  }, []);

  const handleRemove = (id: string) => {
    const newList = wishlist.filter((item: any) => item.id !== id);
    setWishlist(newList);
    localStorage.setItem('wishlist', JSON.stringify(newList));
    window.dispatchEvent(new CustomEvent('wishlistUpdated', { detail: { items: newList } }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12">
      <div className="max-w-3xl mx-auto px-2 sm:px-4">
        <h1 className="text-3xl font-bold text-slate-900 mb-10 text-center">Tài liệu yêu thích</h1>
        {wishlist.length === 0 ? (
          <div className="text-center text-slate-500 text-lg py-20">
            Bạn chưa có tài liệu nào trong danh sách yêu thích.
            <div className="mt-6">
              <Link href="/documents" className="text-blue-600 hover:underline">Khám phá tài liệu</Link>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {wishlist.map(item => (
              <Card key={item.id} className="p-6 rounded-2xl shadow-lg border border-slate-100 bg-white flex flex-col sm:flex-row items-center gap-6">
                <img src={item.image} alt={item.title} className="w-20 h-20 rounded-xl object-cover border bg-slate-50" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-900 text-lg line-clamp-1">{item.title}</div>
                  <div className="text-xs text-slate-500 mb-1">{item.subject} - {item.class}</div>
                  <div className="text-xs text-blue-600 font-bold mb-2">{item.price.toLocaleString('vi-VN')}₫</div>
                  <div className="flex gap-2 mt-2">
                    <Link href={`/documents/${item.subject}/${item.subject + '-' + item.class}/${item.title}`} className="bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold text-sm hover:bg-blue-700 transition">Xem chi tiết</Link>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-xl font-semibold text-sm hover:bg-green-600 transition" onClick={() => {
                      // Thêm vào giỏ hàng
                      const cartObj = JSON.parse(localStorage.getItem('cart') || '{"items":[]}');
                      const cart = Array.isArray(cartObj.items) ? cartObj.items : [];
                      const existingItemIndex = cart.findIndex((i: any) => i.id === item.id);
                      if (existingItemIndex >= 0) {
                        cart[existingItemIndex].quantity += 1;
                      } else {
                        cart.push({
                          id: item.id,
                          title: item.title,
                          price: item.price,
                          image: item.image || '/file.svg',
                          quantity: 1,
                          subject: item.subject,
                          class: item.class,
                        });
                      }
                      localStorage.setItem('cart', JSON.stringify({ items: cart }));
                      window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { items: cart } }));
                    }}>
                      Thêm vào giỏ hàng
                    </button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-xl font-semibold text-sm hover:bg-red-600 transition" onClick={() => handleRemove(item.id)}>
                      Xóa khỏi yêu thích
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 