import type { HTMLAttributes } from 'react';
import { cn } from '../../utils';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'outline';
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
        {
          'bg-ml-blue text-white': variant === 'default',
          'bg-ml-green text-white': variant === 'success',
          'bg-ml-orange text-white': variant === 'warning',
          'bg-red-500 text-white': variant === 'error',
          'border border-foreground/20 text-foreground': variant === 'outline',
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
