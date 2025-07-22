"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { documents, createSlug } from "@/lib/data";

const tabs = [
  { key: "downloads", label: "Top tải nhiều" },
  { key: "rating", label: "Top đánh giá cao" },
  { key: "newest", label: "Mới nhất" },
  { key: "free", label: "Miễn phí" }
];

// Thêm hàm random rating cho mỗi tài liệu
const getRandomRating = (seed: string) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  const rand = Math.abs(Math.sin(hash) * 10000) % 1;
  return (4.8 + rand * 0.2).toFixed(1);
};

export default function AllDocumentsRankingPage() {
  const [tab, setTab] = useState("downloads");
  const rankedDocs = useMemo(() => {
    let docs = documents;
    if (tab === "downloads") {
      docs = docs.slice().sort((a, b) => b.downloads - a.downloads).slice(0, 12);
    } else if (tab === "rating") {
      docs = docs.slice().sort((a, b) => b.rating - a.rating).slice(0, 12);
    } else if (tab === "newest") {
      docs = docs.slice().sort((a, b) => b.id.localeCompare(a.id)).slice(0, 12);
    } else if (tab === "free") {
      docs = docs.filter(doc => doc.price === 0).slice(0, 12);
    }
    return docs;
  }, [tab]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Bảng xếp hạng tài liệu</h1>
        <div className="flex gap-4 mb-8">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-6 py-2 rounded-xl font-semibold transition-all ${tab === t.key ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {rankedDocs.map(doc => (
            <Link key={doc.id} href={`/documents/${createSlug(doc.subject)}/${createSlug(doc.subject + '-' + doc.class)}/${createSlug(doc.title)}`}>
              <Card className="h-full hover:scale-105 transition-all duration-300 cursor-pointer">
                <div className="flex flex-col space-y-2 pb-4">
                  <h3 className="tracking-tight text-lg font-semibold text-slate-900 line-clamp-2 mb-2">{doc.title}</h3>
                  <div className="flex gap-2 text-sm text-slate-600 mb-2">
                    <span>{doc.subject}</span>
                    <span>-</span>
                    <span>{doc.class}</span>
                  </div>
                  <div className="flex gap-4 text-xs text-slate-500">
                    <span>⭐ {getRandomRating(doc.id || doc.title)}</span>
                    <span>⬇️ {doc.downloads}</span>
                  </div>
                  <div className="text-blue-600 font-bold text-lg mt-2">{doc.price === 0 ? "Miễn phí" : doc.price.toLocaleString() + "₫"}</div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 