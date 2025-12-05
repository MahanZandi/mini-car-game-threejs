export const GAME_CONFIG = {
  INITIAL_SPEED: 20,
  MAX_SPEED: 50,
  ACCELERATION: 0.5,
  LANE_WIDTH: 3,
  ROAD_WIDTH: 12,
  BIOME_CHANGE_INTERVAL: 30000, // 30 seconds
};

export const BIOME_COLORS = {
  desert: {
    sky: '#FFB347',
    ground: '#D2691E',
    ambient: '#FFA500',
  },
  forest: {
    sky: '#87CEEB',
    ground: '#228B22',
    ambient: '#90EE90',
  },
  snow: {
    sky: '#B0E0E6',
    ground: '#FFFFFF',
    ambient: '#E0FFFF',
  },
  night: {
    sky: '#191970',
    ground: '#2F4F4F',
    ambient: '#4B0082',
  },
};
