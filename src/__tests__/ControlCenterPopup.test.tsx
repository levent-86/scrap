import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ControlCenter } from '../Popup/ControlCenter';

// Imitate WorkStarter component
vi.mock('./WorkStarter/WorkStarter', () => ({
  WorkStarter: () => <button>Mocked WorkStarter</button>,
}));

beforeEach(() => {
  vi.resetAllMocks();
});

describe('Popup/ControlCenter Component', () => {
  it('should render preferences and WorkStarter', () => {
    render(<ControlCenter />);

    waitFor(() => expect(screen.getByText(/Preferences/i)).toBeTruthy());

    waitFor(() =>
      expect(
        screen.getByRole('button', { name: /Mocked WorkStarter/i })
      ).toBeTruthy()
    );
  });
});
