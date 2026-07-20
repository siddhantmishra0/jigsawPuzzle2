import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AlgorithmId } from '../data/algorithms';

interface GameState {
  unlockedAlgorithms: AlgorithmId[];
  completedAlgorithms: AlgorithmId[];
  xp: number;
  timeSpentSeconds: number;
  hintsUsed: number;
  mistakesMade: number;
  totalCorrectPlacements: number;
  theme: 'dark' | 'light';
  
  // Actions
  unlockAlgorithm: (id: AlgorithmId) => void;
  completeAlgorithm: (id: AlgorithmId) => void;
  addXP: (amount: number) => void;
  addTime: (seconds: number) => void;
  useHint: () => void;
  addMistake: () => void;
  addCorrectPlacement: () => void;
  toggleTheme: () => void;
  resetProgress: () => void;
}

const initialState = {
  unlockedAlgorithms: ['linear'] as AlgorithmId[],
  completedAlgorithms: [] as AlgorithmId[],
  xp: 0,
  timeSpentSeconds: 0,
  hintsUsed: 0,
  mistakesMade: 0,
  totalCorrectPlacements: 0,
  theme: 'dark' as const,
};

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      ...initialState,
      
      unlockAlgorithm: (id) => set((state) => ({
        unlockedAlgorithms: state.unlockedAlgorithms.includes(id) 
          ? state.unlockedAlgorithms 
          : [...state.unlockedAlgorithms, id]
      })),
      
      completeAlgorithm: (id) => set((state) => {
        if (state.completedAlgorithms.includes(id)) return state;
        
        // Auto-unlock logic based on order
        const order: AlgorithmId[] = ['linear', 'polynomial', 'logistic', 'pca'];
        const currentIndex = order.indexOf(id);
        const nextId = order[currentIndex + 1];
        
        let newUnlocked = [...state.unlockedAlgorithms];
        if (nextId && !newUnlocked.includes(nextId)) {
          newUnlocked.push(nextId);
        }
        
        return {
          completedAlgorithms: [...state.completedAlgorithms, id],
          unlockedAlgorithms: newUnlocked,
          xp: state.xp + 500 // Bonus XP for completion
        };
      }),
      
      addXP: (amount) => set((state) => ({ xp: state.xp + amount })),
      
      addTime: (seconds) => set((state) => ({ timeSpentSeconds: state.timeSpentSeconds + seconds })),
      
      useHint: () => set((state) => ({ 
        hintsUsed: state.hintsUsed + 1,
        xp: Math.max(0, state.xp - 10) // Penalty for hint
      })),
      
      addMistake: () => set((state) => ({ mistakesMade: state.mistakesMade + 1 })),
      
      addCorrectPlacement: () => set((state) => ({ 
        totalCorrectPlacements: state.totalCorrectPlacements + 1,
        xp: state.xp + 50 // XP for correct placement
      })),
      
      toggleTheme: () => set((state) => {
        const newTheme = state.theme === 'dark' ? 'light' : 'dark';
        if (newTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        return { theme: newTheme };
      }),
      
      resetProgress: () => set(initialState),
    }),
    {
      name: 'ml-puzzleverse-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          if (state.theme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
      }
    }
  )
);
