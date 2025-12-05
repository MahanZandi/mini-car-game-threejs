import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useControls } from '../../hooks/useControls';
import { GAME_CONFIG } from '../../utils/constants';

export const Player = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const controls = useControls();
  const positionX = useRef(0);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    // Horizontal movement
    if (controls.left && positionX.current > -GAME_CONFIG.ROAD_WIDTH / 2 + 1) {
      positionX.current -= 10 * delta;
    }
    if (controls.right && positionX.current < GAME_CONFIG.ROAD_WIDTH / 2 - 1) {
      positionX.current += 10 * delta;
    }

    meshRef.current.position.x = positionX.current;
  });

  return (
    <mesh ref={meshRef} position={[0, 1, 5]} castShadow>
      {/* Placeholder car - replace with your 3D model */}
      <boxGeometry args={[1.5, 1, 3]} />
      <meshStandardMaterial color="#ff6b6b" />
    </mesh>
  );
};
