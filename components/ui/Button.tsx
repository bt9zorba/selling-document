'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'apple';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  success?: boolean;
  successText?: string;
  successIcon?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    loading = false,
    icon,
    iconPosition = 'left',
    success = false,
    successText,
    successIcon = '✓',
    onClick,
    children,
    disabled,
    ...props 
  }, ref) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
      if (loading || isLoading || isSuccess) return;
      
      setIsLoading(true);
      
      try {
        if (onClick) {
          await onClick(e);
        }
        
        // Show success state briefly
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
        }, 2000);
      } catch (error) {
        console.error('Button action failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const baseClasses = cn(
      // Base styles - Apple-inspired
      'inline-flex items-center justify-center gap-3 font-semibold transition-all duration-200 ease-out',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'active:scale-98 transform',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
      'relative overflow-hidden',
      // Size variants - Apple spacing
      size === 'sm' && 'px-4 py-2 text-sm rounded-lg',
      size === 'md' && 'px-6 py-3 text-base rounded-xl',
      size === 'lg' && 'px-8 py-4 text-lg rounded-2xl',
      size === 'xl' && 'px-10 py-5 text-xl rounded-3xl',
      // Variant styles - Design System
      variant === 'primary' && [
        'bg-primary text-white',
        'hover:bg-primary-dark',
        'focus:ring-primary',
        'shadow-md hover:shadow-lg',
        'border border-primary/20'
      ],
      variant === 'secondary' && [
        'bg-gray-100 text-gray-900',
        'hover:bg-gray-200',
        'focus:ring-gray-500',
        'shadow-sm hover:shadow-md',
        'border border-gray-300'
      ],
      variant === 'outline' && [
        'bg-transparent border-2 border-primary text-primary',
        'hover:bg-primary hover:text-white',
        'focus:ring-primary',
        'shadow-sm hover:shadow-md'
      ],
      variant === 'ghost' && [
        'bg-transparent text-gray-700 hover:bg-gray-100',
        'focus:ring-gray-500',
        'border border-transparent'
      ],
      variant === 'danger' && [
        'bg-error text-white',
        'hover:bg-error/80',
        'focus:ring-error',
        'shadow-md hover:shadow-lg',
        'border border-error/20'
      ],
      variant === 'success' && [
        'bg-success text-white',
        'hover:bg-success/80',
        'focus:ring-success',
        'shadow-md hover:shadow-lg',
        'border border-success/20'
      ],
      variant === 'apple' && [
        'bg-white/80 backdrop-blur-xl border border-white/20 text-gray-900',
        'hover:bg-white/90 hover:shadow-lg',
        'focus:ring-primary',
        'shadow-md',
        'font-medium'
      ],
      // Success state
      isSuccess && [
        'bg-success',
        'scale-105 shadow-xl',
        'animate-success-pulse'
      ],
      // Loading state
      (loading || isLoading) && [
        'cursor-wait',
        'animate-pulse'
      ],
      className
    );

    const renderContent = () => {
      if (isSuccess) {
        return (
          <>
            <span className="animate-bounce text-lg">{successIcon}</span>
            <span>{successText || children}</span>
          </>
        );
      }

      if (loading || isLoading) {
        return (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Đang xử lý...</span>
          </>
        );
      }

      return (
        <>
          {icon && iconPosition === 'left' && (
            <span className="transition-transform duration-200 group-hover:scale-110">{icon}</span>
          )}
          <span className="tracking-tight">{children}</span>
          {icon && iconPosition === 'right' && (
            <span className="transition-transform duration-200 group-hover:scale-110">{icon}</span>
          )}
        </>
      );
    };

    return (
      <button
        ref={ref}
        className={baseClasses}
        onClick={handleClick}
        disabled={disabled || loading || isLoading || isSuccess}
        aria-label={typeof children === 'string' ? children : undefined}
        role="button"
        tabIndex={0}
        {...props}
      >
        {/* Apple-style hover effect */}
        <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-inherit pointer-events-none" />
        {/* Ripple effect */}
        <span className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <span className="block w-full h-full animate-ripple" />
        </span>
        {renderContent()}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button; 