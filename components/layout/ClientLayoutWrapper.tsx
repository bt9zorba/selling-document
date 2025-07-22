'use client';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatSupport from '@/components/ui/ChatSupport';
import FeedbackPopup from '@/components/ui/FeedbackPopup';
// Đổi NotificationMock thành Notification hoặc bỏ nếu không dùng
// import NotificationMock from '@/components/ui/Notification';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {/* <NotificationMock /> */}
      <FeedbackPopup />
      {children}
      <Footer />
      <ChatSupport />
    </>
  );
} 