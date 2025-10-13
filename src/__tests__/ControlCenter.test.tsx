/* eslint-disable @typescript-eslint/no-unused-expressions */
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ControlCenter } from '../components/ControlCenter/ControlCenter';

describe('ControlCenter component', () => {
  it('shows accordeon elements', () => {
    render(<ControlCenter />);

    expect(screen.getByText('Preferences')).to.be.exist;
    expect(screen.getByText('Field Names')).to.be.exist;
    expect(screen.getByText('Buttons')).to.be.exist;
  });
});
