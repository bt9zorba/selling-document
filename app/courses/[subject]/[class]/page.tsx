import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

// Dữ liệu khóa học theo môn và lớp
const courseData = {
  math: {
    name: 'Toán học',
    icon: '📐',
    color: 'bg-blue-500',
    classes: {
      'math-10': {
        name: 'Lớp 10',
        description: 'Khóa học Toán lớp 10 toàn diện',
        topics: [
          { name: 'Đại số', lessons: 25, duration: '2 tháng' },
          { name: 'Hình học', lessons: 20, duration: '1.5 tháng' },
          { name: 'Lượng giác', lessons: 15, duration: '1 tháng' },
        ],
        courses: [
          {
            id: 'math-10-basic',
            title: 'Toán 10 - Cơ bản',
            instructor: 'Thầy Nguyễn Văn A',
            rating: 4.7,
            students: 850,
            price: 199000,
            originalPrice: 249000,
            duration: '4 tháng',
            lessons: 60,
            level: 'Cơ bản',
            description: 'Khóa học cơ bản cho học sinh mới bắt đầu lớp 10'
          },
          {
            id: 'math-10-advanced',
            title: 'Toán 10 - Nâng cao',
            instructor: 'Cô Trần Thị B',
            rating: 4.8,
            students: 650,
            price: 299000,
            originalPrice: 399000,
            duration: '6 tháng',
            lessons: 90,
            level: 'Nâng cao',
            description: 'Khóa học nâng cao cho học sinh khá giỏi'
          },
          {
            id: 'math-10-complete',
            title: 'Toán 10 - Toàn diện',
            instructor: 'Thầy Lê Văn C',
            rating: 4.9,
            students: 1200,
            price: 399000,
            originalPrice: 499000,
            duration: '8 tháng',
            lessons: 120,
            level: 'Toàn diện',
            description: 'Khóa học đầy đủ nhất cho lớp 10'
          }
        ]
      },
      'math-11': {
        name: 'Lớp 11',
        description: 'Khóa học Toán lớp 11 chuyên sâu',
        topics: [
          { name: 'Giải tích', lessons: 30, duration: '2.5 tháng' },
          { name: 'Hình học không gian', lessons: 25, duration: '2 tháng' },
          { name: 'Xác suất', lessons: 15, duration: '1 tháng' },
        ],
        courses: [
          {
            id: 'math-11-basic',
            title: 'Toán 11 - Cơ bản',
            instructor: 'Thầy Nguyễn Văn A',
            rating: 4.6,
            students: 720,
            price: 249000,
            originalPrice: 299000,
            duration: '5 tháng',
            lessons: 70,
            level: 'Cơ bản',
            description: 'Khóa học cơ bản cho học sinh lớp 11'
          },
          {
            id: 'math-11-advanced',
            title: 'Toán 11 - Nâng cao',
            instructor: 'Cô Trần Thị B',
            rating: 4.8,
            students: 580,
            price: 349000,
            originalPrice: 449000,
            duration: '7 tháng',
            lessons: 100,
            level: 'Nâng cao',
            description: 'Khóa học nâng cao cho học sinh khá giỏi'
          }
        ]
      },
      'math-12': {
        name: 'Lớp 12',
        description: 'Khóa học Toán lớp 12 luyện thi THPT',
        topics: [
          { name: 'Đạo hàm', lessons: 20, duration: '1.5 tháng' },
          { name: 'Tích phân', lessons: 25, duration: '2 tháng' },
          { name: 'Hình học giải tích', lessons: 20, duration: '1.5 tháng' },
        ],
        courses: [
          {
            id: 'math-12-basic',
            title: 'Toán 12 - Cơ bản',
            instructor: 'Thầy Nguyễn Văn A',
            rating: 4.7,
            students: 950,
            price: 299000,
            originalPrice: 399000,
            duration: '6 tháng',
            lessons: 80,
            level: 'Cơ bản',
            description: 'Khóa học cơ bản cho học sinh lớp 12'
          },
          {
            id: 'math-12-advanced',
            title: 'Toán 12 - Nâng cao',
            instructor: 'Cô Trần Thị B',
            rating: 4.9,
            students: 780,
            price: 399000,
            originalPrice: 499000,
            duration: '8 tháng',
            lessons: 120,
            level: 'Nâng cao',
            description: 'Khóa học nâng cao luyện thi THPT'
          }
        ]
      }
    }
  },
  physics: {
    name: 'Vật lý',
    icon: '⚡',
    color: 'bg-purple-500',
    classes: {
      'physics-10': {
        name: 'Lớp 10',
        description: 'Khóa học Vật lý lớp 10 cơ bản',
        topics: [
          { name: 'Cơ học', lessons: 20, duration: '2 tháng' },
          { name: 'Nhiệt học', lessons: 15, duration: '1.5 tháng' },
          { name: 'Điện học', lessons: 18, duration: '1.5 tháng' },
        ],
        courses: [
          {
            id: 'physics-10-basic',
            title: 'Vật lý 10 - Cơ bản',
            instructor: 'Thầy Phạm Văn D',
            rating: 4.5,
            students: 680,
            price: 199000,
            originalPrice: 249000,
            duration: '4 tháng',
            lessons: 53,
            level: 'Cơ bản',
            description: 'Khóa học cơ bản cho học sinh lớp 10'
          }
        ]
      },
      'physics-11': {
        name: 'Lớp 11',
        description: 'Khóa học Vật lý lớp 11 chuyên sâu',
        topics: [
          { name: 'Điện từ học', lessons: 25, duration: '2 tháng' },
          { name: 'Quang học', lessons: 20, duration: '1.5 tháng' },
          { name: 'Cơ học chất lưu', lessons: 15, duration: '1 tháng' },
        ],
        courses: [
          {
            id: 'physics-11-basic',
            title: 'Vật lý 11 - Cơ bản',
            instructor: 'Cô Trần Thị B',
            rating: 4.6,
            students: 890,
            price: 249000,
            originalPrice: 299000,
            duration: '5 tháng',
            lessons: 60,
            level: 'Cơ bản',
            description: 'Khóa học cơ bản cho học sinh lớp 11'
          }
        ]
      },
      'physics-12': {
        name: 'Lớp 12',
        description: 'Khóa học Vật lý lớp 12 luyện thi THPT',
        topics: [
          { name: 'Dao động cơ', lessons: 20, duration: '1.5 tháng' },
          { name: 'Sóng cơ', lessons: 18, duration: '1.5 tháng' },
          { name: 'Điện xoay chiều', lessons: 22, duration: '2 tháng' },
        ],
        courses: [
          {
            id: 'physics-12-basic',
            title: 'Vật lý 12 - Cơ bản',
            instructor: 'Thầy Phạm Văn D',
            rating: 4.7,
            students: 1100,
            price: 299000,
            originalPrice: 399000,
            duration: '6 tháng',
            lessons: 60,
            level: 'Cơ bản',
            description: 'Khóa học cơ bản cho học sinh lớp 12'
          }
        ]
      }
    }
  }
};

