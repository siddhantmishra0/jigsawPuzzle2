import React, { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils';
import { motion, HTMLMotionProps } from 'framer-motion';

type MotionDivProps = HTMLMotionProps<"div"> & Omit<HTMLAttributes<HTMLDivElement>, keyof HTMLMotionProps<"div">>;

interface GlassCardProps extends MotionDivProps {
  interactive?: boolean;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, interactive, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={interactive ? { y: -5, scale: 1.01 } : undefined}
        className={cn(
          'glass rounded-2xl p-6 overflow-hidden relative',
          interactive && 'cursor-pointer transition-shadow hover:shadow-xl',
          className
        )}
        {...props}
      >
        <div className="relative z-10">{children as React.ReactNode}</div>
      </motion.div>
    );
  }
);

GlassCard.displayName = 'GlassCard';
