/* eslint-disable @typescript-eslint/no-unused-expressions */
import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Disclaimer } from '../components/Onboarding/Disclaimer';
import userEvent from '@testing-library/user-event';

describe('Disclaimer component', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => vi.resetAllMocks());

  it('shows disclaimer writings', () => {
    const mock = vi.fn();
    render(<Disclaimer setIsAgreed={mock} />);

    expect(screen.getByText(/terms of use and disclaimer/i)).to.exist;
    expect(screen.getByText(/1. Data Collection and Privacy:/i)).to.exist;
    expect(screen.getByText(/This extension is a strictly manual/i)).to.exist;
    expect(screen.getByText(/2. User Responsibility/i)).to.exist;
    expect(screen.getByText(/You, the user, are solely responsible/i)).to.exist;
    expect(screen.getByText(/3. No Warranty:/i)).to.exist;
    expect(screen.getByText(/The developer makes no guarantees/i)).to.exist;
    expect(screen.getByText(/By using this extension, you declare/i)).to.exist;
    expect(screen.getByText(/greement/i)).to.exist;
    expect(
      screen.getByText(/I have read and agree to the terms and conditions./i)
    ).to.exist;
  });

  it('shows checkbox and button', () => {
    const mock = vi.fn();
    render(<Disclaimer setIsAgreed={mock} />);

    const checkbox = screen.getByRole('checkbox', {
      name: /I have read and agree/i,
    });
    expect(checkbox).to.exist;

    const button = screen.getByRole('button', { name: /continue/i });
    expect(button).to.exist;
  });

  it('button is disabled as default', () => {
    const mock = vi.fn();
    render(<Disclaimer setIsAgreed={mock} />);

    const button = screen.getByRole('button', { name: /continue/i });
    expect(button.hasAttribute('disabled')).to.be.true;
  });

  it('click on checkbox enables button', async () => {
    const mock = vi.fn();
    render(<Disclaimer setIsAgreed={mock} />);

    const user = userEvent.setup();
    const checkbox = screen.getByRole('checkbox', {
      name: /I have read and agree/i,
    });
    const button = screen.getByRole('button', { name: /continue/i });

    await user.click(checkbox);
    await waitFor(() => expect(button.hasAttribute('disabled')).not.to.be.true);
  });

  it('set agreement to local storage and updates state when user agrees', async () => {
    const mock = vi.fn();
    render(<Disclaimer setIsAgreed={mock} />);

    const user = userEvent.setup();
    const checkbox = screen.getByRole('checkbox', {
      name: /I have read and agree/i,
    });
    const button = screen.getByRole('button', { name: /continue/i });

    await user.click(checkbox);
    await user.click(button);

    expect(localStorage.getItem('isUserAgreed')).to.equal('true');
    expect(mock).toHaveBeenCalledTimes(1);
  });

  it('does not set localStorage if checkbox is not checked', async () => {
    const mock = vi.fn();
    render(<Disclaimer setIsAgreed={mock} />);

    const button = screen.getByRole('button');
    expect(button.hasAttribute('disabled')).to.be.true;

    await userEvent.click(button);

    expect(localStorage.getItem('isUserAgreed')).to.be.null;
    expect(mock).not.toHaveBeenCalled();
  });
});
