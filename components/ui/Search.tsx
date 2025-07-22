'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface SearchProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'apple' | 'minimal';
  showClearButton?: boolean;
  loading?: boolean;
  suggestions?: string[];
  onSuggestionSelect?: (suggestion: string) => void;
}

const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  ({ 
    placeholder = 'Tìm kiếm...',
    value = '',
    onChange,
  onSearch,
    className,
    size = 'md',
    variant = 'default',
    showClearButton = true,
    loading = false,
    suggestions = [],
    onSuggestionSelect,
    ...props 
  }, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

    const handleFocus = () => {
      setIsFocused(true);
      setShowSuggestions(suggestions.length > 0);
    };

    const handleBlur = () => {
      setIsFocused(false);
      // Delay hiding suggestions to allow for clicks
      setTimeout(() => setShowSuggestions(false), 200);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      onChange?.(newValue);
      setShowSuggestions(suggestions.length > 0 && newValue.length > 0);
      setSelectedIndex(-1);
  };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
    e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          onSuggestionSelect?.(suggestions[selectedIndex]);
        } else {
          onSearch?.(value);
    }
    setShowSuggestions(false);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
      } else if (e.key === 'Escape') {
        setShowSuggestions(false);
        inputRef.current?.blur();
      }
    };

    const handleClear = () => {
      onChange?.('');
      setShowSuggestions(false);
      setSelectedIndex(-1);
      inputRef.current?.focus();
    };

    const handleSuggestionClick = (suggestion: string) => {
      onSuggestionSelect?.(suggestion);
      setShowSuggestions(false);
      setSelectedIndex(-1);
    };

    const baseClasses = cn(
      'w-full transition-all duration-200 ease-out',
      'focus:outline-none focus:ring-2 focus:ring-offset-0',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'placeholder:text-gray-400',
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
      sm: 'px-4 py-2.5 text-sm rounded-xl pl-12 pr-10',
      md: 'px-5 py-3.5 text-base rounded-2xl pl-14 pr-12',
      lg: 'px-6 py-4 text-lg rounded-2xl pl-16 pr-14',
      xl: 'px-8 py-5 text-xl rounded-3xl pl-20 pr-16'
    };

    const inputClasses = cn(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      className
    );

  return (
      <div className="relative">
          {/* Search Icon */}
        <div className={cn(
          'absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400',
          'flex items-center justify-center',
          size === 'sm' && 'w-10 h-10',
          size === 'md' && 'w-12 h-12',
          size === 'lg' && 'w-14 h-14',
          size === 'xl' && 'w-16 h-16'
        )}>
          {loading ? (
            <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
          </div>

          {/* Input */}
          <input
          ref={(node) => {
            // Handle both refs
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              (ref as any).current = node;
            }
            // Use type assertion to bypass readonly check
            (inputRef as any).current = node;
          }}
            type="text"
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
            placeholder={placeholder}
          className={inputClasses}
          aria-label={placeholder}
          role="searchbox"
          tabIndex={0}
          {...props}
          />

          {/* Clear Button */}
        {showClearButton && value && (
          <button
            onClick={handleClear}
            className={cn(
              'absolute right-0 top-1/2 transform -translate-y-1/2',
              'text-gray-400 hover:text-gray-600 transition-colors duration-200',
              'flex items-center justify-center',
              size === 'sm' && 'w-10 h-10',
              size === 'md' && 'w-12 h-12',
              size === 'lg' && 'w-14 h-14',
              size === 'xl' && 'w-16 h-16'
            )}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

      {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
            className={cn(
              'absolute top-full left-0 right-0 mt-2',
              'bg-white/95 backdrop-blur-xl border border-white/20',
              'rounded-2xl shadow-2xl z-50',
              'max-h-60 overflow-y-auto'
            )}
          >
            {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                className={cn(
                  'w-full px-4 py-3 text-left transition-colors duration-200',
                  'hover:bg-gray-50/50 first:rounded-t-2xl last:rounded-b-2xl',
                  'focus:outline-none focus:bg-gray-50/50',
                  selectedIndex === index && 'bg-blue-50/50 text-blue-600'
                )}
              >
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="truncate">{suggestion}</span>
                </div>
                </button>
              ))}
        </div>
      )}
    </div>
  );
  }
);

Search.displayName = 'Search';

export default Search; 