"use client";
import React from "react";

const combos = [
  {
    id: "combo1",
    name: "Combo Toán + Văn + Anh",
    price: 399000,
    originalPrice: 600000,
    description: "Trọn bộ tài liệu 3 môn hot nhất, tiết kiệm 34%.",
    docs: ["Toán 12 - Đề thi thử 2025", "Văn 11 - Chuyên đề nghị luận", "Anh 12 - Ôn tập tổng hợp"]
  },
  {
    id: "combo2",
    name: "Combo Giáo án + Đề thi",
    price: 299000,
    originalPrice: 500000,
    description: "Combo dành cho giáo viên, đầy đủ giáo án và đề thi các lớp.",
    docs: ["Giáo án Toán 10", "Đề thi Văn 12", "Đề thi Anh 11"]
  }
];

export default function ComboOffersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Combo ưu đãi</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {combos.map(combo => (
            <div key={combo.id} className="bg-white rounded-3xl shadow-lg p-8 flex flex-col gap-4 hover:scale-105 transition-all duration-300">
              <h2 className="text-xl font-bold text-blue-700 mb-2">{combo.name}</h2>
              <div className="text-slate-700 mb-2">{combo.description}</div>
              <ul className="list-disc pl-6 text-slate-600 mb-2">
                {combo.docs.map(doc => <li key={doc}>{doc}</li>)}
              </ul>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-lg font-bold text-blue-600">{combo.price.toLocaleString()}₫</span>
                <span className="text-sm line-through text-slate-400">{combo.originalPrice.toLocaleString()}₫</span>
              </div>
              <button className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all">Mua combo</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 