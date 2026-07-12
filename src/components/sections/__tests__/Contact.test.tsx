import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {Contact} from '../Contact';

// Characterization tests for the lead-capture Contact form.
// Pins the CURRENT observable behaviour of the conversion-critical path so the
// cross-cutting refactor stays green-to-green: required-field gating, the
// email-regex validation, and the success / server-rejection / network-error
// branches of handleSubmit (with the Web3Forms fetch mocked).
//
// The Web3Forms endpoint + access key are stubbed via import.meta.env to their
// CURRENT literal values. On the unchanged tree these stubs are inert (the
// component still holds the literals); they only become load-bearing once the
// refactor moves those literals to env — keeping THIS test byte-identical
// across the refactor rather than having to edit the behaviour contract.
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const WEB3FORMS_KEY = '7d755ee3-faa9-4ae3-a334-165cd2d2f0cf';

/** Fill the three required fields with valid values. */
async function fillRequired(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/contact person/i), 'John Smith');
  await user.type(screen.getByLabelText(/company \/ organization/i), 'Acme Corp');
  await user.type(screen.getByLabelText(/business email/i), 'john@acme.com');
}

function mockFetchOnce(response: unknown, {reject = false} = {}) {
  const fetchMock = reject
    ? vi.fn().mockRejectedValue(new Error('network down'))
    : vi.fn().mockResolvedValue({json: async () => response});
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

describe('Contact form', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_WEB3FORMS_ENDPOINT', WEB3FORMS_ENDPOINT);
    vi.stubEnv('VITE_WEB3FORMS_KEY', WEB3FORMS_KEY);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('blocks submit and flags every empty required field', async () => {
    const user = userEvent.setup();
    const fetchMock = mockFetchOnce({success: true});
    render(<Contact />);

    await user.click(screen.getByRole('button', {name: 'Initiate Collaboration'}));

    // contactPerson, company, email are all required and start empty.
    expect(screen.getAllByText('Required')).toHaveLength(3);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('rejects a malformed email with the format message', async () => {
    const user = userEvent.setup();
    const fetchMock = mockFetchOnce({success: true});
    render(<Contact />);

    await user.type(screen.getByLabelText(/contact person/i), 'John Smith');
    await user.type(screen.getByLabelText(/company \/ organization/i), 'Acme Corp');
    await user.type(screen.getByLabelText(/business email/i), 'not-an-email');
    await user.click(screen.getByRole('button', {name: 'Initiate Collaboration'}));

    expect(screen.getByText('Invalid email format')).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('clears a field error as soon as the user edits that field', async () => {
    const user = userEvent.setup();
    mockFetchOnce({success: true});
    render(<Contact />);

    await user.click(screen.getByRole('button', {name: 'Initiate Collaboration'}));
    expect(screen.getAllByText('Required')).toHaveLength(3);

    await user.type(screen.getByLabelText(/contact person/i), 'J');
    // One of the three "Required" messages is cleared on edit.
    expect(screen.getAllByText('Required')).toHaveLength(2);
  });

  it('posts to Web3Forms and shows the success state when the API accepts', async () => {
    const user = userEvent.setup();
    const fetchMock = mockFetchOnce({success: true});
    render(<Contact />);

    await fillRequired(user);
    await user.click(screen.getByRole('button', {name: 'Initiate Collaboration'}));

    await waitFor(() =>
      expect(screen.getByText('Inquiry Received')).toBeInTheDocument(),
    );

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(WEB3FORMS_ENDPOINT);
    expect(init.method).toBe('POST');

    const body = JSON.parse(init.body as string);
    expect(body.access_key).toBe(WEB3FORMS_KEY);
    expect(body.subject).toBe('New Inquiry — Acme Corp');
    expect(body.from_name).toBe('John Smith');
    expect(body.email).toBe('john@acme.com');
    expect(body.message).toContain('Contact Person : John Smith');
    expect(body.message).toContain('Company        : Acme Corp');
  });

  it('shows the submission-failed message when the API rejects', async () => {
    const user = userEvent.setup();
    mockFetchOnce({success: false});
    render(<Contact />);

    await fillRequired(user);
    await user.click(screen.getByRole('button', {name: 'Initiate Collaboration'}));

    await waitFor(() =>
      expect(
        screen.getByText('Submission failed. Please try again.'),
      ).toBeInTheDocument(),
    );
    expect(screen.queryByText('Inquiry Received')).not.toBeInTheDocument();
  });

  it('shows the connection-error message when the request throws', async () => {
    const user = userEvent.setup();
    mockFetchOnce(undefined, {reject: true});
    render(<Contact />);

    await fillRequired(user);
    await user.click(screen.getByRole('button', {name: 'Initiate Collaboration'}));

    await waitFor(() =>
      expect(
        screen.getByText(
          'Connection error. Please try again or reach us via WhatsApp.',
        ),
      ).toBeInTheDocument(),
    );
  });
});
