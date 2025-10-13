/* eslint-disable @typescript-eslint/no-unused-expressions */
import { render, screen } from '@testing-library/react';
import { afterAll, describe, expect, it } from 'vitest';
import { ThemeSwitcher } from '../components/Onboarding/ThemeSwitcher';
import userEvent from '@testing-library/user-event';

describe('ThemeSwitcher component', () => {
  afterAll(() => localStorage.clear());

  it('should switch dark and light theme according to user interaction', async () => {
    render(<ThemeSwitcher />);

    expect(localStorage.getItem('isdark')).to.equal('false');

    const user = userEvent.setup();
    const switcher = screen.getByRole('checkbox', {
      name: 'sun moon',
    }) as HTMLInputElement;

    await user.click(switcher);
    expect(localStorage.getItem('isdark')).to.equal('true');
    expect(switcher.checked).to.be.true;

    await user.click(switcher);
    expect(localStorage.getItem('isdark')).to.equal('false');
    expect(switcher.checked).to.be.false;
  });
});
