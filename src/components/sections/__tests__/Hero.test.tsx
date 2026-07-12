import {render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import {Hero} from '../Hero';

// Characterization tests for F-003 (Hero Landing & Value Proposition).
// Pins the CURRENT observable behaviour: the headline/value copy, the section
// anchor, the bottom-nav pill links (INCLUDING their current placeholder hrefs),
// and that the reduced-motion path renders without breaking.

const setReducedMotion = (reduce: boolean) => {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: reduce && query.includes('prefers-reduced-motion'),
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
};

describe('Hero', () => {
  it('renders the headline and value proposition copy', () => {
    const {container} = render(<Hero />);

    const heading = screen.getByRole('heading', {level: 1});
    expect(heading.textContent).toContain('Building Software');
    expect(heading.textContent).toContain('Agentic AI.');
    expect(
      screen.getByText(/AI-driven enterprise engineering/i),
    ).toBeInTheDocument();
    expect(container.querySelector('section#hero')).not.toBeNull();
  });

  it('renders the four bottom-nav pill links with their current hrefs', () => {
    render(<Hero />);

    const expected: Array<[string, string]> = [
      ['Navigate to Enterprise section', '#enterprise'],
      ['Navigate to AI Audit section', '#ai-audit'],
      ['Navigate to SaaS section', '#saas'],
      ['Navigate to Consulting section', '#consulting'],
    ];

    for (const [name, href] of expected) {
      expect(screen.getByRole('link', {name})).toHaveAttribute('href', href);
    }
  });

  it('renders without breaking when prefers-reduced-motion is set', () => {
    setReducedMotion(true);
    render(<Hero />);
    expect(screen.getByRole('heading', {level: 1}).textContent).toContain(
      'Agentic AI.',
    );
    setReducedMotion(false);
  });
});
