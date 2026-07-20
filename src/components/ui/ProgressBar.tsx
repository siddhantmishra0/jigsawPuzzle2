import { HTMLAttributes } from 'react';
import { cn } from '../../utils';
import { motion } from 'framer-motion';

interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  indicatorClassName?: string;
}

export function ProgressBar({ 
  value, 
  max = 100, 
  className, 
  indicatorClassName,
  ...props 
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div
      className={cn('relative h-4 w-full overflow-hidden rounded-full bg-black/10 dark:bg-white/10', className)}
      {...props}
    >
      <motion.div
        className={cn('h-full bg-ml-blue', indicatorClassName)}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </div>
  );
}
