'use client';
import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { subjects, documents, classes, createSlug } from '@/lib/data';

export default function SubjectListPage() {
  // Đếm số tài liệu và lấy các lớp có sẵn cho mỗi môn học
  const subjectStats = subjects.map(subject => {
    const subjectDocs = documents.filter(doc => doc.subject === subject);
    const count = subjectDocs.length;
    const availableClasses = [...new Set(subjectDocs.map(doc => doc.class))];
    const slug = createSlug(subject);
    
    return { 
      subject, 
      count, 
      slug, 
      availableClasses 
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/documents" className="text-slate-500 hover:text-blue-600 transition-colors">
              Tất cả tài liệu
            </Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-900 font-medium">Môn học</span>
          </nav>
        </div>
      </div>

      {/* Header Section */}
      <section className="py-12 bg-gradient-to-br from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Tất cả môn học
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Chọn môn học để xem tài liệu liên quan
            </p>
          </div>
        </div>
      </section>

      {/* Subjects Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjectStats.map(({ subject, count, slug, availableClasses }) => (
              <div key={subject} className="space-y-4">
                <Link href={`/documents/${slug}`}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-2 border-transparent hover:border-blue-200">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl font-semibold text-slate-900">
                          {subject}
                        </CardTitle>
                        <div className="text-2xl">
                          {subject === 'Toán học' && '📐'}
                          {subject === 'Văn học' && '📖'}
                          {subject === 'Tiếng Anh' && '🇬🇧'}
                          {subject === 'Vật lý' && '⚡'}
                          {subject === 'Hóa học' && '🧪'}
                          {subject === 'Sinh học' && '🧬'}
                          {subject === 'Lịch sử' && '📜'}
                          {subject === 'Địa lý' && '🌍'}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">
                          {count} tài liệu
                        </span>
                        <div className="text-blue-600 font-medium">
                          Xem tất cả →
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
                
                {/* Hiển thị các lớp có sẵn */}
                {availableClasses.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-slate-700">Các lớp có sẵn:</h4>
                    <div className="flex flex-wrap gap-2">
                      {availableClasses.map(classItem => {
                        const classSlug = createSlug(classItem);
                                                 return (
                           <Link 
                             key={classItem} 
                             href={`/documents/${slug}/class/${classSlug}`}
                             className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-colors"
                           >
                             {classItem}
                           </Link>
                         );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 