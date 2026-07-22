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

// getPuzzlePath uses a 100×100 coordinate space with 15% margin.
// Core: (15,15)→(85,85). Holes indent up to ~27 from each edge.
// Safe text zone: roughly (27,27)→(73,73) in path coords.
const PIECE_SIZE = 150; // px — rendered size

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
            'stroke-[1.5]',
            isOverlay
              ? 'fill-indigo-500 stroke-indigo-600'
              : 'fill-white dark:fill-gray-800 stroke-gray-400 dark:stroke-gray-500'
          )}
        />
        {/* Core is (25,25)→(125,125) in 150-unit space; text safe zone inside core */}
        <foreignObject x="30" y="30" width="90" height="90">
          <div
            // @ts-expect-error xmlns needed for foreignObject
            xmlns="http://www.w3.org/1999/xhtml"
            className="w-full h-full flex items-center justify-center overflow-hidden p-1 text-center"
          >
            <span
              className={cn(
                'text-[10px] leading-[1.15] font-semibold select-none break-words whitespace-normal',
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
