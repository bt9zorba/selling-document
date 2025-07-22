import React, { useState } from 'react';

export default function ReviewForm({ documentId, onSubmit }: { documentId: string, onSubmit?: () => void }) {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const review = {
      id: Date.now(),
      userName: name || 'Ẩn danh',
      rating,
      comment,
      createdAt: new Date().toLocaleString('vi-VN'),
    };
    // Lưu vào localStorage
    const key = `reviews_${documentId}`;
    const reviews = JSON.parse(localStorage.getItem(key) || '[]');
    reviews.unshift(review);
    localStorage.setItem(key, JSON.stringify(reviews));
    setSuccess(true);
    setName(''); setRating(5); setComment('');
    if (onSubmit) onSubmit();
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium mb-1">Tên của bạn</label>
        <input type="text" className="w-full border rounded px-3 py-2" value={name} onChange={e => setName(e.target.value)} placeholder="Nhập tên hoặc để trống" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Đánh giá</label>
        <div className="flex gap-1">
          {[1,2,3,4,5].map(star => (
            <button type="button" key={star} onClick={() => setRating(star)} className={star <= rating ? 'text-yellow-400 text-2xl' : 'text-gray-300 text-2xl'}>★</button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Bình luận</label>
        <textarea className="w-full border rounded px-3 py-2" value={comment} onChange={e => setComment(e.target.value)} rows={3} placeholder="Nhận xét của bạn về tài liệu..." required />
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition">Gửi đánh giá</button>
      {success && <div className="text-green-600 text-sm mt-2">Cảm ơn bạn đã đánh giá!</div>}
    </form>
  );
} 