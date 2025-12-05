

export const MobileControls = () => {
  const handleTouch = (key: string, pressed: boolean) => {
    const event = new KeyboardEvent(pressed ? 'keydown' : 'keyup', { key });
    window.dispatchEvent(event);
  };

  const buttonStyle = {
    width: '60px',
    height: '60px',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    border: '2px solid rgba(255, 255, 255, 0.5)',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    color: 'white',
    userSelect: 'none' as const,
    touchAction: 'none',
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: 0,
      right: 0,
      display: 'flex',
      justifyContent: 'space-between',
      padding: '0 20px',
      pointerEvents: 'none',
      zIndex: 1000,
    }}>
      {/* Left side - Direction controls */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', pointerEvents: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            style={buttonStyle}
            onTouchStart={() => handleTouch('w', true)}
            onTouchEnd={() => handleTouch('w', false)}
            onMouseDown={() => handleTouch('w', true)}
            onMouseUp={() => handleTouch('w', false)}
            onMouseLeave={() => handleTouch('w', false)}
          >
            ↑
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div
            style={buttonStyle}
            onTouchStart={() => handleTouch('a', true)}
            onTouchEnd={() => handleTouch('a', false)}
            onMouseDown={() => handleTouch('a', true)}
            onMouseUp={() => handleTouch('a', false)}
            onMouseLeave={() => handleTouch('a', false)}
          >
            ←
          </div>
          <div
            style={buttonStyle}
            onTouchStart={() => handleTouch('s', true)}
            onTouchEnd={() => handleTouch('s', false)}
            onMouseDown={() => handleTouch('s', true)}
            onMouseUp={() => handleTouch('s', false)}
            onMouseLeave={() => handleTouch('s', false)}
          >
            ↓
          </div>
          <div
            style={buttonStyle}
            onTouchStart={() => handleTouch('d', true)}
            onTouchEnd={() => handleTouch('d', false)}
            onMouseDown={() => handleTouch('d', true)}
            onMouseUp={() => handleTouch('d', false)}
            onMouseLeave={() => handleTouch('d', false)}
          >
            →
          </div>
        </div>
      </div>

      {/* Right side - Horn */}
      <div style={{ display: 'flex', alignItems: 'flex-end', pointerEvents: 'auto' }}>
        <div
          style={{ ...buttonStyle, backgroundColor: 'rgba(255, 200, 0, 0.4)' }}
          onTouchStart={() => handleTouch('h', true)}
          onTouchEnd={() => handleTouch('h', false)}
          onMouseDown={() => handleTouch('h', true)}
          onMouseUp={() => handleTouch('h', false)}
          onMouseLeave={() => handleTouch('h', false)}
        >
          🔊
        </div>
      </div>
    </div>
  );
};
