"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { documents, createSlug } from "@/lib/data";

// Thêm hàm random rating cho mỗi tài liệu
const getRandomRating = (seed: string) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  const rand = Math.abs(Math.sin(hash) * 10000) % 1;
  return (4.8 + rand * 0.2).toFixed(1);
};

export default function FeaturedDocumentsPage() {
  const [sortBy, setSortBy] = useState("rating");
  const featuredDocs = useMemo(() => {
    let docs = documents.filter(doc => doc.rating >= 4.5 || doc.downloads > 1000);
    if (sortBy === "downloads") {
      docs = docs.slice().sort((a, b) => b.downloads - a.downloads);
    } else {
      docs = docs.slice().sort((a, b) => b.rating - a.rating);
    }
    return docs;
  }, [sortBy]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Tài liệu nổi bật</h1>
        <div className="flex gap-4 mb-8">
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="border rounded-xl px-4 py-2">
            <option value="rating">Đánh giá cao</option>
            <option value="downloads">Lượt tải nhiều</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDocs.map(doc => (
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