interface Topic {
  name: string;
  lessons: number;
  duration: string;
}

interface Course {
  id: string;
  title: string;
  instructor: string;
  rating: number;
  students: number;
  price: number;
  originalPrice: number;
  duration: string;
  lessons: number;
  level: string;
  description: string;
}

interface ClassData {
  name: string;
  description: string;
  topics: Topic[];
  courses: Course[];
}

interface SubjectData {
  name: string;
  icon: string;
  color: string;
  classes: Record<string, ClassData>;
}

interface PageProps {
  params: {
    subject: string;
    class: string;
  };
}

export default function CoursePage({ params }: PageProps) {
  const { subject, class: classId } = params;
  const subjectData = courseData[subject as keyof typeof courseData] as SubjectData | undefined;
  const classData = subjectData?.classes[classId] as ClassData | undefined;

  if (!subjectData || !classData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Không tìm thấy khóa học
          </h1>
          <p className="text-gray-600 mb-8">
            Khóa học bạn đang tìm kiếm không tồn tại.
          </p>
          <Link href="/">
            <Button>Về trang chủ</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-center mb-8">
            <div className={`w-20 h-20 ${subjectData.color} rounded-full flex items-center justify-center mr-6`}>
              <span className="text-3xl">{subjectData.icon}</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">
                {subjectData.name} - {classData.name}
              </h1>
              <p className="text-xl text-blue-100">
                {classData.description}
              </p>
            </div>
          </div>
          
          {/* Breadcrumb */}
          <nav className="flex justify-center">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link href="/" className="text-blue-200 hover:text-white">
                  Trang chủ
                </Link>
              </li>
              <li className="text-blue-300">/</li>
              <li>
                <Link href="/" className="text-blue-200 hover:text-white">
                  Khóa học
                </Link>
              </li>
              <li className="text-blue-300">/</li>
              <li className="text-white">{subjectData.name}</li>
              <li className="text-blue-300">/</li>
              <li className="text-white">{classData.name}</li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Topics Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nội dung khóa học
            </h2>
            <p className="text-lg text-gray-600">
              Khám phá các chủ đề sẽ được học trong khóa học này
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {classData.topics.map((topic, index) => (
              <Card key={index} className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-blue-600">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {topic.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {topic.lessons} bài học • {topic.duration}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Các khóa học có sẵn
            </h2>
            <p className="text-lg text-gray-600">
              Chọn khóa học phù hợp với trình độ của bạn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {classData.courses.map((course) => (
              <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-w-16 aspect-h-9">
                  <div className={`w-full h-48 ${subjectData.color} flex items-center justify-center`}>
                    <span className="text-white text-lg font-semibold">{course.level}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-blue-600 font-medium">{course.level}</span>
                    <span className="text-sm text-gray-500">{course.duration}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {course.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-4">
                    {course.description}
                  </p>
                  
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
                      {course.lessons} bài học
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
                      Đăng ký ngay
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Related Subjects */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Khám phá các môn học khác
            </h2>
            <p className="text-lg text-gray-600">
              Mở rộng kiến thức với các môn học liên quan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(courseData).map(([subjectKey, subjectData]) => (
              subjectKey !== subject && (
                <Link key={subjectKey} href={`/courses/${subjectKey}/${subjectKey}-10`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="text-center p-6">
                      <div className={`w-16 h-16 ${subjectData.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <span className="text-2xl">{subjectData.icon}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {subjectData.name}
                      </h3>
                      <p className="text-gray-600">
                        Khám phá khóa học {subjectData.name}
                      </p>
                    </div>
                  </Card>
                </Link>
              )
            ))}
          </div>
        </div>
      </section>

    </div>
  );
} 