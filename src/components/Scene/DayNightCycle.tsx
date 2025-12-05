import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export const DayNightCycle = () => {
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    // 360 seconds (6 minutes) = 1 full day cycle
    timeRef.current += delta / 360;
    if (timeRef.current > 1) timeRef.current = 0;

    const time = timeRef.current;
    
    // Calculate sun position (0 = midnight, 0.5 = noon)
    const sunAngle = time * Math.PI * 2;
    const sunHeight = Math.sin(sunAngle);
    
    // Sky color transition
    let skyColor: THREE.Color;
    if (sunHeight > 0.2) {
      // Day
      skyColor = new THREE.Color('#87CEEB');
    } else if (sunHeight > -0.2) {
      // Sunrise/Sunset
      const t = (sunHeight + 0.2) / 0.4;
      skyColor = new THREE.Color().lerpColors(
        new THREE.Color('#1a1a2e'),
        new THREE.Color('#FF6B35'),
        t
      );
    } else {
      // Night
      skyColor = new THREE.Color('#1a1a2e');
    }
    
    state.scene.background = skyColor;
    
    // Adjust lighting
    const directionalLight = state.scene.children.find(
      (child) => child instanceof THREE.DirectionalLight
    ) as THREE.DirectionalLight;
    
    if (directionalLight) {
      directionalLight.intensity = Math.max(0.8, sunHeight + 1.2);
      directionalLight.position.set(
        Math.cos(sunAngle) * 100,
        Math.sin(sunAngle) * 100,
        50
      );
    }
    
    // Adjust ambient light
    const ambientLight = state.scene.children.find(
      (child) => child instanceof THREE.AmbientLight
    ) as THREE.AmbientLight;
    
    if (ambientLight) {
      ambientLight.intensity = Math.max(0.6, sunHeight * 0.5 + 0.8);
    }
  });

  return null;
};
