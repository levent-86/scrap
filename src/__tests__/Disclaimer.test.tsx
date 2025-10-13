/* eslint-disable @typescript-eslint/no-unused-expressions */
import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Disclaimer } from '../components/Disclaimer';
import userEvent from '@testing-library/user-event';

describe('Disclaimer', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => vi.resetAllMocks());

  it('shows disclaimer writings', () => {
    const mock = vi.fn();
    render(<Disclaimer setIsAgreed={mock} />);

    expect(screen.getByText(/terms of use and disclaimer/i)).to.exist;
    expect(screen.getByText(/manual tool designed to help you select/i)).to
      .exist;
    expect(screen.getByText(/responsibility:/i)).to.exist;
    expect(screen.getByText(/You are solely responsible for ensuring/i)).to
      .exist;
    expect(screen.getByText(/legal Compliance:/i)).to.exist;
    expect(screen.getByText(/Unauthorized collection of personal data/i)).to
      .exist;
    expect(screen.getByText(/no warranty:/i)).to.exist;
    expect(
      screen.getByText(/This extension is provided "as is". The developer/i)
    ).to.exist;
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
