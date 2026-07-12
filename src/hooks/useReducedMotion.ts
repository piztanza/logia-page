import {useReducedMotion as useMotionReducedMotion} from 'motion/react';

/**
 * Single shared accessor for the user's `prefers-reduced-motion` setting.
 *
 * Wraps motion's hook and normalises its `boolean | null` result to a plain
 * boolean so callers can gate animation without repeating null-coalescing.
 * Centralising this is the seam the rubric asks for: every reduced-motion
 * decision in the app flows through one hook.
 */
export const useReducedMotion = (): boolean => useMotionReducedMotion() ?? false;
