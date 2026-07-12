import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {Services} from '../Services';
import {servicesData} from '../../../data/services';

// Characterization tests for F-005 (Services Scroll-Frame Animation).
// Pins the CURRENT observable behaviour: at the initial (un-scrolled) state the
// component shows the first slide (Enterprise) content and NOT the second slide.

describe('Services', () => {
  it('renders the section shell and the scroll affordance', () => {
    const {container} = render(<Services />);
    expect(container.querySelector('section#services')).not.toBeNull();
    expect(screen.getByText(/Scroll to Explore/i)).toBeInTheDocument();
  });

  it('shows the first (Enterprise) slide content at the initial scroll state', () => {
    render(<Services />);

    expect(screen.getByText(servicesData[0].tag)).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {name: servicesData[0].title}),
    ).toBeInTheDocument();
    expect(
      screen.getByText(servicesData[0].features[0]),
    ).toBeInTheDocument();

    // The second slide is not mounted until the user scrolls past the threshold.
    expect(screen.queryByText(servicesData[1].title)).toBeNull();
  });
});
