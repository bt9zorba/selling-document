'use client';
import { documents, createSlug } from '@/lib/data';

export default function TestPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Slugs</h1>
      <div className="space-y-4">
        <div>
          <h2 className="font-bold">Tất cả tài liệu:</h2>
          {documents.map(doc => {
            const subjectSlug = createSlug(doc.subject);
            const classSlug = createSlug(doc.subject + ' ' + doc.class);
            const titleSlug = createSlug(doc.title);
            return (
              <div key={doc.id} className="border p-2 mb-2">
                <p>Title: {doc.title}</p>
                <p>Subject: {doc.subject}</p>
                <p>Class: {doc.class}</p>
                <p>Subject Slug: {subjectSlug}</p>
                <p>Class Slug: {classSlug}</p>
                <p>Title Slug: {titleSlug}</p>
                <p>URL: /documents/{subjectSlug}/{classSlug}/{titleSlug}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 