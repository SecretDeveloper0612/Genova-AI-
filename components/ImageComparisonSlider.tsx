
import React, { useState, useRef, useCallback, MouseEvent, TouchEvent } from 'react';

interface ImageComparisonSliderProps {
  before: string;
  after: string;
}

const ImageComparisonSlider: React.FC<ImageComparisonSliderProps> = ({ before, after }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let newPosition = ((clientX - rect.left) / rect.width) * 100;
    newPosition = Math.max(0, Math.min(100, newPosition));
    setSliderPosition(newPosition);
  }, []);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    isDragging.current = true;
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    isDragging.current = true;
  };

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);
  
  const handleTouchEnd = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleMouseMove = useCallback((e: globalThis.MouseEvent) => {
    handleMove(e.clientX);
  }, [handleMove]);

  const handleTouchMove = useCallback((e: globalThis.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  }, [handleMove]);

  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  return (
    <div ref={containerRef} className="relative w-full aspect-square overflow-hidden rounded-2xl select-none group">
      <img src={after} alt="After" className="absolute inset-0 w-full h-full object-cover" />
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden" 
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img src={before} alt="Before" className="absolute inset-0 w-full h-full object-cover" />
      </div>
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white/50 cursor-ew-resize"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div 
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ImageComparisonSlider;
