import {type RefObject} from 'react';
import {useScroll, useSpring} from 'motion/react';
import {SCROLL_SPRING} from '../lib/animation';

/**
 * Tracks a section's scroll progress (start-start → end-end) and returns it
 * smoothed through the shared {@link SCROLL_SPRING}.
 *
 * Extracts the identical `useScroll` + `useSpring` pairing that the Services and
 * Methodology sections previously wired up by hand, keeping the spring config in
 * one place.
 */
export function useSmoothScrollProgress<T extends HTMLElement>(
  target: RefObject<T | null>,
) {
  const {scrollYProgress} = useScroll({
    target,
    offset: ['start start', 'end end'],
  });
  return useSpring(scrollYProgress, SCROLL_SPRING);
}
