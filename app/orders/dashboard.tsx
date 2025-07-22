import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function OrdersDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    // Lấy dữ liệu mẫu từ localStorage hoặc giả lập
    setOrders(JSON.parse(localStorage.getItem('orders') || '[]'));
    setDocuments(JSON.parse(localStorage.getItem('documents') || '[]'));
    setUsers(JSON.parse(localStorage.getItem('users') || '[]'));
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-slate-900 mb-10 text-center">Dashboard Quản trị</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <Card className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">{orders.length}</div>
            <div className="text-gray-600 mt-2">Đơn hàng</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600">{totalRevenue.toLocaleString('vi-VN')}₫</div>
            <div className="text-gray-600 mt-2">Doanh thu</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-2xl font-bold text-purple-600">{users.length}</div>
            <div className="text-gray-600 mt-2">Khách hàng</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-2xl font-bold text-orange-600">{documents.length}</div>
            <div className="text-gray-600 mt-2">Tài liệu</div>
          </Card>
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Đơn hàng gần đây</h2>
        <div className="space-y-4">
          {orders.slice(0, 10).map(order => (
            <Card key={order.id} className="p-4 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-800">Mã đơn: <span className="text-blue-600">{order.id}</span></div>
                <div className="text-xs text-slate-500">{new Date(order.createdAt).toLocaleString('vi-VN')}</div>
              </div>
              <div className="text-blue-600 font-bold">{order.total?.toLocaleString('vi-VN')}₫</div>
              <div className="text-xs text-slate-500">{order.items?.length || 0} sản phẩm</div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 