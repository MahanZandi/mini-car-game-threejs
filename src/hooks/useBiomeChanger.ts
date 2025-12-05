import { useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { BiomeType } from '../types/game';
import { GAME_CONFIG } from '../utils/constants';

const BIOMES: BiomeType[] = ['forest', 'desert', 'snow', 'night'];

export const useBiomeChanger = () => {
  const { isPlaying, setBiome } = useGameStore();

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      const randomBiome = BIOMES[Math.floor(Math.random() * BIOMES.length)];
      setBiome(randomBiome);
    }, GAME_CONFIG.BIOME_CHANGE_INTERVAL);

    return () => clearInterval(interval);
  }, [isPlaying, setBiome]);
};
