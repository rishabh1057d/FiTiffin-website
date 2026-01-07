'use client';

import * as React from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  type SpringOptions,
} from 'motion/react';

import { cn } from '@/lib/utils';

type BubbleColors = {
  first: string;
  second: string;
  third: string;
  fourth: string;
  fifth: string;
  sixth: string;
};

type BubbleBackgroundProps = React.ComponentProps<'div'> & {
  interactive?: boolean;
  transition?: SpringOptions;
  colors?: BubbleColors;
};

function BubbleBackground({
  className,
  children,
  interactive = false,
  transition = { stiffness: 100, damping: 20 },
  colors = {
    // FiTiffin color palette - greens and oranges
    first: '45, 134, 89',      // Primary green (#2d8659)
    second: '26, 82, 54',       // Darker green (#1a5236)
    third: '184, 224, 85',      // Light green/lime (#bce055)
    fourth: '255, 107, 53',     // Orange accent (#ff6b35)
    fifth: '255, 165, 0',       // Orange (#ffa500)
    sixth: '168, 217, 101',     // Lime green accent (#a8d965)
  },
  ...props
}: BubbleBackgroundProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, transition);
  const springY = useSpring(mouseY, transition);

  const rectRef = React.useRef<DOMRect | null>(null);
  const rafIdRef = React.useRef<number | null>(null);

  React.useLayoutEffect(() => {
    const updateRect = () => {
      if (containerRef.current) {
        rectRef.current = containerRef.current.getBoundingClientRect();
      }
    };

    updateRect();

    const el = containerRef.current;
    const ro = new ResizeObserver(updateRect);
    if (el) ro.observe(el);

    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect, { passive: true });

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect);
    };
  }, []);

  React.useEffect(() => {
    if (!interactive) return;

    const el = containerRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = rectRef.current;
      if (!rect) return;
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      if (rafIdRef.current != null) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => {
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
      });
    };

    el.addEventListener('mousemove', handleMouseMove as EventListener, {
      passive: true,
    });
    return () => {
      el.removeEventListener('mousemove', handleMouseMove as EventListener);
      if (rafIdRef.current != null) cancelAnimationFrame(rafIdRef.current);
    };
  }, [interactive, mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      data-slot="bubble-background"
      className={cn(
        'relative size-full overflow-hidden',
        className,
      )}
      style={{
        ...props.style,
      }}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0 w-0 h-0"
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="16"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Static gradient so the hero has an immediate, visible backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(60% 40% at 50% 8%, rgba(${colors.first},0.28) 0%, rgba(${colors.first},0) 60%),
                      radial-gradient(50% 35% at 20% 18%, rgba(${colors.fourth},0.14) 0%, rgba(${colors.fourth},0) 60%)`,
        }}
      />

      <div
        className="absolute inset-0"
        style={{ filter: 'url(#goo) blur(24px)' }}
      >
        <motion.div
          className="absolute rounded-full size-[80%] top-[10%] left-[10%]"
          animate={{ y: [-50, 50, -50] }}
          transition={{ duration: 12, ease: 'easeInOut', repeat: Infinity }}
          style={{ 
            transform: 'translateZ(0)', 
            willChange: 'transform',
            background: `radial-gradient(circle at center, rgba(${colors.first}, 0.6) 0%, rgba(${colors.first}, 0) 50%)`
          }}
        />

        <motion.div
          className="absolute inset-0 flex justify-center items-center origin-[calc(50%-400px)]"
          animate={{ rotate: 360 }}
          transition={{
            duration: 16,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'loop',
          }}
          style={{ transform: 'translateZ(0)', willChange: 'transform' }}
        >
          <div 
            className="rounded-full size-[80%] top-[10%] left-[10%]"
            style={{
              background: `radial-gradient(circle at center, rgba(${colors.second}, 0.5) 0%, rgba(${colors.second}, 0) 50%)`
            }}
          />
        </motion.div>

        <motion.div
          className="absolute inset-0 flex justify-center items-center origin-[calc(50%+400px)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
          style={{ transform: 'translateZ(0)', willChange: 'transform' }}
        >
          <div 
            className="absolute rounded-full size-[80%] top-[calc(50%+200px)] left-[calc(50%-500px)]"
            style={{
              background: `radial-gradient(circle at center, rgba(${colors.third}, 0.5) 0%, rgba(${colors.third}, 0) 50%)`
            }}
          />
        </motion.div>

        <motion.div
          className="absolute rounded-full size-[80%] top-[10%] left-[10%] opacity-70"
          animate={{ x: [-50, 50, -50] }}
          transition={{ duration: 18, ease: 'easeInOut', repeat: Infinity }}
          style={{ 
            transform: 'translateZ(0)', 
            willChange: 'transform',
            background: `radial-gradient(circle at center, rgba(${colors.fourth}, 0.5) 0%, rgba(${colors.fourth}, 0) 50%)`
          }}
        />

        <motion.div
          className="absolute inset-0 flex justify-center items-center origin-[calc(50%_-_800px)_calc(50%_+_200px)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 16, ease: 'linear', repeat: Infinity }}
          style={{ transform: 'translateZ(0)', willChange: 'transform' }}
        >
          <div 
            className="absolute rounded-full size-[160%] top-[calc(50%-80%)] left-[calc(50%-80%)]"
            style={{
              background: `radial-gradient(circle at center, rgba(${colors.fifth}, 0.4) 0%, rgba(${colors.fifth}, 0) 50%)`
            }}
          />
        </motion.div>

        {interactive && (
          <motion.div
            className="absolute rounded-full size-full opacity-70"
            style={{
              x: springX,
              y: springY,
              transform: 'translateZ(0)',
              willChange: 'transform',
              background: `radial-gradient(circle at center, rgba(${colors.sixth}, 0.5) 0%, rgba(${colors.sixth}, 0) 50%)`
            }}
          />
        )}
      </div>

      {children}
    </div>
  );
}

export { BubbleBackground, type BubbleBackgroundProps };

