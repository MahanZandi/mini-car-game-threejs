import { useGameStore } from '../../store/gameStore';
import { BIOME_COLORS } from '../../utils/constants';

export const Lights = () => {
  const { currentBiome } = useGameStore();
  const biomeColor = BIOME_COLORS[currentBiome];

  return (
    <>
      {/* Ambient light for overall scene illumination */}
      <ambientLight intensity={0.4} color={biomeColor.ambient} />
      
      {/* Directional light as sun */}
      <directionalLight
        position={[10, 20, 10]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      
      {/* Hemisphere light for sky/ground gradient */}
      <hemisphereLight
        args={[biomeColor.sky, biomeColor.ground, 0.6]}
      />
      
      {/* Fog for depth */}
      <fog attach="fog" args={[biomeColor.sky, 30, 100]} />
    </>
  );
};
