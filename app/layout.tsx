import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ClientRootLayoutWrapper from '@/components/layout/ClientRootLayoutWrapper';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
    title: 'StudyPro - Thư viện giáo dục chất lượng cao',
    description: 'Hơn 1,290 tài liệu giáo dục chất lượng cao cho giáo viên và học sinh.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <ClientRootLayoutWrapper>{children}</ClientRootLayoutWrapper>
      </body>
    </html>
  );
}
