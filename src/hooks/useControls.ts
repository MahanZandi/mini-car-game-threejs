import { useEffect, useState } from 'react';
import { PlayerControls } from '../types/game';

export const useControls = () => {
  const [controls, setControls] = useState<PlayerControls>({
    left: false,
    right: false,
    accelerate: false,
    brake: false,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case 'arrowleft':
        case 'a':
          setControls((prev) => ({ ...prev, left: true }));
          break;
        case 'arrowright':
        case 'd':
          setControls((prev) => ({ ...prev, right: true }));
          break;
        case 'arrowup':
        case 'w':
          setControls((prev) => ({ ...prev, accelerate: true }));
          break;
        case 'arrowdown':
        case 's':
          setControls((prev) => ({ ...prev, brake: true }));
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case 'arrowleft':
        case 'a':
          setControls((prev) => ({ ...prev, left: false }));
          break;
        case 'arrowright':
        case 'd':
          setControls((prev) => ({ ...prev, right: false }));
          break;
        case 'arrowup':
        case 'w':
          setControls((prev) => ({ ...prev, accelerate: false }));
          break;
        case 'arrowdown':
        case 's':
          setControls((prev) => ({ ...prev, brake: false }));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return controls;
};
