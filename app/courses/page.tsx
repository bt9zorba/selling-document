import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

// Dữ liệu môn học
const subjects = [
  {
    id: 'math',
    name: 'Toán học',
    icon: '📐',
    color: 'bg-blue-500',
    description: 'Khóa học Toán từ cơ bản đến nâng cao',
    totalCourses: 15,
    totalStudents: 8500,
    classes: [
      { id: 'math-10', name: 'Lớp 10', courses: 5 },
      { id: 'math-11', name: 'Lớp 11', courses: 5 },
      { id: 'math-12', name: 'Lớp 12', courses: 5 },
    ]
  },
  {
    id: 'physics',
    name: 'Vật lý',
    icon: '⚡',
    color: 'bg-purple-500',
    description: 'Khóa học Vật lý thực tế và ứng dụng',
    totalCourses: 12,
    totalStudents: 6200,
    classes: [
      { id: 'physics-10', name: 'Lớp 10', courses: 4 },
      { id: 'physics-11', name: 'Lớp 11', courses: 4 },
      { id: 'physics-12', name: 'Lớp 12', courses: 4 },
    ]
  },
  {
    id: 'chemistry',
    name: 'Hóa học',
    icon: '🧪',
    color: 'bg-green-500',
    description: 'Khóa học Hóa học lý thuyết và thực hành',
    totalCourses: 12,
    totalStudents: 5800,
    classes: [
      { id: 'chemistry-10', name: 'Lớp 10', courses: 4 },
      { id: 'chemistry-11', name: 'Lớp 11', courses: 4 },
      { id: 'chemistry-12', name: 'Lớp 12', courses: 4 },
    ]
  },
  {
    id: 'biology',
    name: 'Sinh học',
    icon: '🧬',
    color: 'bg-emerald-500',
    description: 'Khóa học Sinh học từ tế bào đến hệ sinh thái',
    totalCourses: 12,
    totalStudents: 5200,
    classes: [
      { id: 'biology-10', name: 'Lớp 10', courses: 4 },
      { id: 'biology-11', name: 'Lớp 11', courses: 4 },
      { id: 'biology-12', name: 'Lớp 12', courses: 4 },
    ]
  },
  {
    id: 'english',
    name: 'Tiếng Anh',
    icon: '🇬🇧',
    color: 'bg-red-500',
    description: 'Khóa học Tiếng Anh giao tiếp và học thuật',
    totalCourses: 15,
    totalStudents: 7800,
    classes: [
      { id: 'english-10', name: 'Lớp 10', courses: 5 },
      { id: 'english-11', name: 'Lớp 11', courses: 5 },
      { id: 'english-12', name: 'Lớp 12', courses: 5 },
    ]
  },
];

// Dữ liệu khóa học nổi bật
const featuredCourses = [
  {
    id: 'math-12-advanced',
    title: 'Toán 12 - Nâng cao',
    subject: 'Toán học',
    level: 'Lớp 12',
    instructor: 'Thầy Nguyễn Văn A',
    rating: 4.8,
    students: 1250,
    price: 299000,
    originalPrice: 399000,
    duration: '6 tháng',
    lessons: 120,
    badge: 'Bán chạy nhất',
  },
  {
    id: 'physics-11-basic',
    title: 'Vật lý 11 - Cơ bản',
    subject: 'Vật lý',
    level: 'Lớp 11',
    instructor: 'Cô Trần Thị B',
    rating: 4.6,
    students: 890,
    price: 249000,
    originalPrice: 299000,
    duration: '4 tháng',
    lessons: 80,
    badge: 'Mới',
  },
  {
    id: 'chemistry-10-complete',
    title: 'Hóa học 10 - Toàn diện',
    subject: 'Hóa học',
    level: 'Lớp 10',
    instructor: 'Thầy Lê Văn C',
    rating: 4.7,
    students: 1100,
    price: 279000,
    originalPrice: 349000,
    duration: '5 tháng',
    lessons: 100,
    badge: 'Giảm giá',
  },
  {
    id: 'biology-12-exam',
    title: 'Sinh học 12 - Luyện thi THPT',
    subject: 'Sinh học',
    level: 'Lớp 12',
    instructor: 'Cô Phạm Thị D',
    rating: 4.9,
    students: 950,
    price: 329000,
    originalPrice: 429000,
    duration: '7 tháng',
    lessons: 140,
    badge: 'Hot',
  },
  {
    id: 'english-11-advanced',
    title: 'Tiếng Anh 11 - Nâng cao',
    subject: 'Tiếng Anh',
    level: 'Lớp 11',
    instructor: 'Thầy John Smith',
    rating: 4.8,
    students: 680,
    price: 259000,
    originalPrice: 359000,
    duration: '5 tháng',
    lessons: 90,
    badge: 'Chất lượng cao',
  },
  {
    id: 'math-10-basic',
    title: 'Toán 10 - Cơ bản',
    subject: 'Toán học',
    level: 'Lớp 10',
    instructor: 'Thầy Nguyễn Văn A',
    rating: 4.7,
    students: 850,
    price: 199000,
    originalPrice: 249000,
    duration: '4 tháng',
    lessons: 60,
    badge: 'Phù hợp người mới',
  },
];

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Khóa học trực tuyến
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Hơn 66 khóa học chất lượng cao cho học sinh THPT
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Tìm khóa học
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                Xem tất cả
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">66+</div>
              <p className="text-gray-600">Khóa học</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">33,500+</div>
              <p className="text-gray-600">Học sinh</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">15+</div>
              <p className="text-gray-600">Giảng viên</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">4.8</div>
              <p className="text-gray-600">Đánh giá trung bình</p>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Chọn môn học
            </h2>
            <p className="text-lg text-gray-600">
              Khám phá các môn học và khóa học phù hợp với bạn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subjects.map((subject) => (
              <Card key={subject.id} className="hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 ${subject.color} rounded-full flex items-center justify-center mr-4`}>
                      <span className="text-xl">{subject.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {subject.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {subject.totalCourses} khóa học
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6">
                    {subject.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    {subject.classes.map((classItem) => (
                      <Link 
                        key={classItem.id}
                        href={`/courses/${subject.id}/${classItem.id}`}
                        className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <span className="font-medium text-gray-900">{classItem.name}</span>
                        <span className="text-sm text-gray-500">{classItem.courses} khóa học</span>
                      </Link>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {subject.totalStudents.toLocaleString()} học sinh
                    </span>
                    <Link href={`/courses/${subject.id}/${subject.id}-10`}>
                      <Button size="sm">
                        Xem tất cả
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Khóa học nổi bật
            </h2>
            <p className="text-lg text-gray-600">
              Những khóa học được học sinh yêu thích nhất
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <div className="aspect-w-16 aspect-h-9">
                    <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                      <span className="text-white text-lg font-semibold">{course.subject}</span>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {course.badge}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-blue-600 font-medium">{course.subject}</span>
                    <span className="text-sm text-gray-500">{course.level}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {course.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-4">
                    Giảng viên: {course.instructor}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm text-gray-600">
                        {course.rating} ({course.students} học sinh)
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {course.duration} • {course.lessons} bài học
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-blue-600">
                        {course.price.toLocaleString('vi-VN')} ₫
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        {course.originalPrice.toLocaleString('vi-VN')} ₫
                      </span>
                    </div>
                    <Button size="sm">
                      Xem chi tiết
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Không tìm thấy khóa học phù hợp?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Liên hệ với chúng tôi để được tư vấn khóa học phù hợp với trình độ của bạn
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Liên hệ tư vấn
            </Button>
            <Button variant="outline" size="lg">
              Xem lịch khai giảng
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
} 