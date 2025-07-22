import React from "react";

export default function ShareButtons({ url, title }: { url: string; title: string }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    alert("Đã sao chép liên kết!");
  };
  return (
    <div className="flex gap-4 mt-4">
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-2xl hover:scale-125 transition-transform" title="Chia sẻ Facebook" aria-label="Chia sẻ Facebook">🔵</a>
      <a href={`https://zalo.me/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-2xl hover:scale-125 transition-transform" title="Chia sẻ Zalo" aria-label="Chia sẻ Zalo">💬</a>
      <a href={`https://www.messenger.com/share?link=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-2xl hover:scale-125 transition-transform" title="Chia sẻ Messenger" aria-label="Chia sẻ Messenger">📩</a>
      <button onClick={handleCopy} className="text-gray-600 text-2xl hover:scale-125 transition-transform" title="Sao chép liên kết" aria-label="Sao chép liên kết">🔗</button>
    </div>
  );
} 