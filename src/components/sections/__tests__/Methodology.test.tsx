import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {Methodology} from '../Methodology';
import {methodologyPoints} from '../../../data/methodology';

// Characterization tests for F-006 (Methodology Scroll Experience).
// Pins the CURRENT observable behaviour: at the initial (stage 0) scroll state
// the intro title + description are shown and NO methodology point is mounted.

describe('Methodology', () => {
  it('renders the intro title and description at the initial stage', () => {
    const {container} = render(<Methodology />);

    expect(container.querySelector('section#methodology')).not.toBeNull();
    expect(screen.getByText(/Beyond Prompting/)).toBeInTheDocument();
    expect(
      screen.getByText(/The Graph-Centric Production Engine\./),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/We don't just use AI to write code/i),
    ).toBeInTheDocument();
  });

  it('does not mount any methodology point until scrolled past the intro', () => {
    render(<Methodology />);
    expect(screen.queryByText(methodologyPoints[0].punchline)).toBeNull();
    expect(screen.queryByText(methodologyPoints[3].punchline)).toBeNull();
  });
});
