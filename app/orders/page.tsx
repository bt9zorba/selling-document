'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const data = JSON.parse(localStorage.getItem('orders') || '[]');
      setOrders(data);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-12">
      <div className="max-w-3xl mx-auto px-2 sm:px-4">
        <h1 className="text-3xl font-bold text-slate-900 mb-10 text-center">Lịch sử mua hàng</h1>
        {orders.length === 0 ? (
          <div className="text-center text-slate-500 text-lg py-20">
            Bạn chưa có đơn hàng nào.
            <div className="mt-6">
              <Link href="/documents" className="text-blue-600 hover:underline">Tiếp tục mua tài liệu</Link>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map(order => (
              <Card key={order.id} className="p-6 rounded-2xl shadow-lg border border-slate-100 bg-white">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold text-slate-800">Mã đơn: <span className="text-blue-600">{order.id}</span></div>
                  <div className="text-sm text-slate-500">{new Date(order.createdAt).toLocaleString('vi-VN')}</div>
                </div>
                <div className="mb-2 text-slate-700">Tổng tiền: <span className="font-bold text-blue-600">{order.total.toLocaleString('vi-VN')}₫</span> | Số sản phẩm: {order.items.length}</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  {order.items.map((item: any) => (
                    <div key={item.id} className="flex items-center gap-3 border rounded-xl p-3 bg-slate-50">
                      <img src={item.image} alt={item.title} className="w-14 h-14 rounded-lg object-cover border bg-white" />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-slate-900 line-clamp-1">{item.title}</div>
                        <div className="text-xs text-slate-500">{item.subject} - {item.class}</div>
                        <div className="text-xs text-slate-500">Số lượng: {item.quantity}</div>
                        <div className="text-xs text-blue-600 font-bold">{item.price.toLocaleString('vi-VN')}₫</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 