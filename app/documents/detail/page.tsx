'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/LoadingSkeleton';
import { documents, type DocumentType } from '@/lib/data';

export default function DocumentDetailPage() {
  const params = useParams();
  const documentId = params.id as string;
  const [document, setDocument] = useState<DocumentType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [relatedDocuments, setRelatedDocuments] = useState<DocumentType[]>([]);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      const foundDoc = documents.find(doc => doc.id === documentId);
      setDocument(foundDoc || null);
      
      // Get related documents
      if (foundDoc) {
        // Gợi ý tài liệu liên quan tối ưu hơn
        const related = documents
          .filter(doc => doc.id !== documentId && (
            doc.subject === foundDoc.subject ||
            doc.class === foundDoc.class ||
            doc.tags.some(tag => foundDoc.tags.includes(tag))
          ))
          .sort((a, b) => {
            // Ưu tiên cùng lớp, cùng tag, rồi cùng subject
            let scoreA = 0, scoreB = 0;
            if (a.class === foundDoc.class) scoreA += 2;
            if (b.class === foundDoc.class) scoreB += 2;
            scoreA += a.tags.filter(tag => foundDoc.tags.includes(tag)).length;
            scoreB += b.tags.filter(tag => foundDoc.tags.includes(tag)).length;
            if (a.subject === foundDoc.subject) scoreA += 1;
            if (b.subject === foundDoc.subject) scoreB += 1;
            return scoreB - scoreA;
          })
          .slice(0, 4);
        setRelatedDocuments(related);
      }
      
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [documentId]);

  const handlePurchase = async () => {
    setIsPurchasing(true);
    // Simulate purchase process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsPurchasing(false);
    // In real app, redirect to payment page
    alert('Chuyển đến trang thanh toán...');
  };

  const handleAddToCart = async () => {
    // Simulate adding to cart
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(`Added document ${documentId} to cart`);
    alert('✅ Đã thêm vào giỏ hàng thành công!');
  };

  const handlePreview = () => {
    // Navigate to preview page
    window.location.href = `/documents/preview/${documentId}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Document Info Skeleton */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <Skeleton variant="text" lines={3} className="mb-4" />
                <Skeleton variant="rectangular" width="100%" height="300" className="mb-4" />
                <Skeleton variant="text" lines={5} />
              </Card>
            </div>
            
            {/* Purchase Card Skeleton */}
            <div className="lg:col-span-1">
              <Card className="p-6">
                <Skeleton variant="text" lines={2} className="mb-4" />
                <Skeleton variant="rectangular" width="100%" height="100" className="mb-4" />
                <Skeleton variant="text" lines={3} />
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
            <li className="text-gray-900 font-medium">{document.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Document Details */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {document.subject}
                    </span>
                    <span className="text-sm text-gray-500">{document.class}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>⭐ {document.rating}</span>
                    <span>•</span>
                    <span>{document.downloads} lượt tải</span>
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
                  {document.title}
                </CardTitle>
                <CardDescription className="text-lg text-gray-600 leading-relaxed">
                  {document.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-8">
                {/* Document Image/Preview */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-4xl">📄</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Tài liệu {document.fileType}</h3>
                  <p className="text-gray-600">{document.fileSize} • {document.pages} trang</p>
                </div>

                {/* Document Features */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Tính năng nổi bật</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                      <span className="text-blue-600 text-xl">✅</span>
                      <div>
                        <div className="font-medium text-gray-900">Chất lượng cao</div>
                        <div className="text-sm text-gray-600">Được biên soạn bởi giáo viên có kinh nghiệm</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
                      <span className="text-green-600 text-xl">📱</span>
                      <div>
                        <div className="font-medium text-gray-900">Tải về offline</div>
                        <div className="text-sm text-gray-600">Sử dụng mọi lúc, mọi nơi</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl">
                      <span className="text-purple-600 text-xl">🔄</span>
                      <div>
                        <div className="font-medium text-gray-900">Cập nhật thường xuyên</div>
                        <div className="text-sm text-gray-600">Theo chương trình mới nhất</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-xl">
                      <span className="text-orange-600 text-xl">💬</span>
                      <div>
                        <div className="font-medium text-gray-900">Hỗ trợ 24/7</div>
                        <div className="text-sm text-gray-600">Tư vấn và giải đáp thắc mắc</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Document Content Preview */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Nội dung tài liệu</h3>
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">Mục lục</span>
                        <span className="text-sm text-gray-500">{document.pages} trang</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          <span>Phần 1: Lý thuyết cơ bản</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          <span>Phần 2: Bài tập vận dụng</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          <span>Phần 3: Đề thi thử</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          <span>Phần 4: Đáp án chi tiết</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {document.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Author Info */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Về tác giả</h3>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {document.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{document.author}</div>
                      <div className="text-sm text-gray-600">Giáo viên có kinh nghiệm giảng dạy</div>
                      <div className="text-sm text-gray-500">Đã xuất bản {Math.floor(Math.random() * 50) + 10} tài liệu</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Documents */}
            {relatedDocuments.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Tài liệu liên quan</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {relatedDocuments.map((doc) => (
                    <Card key={doc.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {doc.subject}
                          </span>
                          <span className="text-xs text-gray-500">{doc.class}</span>
                        </div>
                        <h4 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2">
                          {doc.title}
                        </h4>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>⭐ {doc.rating}</span>
                          <span>{doc.price.toLocaleString('vi-VN')}đ</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Purchase Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-xl">Mua tài liệu</CardTitle>
                <CardDescription>
                  Sở hữu ngay tài liệu chất lượng cao này
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Price */}
                <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                  <div className="text-4xl font-bold text-blue-600">
                    {document.price.toLocaleString('vi-VN')}đ
                  </div>
                  <div className="text-sm text-gray-500 line-through">
                    {(document.price * 1.2).toLocaleString('vi-VN')}đ
                  </div>
                  <div className="text-xs text-green-600 font-medium">
                    Tiết kiệm 20%
                  </div>
                </div>

                {/* What you get */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Bạn sẽ nhận được:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">✅</span>
                      <span>Toàn bộ {document.pages} trang tài liệu</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">✅</span>
                      <span>Tải về và sử dụng offline</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">✅</span>
                      <span>Cập nhật miễn phí trong 1 năm</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">✅</span>
                      <span>Hỗ trợ tư vấn 24/7</span>
                    </li>
                  </ul>
                </div>

                {/* Preview Button */}
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full"
                  onClick={handlePreview}
                  icon="👁️"
                >
                  Xem thử miễn phí
                </Button>
              </CardContent>

              <CardFooter className="flex flex-col gap-3">
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

                {/* Money Back Guarantee */}
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-sm font-medium text-green-800 mb-1">
                    🛡️ Bảo hành 30 ngày
                  </div>
                  <div className="text-xs text-green-600">
                    Hoàn tiền nếu không hài lòng
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 