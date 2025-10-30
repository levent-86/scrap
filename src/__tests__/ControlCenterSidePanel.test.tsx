import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ControlCenter } from '../SidePanel/ControlCenter';

// Child component'leri taklit et
vi.mock('../Menu', () => ({
  Menu: () => <div>Mocked Menu</div>,
}));

vi.mock('./WorkStopper/WorkStopper', () => ({
  WorkStopper: () => <button>Mocked WorkStopper</button>,
}));

beforeEach(() => {
  vi.resetAllMocks();
});

describe('SidePanel/ControlCenter Component', () => {
  it('should render child components and layout', () => {
    render(<ControlCenter />);

    expect(screen.getByText('Mocked Menu')).toBeTruthy();
    expect(screen.getByText(/Fields/i)).toBeTruthy();
    expect(screen.getByText(/export saves/i)).toBeTruthy();
    expect(screen.getByText(/Stop Work/i)).toBeTruthy();
    waitFor(() =>
      expect(
        screen.getByRole('button', { name: /Mocked WorkStopper/i })
      ).toBeTruthy()
    );
  });
});
