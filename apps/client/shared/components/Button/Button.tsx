import { forwardRef } from 'react';
import type { ButtonProps, ButtonVariant, ButtonSize } from './Button.types';
import Spinner from '../Spinner';

const variantClasses: Record<ButtonVariant, string> = {
 primary: 'bg-primary text-white hover:opacity-90',
  success: 'bg-success text-white hover:opacity-90',
  danger:  'bg-error text-white hover:opacity-90',
  accent:  'bg-accent text-dark hover:opacity-90',
  dark:    'bg-dark text-white hover:opacity-90',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-12 px-4 text-base',
  lg: 'h-[60px] px-6 text-lg',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      type = 'button',
      disabled = false,
      loading = false,
      fullWidth = false,
      active = false,
      iconLeft,
      iconRight,
      className = '',
      children,
      ...rest
    },
    ref
  ) => {
    const isIconOnly = !children;

    const classes = [
      'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors',
      'disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
      variantClasses[variant],
      sizeClasses[size],
      active ? 'ring-2 ring-primary ring-offset-2' : '',
      fullWidth ? 'w-full' : '',
      isIconOnly ? 'aspect-square px-0' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const spinnerColor = variant === 'primary' || variant === 'danger' ? 'white' : 'primary';

    return (
      <button
        ref={ref}
        type={type}
        className={classes}
        disabled={disabled || loading}
        {...rest}
      >
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <Spinner size="sm" color={spinnerColor} />
            {children && <span>{children}</span>}
          </span>
        ) : (
          <>
            {iconLeft && <span className="inline-flex">{iconLeft}</span>}
            {children}
            {iconRight && <span className="inline-flex">{iconRight}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;