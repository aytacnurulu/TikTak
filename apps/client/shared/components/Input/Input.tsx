import { forwardRef, useId } from 'react';
import type { InputProps, InputSize } from './Input.types';

const sizeClasses: Record<InputSize, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-12 px-4 text-base',
  lg: 'h-[60px] px-4 text-base',
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      size = 'md',
      rightElement,
      containerClassName = '',
      className = '',
      id,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    const inputClasses = [
      'w-full rounded-[10px] bg-gray-50 border outline-none transition-colors',
      'placeholder:text-gray-400',
      'focus:border-primary',
      error ? 'border-error' : 'border-gray-200',
      rightElement ? 'pr-2' : '',
      sizeClasses[size],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={containerClassName}>
        {label && (
          <label htmlFor={inputId} className="block text-sm color-text mb-1.5">
            {label}
          </label>
        )}

        {rightElement ? (
          <div className={`flex items-center gap-2 rounded-[10px] bg-gray-50 border ${error ? 'border-error' : 'border-gray-200'} focus-within:border-primary ${sizeClasses[size]}`}>
            <input
              ref={ref}
              id={inputId}
              className="flex-1 bg-transparent outline-none placeholder:text-xl placeholder:color-placeholder h-full"
              {...rest}
            />
            {rightElement}
          </div>
        ) : (
          <input ref={ref} id={inputId} className={inputClasses} {...rest} />
        )}

        {error && <p className="mt-1 text-sm text-error">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;