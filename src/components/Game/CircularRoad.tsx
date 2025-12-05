export const CircularRoad = () => {
  const radius = 1500; // 3km diameter = 1.5km radius
  const segments = 100;

  // Seeded random function
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  return (
    <group>
      {/* Ground circle */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <circleGeometry args={[radius + 100, 64]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>

      {/* Road ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[radius - 6, radius + 6, 128]} />
        <meshStandardMaterial color="#333333" />
      </mesh>

      {/* Center line dashes */}
      {Array.from({ length: segments }).map((_, i) => {
        const angle = (i / segments) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        return (
          <mesh key={i} rotation={[-Math.PI / 2, 0, angle]} position={[x, 0.02, z]}>
            <planeGeometry args={[0.3, 3]} />
            <meshBasicMaterial color="#ffff00" />
          </mesh>
        );
      })}

      {/* Objects around the track */}
      {Array.from({ length: 80 }).map((_, i) => {
        const angle = (i / 80) * Math.PI * 2;
        const seed = i * 100;
        const type = Math.floor(seededRandom(seed) * 4);
        const boulderSize = 1.5 + seededRandom(seed + 1) * 4;
        
        // Inner objects
        const innerDist = radius - 15 - seededRandom(seed + 2) * 10;
        const xi = Math.cos(angle) * innerDist;
        const zi = Math.sin(angle) * innerDist;
        
        // Outer objects
        const outerDist = radius + 15 + seededRandom(seed + 3) * 10;
        const xo = Math.cos(angle) * outerDist;
        const zo = Math.sin(angle) * outerDist;

        return (
          <group key={i}>
            {/* Inner object */}
            <group position={[xi, 0, zi]}>
              {type === 0 && (
                // Tree
                <>
                  <mesh position={[0, 3, 0]}>
                    <cylinderGeometry args={[0.6, 0.8, 6]} />
                    <meshStandardMaterial color="#8B4513" />
                  </mesh>
                  <mesh position={[0, 8, 0]}>
                    <coneGeometry args={[4, 8, 8]} />
                    <meshStandardMaterial color="#228B22" />
                  </mesh>
                </>
              )}
              {type === 1 && (
                // Rock
                <mesh position={[0, 1, 0]}>
                  <dodecahedronGeometry args={[2]} />
                  <meshStandardMaterial color="#808080" />
                </mesh>
              )}
              {type === 2 && (
                // Bush
                <mesh position={[0, 1.5, 0]}>
                  <sphereGeometry args={[2, 8, 8]} />
                  <meshStandardMaterial color="#2F4F2F" />
                </mesh>
              )}
              {type === 3 && (
                // Boulder
                <mesh position={[0, boulderSize * 0.6, 0]}>
                  <sphereGeometry args={[boulderSize, 6, 6]} />
                  <meshStandardMaterial color="#A9A9A9" />
                </mesh>
              )}
            </group>

            {/* Outer object */}
            <group position={[xo, 0, zo]}>
              {type === 0 && (
                // Tree
                <>
                  <mesh position={[0, 3, 0]}>
                    <cylinderGeometry args={[0.6, 0.8, 6]} />
                    <meshStandardMaterial color="#8B4513" />
                  </mesh>
                  <mesh position={[0, 8, 0]}>
                    <coneGeometry args={[4, 8, 8]} />
                    <meshStandardMaterial color="#228B22" />
                  </mesh>
                </>
              )}
              {type === 1 && (
                // Rock
                <mesh position={[0, 1, 0]}>
                  <dodecahedronGeometry args={[2]} />
                  <meshStandardMaterial color="#808080" />
                </mesh>
              )}
              {type === 2 && (
                // Bush
                <mesh position={[0, 1.5, 0]}>
                  <sphereGeometry args={[2, 8, 8]} />
                  <meshStandardMaterial color="#2F4F2F" />
                </mesh>
              )}
              {type === 3 && (
                // Boulder
                <mesh position={[0, boulderSize * 0.6, 0]}>
                  <sphereGeometry args={[boulderSize, 6, 6]} />
                  <meshStandardMaterial color="#A9A9A9" />
                </mesh>
              )}
            </group>
          </group>
        );
      })}
    </group>
  );
};
