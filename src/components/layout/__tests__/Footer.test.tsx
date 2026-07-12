import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {Footer} from '../Footer';

// Characterization tests for the site Footer.
// Pins the CURRENT observable behaviour so the cross-cutting refactor stays
// green-to-green: the brand block + social/contact links, the three link
// columns (INCLUDING the Products column's current placeholder "#" hrefs and
// the Company column's real in-page anchors), the newsletter controls, and the
// legal row (also currently "#" placeholders).

describe('Footer', () => {
  it('renders the brand block with social and contact links', () => {
    render(<Footer />);

    expect(screen.getByAltText('Logia Initiative')).toBeInTheDocument();

    expect(screen.getByRole('link', {name: 'LinkedIn'})).toHaveAttribute(
      'href',
      'https://www.linkedin.com/company/logia-initiative/',
    );
    expect(screen.getByRole('link', {name: 'GitHub'})).toHaveAttribute(
      'href',
      'https://github.com/kodox45',
    );
    expect(
      screen.getByRole('link', {name: 'logiainitiative@gmail.com'}),
    ).toHaveAttribute('href', 'mailto:logiainitiative@gmail.com');
  });

  it('renders the Products column with its current placeholder hrefs', () => {
    render(<Footer />);

    const products = ['Enterprise Audit', 'Agentic Engine', 'SME SaaS', 'Custom Dev'];
    for (const label of products) {
      expect(screen.getByRole('link', {name: label})).toHaveAttribute(
        'href',
        '#',
      );
    }
  });

  it('renders the Company column with its real in-page anchors', () => {
    render(<Footer />);

    const company: Array<[string, string]> = [
      ['About Us', '#about'],
      ['Methodology', '#methodology'],
      ['Market', '#market'],
      ['Contact', '#contact'],
    ];
    for (const [label, href] of company) {
      expect(screen.getByRole('link', {name: label})).toHaveAttribute(
        'href',
        href,
      );
    }
  });

  it('renders the newsletter email input and subscribe button', () => {
    render(<Footer />);

    expect(
      screen.getByRole('textbox', {name: 'Newsletter Email Address'}),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', {name: 'Subscribe to newsletter'}),
    ).toBeInTheDocument();
  });

  it('renders the copyright and legal row with current placeholder hrefs', () => {
    const {container} = render(<Footer />);

    expect(
      screen.getByText(/2026 Logia Initiative\. All Rights Reserved\./i),
    ).toBeInTheDocument();

    for (const label of ['Privacy Policy', 'Terms of Service', 'Cookies']) {
      expect(screen.getByRole('link', {name: label})).toHaveAttribute(
        'href',
        '#',
      );
    }

    expect(container.querySelector('footer')).not.toBeNull();
  });
});
