import {act, render, screen} from '@testing-library/react';
import {afterEach, describe, expect, it, vi} from 'vitest';
import {LoadingScreen} from '../LoadingScreen';

// Characterization tests for F-004 (Cinematic Loading Screen).
// Pins the CURRENT observable behaviour: while loading, the logo is shown and
// body scroll is locked; once loading finishes, the sequential fade releases the
// scroll lock after the logo-fade delay (600ms).

afterEach(() => {
  vi.useRealTimers();
});

describe('LoadingScreen', () => {
  it('shows the logo and locks body scroll while loading', () => {
    render(<LoadingScreen isLoading={true} />);

    expect(screen.getByAltText('Logia Logo')).toBeInTheDocument();
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('releases the body scroll lock after the logo-fade delay once loading ends', () => {
    vi.useFakeTimers();
    const {rerender} = render(<LoadingScreen isLoading={true} />);
    expect(document.body.style.overflow).toBe('hidden');

    rerender(<LoadingScreen isLoading={false} />);
    // Scroll stays locked until the background-fade timer fires.
    expect(document.body.style.overflow).toBe('hidden');

    act(() => {
      vi.advanceTimersByTime(600);
    });

    expect(document.body.style.overflow).toBe('');
  });
});
