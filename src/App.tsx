import { Canvas } from '@react-three/fiber';
import { Car } from './components/Game/Car';
import { InfiniteRoad } from './components/Game/InfiniteRoad';
import { MobileControls } from './components/UI/MobileControls';
import { DayNightCycle } from './components/Scene/DayNightCycle';
import { useRef } from 'react';
import * as THREE from 'three';

function App() {
  const carRef = useRef<THREE.Group>(null);
  
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#87CEEB' }}>
      <Canvas camera={{ position: [0, 5, 10], fov: 75 }}>
        <DayNightCycle />
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        {/* Infinite Road */}
        <InfiniteRoad carRef={carRef} />
        
        {/* Car */}
        <group ref={carRef} position={[0, 1.3, 0]}>
          <Car />
        </group>
      </Canvas>
      <MobileControls />
    </div>
  );
}

export default App;
