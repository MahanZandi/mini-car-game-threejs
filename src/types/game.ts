export interface GameState {
  score: number;
  speed: number;
  isPlaying: boolean;
  isPaused: boolean;
  currentBiome: BiomeType;
}

export type BiomeType = 'desert' | 'forest' | 'snow' | 'night';

export interface PlayerControls {
  left: boolean;
  right: boolean;
  accelerate: boolean;
  brake: boolean;
}
