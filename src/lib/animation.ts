import type {SpringOptions} from 'motion/react';

// Single source of truth for the cinematic motion language shared across the
// hero and scroll-driven sections. Previously these magic values were duplicated
// (and cast to `any`) inline in each component.

/**
 * Cinematic ease-out cubic-bezier used for entrance and stage transitions.
 * Equivalent to the previously inlined `[0.16, 1, 0.3, 1]`.
 */
export const EASE_CINEMATIC: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Spring configuration for smoothing raw scroll progress into a settled value.
 * Shared by the Services frame sequence and the Methodology stage tracker.
 */
export const SCROLL_SPRING: SpringOptions = {
  stiffness: 100,
  damping: 30,
  restDelta: 0.001,
};
