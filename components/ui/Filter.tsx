'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface FilterOption {
  value: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

interface FilterProps {
  options: FilterOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'apple' | 'minimal';
  showCount?: boolean;
  multiSelect?: boolean;
  maxSelections?: number;
}

const Filter = React.forwardRef<HTMLDivElement, FilterProps>(
  ({ 
    options,
    value = '',
    onChange,
    placeholder = 'Chọn bộ lọc...',
    className,
    size = 'md',
    variant = 'default',
    showCount = true,
    multiSelect = false,
    maxSelections = 3,
    ...props 
  }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValues, setSelectedValues] = useState<string[]>(value ? [value] : []);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleToggle = () => {
      setIsOpen(!isOpen);
    };

    const handleSelect = (optionValue: string) => {
      if (multiSelect) {
        const newValues = selectedValues.includes(optionValue)
          ? selectedValues.filter(v => v !== optionValue)
          : selectedValues.length < maxSelections
            ? [...selectedValues, optionValue]
            : selectedValues;
        
        setSelectedValues(newValues);
        onChange?.(newValues.join(','));
      } else {
        setSelectedValues([optionValue]);
        onChange?.(optionValue);
        setIsOpen(false);
      }
    };

    const getDisplayText = () => {
      if (multiSelect) {
        if (selectedValues.length === 0) return placeholder;
        if (selectedValues.length === 1) {
          const option = options.find(opt => opt.value === selectedValues[0]);
          return option?.label || placeholder;
        }
        return `${selectedValues.length} đã chọn`;
      } else {
        const option = options.find(opt => opt.value === value);
        return option?.label || placeholder;
      }
    };

    const baseClasses = cn(
      'relative w-full transition-all duration-200 ease-out',
      'focus:outline-none focus:ring-2 focus:ring-offset-0',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'font-medium'
    );

    const variantClasses = {
      default: cn(
        'bg-white/90 backdrop-blur-xl border border-gray-200/50',
        'hover:bg-white hover:border-gray-300/50',
        'focus:bg-white focus:border-blue-500/50 focus:ring-blue-500/20'
      ),
      apple: cn(
        'bg-white/80 backdrop-blur-xl border border-white/20',
        'hover:bg-white/90 hover:border-white/30',
        'focus:bg-white focus:border-blue-500/50 focus:ring-blue-500/20',
        'shadow-lg'
      ),
      minimal: cn(
        'bg-transparent border-b-2 border-gray-300/50',
        'hover:border-gray-400/50',
        'focus:border-blue-500/50 focus:ring-0',
        'rounded-none'
      )
    };

    const sizeClasses = {
      sm: 'px-4 py-2.5 text-sm rounded-xl pr-10',
      md: 'px-5 py-3.5 text-base rounded-2xl pr-12',
      lg: 'px-6 py-4 text-lg rounded-2xl pr-14',
      xl: 'px-8 py-5 text-xl rounded-3xl pr-16'
    };

    const buttonClasses = cn(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      'flex items-center justify-between cursor-pointer',
      'text-left',
      className
    );

    return (
      <div
        ref={ref}
        className={cn('relative', className)}
        aria-label="Filter Dropdown"
        role="listbox"
        tabIndex={0}
        {...props}
      >
        {/* Trigger Button */}
        <button
          type="button"
          onClick={handleToggle}
          className={buttonClasses}
        >
          <span className={cn(
            'truncate',
            !value && selectedValues.length === 0 && 'text-gray-400'
          )}>
            {getDisplayText()}
          </span>
          
          {/* Chevron Icon */}
          <svg
            className={cn(
              'flex-shrink-0 transition-transform duration-200',
              'text-gray-400',
              size === 'sm' && 'w-4 h-4',
              size === 'md' && 'w-5 h-5',
              size === 'lg' && 'w-6 h-6',
              size === 'xl' && 'w-7 h-7',
              isOpen && 'rotate-180'
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div className={cn(
            'absolute top-full left-0 right-0 mt-2 z-50',
            'bg-white/95 backdrop-blur-xl border border-white/20',
            'rounded-2xl shadow-2xl',
            'max-h-60 overflow-y-auto'
          )}>
            {options.map((option, index) => {
              const isSelected = multiSelect 
                ? selectedValues.includes(option.value)
                : value === option.value;

              return (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={cn(
                    'w-full px-4 py-3 text-left transition-all duration-200',
                    'hover:bg-gray-50/50 first:rounded-t-2xl last:rounded-b-2xl',
                    'focus:outline-none focus:bg-gray-50/50',
                    isSelected && 'bg-blue-50/50 text-blue-600'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {option.icon && (
                        <span className="flex-shrink-0 text-lg">{option.icon}</span>
                      )}
                      <span className="truncate font-medium">{option.label}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {showCount && option.count !== undefined && (
                        <span className={cn(
                          'px-2 py-1 text-xs rounded-full font-medium',
                          isSelected 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-gray-100 text-gray-600'
                        )}>
                          {option.count}
                        </span>
                      )}
                      
                      {isSelected && (
                        <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
            
            {options.length === 0 && (
              <div className="px-4 py-3 text-center text-gray-500">
                Không có tùy chọn nào
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

Filter.displayName = 'Filter';

export default Filter; 