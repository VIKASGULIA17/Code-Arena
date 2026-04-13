import React, { useRef, useState, useEffect, useCallback } from 'react';

export const ResizablePanels = ({ children, direction = 'horizontal', initialSize = 50 }) => {
  const [size, setSize] = useState(initialSize);
  const containerRef = useRef(null);
  const isDraggingRef = useRef(false);

  const handleMouseMove = useCallback((e) => {
    if (!isDraggingRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();

    if (direction === 'horizontal') {
      const newSize = ((e.clientX - rect.left) / rect.width) * 100;
      if (newSize > 30 && newSize < 70) {
        setSize(newSize);
      }
    } else {
      const newSize = ((e.clientY - rect.top) / rect.height) * 100;
      if (newSize > 30 && newSize < 70) {
        setSize(newSize);
      }
    }
  }, [direction]);

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
    document.body.style.cursor = 'default';
  }, []);

  const handleMouseDown = useCallback((e) => {
    isDraggingRef.current = true;
    document.body.style.cursor = direction === 'horizontal' ? 'col-resize' : 'row-resize';
    e.preventDefault();
  }, [direction]);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const isHorizontal = direction === 'horizontal';

  return (
    <div
      ref={containerRef}
      className={`flex ${isHorizontal ? 'flex-row' : 'flex-col'} h-full w-full`}
      style={{ userSelect: isDraggingRef.current ? 'none' : 'auto' }}
    >
      {/* First Panel */}
      <div
        style={{
          [isHorizontal ? 'width' : 'height']: `${size}%`,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children[0]}
      </div>

      {/* Divider */}
      <div
        onMouseDown={handleMouseDown}
        className={`${
          isHorizontal ? 'w-1 cursor-col-resize hover:bg-indigo-500' : 'h-1 cursor-row-resize hover:bg-indigo-500'
        } bg-slate-200 transition-colors duration-200 hover:bg-indigo-400 active:bg-indigo-600`}
        style={{ userSelect: 'none', flexShrink: 0 }}
      />

      {/* Second Panel */}
      <div
        style={{
          [isHorizontal ? 'width' : 'height']: `${100 - size}%`,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children[1]}
      </div>
    </div>
  );
};

export default ResizablePanels;
