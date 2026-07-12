import '@testing-library/jest-dom/vitest';
import {cleanup} from '@testing-library/react';
import {afterEach, vi} from 'vitest';

// React Testing Library unmounts between tests to keep the DOM isolated.
afterEach(() => {
  cleanup();
  document.body.style.overflow = '';
});

// ── jsdom polyfills ──────────────────────────────────────────────────────────
// The section components lean on browser APIs jsdom does not implement. These
// stubs let the components mount without throwing so characterization tests can
// assert their rendered output. Behaviour under test is DOM structure/content,
// not the (RAF-driven) animation itself.

// matchMedia — read by motion's useReducedMotion. Default: motion NOT reduced.
// Individual tests override window.matchMedia to exercise the reduced-motion path.
if (!window.matchMedia) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

// IntersectionObserver — used by motion's useInView (Methodology particles).
class IntersectionObserverStub {
  readonly root = null;
  readonly rootMargin = '';
  readonly thresholds: ReadonlyArray<number> = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
vi.stubGlobal('IntersectionObserver', IntersectionObserverStub);

// ResizeObserver — motion layout utilities may probe for it.
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
vi.stubGlobal('ResizeObserver', ResizeObserverStub);

// Canvas 2D context — jsdom cannot rasterize. The components guard against a
// null context, so returning null keeps the canvas branches inert and silent.
HTMLCanvasElement.prototype.getContext = vi.fn(() => null) as never;
