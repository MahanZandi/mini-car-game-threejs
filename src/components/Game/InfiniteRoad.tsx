import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export interface InfiniteRoadProps {
  carRef: React.RefObject<THREE.Group>;
}

export const InfiniteRoad = ({ carRef }: InfiniteRoadProps) => {
  const [currentSegment, setCurrentSegment] = useState(0);
  const lastSegmentRef = useRef(0);

  // Seeded random function
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  useFrame(() => {
    if (carRef.current) {
      const worldPos = new THREE.Vector3();
      carRef.current.getWorldPosition(worldPos);
      const carZ = worldPos.z;
      const newSegment = Math.floor(carZ / 100);
      if (newSegment !== lastSegmentRef.current) {
        lastSegmentRef.current = newSegment;
        setCurrentSegment(newSegment);
      }
    }
  });

  const visibleSegments = [];
  for (let i = -30; i <= 5; i++) {
    visibleSegments.push(currentSegment + i);
  }

  return (
    <group>
      {/* Clouds */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 20) * Math.PI * 2;
        const distance = 200 + seededRandom(i * 100) * 100;
        const x = Math.cos(angle) * distance;
        const z = Math.sin(angle) * distance;
        const y = 50 + seededRandom(i * 101) * 30;
        const scale = 10 + seededRandom(i * 102) * 15;
        
        return (
          <mesh key={`cloud-${i}`} position={[x, y, z]}>
            <boxGeometry args={[scale * 2, scale * 0.5, scale]} />
            <meshStandardMaterial color="#ffffff" opacity={0.4} transparent />
          </mesh>
        );
      })}

      {visibleSegments.map((segmentIndex) => (
        <group key={segmentIndex} position={[0, 0, segmentIndex * 100]}>
          {/* Ground */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial color="#228B22" />
          </mesh>

          {/* Road */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
            <planeGeometry args={[12, 100]} />
            <meshStandardMaterial color="#333333" />
          </mesh>

          {/* Center line dashes */}
          {Array.from({ length: 10 }).map((_, j) => (
            <mesh key={j} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, j * 10 - 45]}>
              <planeGeometry args={[0.3, 2]} />
              <meshBasicMaterial color="#ffff00" />
            </mesh>
          ))}

          {/* Side lines */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-5.5, 0.02, 0]}>
            <planeGeometry args={[0.3, 100]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[5.5, 0.02, 0]}>
            <planeGeometry args={[0.3, 100]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>

          {/* Fallen trees on road (rare) */}
          {seededRandom(segmentIndex * 1000) > 0.7 && (
            <group position={[0, 0.5, seededRandom(segmentIndex * 1001) * 80 - 40]} rotation={[0, seededRandom(segmentIndex * 1002) * Math.PI, Math.PI / 2]}>
              {/* Trunk */}
              <mesh>
                <cylinderGeometry args={[0.6, 0.8, 8]} />
                <meshStandardMaterial color="#8B4513" />
              </mesh>
              {/* Leaves */}
              <mesh position={[0, 4, 0]}>
                <coneGeometry args={[3, 6, 8]} />
                <meshStandardMaterial color="#228B22" />
              </mesh>
            </group>
          )}

          {/* Objects on left side */}
          {Array.from({ length: 4 }).map((_, j) => {
            const seed = segmentIndex * 1000 + j;
            const z = j * 25 - 50;
            const x = -10 - seededRandom(seed) * 5;
            const type = Math.floor(seededRandom(seed + 1) * 4);
            const boulderSize = 1.5 + seededRandom(seed + 2) * 4;
            
            return (
              <group key={`left-${j}`} position={[x, 0, z]}>
                {type === 0 && (
                  <>
                    <mesh position={[0, 3, 0]}>
                      <cylinderGeometry args={[0.6, 0.8, 6, 4]} />
                      <meshBasicMaterial color="#8B4513" />
                    </mesh>
                    <mesh position={[0, 8, 0]}>
                      <coneGeometry args={[4, 8, 4]} />
                      <meshBasicMaterial color="#228B22" />
                    </mesh>
                  </>
                )}
                {type === 1 && (
                  <mesh position={[0, 1, 0]}>
                    <boxGeometry args={[2, 2, 2]} />
                    <meshBasicMaterial color="#808080" />
                  </mesh>
                )}
                {type === 2 && (
                  <mesh position={[0, 1.5, 0]}>
                    <sphereGeometry args={[2, 4, 4]} />
                    <meshBasicMaterial color="#2F4F2F" />
                  </mesh>
                )}
                {type === 3 && (
                  <mesh position={[0, boulderSize * 0.6, 0]}>
                    <sphereGeometry args={[boulderSize, 4, 4]} />
                    <meshBasicMaterial color="#A9A9A9" />
                  </mesh>
                )}
              </group>
            );
          })}

          {/* Objects on right side */}
          {Array.from({ length: 4 }).map((_, j) => {
            const seed = segmentIndex * 2000 + j;
            const z = j * 25 - 50;
            const x = 10 + seededRandom(seed) * 5;
            const type = Math.floor(seededRandom(seed + 1) * 4);
            const boulderSize = 1.5 + seededRandom(seed + 2) * 4;
            
            return (
              <group key={`right-${j}`} position={[x, 0, z]}>
                {type === 0 && (
                  <>
                    <mesh position={[0, 3, 0]}>
                      <cylinderGeometry args={[0.6, 0.8, 6, 4]} />
                      <meshBasicMaterial color="#8B4513" />
                    </mesh>
                    <mesh position={[0, 8, 0]}>
                      <coneGeometry args={[4, 8, 4]} />
                      <meshBasicMaterial color="#228B22" />
                    </mesh>
                  </>
                )}
                {type === 1 && (
                  <mesh position={[0, 1, 0]}>
                    <boxGeometry args={[2, 2, 2]} />
                    <meshBasicMaterial color="#808080" />
                  </mesh>
                )}
                {type === 2 && (
                  <mesh position={[0, 1.5, 0]}>
                    <sphereGeometry args={[2, 4, 4]} />
                    <meshBasicMaterial color="#2F4F2F" />
                  </mesh>
                )}
                {type === 3 && (
                  <mesh position={[0, boulderSize * 0.6, 0]}>
                    <sphereGeometry args={[boulderSize, 4, 4]} />
                    <meshBasicMaterial color="#A9A9A9" />
                  </mesh>
                )}
              </group>
            );
          })}
        </group>
      ))}
    </group>
  );
};
