import React, { useState } from "react";

export default function FeedbackPopup() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <>
      <button
        aria-label="Góp ý nhanh"
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-2xl hover:scale-110 transition-all text-2xl focus:outline-none focus:ring-4 focus:ring-blue-200"
        onClick={() => setOpen(true)}
        tabIndex={0}
      >
        💡
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={() => setOpen(false)}>
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-80 relative animate-fade-in-up" onClick={e => e.stopPropagation()}>
            <button className="absolute top-3 right-3 text-xl text-slate-400 hover:text-blue-500" onClick={() => setOpen(false)} aria-label="Đóng popup góp ý" tabIndex={0}>×</button>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Góp ý nhanh</h2>
            {sent ? (
              <div className="text-green-600 font-semibold" aria-live="polite">Cảm ơn bạn đã góp ý!</div>
            ) : (
              <form onSubmit={e => {e.preventDefault(); setSent(true);}}>
                <textarea
                  className="w-full border rounded-xl px-4 py-2 mb-4 focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Nhập ý kiến, góp ý hoặc báo lỗi..."
                  value={value}
                  onChange={e => setValue(e.target.value)}
                  aria-label="Nội dung góp ý"
                  required
                />
                <button type="submit" className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all">Gửi góp ý</button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
} 