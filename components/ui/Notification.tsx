'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface NotificationProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  onClose?: () => void;
  className?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const Notification = React.forwardRef<HTMLDivElement, NotificationProps>(
  ({ 
    type = 'info',
    title,
    message,
    duration = 5000,
    onClose,
    className,
    icon,
    action,
    ...props 
  }, ref) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
      if (duration > 0) {
        const timer = setTimeout(() => {
          handleClose();
        }, duration);

        return () => clearTimeout(timer);
      }
    }, [duration]);

    const handleClose = () => {
      setIsExiting(true);
      setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, 300);
    };

    const getTypeStyles = () => {
      switch (type) {
        case 'success':
          return {
            bg: 'bg-success/10',
            border: 'border-success/30',
            icon: 'text-success',
            title: 'text-success',
            message: 'text-success'
          };
        case 'error':
          return {
            bg: 'bg-error/10',
            border: 'border-error/30',
            icon: 'text-error',
            title: 'text-error',
            message: 'text-error'
          };
        case 'warning':
          return {
            bg: 'bg-warning/10',
            border: 'border-warning/30',
            icon: 'text-warning',
            title: 'text-warning',
            message: 'text-warning'
          };
        default:
          return {
            bg: 'bg-primary/10',
            border: 'border-primary/30',
            icon: 'text-primary',
            title: 'text-primary',
            message: 'text-primary'
          };
      }
    };

    const getDefaultIcon = () => {
      switch (type) {
        case 'success':
          return (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          );
        case 'error':
          return (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          );
        case 'warning':
          return (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          );
        default:
          return (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          );
      }
    };

    const styles = getTypeStyles();

    if (!isVisible) return null;

    return (
      <div
        ref={ref}
        className={cn(
          'fixed top-4 right-4 z-50 max-w-sm w-full',
          'transform transition-all duration-300 ease-out',
          isExiting ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100',
          className
        )}
        aria-live="polite"
        role="alert"
        tabIndex={0}
        {...props}
      >
        <div className={cn(
          // Base style
          'border rounded-xl shadow-md p-4 bg-white/95 backdrop-blur-xl',
          styles.bg,
          styles.border
        )}>
          <div className="flex items-start gap-3">
            {/* Icon */}
            <div className={cn('flex-shrink-0 mt-0.5', styles.icon)}>
              {icon || getDefaultIcon()}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h4 className={cn('text-sm font-semibold mb-1', styles.title)}>
                {title}
              </h4>
              {message && (
                <p className={cn('text-sm leading-relaxed', styles.message)}>
                  {message}
                </p>
              )}
              {action && (
                <button
                  onClick={action.onClick}
                  className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
                >
                  {action.label}
                </button>
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="flex-shrink-0 p-1 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }
);

Notification.displayName = 'Notification';

// Notification Container for managing multiple notifications
interface NotificationContainerProps {
  children: React.ReactNode;
  className?: string;
}

const NotificationContainer = React.forwardRef<HTMLDivElement, NotificationContainerProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'fixed top-4 right-4 z-50 space-y-3',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

NotificationContainer.displayName = 'NotificationContainer';

// Hook for managing notifications
export const useNotification = () => {
  const [notifications, setNotifications] = useState<Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message?: string;
    duration?: number;
    action?: {
      label: string;
      onClick: () => void;
    };
  }>>([]);

  const addNotification = (notification: Omit<typeof notifications[0], 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications(prev => [...prev, { ...notification, id }]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const showSuccess = (title: string, message?: string, duration?: number) => {
    addNotification({ type: 'success', title, message, duration });
  };

  const showError = (title: string, message?: string, duration?: number) => {
    addNotification({ type: 'error', title, message, duration });
  };

  const showWarning = (title: string, message?: string, duration?: number) => {
    addNotification({ type: 'warning', title, message, duration });
  };

  const showInfo = (title: string, message?: string, duration?: number) => {
    addNotification({ type: 'info', title, message, duration });
  };

  return {
    notifications,
    addNotification,
    removeNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };
};

export { Notification, NotificationContainer }; 