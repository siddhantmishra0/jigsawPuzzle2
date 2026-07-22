import { useDraggable } from '@dnd-kit/core';
import { cn } from '../../utils';
import { getPuzzlePath } from '../../utils/jigsaw';

interface DraggablePieceProps {
  id: string;
  index: number;
  text: string;
  isPlaced?: boolean;
  isOverlay?: boolean;
  /** Rendered size in px — must match DropSlot */
  size?: number;
}

// Path uses a 150×150 viewBox (core 25–125, tabs reach 0 and 150).

export function DraggablePiece({ id, index, text, isPlaced, isOverlay, size = 150 }: DraggablePieceProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    disabled: isPlaced || isOverlay,
  });

  const path = getPuzzlePath(index, 100, 25);
  const fontSize = Math.max(7, Math.round(size * 0.072));

  return (
    <div
      ref={isOverlay ? undefined : setNodeRef}
      {...(isOverlay ? {} : listeners)}
      {...(isOverlay ? {} : attributes)}
      style={{ width: size, height: size }}
      className={cn(
        'relative shrink-0 touch-none select-none',
        isPlaced
          ? 'opacity-0 cursor-default pointer-events-none'
          : 'cursor-grab active:cursor-grabbing',
        isDragging && !isOverlay ? 'opacity-20' : '',
        isOverlay ? 'cursor-grabbing drop-shadow-2xl' : ''
      )}
    >
      <svg
        viewBox="0 0 150 150"
        width={size}
        height={size}
        className="absolute inset-0 overflow-visible"
        style={{ pointerEvents: 'none' }}
      >
        <path
          d={path}
          className={cn(
            'stroke-[1.5]',
            isOverlay
              ? 'fill-indigo-500 stroke-indigo-600'
              : 'fill-white dark:fill-gray-800 stroke-gray-400 dark:stroke-gray-500'
          )}
        />
        {/* Core is (25,25)→(125,125) in 150-unit space */}
        <foreignObject x="30" y="30" width="90" height="90">
          <div
            // @ts-expect-error xmlns needed for foreignObject
            xmlns="http://www.w3.org/1999/xhtml"
            className="w-full h-full flex items-center justify-center overflow-hidden p-1 text-center"
          >
            <span
              style={{ fontSize }}
              className={cn(
                'leading-[1.2] font-semibold select-none break-words whitespace-normal',
                isOverlay ? 'text-white' : 'text-gray-800 dark:text-gray-100'
              )}
            >
              {text}
            </span>
          </div>
        </foreignObject>
      </svg>
    </div>
  );
}
