/* eslint-disable @typescript-eslint/no-unused-expressions */
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Welcoming } from '../components/Onboarding/Welcoming';

describe('Welcoming component', () => {
  it('shows logo and theme switcher', () => {
    render(<Welcoming />);

    const checkbox = screen.getByRole('checkbox', { name: /sun moon/i });
    expect(checkbox).to.exist;

    const linkElement = screen.getByRole('link');
    expect(linkElement.getAttribute('href')).toBe('https://example.com');
  });

  it('shows welcoming text', () => {
    render(<Welcoming />);

    expect(screen.getByText(/NeuraLetter Suite: Scrap/i)).to.exist;
  });

  it('shows the disclaimer text by default and switches to ControlCenter component contents once the user agrees', async () => {
    render(<Welcoming />);

    expect(screen.getByText(/terms of use and disclaimer/i)).to.exist;

    const user = userEvent.setup();
    const checkbox = screen.getByRole('checkbox', {
      name: /I have read and agree/i,
    });
    const button = screen.getByRole('button', { name: /continue/i });

    await user.click(checkbox);
    await user.click(button);
    expect(screen.getByText('Preferences')).to.exist;
    expect(screen.getByText('Field Names')).to.exist;
    expect(screen.getByText('Buttons')).to.exist;

    expect(screen.queryByText(/terms of use and disclaimer/i)).not.to.exist;
  });
});
