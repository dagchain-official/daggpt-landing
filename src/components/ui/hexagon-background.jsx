import * as React from 'react';
import { cn } from '../../lib/utils';
import { motion, useScroll, useTransform } from 'framer-motion';

function HexagonBackground({
  className,
  children,
  hexagonSize = 64,
  hexagonMargin = 4,
  ...props
}) {
  const hexagonWidth = hexagonSize;
  const hexagonHeight = hexagonSize * 1.15;
  const rowSpacing = hexagonSize * 0.85;
  const computedMarginTop = -hexagonSize * 0.25;
  const oddRowMarginLeft = -(hexagonSize / 2);

  const [gridDimensions, setGridDimensions] = React.useState({
    rows: 0,
    columns: 0,
  });

  const [mousePos, setMousePos] = React.useState({ x: -1000, y: -1000 });
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const updateGridDimensions = React.useCallback(() => {
    if (typeof window === 'undefined') return;
    const rows = Math.ceil(window.innerHeight / rowSpacing) + 5; // Extra rows for scroll
    const columns = Math.ceil(window.innerWidth / hexagonWidth) + 2;
    setGridDimensions({ rows, columns });
  }, [rowSpacing, hexagonWidth]);

  React.useEffect(() => {
    updateGridDimensions();
    window.addEventListener('resize', updateGridDimensions);
    
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', updateGridDimensions);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [updateGridDimensions]);

  return (
    <div
      className={cn(
        'relative min-h-screen w-full bg-white',
        className,
      )}
      {...props}
    >
      {/* Fixed Background Layer */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Background Gradients for depth */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-100/60 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[150px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,white_80%)]" />
        </div>

        <motion.div 
          style={{ y }}
          className="absolute top-[-100px] -left-0 size-full overflow-visible z-10 opacity-[0.9]"
        >
          {Array.from({ length: gridDimensions.rows }).map((_, rowIndex) => (
            <div
              key={`row-${rowIndex}`}
              style={{
                marginTop: computedMarginTop,
                marginLeft: (rowIndex % 2 === 0 ? 0 : oddRowMarginLeft),
              }}
              className="flex flex-nowrap"
            >
              {Array.from({ length: gridDimensions.columns }).map(
                (_, colIndex) => {
                  return (
                    <HexagonItem
                      key={`hexagon-${rowIndex}-${colIndex}`}
                      rowIndex={rowIndex}
                      colIndex={colIndex}
                      mousePos={mousePos}
                      width={hexagonWidth}
                      height={hexagonHeight}
                      margin={hexagonMargin}
                      rowSpacing={rowSpacing}
                      oddRowMarginLeft={oddRowMarginLeft}
                    />
                  );
                },
              )}
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Scrollable Content Layer */}
      <div className="relative z-20 w-full pointer-events-none">
        <div className="w-full pointer-events-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

function HexagonItem({ rowIndex, colIndex, mousePos, width, height, margin, rowSpacing, oddRowMarginLeft }) {
  const ref = React.useRef(null);
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from mouse to hexagon center
    const dist = Math.hypot(mousePos.x - centerX, mousePos.y - centerY);
    
    // If mouse is within the hexagon area (roughly width/2)
    setIsHovered(dist < width * 0.6);
  }, [mousePos, width]);

  return (
    <motion.div
      ref={ref}
      animate={{ 
        scale: isHovered ? 1.1 : 1,
        zIndex: isHovered ? 50 : 1
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        width: width,
        height: height,
        marginLeft: margin,
      }}
      className={cn(
        'relative transition-colors duration-300 cursor-default',
        '[clip-path:polygon(50%_0%,_100%_25%,_100%_75%,_50%_100%,_0%_75%,_0%_25%)]',
        isHovered ? 'bg-purple-500/30' : 'bg-slate-200/40',
        'before:content-[""] before:absolute before:inset-[1px] before:bg-white/90 before:z-[1] before:transition-colors before:duration-300',
        'before:[clip-path:polygon(50%_0%,_100%_25%,_100%_75%,_50%_100%,_0%_75%,_0%_25%)]',
        isHovered && 'before:bg-purple-100/70 shadow-[0_0_30px_rgba(168,85,247,0.25)]'
      )}
    >
      <div className={cn(
        "absolute inset-0 transition-opacity duration-300 bg-gradient-to-br from-purple-500/20 to-blue-500/10 z-[2]",
        isHovered ? "opacity-100" : "opacity-0"
      )} />
    </motion.div>
  );
}

export { HexagonBackground };
