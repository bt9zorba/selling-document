'use client';

import { useEffect } from 'react';
import Button from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Đã xảy ra lỗi
        </h2>
        <p className="text-gray-600 mb-6">
          Rất tiếc, đã có lỗi xảy ra. Vui lòng thử lại sau.
        </p>
        <div className="space-x-4">
          <Button onClick={reset}>
            Thử lại
          </Button>
          <Button variant="outline" onClick={() => { window.location.href = '/'; }}>
            Về trang chủ
          </Button>
        </div>
      </div>
    </div>
  );
} 