import { create } from 'zustand';
import { GameState, BiomeType } from '../types/game';
import { GAME_CONFIG } from '../utils/constants';

interface GameStore extends GameState {
  setScore: (score: number) => void;
  setSpeed: (speed: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setIsPaused: (isPaused: boolean) => void;
  setBiome: (biome: BiomeType) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
  score: 0,
  speed: GAME_CONFIG.INITIAL_SPEED,
  isPlaying: false,
  isPaused: false,
  currentBiome: 'forest',
  
  setScore: (score) => set({ score }),
  setSpeed: (speed) => set({ speed }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setIsPaused: (isPaused) => set({ isPaused }),
  setBiome: (biome) => set({ currentBiome: biome }),
  
  resetGame: () => set({
    score: 0,
    speed: GAME_CONFIG.INITIAL_SPEED,
    isPlaying: false,
    isPaused: false,
    currentBiome: 'forest',
  }),
}));
