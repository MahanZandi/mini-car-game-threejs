// Performance optimization utilities

export const isMobile = () => {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
};

export const getDevicePixelRatio = () => {
  // Limit pixel ratio for better performance on high-DPI displays
  return Math.min(window.devicePixelRatio, 2);
};

export const getQualitySettings = () => {
  const mobile = isMobile();
  
  return {
    shadows: !mobile,
    antialias: !mobile,
    shadowMapSize: mobile ? 512 : 2048,
    maxLights: mobile ? 2 : 4,
    renderDistance: mobile ? 50 : 100,
  };
};
