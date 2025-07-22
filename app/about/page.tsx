import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Về chúng tôi
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Chuyên cung cấp các tài liệu bán hàng chất lượng cao, giúp doanh nghiệp 
            tối ưu hóa quy trình bán hàng và tăng doanh thu.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="text-center">
            <CardHeader>
              <CardTitle>Sứ mệnh</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Cung cấp những tài liệu bán hàng chất lượng cao, giúp các doanh nghiệp 
                Việt Nam nâng cao hiệu quả bán hàng và phát triển bền vững.
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <CardTitle>Tầm nhìn</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Trở thành đối tác tin cậy hàng đầu trong việc cung cấp tài liệu bán hàng 
                và đào tạo kỹ năng bán hàng tại Việt Nam.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Giá trị cốt lõi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardHeader>
                <CardTitle>Chất lượng</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl mb-4">⭐</div>
                <p className="text-gray-600">
                  Cam kết cung cấp tài liệu chất lượng cao, được nghiên cứu và biên soạn 
                  bởi các chuyên gia hàng đầu.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <CardTitle>Uy tín</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl mb-4">🤝</div>
                <p className="text-gray-600">
                  Xây dựng mối quan hệ tin cậy với khách hàng thông qua sự minh bạch 
                  và cam kết chất lượng.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <CardTitle>Đổi mới</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl mb-4">🚀</div>
                <p className="text-gray-600">
                  Liên tục cập nhật và đổi mới nội dung để phù hợp với xu hướng 
                  thị trường hiện đại.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Đội ngũ của chúng tôi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                name: 'Nguyễn Văn A',
                position: 'CEO & Founder',
                description: '15+ năm kinh nghiệm trong lĩnh vực bán hàng và marketing',
              },
              {
                name: 'Trần Thị B',
                position: 'Head of Content',
                description: 'Chuyên gia nội dung với 10+ năm kinh nghiệm',
              },
              {
                name: 'Lê Văn C',
                position: 'Sales Director',
                description: 'Chuyên gia tư vấn bán hàng B2B',
              },
              {
                name: 'Phạm Thị D',
                position: 'Customer Success',
                description: 'Đảm bảo trải nghiệm khách hàng tốt nhất',
              },
            ].map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent>
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-gray-500 text-2xl">👤</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-2">
                    {member.position}
                  </p>
                  <p className="text-sm text-gray-600">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Thành tựu của chúng tôi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">1000+</div>
              <p className="text-gray-600">Khách hàng tin tưởng</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <p className="text-gray-600">Tài liệu chất lượng</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <p className="text-gray-600">Doanh nghiệp đối tác</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">5+</div>
              <p className="text-gray-600">Năm kinh nghiệm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 