'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/LoadingSkeleton';
import { documents, type DocumentType } from '@/lib/data';
import { Document as PDFDocument, Page as PDFPage, pdfjs } from 'react-pdf';
import ReviewForm from '@/components/ui/ReviewForm';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function DocumentPreviewPage() {
  const params = useParams();
  const documentId = params.id as string;
  const [document, setDocument] = useState<DocumentType | null>(null);
  const [loading, setLoading] = useState(true);
  const [previewPages, setPreviewPages] = useState<number>(3);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [numPages, setNumPages] = useState<number>(0);
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      const foundDoc = documents.find(doc => doc.id === documentId);
      setDocument(foundDoc || null);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [documentId]);

  useEffect(() => {
    // Load reviews từ localStorage
    const key = `reviews_${documentId}`;
    setReviews(JSON.parse(localStorage.getItem(key) || '[]'));
  }, [documentId]);

  const handlePurchase = async () => {
    setIsPurchasing(true);
    // Simulate purchase process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsPurchasing(false);
    // In real app, redirect to payment page or show success
    alert('Chuyển đến trang thanh toán...');
  };

  const handleAddToCart = async () => {
    // Simulate adding to cart
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(`Added document ${documentId} to cart`);
    alert('✅ Đã thêm vào giỏ hàng thành công!');
  };

  const handleReviewSubmit = () => {
    const key = `reviews_${documentId}`;
    setReviews(JSON.parse(localStorage.getItem(key) || '[]'));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Document Info Skeleton */}
            <div className="lg:col-span-1">
              <Card className="p-6">
                <Skeleton variant="text" lines={3} className="mb-4" />
                <Skeleton variant="rectangular" width="100%" height="200" className="mb-4" />
                <Skeleton variant="text" lines={2} />
              </Card>
            </div>
            
            {/* Preview Skeleton */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <Skeleton variant="text" lines={2} className="mb-6" />
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton key={index} variant="rectangular" width="100%" height="400" />
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Tài liệu không tồn tại</h1>
          <p className="text-gray-600 mb-6">Tài liệu bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.</p>
          <Link href="/">
            <Button>Về trang chủ</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Trang chủ
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li>
              <Link href="/documents" className="hover:text-blue-600 transition-colors">
                Tài liệu
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li>
              <Link href={`/documents/${document.subject.toLowerCase().replace(/\s+/g, '-').replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a').replace(/[èéẹẻẽêềếệểễ]/g, 'e').replace(/[ìíịỉĩ]/g, 'i').replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o').replace(/[ùúụủũưừứựửữ]/g, 'u').replace(/[ỳýỵỷỹ]/g, 'y').replace(/đ/g, 'd')}`} className="hover:text-blue-600 transition-colors">
                {document.subject}
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-900 font-medium">Xem thử</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Document Info */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {document.subject}
                  </span>
                  <span className="text-sm text-gray-500">{document.class}</span>
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  {document.title}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {document.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Document Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600">⭐ {document.rating}</div>
                    <div className="text-gray-600">Đánh giá</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-green-600">{document.downloads}</div>
                    <div className="text-gray-600">Lượt tải</div>
                  </div>
                </div>

                {/* Document Details */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tác giả:</span>
                    <span className="font-medium">{document.author}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Số trang:</span>
                    <span className="font-medium">{document.pages} trang</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Kích thước:</span>
                    <span className="font-medium">{document.fileSize}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Định dạng:</span>
                    <span className="font-medium">{document.fileType}</span>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Tags:</h4>
                  <div className="flex flex-wrap gap-2">
                    {document.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Preview Info */}
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-blue-600">👁️</span>
                    <span className="font-medium text-blue-900">Xem thử miễn phí</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    Bạn đang xem {previewPages} trang đầu tiên của tài liệu này. 
                    Mua để xem toàn bộ {document.pages} trang.
                  </p>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-3">
                {/* Price */}
                <div className="text-center w-full">
                  <div className="text-3xl font-bold text-blue-600">
                    {document.price.toLocaleString('vi-VN')}đ
                  </div>
                  <div className="text-sm text-gray-500 line-through">
                    {(document.price * 1.2).toLocaleString('vi-VN')}đ
                  </div>
                  <div className="text-xs text-green-600 font-medium">
                    Tiết kiệm 20%
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="w-full space-y-3">
                  <Button 
                    size="lg" 
                    className="w-full"
                    onClick={handlePurchase}
                    disabled={isPurchasing}
                    icon={isPurchasing ? "⏳" : "💳"}
                  >
                    {isPurchasing ? 'Đang xử lý...' : 'Mua ngay'}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full"
                    onClick={handleAddToCart}
                    icon="🛒"
                  >
                    Thêm vào giỏ hàng
                  </Button>
                </div>

                {/* Security Badge */}
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                  <span>🔒</span>
                  <span>Thanh toán an toàn</span>
                </div>
              </CardFooter>
            </Card>
          </div>

          {/* Document Preview */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">Xem thử tài liệu</CardTitle>
                    <CardDescription>
                      Trang {previewPages} đầu tiên của {document.pages} trang
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Hiển thị:</span>
                    <select
                      value={previewPages}
                      onChange={(e) => setPreviewPages(Number(e.target.value))}
                      className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value={3}>3 trang</option>
                      <option value={5}>5 trang</option>
                      <option value={10}>10 trang</option>
                    </select>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-6">
                  {document.fileUrl ? (
                    <PDFDocument
                      file={document.fileUrl}
                      onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                      loading={<div>Đang tải file PDF...</div>}
                      error={<div>Không thể hiển thị file PDF.</div>}
                    >
                      {Array.from({ length: Math.min(previewPages, numPages) }).map((_, idx) => (
                        <div key={idx} className="bg-white border border-gray-200 rounded-xl p-2 shadow-sm mb-6">
                          <PDFPage pageNumber={idx + 1} width={700} />
                          <div className="text-center mt-2 text-xs text-gray-500">Trang {idx + 1}</div>
                        </div>
                      ))}
                    </PDFDocument>
                  ) : (
                    Array.from({ length: previewPages }).map((_, index) => (
                      <div key={index} className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                        <div className="text-center mb-6">
                          <div className="text-sm text-gray-500 mb-2">Trang {index + 1}</div>
                          <div className="w-16 h-1 bg-gray-300 rounded-full mx-auto"></div>
                        </div>
                        <div className="space-y-4">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-4 bg-gray-200 rounded w-full"></div>
                          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                          <div className="h-4 bg-gray-200 rounded w-full"></div>
                          <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                          <div className="h-4 bg-gray-200 rounded w-full"></div>
                          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                          <div className="h-4 bg-gray-200 rounded w-full"></div>
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        </div>
                        <div className="text-center mt-6 pt-4 border-t border-gray-100">
                          <span className="text-sm text-gray-500">{index + 1}</span>
                        </div>
                      </div>
                    ))
                  )}

                  {/* Purchase CTA */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 text-center border border-blue-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Bạn thích tài liệu này?
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Mua ngay để xem toàn bộ {document.pages} trang và tải về sử dụng offline
                    </p>
                    <div className="flex gap-3 justify-center">
                      <Button 
                        size="lg"
                        onClick={handlePurchase}
                        disabled={isPurchasing}
                        icon={isPurchasing ? "⏳" : "💳"}
                      >
                        {isPurchasing ? 'Đang xử lý...' : 'Mua ngay'}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="lg"
                        onClick={handleAddToCart}
                        icon="🛒"
                      >
                        Thêm vào giỏ
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Đánh giá & Bình luận */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900">Đánh giá & Bình luận</CardTitle>
              </CardHeader>
              <CardContent>
                <ReviewForm documentId={documentId} onSubmit={handleReviewSubmit} />
                <div className="mt-6 space-y-6">
                  {reviews.length > 0 ? reviews.map((review: any) => (
                    <div key={review.id} className="border-b border-gray-100 pb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-blue-700">{review.userName}</span>
                        <span className="flex items-center text-yellow-500 text-sm">{'★'.repeat(Math.round(review.rating))}<span className="ml-1 text-gray-600 font-medium">{review.rating.toFixed(1)}</span></span>
                        <span className="text-xs text-gray-400 ml-2">{review.createdAt}</span>
                      </div>
                      <div className="text-gray-800 text-sm">{review.comment}</div>
                    </div>
                  )) : <div className="text-gray-500 italic">Chưa có bình luận.</div>}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 