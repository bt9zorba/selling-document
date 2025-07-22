'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  width?: string | number;
  height?: string | number;
  lines?: number;
  animated?: boolean;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ 
    className, 
    variant = 'text', 
    width, 
    height, 
    lines = 1,
    animated = true,
    ...props 
  }, ref) => {
    const baseClasses = cn(
      'bg-gray-200/50 rounded-xl',
      animated && 'animate-pulse',
      className
    );

    const renderSkeleton = () => {
      switch (variant) {
        case 'text':
          return (
            <div className="space-y-3">
              {Array.from({ length: lines }).map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    baseClasses,
                    'h-4',
                    index === lines - 1 ? 'w-3/4' : 'w-full'
                  )}
                  style={{
                    width: index === lines - 1 && width ? width : undefined,
                    height: height
                  }}
                />
              ))}
            </div>
          );

        case 'circular':
          return (
            <div
              ref={ref}
              className={cn(baseClasses, 'rounded-full')}
              style={{ width, height }}
              {...props}
            />
          );

        case 'rectangular':
          return (
            <div
              ref={ref}
              className={baseClasses}
              style={{ width, height }}
              {...props}
            />
          );

        case 'card':
          return (
            <div
              ref={ref}
              className={cn(
                'bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl',
                className
              )}
              {...props}
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200/50 rounded-full animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200/50 rounded-xl animate-pulse w-3/4" />
                    <div className="h-3 bg-gray-200/50 rounded-xl animate-pulse w-1/2" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200/50 rounded-xl animate-pulse" />
                  <div className="h-4 bg-gray-200/50 rounded-xl animate-pulse w-5/6" />
                </div>
                <div className="flex justify-between items-center pt-4">
                  <div className="h-6 bg-gray-200/50 rounded-xl animate-pulse w-20" />
                  <div className="h-6 bg-gray-200/50 rounded-xl animate-pulse w-16" />
                </div>
              </div>
            </div>
          );

        default:
          return (
            <div
              ref={ref}
              className={baseClasses}
              style={{ width, height }}
              {...props}
            />
          );
      }
    };

    return renderSkeleton();
  }
);

Skeleton.displayName = 'Skeleton';

// Apple-style shimmer effect
const ShimmerSkeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = 'text', width, height, lines = 1, ...props }, ref) => {
    const shimmerClasses = cn(
      'relative overflow-hidden bg-gray-200/50 rounded-xl',
      'before:absolute before:inset-0 before:-translate-x-full',
      'before:animate-shimmer before:bg-gradient-to-r',
      'before:from-transparent before:via-white/60 before:to-transparent',
      className
    );

    const renderShimmer = () => {
      switch (variant) {
        case 'text':
          return (
            <div className="space-y-3">
              {Array.from({ length: lines }).map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    shimmerClasses,
                    'h-4',
                    index === lines - 1 ? 'w-3/4' : 'w-full'
                  )}
                  style={{
                    width: index === lines - 1 && width ? width : undefined,
                    height: height
                  }}
                />
              ))}
            </div>
          );

        case 'circular':
          return (
            <div
              ref={ref}
              className={cn(shimmerClasses, 'rounded-full')}
              style={{ width, height }}
              {...props}
            />
          );

        case 'rectangular':
          return (
            <div
              ref={ref}
              className={shimmerClasses}
              style={{ width, height }}
              {...props}
            />
          );

        default:
          return (
            <div
              ref={ref}
              className={shimmerClasses}
              style={{ width, height }}
              {...props}
            />
          );
      }
    };

    return renderShimmer();
  }
);

ShimmerSkeleton.displayName = 'ShimmerSkeleton';

// Apple-style content skeleton
const ContentSkeleton = React.forwardRef<HTMLDivElement, { className?: string }>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'space-y-6',
        className
      )}
      {...props}
    >
      {/* Header */}
      <div className="space-y-4">
        <div className="h-8 bg-gray-200/50 rounded-2xl animate-pulse w-1/3" />
        <div className="h-5 bg-gray-200/50 rounded-xl animate-pulse w-1/2" />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-6 bg-gray-200/50 rounded-xl animate-pulse w-3/4" />
                <div className="h-4 bg-gray-200/50 rounded-lg animate-pulse w-12" />
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200/50 rounded-xl animate-pulse" />
                <div className="h-4 bg-gray-200/50 rounded-xl animate-pulse w-5/6" />
              </div>
              <div className="flex justify-between items-center pt-4">
                <div className="h-5 bg-gray-200/50 rounded-xl animate-pulse w-20" />
                <div className="h-5 bg-gray-200/50 rounded-xl animate-pulse w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
);

ContentSkeleton.displayName = 'ContentSkeleton';

export { Skeleton, ShimmerSkeleton, ContentSkeleton }; 