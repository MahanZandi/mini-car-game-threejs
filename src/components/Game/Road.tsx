import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStore } from '../../store/gameStore';

export const Road = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { speed, isPlaying } = useGameStore();

  useFrame((_, delta) => {
    if (!groupRef.current || !isPlaying) return;

    // Move road towards camera for infinite scroll effect
    groupRef.current.position.z += speed * delta;

    // Reset position when road segment passes camera
    if (groupRef.current.position.z > 100) {
      groupRef.current.position.z = -100;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Road segments for infinite scroll */}
      {Array.from({ length: 10 }).map((_, i) => (
        <group key={i} position={[0, 0, -i * 20]}>
          {/* Left lane marking */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-2, 0.02, 0]}>
            <planeGeometry args={[0.15, 3]} />
            <meshBasicMaterial color="#ffff00" />
          </mesh>
          
          {/* Right lane marking */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[2, 0.02, 0]}>
            <planeGeometry args={[0.15, 3]} />
            <meshBasicMaterial color="#ffff00" />
          </mesh>
        </group>
      ))}
    </group>
  );
};
