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

// Cinematic loading-screen fade sequence. The logo fades first
// (LOADING_LOGO_FADE_SEC); LOADING_LOGO_FADE_MS mirrors that same duration as the
// millisecond delay the orchestration timer waits before triggering the
// background fade, keeping the two ends of the sequence in lockstep. Previously
// these durations were duplicated as bare literals inside LoadingScreen.
export const LOADING_LOGO_ENTER_SEC = 0.8;
export const LOADING_LOGO_FADE_SEC = 0.6;
/** Delay (ms) after the logo fade before the background fade begins. */
export const LOADING_LOGO_FADE_MS = 600;
export const LOADING_BG_FADE_SEC = 1.0;
export const LOADING_BREATHE_SEC = 2.5;
/** Opacity keyframes for the logo's looping "breathing" pulse. */
export const LOADING_BREATHE_OPACITY: number[] = [0.3, 1, 0.3];
