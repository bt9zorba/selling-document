// Data types and interfaces
export interface DocumentType {
  id: string;
  title: string;
  description: string;
  subject: string;
  class: string;
  category: string;
  author: string;
  price: number;
  rating: number;
  downloads: number;
  pages: number;
  tags: string[];
  image?: string;
  fileSize?: string;
  fileType?: string;
  fileUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  reviews?: {
    id: string;
    userName: string;
    rating: number;
    comment: string;
    createdAt: string;
  }[];
}

// Subjects list
export const subjects = [
  'Toán học',
  'Văn học', 
  'Tiếng Anh',
  'Vật lý',
  'Hóa học',
  'Sinh học',
  'Lịch sử',
  'Địa lý'
];

// Classes list
export const classes = [
  'Lớp 6',
  'Lớp 7',
  'Lớp 8',
  'Lớp 9',
  'Lớp 10',
  'Lớp 11',
  'Lớp 12'
];

// Documents data
export const documents: DocumentType[] = [
  {
    id: '1',
    title: 'Bộ đề thi thử THPT Quốc Gia môn Toán 2025',
    description: 'Tuyển tập 50 đề thi thử môn Toán với đáp án chi tiết, bám sát cấu trúc đề thi mới nhất.',
    subject: 'Toán học',
    class: 'Lớp 12',
    category: 'Đề thi',
    author: 'Thầy Nguyễn Văn A',
    price: 25000,
    rating: 4.95,
    downloads: 1250,
    pages: 180,
    tags: ['đề thi', 'thpt', 'toán', '2025'],
    fileSize: '2.5 MB',
    fileType: 'PDF',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
    reviews: [
      {
        id: 'r1',
        userName: 'Nguyễn Minh',
        rating: 5,
        comment: 'Bộ đề rất sát với đề thi thật, đáp án chi tiết dễ hiểu. Nhờ bộ này mà mình tự tin hơn khi ôn thi!',
        createdAt: '2024-03-01'
      },
      {
        id: 'r2',
        userName: 'Lê Thảo',
        rating: 4.9,
        comment: 'Tài liệu trình bày rõ ràng, nhiều câu hỏi hay. Nếu có thêm phần giải thích lý thuyết thì sẽ tuyệt vời hơn.',
        createdAt: '2024-03-02'
      },
      {
        id: 'r3',
        userName: 'Trần Quang',
        rating: 4.8,
        comment: 'Đề cập nhật mới, sát cấu trúc. Mong có thêm đề nâng cao.',
        createdAt: '2024-03-03'
      }
    ]
  },
  {
    id: '2',
    title: 'Giáo án Văn học lớp 10 - Chương trình mới',
    description: 'Bộ giáo án chi tiết môn Văn học lớp 10 theo chương trình GDPT 2018, đầy đủ các bài học.',
    subject: 'Văn học',
    class: 'Lớp 10',
    category: 'Giáo án',
    author: 'Cô Trần Thị B',
    price: 35000,
    rating: 4.9,
    downloads: 890,
    pages: 220,
    tags: ['giáo án', 'văn học', 'lớp 10', 'chương trình mới'],
    fileSize: '3.2 MB',
    fileType: 'DOCX',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-12',
    reviews: [
      {
        id: 'r1',
        userName: 'Phạm Hương',
        rating: 5,
        comment: 'Giáo án rất chi tiết, bám sát chương trình mới. Cảm ơn tác giả!',
        createdAt: '2024-02-20'
      },
      {
        id: 'r2',
        userName: 'Ngô Văn',
        rating: 4.8,
        comment: 'Có thể bổ sung thêm hoạt động nhóm cho học sinh sẽ tốt hơn.',
        createdAt: '2024-02-22'
      }
    ]
  },
  {
    id: '3',
    title: 'Bài tập trắc nghiệm Tiếng Anh lớp 9',
    description: '500 câu hỏi trắc nghiệm Tiếng Anh lớp 9 với đáp án và giải thích chi tiết.',
    subject: 'Tiếng Anh',
    class: 'Lớp 9',
    category: 'Bài tập',
    author: 'Thầy Lê Văn C',
    price: 20000,
    rating: 4.85,
    downloads: 2100,
    pages: 150,
    tags: ['trắc nghiệm', 'tiếng anh', 'lớp 9', 'bài tập'],
    fileSize: '1.8 MB',
    fileType: 'PDF',
    createdAt: '2024-01-08',
    updatedAt: '2024-01-08',
    reviews: [
      {
        id: 'r1',
        userName: 'Lưu Hà',
        rating: 5,
        comment: 'Bài tập đa dạng, có đáp án chi tiết. Rất phù hợp để luyện thi.',
        createdAt: '2024-01-30'
      },
      {
        id: 'r2',
        userName: 'Đặng Tuấn',
        rating: 4.7,
        comment: 'Một số câu hơi dễ, mong có thêm bài nâng cao.',
        createdAt: '2024-02-01'
      }
    ]
  },
  {
    id: '4',
    title: 'Chuyên đề Vật lý - Dao động cơ học',
    description: 'Chuyên đề sâu về dao động cơ học với lý thuyết và bài tập từ cơ bản đến nâng cao.',
    subject: 'Vật lý',
    class: 'Lớp 12',
    category: 'Chuyên đề',
    author: 'Thầy Phạm Văn D',
    price: 30000,
    rating: 4.9,
    downloads: 750,
    pages: 120,
    tags: ['chuyên đề', 'vật lý', 'dao động', 'lớp 12'],
    fileSize: '2.1 MB',
    fileType: 'PDF',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-07',
    reviews: [
      {
        id: 'r1',
        userName: 'Nguyễn Văn Hùng',
        rating: 5,
        comment: 'Tài liệu rất chi tiết, bài tập đa dạng, có cả phần nâng cao. Rất hữu ích cho ôn thi học sinh giỏi!',
        createdAt: '2024-03-05'
      },
      {
        id: 'r2',
        userName: 'Lê Thị Thu',
        rating: 4.8,
        comment: 'Lý thuyết trình bày dễ hiểu, có thể bổ sung thêm sơ đồ tư duy sẽ tốt hơn.',
        createdAt: '2024-03-06'
      },
      {
        id: 'r3',
        userName: 'Phạm Minh',
        rating: 4.9,
        comment: 'Bài tập phân loại rõ ràng, đáp án chi tiết. Cảm ơn tác giả!',
        createdAt: '2024-03-07'
      },
      {
        id: 'r4',
        userName: 'Trần Quang',
        rating: 4.9,
        comment: 'Có nhiều ví dụ thực tế, giúp mình hiểu sâu hơn về dao động cơ học.',
        createdAt: '2024-03-08'
      }
    ]
  },
  {
    id: '5',
    title: 'Bộ đề kiểm tra Hóa học lớp 11',
    description: 'Tuyển tập đề kiểm tra 1 tiết và học kỳ môn Hóa học lớp 11 với đáp án chi tiết.',
    subject: 'Hóa học',
    class: 'Lớp 11',
    category: 'Đề kiểm tra',
    author: 'Cô Nguyễn Thị E',
    price: 28000,
    rating: 4.5,
    downloads: 680,
    pages: 160,
    tags: ['đề kiểm tra', 'hóa học', 'lớp 11', 'đáp án'],
    fileSize: '2.8 MB',
    fileType: 'PDF',
    createdAt: '2024-01-03',
    updatedAt: '2024-01-06'
  },
  {
    id: '6',
    title: 'Sinh học - Chuyên đề Di truyền học',
    description: 'Chuyên đề di truyền học với lý thuyết và bài tập vận dụng cao.',
    subject: 'Sinh học',
    class: 'Lớp 12',
    category: 'Chuyên đề',
    author: 'Thầy Hoàng Văn F',
    price: 32000,
    rating: 4.7,
    downloads: 520,
    pages: 140,
    tags: ['chuyên đề', 'sinh học', 'di truyền', 'lớp 12'],
    fileSize: '2.3 MB',
    fileType: 'PDF',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-04'
  },
  {
    id: '7',
    title: 'Lịch sử Việt Nam - Giai đoạn 1945-1975',
    description: 'Tài liệu ôn tập Lịch sử Việt Nam giai đoạn 1945-1975 với các sự kiện quan trọng.',
    subject: 'Lịch sử',
    class: 'Lớp 12',
    category: 'Tài liệu ôn tập',
    author: 'Cô Vũ Thị G',
    price: 22000,
    rating: 4.9,
    downloads: 420,
    pages: 100,
    tags: ['lịch sử', 'việt nam', '1945-1975', 'ôn tập'],
    fileSize: '1.5 MB',
    fileType: 'PDF',
    createdAt: '2023-12-28',
    updatedAt: '2024-01-02',
    reviews: [
      {
        id: 'r1',
        userName: 'Nguyễn Hồng',
        rating: 5,
        comment: 'Tài liệu rất đầy đủ, trình bày khoa học, dễ học. Nhờ tài liệu này mình tổng hợp kiến thức nhanh hơn!',
        createdAt: '2024-03-10'
      },
      {
        id: 'r2',
        userName: 'Trần Văn Tùng',
        rating: 4.9,
        comment: 'Các sự kiện được hệ thống rõ ràng, có thêm phần ghi chú rất hữu ích.',
        createdAt: '2024-03-12'
      },
      {
        id: 'r3',
        userName: 'Lê Thị Mai',
        rating: 4.8,
        comment: 'Nội dung sát chương trình, nếu có thêm câu hỏi trắc nghiệm cuối mỗi phần sẽ tốt hơn.',
        createdAt: '2024-03-13'
      },
      {
        id: 'r4',
        userName: 'Phạm Quang',
        rating: 5,
        comment: 'Rất hữu ích cho ôn thi tốt nghiệp. Cảm ơn tác giả!',
        createdAt: '2024-03-14'
      },
      {
        id: 'r5',
        userName: 'Đỗ Thảo',
        rating: 4.9,
        comment: 'Tài liệu đẹp, dễ đọc, có thể bổ sung thêm sơ đồ tư duy.',
        createdAt: '2024-03-15'
      }
    ]
  },
  {
    id: '8',
    title: 'Địa lý - Khí hậu và thời tiết',
    description: 'Chuyên đề về khí hậu và thời tiết với các bài tập thực hành.',
    subject: 'Địa lý',
    class: 'Lớp 10',
    category: 'Chuyên đề',
    author: 'Thầy Đặng Văn H',
    price: 18000,
    rating: 4.3,
    downloads: 380,
    pages: 90,
    tags: ['địa lý', 'khí hậu', 'thời tiết', 'lớp 10'],
    fileSize: '1.2 MB',
    fileType: 'PDF',
    createdAt: '2023-12-25',
    updatedAt: '2023-12-30'
  },
  {
    id: '9',
    title: 'Toán học - Hình học không gian',
    description: 'Chuyên đề hình học không gian với các bài toán từ cơ bản đến nâng cao.',
    subject: 'Toán học',
    class: 'Lớp 11',
    category: 'Chuyên đề',
    author: 'Thầy Bùi Văn I',
    price: 26000,
    rating: 4.6,
    downloads: 620,
    pages: 130,
    tags: ['toán học', 'hình học', 'không gian', 'lớp 11'],
    fileSize: '2.0 MB',
    fileType: 'PDF',
    createdAt: '2023-12-20',
    updatedAt: '2023-12-28'
  },
  {
    id: '10',
    title: 'Văn học - Phân tích tác phẩm văn học',
    description: 'Hướng dẫn phân tích tác phẩm văn học với các ví dụ cụ thể.',
    subject: 'Văn học',
    class: 'Lớp 12',
    category: 'Tài liệu tham khảo',
    author: 'Cô Lý Thị K',
    price: 24000,
    rating: 4.5,
    downloads: 580,
    pages: 110,
    tags: ['văn học', 'phân tích', 'tác phẩm', 'lớp 12'],
    fileSize: '1.8 MB',
    fileType: 'PDF',
    createdAt: '2023-12-18',
    updatedAt: '2023-12-25'
  },
  {
    id: '11',
    title: 'Đề thi học kỳ 1 Văn học lớp 11',
    description: 'Bộ đề thi học kỳ 1 môn Văn học lớp 11 với đáp án chi tiết.',
    subject: 'Văn học',
    class: 'Lớp 11',
    category: 'Đề thi',
    author: 'Thầy Trần Văn L',
    price: 18000,
    rating: 4.3,
    downloads: 450,
    pages: 80,
    tags: ['đề thi', 'văn học', 'lớp 11', 'học kỳ 1'],
    fileSize: '1.5 MB',
    fileType: 'PDF',
    createdAt: '2023-12-15',
    updatedAt: '2023-12-20'
  },
  {
    id: '12',
    title: 'Giáo án Văn học lớp 9 - Truyện Kiều',
    description: 'Giáo án chi tiết giảng dạy Truyện Kiều cho học sinh lớp 9.',
    subject: 'Văn học',
    class: 'Lớp 9',
    category: 'Giáo án',
    author: 'Cô Phạm Thị M',
    price: 22000,
    rating: 4.7,
    downloads: 320,
    pages: 95,
    tags: ['giáo án', 'văn học', 'truyện kiều', 'lớp 9'],
    fileSize: '1.6 MB',
    fileType: 'DOCX',
    createdAt: '2023-12-12',
    updatedAt: '2023-12-18'
  },
  {
    id: '13',
    title: 'Chuyên đề Văn học - Thơ ca Việt Nam',
    description: 'Chuyên đề về thơ ca Việt Nam từ thời kỳ trung đại đến hiện đại.',
    subject: 'Văn học',
    class: 'Lớp 12',
    category: 'Chuyên đề',
    author: 'Thầy Nguyễn Văn N',
    price: 28000,
    rating: 4.6,
    downloads: 380,
    pages: 140,
    tags: ['chuyên đề', 'văn học', 'thơ ca', 'việt nam', 'lớp 12'],
    fileSize: '2.2 MB',
    fileType: 'PDF',
    createdAt: '2023-12-10',
    updatedAt: '2023-12-15'
  },
  {
    id: '14',
    title: 'Bài tập Văn học lớp 8 - Văn nghị luận',
    description: 'Tuyển tập bài tập văn nghị luận cho học sinh lớp 8.',
    subject: 'Văn học',
    class: 'Lớp 8',
    category: 'Bài tập',
    author: 'Cô Hoàng Thị O',
    price: 16000,
    rating: 4.4,
    downloads: 280,
    pages: 70,
    tags: ['bài tập', 'văn học', 'nghị luận', 'lớp 8'],
    fileSize: '1.3 MB',
    fileType: 'PDF',
    createdAt: '2023-12-08',
    updatedAt: '2023-12-12'
  },
  {
    id: '15',
    title: 'Đề thi trắc nghiệm Văn học lớp 10',
    description: 'Bộ đề thi trắc nghiệm môn Văn học lớp 10 với đáp án.',
    subject: 'Văn học',
    class: 'Lớp 10',
    category: 'Trắc nghiệm',
    author: 'Thầy Lê Văn P',
    price: 15000,
    rating: 4.2,
    downloads: 420,
    pages: 60,
    tags: ['trắc nghiệm', 'văn học', 'lớp 10', 'đề thi'],
    fileSize: '1.1 MB',
    fileType: 'PDF',
    createdAt: '2023-12-05',
    updatedAt: '2023-12-10'
  },
  {
    id: '16',
    title: 'Ôn tập Văn học lớp 12 - Tác phẩm trọng tâm',
    description: 'Tài liệu ôn tập các tác phẩm văn học trọng tâm cho kỳ thi THPT.',
    subject: 'Văn học',
    class: 'Lớp 12',
    category: 'Ôn tập',
    author: 'Cô Vũ Thị Q',
    price: 30000,
    rating: 4.8,
    downloads: 650,
    pages: 160,
    tags: ['ôn tập', 'văn học', 'thpt', 'tác phẩm', 'lớp 12'],
    fileSize: '2.4 MB',
    fileType: 'PDF',
    createdAt: '2023-12-01',
    updatedAt: '2023-12-08'
  },
  {
    id: '17',
    title: 'Vật lý - Lý thuyết và bài tập Dao động cơ học',
    description: 'Chuyên đề lý thuyết và bài tập về dao động cơ học cho học sinh THPT.',
    subject: 'Vật lý',
    class: 'Lớp 12',
    category: 'Chuyên đề',
    author: 'Thầy Trần Văn Lý',
    price: 32000,
    rating: 4.7,
    downloads: 580,
    pages: 150,
    tags: ['vật lý', 'dao động', 'lý thuyết', 'bài tập', 'lớp 12'],
    fileSize: '2.8 MB',
    fileType: 'PDF',
    createdAt: '2023-11-28',
    updatedAt: '2023-12-05'
  },
  {
    id: '18',
    title: 'Lý thuyết Hóa học - Cấu trúc nguyên tử',
    description: 'Tài liệu lý thuyết về cấu trúc nguyên tử và liên kết hóa học.',
    subject: 'Hóa học',
    class: 'Lớp 10',
    category: 'Lý thuyết',
    author: 'Cô Nguyễn Thị Lý',
    price: 25000,
    rating: 4.5,
    downloads: 420,
    pages: 120,
    tags: ['hóa học', 'lý thuyết', 'nguyên tử', 'liên kết', 'lớp 10'],
    fileSize: '2.1 MB',
    fileType: 'PDF',
    createdAt: '2023-11-25',
    updatedAt: '2023-12-01'
  },
  {
    id: '19',
    title: 'Sinh học - Lý thuyết tiến hóa và di truyền',
    description: 'Chuyên đề lý thuyết về tiến hóa và di truyền học cho học sinh THPT.',
    subject: 'Sinh học',
    class: 'Lớp 12',
    category: 'Lý thuyết',
    author: 'Thầy Lý Văn Sinh',
    price: 28000,
    rating: 4.6,
    downloads: 380,
    pages: 140,
    tags: ['sinh học', 'lý thuyết', 'tiến hóa', 'di truyền', 'lớp 12'],
    fileSize: '2.3 MB',
    fileType: 'PDF',
    createdAt: '2023-11-22',
    updatedAt: '2023-11-28'
  },
  {
    id: '20',
    title: 'Toán học - Lý thuyết xác suất và thống kê',
    description: 'Tài liệu lý thuyết và bài tập về xác suất và thống kê cho học sinh THPT.',
    subject: 'Toán học',
    class: 'Lớp 11',
    category: 'Lý thuyết',
    author: 'Cô Lý Thị Toán',
    price: 26000,
    rating: 4.4,
    downloads: 350,
    pages: 130,
    tags: ['toán học', 'lý thuyết', 'xác suất', 'thống kê', 'lớp 11'],
    fileSize: '2.0 MB',
    fileType: 'PDF',
    createdAt: '2023-11-20',
    updatedAt: '2023-11-25'
  },
  {
    id: '21',
    title: 'Văn học lớp 11 - Phân tích tác phẩm văn học',
    description: 'Hướng dẫn phân tích tác phẩm văn học cho học sinh lớp 11.',
    subject: 'Văn học',
    class: 'Lớp 11',
    category: 'Lý thuyết',
    author: 'Cô Nguyễn Thị Văn',
    price: 22000,
    rating: 4.5,
    downloads: 280,
    pages: 95,
    tags: ['văn học', 'phân tích', 'tác phẩm', 'lớp 11'],
    fileSize: '1.8 MB',
    fileType: 'PDF',
    createdAt: '2023-12-01',
    updatedAt: '2023-12-05'
  },
  {
    id: '22',
    title: 'Văn học lớp 11 - Bài tập nghị luận văn học',
    description: 'Tuyển tập bài tập nghị luận văn học cho học sinh lớp 11.',
    subject: 'Văn học',
    class: 'Lớp 11',
    category: 'Bài tập',
    author: 'Thầy Trần Văn Nghị',
    price: 18000,
    rating: 4.3,
    downloads: 320,
    pages: 85,
    tags: ['văn học', 'nghị luận', 'bài tập', 'lớp 11'],
    fileSize: '1.5 MB',
    fileType: 'PDF',
    createdAt: '2023-11-28',
    updatedAt: '2023-12-02'
  }
].map(doc => {
  // Nếu thiếu reviews, tự động thêm 4 reviews thực tế
  if (!doc.reviews || !Array.isArray(doc.reviews) || doc.reviews.length === 0) {
    const sampleNames = ['Nguyễn An', 'Lê Bình', 'Trần Cường', 'Phạm Duyên', 'Hoàng Giang'];
    const sampleComments = [
      'Tài liệu rất hữu ích, trình bày dễ hiểu!',
      'Nội dung sát chương trình, có thể bổ sung thêm ví dụ thực tế.',
      'Bố cục rõ ràng, dễ tra cứu. Cảm ơn tác giả!',
      'Một số phần còn sơ lược, mong bản cập nhật chi tiết hơn.',
      'Rất phù hợp để ôn thi, giải thích chi tiết.'
    ];
    const baseRating = doc.rating && typeof doc.rating === 'number' ? doc.rating : 4.8;
    doc.reviews = Array.from({ length: 4 }).map((_, i) => ({
      id: `auto${i+1}`,
      userName: sampleNames[i % sampleNames.length],
      rating: Math.round((baseRating + (i%2===0?0.1:-0.1)) * 10) / 10,
      comment: sampleComments[i % sampleComments.length],
      createdAt: `2024-03-${10+i}`
    }));
    // Tính lại rating trung bình
    doc.rating = Math.round((doc.reviews.reduce((sum, r) => sum + r.rating, 0) / doc.reviews.length) * 100) / 100;
  }
  // Nếu thiếu rating, đặt mặc định 4.8
  if (!doc.rating || typeof doc.rating !== 'number') {
    doc.rating = 4.8;
  }
  return doc;
});

