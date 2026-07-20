import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../../utils';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

// Omit conflicting props to allow merging with Framer Motion
type MotionButtonProps = HTMLMotionProps<"button"> & Omit<ButtonProps, keyof HTMLMotionProps<"button">>;

export const Button = forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
          {
            'bg-ml-blue text-white hover:bg-blue-600': variant === 'primary',
            'bg-white/10 hover:bg-white/20 text-foreground border border-white/20': variant === 'secondary',
            'border-2 border-ml-blue text-ml-blue hover:bg-blue-50 dark:hover:bg-blue-900/20': variant === 'outline',
            'hover:bg-black/5 dark:hover:bg-white/5 text-foreground': variant === 'ghost',
            'h-9 px-4 text-sm': size === 'sm',
            'h-11 px-6 text-base': size === 'md',
            'h-14 px-8 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
