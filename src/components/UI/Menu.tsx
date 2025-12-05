import { useGameStore } from '../../store/gameStore';

export const Menu = () => {
  const { isPlaying, setIsPlaying } = useGameStore();

  if (isPlaying) return null;

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(4px)',
      pointerEvents: 'auto',
      zIndex: 10
    }}>
      <div style={{ textAlign: 'center', color: 'white' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: 'bold', marginBottom: '1rem' }}>Endless Drive</h1>
        <p style={{ fontSize: '1.25rem', opacity: 0.8, marginBottom: '2rem' }}>
          Relax and enjoy the infinite journey
        </p>
        
        <button
          onClick={() => setIsPlaying(true)}
          style={{
            padding: '1rem 3rem',
            background: 'linear-gradient(to right, #3b82f6, #9333ea)',
            borderRadius: '9999px',
            fontSize: '1.25rem',
            fontWeight: '600',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          Start Journey
        </button>

        <div style={{ marginTop: '3rem', fontSize: '0.875rem', opacity: 0.6 }}>
          <p>Desktop: Arrow Keys or WASD</p>
          <p>Mobile: Touch Controls</p>
        </div>
      </div>
    </div>
  );
};
