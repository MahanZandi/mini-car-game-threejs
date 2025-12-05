import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export const Car = () => {
  const { scene } = useGLTF('/assets/models/car.glb');
  const wheelsRef = useRef<THREE.Object3D[]>([]);
  const carRef = useRef<THREE.Group>(null);
  const speedRef = useRef(0);
  const steeringRef = useRef(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const hornOscillatorRef = useRef<OscillatorNode | null>(null);
  const hornGainRef = useRef<GainNode | null>(null);
  
  // Find wheels (exclude spare tire)
  useEffect(() => {
    wheelsRef.current = [];
    scene.traverse((child) => {
      if (child.name.includes('Tire') && !child.name.includes('Spare')) {
        wheelsRef.current.push(child);
      }
    });

    // Initialize audio
    audioContextRef.current = new AudioContext();
    oscillatorRef.current = audioContextRef.current.createOscillator();
    gainNodeRef.current = audioContextRef.current.createGain();
    
    oscillatorRef.current.type = 'sawtooth';
    oscillatorRef.current.frequency.value = 30;
    gainNodeRef.current.gain.value = 0;
    
    oscillatorRef.current.connect(gainNodeRef.current);
    gainNodeRef.current.connect(audioContextRef.current.destination);
    oscillatorRef.current.start();

    return () => {
      if (oscillatorRef.current) oscillatorRef.current.stop();
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, [scene]);
  
  // Keyboard controls
  useEffect(() => {
    const keys = { w: false, s: false, a: false, d: false };
    
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === 'w' || e.key === 'ArrowUp') keys.w = true;
      if (key === 's' || e.key === 'ArrowDown') keys.s = true;
      if (key === 'a' || e.key === 'ArrowLeft') keys.a = true;
      if (key === 'd' || e.key === 'ArrowRight') keys.d = true;
      
      // Horn - dual tone
      if (key === 'h' && audioContextRef.current && !hornOscillatorRef.current) {
        const ctx = audioContextRef.current;
        
        // Low tone
        const osc1 = ctx.createOscillator();
        osc1.type = 'sine';
        osc1.frequency.value = 400;
        
        // High tone
        const osc2 = ctx.createOscillator();
        osc2.type = 'sine';
        osc2.frequency.value = 500;
        
        hornGainRef.current = ctx.createGain();
        hornGainRef.current.gain.value = 0.15;
        
        osc1.connect(hornGainRef.current);
        osc2.connect(hornGainRef.current);
        hornGainRef.current.connect(ctx.destination);
        
        osc1.start();
        osc2.start();
        
        hornOscillatorRef.current = osc1;
        (hornOscillatorRef.current as any).osc2 = osc2;
      }
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === 'w' || e.key === 'ArrowUp') keys.w = false;
      if (key === 's' || e.key === 'ArrowDown') keys.s = false;
      if (key === 'a' || e.key === 'ArrowLeft') keys.a = false;
      if (key === 'd' || e.key === 'ArrowRight') keys.d = false;
      
      // Stop horn
      if (key === 'h' && hornOscillatorRef.current) {
        hornOscillatorRef.current.stop();
        if ((hornOscillatorRef.current as any).osc2) {
          (hornOscillatorRef.current as any).osc2.stop();
        }
        hornOscillatorRef.current = null;
        hornGainRef.current = null;
      }
    };
    
    const updateSpeed = () => {
      // Acceleration
      const maxSpeed = 0.6;
      const acceleration = 0.01;
      const brakeForce = 0.01;
      const friction = 0.98;
      
      if (keys.w) {
        speedRef.current = Math.min(speedRef.current + acceleration, maxSpeed);
      } else if (keys.s) {
        speedRef.current = Math.max(speedRef.current - brakeForce, -maxSpeed * 0.5);
      } else {
        speedRef.current *= friction;
      }
      
      // Steering (only when moving)
      const steeringSpeed = 0.01;
      const steeringReturn = 0.85;
      
      if (keys.a) {
        steeringRef.current = steeringSpeed;
      } else if (keys.d) {
        steeringRef.current = -steeringSpeed;
      } else {
        steeringRef.current *= steeringReturn;
      }
      
      requestAnimationFrame(updateSpeed);
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    updateSpeed();
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);
  
  // Move car and rotate wheels
  useFrame(({ camera }) => {
    if (carRef.current) {
      // Update engine sound
      if (oscillatorRef.current && gainNodeRef.current) {
        const speedNormalized = Math.abs(speedRef.current) / 0.6;
        const smoothSpeed = Math.pow(speedNormalized, 1);
        oscillatorRef.current.frequency.value = 50 + smoothSpeed * 80;
        gainNodeRef.current.gain.value = Math.min(smoothSpeed * 0.04, 0.025);
      }
      // Steering (stronger when moving faster, reverse when going backwards)
      const speedFactor = Math.abs(speedRef.current) * 3;
      const steeringDirection = speedRef.current >= 0 ? 1 : -1;
      carRef.current.rotation.y += steeringRef.current * speedFactor * steeringDirection;
      
      // Move car in the direction it's facing
      const direction = new THREE.Vector3(0, 0, -1);
      direction.applyQuaternion(carRef.current.quaternion);
      const newPosition = carRef.current.position.clone();
      newPosition.addScaledVector(direction, speedRef.current);
      
      // Keep car within bounds (road width is 12, wall at ±12)
      if (Math.abs(newPosition.x) < 12) {
        carRef.current.position.copy(newPosition);
      } else {
        // Hit road edge, stop movement
        speedRef.current *= 0.5;
      }
      
      // Camera follows car smoothly
      camera.position.x = carRef.current.position.x;
      camera.position.y = 5;
      camera.position.z = carRef.current.position.z + 10;
      camera.lookAt(carRef.current.position);
    }
    
    // Rotate wheels based on speed
    wheelsRef.current.forEach((wheel) => {
      if (wheel) wheel.rotation.x += speedRef.current * 2;
    });
  });
  
  return (
    <group ref={carRef}>
      <primitive object={scene} scale={1} rotation={[0, Math.PI, 0]} />
      {/* Front light for night visibility */}
      <spotLight
        position={[0, 1, -4]}
        angle={0.6}
        penumbra={0.5}
        intensity={1.5}
        distance={40}
        color="#ffffee"
      />
    </group>
  );
};
