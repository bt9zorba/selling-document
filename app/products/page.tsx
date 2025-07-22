import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

// Mock data
const products = [
  {
    id: '1',
    name: 'Tài liệu bán hàng B2B',
    description: 'Hướng dẫn chi tiết về quy trình bán hàng B2B hiệu quả',
    price: 299000,
    category: 'Tài liệu bán hàng',
    rating: 4.5,
    reviewCount: 128,
    image: '/images/product-1.jpg',
  },
  {
    id: '2',
    name: 'Template Proposal chuyên nghiệp',
    description: 'Bộ template proposal đẹp mắt, chuyên nghiệp cho doanh nghiệp',
    price: 199000,
    category: 'Templates',
    rating: 4.8,
    reviewCount: 89,
    image: '/images/product-2.jpg',
  },
  {
    id: '3',
    name: 'Hướng dẫn đàm phán giá',
    description: 'Kỹ năng đàm phán giá và thương lượng với khách hàng',
    price: 399000,
    category: 'Hướng dẫn',
    rating: 4.6,
    reviewCount: 156,
    image: '/images/product-3.jpg',
  },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Sản phẩm của chúng tôi
          </h1>
          <p className="text-gray-600">
            Khám phá bộ sưu tập tài liệu bán hàng chất lượng cao
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-4">
          <Button variant="outline" size="sm">
            Tất cả
          </Button>
          <Button variant="outline" size="sm">
            Tài liệu bán hàng
          </Button>
          <Button variant="outline" size="sm">
            Templates
          </Button>
          <Button variant="outline" size="sm">
            Hướng dẫn
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Hình ảnh sản phẩm</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {product.description}
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviewCount})
                    </span>
                  </div>
                  <span className="text-lg font-bold text-blue-600">
                    {product.price.toLocaleString('vi-VN')} ₫
                  </span>
                </div>
                
                <Button className="w-full">
                  Xem chi tiết
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-8 text-center">
          <Button variant="outline" size="lg">
            Xem thêm sản phẩm
          </Button>
        </div>
      </div>
    </div>
  );
} 