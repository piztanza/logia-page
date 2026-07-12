import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {HelmetProvider} from 'react-helmet-async';
import App from '../App';

// Characterization tests for the App composition root (loading orchestration +
// section layout). Pins the CURRENT observable behaviour: on first mount the app
// is in its loading state (the LoadingScreen logo is shown and body scroll is
// locked), and the full section layout — including the scroll-driven Services
// section — is rendered underneath the overlay.

const renderApp = () =>
  render(
    <HelmetProvider>
      <App />
    </HelmetProvider>,
  );

describe('App', () => {
  it('starts in the loading state with the logo shown and scroll locked', () => {
    renderApp();

    expect(screen.getByAltText('Logia Logo')).toBeInTheDocument();
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('renders the section layout beneath the loading overlay', () => {
    const {container} = renderApp();

    // Hero landing headline and the scroll-driven Services section are present.
    expect(screen.getByRole('heading', {level: 1}).textContent).toContain(
      'Agentic AI.',
    );
    expect(container.querySelector('section#services')).not.toBeNull();
    expect(screen.getByText(/Scroll to Explore/i)).toBeInTheDocument();
  });
});
