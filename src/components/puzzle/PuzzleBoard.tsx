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

export function PuzzleBoard({ algorithm, onComplete }: PuzzleBoardProps) {
  const [placedPieces, setPlacedPieces] = useState<PlacedPiece[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [shuffledAnswers, setShuffledAnswers] = useState<QuestionAnswer[]>([]);
  const [feedback, setFeedback] = useState<{ isError: boolean; message: string } | null>(null);

  const { addCorrectPlacement, addMistake } = useGameStore();

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
    // DndContext MUST wrap both the board (drop targets) AND the drawer (draggables)
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCenter}
    >
      <div className="w-full flex flex-col md:flex-row md:justify-between gap-8">
        {/* ── Left: 3×3 Board ── */}
        <div className="flex-1 flex flex-col items-center">
          <div className="mb-4 w-full flex items-center justify-between">
            <h3 className="text-xl font-bold">Question Board</h3>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {progress} / {total} Completed
            </span>
          </div>

          {/* Each cell is 120×120 px (matches PIECE_SIZE in DropSlot / DraggablePiece) */}
          <div
            className="grid grid-cols-3"
            style={{ width: 450, height: 450 }}
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
                />
              );
            })}
          </div>
        </div>

        {/* ── Right: Answer Drawer ── */}
        <div className="flex flex-col" style={{ width: 450 }}>
          <h3 className="text-xl font-bold mb-4">Answers</h3>

          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3 mb-4 rounded-lg flex items-start gap-2 text-sm ${
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
            <div className="grid gap-0" style={{ gridTemplateColumns: 'repeat(3, 150px)' }}>
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
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
