import { useDraggable } from '@dnd-kit/core';
import { cn } from '../../utils';
import { getPuzzlePath } from '../../utils/jigsaw';

interface DraggablePieceProps {
  id: string;
  index: number;
  text: string;
  isPlaced?: boolean;
  isOverlay?: boolean;
}

// The SVG viewBox is 0 0 150 150, where the core cell is 100x100 at offset (25,25).
// The outer 25px on each side accommodates tabs/holes.
// We make the container div exactly match the SVG's physical size so dnd-kit's
// pointer offset is correctly aligned with the visual.
const PIECE_SIZE = 120; // px — rendered size of the full 150-unit viewBox

export function DraggablePiece({ id, index, text, isPlaced, isOverlay }: DraggablePieceProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    disabled: isPlaced || isOverlay,
  });

  const path = getPuzzlePath(index, 100, 25);

  return (
    <div
      ref={isOverlay ? undefined : setNodeRef}
      {...(isOverlay ? {} : listeners)}
      {...(isOverlay ? {} : attributes)}
      style={{ width: PIECE_SIZE, height: PIECE_SIZE }}
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
        width={PIECE_SIZE}
        height={PIECE_SIZE}
        className="absolute inset-0 overflow-visible"
        style={{ pointerEvents: 'none' }}
      >
        <path
          d={path}
          className={cn(
            'stroke-2',
            isOverlay
              ? 'fill-indigo-500 stroke-indigo-600'
              : 'fill-white dark:fill-gray-800 stroke-gray-400 dark:stroke-gray-500'
          )}
        />
        <foreignObject x="28" y="28" width="94" height="94">
          <div
            // @ts-expect-error xmlns needed for foreignObject
            xmlns="http://www.w3.org/1999/xhtml"
            className="w-full h-full flex items-center justify-center p-2 text-center"
          >
            <span
              className={cn(
                'text-[10px] leading-tight font-semibold select-none',
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
