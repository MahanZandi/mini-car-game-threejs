import { useGameStore } from '../../store/gameStore';

export const HUD = () => {
  const { score, speed, currentBiome } = useGameStore();

  const boxStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(4px)',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    color: 'white'
  };

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      padding: '1.5rem',
      pointerEvents: 'none',
      zIndex: 5
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        {/* Score */}
        <div style={boxStyle}>
          <p style={{ fontSize: '0.875rem', opacity: 0.7 }}>Score</p>
          <p style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>{Math.floor(score)}</p>
        </div>

        {/* Speed */}
        <div style={boxStyle}>
          <p style={{ fontSize: '0.875rem', opacity: 0.7 }}>Speed</p>
          <p style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>{Math.floor(speed)} km/h</p>
        </div>

        {/* Biome */}
        <div style={boxStyle}>
          <p style={{ fontSize: '0.875rem', opacity: 0.7 }}>Biome</p>
          <p style={{ fontSize: '1.25rem', fontWeight: 'bold', textTransform: 'capitalize' }}>{currentBiome}</p>
        </div>
      </div>
    </div>
  );
};