// Helper functions
export function getDocumentsBySubject(subject: string): DocumentType[] {
  return documents.filter(doc => doc.subject === subject);
}

export function getDocumentsByCategory(subject: string, category: string): DocumentType[] {
  return documents.filter(doc => doc.subject === subject && doc.category === category);
}

export function searchDocuments(query: string): DocumentType[] {
  const lowercaseQuery = query.toLowerCase();
  return documents.filter(doc => 
    doc.title.toLowerCase().includes(lowercaseQuery) ||
    doc.description.toLowerCase().includes(lowercaseQuery) ||
    doc.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}

// Helper function to create slug from text
export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Helper function to get subject by slug
export function getSubjectBySlug(slug: string): { name: string; slug: string; icon: string } | null {
  const subjectMap: { [key: string]: { name: string; slug: string; icon: string } } = {
    'toan-hoc': { name: 'Toán học', slug: 'toan-hoc', icon: '📐' },
    'van-hoc': { name: 'Văn học', slug: 'van-hoc', icon: '📖' },
    'tieng-anh': { name: 'Tiếng Anh', slug: 'tieng-anh', icon: '🇬🇧' },
    'vat-ly': { name: 'Vật lý', slug: 'vat-ly', icon: '⚡' },
    'hoa-hoc': { name: 'Hóa học', slug: 'hoa-hoc', icon: '🧪' },
    'sinh-hoc': { name: 'Sinh học', slug: 'sinh-hoc', icon: '🧬' },
    'lich-su': { name: 'Lịch sử', slug: 'lich-su', icon: '📜' },
    'dia-ly': { name: 'Địa lý', slug: 'dia-ly', icon: '🌍' }
  };
  
  return subjectMap[slug] || null;
}

// Helper function to get class by slug
export function getClassBySlug(slug: string): { name: string; slug: string } | null {
  const classMap: { [key: string]: { name: string; slug: string } } = {
    'lop-6': { name: 'Lớp 6', slug: 'lop-6' },
    'lop-7': { name: 'Lớp 7', slug: 'lop-7' },
    'lop-8': { name: 'Lớp 8', slug: 'lop-8' },
    'lop-9': { name: 'Lớp 9', slug: 'lop-9' },
    'lop-10': { name: 'Lớp 10', slug: 'lop-10' },
    'lop-11': { name: 'Lớp 11', slug: 'lop-11' },
    'lop-12': { name: 'Lớp 12', slug: 'lop-12' }
  };
  
  return classMap[slug] || null;
} 