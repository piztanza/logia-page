import {useEffect, useRef, useState} from 'react';
import {
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from 'motion/react';
import {SCROLL_SPRING} from '../lib/animation';

interface UseScrollFrameSequenceOptions {
  /** Called once the critical first frame has loaded and the canvas is primed. */
  onReady?: () => void;
  /** Total number of frames in the sequence. */
  frameCount?: number;
}

/**
 * Drives the Services scroll-scrubbed image sequence: preloads the WebP frames,
 * paints the active frame to a canvas with an interruptible RAF tween, and
 * derives the two-slide text state + progress-bar width from scroll position.
 *
 * This is the heavy scroll-frame engine lifted out of the Services section so
 * the component itself stays presentational. Behaviour is unchanged from the
 * previous inline implementation.
 */
export function useScrollFrameSequence({
  onReady,
  frameCount = 86,
}: UseScrollFrameSequenceOptions = {}) {
  const [activeSlide, setActiveSlide] = useState(0);
  const activeSlideRef = useRef(0); // Synchronous tracking of active text slide
  const targetSlideRef = useRef(0); // Tracks the intended destination based on scroll
  const animationRafId = useRef<number | null>(null); // To cancel ongoing animations

  const [isReady, setIsReady] = useState(false);
  // Ref mirrors isReady so the useMotionValueEvent callback always sees the current value
  // without depending on React's render cycle (avoids stale closure on slow devices).
  const isReadyRef = useRef(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const images = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(1);

  const {scrollYProgress} = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Spring must operate on a numeric MotionValue; applying it directly to the string
  // transform output causes silent spring interpolation failure (NaN).
  const progressSpring = useSpring(scrollYProgress, SCROLL_SPRING);
  const progressBarWidth = useTransform(progressSpring, [0, 1], ['0%', '100%']);

  // Preload images
  useEffect(() => {
    const framePaths = Array.from(
      {length: frameCount},
      (_, i) => `/frames/${String(i + 1).padStart(5, '0')}.webp`,
    );

    const preloadImages = async () => {
      // Helper to load a single image
      const loadImage = (path: string, index: number) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.src = path;
          img.onload = () => {
            images.current[index] = img;
            resolve();
          };
          img.onerror = () => resolve(); // Always resolve to prevent hanging
        });
      };

      // 1. CRITICAL PATH: Load ONLY the first frame to unblock the UI immediately
      await loadImage(framePaths[0], 1);

      isReadyRef.current = true;
      setIsReady(true);
      if (onReady) onReady();

      const canvas = canvasRef.current;
      if (canvas) {
        const context = canvas.getContext('2d', {alpha: false});
        contextRef.current = context;
        const firstImg = images.current[1];
        if (context && firstImg) {
          drawFrame(context, canvas, firstImg);
        }
      }

      // 2. BACKGROUND TASK: Lazily load the remaining 85 frames sequentially
      // We load them sequentially (or in small batches) so we don't clog the network
      // and ensure earlier frames (which the user scrolls to first) are prioritized.
      const loadRestOfFrames = async () => {
        // Load in batches of 3 to balance speed and network congestion
        const batchSize = 3;
        for (let i = 1; i < frameCount; i += batchSize) {
          const batchPromises = [];
          for (let j = 0; j < batchSize && i + j < frameCount; j++) {
            const frameIndex = i + j;
            // images array is 1-indexed based on your existing logic (index + 1)
            batchPromises.push(loadImage(framePaths[frameIndex], frameIndex + 1));
          }
          await Promise.all(batchPromises);
        }
      };

      // Execute background loading without awaiting it here
      loadRestOfFrames();
    };

    preloadImages();

    // Cleanup on unmount: cancel any running RAF and release all Image objects so
    // the browser can GC the ~17MB of decoded frame data.
    return () => {
      if (animationRafId.current !== null)
        cancelAnimationFrame(animationRafId.current);
      images.current.forEach((img) => {
        img.src = '';
      });
      images.current = [];
    };
  }, []);

  const drawFrame = (
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    img: HTMLImageElement,
  ) => {
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.width;
    const imgHeight = img.height;

    context.clearRect(0, 0, canvasWidth, canvasHeight);

    const canvasAspect = canvasWidth / canvasHeight;
    const imgAspect = imgWidth / imgHeight;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasAspect > imgAspect) {
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imgAspect;
      offsetX = 0;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      drawWidth = canvasHeight * imgAspect;
      drawHeight = canvasHeight;
      offsetX = (canvasWidth - drawWidth) / 2;
      offsetY = 0;
    }

    context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  const animateToFrame = (targetFrame: number) => {
    // 1. Cancel any currently running animation immediately (Interruptible)
    if (animationRafId.current !== null) {
      cancelAnimationFrame(animationRafId.current);
    }

    const startFrame = currentFrameRef.current;
    if (startFrame === targetFrame) return;

    // 2. Dynamic Duration: If we reverse mid-way, it shouldn't take the full 1.8s
    const framesToTravel = Math.abs(targetFrame - startFrame);
    const maxDuration = 1600; // Slightly faster base speed
    const duration = Math.max(
      (framesToTravel / (frameCount - 1)) * maxDuration,
      300,
    ); // Minimum 300ms so it doesn't snap instantly

    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth Easing function (easeInOutQuad)
      // This curve provides the dramatic start/mid you like, but with a much smoother
      // and less drastic deceleration at the tail end to prevent frame stuttering.
      const ease =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      const nextFrame = Math.round(startFrame + (targetFrame - startFrame) * ease);

      // Update canvas if frame changed
      if (nextFrame !== currentFrameRef.current) {
        const canvas = canvasRef.current;
        const context = contextRef.current;
        if (canvas && context) {
          const img = images.current[nextFrame];
          if (img && img.complete && img.naturalWidth > 0) {
            drawFrame(context, canvas, img);
            currentFrameRef.current = nextFrame;
          }
        }

        // Text Sync: Swap at visual midpoint of the animation so text and canvas stay in sync
        const swapFrameTrigger = Math.round(frameCount * 0.5);
        const currentTargetSlide =
          currentFrameRef.current >= swapFrameTrigger ? 1 : 0;
        if (currentTargetSlide !== activeSlideRef.current) {
          activeSlideRef.current = currentTargetSlide;
          setActiveSlide(currentTargetSlide); // Trigger React re-render for text
        }
      }

      if (progress < 1) {
        animationRafId.current = requestAnimationFrame(animate);
      } else {
        animationRafId.current = null;
        // Failsafe ensure final state is perfect
        const finalSlide = targetFrame === frameCount ? 1 : 0;
        if (activeSlideRef.current !== finalSlide) {
          activeSlideRef.current = finalSlide;
          setActiveSlide(finalSlide);
        }
      }
    };

    animationRafId.current = requestAnimationFrame(animate);
  };

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (!isReadyRef.current) return;

    // 4. Target-State Hysteresis Logic
    // We check absolute scroll boundaries instead of scroll direction.
    // This makes fast-scrolling immune to desyncing.
    let newTargetSlide = targetSlideRef.current;

    if (latest > 0.42) {
      newTargetSlide = 1; // Crossed ~42% scrolling down, target AI
    } else if (latest < 0.3) {
      newTargetSlide = 0; // Crossed ~30% scrolling up, target Enterprise
    }

    // If target changed due to fast scroll, immediately interrupt and reverse!
    if (newTargetSlide !== targetSlideRef.current) {
      targetSlideRef.current = newTargetSlide;
      animateToFrame(newTargetSlide === 1 ? frameCount : 1);
    }
  });

  return {containerRef, canvasRef, activeSlide, progressBarWidth};
}
