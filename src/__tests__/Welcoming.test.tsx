import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { Welcoming } from '../Popup/Onboarding/Welcoming';

// --- MOCK Components ---
vi.mock('../../Menu', () => ({
  Menu: () => <div data-testid="mock-menu">Mocked Menu</div>,
}));

vi.mock('./Disclaimer', () => ({
  Disclaimer: vi.fn(({ setIsAgreed }) => (
    <div data-testid="mock-disclaimer" onClick={() => setIsAgreed(true)}>
      Mocked Disclaimer
    </div>
  )),
}));

vi.mock('../ControlCenter', () => ({
  ControlCenter: () => (
    <div data-testid="mock-control-center">Mocked Control Center</div>
  ),
}));

// --- TEST Block ---

describe('Welcoming component', () => {
  const localStorageMock = (value: string | null) => {
    vi.spyOn(localStorage, 'getItem').mockReturnValue(value);
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows menu components', () => {
    localStorageMock(null);
    render(<Welcoming />);

    waitFor(() => expect(screen.getByTestId('mock-menu')).toBeTruthy());
  });

  it('shows Disclaimer component when agreement is false or null', () => {
    localStorageMock(null);
    render(<Welcoming />);

    waitFor(() => expect(screen.getByTestId('mock-disclaimer')).toBeTruthy());

    localStorageMock('false');
    render(<Welcoming />);
    waitFor(() => expect(screen.getByTestId('mock-disclaimer')).toBeTruthy());
  });

  it('shows ControlCenter component when agreement is true in localStorage', () => {
    localStorageMock('true');

    render(<Welcoming />);

    expect(screen.queryByTestId('mock-disclaimer')).not.toBeTruthy();
    waitFor(() =>
      expect(screen.getByTestId('mock-control-center')).toBeTruthy()
    );
  });

  it('shows skeleton loading state initially', () => {
    localStorageMock(null);

    const { container } = render(<Welcoming />);

    const skeletonDiv = container.querySelector('.skeleton');

    waitFor(() => expect(skeletonDiv).toBeTruthy());
    expect(screen.queryByTestId('mock-disclaimer')).not.toBeTruthy();
    expect(screen.queryByTestId('mock-control-center')).not.toBeTruthy();
  });
});
