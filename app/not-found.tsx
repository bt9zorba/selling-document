import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="text-6xl mb-4">404</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Trang không tồn tại
        </h2>
        <p className="text-gray-600 mb-6">
          Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
        </p>
        <Link href="/">
          <Button>
            Về trang chủ
          </Button>
        </Link>
      </div>
    </div>
  );
} 