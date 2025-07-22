import React, { forwardRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'filled' | 'outlined' | 'apple';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  floatingLabel?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  variant = 'default',
  size = 'md',
  floatingLabel = false,
  className = '',
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setHasValue(e.target.value.length > 0);
    props.onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(e.target.value.length > 0);
    props.onChange?.(e);
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
      'bg-white/90 backdrop-blur-xl border border-gray-200',
      'hover:bg-white hover:border-gray-300',
      'focus:bg-white focus:border-primary focus:ring-primary/20'
    ),
    filled: cn(
      'bg-gray-50/90 backdrop-blur-xl border border-transparent',
      'hover:bg-gray-100/90',
      'focus:bg-white focus:border-primary focus:ring-primary/20'
    ),
    outlined: cn(
      'bg-transparent border-2 border-gray-300',
      'hover:border-gray-400',
      'focus:border-primary focus:ring-primary/20'
    ),
    apple: cn(
      'bg-white/80 backdrop-blur-xl border border-white/20',
      'hover:bg-white/90 hover:border-white/30',
      'focus:bg-white focus:border-primary focus:ring-primary/20',
      'shadow-md'
    )
  };

  const sizeClasses = {
    sm: 'px-4 py-2.5 text-sm rounded-lg',
    md: 'px-5 py-3.5 text-base rounded-xl',
    lg: 'px-6 py-4 text-lg rounded-2xl',
    xl: 'px-8 py-5 text-xl rounded-3xl'
  };

  const errorClasses = error ? cn(
    'border-error focus:border-error focus:ring-error/20'
  ) : '';

  const iconClasses = leftIcon ? 'pl-12' : '';
  const rightIconClasses = rightIcon ? 'pr-12' : '';

  const inputClasses = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    errorClasses,
    iconClasses,
    rightIconClasses,
    className
  );

  const floatingLabelClasses = cn(
    'absolute left-0 transition-all duration-200 ease-out pointer-events-none',
    'text-gray-500',
    (isFocused || hasValue) && 'text-blue-600 scale-90 -translate-y-6',
    leftIcon && 'left-12'
  );

  return (
    <div className="space-y-2">
      {label && !floatingLabel && (
        <label className="block text-sm font-semibold text-gray-700 tracking-tight">
          {label}
        </label>
      )}
      
      <div className="relative">
        {floatingLabel && (
          <label className={cn(
            floatingLabelClasses,
            size === 'sm' && 'text-sm top-3',
            size === 'md' && 'text-base top-4',
            size === 'lg' && 'text-lg top-5',
            size === 'xl' && 'text-xl top-6'
          )}>
            {label}
          </label>
        )}
        
        {leftIcon && (
          <div className={cn(
            'absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400',
            'flex items-center justify-center',
            size === 'sm' && 'w-10 h-10',
            size === 'md' && 'w-12 h-12',
            size === 'lg' && 'w-14 h-14',
            size === 'xl' && 'w-16 h-16'
          )}>
            {leftIcon}
          </div>
        )}
        
        <input
          ref={ref}
          className={inputClasses}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          aria-label={label || props.placeholder}
          role="textbox"
          tabIndex={0}
          {...props}
        />
        
        {rightIcon && (
          <div className={cn(
            'absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400',
            'flex items-center justify-center',
            size === 'sm' && 'w-10 h-10',
            size === 'md' && 'w-12 h-12',
            size === 'lg' && 'w-14 h-14',
            size === 'xl' && 'w-16 h-16'
          )}>
            {rightIcon}
          </div>
        )}
      </div>
      
      {(error || helperText) && (
        <div className="text-sm space-y-1">
          {error && (
            <p className="text-red-600 flex items-center gap-2 font-medium">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </p>
          )}
          {helperText && !error && (
            <p className="text-gray-500 leading-relaxed">
              {helperText}
            </p>
          )}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input; 