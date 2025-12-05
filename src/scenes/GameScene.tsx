import { Canvas } from '@react-three/fiber';
import { Lights } from '../components/Scene/Lights';
import { Environment } from '../components/Scene/Environment';
import { Player } from '../components/Game/Player';
import { Road } from '../components/Game/Road';
import { useBiomeChanger } from '../hooks/useBiomeChanger';
import { useGameStore } from '../store/gameStore';
import { BIOME_COLORS } from '../utils/constants';

export const GameScene = () => {
  useBiomeChanger();
  const { currentBiome } = useGameStore();
  const biomeColor = BIOME_COLORS[currentBiome];

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        shadows
        camera={{ position: [0, 5, 10], fov: 75 }}
        gl={{ antialias: true }}
        style={{ background: biomeColor.sky }}
      >
        <Lights />
        <Environment />
        <Player />
        <Road />
      </Canvas>
    </div>
  );
};
