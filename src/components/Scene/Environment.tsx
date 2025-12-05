import { useGameStore } from '../../store/gameStore';
import { BIOME_COLORS } from '../../utils/constants';

export const Environment = () => {
  const { currentBiome } = useGameStore();
  const biomeColor = BIOME_COLORS[currentBiome];

  return (
    <>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 200]} />
        <meshStandardMaterial color={biomeColor.ground} />
      </mesh>

      {/* Road - darker */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[12, 200]} />
        <meshStandardMaterial color="#333333" />
      </mesh>

      {/* Center line */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <planeGeometry args={[0.3, 200]} />
        <meshBasicMaterial color="#ffff00" />
      </mesh>

      {/* Side lines */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-5, 0.02, 0]}>
        <planeGeometry args={[0.3, 200]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[5, 0.02, 0]}>
        <planeGeometry args={[0.3, 200]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </>
  );
}
