import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { getThumbnailUrl, getHdImageUrl } from '../lib/imageOptimizer';

interface HDLightboxImageProps {
  imageUrl: string;
  title: string;
  onSwipeNext?: () => void;
  onSwipePrev?: () => void;
}

export const HDLightboxImage: React.FC<HDLightboxImageProps> = ({
  imageUrl,
  title,
  onSwipeNext,
  onSwipePrev,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Zoom & Pan state
  const [scale, setScale] = useState<number>(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState<boolean>(false);

  // Image load state
  const [hdLoaded, setHdLoaded] = useState(false);
  const [loadingError, setLoadingError] = useState(false);

  const thumbUrl = getThumbnailUrl(imageUrl, 600);
  const hdUrl = getHdImageUrl(imageUrl);

  // Reset zoom & pan when image changes
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setHdLoaded(false);
    setLoadingError(false);

    // Preload high-definition sharp image
    const img = new Image();
    img.src = hdUrl || imageUrl;
    img.referrerPolicy = 'no-referrer';
    img.onload = () => setHdLoaded(true);
    img.onerror = () => {
      setLoadingError(true);
      setHdLoaded(true);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageUrl, hdUrl]);

  // Gesture tracking refs
  const touchState = useRef<{
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
    initialDistance: number;
    initialScale: number;
    initialPos: { x: number; y: number };
    isPinching: boolean;
    isPanning: boolean;
    isSwiping: boolean;
    lastTapTime: number;
  }>({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    initialDistance: 0,
    initialScale: 1,
    initialPos: { x: 0, y: 0 },
    isPinching: false,
    isPanning: false,
    isSwiping: false,
    lastTapTime: 0,
  });

  // Calculate pan constraints
  const getPanLimits = useCallback((currentScale: number) => {
    if (!containerRef.current || currentScale <= 1) {
      return { minX: 0, maxX: 0, minY: 0, maxY: 0 };
    }
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const maxPanX = Math.max(0, (width * (currentScale - 1)) / 2);
    const maxPanY = Math.max(0, (height * (currentScale - 1)) / 2);

    return {
      minX: -maxPanX,
      maxX: maxPanX,
      minY: -maxPanY,
      maxY: maxPanY,
    };
  }, []);

  const clampPosition = useCallback(
    (x: number, y: number, currentScale: number) => {
      const limits = getPanLimits(currentScale);
      return {
        x: Math.min(Math.max(x, limits.minX), limits.maxX),
        y: Math.min(Math.max(y, limits.minY), limits.maxY),
      };
    },
    [getPanLimits]
  );

  // Zoom Helpers
  const zoomIn = () => {
    setScale((prev) => {
      const next = Math.min(prev + 0.6, 3.5);
      setPosition((pos) => clampPosition(pos.x, pos.y, next));
      return next;
    });
  };

  const zoomOut = () => {
    setScale((prev) => {
      const next = Math.max(prev - 0.6, 1);
      if (next === 1) {
        setPosition({ x: 0, y: 0 });
      } else {
        setPosition((pos) => clampPosition(pos.x, pos.y, next));
      }
      return next;
    });
  };

  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const toggleZoomAtPoint = (clientX?: number, clientY?: number) => {
    if (scale > 1.1) {
      resetZoom();
    } else {
      const targetScale = 2.4;
      if (containerRef.current && clientX !== undefined && clientY !== undefined) {
        const rect = containerRef.current.getBoundingClientRect();
        const offsetX = clientX - (rect.left + rect.width / 2);
        const offsetY = clientY - (rect.top + rect.height / 2);
        const newX = -offsetX * (targetScale - 1);
        const newY = -offsetY * (targetScale - 1);
        setScale(targetScale);
        setPosition(clampPosition(newX, newY, targetScale));
      } else {
        setScale(targetScale);
        setPosition({ x: 0, y: 0 });
      }
    }
  };

  // Touch Handlers for Pinch-to-Zoom, Pan & Swipe
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touches = e.touches;
    const now = Date.now();

    if (touches.length === 2) {
      // Two fingers: Start Pinch to Zoom
      const dist = Math.hypot(
        touches[0].clientX - touches[1].clientX,
        touches[0].clientY - touches[1].clientY
      );
      touchState.current.initialDistance = dist;
      touchState.current.initialScale = scale;
      touchState.current.initialPos = { ...position };
      touchState.current.isPinching = true;
      touchState.current.isPanning = false;
      touchState.current.isSwiping = false;
      setIsInteracting(true);
    } else if (touches.length === 1) {
      // Double tap check
      if (now - touchState.current.lastTapTime < 300) {
        e.preventDefault();
        toggleZoomAtPoint(touches[0].clientX, touches[0].clientY);
        touchState.current.lastTapTime = 0;
        return;
      }
      touchState.current.lastTapTime = now;

      // 1 Finger: Start Pan or Swipe
      touchState.current.startX = touches[0].clientX;
      touchState.current.startY = touches[0].clientY;
      touchState.current.lastX = touches[0].clientX;
      touchState.current.lastY = touches[0].clientY;
      touchState.current.initialPos = { ...position };
      touchState.current.isPinching = false;

      if (scale > 1) {
        touchState.current.isPanning = true;
        touchState.current.isSwiping = false;
      } else {
        touchState.current.isPanning = false;
        touchState.current.isSwiping = true;
      }
      setIsInteracting(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touches = e.touches;

    if (touches.length === 2 && touchState.current.isPinching) {
      // Pinching
      const dist = Math.hypot(
        touches[0].clientX - touches[1].clientX,
        touches[0].clientY - touches[1].clientY
      );
      if (touchState.current.initialDistance > 0) {
        const factor = dist / touchState.current.initialDistance;
        const newScale = Math.min(Math.max(touchState.current.initialScale * factor, 0.9), 4);
        setScale(newScale);
      }
    } else if (touches.length === 1 && touchState.current.isPanning && scale > 1) {
      // Panning when zoomed in
      const deltaX = touches[0].clientX - touchState.current.startX;
      const deltaY = touches[0].clientY - touchState.current.startY;
      const newPos = clampPosition(
        touchState.current.initialPos.x + deltaX,
        touchState.current.initialPos.y + deltaY,
        scale
      );
      setPosition(newPos);
    } else if (touches.length === 1 && touchState.current.isSwiping && scale <= 1) {
      touchState.current.lastX = touches[0].clientX;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsInteracting(false);

    if (touchState.current.isPinching) {
      touchState.current.isPinching = false;
      if (scale < 1.05) {
        resetZoom();
      } else {
        setScale((s) => {
          const clampedScale = Math.min(Math.max(s, 1), 3.5);
          setPosition((pos) => clampPosition(pos.x, pos.y, clampedScale));
          return clampedScale;
        });
      }
    } else if (touchState.current.isSwiping && scale <= 1) {
      const deltaX = touchState.current.lastX - touchState.current.startX;
      if (deltaX < -50 && onSwipeNext) {
        onSwipeNext();
      } else if (deltaX > 50 && onSwipePrev) {
        onSwipePrev();
      }
      touchState.current.isSwiping = false;
    } else if (touchState.current.isPanning) {
      touchState.current.isPanning = false;
      setPosition((pos) => clampPosition(pos.x, pos.y, scale));
    }
  };

  // Desktop Mouse Drag to Pan
  const isMouseDown = useRef(false);
  const mouseStart = useRef({ x: 0, y: 0, posX: 0, posY: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (scale <= 1 || e.button !== 0) return;
    e.preventDefault();
    isMouseDown.current = true;
    mouseStart.current = {
      x: e.clientX,
      y: e.clientY,
      posX: position.x,
      posY: position.y,
    };
    setIsInteracting(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseDown.current || scale <= 1) return;
    const deltaX = e.clientX - mouseStart.current.x;
    const deltaY = e.clientY - mouseStart.current.y;
    const newPos = clampPosition(
      mouseStart.current.posX + deltaX,
      mouseStart.current.posY + deltaY,
      scale
    );
    setPosition(newPos);
  };

  const handleMouseUp = () => {
    if (isMouseDown.current) {
      isMouseDown.current = false;
      setIsInteracting(false);
    }
  };

  // Mouse Wheel Zoom
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const zoomDelta = e.deltaY < 0 ? 0.3 : -0.3;
    setScale((prev) => {
      const next = Math.min(Math.max(prev + zoomDelta, 1), 3.5);
      if (next === 1) {
        setPosition({ x: 0, y: 0 });
      } else {
        setPosition((pos) => clampPosition(pos.x, pos.y, next));
      }
      return next;
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center overflow-hidden touch-none select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
      onDoubleClick={(e) => toggleZoomAtPoint(e.clientX, e.clientY)}
    >
      {/* Low-res background preview while loading */}
      {!hdLoaded && (
        <img
          src={thumbUrl || imageUrl}
          alt={title}
          className="absolute inset-0 m-auto max-w-full max-h-full object-contain filter blur-sm scale-[0.99] opacity-75 pointer-events-none"
          referrerPolicy="no-referrer"
        />
      )}

      {/* Main Image with Fast 60fps Hardware Accelerated Matrix */}
      <img
        ref={imgRef}
        src={hdLoaded && !loadingError ? hdUrl : thumbUrl || imageUrl}
        alt={title}
        draggable={false}
        referrerPolicy="no-referrer"
        className={`max-w-full max-h-full object-contain select-none drop-shadow-2xl rounded-md pointer-events-auto transform-gpu ${
          scale > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'
        } ${hdLoaded ? 'opacity-100' : 'opacity-90'}`}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${scale})`,
          transition: isInteracting
            ? 'none'
            : 'transform 0.22s cubic-bezier(0.25, 1, 0.5, 1)',
          willChange: 'transform',
        }}
      />

      {/* Bottom Floating Sleek Quick-Zoom Bar */}
      <div 
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-[100002] flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-xl border border-white/15 shadow-2xl text-white pointer-events-auto select-none"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
        {/* Zoom Out Button */}
        <button
          onClick={zoomOut}
          disabled={scale <= 1}
          className="p-1.5 sm:p-2 rounded-full hover:bg-white/20 active:scale-90 disabled:opacity-40 disabled:hover:bg-transparent transition-all"
          title="Zoom Out"
          aria-label="Zoom Out"
        >
          <ZoomOut className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
        </button>

        {/* Zoom Scale Percentage / Reset Button */}
        <button
          onClick={resetZoom}
          className="px-2 sm:px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-[11px] sm:text-xs font-bold text-amber-300 transition-all flex items-center gap-1 min-w-[58px] justify-center active:scale-95"
          title="Click to Reset 100%"
        >
          {scale > 1.05 && <RotateCcw className="w-3 h-3 text-amber-400" />}
          <span>{Math.round(scale * 100)}%</span>
        </button>

        {/* Zoom In Button */}
        <button
          onClick={zoomIn}
          disabled={scale >= 3.5}
          className="p-1.5 sm:p-2 rounded-full hover:bg-white/20 active:scale-90 disabled:opacity-40 disabled:hover:bg-transparent transition-all"
          title="Zoom In"
          aria-label="Zoom In"
        >
          <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
        </button>
      </div>
    </div>
  );
};
