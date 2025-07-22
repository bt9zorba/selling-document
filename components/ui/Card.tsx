'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'glass' | 'interactive' | 'apple';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  onClick?: () => void;
  hoverEffect?: boolean;
  quickActions?: React.ReactNode;
}

export function Card({ children, className = "", variant = 'default', ...props }: React.HTMLAttributes<HTMLDivElement> & { variant?: string }) {
  const baseClass = [
    // Base style
    'rounded-xl p-6 transition-all duration-300 animate-fade-in-up',
    // Variant styles
    variant === 'glass' ? 'bg-white/60 backdrop-blur-xl shadow-xl border border-gray-200' : 'bg-gray-50 shadow-md',
    variant === 'interactive' ? 'hover:scale-105 hover:shadow-lg cursor-pointer' : '',
    className
  ].join(' ');
  return (
    <div
      className={baseClass}
      aria-label="Card"
      role="region"
      tabIndex={0}
      {...props}
    >
      {children}
    </div>
  );
}

Card.displayName = 'Card';

// Card Header Component
interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-2 pb-6', className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardHeader.displayName = 'CardHeader';

// Card Title Component
interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

const CardTitle = React.forwardRef<HTMLParagraphElement, CardTitleProps>(
  ({ children, className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-lg font-bold leading-tight tracking-tight text-gray-900', className)}
      {...props}
    >
      {children}
    </h3>
  )
);

CardTitle.displayName = 'CardTitle';

// Card Description Component
interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ children, className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-base text-gray-600 leading-relaxed', className)}
      {...props}
    >
      {children}
    </p>
  )
);

CardDescription.displayName = 'CardDescription';

// Card Content Component
interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('pt-0', className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardContent.displayName = 'CardContent';

// Card Footer Component
interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center pt-6', className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardFooter.displayName = 'CardFooter';

export default Card;
export { CardHeader, CardTitle, CardDescription, CardContent, CardFooter }; 