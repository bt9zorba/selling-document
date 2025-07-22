"use client";
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ExitIntentPopup from '@/components/ui/ExitIntentPopup';
import FloatingChatSupport from '@/components/ui/FloatingChatSupport';

export default function ClientRootLayoutWrapper({ children }: { children: React.ReactNode }) {
  // Dark mode logic
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') return saved;
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    }
    return 'light';
  });
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (theme === 'dark') document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', theme);
    }
  }, [theme]);
  return (
    <>
      <Head>
        <title>Bán tài liệu chất lượng cao | sellingdocument.com</title>
        <meta name="description" content="Kho tài liệu học tập, giáo án, đề thi, tài liệu ôn luyện chất lượng cao, tải nhanh, bảo hành hoàn tiền, hỗ trợ 24/7." />
        <meta property="og:title" content="Bán tài liệu chất lượng cao" />
        <meta property="og:description" content="Kho tài liệu học tập, giáo án, đề thi, tài liệu ôn luyện chất lượng cao, tải nhanh, bảo hành hoàn tiền, hỗ trợ 24/7." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sellingdocument.com" />
        <meta property="og:image" content="/public/file.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bán tài liệu chất lượng cao" />
        <meta name="twitter:description" content="Kho tài liệu học tập, giáo án, đề thi, tài liệu ôn luyện chất lượng cao, tải nhanh, bảo hành hoàn tiền, hỗ trợ 24/7." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Bán tài liệu chất lượng cao',
          url: 'https://sellingdocument.com',
          description: 'Kho tài liệu học tập, giáo án, đề thi, tài liệu ôn luyện chất lượng cao, tải nhanh, bảo hành hoàn tiền, hỗ trợ 24/7.',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://sellingdocument.com/search?q={search_term_string}',
            'query-input': 'required name=search_term_string',
          },
        }) }} />
      </Head>
      {/* Dark mode toggle button fixed at top right */}
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="fixed top-4 right-4 z-[100] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-md p-3 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-label="Chuyển chế độ sáng/tối"
      >
        {theme === 'dark' ? (
          <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 2.22a1 1 0 011.42 1.42l-.7.7a1 1 0 11-1.42-1.42l.7-.7zM18 9a1 1 0 100 2h-1a1 1 0 100-2h1zm-2.22 6.78a1 1 0 00-1.42 1.42l.7.7a1 1 0 001.42-1.42l-.7-.7zM10 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-6.78-2.22a1 1 0 00-1.42 1.42l.7.7a1 1 0 001.42-1.42l-.7-.7zM4 11a1 1 0 100-2H3a1 1 0 100 2h1zm2.22-6.78a1 1 0 00-1.42-1.42l-.7.7a1 1 0 001.42 1.42l.7-.7zM10 5a5 5 0 100 10A5 5 0 0010 5z" /></svg>
        ) : (
          <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
        )}
        <span className="hidden md:inline text-xs font-medium text-gray-700 dark:text-gray-200">{theme === 'dark' ? 'Tối' : 'Sáng'}</span>
      </button>
      <Header />
      <main>{children}</main>
      <FloatingChatSupport />
      <Footer />
      <ExitIntentPopup />
      {/* Messenger Chat Plugin */}
      <div id="fb-root"></div>
      <div id="fb-customer-chat" className="fb-customerchat"></div>
      <script dangerouslySetInnerHTML={{ __html: `
        var chatbox = document.getElementById('fb-customer-chat');
        chatbox.setAttribute('page_id', 'YOUR_PAGE_ID');
        chatbox.setAttribute('attribution', 'biz_inbox');
        window.fbAsyncInit = function() {
          FB.init({ xfbml: true, version: 'v18.0' });
        };
        (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
      `}} />
    </>
  );
} 