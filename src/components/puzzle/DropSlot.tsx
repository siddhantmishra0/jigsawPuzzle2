import { useDroppable } from '@dnd-kit/core';
import { cn } from '../../utils';
import { motion, AnimatePresence } from 'framer-motion';
import { getPuzzlePath } from '../../utils/jigsaw';

interface DropSlotProps {
  id: string;
  index: number;
  question: string;
  placedAnswerText?: string;
}

const PIECE_SIZE = 120; // must match DraggablePiece

export function DropSlot({ id, index, question, placedAnswerText }: DropSlotProps) {
  const { isOver, setNodeRef } = useDroppable({
    id,
    disabled: !!placedAnswerText,
  });

  const path = getPuzzlePath(index, 100, 25);

  return (
    <div
      ref={setNodeRef}
      style={{ width: PIECE_SIZE, height: PIECE_SIZE }}
      className="relative shrink-0"
    >
      {/* Background puzzle shape — always visible as the slot outline */}
      <svg
        viewBox="0 0 150 150"
        width={PIECE_SIZE}
        height={PIECE_SIZE}
        className="absolute inset-0 overflow-visible"
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
            style={{ padding: '30px' }} // keep text within core cell (25px border on each side)
          >
            <span className="text-[9px] leading-tight font-medium text-gray-600 dark:text-gray-400 text-center select-none">
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
            style={{ padding: '30px' }}
          >
            <span className="text-[10px] leading-tight font-semibold text-emerald-700 dark:text-emerald-300 text-center select-none">
              {placedAnswerText}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
