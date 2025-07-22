'use client';

import React, { useEffect, useState } from 'react';
import Button from './Button';

const COUPON_CODE = 'SALE20';

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 10) setShow(true);
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [dismissed]);

  if (!show || dismissed) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center relative animate-fadeIn">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
          onClick={() => setDismissed(true)}
          aria-label="Đóng"
        >
          ×
        </button>
        <div className="text-4xl mb-4">🎁</div>
        <h2 className="text-2xl font-bold text-blue-700 mb-2">Nhận ưu đãi đặc biệt!</h2>
        <p className="text-gray-700 mb-4">Nhập mã <span className="font-mono bg-blue-50 px-2 py-1 rounded text-blue-700">{COUPON_CODE}</span> để giảm ngay <b>20%</b> cho đơn hàng đầu tiên.</p>
        <Button className="w-full mb-2" onClick={() => { window.location.href = '/register'; }}>Đăng ký nhận ưu đãi</Button>
        <Button variant="outline" className="w-full" onClick={() => setDismissed(true)}>Không, cảm ơn</Button>
      </div>
    </div>
  );
} 