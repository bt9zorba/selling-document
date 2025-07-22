'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'quick-reply';
}

interface QuickReply {
  id: string;
  text: string;
  action?: () => void;
}

interface ChatSupportProps {
  className?: string;
  title?: string;
  subtitle?: string;
  placeholder?: string;
  quickReplies?: QuickReply[];
  onSendMessage?: (message: string) => void;
  onQuickReply?: (reply: QuickReply) => void;
  isOpen?: boolean;
  onToggle?: () => void;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  mode?: 'support' | 'document'; // NEW
  documentId?: string; // NEW
  userId?: string; // NEW
  sellerId?: string; // NEW
}

const ChatSupport = React.forwardRef<HTMLDivElement, ChatSupportProps>(
  ({ 
    className,
    title = 'Hỗ trợ khách hàng',
    subtitle = 'Chúng tôi luôn sẵn sàng hỗ trợ bạn',
    placeholder = 'Nhập tin nhắn của bạn...',
    quickReplies = [],
    onSendMessage,
    onQuickReply,
    isOpen = false,
    onToggle,
    position = 'bottom-right',
    mode = 'support', // NEW
    documentId,
    userId = 'user-1', // mock user
    sellerId = 'seller-1', // mock seller
    ...props 
  }, ref) => {
    const [messages, setMessages] = useState<Message[]>([
      {
        id: '1',
        text: 'Xin chào! Tôi có thể giúp gì cho bạn?',
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Mock user/seller data
    const users = {
      'user-1': { name: 'Bạn', avatar: '👤' },
      'seller-1': { name: 'Nguyễn Giáo Viên', avatar: '👨‍🏫' },
    };

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
      scrollToBottom();
    }, [messages]);

    useEffect(() => {
      if (isOpen) {
        inputRef.current?.focus();
      }
    }, [isOpen]);

    const handleSendMessage = () => {
      if (!inputValue.trim()) return;

      const userMessage: Message = {
        id: Date.now().toString(),
        text: inputValue,
        sender: 'user',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, userMessage]);
      setInputValue('');
      setIsTyping(true);

      // Simulate bot response
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.',
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1500);

      onSendMessage?.(inputValue);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    };

    const handleQuickReply = (reply: QuickReply) => {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: reply.text,
        sender: 'user',
        timestamp: new Date(),
        type: 'quick-reply'
      };

      setMessages(prev => [...prev, userMessage]);
      onQuickReply?.(reply);
    };

    const positionClasses = {
      'bottom-right': 'bottom-4 right-4',
      'bottom-left': 'bottom-4 left-4',
      'top-right': 'top-4 right-4',
      'top-left': 'top-4 left-4'
    };

    // Nếu mode=document, đổi title/subtitle, hiển thị tên người bán
    const getSeller = () => {
      if (sellerId && (sellerId === 'user-1' || sellerId === 'seller-1')) {
        return users[sellerId];
      }
      return undefined;
    };
    const chatTitle = mode === 'document' ? `Chat với người bán` : title;
    const chatSubtitle = mode === 'document' ? `Trao đổi trực tiếp với ${getSeller()?.name || 'người bán'}` : subtitle;

    return (
      <div ref={ref} className={cn('fixed z-50', positionClasses[position], className)} {...props}>
        {/* Chat Toggle Button */}
        {!isOpen && (
          <button
            aria-label="Mở chat hỗ trợ"
            tabIndex={0}
            onClick={onToggle}
            className={cn(
              'w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600',
              'text-white rounded-full shadow-2xl hover:shadow-3xl',
              'transition-all duration-300 ease-out hover:scale-110',
              'flex items-center justify-center'
            )}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
        )}

        {/* Chat Window */}
        {isOpen && (
          <div className={cn(
            'w-80 h-96 bg-white/95 backdrop-blur-xl border border-white/20',
            'rounded-3xl shadow-2xl overflow-hidden',
            'flex flex-col'
          )}>
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg">{chatTitle}</h3>
                  <p className="text-blue-100 text-sm">{chatSubtitle}</p>
                  {mode === 'document' && (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-2xl">{getSeller()?.avatar}</span>
                      <span className="font-semibold">{getSeller()?.name}</span>
                    </div>
                  )}
                </div>
                <button
                  aria-label="Đóng chat hỗ trợ"
                  tabIndex={0}
                  onClick={onToggle}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'flex',
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div className={cn(
                    'max-w-xs px-4 py-3 rounded-2xl flex items-end gap-2',
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white flex-row-reverse'
                      : 'bg-gray-100 text-gray-900'
                  )}>
                    {mode === 'document' && (
                      <span className="text-xl">{(message.sender === 'user' ? (userId === 'user-1' ? users['user-1']?.avatar : undefined) : getSeller()?.avatar)}</span>
                    )}
                    <div>
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <p className={cn(
                        'text-xs mt-1',
                        message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                      )}>
                        {message.timestamp.toLocaleTimeString('vi-VN', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-2xl">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {quickReplies.length > 0 && messages.length === 1 && (
              <div className="px-4 pb-4">
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply) => (
                    <button
                      key={reply.id}
                      onClick={() => handleQuickReply(reply)}
                      className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-xl transition-colors duration-200"
                    >
                      {reply.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-100">
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={placeholder}
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={1}
                  style={{ minHeight: '44px', maxHeight: '120px' }}
                />
                <button
                  aria-label="Gửi tin nhắn"
                  tabIndex={0}
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className={cn(
                    'p-3 rounded-2xl transition-all duration-200',
                    inputValue.trim()
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  )}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

ChatSupport.displayName = 'ChatSupport';

export default ChatSupport; 