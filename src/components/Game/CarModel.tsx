import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useControls } from '../../hooks/useControls';
import { GAME_CONFIG } from '../../utils/constants';

// این کامپوننت برای زمانی است که مدل ماشین را دانلود کردید
// فعلا از Player.tsx استفاده کنید

export const CarModel = () => {
  const meshRef = useRef<THREE.Group>(null);
  const controls = useControls();
  const positionX = useRef(0);

  // Uncomment when you have the model file
  // const { scene } = useGLTF('/src/assets/models/car.glb');

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
    <group ref={meshRef} position={[0, 0, 5]}>
      {/* Uncomment when you have the model */}
      {/* <primitive object={scene.clone()} scale={1} /> */}
      
      {/* Placeholder - remove when using real model */}
      <mesh castShadow>
        <boxGeometry args={[1.5, 1, 3]} />
        <meshStandardMaterial color="#ff6b6b" />
      </mesh>
    </group>
  );
};

// Preload the model (uncomment when you have the file)
// useGLTF.preload('/src/assets/models/car.glb');
