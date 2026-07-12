import {useEffect, useState} from 'react';

/**
 * Enforced minimum time (ms) the cinematic loading screen stays up so it doesn't
 * just flash on fast connections.
 */
const LOADING_MIN_DURATION_MS = 2500;

interface AppLoadingState {
  /** True until BOTH the critical assets are ready and the minimum delay passed. */
  isLoading: boolean;
  /** Signal that the critical (first-frame) assets have finished loading. */
  onAssetsReady: () => void;
}

/**
 * Orchestrates the app's initial loading gate: the loading screen stays up until
 * the critical assets report ready AND a minimum cinematic delay has elapsed.
 * Lifting this cross-cutting timing concern out of <App> keeps the composition
 * root purely presentational. Behaviour is unchanged from the previous inline
 * implementation.
 */
export function useAppLoading(): AppLoadingState {
  const [isAssetsReady, setIsAssetsReady] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(
      () => setMinTimeElapsed(true),
      LOADING_MIN_DURATION_MS,
    );
    return () => clearTimeout(timer);
  }, []);

  // Loading if either the assets aren't ready OR the minimum time hasn't passed.
  const isLoading = !(isAssetsReady && minTimeElapsed);

  return {
    isLoading,
    onAssetsReady: () => setIsAssetsReady(true),
  };
}
