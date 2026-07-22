import { useState, useEffect } from 'react';
import { DndContext, DragOverlay, closestCenter } from '@dnd-kit/core';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import type { AlgorithmData, QuestionAnswer } from '../../data/algorithms';
import { DropSlot } from './DropSlot';
import { DraggablePiece } from './DraggablePiece';
import type { PlacedPiece } from '../../types/puzzle';
import { useGameStore } from '../../store/useGameStore';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface PuzzleBoardProps {
  algorithm: AlgorithmData;
  onComplete: () => void;
}

/**
 * Returns a responsive piece size in px based on the current viewport width.
 *   < 480px  → floor((vw - 24) / 3), min 80
 *   480–767  → 110
 *   768–1279 → 130
 *   ≥ 1280   → 150
 */
function usePieceSize(): number {
  const calc = () => {
    const vw = window.innerWidth;
    if (vw < 480) return Math.max(80, Math.floor((vw - 24) / 3));
    if (vw < 768) return 110;
    if (vw < 1280) return 130;
    return 150;
  };

  const [size, setSize] = useState(calc);

  useEffect(() => {
    const handler = () => setSize(calc());
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return size;
}

export function PuzzleBoard({ algorithm, onComplete }: PuzzleBoardProps) {
  const [placedPieces, setPlacedPieces] = useState<PlacedPiece[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [shuffledAnswers, setShuffledAnswers] = useState<QuestionAnswer[]>([]);
  const [feedback, setFeedback] = useState<{ isError: boolean; message: string } | null>(null);

  const { addCorrectPlacement, addMistake } = useGameStore();
  const pieceSize = usePieceSize();
  const gridWidth = pieceSize * 3;

  useEffect(() => {
    const shuffled = [...algorithm.questions].sort(() => Math.random() - 0.5);
    setShuffledAnswers(shuffled);
    setPlacedPieces([]);
  }, [algorithm]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    setFeedback(null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const answerId = active.id as string;
    const questionId = over.id as string;

    if (answerId === questionId) {
      setPlacedPieces((prev) => [...prev, { questionId, answerId }]);
      addCorrectPlacement();

      if (placedPieces.length + 1 === algorithm.questions.length) {
        setTimeout(() => onComplete(), 1500);
      }
    } else {
      addMistake();
      const wrongAnswer = algorithm.questions.find((q) => q.id === answerId);
      setFeedback({
        isError: true,
        message: `Incorrect! Hint: ${wrongAnswer?.hint || 'Try again.'}`,
      });
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  const activePiece = activeId
    ? algorithm.questions.find((q) => q.id === activeId)
    : null;

  const progress = placedPieces.length;
  const total = algorithm.questions.length;

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCenter}
    >
      {/* Stack on mobile/tablet, side-by-side on xl+ */}
      <div className="w-full flex flex-col xl:flex-row xl:justify-between gap-8">

        {/* ── Left / Top: Question Board ── */}
        <div className="flex flex-col items-center">
          <div className="mb-4 flex items-center justify-between w-full" style={{ maxWidth: gridWidth }}>
            <h3 className="text-lg md:text-xl font-bold">Question Board</h3>
            <span className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400">
              {progress} / {total} Completed
            </span>
          </div>

          <div
            className="grid grid-cols-3"
            style={{ width: gridWidth, height: gridWidth }}
          >
            {algorithm.questions.map((q, index) => {
              const placed = placedPieces.find((p) => p.questionId === q.id);
              const placedAnswer = placed
                ? algorithm.questions.find((a) => a.id === placed.answerId)?.answer
                : undefined;

              return (
                <DropSlot
                  key={q.id}
                  id={q.id}
                  index={index}
                  question={q.question}
                  placedAnswerText={placedAnswer}
                  size={pieceSize}
                />
              );
            })}
          </div>
        </div>

        {/* ── Right / Bottom: Answer Drawer ── */}
        <div className="flex flex-col items-center xl:items-start" style={{ width: gridWidth }}>
          <h3 className="text-lg md:text-xl font-bold mb-4">Answers</h3>

          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3 mb-4 rounded-lg flex items-start gap-2 text-sm w-full ${
                feedback.isError
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : 'bg-green-50 text-green-700 border border-green-200'
              }`}
            >
              {feedback.isError ? (
                <AlertCircle className="w-5 h-5 shrink-0" />
              ) : (
                <CheckCircle2 className="w-5 h-5 shrink-0" />
              )}
              <span>{feedback.message}</span>
            </motion.div>
          )}

          <div className="glass rounded-xl bg-gray-50/50 dark:bg-black/20">
            <div className="grid gap-0" style={{ gridTemplateColumns: `repeat(3, ${pieceSize}px)` }}>
              {shuffledAnswers.map((answer) => {
                const isPlaced = placedPieces.some((p) => p.answerId === answer.id);
                const correctIndex = algorithm.questions.findIndex(
                  (q) => q.id === answer.id
                );
                return (
                  <DraggablePiece
                    key={`ans-${answer.id}`}
                    id={answer.id}
                    index={correctIndex}
                    text={answer.answer}
                    isPlaced={isPlaced}
                    size={pieceSize}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* DragOverlay renders the floating ghost piece during drag */}
      <DragOverlay dropAnimation={null}>
        {activePiece ? (
          <DraggablePiece
            id={activePiece.id}
            index={algorithm.questions.findIndex((q) => q.id === activePiece.id)}
            text={activePiece.answer}
            isOverlay
            size={pieceSize}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
