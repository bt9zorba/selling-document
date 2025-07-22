"use client";
import React from 'react';

export default function FloatingChatSupport() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <button
        className="fixed bottom-24 right-6 z-40 w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 shadow-2xl flex items-center justify-center text-white text-3xl hover:scale-110 transition-all duration-300 md:bottom-10"
        style={{ boxShadow: '0 8px 32px 0 rgba(80,80,200,0.18)' }}
        onClick={() => setOpen(true)}
        title="Chat hỗ trợ nhanh"
        aria-label="Mở chat hỗ trợ"
      >💬</button>
      {open && (
        <div className="fixed bottom-40 right-6 z-50 bg-white rounded-2xl shadow-2xl p-6 w-80 max-w-full border border-blue-100 animate-fade-in-up">
          <div className="flex items-center justify-between mb-3">
            <div className="font-bold text-blue-700 text-lg flex items-center gap-2"><span>💬</span> Chat hỗ trợ</div>
            <button className="text-slate-400 hover:text-blue-600 text-xl" onClick={() => setOpen(false)} aria-label="Đóng chat">×</button>
          </div>
          <div className="text-slate-700 text-sm mb-4">Chào bạn! Bạn cần hỗ trợ gì? Hãy để lại tin nhắn, chúng tôi sẽ phản hồi sớm nhất.</div>
          <input type="text" placeholder="Nhập nội dung..." className="w-full px-4 py-2 border rounded-xl mb-3" aria-label="Nội dung chat" />
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold shadow">Gửi</button>
          <div className="text-xs text-slate-400 mt-2">Hoặc liên hệ <a href="mailto:support@studypro.vn" className="text-blue-600 hover:underline">support@studypro.vn</a></div>
        </div>
      )}
    </>
  );
} 