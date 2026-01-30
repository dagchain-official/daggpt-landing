import * as React from 'react';
import { cn } from '../../lib/utils';
import { motion, useScroll, useTransform } from 'framer-motion';

function HexagonBackground({
  className,
  children,
  hexagonProps = {},
  hexagonSize = 64,
  hexagonMargin = 4,
  ...props
}) {
  const hexagonWidth = hexagonSize;
  const hexagonHeight = hexagonSize * 1.15;
  const rowSpacing = hexagonSize * 0.85;
  const computedMarginTop = -hexagonSize * 0.25;
  const oddRowMarginLeft = -(hexagonSize / 2);
  const evenRowMarginLeft = 0;

  const [gridDimensions, setGridDimensions] = React.useState({
    rows: 0,
    columns: 0,
  });

  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const updateGridDimensions = React.useCallback(() => {
    if (typeof window === 'undefined') return;
    const rows = Math.ceil(window.innerHeight / rowSpacing) + 2;
    const columns = Math.ceil(window.innerWidth / hexagonWidth) + 2;
    setGridDimensions({ rows, columns });
  }, [rowSpacing, hexagonWidth]);

  React.useEffect(() => {
    updateGridDimensions();
    window.addEventListener('resize', updateGridDimensions);
    return () => window.removeEventListener('resize', updateGridDimensions);
  }, [updateGridDimensions]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'fixed inset-0 size-full overflow-hidden bg-white z-0',
        className,
      )}
      {...props}
    >
      {/* Background Gradients for depth */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-100/60 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,white_80%)]" />
      </div>

      <motion.div 
        style={{ y }}
        className="absolute top-[-50px] -left-0 size-full overflow-visible z-10 opacity-[0.9] pointer-events-auto"
      >
        {Array.from({ length: gridDimensions.rows }).map((_, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            style={{
              marginTop: computedMarginTop,
              marginLeft:
                (rowIndex % 2 === 0
                  ? evenRowMarginLeft
                  : oddRowMarginLeft),
            }}
            className="flex flex-nowrap"
          >
            {Array.from({ length: gridDimensions.columns }).map(
              (_, colIndex) => (
                <motion.div
                  key={`hexagon-${rowIndex}-${colIndex}`}
                  whileHover={{ 
                    scale: 1.1,
                    zIndex: 50,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  style={{
                    width: hexagonWidth,
                    height: hexagonHeight,
                    marginLeft: hexagonMargin,
                    ...hexagonProps?.style,
                  }}
                  className={cn(
                    'relative transition-all duration-300 group cursor-default',
                    '[clip-path:polygon(50%_0%,_100%_25%,_100%_75%,_50%_100%,_0%_75%,_0%_25%)]',
                    'bg-slate-200/40 hover:bg-purple-500/30',
                    'before:content-[""] before:absolute before:inset-[1px] before:bg-white/90 before:z-[1] before:transition-colors before:duration-300',
                    'before:[clip-path:polygon(50%_0%,_100%_25%,_100%_75%,_50%_100%,_0%_75%,_0%_25%)]',
                    'group-hover:before:bg-purple-100/70',
                    'hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]',
                    hexagonProps?.className,
                  )}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-purple-500/20 to-blue-500/10 z-[2]" />
                </motion.div>
              ),
            )}
          </div>
        ))}
      </motion.div>
      
      {/* Content overlay - ensure it's transparent to events by default */}
      <div className="relative z-20 w-full h-full pointer-events-none">
        <div className="w-full h-full">
          {children}
        </div>
      </div>
    </div>
  );
}

export { HexagonBackground };
