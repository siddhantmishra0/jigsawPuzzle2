import { useDroppable } from '@dnd-kit/core';
import { cn } from '../../utils';
import { motion, AnimatePresence } from 'framer-motion';
import { getSquarePath } from '../../utils/jigsaw';

interface DropSlotProps {
  id: string;
  index: number;
  question: string;
  placedAnswerText?: string;
  /** Rendered size in px — must match DraggablePiece */
  size?: number;
}

export function DropSlot({ id, question, placedAnswerText, size = 150 }: DropSlotProps) {
  const { isOver, setNodeRef } = useDroppable({
    id,
    disabled: !!placedAnswerText,
  });

  const path = getSquarePath(100);
  // Scale font with piece size
  const fontSize = Math.max(7, Math.round(size * 0.065));

  return (
    <div
      ref={setNodeRef}
      style={{ width: size, height: size }}
      className="relative shrink-0"
    >
      {/* Square slot outline */}
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className="absolute inset-0"
        style={{ pointerEvents: 'none' }}
      >
        <path
          d={path}
          className={cn(
            'stroke-[1.5px] transition-all duration-200',
            placedAnswerText
              ? 'fill-emerald-400/25 stroke-emerald-500'
              : isOver
              ? 'fill-indigo-400/25 stroke-indigo-500'
              : 'fill-white/40 dark:fill-white/5 stroke-gray-300 dark:stroke-gray-600'
          )}
        />
      </svg>

      {/* Question text — shown when slot is empty */}
      <AnimatePresence>
        {!placedAnswerText && (
          <motion.div
            key="question"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ padding: `${Math.round(size * 0.07)}px` }}
          >
            <span
              style={{ fontSize }}
              className="leading-tight font-medium text-gray-600 dark:text-gray-400 text-center select-none"
            >
              {question}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Placed answer text */}
      <AnimatePresence>
        {placedAnswerText && (
          <motion.div
            key="answer"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ padding: `${Math.round(size * 0.07)}px` }}
          >
            <span
              style={{ fontSize: fontSize + 1 }}
              className="leading-tight font-semibold text-emerald-700 dark:text-emerald-300 text-center select-none"
            >
              {placedAnswerText}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
